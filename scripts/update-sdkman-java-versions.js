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

// Updates data/sdkman-java-amzn-versions.json with the latest Amazon Corretto JDK
// identifiers published in SDKMAN, for each Java major version already listed in the file.
// The values back the @pulsar:version:sdkman-java<N>@ tokens used in the SDKMAN
// commands of the contributor guide.
//
// Usage: node scripts/update-sdkman-java-versions.js

"use strict";

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "sdkman-java-amzn-versions.json");
const LIST_URL = "https://api.sdkman.io/2/candidates/java/linuxx64/versions/list?installed=";

async function main() {
  const response = await fetch(LIST_URL);
  if (!response.ok) {
    throw new Error(`GET ${LIST_URL} failed: ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  // The identifier is the last column of each row, e.g. "| 21.0.13.1.2-amzn".
  const identifiers = [...text.matchAll(/\|\s*(\d+)\.(\S+-amzn)\s*$/gm)].map((m) => ({
    major: m[1],
    identifier: `${m[1]}.${m[2]}`,
  }));
  const current = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const updated = {};
  for (const [major, previous] of Object.entries(current)) {
    // SDKMAN lists the identifiers of a vendor newest first.
    const latest = identifiers.find((entry) => entry.major === major);
    if (latest === undefined) {
      console.warn(`No Corretto ${major} found in SDKMAN, keeping ${previous}`);
      updated[major] = previous;
      continue;
    }
    if (latest.identifier !== previous) {
      console.log(`Java ${major}: ${previous} -> ${latest.identifier}`);
    }
    updated[major] = latest.identifier;
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2) + "\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
