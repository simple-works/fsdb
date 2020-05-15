//==============================================================================
// ■ Convert (fsdb/utils/convert.js)
//------------------------------------------------------------------------------
//     Type conversion utility functions.
//==============================================================================
const { pick, omit } = require("lodash");
const { singularize } = require("i")();

module.exports = {
  pick,
  omit,
  singularize,

  stringToArray(value) {
    return value ? (Array.isArray(value) ? value : [value]) : [];
  },

  expand(obj = {}, query = {}) {
    const {
      localField = "someId",
      foreignField = "id",
      foreignArray = [],
      newField = `${localField}_expandation`
    } = query;
    const item = { ...obj };
    item[newField] = foreignArray.find(
      foreignItem => foreignItem[foreignField] === item[localField]
    );
    return item;
  },
  embed(obj = {}, query = {}) {
    const {
      localField = "id",
      foreignField = "someId",
      foreignArray = [],
      newField = "embedment",
      count = false
    } = query;
    const item = { ...obj };
    const result = foreignArray.filter(
      foreignItem => foreignItem[foreignField] === item[localField]
    );
    item[newField] = count ? result.length : result;
    return item;
  }
};
