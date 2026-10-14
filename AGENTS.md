# Agent guide for the Apache Pulsar website

Guidance for AI coding assistants working in this repository. For more details, see
[`README.md`](README.md), the documentation contribution guide in
[`contribute/document-contribution.md`](contribute/document-contribution.md) and the website
contribution guide in [`contribute/site-intro.md`](contribute/site-intro.md).

This repository is the source of <https://pulsar.apache.org>: a [Docusaurus](https://docusaurus.io/)
site with the Pulsar documentation, blog, release notes, and contributor guide.

## Licensing and provenance (read first)

Contributions must meet the ASF's [Generative Tooling guidance](https://www.apache.org/legal/generative-tooling.html):

- **A human is in the loop and is accountable.** Every pull request must be submitted by a human who
  has reviewed and verified the change and takes responsibility for it. Fully autonomous agents
  opening PRs on their own are not acceptable.
- **Don't introduce content of incompatible or unknown provenance.** Never copy text, code, or images
  verbatim from GPL/proprietary/unlicensed sources or third-party sites of unclear licensing. Follow
  the [ASF 3rd Party Licensing Policy](https://www.apache.org/legal/resolved.html).
- **Consider attributing AI assistance** with an `Assisted-by: <tool/version>` commit trailer
  (`Generated-by: <tool/version>` for minimally modified generated output).

## Updating documentation

Documentation is maintained only for the
[supported Pulsar versions](https://pulsar.apache.org/contribute/release-policy/#supported-versions).
List them with:

```shell
./scripts/docs-tool.sh supported_versions
```

- **Edit `docs/` first.** `docs/` is the unreleased ("next") documentation and the source of changes.
- **Then apply the change to the supported versions** in `versioned_docs/version-<major>.<minor>.x/`.
  Commit the `docs/` change first (uncommitted new files aren't picked up), fetch the
  apache/pulsar-site remote, and run:

  ```shell
  UPSTREAM=<apache/pulsar-site remote, default: origin> ./scripts/docs-tool.sh apply_changes_to_versioned_docs
  ```

  It diffs `docs/` against the merge base with `$UPSTREAM/main` and patches every supported version.
  Failed hunks go to `*.rej` files: apply them by hand, then remove the `*.rej` and `*.orig` files
  (`./scripts/docs-tool.sh delete_patch_backups`). Don't re-run it on versions that are already
  patched. Revert the change in versions it isn't true for.
- **When adding, renaming or removing a page,** update `sidebars.json` and the affected
  `versioned_sidebars/version-<v>-sidebars.json` files (the tool doesn't), and add a redirect in
  `static/.htaccess` for a renamed or removed page.
- **Leave unsupported versions alone** (other `versioned_docs/` directories) unless asked, for example
  to fix incorrect content; they're no longer maintained.
- **Don't hand-edit generated content:** `static/api/`, `static/openapi/`, `static/swagger/`, the
  versioned `static/reference/<x.y>.x/` trees and the CLI and configuration reference pages under
  `static/reference/next/`, which a nightly CI job regenerates from `apache/pulsar`. Fix those in the
  Pulsar source instead. The hand-maintained exceptions are listed in
  [`contribute/document-contribution.md`](contribute/document-contribution.md#update-reference-docs).
- Use the Markdown placeholders (`@pulsar:version@`, `{@inject:...}`) instead of hard-coding versions
  and links in `.md` files under `docs/`, `versioned_docs/` and `client-libraries/`; see
  [`README.md`](README.md#markdown-placeholders).

## Building and previewing

- Preview with `./preview.sh [--clean] [version ...]` (needs Node 24 and `corepack enable`). It starts
  a long-running dev server at <http://localhost:3000> for the `docs/` ("next") version plus the given
  versions, for example `./preview.sh 5.0.x`; run it in the background.
- For `src/` changes, run `yarn typecheck`. `yarn build` builds the versions listed in
  `.build-versions.json` (written by `preview.sh`) and needs a lot of memory; prefer `./preview.sh`
  with only the versions you changed.

## Other areas

- `contribute/`: the contributor guide (release policy, release process, coding conventions).
- `blog/`, `release-notes/`: blog posts and release notes.
- `client-libraries/`: client docs, served at `/docs/client-libraries/`. Not versioned: a single copy
  serves all Pulsar versions.
- `data/`: data for data-driven pages such as releases and the ecosystem. See
  [how to update data-driven pages](contribute/site-intro.md#how-to-update-data-driven-pages).
- `src/`: React components, the Docusaurus theme overrides (`src/theme/`) and Markdown preprocessors
  (`src/server/`).

## Agent guardrails

- **Verify, don't fabricate.** Check configuration keys, CLI flags, metrics, and APIs against the
  Pulsar source code (`apache/pulsar`) before documenting them.
- **Confirm state-changing actions.** Get the user's explicit confirmation before pushing, opening or
  updating a PR, or posting a comment.
- **PRs:** use a semantic title such as `[fix][doc] ...` or `[improve][site] ...` (see
  [`contribute/develop-semantic-title.md`](contribute/develop-semantic-title.md)), and keep each
  change focused on its task.
