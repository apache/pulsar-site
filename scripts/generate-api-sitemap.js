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

// Generates static/api-sitemap.xml from the contents of static/api/.
// One entry per API library (admin, client, cpp, js, pulsar-functions,
// python) — the latest non-disallowed version. Crawlers walk deeper from
// each index page. Versions matched by a Disallow line in static/robots.txt
// are excluded before "latest" is picked, so robots.txt remains the single
// source of truth for which API versions are excluded from indexing.
//
// Run manually after adding a new API version:
//   node scripts/generate-api-sitemap.js
// Then add a `Sitemap: https://pulsar.apache.org/api-sitemap.xml` line to
// static/robots.txt if not already present, and commit both files.

"use strict";

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://pulsar.apache.org";
const STATIC_DIR = path.resolve(__dirname, "..", "static");
const API_DIR = path.join(STATIC_DIR, "api");
const ROBOTS_FILE = path.join(STATIC_DIR, "robots.txt");
const OUTPUT_FILE = path.join(STATIC_DIR, "api-sitemap.xml");

function parseDisallowPatterns(robotsTxt) {
  // Translate robots.txt path patterns to anchored RegExps.
  // '*' matches any sequence; '$' anchors end-of-path; everything else is literal.
  const patterns = [];
  for (const line of robotsTxt.split(/\r?\n/)) {
    const match = line.match(/^\s*Disallow:\s*(\S+)\s*$/i);
    if (!match) continue;
    const raw = match[1];
    if (!raw || raw === "/") continue;
    let regex = "";
    for (const ch of raw) {
      if (ch === "*") regex += ".*";
      else if (ch === "$") regex += "$";
      else regex += ch.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    }
    patterns.push(new RegExp("^" + regex));
  }
  return patterns;
}

function isDisallowed(urlPath, patterns) {
  return patterns.some((p) => p.test(urlPath));
}

const VERSION_RE = /^(\d+)\.(\d+)\./;

// Sort key: higher major/minor first; non-version-shaped names sort last.
function versionSortKey(name) {
  const m = name.match(VERSION_RE);
  return m ? [-Number(m[1]), -Number(m[2])] : [Infinity, Infinity];
}

function compareVersions(a, b) {
  const [a1, a2] = versionSortKey(a);
  const [b1, b2] = versionSortKey(b);
  return a1 - b1 || a2 - b2 || a.localeCompare(b);
}

// Returns {libName: [version, ...]} for all libraries under static/api/.
function collectLibraryVersions() {
  const libs = {};
  if (!fs.existsSync(API_DIR)) return libs;
  for (const lib of fs.readdirSync(API_DIR, {withFileTypes: true})) {
    if (!lib.isDirectory() || lib.name.startsWith(".")) continue;
    const libDir = path.join(API_DIR, lib.name);
    libs[lib.name] = fs.readdirSync(libDir, {withFileTypes: true})
      .filter((v) => v.isDirectory() && !v.name.startsWith("."))
      .map((v) => v.name);
  }
  return libs;
}

function buildSitemap(urls) {
  const items = urls
    .map((p) =>
      `  <url>
    <loc>${SITE_URL}${p}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`;
}

function main() {
  const robotsTxt = fs.readFileSync(ROBOTS_FILE, "utf8");
  const patterns = parseDisallowPatterns(robotsTxt);
  const libs = collectLibraryVersions();

  const urls = [];
  const skipped = [];
  for (const lib of Object.keys(libs).sort()) {
    const candidates = libs[lib]
      .filter((v) => !isDisallowed(`/api/${lib}/${v}/`, patterns))
      .sort(compareVersions);
    if (candidates.length === 0) {
      skipped.push(lib);
      continue;
    }
    urls.push(`/api/${lib}/${candidates[0]}/`);
  }

  fs.writeFileSync(OUTPUT_FILE, buildSitemap(urls));
  const rel = path.relative(process.cwd(), OUTPUT_FILE);
  console.log(
    `[generate-api-sitemap] wrote ${urls.length} URL(s) to ${rel}` +
      (skipped.length ? ` (no allowed version for: ${skipped.join(", ")})` : ""),
  );
}

main();
