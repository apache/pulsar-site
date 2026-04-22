import {resolveTokens} from "../../config/pulsarVariables";

// Only docs/**/*.md and versioned_docs/version-*/**/*.md are rewritten.
// Blog posts, src/pages/*.mdx, and the auxiliary content-docs plugins
// (contribute/release-notes/security/client-feature-matrix) are skipped so
// the link-targeting regexes (e.g. `[text](/tools/pulsar...)`) can't rewrite
// legitimately-authored markdown links.
const SCOPE_RE = /(?:^|[/\\])(?:docs|versioned_docs[/\\]version-[^/\\]+)[/\\].*\.md$/;
const VERSIONED_RE = /(?:^|[/\\])versioned_docs[/\\]version-([^/\\]+)[/\\]/;

type Args = {filePath: string; fileContent: string};

export default function pulsarVariablesPreprocessor({filePath, fileContent}: Args): string {
  if (!SCOPE_RE.test(filePath)) {
    return fileContent;
  }
  const versionMatch = filePath.match(VERSIONED_RE);
  const versionKey = versionMatch ? versionMatch[1] : "current";
  let result = fileContent;
  for (const [regex, replacement] of resolveTokens(versionKey)) {
    result = result.replace(regex, replacement);
  }
  return result;
}
