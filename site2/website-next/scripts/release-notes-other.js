const fs = require("fs");
const request = require("sync-request");
const md2json = require("md-2-json");
const _ = require("lodash");
const path = require("path");
const token = process.env.TOKEN;

const args = process.argv.slice(2);
const dir = args[0];

let fileList = fs.readFileSync(
  path.join(dir, "/site2/website-next/other-component.json"),
  "utf-8"
);
let allPageMd = fs.readFileSync(
  path.join(dir, "/site2/website-next/release-notes/all.md"),
  "utf8"
);
let fileListJson = JSON.parse(fileList);

let origin = "https://api.github.com/repos";

fileListJson.forEach((element) => {
  let repo = new Object();
  let repoContet = new Object();
  let fileName = element.split("/")[2];

  if (element == "/apache/pulsar-dotpulsar") {
    let url = origin + element;
    getDotPulsarMd(url);
  } else {
    repo = getRequest(origin + element + "/releases");
    repoContet = JSON.parse(repo.getBody("utf-8"));

    let typeList = fileName.split("-");
    let type = typeList[typeList.length - 1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    repoContet.forEach((ele) => {
      ele.fileName = fileName;
      ele.type = type;
      ele.bigVersion =
        ele.tag_name.slice(1).slice(0, ele.tag_name.slice(1).lastIndexOf(".")) +
        ".x";
      let value = {
        client: fileName,
        version: ele.tag_name.slice(1),
        body: ele.body,
      };
      let content = generateMdByContent(value);

      fs.writeFileSync(
        path.join(
          dir,
          "/site2/website-next/release-notes/docs/" +
            value.client +
            "-" +
            value.version +
            ".md"
        ),
        content
      );
    });

    let categoryGroup = _.groupBy(repoContet, "type");
    for (let [key, value] of Object.entries(categoryGroup)) {
      allPageMd += `\n### ${key === "Node" ? "NodeJs" : key}\n`;
      let bigVersionGroup = _.groupBy(value, "bigVersion");

      for (let [bigVersionKey, bigVersionVal] of Object.entries(
        bigVersionGroup
      )) {
        allPageMd += `#### ${bigVersionKey}\n`;
        let versionGroup = _.groupBy(bigVersionVal, "tag_name");
        for (let [versionKey, versionVal] of Object.entries(versionGroup)) {
          allPageMd += `[${versionKey}](/release-notes/docs/${versionVal[0].fileName.toLowerCase()}-${versionKey.slice(
            1
          )})&ensp;&ensp;`;
        }
        allPageMd += `  \n`;
      }
    }
  }
});

fs.writeFileSync(
  path.join(dir, "/site2/website-next/release-notes/all.md"),
  allPageMd,
  "utf8"
);

function generateMdByContent(value) {
  let clientName = value.client
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  let id = value.client + "-" + value.version;
  if (!value.version) {
    id = value.client;
  }

  let result = `---
id: ${id}
title: ${clientName}
sidebar_label: ${clientName}
---

`;
  return result + value.body;
}

function getRequest(url) {
  return (res = request("GET", url, {
    headers: {
      "User-Agent": "request",
      Authorization: token,
    },
    json: true,
  }));
}

function getDotPulsarMd(url) {
  let contents = getRequest(url + "/contents/CHANGELOG.md").getBody("utf-8");
  let contentsBody = JSON.parse(contents);
  let changeLog = Buffer.from(contentsBody.content, "base64").toString();
  let changeLogJson = md2json.parse(changeLog);
  let versionObject = [];

  for (let [key, value] of Object.entries(changeLogJson["Changelog"])) {
    if (key.includes("[")) {
      let strEnd = key.search("]");
      let version = key.slice(1, strEnd);
      let bigVersion = version.slice(0, version.lastIndexOf(".")) + ".x";

      let content = md2json.toMd([value]);
      let temp = `---
id: pulsar-cs-${version}
title: Pulsar DotPulsar
sidebar_label: Pulsar DotPulsar
---
${content.replace(/# 0/, " ")}
`;
      fs.writeFileSync(
        path.join(
          dir,
          "/site2/website-next/release-notes/docs/pulsar-cs-" + version + ".md"
        ),
        temp
      );

      versionObject.push({
        bigVersion: bigVersion,
        version: version,
      });
    }
  }

  allPageMd += `### C#\n`;

  let bigVersionGroup = _.groupBy(versionObject, "bigVersion");

  for (let [key, value] of Object.entries(bigVersionGroup)) {
    allPageMd += `\n#### ${key}\n`;
    let versionGroup = _.groupBy(value, "version");
    for (let [versionKey, versionVal] of Object.entries(versionGroup)) {
      allPageMd += `[${versionKey}](/release-notes/docs/pulsar-cs-${versionVal[0].version})&ensp;&ensp;\n`;
    }
  }
}
