# async-for-each

Iterate an array in an asynchronous manner with a progress callback function.

## Motivation

A standard iteration of a large array can block the event loop if the block doesn't include asynchronous code.  This can cause the user interface to become unresponsive.

This module provides a method for iterating an array in an asynchronous manner to minimise the risk of blocking the event loop.  It also provides a status callback function to report the progress of the iteration.  This can be used to provide feedback to the user on the status of a process.

## Example

The following example can be used to square the integers of an array.

```js
const asyncForEach = require('@chriscdn/async-for-each')

// asyncForEach returns a promise
const results = await asyncForEach([1, 2, 3], (item, index, items) => {
		return item * item
	},
	status => {
		// status can be used to show a progress indicator to the user
		console.log(status)
	})

console.log(results)
> [1, 4, 9]
```