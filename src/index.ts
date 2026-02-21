import { Semaphore } from "@chriscdn/promise-semaphore";

/**
 * Represents the status of an item processed by {@link asyncEach}.
 *
 * @template T Type of the input item.
 * @template R Type of the result returned by the callback.
 */
export type AsyncEachStatus<T, R> = {
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
type CallbackFn<T, R> = (
  item: T,
  index: number,
  items: Array<T>,
) => Promise<R> | R;

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
export type AsyncEachStatusCallbackFn<T, R> = (
  status: AsyncEachStatus<T, R>,
) => void;

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
const asyncEach = <T, R>(
  items: Array<T>,
  callbackFn: CallbackFn<T, R>,
  statusCallbackFn: AsyncEachStatusCallbackFn<T, R> = () => {},
  options: Options = {},
): Promise<Array<R>> => {
  let progress: number = 0;
  const total: number = items.length;

  const rateLimit = options.rateLimit ?? 0;
  const semaphore = rateLimit > 0 ? new Semaphore(rateLimit) : null;

  const promises = items.map((item: T, index: number, items: Array<T>) => {
    return new Promise<R>(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          await semaphore?.acquire();

          const result = await callbackFn(item, index, items);

          resolve(result);

          statusCallbackFn({
            progress: progress++,
            total,
            percent: Math.floor((100 * progress) / total),
            item,
            index,
            result,
          });
        } catch (err) {
          reject(err);
        } finally {
          semaphore?.release();
        }
      }, 0);
    });
  });

  // This will reject if any promise fails.
  return Promise.all(promises);
};

export { asyncEach };
