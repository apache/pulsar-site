const fs = require("fs");
const path = require("path");
const _ = require("lodash");

function travel(dir, callback) {
  if (fs.statSync(dir).isFile()) {
    if (dir.endsWith(".md")) {
      callback(dir);
    }
  } else {
    fs.readdirSync(dir).forEach((file) => {
      var pathname = path.join(dir, file);
      if (fs.statSync(pathname).isDirectory()) {
        travel(pathname, callback);
      } else if (pathname.endsWith(".md")) {
        callback(pathname);
      }
    });
  }
}

function fix(mdpath) {
  let data = fs.readFileSync(mdpath, "utf8");
  if (/<link rel="canonical"/g.test(data)) {
    return;
  }
  const idm = /^---\nid:\s*(.+)\s*/g.exec(data);
  if (!idm || idm.length < 1) {
    return;
  }
  const docId = idm[1];
  const canonicalUrl = `https://pulsar.apache.org/docs/${docId}/`;
  const canonicalMeta = `<head>
    <link rel="canonical" href="${canonicalUrl}" />
</head>`;
  data = data.replace(
    /(sidebar_label:.*\n---\s*\n)/gm,
    "$1\n" + canonicalMeta + "\n\n"
  );
  fs.writeFileSync(mdpath, data);
  console.log(mdpath + " fixed");
}

module.exports = (dir) => {
  travel(dir, fix);
};

// Example: node scripts/add-canonical.js versioned_docs/version-2.11.x/adaptors-kafka.md
if (typeof require !== "undefined" && require.main === module) {
  const [dir] = process.argv.slice(2);
  travel(path.join(__dirname, "..", dir), fix);
}

// Usage:
// Example 1: Update a specify md file:
// node scripts/add-canonical.js versioned_docs/version-2.11.x/adaptors-kafka.md

// Example 2: Update files in a specify directory:
// node scripts/add-canonical.js versioned_docs/version-2.11.x

// Example 3: Update all old version docs:
// node scripts/add-canonical.js versioned_docs

// Example 4: Update all current version docs:
// node scripts/add-canonical.js docs