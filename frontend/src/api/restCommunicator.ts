import _ from 'lodash';
import Axios, {
    AxiosRequestConfig,
    AxiosRequestHeaders,
    AxiosResponse,
} from 'axios';

import {getUserToken} from '../auth';

import {backendConfig} from '../core/config/backend.config';
import {CancellablePromise} from '../core/types/cancellablePromise.type';

const validateStatus = () => true;
const axiosConfig: AxiosRequestConfig = {validateStatus};

export const restCommunicator = {
    setToken,
    get,
    post,
    put,
    delete: deleteMethod,
};

function get<TResponse>(route: string, queries: UrlQueriesObject = {}) {
    return wrapAxiosPromise((config) => {
        return Axios.get<undefined, AxiosResponse<TResponse>>(
            concatParams(route, queries),
            config,
        );
    });
}

function post<TRequest, TResponse>(
    route: string,
    body: any,
    queries: UrlQueriesObject,
) {
    return wrapAxiosPromise((config) => {
        return Axios.post<TRequest, AxiosResponse<TResponse>>(
            concatParams(route, queries),
            body,
            config,
        );
    });
}

function put<TResponse>(
    route: string,
    body: any,
    queries: UrlQueriesObject = {},
) {
    return wrapAxiosPromise((config) => {
        return Axios.put<undefined, AxiosResponse<TResponse>>(
            concatParams(route, queries),
            body,
            config,
        );
    });
}

function deleteMethod<TResponse>(
    route: string,
    queries: UrlQueriesObject = {},
) {
    return wrapAxiosPromise((config) => {
        return Axios.delete<undefined, AxiosResponse<TResponse>>(
            concatParams(route, queries),
            config,
        );
    });
}

function setToken(token: string) {
    axiosConfig.headers = axiosConfig.headers || {};
    axiosConfig.headers['Auth-Token'] = token;
}

function concatParams(route: string, queries: UrlQueriesObject = {}): string {
    const urlWithRoute = backendConfig.url + (route ? `/${route}` : '');
    const queriesNames = Object.keys(queries);
    if (queriesNames.length === 0) {
        return urlWithRoute;
    }

    const joinedQueries = queriesNames
        .map((query) => `${query}=${queries[query]}`)
        .join('&');

    return `${urlWithRoute}?${joinedQueries}`;
}

function wrapAxiosPromise<TResponse>(
    perform: (config: AxiosRequestConfig) => Promise<AxiosResponse<TResponse>>,
) {
    const cancellationConfig = createCancellationConfig();
    const promise = new Promise<AxiosResponse<TResponse>>(
        async (resolve, reject) => {
            try {
                const token = await getUserToken();
                addHeader(cancellationConfig.config, 'Auth-Token', token);
                const originalPromise = perform(cancellationConfig.config);
                resolve(await originalPromise);
            } catch (err) {
                if (err instanceof Axios.Cancel) {
                    resolve({status: 0, statusText: 'cancelled'} as any);
                }

                reject(err);
            }
        },
    ) as CancellablePromise<AxiosResponse<TResponse>>;
    promise.cancel = () => cancellationConfig.source.cancel();
    return promise;
}

function createCancellationConfig() {
    const source = Axios.CancelToken.source();
    return {config: {...axiosConfig, cancelToken: source.token}, source};
}

async function addHeader<TKey extends keyof AxiosRequestHeaders>(
    config: AxiosRequestConfig,
    name: TKey,
    value: AxiosRequestHeaders[TKey] | null,
) {
    if (_.isNil(value)) return;

    config.headers = config.headers || {};
    config.headers[name] = value;
}

type UrlQueriesObject = {
    [key: string]: string | number;
};
