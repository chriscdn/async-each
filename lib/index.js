function asyncForEach(items, cb, statuscb) {
    let progress = 0;
    const total = items.length;
    const promises = items.map((item, index, items) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let err = null;
                let result = null;
                try {
                    result = await cb(item, index, items);
                    resolve(result);
                }
                catch (e) {
                    err = e;
                    reject(e);
                }
                finally {
                    progress++;
                    const status = {
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
//# sourceMappingURL=index.js.map