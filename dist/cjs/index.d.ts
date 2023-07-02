export type TStatus<T, R> = {
    progress: number;
    total: number;
    percent: number;
    item: T;
    index: number;
    result: R;
};
export type TCallbackFn<T, R> = (item: T, index: number, items: Array<T>) => Promise<R>;
export type TStatusCallbackFn<T, R> = (status: TStatus<T, R>) => void;
declare function asyncEach<T, R>(items: Array<T>, callbackFn: TCallbackFn<T, R>, statusCallbackFn?: TStatusCallbackFn<T, R>): Promise<Array<R>>;
export default asyncEach;
