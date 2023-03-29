export type StatusType<T, R> = {
  progress: number;
  total: number;
  percent: number;
  item: T;
  index: number;
  result: R;
};

export type CallbackFn<T, R> = (
  item: T,
  index: number,
  items: Array<T>
) => Promise<R>;

export type StatusCallbackFn<T, R> = (status: StatusType<T, R>) => void;

function asyncForEach<T, R>(
  items: Array<T>,
  callbackFn: CallbackFn<T, R>,
  statusCallbackFn: StatusCallbackFn<T, R> = () => {}
): Promise<Array<R>> {
  let progress: number = 0;
  const total: number = items.length;

  const promises = items.map((item: T, index: number, items: Array<T>) => {
    return new Promise<R>((resolve, reject) => {
      setTimeout(async () => {
        try {
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
        }
      }, 0);
    });
  });

  // This will reject if any promise fails.
  return Promise.all(promises);
}

export default asyncForEach;
