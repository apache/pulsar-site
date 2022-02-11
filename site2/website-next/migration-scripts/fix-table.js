const fs = require("fs");
const path = require("path");
const NL = "\n";

//Convert HTML table to markdown table
function convertTableElementToMarkdown(table) {
  let rows = [];
  let trEls = table.match(/[<]tr[\s\S]*?[/]tr[>]/g);
  for (let i = 0; i < trEls.length; i++) {
    let tableRow = trEls[i];
    let markdownRow = convertTableRowElementToMarkdown(tableRow, i);
    rows.push(markdownRow);
  }
  return rows.join(NL);
}

//Convert the rows of the HTML table to the rows of the markdown table
function convertTableRowElementToMarkdown(tableRow, rowNumber) {
  let cells = [];
  let cellEls = [];
  cellEls = tableRow.match(/[<]th[\s\S]*?[/]th[>]/g);
  if (!cellEls || cellEls.length == 0) {
    cellEls = tableRow.match(/[<]td[\s\S]*?[/]td[>]/g);
  }
  let dividerCells = [];
  if (rowNumber == 0) {
    for (i = 0; i < cellEls.length; i++) {
      dividerCells.push("---" + " |");
    }
    dividerCells = "| " + dividerCells.join(" ");
  }
  for (let i = 0; i < cellEls.length; i++) {
    let cell = cellEls[i];
    cell.indexOf(">") + 1;

    cells.push(
      cell
        .substring(cell.indexOf(">") + 1, cell.indexOf("<", cell.indexOf(">")))
        .replace(/\*\s+([^\|\*]*)/g, "<li>$1</li>") + " | "
    );
  }
  let row = "| " + cells.join(" ");
  if (rowNumber == 0) {
    row = row + NL + dividerCells;
  }

  return row;
}

function fix(data) {
  let content = data;
  let patt1 = /[<]table[\s\S]*?[/]table[>]/g;
  let tables = content.match(patt1);
  if (tables) {
    for (let e of tables) {
      let et = e.replace(/\s+/g, " ");
      let markdownTable = convertTableElementToMarkdown(et);
      content = content.replace(e, markdownTable);
    }
  }
  return content;
}

function test() {
  let data = fs.readFileSync(path.join(__dirname, "../bak/txn-how.md"), "utf8");
  data = fix(data);
  fs.writeFileSync(path.join(__dirname, "../bak/txn-how-fixed.md"), data);
}

// test();

module.exports = fix;
