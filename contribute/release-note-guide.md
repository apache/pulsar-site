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

## Register the new released version to releases.json, data/release-pulsar.js and data/release-java.js files

```bash
# Replace 3.0.6 with the target version tag
VERSION_WITHOUT_RC=3.0.6
PREVIOUS_VERSION=3.0.5
```

```bash
# Replace apache/pulsar with the component repo
./scripts/register_new_version.py $VERSION_WITHOUT_RC $PREVIOUS_VERSION $(gh release view "v$VERSION_WITHOUT_RC" -R apache/pulsar --json author,publishedAt | jq -r '[.author.login, .publishedAt] | join(" ")')
```

Alternatively, for a tag instead of a release:

```bash
# For a tag instead of a release
./scripts/register_new_version.py $VERSION_WITHOUT_RC $PREVIOUS_VERSION $(cd $PULSAR_PATH && git show -s --format="%ae %aI" "v$VERSION_RC" | tail -n 1 | sed 's/@.* / /')
```

## Generate release notes

There isn't a definite way yet. You will need to categorize the PRs into different sections manually and edit the release note file. These commands are used to generate the release note entries.

Here are 2 approaches:

Using "git log" (copies output to clipboard using pbcopy)

```shell
PREVIOUS_VERSION=3.0.3
VERSION_WITHOUT_RC=3.0.4
```

```shell
cd $PULSAR_PATH
git log --reverse --oneline v$PREVIOUS_VERSION..v$VERSION_WITHOUT_RC | colrm 1 12 | sed 's/\] \[/][/' | sed 's/^[[:space:]]*//' | awk -F ']' '{
    if ($1 ~ /^\[/) {
        print $1 "]" $2 " | " $0
    } else {
        print "[zzz] | " $0
    }
}' | sort | sed 's/^[^|]* | //' | sed 's/\(#\([0-9]\+\)\)/[#\2](https:\/\/github.com\/apache\/pulsar\/pull\/\2)/g' | sed 's/^/- /' | sed 's/</\&lt;/g' | sed 's/>/\&gt;/g' \
| pbcopy
```

Alternatively using "gh pr list"

```bash
gh pr list -L 1000 --search "is:pr is:merged label:release/2.10.6 label:cherry-picked/branch-2.10" --json title,number,url | jq -r '.[] | "- \(.title) ([#\(.number)](\(.url)))"' | sort | pbcopy
```

For feature releases, using the milestone:

```bash
gh pr list -L 1000 --search "is:pr is:merged milestone:4.0.0" --json title,number,url | jq -r '.[] | "- \(.title) ([#\(.number)](\(.url)))"' | sort | pbcopy
```

Copying from the clipboard to the release notes file

First, move back to the pulsar-site directory, then:

```shell
# don't copy this command to clipboard since it will replace the content there
# write this to the command line
pbpaste >> release-notes/versioned/pulsar-${VERSION_WITHOUT_RC}.md
```

## Categorizing the release note entries

There is a separate script that can automatically categorize the release note items.

```shell
./scripts/release_notes_reorder_script.py release-notes/versioned/pulsar-${VERSION_WITHOUT_RC}.md
```

You need to check the results and sometimes manually reorder the entries.

If you are releasing multiple maintenance versions at once, you can use another release as the reference for ordering, so you do not have to repeat the same manual reordering.

```shell
./scripts/release_notes_reorder_script.py release-notes/versioned/pulsar-X.Y.Z.md release-notes/versioned/pulsar-${VERSION_WITHOUT_RC}.md
```

## Creating Java client release notes

Copy the "Client" and applicable entries from "Library updates" into the client-java release notes.

## Update the release note page

The following steps are handled by the script `./scripts/generate_release_notes.py`.

1. Copy the related release notes entries and add a [versioned release note file](https://github.com/apache/pulsar-site/tree/main/release-notes/versioned).
2. Update the [version metadata files](https://github.com/apache/pulsar-site/tree/main/data) (`release-*.js`). For apache/pulsar releases, this means updating `release-java.js` (Java client) and `release-pulsar.js` (Pulsar).
3. For every apache/pulsar release, you should add a `<release-version>` entry to the corresponding place in the `releases.json` file.

Update swagger files. ref: [swagger files](https://pulsar.apache.org/contribute/release-process/#swagger-files)

To preview the result, follow the instructions for [previewing content](document-preview.md#preview-changes).

## Submit the release note

Submit a PR against [the site repo](https://github.com/apache/pulsar-site) with the added version release note file and updated version metadata files.

Here are some examples:

* [Add the release note for C++ client 3.1.0](https://github.com/apache/pulsar-site/pull/326)
* [Add the release note for Python client 3.0.0](https://github.com/apache/pulsar-site/pull/343)
* [Add the release note for Pulsar 3.0.3](https://github.com/apache/pulsar-site/pull/834)

Check whether the release information is shown on the [Pulsar Release Note page](pathname:///release-notes/) after the website is updated and built successfully.
