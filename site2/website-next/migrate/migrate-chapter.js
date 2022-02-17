const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const migrateDocs = require("./migrate-docs");
const CONST = require("./const");
const { old, next } = CONST;

function _log(msg) {
  if (typeof require !== "undefined" && require.main === module) {
    console.log(msg);
  }
}

const migrate = (version, category, cb) => {
  let version_full = "version-" + version;
  let src = `../../${old.baseDir}/versioned_docs/` + version_full;
  let dest = `../../${next.baseDir}/versioned_docs/` + version_full;
  if (version == "next") {
    src = "../../" + old.docsDir;
    dest = "../../" + next.docsDir;
  }
  src = path.join(__dirname, src);
  dest = path.join(__dirname, dest);

  let sidebar_file = path.join(
    __dirname,
    `../../${old.baseDir}/versioned_sidebars/` + version_full + "-sidebars.json"
  );
  if (version == "next") {
    sidebar_file = path.join(__dirname, `../../${old.baseDir}/sidebars.json`);
  }
  let sidebar = fs.readFileSync(sidebar_file, "utf8");
  sidebar = JSON.parse(sidebar);

  const _key = version == "next" ? "docs" : version_full + "-docs";
  sidebar = sidebar[_key][category];
  if (version != "next") {
    sidebar = sidebar.map((item) => {
      return item.substr(version_full.length + 1);
    });
  }
  if (!sidebar) {
    return;
  }

  let new_sidebar_file = "";
  let new_sidebar = {};

  if (version == "next") {
    new_sidebar_file = path.join(
      __dirname,
      `../../${next.baseDir}/sidebars.json`
    );
    try {
      new_sidebar = fs.readFileSync(new_sidebar_file, "utf8");
      new_sidebar = JSON.parse(new_sidebar);
    } catch {
      new_sidebar = {
        docsSidebar: [],
      };
    }
    let categoryMap = _.keyBy(new_sidebar.docsSidebar, "label");
    if (!categoryMap[category]) {
      new_sidebar.docsSidebar.push({
        type: "category",
        label: category,
        items: sidebar,
      });
    } else {
      categoryMap[category].items = sidebar;
      new_sidebar.docsSidebar = _.values(categoryMap);
    }
  } else {
    new_sidebar_file = path.join(
      __dirname,
      `../../${next.baseDir}/versioned_sidebars/` +
        version_full +
        "-sidebars.json"
    );
    try {
      new_sidebar = fs.readFileSync(new_sidebar_file, "utf8");
      new_sidebar = JSON.parse(new_sidebar);
    } catch {
      new_sidebar = {
        [version_full + "/docsSidebar"]: [],
      };
    }
    let categoryMap = _.keyBy(
      new_sidebar[version_full + "/docsSidebar"],
      "label"
    );
    if (!categoryMap[category]) {
      new_sidebar[version_full + "/docsSidebar"].push({
        type: "category",
        label: category,
        items: sidebar.map((item) => {
          return {
            type: "doc",
            id:
              version_full +
              "/" +
              (item == "deploy-docs" ? "deploy-dcos" : item),
          };
        }),
        // collapsible: true,
        // collapsed: true,
      });
    } else {
      categoryMap[category].items = sidebar.map((item) => {
        return {
          type: "doc",
          id:
            version_full + "/" + (item == "deploy-docs" ? "deploy-dcos" : item),
        };
      });
      new_sidebar[version_full + "/docsSidebar"] = _.values(categoryMap);
    }
  }
  fs.writeFileSync(new_sidebar_file, JSON.stringify(new_sidebar, null, 2));

  console.log("     [" + version + ":" + category + "]migrate...");
  for (let docsId of sidebar) {
    migrateDocs(version, category, docsId, cb);
  }
};

module.exports = migrate;

//Test
if (typeof require !== "undefined" && require.main === module) {
  //   migrate("next", "Pulsar IO");
  migrate("2.8.0", "Pulsar IO");
}
