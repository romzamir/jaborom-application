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

function get<TResponse>(route: string, ...queries: UrlQuery[]) {
    return Axios.get<TResponse>(concatParams(route, queries), axiosConfig);
}

function post<TRequest, TResponse>(
    route: string,
    queries: UrlQuery[],
    body: any
) {
    return Axios.post<TRequest, TResponse>(
        concatParams(route, queries),
        body,
        axiosConfig
    );
}

function put<TResponse>(route: string, queries: UrlQuery[], body: any) {
    return Axios.put<TResponse>(
        concatParams(route, queries),
        body,
        axiosConfig
    );
}

function deleteMethod<TResponse>(route: string, ...queries: UrlQuery[]) {
    return Axios.delete<TResponse>(concatParams(route, queries), axiosConfig);
}

function concatParams(route: string, queries: UrlQuery[]): string {
    const urlWithRoute = backendConfig.url + (route ? `/${route}` : '');
    if (queries.length === 0) {
        return urlWithRoute;
    }

    const joinedQueries = queries
        .map((query) => `${query.name}=${query.value}`)
        .join('&');

    return `${urlWithRoute}?${joinedQueries}`;
}

export type UrlQuery = {name: string; value: string};
