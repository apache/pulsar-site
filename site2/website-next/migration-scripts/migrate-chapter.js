//Usage:
//Example
//node scripts/migration.js 2.7.3 "Concepts and Architecture" concepts
//node scripts/migration.js 2.7.3 "Concepts and Architecture" concepts fix

const fs = require("fs");
const path = require("path");
const nextSidebar = require("../sidebars");
const _ = require("lodash");
const fixMd = require("./fix-md");
const fixMissing = require("./fix-miss");

function travel(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    var pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      // travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

module.exports = function migrate(version, category, prefix) {
  try {
    console.log(
      "migration docs for ",
      "version: ",
      version,
      "category: ",
      category,
      "prefix: ",
      prefix
    );

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
    sidebar = sidebar[_key][category];
    if (version != "next") {
      sidebar = sidebar.map((item) => {
        return item.substr(version_full.length + 1);
      });
    }
    if (!sidebar) {
      return;
    }
    let new_sidebar_file = path.join(
      __dirname,
      "../../website-next/versioned_sidebars/" + version_full + "-sidebars.json"
    );
    let new_sidebar = nextSidebar;
    if (version == "next") {
      new_sidebar_file = path.join(
        __dirname,
        "../../website-next/sidebars.json"
      );
      if (!_.keyBy(new_sidebar.docsSidebar, "label")[category]) {
        new_sidebar.docsSidebar.push({
          type: "category",
          label: category,
          items: sidebar,
        });
      }
    } else {
      try {
        new_sidebar = fs.readFileSync(new_sidebar_file, "utf8");
        new_sidebar = JSON.parse(new_sidebar);
      } catch {
        new_sidebar = {
          [version_full + "/docsSidebar"]: [],
        };
      }
      if (
        !_.keyBy(new_sidebar[version_full + "/docsSidebar"], "label")[category]
      ) {
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
      }
    }
    fs.writeFileSync(new_sidebar_file, JSON.stringify(new_sidebar, null, 2));

    // console.log("path: ", src, dest);
    let migrated_docs = [];
    travel(src, function (pathname) {
      let filename = path.basename(pathname);
      try {
        let stat = fs.statSync(dest);
        if (!stat.isDirectory()) {
          fs.mkdirSync(dest);
        }
      } catch {
        fs.mkdirSync(dest);
      }
      if (
        sidebar.includes(filename.substr(0, filename.length - 3)) ||
        (prefix && filename.startsWith(prefix))
      ) {
        console.log(filename);
        migrated_docs.push(filename.substr(0, filename.length - 3));
        // if (fix) {
        let data = fs.readFileSync(pathname, "utf8");
        data = fixMd(data, version);
        fs.writeFileSync(
          path.join(
            dest,
            filename
            // filename == "deploy-dcos.md" ? "deploy-docs.md" : filename
          ),
          data
        );
        // } else {
        //   fs.copyFileSync(pathname, path.join(dest, filename));
        // }
      } else {
        let data = fs.readFileSync(pathname, "utf8");
        let _match = /^id:\s*version-[\d\.]+-(.*)/gm.exec(data);
        if (_match && sidebar.includes(_match[1])) {
          // filename = _match[1] + '.md';
          // if (fix) {
          console.log(filename);
          migrated_docs.push(_match[1]);
          data = fixMd(data, version);
          fs.writeFileSync(path.join(dest, filename), data);
          // } else {
          //   fs.copyFileSync(pathname, path.join(dest, filename));
          // }
        }
      }
    });
    let missing_docs = _.difference(sidebar, migrated_docs);
    if (missing_docs.length > 0) {
      console.log("fix missing docs:", missing_docs);
      missing_docs.forEach((docId) => {
        fixMissing(docId, version);
        let filename = docId + ".md";
        let _src = path.join(src, filename);
        let data = fs.readFileSync(_src, "utf8");
        data = fixMd(data, version);
        fs.writeFileSync(path.join(dest, filename), data);
        fs.unlinkSync(_src);
      });
    }
  } catch (e) {
    console.error(e);
  }
};
