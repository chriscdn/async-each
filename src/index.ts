import { Semaphore } from "@chriscdn/promise-semaphore";

export type AsyncEachStatus<T, R> = {
  progress: number;
  total: number;
  percent: number;
  item: T;
  index: number;
  result: R;
};

type CallbackFn<T, R> = (
  item: T,
  index: number,
  items: Array<T>,
) => Promise<R> | R;

type Options = {
  rateLimit?: number;
};

export type AsyncEachStatusCallbackFn<T, R> = (
  status: AsyncEachStatus<T, R>,
) => void;

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

export default asyncEach;
