const fs = require("fs");
const path = require("path");

function travel(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    var pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

function fixMd(mdpath) {
  let data = fs.readFileSync(mdpath, "utf8");
  data = data.replace(/href=“([^”]+)”/, '"href="$1"');
  fs.writeFileSync(mdpath, data);
  console.log(mdpath + " i18n fixed");
}

module.exports = (dir) => {
  travel(dir, fixMd);
};

//Test
if (typeof require !== "undefined" && require.main === module) {
  travel(
    path.join(__dirname, "../i18n/zh-CN/docusaurus-plugin-content-docs"),
    fixMd
  );
}
