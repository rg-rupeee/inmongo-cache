# inmongo-cache


## Description

This NPM package provides a caching solution for storing and retrieving data in MongoDB itself, without the need for a separate in-memory database. It is designed to handle use cases where you want to cache objects or any data, such as caching API responses or caching processed objects for future use. This package specifically works with the Mongoose ORM.

## Installation

To install the package, you can use npm or yarn:

```shell
npm install inmongo-cache
```
or
```shell
yarn add inmongo-cache
```

## Usage

Import the package and initialize the cache model in your code. You need to provide a Mongoose instance and can optionally specify the model name and schema plugin in the options:

  ```javascript
  const cache = require('inmongo-cache');

  // Initialize the cache model
  cache.initialize(mongoose, 'Cache', options);
  ```

  - `mongoose`: The Mongoose instance you are using in your application.
  - `Cache` (optional): The name of the cache model. By default, it is set to `'Cache'`.
  - `options` (optional): Additional options for initialization. You can provide a schema plugin using `options.schemaPlugin` if needed.

### Methods

#### `add(key, value, ttlMins = defaultTTL)`

Adds a key-value pair to the cache.

- `key` (string): The key for the cache entry.
- `value` (any): The value to be stored in the cache.
- `ttlMins` (number): The time-to-live (TTL) for the cache entry in minutes. By default, it uses the default TTL value specified during initialization.

Example:

```javascript
await cache.add('key1', 'value1');
```

#### `remove(key)`

Removes a key-value pair from the cache.

- `key` (string): The key of the cache entry to be removed.

Example:

```javascript
await cache.remove('key1');
```

#### `exists(key)`

Checks if a key exists in the cache.

- `key` (string): The key to check for existence.

Example:

```javascript
const exists = await cache.exists('key1');
console.log(exists); // true or false
```

#### `get(key, options)`

Retrieves the value associated with a key from the cache.

- `key` (string): The key to retrieve the value for.
- `options` (object, optional): Additional options for the retrieval.
  - `raw` (boolean): If `true`, returns the raw value without the cache metadata.

Example:

```javascript
const value = await cache.get('key1');
console.log(value); // the cached value

const rawValue = await cache.get('key1', { raw: true });
console.log(rawValue); // the raw cached value without metadata
```

### Error Handling

If you attempt to use any of the cache methods before initializing the cache model, an `Error` will be thrown with the message: "Cache Model needs to be initialized."

Make sure to initialize the cache model before using any cache operations.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
