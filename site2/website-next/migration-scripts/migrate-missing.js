const fix = require("./fix-missing");
const args = process.argv.slice(2);
fix(args[0], args[1]);
