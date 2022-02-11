const fs = require("fs");
const path = require("path");

function fix(docId, versions) {
  console.log("Fix missing for: ", docId, versions);

  let fixed = false;

  function travel(dir, callback) {
    fs.readdirSync(dir)
      .sort(() => -1)
      .forEach((file) => {
        var pathname = path.join(dir, file);
        if (fs.statSync(pathname).isDirectory()) {
          if (!fixed) {
            travel(pathname, callback);
          }
        } else {
          if (!fixed) {
            fixed = callback(pathname);
          }
        }
      });
  }

  const vdocs = path.join(__dirname, "../../website/versioned_docs");
  travel(vdocs, (pathname) => {
    let data = fs.readFileSync(pathname, "utf8");
    let _match = /^id:\s*version-[\d\.]+-(incubating-)?(.*)/gm.exec(data);
    //   if (_match[1].indexOf(docId) > -1) {
    if (_match && _match[2] == docId) {
      console.log(pathname, _match[0]);

      let vs = versions.split(",");
      vs.forEach((v) => {
        if (v == "next") {
          fs.writeFileSync(
            path.join(vdocs, "../../docs/", docId + ".md"),
            data.replace(/^id:\s*version-[\d\.]+-(.*)/gm, "id: " + docId),
            "utf8"
          );
        } else {
          fs.writeFileSync(
            path.join(vdocs, "version-" + v, docId + ".md"),
            data.replace(
              /^id:\s*version-[\d\.]+-(.*)/gm,
              "id: version-" + v + "-" + docId
            ),
            "utf8"
          );
        }
      });
      return true;
    }
    return false;
  });
}

module.exports = fix;
