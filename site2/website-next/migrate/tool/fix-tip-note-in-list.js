module.exports = (data) => {
  let nData = data;
  let block = null;

  let uListReg = /^([\*-][\t ]+.*)\n+((\n*[\t ]+.*)*)*/gm;

  while ((block = uListReg.exec(data))) {
    let content = block[2];
    if (!content) {
      continue;
    }
    let nContent = content.replace(/^    (?= *)/gm, "  ");
    nData = nData.replace(content, nContent);
  }

  let listReg = /^(\d+\.[\t ]+.*)\n+((\n*[\t ]+.*)*)*/gm;
  while ((block = listReg.exec(data))) {
    let content = block[2];
    if (!content) {
      continue;
    }
    let nContent = content.replace(/^    (?= *)/gm, "   ");
    nData = nData.replace(content, nContent);
  }

  return nData;
};
