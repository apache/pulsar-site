const migrateVersion = require("./migrate-version");

let versions = require("../versions.json");
versions = ["next"].concat(versions);

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
