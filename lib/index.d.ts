export type StatusType<T, R> = {
    progress: number;
    total: number;
    percent: number;
    item: T;
    index: number;
    result: R;
};
export type CallbackFn<T, R> = (item: T, index: number, items: Array<T>) => Promise<R>;
export type StatusCallbackFn<T, R> = (status: StatusType<T, R>) => void;
declare function asyncEach<T, R>(items: Array<T>, callbackFn: CallbackFn<T, R>, statusCallbackFn?: StatusCallbackFn<T, R>): Promise<Array<R>>;
export default asyncEach;
