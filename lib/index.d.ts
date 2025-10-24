export type AsyncEachStatus<T, R> = {
    progress: number;
    total: number;
    percent: number;
    item: T;
    index: number;
    result: R;
};
type CallbackFn<T, R> = (item: T, index: number, items: Array<T>) => Promise<R> | R;
type Options = {
    rateLimit?: number;
};
export type AsyncEachStatusCallbackFn<T, R> = (status: AsyncEachStatus<T, R>) => void;
declare const asyncEach: <T, R>(items: T[], callbackFn: CallbackFn<T, R>, statusCallbackFn?: AsyncEachStatusCallbackFn<T, R>, options?: Options) => Promise<R[]>;
export default asyncEach;
