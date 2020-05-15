//==============================================================================
// ■ Type (fsdb/utils/type.js)
//------------------------------------------------------------------------------
//     Type checking utility functions.
//==============================================================================
const { isEmpty } = require("lodash");

module.exports = {
  isEmpty,

  isPrimitive(value) {
    return (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    );
  },
  isString(value) {
    return typeof value === "string";
  },
  isNumber() {
    return typeof value === "number";
  },
  isBoolean() {
    return typeof value === "boolean";
  },

  isObject(value) {
    return typeof value === "object" && !Array.isArray(value);
  },
  isArray(value) {
    return Array.isArray(value);
  },

  isFunction(value) {
    return typeof value === "function";
  }
};
