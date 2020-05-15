//==============================================================================
// ■ Database-File (fsdb/file.js)
//------------------------------------------------------------------------------
//     Database file system IO opeations.
//==============================================================================
const fs = require("fs");
const path = require("path");

//------------------------------------------------------------------------------
// ● File-API
//------------------------------------------------------------------------------
function $file(fileName = "db", dirName = "") {
  const filePath = path.join(__dirname, dirName, `${fileName}.json`);
  return {
    $filePath: filePath,
    async $load() {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
        });
      });
    },
    async $save(data) {
      return new Promise((resolve, reject) => {
        const dataJson = JSON.stringify(data, null, 2);
        if (dataJson === undefined) {
          reject(new Error("Invalid data JSON format"));
        } else {
          fs.writeFile(filePath, dataJson, "utf-8", err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }
      });
    }
  };
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = $file;
