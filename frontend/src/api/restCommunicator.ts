import Axios from 'axios';

const validateStatus = () => true;
const axiosConfig = {validateStatus};

export const restCommunicator = {
    get,
    post,
    put,
    delete: deleteMethod,
};

function get<TResponse>(url: string, ...queries: UrlQuery[]) {
    return Axios.get<TResponse>(concatParams(url, queries), axiosConfig);
}

function post<TRequest, TResponse>(
    url: string,
    queries: UrlQuery[],
    body: any
) {
    return Axios.post<TRequest, TResponse>(
        concatParams(url, queries),
        body,
        axiosConfig
    );
}

function put<TResponse>(url: string, queries: UrlQuery[], body: any) {
    return Axios.put<TResponse>(concatParams(url, queries), body, axiosConfig);
}

function deleteMethod<TResponse>(url: string, ...queries: UrlQuery[]) {
    return Axios.delete<TResponse>(concatParams(url, queries), axiosConfig);
}

export type UrlQuery = {name: string; value: string};

function concatParams(url: string, queries: UrlQuery[]): string {
    if (queries.length === 0) {
        return url;
    }

    const joinedQueries = queries
        .map((query) => `${query.name}=${query.value}`)
        .join('&');

    return `${url}?${joinedQueries}`;
}
