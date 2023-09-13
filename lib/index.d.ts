type TAsyncEachStatus<T, R> = {
    progress: number;
    total: number;
    percent: number;
    item: T;
    index: number;
    result: R;
};
type TCallbackFn<T, R> = (item: T, index: number, items: Array<T>) => Promise<R>;
type TAsyncEachStatusCallbackFn<T, R> = (status: TAsyncEachStatus<T, R>) => void;
declare function asyncEach<T, R>(items: Array<T>, callbackFn: TCallbackFn<T, R>, statusCallbackFn?: TAsyncEachStatusCallbackFn<T, R>): Promise<Array<R>>;

export { type TAsyncEachStatus, type TAsyncEachStatusCallbackFn, asyncEach as default };
