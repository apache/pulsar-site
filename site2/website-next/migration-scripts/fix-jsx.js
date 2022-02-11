module.exports = (data) => {
  return data
    .replace(/(import Tabs from '@theme\/Tabs';)/g, "````mdx-code-block\n$1")
    .replace(/(import TabItem from '@theme\/TabItem';)/g, "$1\n````")
    .replace(/(<Tabs>?)/g, "````mdx-code-block\n$1")
    .replace(/(<\/Tabs>)/g, "$1\n````");
};
