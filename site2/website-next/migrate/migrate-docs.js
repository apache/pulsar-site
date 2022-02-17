const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const fixMd = require("./tool/fix-md");
const findMd = require("./tool/find-md");
const CONST = require("./const");
const { old, next } = CONST;

function migrate(version, chapter, docsId, cb) {
  let dest = `../../${next.baseDir}/versioned_docs/version-` + version;
  if (version == "next") {
    dest = "../../" + next.docsDir;
  }
  let destDir = path.join(__dirname, dest);
  dest = path.join(__dirname, dest, docsId + ".md");
  let mdpath = findMd(version, docsId);
  if (mdpath) {
    console.log(
      "         [" +
        version +
        ":" +
        chapter +
        ":" +
        docsId +
        "] from " +
        mdpath +
        " migrate..."
    );
    let data = fs.readFileSync(mdpath, "utf8");
    data = fixMd(data, version);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir);
    }
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
        "] from " +
        mdpath +
        " was not fund, skip..."
    );
  }
  return mdpath;
}

module.exports = migrate;

//Test
if (typeof require !== "undefined" && require.main === module) {
  // migrate("next", "Deployment", "deploy-dcos");
  migrate("2.9.1", "Development", "develop-schema");
  // migrate("2.8.0", "", "adaptors-kafka");
}
