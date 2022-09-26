import _ from 'lodash';
import {useCallback, useEffect, useRef, useState} from 'react';

import {CancellablePromise} from '../core/types/cancellablePromise.type';

export function useFetch<T>(
    fetchFunc: () => CancellablePromise<T>,
): UseFetchReturnType<T>;

export function useFetch<
    T,
    TFetchFunc extends (...args: any) => CancellablePromise<T>,
>(
    fetchFunc: TFetchFunc,
    options: Partial<FetchOptions> = {},
): UseFetchReturnType<T> {
    options = {...DEFAULT_FETCH_OPTIONS, ...options};

    const [isLoading, setIsLoading] = useState(options.immediate ?? true);
    const [result, setResult] = useState<T | undefined>(undefined);
    const [isCanceled, setIsCanceled] = useState(false);
    const cancelRef = useRef<() => void>();

    const execute = useCallback(
        (...args: any[]) => {
            cancelRef.current?.();
            (async () => {
                const promise = fetchFunc(...args);
                cancelRef.current = promise.cancel;
                try {
                    setIsLoading(true);
                    setIsCanceled(false);
                    const result = await promise;

                    setResult(result);
                } catch (error) {
                    if ((error as any).statusText === 'canceled') {
                        setIsCanceled(true);
                    }

                    setResult(error as any);
                } finally {
                    setIsLoading(false);
                }
            })();
        },
        [fetchFunc],
    );

    useEffect(() => {
        if (options.immediate) {
            execute();
        }

        return () => {
            cancelRef.current?.();
        };
    }, [execute, options.immediate]);

    return [isLoading, result, isCanceled];
}

type FetchOptions = {
    immediate: boolean;
    debounce: number | null;
};

type UseFetchReturnType<T> = readonly [boolean, T | undefined, boolean];

const DEFAULT_FETCH_OPTIONS: FetchOptions = {
    immediate: true,
    debounce: null,
};
