# @chriscdn/async-each

Iterate an array in an asynchronous manner with a progress callback function.

## Motivation

Iterating a large array can block the event loop if the block doesn't include asynchronous code. This can cause the user interface to become unresponsive.

This module provides a method for iterating an array in an asynchronous manner, which helps minimise the risk of blocking the event loop. It also provides a status callback to report the progress of the iteration. This can be useful for providing feedback to the user on the state of a process.

The function returns a `Promise`, which resolves to an array with the return values.

## Syntax

```js
const results = await asyncEach(array, callbackFn, statusCallbackFn);
```

### Parameters

- `array`
  - The array to iterate.
- `callbackFn`
  - A function to execute on each element of the array. The function can return a promise, and the resolved value is aggregated into `results`. The function is called with the following arguments:
    - `item` - The current item being processed in the array.
    - `index` - The index of the item being processed in the array.
    - `items` - The array being processed.
- `statusCallbackFn`
  - An optional callback function to execute on the completion of an iteration. The function takes one argument, which is an object containing the following properties:
    - `progress` - The total number of items that have been processed.
    - `total` - The length of the array being processed.
    - `percent` - The number of items processed, as a percentage of the total number of items to process. This is simply `Math.floor((100 * progress) / total)`.
    - `item` - The item of the array that was just completed.
    - `index` - The index of the item of the array that was just completed.
    - `result` - The resolved return value of the callback function on the item.

## Example

The following example squares an array of integers.

```js
import asyncEach from "@chriscdn/async-each";

const results = await asyncEach(
  [1, 2, 3],
  (item, index, items) => item * item,
  (status) => {
    // status can be used to show a progress indicator to the user
    console.log(status);
  },
);

console.log(results);
// [1, 4, 9];
```

## License

[MIT](LICENSE)
