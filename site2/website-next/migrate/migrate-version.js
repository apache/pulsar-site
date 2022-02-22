const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const leftMd = require("./tool/left-md");
const fixMd = require("./tool/fix-md");
const migrateChapter = require("./migrate-chapter");
const delDuplicate = require("./tool/del-duplicate");
const CONST = require("./const");
const { old, next } = CONST;

const migrate = (version) => {
  let version_full = "version-" + version;
  let src = `../../${old.baseDir}/versioned_docs/` + version_full;
  let dest = `../../${next.baseDir}/versioned_docs/` + version_full;
  if (version == "next") {
    src = "../../" + old.docsDir;
    dest = "../../" + next.docsDir;
  }
  src = path.join(__dirname, src);
  dest = path.join(__dirname, dest);

  // let sidebar_file = path.join(
  //   __dirname,
  //   `../../${old.baseDir}/versioned_sidebars/` + version_full + "-sidebars.json"
  // );
  // if (version == "next") {
  //   sidebar_file = path.join(__dirname, `../../${old.baseDir}/sidebars.json`);
  // }
  // let sidebar = fs.readFileSync(sidebar_file, "utf8");
  // sidebar = JSON.parse(sidebar);

  // const _key = version == "next" ? "docs" : version_full + "-docs";
  // let chapterList = _.keys(sidebar[_key]);

  // let migratedList = [];
  // for (let chapter of chapterList) {
  //   migrateChapter(version, chapter, (docsId) => {
  //     migratedList.push(docsId);
  //   });
  // }
  // let leftMdList = leftMd(version, migratedList);
  // for (let mdfile of leftMdList) {
  //   console.log(
  //     "     [" + version + ":left:" + path.basename(mdfile) + "]migrate..."
  //   );
  //   let data = fixMd(fs.readFileSync(mdfile, "utf8"));
  //   fs.writeFileSync(path.join(dest, path.basename(mdfile)), data);
  // }
  // delDuplicate(dest, version);

  //copy about.md from next version dir
  let aboutDocPath = path.join(__dirname, `../../${next.docsDir}/about.md`);
  let destSidebarPath = path.join(
    __dirname,
    `../../${next.baseDir}/versioned_sidebars/${version_full}-sidebars.json`
  );
  if (version == "next") {
    destSidebarPath = path.join(
      __dirname,
      `../../${next.baseDir}/sidebars.json`
    );
  } else {
    fs.writeFileSync(
      path.join(dest, "about.md"),
      fs.readFileSync(aboutDocPath, "utf8")
    );
  }

  sidebar = fs.readFileSync(destSidebarPath, "utf8");
  sidebar = JSON.parse(sidebar);
  let items = Object.values(sidebar)[0];
  let aboutId = version == "next" ? "about" : `${version_full}/about`;
  let _items = [
    {
      type: "doc",
      id: aboutId,
    },
  ];
  for (let item of items) {
    if (item.type == "doc" && item.id == aboutId) {
      continue;
    }
    _items.push(item);
  }
  sidebar[Object.keys(sidebar)[0]] = _items;
  fs.writeFileSync(destSidebarPath, JSON.stringify(sidebar, null, 2), "utf8");
};

module.exports = migrate;

//Test
if (typeof require !== "undefined" && require.main === module) {
  const args = process.argv.slice(2);
  migrate(args[0]);
}
