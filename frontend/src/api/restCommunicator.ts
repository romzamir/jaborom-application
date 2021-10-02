import Axios, {AxiosResponse, CancelTokenSource} from 'axios';
import {backendConfig} from 'core/config/backend.config';

const validateStatus = () => true;
const axiosConfig = {validateStatus};

export const restCommunicator = {
    get,
    post,
    put,
    delete: deleteMethod,
};

function get<TResponse>(route: string, queries: UrlQueriesObject = {}) {
    const config = createCancellationConfig();
    const originalPromise = Axios.get<undefined, AxiosResponse<TResponse>>(concatParams(route, queries), config.config);
    return addCancelFunction(originalPromise, config.source);
}

function post<TRequest, TResponse>(route: string, queries: UrlQueriesObject, body: any) {
    const config = createCancellationConfig();
    const originalPromise = Axios.post<TRequest, AxiosResponse<TResponse>>(
        concatParams(route, queries),
        body,
        axiosConfig
    );
    return addCancelFunction(originalPromise, config.source);
}

function put<TResponse>(route: string, queries: UrlQueriesObject = {}, body: any) {
    const config = createCancellationConfig();
    const originalPromise = Axios.put<undefined, AxiosResponse<TResponse>>(
        concatParams(route, queries),
        body,
        axiosConfig
    );
    return addCancelFunction(originalPromise, config.source);
}

function deleteMethod<TResponse>(route: string, queries: UrlQueriesObject = {}) {
    const config = createCancellationConfig();
    const originalPromise = Axios.delete<undefined, AxiosResponse<TResponse>>(
        concatParams(route, queries),
        axiosConfig
    );
    return addCancelFunction(originalPromise, config.source);
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

function createCancellationConfig() {
    const source = Axios.CancelToken.source();
    return {config: {...axiosConfig, cancelToken: source.token}, source};
}

function addCancelFunction<TResponse>(
    originalPromise: Promise<AxiosResponse<TResponse>>,
    cancelSource: CancelTokenSource
) {
    const promise = originalPromise as CancellablePromise<AxiosResponse<TResponse>>;
    promise.cancel = cancelSource.cancel;
    return promise;
}

type UrlQueriesObject = {
    [key: string]: string | number;
};

type CancellablePromise<T> = Promise<T> & {cancel: () => void};
