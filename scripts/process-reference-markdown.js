// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

// Post-processes the Docsify reference site under build/reference/<version>/**/*.md:
//   - expands @pulsar:...@ tokens using the same resolver the Docusaurus
//     markdown preprocessor uses (src/server/markdownPreprocessors/pulsarVariables)
//   - rewrites `pathname:///` (a Docusaurus-only link prefix that Docsify
//     renders literally) to `/`
//
// The Docsify site is served straight from static/, so Docusaurus's markdown
// preprocessor pipeline does not touch it. This script fills that gap at
// build time, operating on the build output to keep source files clean.

"use strict";

require("ts-node").register({
  transpileOnly: true,
  compilerOptions: {
    module: "commonjs",
    moduleResolution: "node",
    esModuleInterop: true,
    resolveJsonModule: true,
    target: "ES2022",
  },
});

const fs = require("fs");
const path = require("path");

const {replacePulsarTokens} = require("../src/server/markdownPreprocessors/pulsarVariables");

const PATHNAME_PREFIX_RE = /pathname:\/\/\//g;

function collectMarkdown(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectMarkdown(full));
    } else if (entry.isFile() && full.endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}

function processVersion(referenceDir, versionDirName) {
  const versionKey = versionDirName === "next" ? "current" : versionDirName;
  const absDir = path.join(referenceDir, versionDirName);
  const files = collectMarkdown(absDir);
  let changed = 0;
  for (const file of files) {
    const original = fs.readFileSync(file, "utf8");
    const next = replacePulsarTokens(original, versionKey, file).replace(PATHNAME_PREFIX_RE, "/");
    if (next !== original) {
      fs.writeFileSync(file, next);
      changed += 1;
    }
  }
  return {total: files.length, changed};
}

function main() {
  const referenceDir = path.resolve(__dirname, "..", "build", "reference");
  if (!fs.existsSync(referenceDir)) {
    console.log(`[process-reference-markdown] ${referenceDir} does not exist, skipping`);
    return;
  }
  let totalFiles = 0;
  let totalChanged = 0;
  for (const entry of fs.readdirSync(referenceDir, {withFileTypes: true})) {
    if (!entry.isDirectory()) continue;
    const {total, changed} = processVersion(referenceDir, entry.name);
    totalFiles += total;
    totalChanged += changed;
  }
  console.log(
    `[process-reference-markdown] processed ${totalFiles} file(s) under build/reference (${totalChanged} rewritten)`,
  );
}

main();
