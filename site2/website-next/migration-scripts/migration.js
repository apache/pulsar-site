const migrate = require("./migrate-chapter");

const args = process.argv.slice(2);
const version = args[0];
const category = args[1];
const prefix = args[2];

migrate(version, category, prefix);
