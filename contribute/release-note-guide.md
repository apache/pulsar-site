---
id: release-note-guide
title: Writing release notes
---

Pulsar release notes consist of the following parts:

* [Core](pathname:///release-notes/)
* [Java client](pathname:///release-notes/client-java)
* [WebSocket client](pathname:///release-notes/client-ws)
* [C++ client](pathname:///release-notes/client-cpp)
* [Python client](pathname:///release-notes/client-python)
* [Go client](pathname:///release-notes/client-go)
* [Node.js client](pathname:///release-notes/client-node)
* [C# client](pathname:///release-notes/client-cs)

## Prerequisite

To generate release notes, you are suggested to install the [GitHub CLI](https://cli.github.com/) and authenticate first:

```shell
brew install gh
gh auth login
```

## Fetch the release metadata

```bash
# Replace v2.10.2 with the target version tag
# Replace apache/pulsar with the component repo
gh release view "v2.10.2" -R apache/pulsar --json author,tagName,publishedAt
```

## Fetch the release note

```bash
# Replace v2.10.2 with the target version tag
# Replace apache/pulsar with the component repo
gh release view "v2.10.2" -R apache/pulsar --json body --jq .body
```

## Update the release note page

1. Copy the related release notes entries and add a [versioned release note file](https://github.com/apache/pulsar-site/tree/main/release-notes/versioned).
2. Update the [version metadata files](https://github.com/apache/pulsar-site/tree/main/data) (`release-*.js`).

To preview the result, follow the instructions for [previewing content](document-preview.md#preview-changes).

## Submit the release note

Submit a PR against [the site repo](https://github.com/apache/pulsar-site) with the added version release note file and updated version metadata files.

Here are some examples:

* [Add the release note for C++ client 3.1.0](https://github.com/apache/pulsar-site/pull/326)
* [Add the release note for Python client 3.0.0](https://github.com/apache/pulsar-site/pull/343)

Check whether the release information is shown on the [Pulsar Release Note page](pathname:///release-notes/) after the website is updated and built successfully.
