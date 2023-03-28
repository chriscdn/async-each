type StatusType<T> = {
    progress: number;
    total: number;
    percent: number;
    item: T;
    index: number;
    err: any;
    result: any;
};
type Callback<T> = (item: T, index: number, items: Array<T>) => void;
type StatusCallback<T> = (status: StatusType<T>) => void;
declare function asyncForEach<T>(items: Array<T>, cb: Callback<T>, statuscb?: StatusCallback<T>): Promise<unknown[]>;
export default asyncForEach;
