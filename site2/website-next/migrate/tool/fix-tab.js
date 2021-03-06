const fs = require("fs");
const path = require("path");
const lodash = require("lodash");
const TAB_REG =
  /([\t ]*)<!--DOCUSAURUS_CODE_TABS-->(((?!<!--END_DOCUSAURUS_CODE_TABS-->).)*\n*)*<!--END_DOCUSAURUS_CODE_TABS-->/;

function removeTabTag(tab) {
  return tab
    .replace(/<!--DOCUSAURUS_CODE_TABS-->/, "")
    .replace(/<!--END_DOCUSAURUS_CODE_TABS-->/, "");
}

function findTabItemNameList(tab) {
  const _match = tab.match(/<!--(.*)-->/g);
  return _match.map((item) => {
    return item.replace("<!--", "").replace("-->", "");
  });
}

function replaceTabItemTag(tab) {
  const tab_item_reg = /([\t ]*)<!--(.*)-->((((?![\t ]*<!--).)*\n*)*)/;
  const _match = tab_item_reg.exec(tab);
  if (_match) {
    const space = _match[1];
    const tab_item_name = _match[2];
    const tab_item_content = lodash.trimEnd(_match[3]);
    let tab_item_str = space + '<TabItem value="';
    tab_item_str +=
      tab_item_name + '">' + tab_item_content + "\n\n" + space + "</TabItem>\n";
    tab = tab.replace(tab_item_reg, tab_item_str);
    return replaceTabItemTag(tab);
  } else {
    return tab;
  }
}

function importTabComponent(data) {
  if (!/import Tabs from '@theme\/Tabs';/g.exec(data)) {
    return data.replace(
      /---((((?!---).)*\n*)*)---/,
      "---$1---" +
        "\n\nimport Tabs from '@theme/Tabs';\nimport TabItem from '@theme/TabItem';\n"
    );
  }
  return data;
}

function fixTab(data) {
  const _match = TAB_REG.exec(data);
  if (_match) {
    data = importTabComponent(data);
    let tab = _match[0];
    tab = removeTabTag(tab);
    const names = findTabItemNameList(tab);
    tab = replaceTabItemTag(tab);
    const names_map = names.map((item) => {
      return {
        label: item,
        value: item,
      };
    });

    const space = _match[1];
    const tab_tag_begin =
      space +
      "<Tabs \n" +
      space +
      '  defaultValue="' +
      names[0] +
      '"\n' +
      space +
      "  values={" +
      JSON.stringify(names_map) +
      "}>";

    const tab_tag_end = "\n" + space + "</Tabs>";
    tab = tab_tag_begin + tab + tab_tag_end;
    return fixTab(data.replace(TAB_REG, tab));
  } else {
    return data
      .replace(/(<TabItem.*)\n[\t ]*\n/g, "$1\n")
      .replace(/(<TabItem.*)/g, "$1\n");
  }
}

function test() {
  let data = fs.readFileSync(
    path.join(__dirname, "../bak/schema-manage.md"),
    "utf8"
  );
  data = fixTab(data);
  console.log(data);
}

// test()

module.exports = fixTab;
