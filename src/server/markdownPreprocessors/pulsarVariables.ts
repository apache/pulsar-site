import {resolveTokens} from "../../config/pulsarVariables";

// Only docs/**/*.md, versioned_docs/version-*/**/*.md, and client-libraries/**/*.md
// are rewritten. Blog posts, src/pages/*.mdx, and the other auxiliary content-docs
// plugins (contribute/release-notes/security) are skipped so the link-targeting
// regexes (e.g. `[text](/tools/pulsar...)`) can't rewrite legitimately-authored
// markdown links. client-libraries is in scope because its docs use the same
// @pulsar:version:*@ / @pulsar:apidoc:*@ variables as the main docs set.
// The contributor guide (contribute/**/*.md) only expands the context-independent
// @pulsar:version:sdkman-*@ tokens, since its pages also document the other tokens literally.
const CONTRIBUTE_SCOPE_RE = /(?:^|[/\\])contribute[/\\].*\.md$/;
const CONTRIBUTE_TOKEN_RE = /@pulsar:(version:sdkman-[^@\s]+)@/g;
const SCOPE_RE = /(?:^|[/\\])(?:docs|client-libraries|versioned_docs[/\\]version-[^/\\]+)[/\\].*\.md$/;
const VERSIONED_RE = /(?:^|[/\\])versioned_docs[/\\]version-([^/\\]+)[/\\]/;
const CLIENT_LIBRARIES_RE = /(?:^|[/\\])client-libraries[/\\]/;
const TOKEN_RE = /@pulsar:([^@\s]+)@/g;

type Args = {filePath: string; fileContent: string};

export function replacePulsarTokens(
  fileContent: string,
  versionKey: string,
  filePath?: string,
  tokenRe: RegExp = TOKEN_RE,
  warnUnknown = true
): string {
  const referenceLatest = filePath !== undefined && CLIENT_LIBRARIES_RE.test(filePath);
  const tokens = resolveTokens(versionKey, referenceLatest);
  const warned = new Set<string>();
  return fileContent.replace(tokenRe, (match, key: string) => {
    const value = tokens.get(key);
    if (value !== undefined) {
      return value;
    }
    if (warnUnknown && !warned.has(key)) {
      warned.add(key);
      const where = filePath ? ` in ${filePath}` : "";
      console.warn(`[pulsarVariables] unknown token ${match}${where}`);
    }
    return match;
  });
}

export default function pulsarVariablesPreprocessor({filePath, fileContent}: Args): string {
  if (CONTRIBUTE_SCOPE_RE.test(filePath)) {
    return replacePulsarTokens(fileContent, "current", filePath, CONTRIBUTE_TOKEN_RE, false);
  }
  if (!SCOPE_RE.test(filePath)) {
    return fileContent;
  }
  const versionMatch = filePath.match(VERSIONED_RE);
  const versionKey = versionMatch ? versionMatch[1] : "current";
  return replacePulsarTokens(fileContent, versionKey, filePath);
}
