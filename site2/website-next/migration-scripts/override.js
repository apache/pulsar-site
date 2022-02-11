const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const fixMd = require("./fix-md");

function travel(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    var pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      // travel(pathname, callback);
      // } else if (file == "tiered-storage-filesystem.md") {
    } else {
      callback(pathname);
    }
  });
}

function fix(version) {
  let version_full = "version-" + version;
  let src = "../../website/versioned_docs/" + version_full;
  let dest = "../../website-next/versioned_docs/" + version_full;
  if (version == "next") {
    src = "../../docs";
    dest = "../../website-next/docs";
  }
  src = path.join(__dirname, src);
  dest = path.join(__dirname, dest);

  travel(src, function (pathname) {
    let filename = path.basename(pathname);
    try {
      fs.statSync(dest);
    } catch {
      fs.mkdirSync(dest);
    }
    console.log(filename);
    let data = fs.readFileSync(pathname, "utf8");
    data = fixMd(data, version);
    // filename = filename == "deploy-dcos.md" ? "deploy-docs.md" : filename;
    fs.writeFileSync(path.join(dest, filename), data);
  });
}

module.exports = fix;
