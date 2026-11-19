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

// Crawl the documentation routes of the built site and fail when an internal link,
// image, or asset does not resolve.
//
// Only the documentation is checked: blog posts, release notes, and the contributor
// guide are not crawled. External links are skipped so that the job only depends on
// this repository, never on a third-party site being reachable.
//
// Usage: node scripts/check-docs-links.mjs [build-dir]   (default: build)

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { check, LinkState } from "linkinator";

// linkinator serves the local build over 127.0.0.1 on a random port; any other
// origin is an external link and is skipped.
const LOCAL_HOST = "127.0.0.1";

const buildDir = path.resolve(process.argv[2] ?? "build");
const docsDir = path.join(buildDir, "docs");
const siteDir = path.dirname(buildDir);

// Usage errors exit with 2 and broken links with 1, so that CI logs tell the
// difference between "the check could not run" and "the check found problems".
function fail(message, code = 2) {
  console.error(`ERROR: ${message}`);
  process.exit(code);
}

function hasIndex(dir) {
  return fs.existsSync(path.join(dir, "index.html"));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

if (!fs.existsSync(buildDir)) {
  fail(`build output not found at ${buildDir}; run "yarn build" first`);
}

// Every directory with an index page under a documentation version root or under
// the unversioned client libraries is a documentation page. Seeding all pages and
// not recursing keeps the crawl inside /docs/**: links from documentation pages
// are still resolved, but pages of the blog, release notes, or contributor guide
// are not crawled.
function docsPageSeeds(versions) {
  const seeds = [];
  const walk = (dir, prefix) => {
    if (hasIndex(dir)) {
      seeds.push(prefix);
    }
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), `${prefix}${entry.name}/`);
      }
    }
  };
  if (hasIndex(docsDir)) {
    seeds.push("docs/");
  }
  for (const root of [...versions, "client-libraries"]) {
    const dir = path.join(docsDir, root);
    if (fs.existsSync(dir)) {
      walk(dir, `docs/${root}/`);
    }
  }
  return seeds.sort();
}

// static/llms.txt must be published at the site root, so it has to be in the
// build output next to index.html.
function verifyLlmsTxt() {
  const llmsPath = path.join(buildDir, "llms.txt");
  if (!fs.existsSync(llmsPath)) {
    fail(`${llmsPath} is missing from the build output`);
  }
  const text = fs.readFileSync(llmsPath, "utf8");
  if (!text.startsWith("# ")) {
    fail(`${llmsPath} must start with a Markdown heading`);
  }
  const links = text.match(/\]\(https:\/\/pulsar\.apache\.org\/[^)\s]*\)/g) ?? [];
  if (links.length === 0) {
    fail(`${llmsPath} does not link to any https://pulsar.apache.org/ page`);
  }
  console.log(`llms.txt: ${links.length} links to pulsar.apache.org`);
}

// Documentation versions that were built into build/docs, e.g. ["next"] for a
// single-version build and the released versions plus "next" for a full build.
function builtVersionDirs() {
  return fs
    .readdirSync(docsDir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith("client-libraries") &&
        hasIndex(path.join(docsDir, entry.name)),
    )
    .map((entry) => entry.name)
    .sort();
}

// All released documentation versions known to the site.
function knownVersions() {
  const versionsFile = path.join(siteDir, "versions.json");
  if (!fs.existsSync(versionsFile)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(versionsFile, "utf8"));
}

verifyLlmsTxt();

const builtVersions = builtVersionDirs();
const seeds = docsPageSeeds(builtVersions);
if (seeds.length === 0) {
  fail(`no documentation pages found under ${docsDir}; run "yarn build" first`);
}

const unbuiltVersions = new Set(knownVersions().filter((version) => !builtVersions.includes(version)));
// In production, static/.htaccess redirects version-less /docs/<page> URLs to the
// documentation of the latest release. A single-version build only contains the
// "next" documentation, so resolve those URLs against a version that is in this
// build instead: the page ids come from the same sources, and a typo is caught
// here.
const versionlessTarget = ["next", ...knownVersions()].find((version) => builtVersions.includes(version));
const versionedPrefixes = ["next", "client-libraries", ...knownVersions()]
  .map(escapeRegExp)
  .join("|");

console.log(`Checking internal links on ${seeds.length} documentation page(s) in ${buildDir}`);
console.log(`Documentation versions in this build: ${builtVersions.join(", ")}`);
if (versionlessTarget) {
  console.log(`Resolving version-less /docs/<page> links against /docs/${versionlessTarget}/`);
}

const skipReasons = new Map();
function skip(reason) {
  skipReasons.set(reason, (skipReasons.get(reason) ?? 0) + 1);
  return true;
}

const result = await check({
  path: seeds,
  serverRoot: buildDir,
  recurse: false,
  concurrency: 32,
  timeout: 30_000,
  urlRewriteExpressions: versionlessTarget
    ? [
        {
          pattern: new RegExp(`^(https?://[^/]+)/docs/(?!(?:${versionedPrefixes})(?:/|$))(.*)$`),
          replacement: `$1/docs/${versionlessTarget}/$2`,
        },
      ]
    : [],
  linksToSkip: async (link) => {
    let url;
    try {
      url = new URL(link);
    } catch {
      return skip("not a URL");
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return skip("non-HTTP protocol");
    }
    if (url.hostname !== LOCAL_HOST) {
      return skip("external link");
    }
    // Apache serves these static data trees with directory indexes, which the
    // temporary static server does not have.
    if (/^\/(openapi|swagger)(\/|$)/.test(url.pathname)) {
      return skip("generated API data tree");
    }
    // Documentation versions that are not part of this build are checked when
    // they are built; their pages are not in build/docs.
    const version = /^\/docs\/([^/]+)(?:\/|$)/.exec(url.pathname)?.[1];
    if (version && unbuiltVersions.has(version)) {
      return skip("documentation version not in this build");
    }
    return false;
  },
});

const broken = result.links.filter((link) => link.state === LinkState.BROKEN);
const skipped = result.links.filter((link) => link.state === LinkState.SKIPPED);
const checked = result.links.filter((link) => link.state === LinkState.OK);

// A page linked from several pages is reported once per source page, which is
// useful for fixing it but noisy in the summary: also report the unique targets.
const brokenTargets = new Map();
for (const link of broken) {
  const entry = brokenTargets.get(link.url) ?? { status: link.status, parents: new Set() };
  if (link.parent) {
    entry.parents.add(link.parent);
  }
  brokenTargets.set(link.url, entry);
}

console.log(`Links: ${checked.length} ok, ${broken.length} broken, ${skipped.length} skipped`);
for (const [reason, count] of [...skipReasons].sort(([a], [b]) => a.localeCompare(b))) {
  console.log(`  skipped ${count}: ${reason}`);
}

if (brokenTargets.size > 0) {
  console.error(`\n${brokenTargets.size} broken internal link(s):`);
  for (const [url, { status, parents }] of [...brokenTargets].sort(([a], [b]) => a.localeCompare(b))) {
    const sources = [...parents].sort();
    console.error(`\n  ${url} (HTTP ${status ?? "unknown"})`);
    for (const source of sources.slice(0, 5)) {
      console.error(`    linked from ${source}`);
    }
    if (sources.length > 5) {
      console.error(`    and ${sources.length - 5} more page(s)`);
    }
  }
  fail(`${brokenTargets.size} broken internal link(s) found in the built documentation`, 1);
}

console.log("No broken internal links found in the built documentation.");
