function asyncEach(items, callbackFn, statusCallbackFn = () => { }) {
    let progress = 0;
    const total = items.length;
    const promises = items.map((item, index, items) => {
        return new Promise(async (resolve, reject) => {
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
                }
                catch (err) {
                    reject(err);
                }
            }, 0);
        });
    });
    // This will reject if any promise fails.
    return Promise.all(promises);
}
export default asyncEach;
//# sourceMappingURL=index.js.map