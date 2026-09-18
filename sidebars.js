const sidebars = require("./sidebars.json");
const { resolveTokens } = require("./src/config/pulsarVariables");

// sidebars.json is plain JSON and cannot use the @pulsar:...@ tokens that the docs use for
// version-dependent URLs (see src/server/markdownPreprocessors/pulsarVariables.ts). Resolve
// the tokens in link hrefs here for the current docs version. `docusaurus docs:version`
// serializes the loaded (resolved) sidebar into versioned_sidebars/, so a versioned snapshot
// keeps the links that were current when the version was cut.
const tokens = resolveTokens("current");
const TOKEN_RE = /@pulsar:([^@\s]+)@/g;

function resolveHref(href) {
  return href.replace(TOKEN_RE, (match, key) => {
    const value = tokens.get(key);
    if (value === undefined) {
      throw new Error(`sidebars.json: unknown token ${match} in href ${href}`);
    }
    return value;
  });
}

function resolveItem(item) {
  if (Array.isArray(item)) {
    return item.map(resolveItem);
  }
  if (item && typeof item === "object") {
    const resolved = {};
    for (const [key, value] of Object.entries(item)) {
      resolved[key] = key === "href" && typeof value === "string" ? resolveHref(value) : resolveItem(value);
    }
    return resolved;
  }
  return item;
}

module.exports = resolveItem(sidebars);
