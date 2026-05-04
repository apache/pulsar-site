import {resolveTokens} from "../../config/pulsarVariables";

// Only docs/**/*.md, versioned_docs/version-*/**/*.md, and client-libraries/**/*.md
// are rewritten. Blog posts, src/pages/*.mdx, and the other auxiliary content-docs
// plugins (contribute/release-notes/security) are skipped so the link-targeting
// regexes (e.g. `[text](/tools/pulsar...)`) can't rewrite legitimately-authored
// markdown links. client-libraries is in scope because its docs use the same
// @pulsar:version:*@ / @pulsar:apidoc:*@ variables as the main docs set.
const SCOPE_RE = /(?:^|[/\\])(?:docs|client-libraries|versioned_docs[/\\]version-[^/\\]+)[/\\].*\.md$/;
const VERSIONED_RE = /(?:^|[/\\])versioned_docs[/\\]version-([^/\\]+)[/\\]/;
const CLIENT_LIBRARIES_RE = /(?:^|[/\\])client-libraries[/\\]/;
const TOKEN_RE = /@pulsar:([^@\s]+)@/g;

type Args = {filePath: string; fileContent: string};

export function replacePulsarTokens(fileContent: string, versionKey: string, filePath?: string): string {
  const referenceLatest = filePath !== undefined && CLIENT_LIBRARIES_RE.test(filePath);
  const tokens = resolveTokens(versionKey, referenceLatest);
  const warned = new Set<string>();
  return fileContent.replace(TOKEN_RE, (match, key: string) => {
    const value = tokens.get(key);
    if (value !== undefined) {
      return value;
    }
    if (!warned.has(key)) {
      warned.add(key);
      const where = filePath ? ` in ${filePath}` : "";
      console.warn(`[pulsarVariables] unknown token ${match}${where}`);
    }
    return match;
  });
}

export default function pulsarVariablesPreprocessor({filePath, fileContent}: Args): string {
  if (!SCOPE_RE.test(filePath)) {
    return fileContent;
  }
  const versionMatch = filePath.match(VERSIONED_RE);
  const versionKey = versionMatch ? versionMatch[1] : "current";
  return replacePulsarTokens(fileContent, versionKey, filePath);
}
