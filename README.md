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


## Website not getting updated?

If the https://pulsar.apache.org website doesn't get updated, [check the latest GitHub Actions workflow run for the main branch](https://github.com/apache/pulsar-site/actions/workflows/ci-build-site.yml?query=branch%3Amain). If it succeeded, the problem could be that the [git history for the asf-site-next branch](https://github.com/apache/pulsar-site/commits/asf-site-next/) is too large and needs to be truncated. Here are the commands to perform that task:

```shell
git clone -b asf-site-next https://github.com/apache/pulsar-site pulsar-site-static
cd pulsar-site-static
git checkout --orphan asf-site-next-reset
git add -A
git commit -m "History resetted"
git push -f HEAD:asf-site-next
```

## Contact information

* For Pulsar bug reports or any improvements, submit [an issue](https://github.com/apache/pulsar-site/issues/new) to the main repository.
* For documentation improvements, submit [an issue](https://github.com/apache/pulsar-site/issues/new) to the site repository.
* Subscribe to the [dev@pulsar.apache.org mailing list](https://pulsar.apache.org/contact/#mailing-lists) and start a discussion.
* Ask on the [#dev channel on Pulsar Slack](https://apache-pulsar.slack.com/channels/dev) ([join](https://pulsar.apache.org/community#section-discussions))
