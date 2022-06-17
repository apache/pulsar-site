const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);
const file = args[0];
let data = fs.readFileSync(file, "utf8");
data = data.replace(/<script src="\/assets\/js\/runtime.*/g, "");
fs.writeFileSync(file, data, "utf8");
