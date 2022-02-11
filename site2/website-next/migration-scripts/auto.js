const fs = require("fs");
const path = require("path");
const lodash = require("lodash");
const child_process = require("child_process");
const migrate = require("./migrate-chapter");
const override = require("./override");

const args = process.argv.slice(2);
const version = args[0];
let rerun = version == "rerun";

function run(rerun) {
  if (rerun) {
    let cache = fs.readFileSync(path.join(__dirname, ".cache"), "utf8");
    cache = JSON.parse(cache);
    console.log(
      "auto migrate docs for version: ",
      cache.version,
      "chapter: ",
      cache.chapter
    );
    migrate(cache.version, cache.chapter, "");
    return;
  }

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

  sidebar = sidebar[version == "next" ? "docs" : version_full + "-docs"];

  let new_sidebar_file = path.join(
    __dirname,
    "../../website-next/versioned_sidebars/" + version_full + "-sidebars.json"
  );
  if (version == "next") {
    new_sidebar_file = path.join(__dirname, "../../website-next/sidebars.json");
  }

  let chapters = Object.keys(sidebar);

  function migrateChapter() {
    let new_sidebar = [];
    let new_sidebar_map = {};
    if (fs.existsSync(new_sidebar_file)) {
      new_sidebar = JSON.parse(fs.readFileSync(new_sidebar_file, "utf8"));
      let key =
        version == "next" ? "docsSidebar" : version_full + "/docsSidebar";
      new_sidebar = new_sidebar[key];
      new_sidebar_map = lodash.keyBy(new_sidebar, "label");
    }

    let migrated_chapters = Object.keys(new_sidebar_map);

    let need_migration_chapers = lodash.difference(chapters, migrated_chapters);

    let current_chapter =
      need_migration_chapers.length > 0 ? need_migration_chapers[0] : null;
    if (current_chapter) {
      console.log(
        "auto migrate docs for version: ",
        version,
        "chapter: ",
        current_chapter
      );
      migrate(version, current_chapter, "");
      fs.writeFileSync(
        path.join(__dirname, ".cache"),
        JSON.stringify({ version: version, chapter: current_chapter })
      );
    } else {
      console.log(
        "所有章节已迁移完成，现在执行一次完整的【" + version + "】copy fix"
      );
      override(version);
    }
  }

  migrateChapter();
}

run(rerun);
