//==============================================================================
// ■ CREATE (crud/create.js)
//------------------------------------------------------------------------------
//     CREATE opeation for database CRUD operations.
//=============================================================================
const { generateId } = require("../utils/id");
const { encrypt } = require("../utils/crypt");
const { pick, omit } = require("../utils/convert");
const { alreadyInUse } = require("../utils/range");
const { isString } = require("../utils/type");

//------------------------------------------------------------------------------
// ● CREATE-Opeation
//------------------------------------------------------------------------------
async function $create(collection, item, options = {}) {
  const {
    unique: fieldsToUniquify,
    encrypt: fieldsToEncrypt,
    pick: fieldsToPick,
    omit: fieldsToOmit,
    nocase: ignoreCase
  } = options;
  if (fieldsToUniquify) {
    if (
      alreadyInUse(collection, pick(item, fieldsToUniquify), { ignoreCase })
    ) {
      throw new Error(
        `Could not create item [${JSON.stringify(item)}] in [${
          collection.name
        }] collection because [${fieldsToUniquify}] unique fields values are already in use`
      );
    }
  }
  if (fieldsToEncrypt) {
    for (const field of fieldsToEncrypt) {
      if (!isString(item[field])) {
        throw new Error(
          `Could not encrypt [${field}: ${item[field]}] field value because it is not a string `
        );
      }
      item[field] = await encrypt(item[field]);
    }
  }
  item.id = generateId();
  item.createdAt = new Date();
  collection.push(item);
  await collection.save();
  return fieldsToPick ? pick(item, fieldsToPick) : omit(item, fieldsToOmit);
}

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $create;
