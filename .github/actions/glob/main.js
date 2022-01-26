const path = require("path");

const {
  GITHUB_WORKSPACE,
  INPUT_FILES,
  INPUT_FILES_SEPARATOR,
  INPUT_FOLLOW_SYMBOLIC_LINKS,
  INPUT_SEPARATOR,
  INPUT_STRIP_TOP_LEVEL_DIR,
} = process.env;

const githubWorkspace = GITHUB_WORKSPACE || process.cwd();
const topLevelDir = `${githubWorkspace}${path.sep}`;

module.exports = async ({ core, glob }) => {
  let files;

  if (INPUT_FILES_SEPARATOR === "\\n") {
    files = INPUT_FILES;
  } else {
    files = INPUT_FILES.split(INPUT_FILES_SEPARATOR).join("\n");
  }

  const globOptions = {
    followSymbolicLinks: INPUT_FOLLOW_SYMBOLIC_LINKS === "true",
  };
  const globber = await glob.create(files, globOptions);
  let paths = await globber.glob();

  if (INPUT_STRIP_TOP_LEVEL_DIR === "true") {
    paths = paths
      .map((p) => p.replace(topLevelDir, ""))
      .filter((p) => p !== "");
  }

  core.setOutput("paths", paths.join(INPUT_SEPARATOR));
};
