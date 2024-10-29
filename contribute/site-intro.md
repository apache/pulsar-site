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
* **Client feature matrix** [/client-feature-matrix](pathname:///client-feature-matrix)
  * [✍️ Edit matrix.js](https://github.com/apache/pulsar-site/edit/main/data/matrix.js)
  * [✍️ Edit client-feature-matrix/index.mdx](https://github.com/apache/pulsar-site/edit/main/client-feature-matrix/index.mdx)
