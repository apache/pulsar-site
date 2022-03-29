const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const versions = require("../versions-full.json");

let allPageMd = `---
id: all
title: All Releases
sidebar_label: All Releases
slug: /
---

`;
let allList = [];

const args = process.argv.slice(2);
const dir = args[0];
let VERSION = null;
let COMPONENT = null;
if (args.length > 1) {
  COMPONENT = args[1];
}
if (args.length > 2) {
  VERSION = args[2];
}

function generateMdByVersion(version) {
  const src = path.join(
    dir,
    "/site2/website-next/scripts/release-notes",
    version + ".json"
  );
  const dest = path.join(dir, "/site2/website-next/release-notes/docs");

  const data = fs.readFileSync(src, "utf8");

  let list = JSON.parse(data);
  list = list
    .filter((item) => {
      let { labels } = item;
      return labels.find((label) => {
        return label.name.startsWith("component");
      });
    })
    .map((item) => {
      let { title, number, labels } = item;
      let label = labels.find((label) => {
        return label.name.startsWith("component");
      });
      label = label.name.substr("component/".length).replace("c++", "CPP");
      let category = "pulsar";
      let top = category;
      if (label.indexOf("client") > -1) {
        top = "client";
        category = label;
        if (label == "client") {
          category = "client-java";
        }
      }
      let [v1, v2] = version.split(".");
      return {
        title,
        number,
        label,
        category,
        top,
        bigVersion: v1 + "." + v2 + ".x",
        version,
      };
    });
  allList = allList.concat(list);

  let group = _.groupBy(list, "category");

  for (let [category, prs] of Object.entries(group)) {
    if (COMPONENT && category != COMPONENT) {
      continue;
    }
    let result = `---
id: ${category.toLowerCase()}-${version}
title: ${_.startCase(
      category.toLowerCase() == "pulsar" ? "apache pulsar" : category
    )} ${version} 
sidebar_label: ${_.startCase(
      category.toLowerCase() == "pulsar" ? "apache pulsar" : category
    )} ${version} 
---

`;

    let _labelGroup = _.groupBy(prs, "label");
    for (let [_label, _prs] of Object.entries(_labelGroup)) {
      if (Object.keys(_labelGroup).length > 1) {
        result += "## " + _label + "\n";
      }
      result += _prs
        .map((pr) => {
          return pr.title + " #" + pr.number + "  ";
        })
        .join("\n");
      result += "\n\n";
    }
    fs.writeFileSync(
      path.join(dest, category.toLowerCase() + "-" + version + ".md"),
      result,
      "utf8"
    );
    console.log(
      path.join(dest, category.toLowerCase() + "-" + version + ".md")
    );
  }
}

function generateAll() {
  let topGroup = _.groupBy(allList, "top");
  for (let [topKey, topVal] of Object.entries(topGroup)) {
    allPageMd += `## ${_.startCase(topKey)} Release Notes\n`;
    let categoryGroup = _.groupBy(topVal, "category");
    for (let [categoryKey, categoryVal] of Object.entries(categoryGroup)) {
      if (categoryKey.toLowerCase() != "pulsar") {
        allPageMd += `### ${_.startCase(categoryKey.replace("client-", ""))}\n`;
      }
      let bigVersionGroup = _.groupBy(categoryVal, "bigVersion");
      for (let [bigVersionKey, bigVersionVal] of Object.entries(
        bigVersionGroup
      )) {
        allPageMd += `#### ${bigVersionKey}\n`;
        let versionGroup = _.groupBy(bigVersionVal, "version");
        for (let [versionKey, versionVal] of Object.entries(versionGroup)) {
          allPageMd += `[${versionKey}](/release-notes/docs/${categoryKey.toLowerCase()}-${versionKey})&ensp;&ensp;`;
        }
        allPageMd += `  \n`;
      }
    }
  }

  fs.writeFileSync(
    path.join(dir, "/site2/website-next/release-notes", "all.md"),
    allPageMd,
    "utf8"
  );
}

if (VERSION) {
  generateMdByVersion(VERSION);
} else {
  for (let version of versions) {
    generateMdByVersion(version);
  }
  //Only if the version is not specified, please modify all.md manually if the version is specified to avoid overwriting the contents of other versions
  generateAll();
}
