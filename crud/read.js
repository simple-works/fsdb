//==============================================================================
// ■ READ (crud/read.js)
//------------------------------------------------------------------------------
//     READ opeation for database CRUD operations.
//=============================================================================
const { isObject, isFunction, isEmpty } = require("../utils/type");
const { matches } = require("../utils/compare");
const { filterAndMap, paginate, orderBy } = require("../utils/range");
const { pick, omit, expand, embed } = require("../utils/convert");
const { check } = require("../utils/crypt");

//------------------------------------------------------------------------------
// ● READ-Opeation
//------------------------------------------------------------------------------
async function $read(collection, query, options = {}) {
  const { one: oneItem } = options;
  let items = _filterAndMap(collection, query, options);
  items = _orderBy(items, options);
  await _decrypt(items, options);
  items = _paginate(items, options);
  items = _expandOrEmbed(items, collection.name, options);
  return oneItem ? items[0] : items;
}

//------------------------------------------------------------------------------
// ● Helpers
//------------------------------------------------------------------------------
function _filterAndMap(items, query, options = {}) {
  const {
    pick: fieldsToPick,
    omit: fieldsToOmit,
    nocase: ignoreCase
  } = options;
  const pickOrOmit = () => {
    return fieldsToPick
      ? item => pick(item, fieldsToPick)
      : item => omit(item, fieldsToOmit);
  };
  if (isObject(query)) {
    return filterAndMap(items, matches(query, { ignoreCase }), pickOrOmit());
  } else if (isFunction(query)) {
    return filterAndMap(items, query, pickOrOmit());
  } else {
    return items.filter(() => true);
  }
}
function _orderBy(items, options = {}) {
  const { fieldsToSortBy, ordersToSortBy } = options;
  return orderBy(items, fieldsToSortBy, ordersToSortBy);
}
async function _decrypt(items, options = {}) {
  const { queryToDecrypt } = options;
  if (!isEmpty(queryToDecrypt)) {
    for (const item of items) {
      for (const prop in queryToDecrypt) {
        if (!(await check(queryToDecrypt[prop], item[prop]))) {
          throw new Error(`Encrypted field [${prop}] not matched`);
        }
      }
    }
  }
}
function _paginate(items, options = {}) {
  const { perPage, pageNumber } = options;
  return paginate(items, perPage, pageNumber);
}
function _expandOrEmbed(items, collectionName, options = {}) {
  const { expand: expandCollectionName, embed: embedCollectionName } = options;
  if (expandCollectionName) {
    items = items.map(item => expand(item, expandCollectionName));
  }
  if (embedCollectionName) {
    items = items.map(item => embed(item, collectionName, embedCollectionName));
  }
  return items;
}
//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $read;
