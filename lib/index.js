// src/index.ts
import { Semaphore } from "@chriscdn/promise-semaphore";
var asyncEach = (items, callbackFn, statusCallbackFn = () => {
}, options = {}) => {
  let progress = 0;
  const total = items.length;
  const rateLimit = options.rateLimit ?? 0;
  const semaphore = rateLimit > 0 ? new Semaphore(rateLimit) : null;
  const promises = items.map((item, index, items2) => {
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          await semaphore?.acquire();
          const result = await callbackFn(item, index, items2);
          resolve(result);
          statusCallbackFn({
            progress: progress++,
            total,
            percent: Math.floor(100 * progress / total),
            item,
            index,
            result
          });
        } catch (err) {
          reject(err);
        } finally {
          semaphore?.release();
        }
      }, 0);
    });
  });
  return Promise.all(promises);
};
export {
  asyncEach
};
//# sourceMappingURL=index.js.map