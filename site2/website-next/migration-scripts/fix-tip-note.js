const fs = require("fs");
const path = require("path");

function fixTip(data) {
  const _reg =
    /^([\t ]*)>[\t ]*#*[\t ]*\**(Note|Tip)+s?:?\**[\t ]*\n(([\t ]*)>[\t ]*[^><].*\n)+/gm;
  const _type_reg = /#*[\t ]*\**(Note|Tip)+s?:?\**[\t ]*/i;

  let type = "note";
  let _tips = data.match(_reg);
  if (!_tips) {
    return data;
  }
  for (let _tip of _tips) {
    let tip = _tip.replace(/^[ ]>/gm, ">").replace(/^([\t ]*>)[\t ]*/gm, "$1");
    let type_match = _type_reg.exec(tip);
    if (type_match) {
      type = type_match[1] + "";
      type = type.toLowerCase();
    }
    let space = /^([\t ]*)>/.exec(tip)[1];
    // if (space.length % 2 == 1) {
    //   space = space.substr(1);
    // }
    tip = tip
      .replace(_type_reg, "")
      .replace(/^([\t ]*)>[\t ]*/gm, space)
      .replace(/^\s*\n/gm, "");
    tip = space + ":::" + type + "\n\n" + tip + "\n" + space + ":::\n";
    data = data.replace(_tip, tip);
  }
  return data
    .replace(
      /(.*)(\s*\n){3,}(\s*:::.*)((((?!:::).)*\n*)+):::.*(\s*\n)+/g,
      "$1\n\n$3$4:::\n\n"
    ) //解决多个空行
    .replace(/(\s*:::.*(((?!:::).)*\n*)+):::.*\n+/g, "$1:::\n\n"); //解决多个空行 //解决代码块结束标识符后无空行
}

// function fixListWithTip(data) {
//   const _reg = /^([*-]\s+.*)([\s\S]*?)(:::[\s\S]*?:::)/gm;
//   let _match = data.match(_reg);
//   if (!_match) {
//     return data;
//   }
//   for (let _m of _match) {
//     let __m = _m.match(/^([*-]\s+.*)([\s\S]*?)(:::[\s\S]*?:::)/m);
//     let top = __m[1];
//     let seconds = __m[2];
//     let tip = __m[3];
//     // seconds = seconds.replace(/^([\t ]*)(\w+)/gm, "$1* $2");
//     tip = tip.replace(/^[\t ]+/gm, "");
//     data = data
//       .replace(_m, top + seconds + "\n" + tip)
//       .replace(/(\s*\n){3,}:::/g, "\n\n:::")
//       .replace(/:::(\s*\n){3,}/g, ":::\n\n");
//   }
//   return data;
// }

function fix(data) {
  data = fixTip(data);
  // data = fixListWithTip(data);
  return data;
}

function test() {
  let data = fs.readFileSync(
    path.join(__dirname, "../bak/tiered-storage-overview.md"),
    "utf8"
  );
  data = fix(data);
  fs.writeFileSync(
    path.join(__dirname, "../bak/tiered-storage-overview-fixed.md"),
    data
  );
}

// test();

module.exports = fix;
