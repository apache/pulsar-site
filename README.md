# Apache Pulsar Website and Documentation

This repository contains the [Apache Pulsar website](https://pulsar.apache.org) source code and Apache Pulsar documentation.

Apache Pulsar is an open-source, distributed messaging and streaming platform built for the cloud.

## Quick start: Updating documentation and previewing changes

Make changes to the documentation in the `docs` directory.

To preview the changes, run the following command ([prerequisites](https://pulsar.apache.org/contribute/document-preview/#prerequisites)):

```shell
./preview.sh
```

This command starts a local web server on port 3000 and opens a browser window pointing to the website.

### Updating versioned docs

When your documentation changes apply to existing [supported versions](https://pulsar.apache.org/contribute/release-policy/#supported-versions), you should update both the versioned documentation in the `versioned_docs` directory and the documentation in the `docs` directory.

```shell
# List all supported major.minor.x versions
./scripts/docs-tool.sh supported_versions
```

After committing the changes for the `docs` directory, you can use the `docs-tool` to apply the changes to the versioned docs. This tool is a wrapper around `git diff` and `patch`. If the patch is not applied correctly, you will have to manually apply the changes to the versioned docs.

```shell
./scripts/docs-tool.sh apply_changes_to_versioned_docs
```

## More information

* [Pulsar Website contribution guide](https://pulsar.apache.org/contribute/site-intro/)
  * [How to update data-driven pages on the website](https://pulsar.apache.org/contribute/site-intro/#how-to-update-data-driven-pages)
* [Pulsar Documentation contribution guide](https://pulsar.apache.org/contribute/document-intro/)
  * [Updating documentation](https://pulsar.apache.org/contribute/document-contribution/)
  * [Previewing content](https://pulsar.apache.org/contribute/document-preview/)

## Contact information

* Submit [an issue](https://github.com/apache/pulsar/issues/new) on the [main apache/pulsar repo](http://github.com/apache/pulsar)
* Subscribe to the [dev@pulsar.apache.org mailing list](https://pulsar.apache.org/contact/#mailing-lists) and start a discussion.
* Ask on the [#dev channel on Pulsar Slack](https://apache-pulsar.slack.com/channels/dev) ([join](https://pulsar.apache.org/community#section-discussions))
