const fs = require("fs");
const path = require("path");
const _ = require("lodash");
let versions = require("../versions.json");
const latestVersion = versions.shift();
versions = versions.concat(["next"]);
fs.writeFileSync(path.join(__dirname, ".versions"), versions.join("\n") + "\n");
fs.writeFileSync(path.join(__dirname, ".latest"), latestVersion + "\n");
