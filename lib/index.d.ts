export type StatusType<T, R> = {
    progress: number;
    total: number;
    percent: number;
    item: T;
    index: number;
    err: any;
    result: R | null;
};
export type Callback<T, R> = (item: T, index: number, items: Array<T>) => Promise<R>;
export type StatusCallback<T, R> = (status: StatusType<T, R>) => void;
declare function asyncForEach<T, R>(items: Array<T>, cb: Callback<T, R>, statuscb: (status: StatusType<T, R>) => void): Promise<Array<R | null>>;
export default asyncForEach;
