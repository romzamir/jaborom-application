import {CancellablePromise} from '../core/types/cancellablePromise.type';

export function wrapCancelablePromise<T>(
    cancelablePromise: CancellablePromise<T>,
    callback: (promise: CancellablePromise<T>) => Promise<void> | void,
): CancellablePromise<T> {
    const newPromise = new Promise(async (resolve, reject) => {
        try {
            await callback(cancelablePromise);
            const result = await cancelablePromise;
            resolve(result);
        } catch (err) {
            reject(err);
        }
    }) as CancellablePromise<T>;

    newPromise.cancel = () => cancelablePromise.cancel();
    return newPromise;
}
