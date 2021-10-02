import Axios from 'axios';
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
    return Axios.get<TResponse>(concatParams(route, queries), axiosConfig);
}

function post<TRequest, TResponse>(
    route: string,
    queries: UrlQueriesObject,
    body: any
) {
    return Axios.post<TRequest, TResponse>(
        concatParams(route, queries),
        body,
        axiosConfig
    );
}

function put<TResponse>(
    route: string,
    queries: UrlQueriesObject = {},
    body: any
) {
    return Axios.put<TResponse>(
        concatParams(route, queries),
        body,
        axiosConfig
    );
}

function deleteMethod<TResponse>(
    route: string,
    queries: UrlQueriesObject = {}
) {
    return Axios.delete<TResponse>(concatParams(route, queries), axiosConfig);
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

type UrlQueriesObject = {
    [key: string]: string | number;
};
