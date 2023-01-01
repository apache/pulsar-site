---
id: develop-labels
title: Label strategy
---

This guide explains the labels used in the [apache/pulsar](http://github.com/apache/pulsar) repository (the main repo).

## ready-to-test

After [PR-17693](https://github.com/apache/pulsar/pull/17693) merged, pull requests **except [docs only changes](https://github.com/apache/pulsar/blob/master/.github/changes-filter.yaml#L5)** should be first tested in your own fork since the pulsar CI based on GitHub Actions has constrained resources and quota. GitHub Actions provides separate quota for pull requests that are executed in a forked repository.

When a committer believe the PR is ready to test, they will label `ready-to-test` to the PR, and then you can rerun the CI tasks by commenting `/pulsarbot run-failure-checks` and trigger the full CI validation.

See also [CI Testing in Fork](personal-ci.md).

## doc-*

When submitting an issue or PR, you must [choose one of the documentation checkboxes](https://github.com/apache/pulsar/blob/master/.github/PULL_REQUEST_TEMPLATE.md#documentation), so the automation can label the PR correctly.

| Label               | Usage                                                                                                                                                                                                                                                                                                     |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `doc-not-needed`    | Your PR changes do not impact docs                                                                                                                                                                                                                                                                        |
| `doc`               | Your PR contains doc changes, no matter whether the changes are in markdown or code files.                                                                                                                                                                                                                |
| `doc-required`      | Your PR changes impact docs and you will update later.                                                                                                                                                                                                                                                    |
| `doc-complete`      | Your PR changes impact docs and the related docs have been already added.                                                                                                                                                                                                                                 |
| `doc-label-missing` | The Bot applies this label when there is no doc label information in the PR if one of the following conditions is met: <br/><li>You do not provide a doc label.</li><li>You provide multiple doc labels.</li><li>You delete backticks (``) in doc labels.</li><li>You add blanks in square brackets.</li> |
