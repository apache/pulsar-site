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
| [Client feature matrix](pathname:///client-feature-matrix) | docs      | <ul><li>client-feature-matrix/</li><li>data/matrix.js</li></ul>                                   |
| Other pages                                                | JSX pages | <ul><li>src/pages/</li></ul>                                                                      |

Besides, the site serves multiple static pages generated outside the framework, including API docs, reference docs, and swagger files. You can find them under the `static` folder.

## Tools

### preview.sh

The most commonly used tool is `preview.sh`. You can preview your local changes by:

```shell
./preview.sh 2.11.x
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

The following pages contain data-driven tables:

* [Case studies](pathname:///case-studies)
  * data/users.js
  * src/pages/case-studies.js
* [Downloads](pathname:///download)
  * releases.json
  * data/connectors.js
  * data/release-cpp.js
  * data/release-pulsar-manager.js
  * data/release-pulsar-adapters.js
  * src/components/download.tsx
  * src/pages/download.mdx
* [Ecosystem](pathname:///ecosystem)
  * data/ecosystem.js
  * src/pages/ecosystem.js
* [Events](pathname:///events)
  * data/events.js
  * src/pages/events.js
* [Release notes](pathname:///release-notes)
  * data/release-*.js
  * release-notes/
  * src/components/ClientReleaseTable.js
  * src/components/PulsarReleaseTable.js
* [Resources](pathname:///resources)
  * data/resources.js
  * src/pages/resources.js
* [Team](pathname:///team)
  * data/team.js
  * src/pages/team.js
* [Client feature matrix](pathname:///client-feature-matrix)
  * data/matrix.js
  * client-feature-matrix/index.mdx

Additionally, PMC members can generate the `team.js` file as @lhotari did in https://github.com/apache/pulsar-site/pull/387.
