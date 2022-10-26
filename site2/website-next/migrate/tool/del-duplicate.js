const fs = require("fs");
const path = require("path");

module.exports = (dest, version) => {
  let duplicateMap = {};
  let allDocs = fs.readdirSync(dest);
  for (let filename of allDocs) {
    let pathname = path.join(dest, filename);
    if (fs.statSync(pathname).isDirectory()) {
      continue;
    }
    if (!pathname.endsWith(".md")) {
      continue;
    }
    let data = fs.readFileSync(pathname, "utf8");
    try {
      let id = /id:\s*(.*)/.exec(data)[1];
      duplicateMap[id] = duplicateMap[id] || [];
      duplicateMap[id].push(pathname);
    } catch (error) {
      console.log("...error path: ", pathname);
      throw error;
    }
  }
  for (let [key, duplicateFiles] of Object.entries(duplicateMap)) {
    if (duplicateFiles.length > 1) {
      for (let file of duplicateFiles) {
        if (key + ".md" != path.basename(file)) {
          console.log(
            "     [" + version + ":duplicate:" + key + "]del " + file
          );
          fs.unlinkSync(file);
        }
      }
    }
  }
};
