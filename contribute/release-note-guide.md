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


## Generate release notes

There isn't a definite way yet. 

Here are 2 approaches:

Using "git log"

```bash
PREVIOUS_VERSION=3.0.3
VERSION_WITHOUT_RC=3.0.4
git log --reverse  --oneline v$PREVIOUS_VERSION..v$VERSION_WITHOUT_RC | colrm 1 12 | sed 's/\] \[/][/' | perl -p -e 's/^\s+//' | awk -F ']' '{
    if ($1 ~ /^\[/) {
        print $1 "]" $2, $0
    } else {
        print "[zzz]", $0
    }
}' | sort | cut -d ' ' -f2- | sed 's/\(#\([0-9]\+\)\)/[#\2](https:\/\/github.com\/apache\/pulsar\/pull\/\2)/g' | sed 's/^/- /'
```

Alternatively using "gh pr list"

```bash
gh pr list -L 1000 --search "is:pr is:merged label:release/2.10.6 label:cherry-picked/branch-2.10" --json title,number,url | jq -r '.[] | "\(.title) [\(.number)](\(.url))"'
```

## Update the release note page

1. Copy the related release notes entries and add a [versioned release note file](https://github.com/apache/pulsar-site/tree/main/release-notes/versioned).
2. Update the [version metadata files](https://github.com/apache/pulsar-site/tree/main/data) (`release-*.js`). For apache/pulsar releases, this means updating `release-java.js` (Java client) and `release-pulsar.js` (Pulsar).
3. For every apache/pulsar release, you should add a `<release-version>` entry to the corresponding place in the `releases.json` file.
4. Update swagger files. ref: [swagger files](https://pulsar.apache.org/contribute/release-process/#swagger-files)

To preview the result, follow the instructions for [previewing content](document-preview.md#preview-changes).

## Submit the release note

Submit a PR against [the site repo](https://github.com/apache/pulsar-site) with the added version release note file and updated version metadata files.

Here are some examples:

* [Add the release note for C++ client 3.1.0](https://github.com/apache/pulsar-site/pull/326)
* [Add the release note for Python client 3.0.0](https://github.com/apache/pulsar-site/pull/343)
* [Add the release note for Pulsar 3.0.3](https://github.com/apache/pulsar-site/pull/834)

Check whether the release information is shown on the [Pulsar Release Note page](pathname:///release-notes/) after the website is updated and built successfully.
