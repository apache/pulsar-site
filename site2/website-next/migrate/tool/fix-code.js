module.exports = (data) => {
  let nData = data;

  let reg = /^([\t ]*)(>*)([\t ]*)(```.*)((((?!```).)*\n*)+)```/gm; //代码块
  while ((codeGroup = reg.exec(data))) {
    let _match = codeGroup[0];
    let space1 = codeGroup[1];
    let arrow = codeGroup[2];
    let space2 = codeGroup[3];
    let begin = codeGroup[4];
    let code = codeGroup[5];
    let prefix = space1 + arrow + space2;
    if ((code = /[\t ]*(.+\n*)*\S/.exec(code))) {
      code = code[0]; //剔除纯空白的行首和行尾, 得到纯代码
      if (code.substr(0, prefix.length) != prefix) {
        code = prefix + code.replace(/\n(.*)/g, "\n" + prefix + "$1"); //行对齐
      }
    }
    let newCodeBlock =
      "\n" +
      prefix +
      begin +
      "\n" +
      prefix +
      "\n" +
      code +
      "\n" +
      prefix +
      "\n" +
      prefix +
      "```" +
      "\n";
    nData = nData.replace(_match, newCodeBlock);
  }
  return nData
    .replace(
      /(.*)(\s*\n){3,}(\s*```.*)((((?!```).)*\n*)+)```.*(\s*\n)+/g,
      "$1\n\n$3$4```\n\n"
    ) //解决多个空行
    .replace(/^(\s*```.*(((?!```).)*\n*)+)```.*\n+/gm, "$1```\n\n"); //解决多个空行 //解决代码块结束标识符后无空行
};
