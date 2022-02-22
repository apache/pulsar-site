const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

let versions = require("../versions-full.json");
const latestVersion = versions[0];
versions.push("next");
const locales = ["en", "zh-CN", "zh-TW", "ja", "ko", "fr"];

function _template(locale, version, docsId) {
  locale = locale == "en" ? "" : "/" + locale;
  version = version ? "/" + version : "";
  const tmp = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=${locale}/docs${version}/${docsId}">
    <link rel="canonical" href="${locale}/docs${version}/${docsId}" />
  </head>
  <script>
    window.location.href = '${locale}/docs${version}/${docsId}';
  </script>
</html>`;
  return tmp;
}

for (let locale of locales) {
  for (let version of versions) {
    if (version == latestVersion) {
      version = "";
    }
    let dir = path.join(__dirname, "../build/docs/" + version);
    let docsList = fs.readdirSync(dir);
    for (let filename of docsList) {
      if (/((\d\.?)+)|next/gm.exec(filename)) {
        continue;
      }
      let _continue = false;
      for (let _locale of locales) {
        let reg = new RegExp("^" + _locale + "$");
        if (reg.exec(filename)) {
          _continue = true;
          break;
        }
      }
      if (_continue) {
        continue;
      }
      if (!filename.endsWith(".md")) {
        continue;
      }
      let docsId = filename.substring(0, filename.indexOf(".md"));
      let destDir = path.join(
        __dirname,
        "../build",
        "docs",
        locale,
        version,
        docsId
      );
      if (!fs.existsSync(destDir)) {
        mkdirp.sync(destDir);
      }
      console.log(path.join(destDir, "index.html"));
      fs.writeFileSync(
        path.join(destDir, "index.html"),
        _template(locale, version, docsId)
      );
    }
  }
}
