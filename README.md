# fsdb (File System Database)

Simple NodeJS File System Database.

<!-- toc -->

- [Install](#install)
- [Getting Started](#getting-started)
- [Initialize](#initialize)
- [CREATE](#create)
  - [CREATE Examples](#create-examples)
  - [CREATE Queries](#create-queries)
  - [CREATE Options](#create-options)
- [READ](#read)
  - [READ Examples](#read-examples)
  - [READ Queries](#read-queries)
  - [READ Options](#read-options)
- [UPDATE](#update)
  - [UPDATE Examples](#update-examples)
  - [UPDATE Queries](#update-queries)
  - [UPDATE Options](#update-options)
- [DELETE](#delete)
  - [DELETE Examples](#delete-examples)
  - [DELETE Queries](#delete-queries)
  - [DELETE Options](#delete-options)
- [Other](#other)

<!-- tocstop -->

## Install

```bash
npm install amb-fsdb
```

## Getting Started

```javascript
// Require library
const fsdb = require("amb-fsdb");

// Initialize database
const db = await fsdb();

// Create a new item within a collection named "players"
// If the collection doesn't exist it will be created automatically
await db("players").create({
  name: "ambratolm",
  level: 99,
  inventory: ["sword", "shield", "potion"]
});

// Read all items in "players" collection
const players = await db("players").read();
console.log(players);
```

A database JSON file named `db.json` will be created in the current directory with the following content:

```json
{
  "players": [
    {
      "name": "ambratolm",
      "level": 99,
      "inventory": ["sword", "shield", "potion"],
      "id": "c8256c53-44ba-4ef4-bc89-e6e9a400fc0c",
      "createdAt": "2020-09-28T02:01:39.064Z"
    }
  ]
}
```

The `Id` and `createdAt` fields are created automatically.

## Initialize

```javascript
// Initialize with a "db.json" file in the current directory
const db = await fsdb();

// Initialize with a custom named ".json" file in current directory
const db = await fsdb("my-database-file");

// Initialize with a custom named ".json" file in the specified directory
const db = await fsdb("my-database-file", "../some/directory");
```

## CREATE

```javascript
await db(collectionName).create(item, options);
```

Creates a new item in a collection.
If the specified collection doesn't exist it will be created automatically.
The created item is returned.

| Parameter      | Type   | Default | Description                             |
| -------------- | ------ | ------- | --------------------------------------- |
| collectionName | string |         | Targeted collection                     |
| item           | object |         | Item to create                          |
| options        | object | {}      | Additional options                      |
| **@returns**   | object |         | The created item                        |
| **@throws**    | Error  |         | If a unique field value is already used |
| **@throws**    | Error  |         | If a value to encrypt is not a string   |

### CREATE Examples

```javascript
// Create an item within a collection named "players" (automatically created)
// The created item is returned
const createdPlayer = await db("players").create({
  name: "ambratolm",
  level: 99,
  inventory: ["sword", "shield", "potion"]
});

// Create an item within a collection named "players" with some options
const createdPlayer = await db("players").create(
  {
    name: "ambratolm",
    level: 99,
    inventory: ["sword", "shield", "potion"],
    password: "this_is_a_secret"
  },
  {
    // Options
    unique: ["name"], // Make "name" field unique
    encrypt: ["password"], // Encrypt "password" field
    omit: ["password", "level"], // Omit fields in the returned item object
    nocase: true // Ignore case when comparing strings
  }
);
```

### CREATE Queries

No Queries.

### CREATE Options

| Propperty | Type     | Default | Description                     |
| --------- | -------- | ------- | ------------------------------- |
| unique    | string[] | []      | Fields to make unique           |
| encrypt   | string[] | []      | Fields to encrypt               |
| pick      | string[] | []      | Fields to pick in returned item |
| omit      | string[] | []      | Fields to omit in returned item |
| nocase    | boolean  | false   | Ignore case in search           |

## READ

```javascript
await db(collectionName).read(query, options);
```

Reads an existing item in a collection.
If the specified collection doesn't exist it will be created automatically.
The read item is returned.

| Parameter      | Type   | Default | Description                       |
| -------------- | ------ | ------- | --------------------------------- |
| collectionName | string |         | Targeted collection               |
| query          | object |         | Query object or function          |
| options        | object | {}      | Additional options                |
| **@returns**   | object |         | The read item                     |
| **@throws**    | Error  |         | If an encrypted field not matched |

### READ Examples

```javascript
// Read all items in "players" collection
const players = await db("players").read();

// Read items matching a query object
const somePlayers = await db("players").read({ name: "ambratolm" });

// Read items matching a query function
const someOtherPlayers = await db("players").read(player => player.level >= 90);

// Read items matching a query with some options
const player = await db("players").read(
  { name: "AmBrAtOlM" },
  {
    // Options
    nocase: true, // Ignore case when comparing strings
    one: true // return only one result (an object instead of array)
  }
);
```

### READ Queries

...

### READ Options

...

## UPDATE

```javascript
await db(collectionName).update(query, changes, options);
```

Updates an existing item in a collection.
If the specified collection doesn't exist it will be created automatically.
The updated item is returned.

| Parameter      | Type   | Default | Description                             |
| -------------- | ------ | ------- | --------------------------------------- |
| collectionName | string |         | Targeted collection                     |
| query          | object |         | Query object or function                |
| changes        | object |         | Changes to apply                        |
| options        | object | {}      | Additional options                      |
| **@returns**   | object |         | The updated item                        |
| **@throws**    | Error  |         | If Items matching query not found       |
| **@throws**    | Error  |         | If a unique field value is already used |
| **@throws**    | Error  |         | If a value to encrypt is not a string   |

### UPDATE Examples

```javascript
// Update item(s)
// The updated item is returned
const updatedPlayer = await db("players").update(
  { name: "ambratolm" }, // Query can also be a function
  { name: "new name", level: 0 } // Changes to apply
);

// Update item(s) with some options
const updatedPlayer = await db("players").update(
  { name: "ambratolm" }, // Query can also be a function
  { name: "new name", level: 0 }, // Changes to apply
  {
    // Options
  }
);
```

### UPDATE Queries

...

### UPDATE Options

...

## DELETE

```javascript
await db(collectionName).delete(query, options);
```

Deletes an existing item in a collection.
If the specified collection doesn't exist it will be created automatically.
The deleted item is returned.

| Parameter      | Type   | Default | Description                       |
| -------------- | ------ | ------- | --------------------------------- |
| collectionName | string |         | Targeted collection               |
| query          | object |         | Query object or function          |
| options        | object | {}      | Additional options                |
| **@returns**   | object |         | The deleted item                  |
| **@throws**    | Error  |         | If Items matching query not found |

### DELETE Examples

```javascript
// Delete item(s)
// The deleted item is returned
const deletedPlayer = await db("players").delete(
  { name: "ambratolm" } // Query can also be a function
);

// Delete item(s) with some options
const deletedPlayer = await db("players").delete(
  { name: "ambratolm" }, // Query can also be a function
  {
    // Options
  }
);
```

### DELETE Queries

...

### DELETE Options

...

## Other

```javascript
// Remove all collections
await db.drop();

// Remove a collection named "players"
await db("players").drop();

// Remove all items in a collection named "players" and keep it
await db("players").clear();
```
