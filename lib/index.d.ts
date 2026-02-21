/**
 * Represents the status of an item processed by {@link asyncEach}.
 *
 * @template T Type of the input item.
 * @template R Type of the result returned by the callback.
 */
type AsyncEachStatus<T, R> = {
    /**
     * Number of items completed before the current one.
     */
    progress: number;
    /**
     * Total number of items to process.
     */
    total: number;
    /**
     * Integer percentage of completion in the range 0 to 100.
     */
    percent: number;
    /**
     * The current item being processed.
     */
    item: T;
    /**
     * Index of the current item within the original array.
     */
    index: number;
    /**
     * Result returned by the callback for the current item.
     */
    result: R;
};
/**
 * Callback invoked for each item.
 *
 * @template T Type of the input item.
 * @template R Type of the result returned by the callback.
 * @param item The current item.
 * @param index Index of the current item.
 * @param items The full array of items.
 * @returns A value or promise resolving to the result for the item.
 */
type CallbackFn<T, R> = (item: T, index: number, items: Array<T>) => Promise<R> | R;
/**
 * Configuration options for {@link asyncEach}.
 */
type Options = {
    /**
     * Maximum number of concurrent executions.
     * If omitted or set to 0, concurrency is unlimited.
     */
    rateLimit?: number;
};
/**
 * Callback invoked after each item is resolved.
 *
 * @template T Type of the input item.
 * @template R Type of the result returned by the callback.
 * @param status Object describing the current processing state.
 */
type AsyncEachStatusCallbackFn<T, R> = (status: AsyncEachStatus<T, R>) => void;
/**
 * Asynchronously iterates over an array of items, invoking a callback for each item.
 * Supports optional concurrency control and per item status reporting.
 *
 * All callbacks are scheduled asynchronously. If any callback rejects or throws,
 * the returned promise rejects immediately with that error.
 *
 * @template T Type of the input items.
 * @template R Type of the result returned by the callback.
 * @param items Array of items to process.
 * @param callbackFn Function invoked for each item. May return a value or a promise.
 * @param statusCallbackFn Optional function invoked after each item resolves.
 * Receives progress information and the result of the current item.
 * @param options Optional configuration. Use rateLimit to restrict concurrency.
 * @returns A promise that resolves with an array of results in the same order
 * as the input items. Rejects if any callback fails.
 */
declare const asyncEach: <T, R>(items: Array<T>, callbackFn: CallbackFn<T, R>, statusCallbackFn?: AsyncEachStatusCallbackFn<T, R>, options?: Options) => Promise<Array<R>>;

export { type AsyncEachStatus, type AsyncEachStatusCallbackFn, asyncEach };
