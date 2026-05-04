# Introduction

The Pulsar site is built with [Docusaurus](http://docusaurus.io/) framework. You can find all the technical details on [its docs](https://docusaurus.io/docs).

Specifically, this chapter provides a [writing syntax](document-syntax.md) guide selecting knowledge for writing content of the site.

## Source

Currently, the source of the site is located at the [apache/pulsar-site](http://github.com/apache/pulsar-site) repo.

## Pages

Docusaurus provides three kinds of pages out-of-the-box: [docs](https://docusaurus.io/docs/docs-introduction), [blogs](https://docusaurus.io/docs/blog), and [JSX pages](https://docusaurus.io/docs/creating-pages).

The Pulsar site pages are of:

| Page                                                       | Type      | Source                                                                                            |
|------------------------------------------------------------|-----------|---------------------------------------------------------------------------------------------------|
| [User docs](pathname:///docs)                              | docs      | <ul><li>docs/</li><li>versioned_docs/</li><li>versioned_sidebars/</li><li>sidebars.json</li></ul> |
| [Contribution guides](about.md)                            | docs      | <ul><li>contribute/</li><li>sidebarsDevelopment.js</li></ul>                                      |
| [Release notes](pathname:///release-notes)                 | docs      | <ul><li>release-notes/</li><li>sidebarsReleaseNotes.js</li></ul>                                  |
| [Security](pathname:///security)                           | docs      | <ul><li>security/</li></ul>                                                                       |
| [Blogs](pathname:///blog)                                  | blog      | <ul><li>blog/</li></ul>                                                                           |
| [Client feature matrix](pathname:///docs/client-libraries/feature-matrix) | docs      | <ul><li>client-feature-matrix/</li><li>data/matrix.js</li></ul>                                   |
| [Config Reference](/reference)                  | Docsify   | <ul><li>static/reference/</li></ul>                                                               |
| Other pages                                                | JSX pages | <ul><li>src/pages/</li></ul>                                                                      |

Besides, the site serves multiple static pages generated outside the framework, including API docs, reference docs, and swagger files. You can find them under the `static` folder.

### Config Reference (Docsify site)

The `/reference` tree is a separate [Docsify](https://docsify.js.org/) site embedded inside the Docusaurus one. Unlike Docusaurus, Docsify renders markdown in the browser at runtime — `static/reference/index.html` is a small shell that fetches `static/reference/<version>/**/*.md` via `fetch` and renders them client-side. Docusaurus copies `static/reference/` into the build output verbatim and doesn't apply its markdown preprocessor to those files.

Most of the content is generated from the upstream `apache/pulsar` source tree by the [reference-doc-generator](https://github.com/apache/pulsar-site/tree/main/tools/pytools#reference-doc-generator) tool and committed into this repo by the `sync-content` workflow. The generated markdown contains the same `@pulsar:...@` variable tokens as the main docs, plus a few `pathname:///docs/...` links. Since the Docusaurus markdown preprocessor doesn't see these files, a dedicated post-build step in [site_builder.py](https://github.com/apache/pulsar-site/tree/main/tools/pytools/lib/execute/site_builder.py) — `yarn process-reference-markdown` — walks `build/reference/` and applies the same `@pulsar:...@` expansion (sharing the resolver in [src/config/pulsarVariables.ts](https://github.com/apache/pulsar-site/tree/main/src/config/pulsarVariables.ts) with the Docusaurus preprocessor) and rewrites `pathname:///` → `/` so Docsify's client-side router resolves the links correctly.

If you're working on reference pages locally and want to preview them with tokens expanded, run `yarn build && yarn process-reference-markdown` and serve the `build/` directory (e.g. `yarn serve` or `docker-compose up`); `yarn start` serves `static/` directly and will show the raw `@pulsar:...@` tokens.

## Tools

### preview.sh

The most commonly used tool is `preview.sh`. You can preview your local changes by:

```shell
./preview.sh
```

If you'd like to preview the site for a specific versions, you can pass the versions as an argument:

```shell
./preview.sh 4.0.x
```

See the [previewing content](document-preview.md) guide for more details.

### docker-compose.yaml

The `preview.sh` script uses the Docusaurus dev server for testing, which is different from the real Apache Web Server based env that serves the site online.

To emulate the server-side logics, like `.htaccess` rewrite rules, you can run:

```shell
yarn build
docker-compose up
```

### Pytools

The site repo has a set of Python scripts for generating content and syncing/updating/publishing the site.

You can read the [README](https://github.com/apache/pulsar-site/tree/main/tools/pytools/README.md) file of pytools for details.

## Pulsar variables (`@pulsar:...@` tokens)

The markdown files under `docs/`, `versioned_docs/version-*/`, `client-libraries/`, and `static/reference/` can contain variables of the form `@pulsar:<name>@`. They are expanded to version-aware values at build time:

- For `docs/` and `client-libraries/` (current docs), and for `versioned_docs/version-*/` (released docs), expansion runs inside the Docusaurus markdown preprocessor — see [src/server/markdownPreprocessors/pulsarVariables.ts](https://github.com/apache/pulsar-site/blob/main/src/server/markdownPreprocessors/pulsarVariables.ts). Replacements are visible during both `yarn start` and `yarn build`.
- For `static/reference/` (Docsify site), the same resolver is applied by the `yarn process-reference-markdown` post-build step (see the section above). Replacements are visible only after `yarn build`.
- Blog posts, `src/pages/*.mdx`, and the `contribute/` / `release-notes/` / `security/` trees are **not** in scope, so `@pulsar:...@` strings in those places are left as-is.

The resolver lives in [src/config/pulsarVariables.ts](https://github.com/apache/pulsar-site/blob/main/src/config/pulsarVariables.ts) and is the single source of truth. Unknown tokens pass through untouched and emit a `[pulsarVariables] unknown token` warning in the build log.

### Version context

Every expansion happens in the context of a version:

| Where the file lives                   | Version context                                                          |
|----------------------------------------|--------------------------------------------------------------------------|
| `docs/`, `client-libraries/`           | `current` — resolves against the latest major release (`versions[0]`)    |
| `versioned_docs/version-<X>/`          | `<X>` (the directory segment, e.g. `4.1.x`, `2.7.5`)                     |
| `static/reference/next/`               | `current`                                                                |
| `static/reference/<X>/` (e.g. `4.1.x`) | `<X>`                                                                    |

The `<X>` segment is looked up in `versions.json` / the REST API version map. `.x` keys (e.g. `4.1.x`) resolve to the latest patch version in that line (e.g. `4.1.1`). Specific patch versions used for older branches (e.g. `2.7.5`) resolve to themselves.

### Tokens

#### Version numbers

| Token                        | Expands to                                                                                                                                                |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@pulsar:version@`           | Resolved semver version (e.g. `4.2.0`) — the latest patch of the minor line in context.                                                                   |
| `@pulsar:version_number@`    | Same as `@pulsar:version@` but with any trailing `-incubating` suffix stripped (only matters for very old versions).                                      |
| `@pulsar:version_origin@`    | The origin version key (e.g. `4.2.x` for released docs, full resolved version for current docs).                                                          |
| `@pulsar:version_reference@` | The folder name in `static/reference/` — `next` for `docs/`, latest release's `<major>.<minor>.x` for `client-libraries/`, `<major>.<minor>.x` otherwise. |
| `@pulsar:version:latest@`    | Latest version across all releases (context-independent).                                                                                                 |
| `@pulsar:version:lts@`       | Current LTS version. Kept in sync with `ltsMajorRelease` in `pulsarVariables.ts`.                                                                         |
| `@pulsar:version:adapters@`  | Latest `pulsar-adapters` release, sourced from `data/release-pulsar-adapters.js`.                                                                         |
| `@pulsar:version:python@`    | Version of the Python client that matches the current context.                                                                                            |

#### Release download URLs

| Token                                           | Expands to                                                                             |
|-------------------------------------------------|----------------------------------------------------------------------------------------|
| `@pulsar:download_page_url@`                    | The `/download/` page on this site.                                                    |
| `@pulsar:binary_release_url@`                   | `https://archive.apache.org/dist/pulsar/pulsar-<v>/apache-pulsar-<v>-bin.tar.gz`       |
| `@pulsar:connector_release_url@`                | The connectors directory (or tarball, for very old versions) at archive.apache.org.    |
| `@pulsar:offloader_release_url@`                | The offloaders tarball at archive.apache.org.                                          |
| `@pulsar:presto_pulsar_connector_release_url@`  | The Presto/Trino Pulsar connector tarball at archive.apache.org.                       |

#### Linux CPP client packages

Linux CPP client RPM and DEB packages have two aliases each (`rpm:...` and `dist_rpm:...`, likewise for DEB) — both expand to the same URL; `dist_*` is the older name.

| Token                                                                              | Expands to                                                                |
|------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| `@pulsar:rpm:client@` / `@pulsar:dist_rpm:client@`                                 | URL of the main `apache-pulsar-client` RPM.                               |
| `@pulsar:rpm:client-debuginfo@` / `@pulsar:dist_rpm:client-debuginfo@`             | URL of the `apache-pulsar-client-debuginfo` RPM.                          |
| `@pulsar:rpm:client-devel@` / `@pulsar:dist_rpm:client-devel@`                     | URL of the `apache-pulsar-client-devel` RPM.                              |
| `@pulsar:deb:client@` / `@pulsar:dist_deb:client@`                                 | URL of the main `apache-pulsar-client` DEB.                               |
| `@pulsar:deb:client-devel@` / `@pulsar:dist_deb:client-devel@`                     | URL of the `apache-pulsar-client-dev` DEB.                                |

#### API reference URLs

| Token                                 | Expands to                                                                              |
|---------------------------------------|-----------------------------------------------------------------------------------------|
| `@pulsar:javadoc:client@`             | `https://pulsar.apache.org/api/client/<version>/` — Java client Javadoc.                |
| `@pulsar:javadoc:admin@`              | `https://pulsar.apache.org/api/admin/<version>/` — Java admin Javadoc.                  |
| `@pulsar:javadoc:pulsar-functions@`   | `https://pulsar.apache.org/api/pulsar-functions/<version>/` — Functions Javadoc.        |
| `@pulsar:apidoc:python@`              | Python client API docs URL for the version in context.                                  |
| `@pulsar:apidoc:cpp@`                 | C++ client API docs URL for the version in context.                                     |

#### Adding a new token

To add a new variable, edit [src/config/pulsarVariables.ts](https://github.com/apache/pulsar-site/blob/main/src/config/pulsarVariables.ts): add an entry to the `Map` returned by `resolveTokens()` (key is the bare token name; the preprocessor wraps it as `@pulsar:<key>@` when matching). The same token then works in all four locations listed above.

## How-tos

This section holds common how-tos about website maintenance and troubleshooting.

### How to fix search index mismatches?

First of all, you should get permission to access `apache_pulsar` crawler on [Algolia Crawler console](https://crawler.algolia.com/). You can email dev@pulsar.apache.org to ask for permission.

The most common fix for search index mismatches is to re-index the pages. You can do so by clicking "Restart crawling" button on the [crawler page](https://crawler.algolia.com/admin/crawlers/7a3458ba-2373-47d5-9520-90cc9cc10736/overview). Typically, it takes about 1 or 2 hours to complete.

### How to preview changes locally?

If you make any changes to the site, before submitting a pull request, you're supposed to preview the changes locally. Read the [previewing content](document-preview.md) guide about instructions.

### How to update reference pages?

If you're gonna to update the content, read the [update reference docs](document-contribution.md#update-reference-docs) guide about the sources of reference pages.

If you're gonna to debug the reference generation process, read the [reference-doc-generator](https://github.com/apache/pulsar-site/tree/main/tools/pytools#reference-doc-generator) usage section and its source code.

### How to update data-driven pages?

You can update it by clicking on one of the **✍️ Edit &lt;file_name&gt;** links below and submitting a Pull Request.

* **Case Studies** [/case-studies](pathname:///case-studies)
  * [✍️ Edit case-studies.ts](https://github.com/apache/pulsar-site/edit/main/data/case-studies.ts)
* **Powered by** [/powered-by](pathname:///powered-by)
  * [✍️ Edit powered-by.ts](https://github.com/apache/pulsar-site/edit/main/data/powered-by.ts)
* **Ecosystem** [/ecosystem](pathname:///ecosystem)
  * [✍️ Edit ecosystem.ts](https://github.com/apache/pulsar-site/edit/main/data/ecosystem.ts)
* **Events** [/events](pathname:///events)
  * [✍️ Edit events.ts](https://github.com/apache/pulsar-site/edit/main/data/events.ts)
* **Resources** [/resources](pathname:///resources)
  * [✍️ Edit resources.ts](https://github.com/apache/pulsar-site/edit/main/data/resources.ts)
* **Team** [/team](pathname:///team)
  * [✍️ Edit team.js](https://github.com/apache/pulsar-site/edit/main/data/team.js)

    PMC members can generate the `team.js` file as [lhotari](https://github.com/lhotari) did in https://github.com/apache/pulsar-site/pull/387.
* **Downloads** [/downloads](pathname:///download)
  * [✍️ Edit releases.json](https://github.com/apache/pulsar-site/edit/main/releases.json)
  * [✍️ Edit connectors.js](https://github.com/apache/pulsar-site/edit/main/data/connectors.js)
  * [✍️ Edit release-cpp.js](https://github.com/apache/pulsar-site/edit/main/data/release-cpp.js)
  * [✍️ Edit release-pulsar-manager.js](https://github.com/apache/pulsar-site/edit/main/data/release-pulsar-manager.js)
  * [✍️ Edit release-pulsar-adapters.js](https://github.com/apache/pulsar-site/edit/main/data/release-pulsar-adapters.js)
  * [✍️ Edit download.tsx](https://github.com/apache/pulsar-site/edit/main/src/components/download.tsx)
  * [✍️ Edit download.mdx](https://github.com/apache/pulsar-site/edit/main/src/pages/download.mdx)
* **Release notes** [/release-notes](pathname:///release-notes)
  * data/release-*.js
  * release-notes/
  * src/components/ClientReleaseTable.js
  * src/components/PulsarReleaseTable.js
* **Client feature matrix** [/docs/client-libraries/feature-matrix](pathname:///docs/client-libraries/feature-matrix)
  * [✍️ Edit matrix.js](https://github.com/apache/pulsar-site/edit/main/data/matrix.js)
  * [✍️ Edit client-feature-matrix/index.mdx](https://github.com/apache/pulsar-site/edit/main/docs/client-libraries/feature-matrixindex.mdx)


