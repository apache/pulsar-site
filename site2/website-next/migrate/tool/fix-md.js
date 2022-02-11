const fixTab = require("./fix-tab");
const fixTipNote = require("./fix-tip-note");
const fixTable = require("./fix-table");
const fixCode = require("./fix-code");
const fixTipNoteInList = require("./fix-tip-note-in-list");
const fixJSX = require("./fix-jsx");

function fix(data, version) {
  let reg = new RegExp("id:\\s*version-" + version + "-(incubating-)?");
  data = fixTable(data);
  data = fixTab(data);
  data = data.replace(/(<TabItem.*)\n(.*{@inject:\s*.+?})/g, "$1\n\n$2");
  data = data.replace(/^(>\s*```\w*)(\s*\n){2,}>/gm, "$1\n>\n>");
  data = fixTipNote(data);
  data = fixTipNoteInList(data);
  data = fixCode(data);
  console.log('....')
  data = data
    .replace(reg, "id: ")
    .replace("id: deploy-docs", "id: deploy-dcos")
    .replace(/`{4,}/g, "```")
    .replace(/^(id:\sstandalone)\s*$/gm, "slug: /\n$1")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/\[(.*)\]\s*\((.*)\.md\)/g, "[$1]($2)")
    .replace(/\*\*(((?!\*).)+)\*/g, "**$1**") //**macOS* => **macOS**
    .replace(/\*\*(((?!\*).)+)\*{3}/g, "**$1**") //**macOS*** => **macOS**
    .replace(/(\w)[\t ]*\n\[/g, "$1 [")
    .replace(/sidebar_label:\s*(.*)/, 'sidebar_label: "$1"')
    .replace(/""(.*)""/, '"$1"')
    .replace(/\[\[pulsar:version_number\]\]/g, "@pulsar:version_number@")
    .replace(/{{(pulsar:.*?)}}/g, "@$1@")
    .replace(/(@inject:\s*\w+:)`(\w+)`/g, "$1$2")
    .replace(/<empty string>/g, "|")
    .replace(/<li>(((?!<\/?li>|\|).)+)/g, "<li>$1</li>")
    .replace(/<\/li>\s*<\/li>/g, "</li>")
    .replace(/\|(((?!<\/?li>|\|).)+)<\/li>/g, "|<li>$1</li>")
    .replace(/<\/li>\s*<\/li>/g, "</li>") //sometimes needed, no idea for now...
    .replace(/<\/br>/g, "@AAA@")
    .replace(/<br>/g, "@AAA@")
    .replace(/<br\/>/g, "@AAA@")
    .replace(/<>/g, "")
    .replace(/@AAA@/g, "<br />")
    .replace(
      /<span style="(((?!:).)+):(((?!>).)+);"/g,
      '<span style={{color: "$3"}}'
    )
    .replace(/\s?style=".*?"/g, "")
    .replace(/\]\(assets\//g, "](/assets/");

  return data;
  // return fixJSX(data);
}

module.exports = fix;
