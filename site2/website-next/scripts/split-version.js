const fs = require("fs");
const path = require("path");
const versions = require("../versions-full.json");
const latestVersion = versions.shift();

fs.writeFileSync(path.join(__dirname, ".versions"), versions.join("\n") + "\n");
fs.writeFileSync(path.join(__dirname, ".latest"), latestVersion + "\n");