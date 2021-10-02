import Axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {backendConfig} from 'core/config/backend.config';

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
    return performCancellableAxiosRequest((config) => {
        return Axios.get<undefined, AxiosResponse<TResponse>>(concatParams(route, queries), config);
    });
}

function post<TRequest, TResponse>(route: string, queries: UrlQueriesObject, body: any) {
    return performCancellableAxiosRequest((config) => {
        return Axios.post<TRequest, AxiosResponse<TResponse>>(concatParams(route, queries), body, config);
    });
}

function put<TResponse>(route: string, queries: UrlQueriesObject = {}, body: any) {
    return performCancellableAxiosRequest((config) => {
        return Axios.put<undefined, AxiosResponse<TResponse>>(concatParams(route, queries), body, config);
    });
}

function deleteMethod<TResponse>(route: string, queries: UrlQueriesObject = {}) {
    return performCancellableAxiosRequest((config) => {
        return Axios.delete<undefined, AxiosResponse<TResponse>>(concatParams(route, queries), config);
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

    const joinedQueries = queriesNames.map((query) => `${query}=${queries[query]}`).join('&');

    return `${urlWithRoute}?${joinedQueries}`;
}

function performCancellableAxiosRequest<TResponse>(
    perform: (config: AxiosRequestConfig) => Promise<AxiosResponse<TResponse>>
) {
    const cancellationConfig = createCancellationConfig();
    const originalPromise = perform(cancellationConfig.config);
    const promise = new Promise<AxiosResponse<TResponse>>(async (resolve, reject) => {
        try {
            resolve(await originalPromise);
        } catch (err) {
            if (err instanceof Axios.Cancel) {
                resolve({status: 0, statusText: 'cancelled'} as any);
            }

            reject(err);
        }
    }) as CancellablePromise<AxiosResponse<TResponse>>;
    promise.cancel = () => cancellationConfig.source.cancel();
    return promise;
}

function createCancellationConfig() {
    const source = Axios.CancelToken.source();
    return {config: {...axiosConfig, cancelToken: source.token}, source};
}

type UrlQueriesObject = {
    [key: string]: string | number;
};

type CancellablePromise<T> = Promise<T> & {cancel: () => void};
