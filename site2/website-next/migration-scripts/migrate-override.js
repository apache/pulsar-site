const fix = require("./override");
const args = process.argv.slice(2);
fix(args[0]);
