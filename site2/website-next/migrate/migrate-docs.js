const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const fixMd = require("./tool/fix-md");
const findMd = require("./tool/find-md");
import { old, next } from "./const";

function _log(msg) {
  if (typeof require !== "undefined" && require.main === module) {
    console.log(msg);
  }
}

function migrate(version, chapter, docsId, cb) {
  let dest = `../../${next.baseDir}/versioned_docs/version-` + version;
  if (version == "next") {
    dest = "../../" + next.docsDir;
  }
  dest = path.join(__dirname, dest, docsId + ".md");
  let mdpath = findMd(version, docsId);
  if (mdpath) {
    console.log(
      "         [" + version + ":" + chapter + ":" + docsId + "]migrate..."
    );
    let data = fs.readFileSync(mdpath, "utf8");
    data = fixMd(data, version);
    fs.writeFileSync(dest, data);
    cb && cb(docsId);
  } else {
    console.log(
      "         [" +
        version +
        ":" +
        chapter +
        ":" +
        docsId +
        "] was not fund, skip..."
    );
  }
}

module.exports = migrate;

//Test
if (typeof require !== "undefined" && require.main === module) {
  // migrate("next", "Deployment", "deploy-dcos");
  migrate("next", "Security", "security-tls-keystore");
  // migrate("2.8.0", "", "adaptors-kafka");
}
