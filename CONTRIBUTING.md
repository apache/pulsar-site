# Contribute to Apache Pulsar Site

## How-tos

### How to fix search index mismatches?

First of all, you should get the permission to access `apache_pulsar` crawler on [Algolia Crawler console](https://crawler.algolia.com/). You can email dev@pulsar.apache.org to ask for permission.

The most common fix for search index mismatches is to re-index the pages. You can do so by clicking "Restart crawling" button on the [crawler page](https://crawler.algolia.com/admin/crawlers/7a3458ba-2373-47d5-9520-90cc9cc10736/overview). Typically, it takes about 1 or 2 hours to complete.

### How to update reference pages?

The source of reference pages consists of:

* Generated from configuration classes
* Generated from command-line interfaces
* Manually held under `static/referces` folder

Read [update reference docs](https://pulsar.apache.org/contribute/document-contribution/#update-reference-docs) guide for details.

## Files layout

This site is built with [Docusaurus](http://docusaurus.io/) framework. You can find all technical details on [its docs](https://docusaurus.io/docs).

### Site configs

The most significant config file is `docusaurus.config.js`.

### Pages

Docusaurus provides three kinds of pages out-of-the-box:

* docs: https://docusaurus.io/docs/docs-introduction
* blogs: https://docusaurus.io/docs/blog
* JSX pages: https://docusaurus.io/docs/creating-pages

#### Docs

Pulsar docs is of Docusaurus docs.

The "next" version of Pulsar docs is under the `docs` folder, whose sidebar is configured by `sidebars.json`.

Docs of other versions, like 2.11.x, are under the `versioned_docs/versions-*` folders, whose sidebars are configured by `versioned_sidebars/version-*-sidebars.json`.

Most assets of docs are under `static/assets`.

#### Contribution guide

The contribution guide is of Docusaurus docs.

Its content is under `contribute` folder, whose sidebar is configured by `sidebarsDevelopment.js`.

#### Release notes

The release notes is of Docusaurus docs.

Its content is under `release-notes` folder, whose sidebar is configured by `sidebarsReleaseNotes.js`.

The release notes depends on some data files and JSX components:

* `data/release-*.js`
* `src/components/ClientReleaseTable.js`
* `src/components/PulsarReleaseTable.js`

#### Security

The security page is of Docusaurus docs.

Its content is under `security` folder and has no sidebar.

#### Blogs

Pulsar blogs is of Docusaurus blogs.

Its content is under `blog` folder.

#### Other pages

The homepage, the download page, and the community page, are both of Docusaurus pages.

They are under `src/pages` folder.

### Tools

#### Preview

The most commonly used tools is `preview.sh`. You can preview your local changes by:

```shell
./preview.sh 2.11.x
```

See the completed guide at: https://pulsar.apache.org/contribute/document-preview/

#### Pytools

The repo has a set of Python scripts for maintaining generated content and site syncing, updating, and publish.

You can read the [README file for pytools](/tools/pytools/README.md) for details.
