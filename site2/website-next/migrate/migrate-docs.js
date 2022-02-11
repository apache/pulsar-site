const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const fixMd = require("./tool/fix-md");
import { fileURLToPath } from "url";

function travel(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    callback(path.join(dir, file));
  });
}

function fix(version, docsId) {
  let version_full = "version-" + version;
  let src = "../../website/versioned_docs/" + version_full;
  let dest = "../../website-next/versioned_docs/" + version_full;
  if (version == "next") {
    src = "../../docs";
    dest = "../../website-next/docs";
  }
  src = path.join(__dirname, src);

  //find docs with id docsId
   
  let reg = new RegExp("^id:\\s*version-" + version + "-(incubating-)?");

  //   dest = path.join(__dirname, dest);

  //   travel(src, function (pathname) {
  //     let filename = path.basename(pathname);
  //     try {
  //       fs.statSync(dest);
  //     } catch {
  //       fs.mkdirSync(dest);
  //     }
  //     console.log(filename);
  //     let data = fs.readFileSync(pathname, "utf8");
  //     data = fixMd(data, version);
  //     // filename = filename == "deploy-dcos.md" ? "deploy-docs.md" : filename;
  //     fs.writeFileSync(path.join(dest, filename), data);
  //   });
}

module.exports = fix;

// if (process.argv[1] === fileURLToPath(import.meta.url)) {
//   const args = process.argv.slice(2);
//   const version = args[0];
//   const docsId = args[1];
// }
