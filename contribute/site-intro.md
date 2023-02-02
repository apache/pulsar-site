# Introduction

The Pulsar site is built with [Docusaurus](http://docusaurus.io/) framework. You can find all technical details on [its docs](https://docusaurus.io/docs).

Specifically, this chapter provides a [writing syntax](document-syntax.md) guide selecting knowledge for writing content of the site.

## Source

Currently, the source of the site is located at the [apache/pulsar-site](http://github.com/apache/pulsar-site) repo.

## Pages

## How-tos

This section holds common how-tos about website maintenance and troubleshooting.

### How to fix search index mismatches?

First of all, you should get the permission to access `apache_pulsar` crawler on [Algolia Crawler console](https://crawler.algolia.com/). You can email dev@pulsar.apache.org to ask for permission.

The most common fix for search index mismatches is to re-index the pages. You can do so by clicking "Restart crawling" button on the [crawler page](https://crawler.algolia.com/admin/crawlers/7a3458ba-2373-47d5-9520-90cc9cc10736/overview). Typically, it takes about 1 or 2 hours to complete.

### How to preview changes locally?

If you make any changes to the site, before submitting a pull request, you're supposed to preview the changes locally. Read the [previewing content](document-preview.md) guide about instructions.

### How to update reference pages?

If you're gonna to update the content, read the [update reference docs](document-contribution.md#update-reference-docs) guide about the sources of reference pages.

If you're gonna to debug the reference generation process, read the [reference-doc-generator](https://github.com/apache/pulsar-site/tree/main/tools/pytools#reference-doc-generator) usage section and its source code.

### How to update data driven pages?
