---
author: Julien Jakubowski
title: "What's New in Apache Pulsar 3.2.0"
date: 2024-02-12
---

The Apache Pulsar community is thrilled to announce the launch of Apache Pulsar 3.2, a new feature release! This achievement is the result of a significant community collaboration, involving 57 contributors who made over 88 commits to add new features and fix bugs. Our heartfelt thanks go out to every contributor for their invaluable work!

<!--truncate-->

## What's new in Apache Pulsar 3.2?

This release introduces [180+ improvements, optimizations, and fixes](https://pulsar.apache.org/release-notes/versioned/pulsar-3.2.0/) on the broker, Pulsar IO/Pulsar Functions, CLI, and others.

It also unveils key new features, highlighted below.

### Rate limiting

An increasing number of messaging-as-a-service platform teams are adopting Apache Pulsar as their main building block for providing messaging services across their organizations. This is clear validation that the value of Apache Pulsar’s truly multi-tenant architecture is delivering results, making Apache Pulsar a cost-efficient and reliable solution for messaging-as-a-service platform teams in very demanding application environments.

In the Apache Pulsar project, we are committed to delivering further improvements to the existing multi-tenancy features. One area of improvement is the service level management and capacity management of a large Pulsar system. This is also a key concern of messaging-as-a-service platform teams.

Apache Pulsar 3.2.0 features the implementation of [PIP-322 Pulsar Rate Limiting Refactoring](https://github.com/apache/pulsar/blob/master/pip/pip-322.md). Rate limiters act as a conduit to more extensive capacity management and Quality of Service (QoS) controls in Pulsar. They are integral to Pulsar's core multi-tenancy features. This refactoring paves the way for future enhancements in this area.

### Null-key messages deletion during compaction

Apache Pulsar supports [Topic Compaction](https://pulsar.apache.org/docs/3.2.x/concepts-topic-compaction/).

In versions 3.1.0 and earlier of Pulsar, topic compaction retains messages that have null keys.

Starting with Pulsar 3.2.0, the default behavior has been changed to delete messages with null keys during topic compaction, which helps in reducing storage costs. However, if necessary, you can revert to the previous behavior by setting `topicCompactionRetainNullKey=true` in `broker.conf`.

For more details, refer to the description in [PIP-318](https://github.com/apache/pulsar/blob/master/pip/pip-318.md).

### WebSockets new features

The Pulsar WebSocket API now supports:
- Consuming multiple topics as described in [PIP-307](https://github.com/apache/pulsar/blob/master/pip/pip_307.md).
- End-to-end encryption, as described in [PIP-290](https://github.com/apache/pulsar/blob/master/pip/pip-290.md).

### Enhanced security for Pulsar Functions & Pulsar IO

Pulsar 3.2.0 provides increased security for Pulsar Functions & Pulsar IO by allowing users to configure Pulsar Connectors with non-plaintext secrets. More details in [PIP-289](https://github.com/apache/pulsar/blob/master/pip/pip-289.md) & the following pull requests:
- [Make connectors load sensitive fields from secrets](https://github.com/apache/pulsar/pull/21675)
- [Support configuration secret interpolation](https://github.com/apache/pulsar/pull/20901)

### CLI user experience improvements

This release introduces several handy features to the CLI, including:
- [Add command line option for configuring the memory limit](https://github.com/apache/pulsar/pull/20663)
- [Allow for deleting topics in bulk, using a regex or a file](https://github.com/apache/pulsar/pull/21664)
- [Display the current cluster in `pulsar-admin clusters list`](https://github.com/apache/pulsar/pull/20614)

### Build improvement

Pulsar 3.2.0 also introduces enhancements to the build process and reliability, including a Bill of Materials (BOM) to simplify dependency management, as outlined in [PIP-326](https://github.com/apache/pulsar/blob/master/pip/pip-326.md). 

### More

Feel free to explore the [full release notes](https://github.com/apache/pulsar/releases/tag/v3.2.0) for a detailed list of all improvements and fixes.

## Compatibility between releases

When upgrading an existing Pulsar installation, it's crucial to perform component upgrades in a sequential manner.

Starting from version 3.0, users have the option to perform live upgrades or downgrades between two consecutive LTS versions or two consecutive feature versions (which also include LTS versions).

For the 3.2 series, you should be able to upgrade from version 3.x. 

Please refer to the [release policy](/contribute/release-policy/) to learn more about the compatibility between releases.

## Getting started

Pulsar 3.2.0 is now available for [download](https://pulsar.apache.org/download/). To get started with Pulsar, you can run a Pulsar cluster [on your local machine, Docker, or Kubernetes](https://pulsar.apache.org/docs/3.2.x/getting-started-home/).

## Getting involved

Apache Pulsar is one of the fastest-growing open-source projects, recognized by the [Apache Software Foundation](https://thestack.technology/top-apache-projects-in-2021-from-superset-to-nuttx/) as a Top 5 Project based on engagement. The vitality of Pulsar relies on continued community growth, which would not be possible without each and every contributor to the project. The Pulsar community welcomes contributions from anyone with a passion for open source, messaging, and streaming, as well as distributed systems! Looking for more ways to stay connected with the Pulsar community? Check out the following resources:

- Pulsar Summit North America 2023 took place on Wednesday, October 25, 2023! [Watch the sessions recordings](https://pulsar-summit.org/event/north-america-2023/schedule). Follow [@PulsarSummit](https://twitter.com/pulsarsummit) on Twitter/X for updates and details on the upcoming Pulsar Summit events.
- Read the [Apache Pulsar Contribution Guide](https://pulsar.apache.org/contribute/) to start your first contribution.
- Visit the [Pulsar GitHub repository](https://github.com/apache/pulsar), follow [@apache_pulsar](https://twitter.com/apache_pulsar) on Twitter/X , and join the [Pulsar community on Slack](https://apache-pulsar.slack.com/).
