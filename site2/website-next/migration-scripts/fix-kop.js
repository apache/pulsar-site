const fs = require("fs");
const path = require("path");
const axios = require("axios");

const versionReg = /^v(\d+\.?){3,4}$/gm;
const dir = "/Users/leo/space/sn/pulsar-hub/protocol-handlers/kop";
const tags_url =
  "https://urfreespace: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@api.github.com/repos/streamnative/kop/tags";
const kop_md_url =
  "https://urfreespace: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@raw.githubusercontent.com/streamnative/kop/{{version}}/docs/kop.md";

async function fix() {
  let { data } = await axios({
    method: "get",
    url: tags_url,
    proxy: {
      host: "127.0.0.1",
      port: 7890,
    },
  });
  let tags = data
    .map((item) => item.name)
    .filter((item) => versionReg.test(item));
  // console.log(tags);
  for (let tag of tags) {
    let url = kop_md_url.replace(/{{version}}/, tag);
    let { data } = await axios({
      method: "get",
      url: url,
      proxy: {
        host: "127.0.0.1",
        port: 7890,
      },
    });
    let _path = path.join(dir, tag.substr(1));
    if (!fs.existsSync(_path)) {
      fs.mkdirSync(_path);
    }
    data = data.replace(/kop\/blob\/master/g, "kop/blob/" + tag);
    fs.writeFileSync(path.join(_path, "kop.md"), data);
  }
}

fix();
