# async-for-each

Iterate an array in an asynchronous manner with a progress callback function.

## Motivation

Iterating and operating on a large array can block the event loop if the block doesn't include asynchronous code.  This can cause lock up the browser

## Example

The following example can be used to square the integers in an array.

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