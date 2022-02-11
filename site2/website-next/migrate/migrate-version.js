const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const migrateChapter = require("./migrate-chapter");

function _log(msg) {
  if (typeof require !== "undefined" && require.main === module) {
    console.log(msg);
  }
}

const migrate = (version) => {
  let version_full = "version-" + version;
  let src = "../../website/versioned_docs/" + version_full;
  let dest = "../../website-next/versioned_docs/" + version_full;
  if (version == "next") {
    src = "../../docs";
    dest = "../../website-next/docs";
  }
  src = path.join(__dirname, src);
  dest = path.join(__dirname, dest);

  let sidebar_file = path.join(
    __dirname,
    "../../website/versioned_sidebars/" + version_full + "-sidebars.json"
  );
  if (version == "next") {
    sidebar_file = path.join(__dirname, "../../website/sidebars.json");
  }
  let sidebar = fs.readFileSync(sidebar_file, "utf8");
  sidebar = JSON.parse(sidebar);

  const _key = version == "next" ? "docs" : version_full + "-docs";
  let chapterList = _.keys(sidebar[_key]);
  console.log("[" + version + "]migrate...");
  for (let chapter of chapterList) {
    migrateChapter(version, chapter);
  }
};

module.exports = migrate;

//Test
if (typeof require !== "undefined" && require.main === module) {
  migrate("next");
  //   migrate("2.8.0");
}
