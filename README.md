# @chriscdn/async-each

Asynchronously iterate an array with a progress callback function.

## Motivation

Iterating a large array can block the event loop if the block doesn't include asynchronous code. This can cause the user interface to become unresponsive.

This module provides a method for iterating an array in an asynchronous manner, which helps minimise the risk of blocking the event loop. It also provides a status callback to report the progress of the iteration. This can be useful for providing feedback to the user on the state of a process.

The function returns a `Promise`, which resolves to an array with the return values.

## Example

The following example squares the integers of an array.

```js
import asyncEach from "@chriscdn/async-each";

const results = await asyncEach(
  [1, 2, 3],
  (item, index, items) => item * item,
  (status) => {
    // status can be used to show a progress indicator to the user
    console.log(status);
  }
);

console.log(results);
// [1, 4, 9];
```
