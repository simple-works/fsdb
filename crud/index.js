//==============================================================================
// ■ CRUD (fsdb/crud/index.js)
//------------------------------------------------------------------------------
//     CRUD operations functions.
//==============================================================================
const $create = require("./create");
const $read = require("./read");
const $update = require("./update");
const $delete = require("./delete");

//------------------------------------------------------------------------------
// ● CRUD-API
//------------------------------------------------------------------------------
function $crud(collection) {
  return {
    async create(item, options) {
      return await $create(collection, item, options);
    },
    async read(query, options) {
      return await $read(collection, query, options);
    },
    async update(query, item, options) {
      return await $update(collection, query, item, options);
    },
    async delete(query, options) {
      return await $delete(collection, query, options);
    },
    async clear() {
      collection.splice(0, collection.length);
      await collection.save();
    },
    async drop() {
      collection.db[collection.name] = undefined;
      await collection.save();
    }
  };
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = $crud;
