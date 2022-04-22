const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const fixMd = require("./tool/fix-md");
const findMd = require("./tool/find-md");
const CONST = require("./const");
const { old, next } = CONST;

function travel(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    var pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

function migrate(mdpath) {
  let data = fs.readFileSync(mdpath, "utf8");
  data = fixMd(data)
    .replace(/title:\s*(.*)/, 'title: "$1"')
    .replace(/\.\.\/img\//g, "/img/");
  if (!/<!--truncate-->/.test(data)) {
    data = data.replace(/\.\n/, ".\n\n<!--truncate-->\n");
  }
  fs.writeFileSync(mdpath, data);
  console.log(mdpath + " fixed");
}

module.exports = (dir) => {
  travel(dir, migrate);
};

//Test
if (typeof require !== "undefined" && require.main === module) {
  travel(path.join(__dirname, "../blog"), migrate);
}
