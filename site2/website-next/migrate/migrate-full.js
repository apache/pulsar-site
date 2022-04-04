const migrateVersion = require("./migrate-version");
const _ = require("lodash");
let versions = require("../versions.json");
let stageVersions = require("../stage-versions.json");
versions = ["next"].concat(stageVersions).concat(versions);
versions = _.uniq(versions);

const migrate = (vs) => {
  (vs || versions).forEach((v) => {
    migrateVersion(v);
  });
};

module.exports = migrate;

//Test
if (typeof require !== "undefined" && require.main === module) {
  migrate();
}
