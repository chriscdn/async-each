# @chriscdn/async-each

Asynchronously iterate over an array with optional concurrency control and a progress callback.

## Installation

```bash
npm install @chriscdn/async-each
# or
yarn add @chriscdn/async-each
```

## Motivation

Processing large arrays synchronously can block the event loop and make the UI unresponsive.

`@chriscdn/async-each` provides an asynchronous iteration method with optional concurrency control and progress reporting, returning a `Promise` that resolves to an array of results in the same order as the input.

## API

### `asyncEach<T, R>(items, callbackFn, statusCallbackFn?, options?) => Promise<R[]>`

Iterate over an array asynchronously.

#### Parameters

- `items: Array<T>`
  Array of items to process.

- `callbackFn: (item: T, index: number, items: Array<T>) => R | Promise<R>`
  Function executed for each item. Can return a value or a promise. Arguments:
  - `item` – Current item being processed
  - `index` – Zero-based index of the item
  - `items` – Full array being processed

- `statusCallbackFn?: (status: AsyncEachStatus<T, R>) => void`
  Optional callback invoked after each item completes. Receives a status object:
  - `progress` – Number of items processed so far
  - `total` – Total number of items
  - `percent` – Completion percentage (integer 0–100)
  - `item` – The item just processed
  - `index` – Index of the item
  - `result` – Value returned or resolved by `callbackFn` for this item

- `options?: { rateLimit?: number }`
  Optional configuration:
  - `rateLimit` – Maximum number of concurrent operations (default `0` for unlimited concurrency)

#### Returns

`Promise<R[]>` – Resolves to an array of results in the same order as the input array. Rejects if any callback fails.

## Types

```ts
export type AsyncEachStatus<T, R> = {
  progress: number;
  total: number;
  percent: number;
  item: T;
  index: number;
  result: R;
};
```

## Example

```ts
import { asyncEach } from "@chriscdn/async-each";

// Assume fetchUserData performs an async API call to return user info
const users = ["alice", "bob", "charlie", "dave"];

const results = await asyncEach(
  users,
  async (username) => fetchUserData(username),
  (status) => {
    console.log(
      `Processed ${status.progress}/${status.total} (${status.percent}%)`,
      status.result,
    );
  },
  { rateLimit: 2 }, // only 2 requests at a time
);

console.log("All users fetched:", results);
```

## License

[MIT](LICENSE)
