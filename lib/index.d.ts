export type TAsyncEachStatus<T, R> = {
    progress: number;
    total: number;
    percent: number;
    item: T;
    index: number;
    result: R;
};
type TCallbackFn<T, R> = (item: T, index: number, items: Array<T>) => Promise<R> | R;
type Options = {
    rateLimit?: number;
};
export type TAsyncEachStatusCallbackFn<T, R> = (status: TAsyncEachStatus<T, R>) => void;
declare const asyncEach: <T, R>(items: T[], callbackFn: TCallbackFn<T, R>, statusCallbackFn?: TAsyncEachStatusCallbackFn<T, R>, options?: Options) => Promise<R[]>;
export default asyncEach;
