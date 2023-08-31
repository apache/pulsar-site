---
id: develop-labels
title: Label strategy
---

This guide explains the labels used in the [apache/pulsar](http://github.com/apache/pulsar) repository (the main repo).

## type/*

The type/* labels are mainly distinguish the issues and PRs are for bug reporting, bug fix, feature requests, feature support.

|  Label             | Description                                                                                          |
|--------------------|------------------------------------------------------------------------------------------------------|
| `type/cleanup`     | Code or doc cleanups e.g. remove the outdated documentation or remove the code no longer in use      |
| `type/feature`     | The PR added a new feature or issue requested a new feature                                          |
| `type/bug`         | Your PR fixed a bug or issue reported a bug                                                          |
| `type/refactor`    | Code or doc refactors. e.g. refactor code structure or methods to improve code readability           |
| `type/enhancement` | The enhancements for the existing features or docs. e.g. reduce memory usage of the delayed messages |

## component/*

The component/* labels are indicating which component the issues or PRs have happened

| Label                               | Description                                  |
|-------------------------------------|----------------------------------------------|
| `component/function`                |                                              |
| `component/broker`                  |                                              |
| `component/cli`                     | pulsar-admin, pulsar-client, pulsar-perf ... |
| `component/client`                  | Java client                                  |
| `component/proxy`                   | Pulsar proxy                                 |
| `component/tieredstorage`           |                                              |
| `component/sql`                     | Pulsar SQL based on trino                    |
| `component/transaction`             |                                              |
| `component/schema`                  |                                              |
| `component/security`                |                                              |
| `component/config`                  | Pulsar configurations                        |
| `component/authentication`          |                                              |
| `component/build`                   |                                              |
| `component/geo-replication`         |                                              |
| `component/metrics`                 |                                              |
| `component/metadata`                |                                              |
| `component/tool`                    |                                              |
| `component/admin`                   |                                              |
| `component/test`                    | Improve test coverage or enhance the test    |
| `component/ci`                      |                                              |
| `component/compaction`              |                                              |
| `component/connector`               |                                              |
| `component/websocket`               |                                              |
| `component/ML`                      | Managed Ledger                               |
| `component/authorization`           |                                              |
| `component/dependency`              |                                              |

## category/*

In addition to being able to identify which component that the issue, PR is fixed or enhanced. The category labels will provide more information about the fix or enhancement for functionality, reliability, or performance. For most cases, the category labels only work with type/bug and type/enhancement.

| Label                    | Description                                                                                                                                       |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `category/functionality` | some functions are not working such as get errors.                                                                                                |
| `category/reliability`   | the function is working for most cases. It does not work properly in certain specific environments or failures. e.g. data lost, consumption stuck |
| `category/performance`   | performance issues fix or improvements.                                                                                                           |

## ready-to-test

After [PR-17693](https://github.com/apache/pulsar/pull/17693) merged, pull requests **except [docs only changes](https://github.com/apache/pulsar/blob/master/.github/changes-filter.yaml#L5)** should be first tested in your own fork since the pulsar CI based on GitHub Actions has constrained resources and quota. GitHub Actions provides separate quota for pull requests that are executed in a forked repository.

When a committer believe the PR is ready to test, they will label `ready-to-test` to the PR, and then you can rerun the CI tasks by commenting `/pulsarbot run-failure-checks` and trigger the full CI validation.

See also [CI Testing in Fork](personal-ci.md).

## doc-*

When submitting an issue or PR, you must [choose one of the documentation checkboxes](https://github.com/apache/pulsar/blob/master/.github/PULL_REQUEST_TEMPLATE.md#documentation), so the automation can label the PR correctly.

| Label               | Description                                                                                                                                                                                                                                                                                               |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `doc-not-needed`    | Your PR changes do not impact docs                                                                                                                                                                                                                                                                        |
| `doc`               | Your PR contains doc changes, no matter whether the changes are in markdown or code files.                                                                                                                                                                                                                |
| `doc-required`      | Your PR changes impact docs and you will update later.                                                                                                                                                                                                                                                    |
| `doc-complete`      | Your PR changes impact docs and the related docs have been already added.                                                                                                                                                                                                                                 |
| `doc-label-missing` | The Bot applies this label when there is no doc label information in the PR if one of the following conditions is met: <br/><li>You do not provide a doc label.</li><li>You provide multiple doc labels.</li><li>You delete backticks (``) in doc labels.</li><li>You add blanks in square brackets.</li> |

## release/*

| Label                      | Description                                                                                                                         |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `release/important-notice` | The changes which are important should be mentioned in the release note                                                             |
| `release/blocker`          | Indicate the PR or issue that should block the release until it gets resolved                                                       |
| `release/<version>`        | The labels are indicating which version the issue/PR has been fixed or will be fixed depending on if the version is released or not |

## cherry-picked/*
The cherry-picked/* labels are more mainly for Pulsar committers to ensure the fixes are cherry-picked to the release branches. The label only can be added after the cherry-picking is done for a corresponding branch. So that the release manager can have a list of PRs that should to be cherry-picked.
