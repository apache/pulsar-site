const chokidar = require("chokidar");
const args = process.argv.slice(2);
const src = args[0];
const versions = args.slice(1);

let execa = null;
(async () => {
  execa = (await import("execa")).execaCommand;
  execa("sh preview.sh " + versions.join(" "), {
    stdio: "inherit",
  });
})();

const watcher = chokidar.watch([src + "/docs", src + "/website"], {
  persistent: true,
});

function _watch(path) {
  let dest = src + "/.preview/pulsar-site/site2/website-next";
  if (/pulsar-manager-release-notes\.md/.exec(path)) {
    dest += "/pulsar-manager/pulsar-manager-release-notes.md";
  } else if (/pulsar-manager-release\.json/.exec(path)) {
    dest += "/pulsar-manager/pulsar-manager-release.json";
  } else if (/pulsar-adapters-release\.json/.exec(path)) {
    dest = "/pulsar-manager/pulsar-adapters-release.json";
  } else if (/\/docs\/assets\/(.*)/.exec(path)) {
    const r = /\/docs\/assets\/(.*)/.exec(path);
    dest += "/static/assets/" + r[1];
  } else if (/(\/docs\/.*)/.exec(path)) {
    const r = /(\/docs\/.*)/.exec(path);
    dest += r[1];
  } else if (/\/website\/(.*)/.exec(path)) {
    const r = /\/website\/(.*)/.exec(path);
    dest += "/" + r[1];
  } else {
    console.log(path, "has been changed, do a full sync");
    execa("sh scripts/sync-docs.sh " + src).stdout.pipe(process.stdout);
    return;
  }
  console.log(path, "has been changed, sync to " + dest);
  execa("cp -r " + path + " " + dest).stdout.pipe(process.stdout);
}

let inited = false;
watcher
  .on("ready", function () {
    console.log("Ready for watch files changes...");
    inited = true;
  })
  .on("add", function (path) {
    if (inited) {
      _watch(path);
    }
  })
  .on("change", function (path) {
    _watch(path);
  });
