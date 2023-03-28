export type StatusType<T, R> = {
  progress: number;
  total: number;
  percent: number;
  item: T;
  index: number;
  err: any;
  result: R | null;
};
export type Callback<T, R> = (
  item: T,
  index: number,
  items: Array<T>
) => Promise<R>;
export type StatusCallback<T, R> = (status: StatusType<T, R>) => void;

function asyncForEach<T, R>(
  items: Array<T>,
  cb: Callback<T, R>,
  statuscb: (status: StatusType<T, R>) => void
): Promise<Array<R | null>> {
  let progress = 0;
  const total = items.length;

  const promises = items.map((item: T, index: number, items: Array<T>) => {
    return new Promise<R>((resolve, reject) => {
      setTimeout(async () => {
        let err = null;
        let result: R | null = null;
        try {
          result = await cb(item, index, items);
          resolve(result);
        } catch (e) {
          err = e;
          reject(e);
        } finally {
          progress++;

          const status: StatusType<T, R> = {
            progress,
            total,
            percent: Math.floor((100 * progress) / total),
            item,
            index,
            err,
            result,
          };

          statuscb(status);
        }
      }, 0);
    });
  });

  return Promise.all(promises);
}

export default asyncForEach;
