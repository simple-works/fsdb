//==============================================================================
// ■ Database (fsdb/index.js)
//------------------------------------------------------------------------------
//     Database access logic.
//==============================================================================
const $file = require("./file");
const $crud = require("./crud/");

//------------------------------------------------------------------------------
// ● Setup-Collection
//------------------------------------------------------------------------------
function $collection(collectionName, data, $save) {
  let collection = data[collectionName];
  if (!collection) {
    collection = data[collectionName] = [];
  }
  collection.name = collectionName;
  collection.db = data;
  collection.save = async () => await $save(data);
  return collection;
}

//------------------------------------------------------------------------------
// ● Database-API
//------------------------------------------------------------------------------
async function fsdb(fileName, dirName) {
  const { $filePath, $load, $save } = $file(fileName, dirName);
  console.log("[fsdb]", $filePath);
  let data = {};
  try {
    data = await $load();
    console.log("[fsdb] File found. Data loaded.");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("[fsdb] No such a file. New data created.");
    }
  }
  const db = collectionName => {
    const collection = $collection(collectionName, data, $save);
    return $crud(collection);
  };
  db.filePath = $filePath;
  db.data = data;
  db.drop = async () => {
    data = {};
    await $save(data);
  };
  return db;
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = fsdb;
