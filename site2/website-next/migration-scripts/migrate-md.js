const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const fixMd = require("./fix-md");

const args = process.argv.slice(2);
const src = args[0];
const dest = args[1];

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

if (!fs.existsSync(src)) {
  console.log(src, "is not exists.");
  return;
}

let stat = fs.statSync(src);
if (stat.isDirectory()) {
  stat = fs.statSync(dest);
  if (!stat.isDirectory()) {
    fs.mkdirSync(dest);
  }
  travel(src, (pathname) => {
    let data = fs.readFileSync(pathname, "utf8");
    data = fixMd(data, "blog");
    data = data.replace(/!\[\]\(\.\.\/img\//g, "![](/img/");
    fs.writeFileSync(path.join(dest, path.basename(pathname)), data);
  });
} else {
  let data = fs.readFileSync(src, "utf8");
  data = fixMd(data, "blog");
  data = data.replace(/!\[\]\(\.\.\/img\//g, "![](/img/");
  fs.writeFileSync(dest, data);
}

console.log("Done.");
