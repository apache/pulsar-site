const fs = require("fs");
const path = require("path");
// const { exec } = require("child_process");
const versions = require("../versions-full.json");
const latestVersion = versions.shift();

fs.writeFileSync(path.join(__dirname, ".versions"), versions.join("\n") + "\n");
fs.writeFileSync(path.join(__dirname, ".latest"), latestVersion + "\n");

// async function _build(version) {
//   return new Promise((resolve, reject) => {
//     let data = JSON.stringify([version], null, 2);
//     fs.writeFileSync(path.join(__dirname, "../versions.json"), data);
//     console.log("Begin build", version);
//     exec(
//       `yarn build && mkdir -p build-${version}/${version} build-${version}/${version}.md && cp -r build/docs/${version}/* build-${version}/${version} && cp -r build/docs/${version}.md/* build-${version}/${version}.md`,
//       (error, stdout, stderr) => {
//         if (error) {
//           reject(error.message);
//         } else if (stderr) {
//           reject(stderr);
//         } else {
//           resolve(stdout);
//         }
//       }
//     );
//   });
// }

// (async () => {
//   try {
//     for (let version of versions) {
//       let res = await _build(version);
//       console.log(res);
//       console.log(version, "build done...");
//     }
//     let res = await _build(latestVersion);
//     console.log(res);
//     console.log(latestVersion, "build done...");
//     console.log("All versions build done...");
//   } catch (e) {
//     console.log(e);
//   }
// })();
