const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const fixMd = require("./tool/fix-md");
const findMd = require("./tool/find-md");

function migrate(version, docsId) {
  let dest = "../../website-next/versioned_docs/version-" + version;
  if (version == "next") {
    dest = "../../website-next/docs";
  }
  dest = path.join(__dirname, dest, docsId + ".md");
  let mdpath = findMd(version, docsId);
  let data = fs.readFileSync(mdpath, "utf8");
  data = fixMd(data, version);
  fs.writeFileSync(dest, data);
}

module.exports = migrate;

//Test
if (typeof require !== "undefined" && require.main === module) {
  // migrate("next", "adaptors-kafka");
  migrate("2.8.0", "adaptors-kafka");
}
