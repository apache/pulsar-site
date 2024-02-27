---
author: tison
title: "What's New in Apache Pulsar 3.1.0"
date: 2023-10-10
---

The Apache Pulsar community announces the release of Apache Pulsar 3.1, a new feature release! This is a remarkable community effort, with over 80 contributors submitting more than 360 commits for feature enhancements and bug fixes. We would like to thank all of them for their contributions!

<!--truncate-->

## What's new in Apache Pulsar 3.1?

### Pluggable topic compaction service

Pulsar's [Topic Compaction](https://pulsar.apache.org/docs/3.1.x/concepts-topic-compaction/) feature provides a key-based data retention mechanism that allows users to keep only the most recent message associated with a specific key. This helps reduce storage space and improve system efficiency.

Data in topics can be stored in various formats. For example, KoP (Kafka protocol handler) can store data in Kafka format.

Previously, Pulsar always compacted topic data, assuming that messages were in the Pulsar data format. However, this approach had limitations, as it prevented protocol handlers from utilizing the topic compaction feature with customized data formats such as the Kafka format used by KoP.

That's why [PIP-278](https://github.com/apache/pulsar/pull/20624) introduced a pluggable topic compaction service interface to support customization of the actual compaction logic. This customization can be done while the major compaction task is still controlled by the Pulsar broker. This change primarily benefits protocol handlers developers.

### Pluggable partition assignment strategy

Pulsar offers robust support for [load balancing](https://pulsar.apache.org/docs/3.1.x/concepts-broker-load-balancing-concepts/) to ensure efficient resource utilization across Pulsar clusters.

The fundamental unit for load balancing is the topic bundle, which refers to a group of topics within the same namespace.

Previously, the only strategy for assigning a topic to a topic bundle was consistent hashing. However, this strategy doesn't fit all scenarios.

[PIP-255](https://github.com/apache/pulsar/issues/19806) introduced a pluggable topic bundle (partition) assignment interface to allow customization of the assignment algorithm. This enables users to adjust the strategy according to their specific scenarios.

### Metadata size threshold for compression

Previously, even if the metadata was small, we had to apply compression. Now, we support a size-based threshold.

Starting from version 2.9, Pulsar supports compressing managed ledger information and managed cursor information stored in the metadata store. This feature can significantly reduce the size of large metadata.

However, for small metadata, compression doesn't provide significant benefits and may consume unnecessary computational resources.

[PIP-270](https://github.com/apache/pulsar/issues/20307) introduces two configuration options: `managedLedgerInfoCompressionThresholdInBytes` and `managedCursorInfoCompressionThresholdInBytes`. These options allow users to customize the size threshold for compressing metadata, with the default value set to 16 KB.

### Lazy creation of offload resources

[Tiered storage](https://pulsar.apache.org/docs/3.1.x/tiered-storage-overview/) is an essential technology that enables the migration of old topic data from BookKeeper to long-term and more cost-effective storage while maintaining transparent client access to the topic data.

Tiered storage operates through offloaders. Previously, when a topic was created, the offloader immediately generated the associated offload resources, even though these resources remained unused until the actual offloading task was triggered.

[PR-20775](https://github.com/apache/pulsar/pull/20775) modifies this behavior by lazily creating the offload blob store. This means that the actual allocation occurs only when the offloading task is triggered, preventing excessive preallocation of resources.

## Compatibility between releases

When upgrading an existing Pulsar installation, it's crucial to perform component upgrades in a sequential manner.

Starting from version 3.0, users have the option to perform live upgrades or downgrades between two consecutive LTS versions or two consecutive feature versions (which also include LTS versions).

For the 3.1 series, you should be able to upgrade directly from version 3.0 or downgrade from the subsequently released version 3.2. If you are currently using an earlier version, please ensure that you upgrade to version 3.0 before proceeding further.

## Getting started

Pulsar 3.1.0 is now available for [download](https://pulsar.apache.org/download/). To get started with Pulsar, you can run a Pulsar cluster [on your local machine, Docker, or Kubernetes](https://pulsar.apache.org/docs/3.1.x/getting-started-home/).

## Getting involved

Apache Pulsar is one of the fastest-growing open-source projects, recognized by the [Apache Software Foundation](https://thestack.technology/top-apache-projects-in-2021-from-superset-to-nuttx/) as a Top 5 Project based on engagement. The vitality of Pulsar relies on continued community growth, which would not be possible without each and every contributor to the project. The Pulsar community welcomes contributions from anyone with a passion for open source, messaging, and streaming, as well as distributed systems! Looking for more ways to stay connected with the Pulsar community? Check out the following resources:

- Pulsar Summit North America 2023 will take place on Wednesday, October 25, 2023! [Register now](https://registration.socio.events/e/pulsarsummitna2023) and follow [@PulsarSummit](https://twitter.com/pulsarsummit) on Twitter/X for updates and details of this much-anticipated one-day event.
- Read the [Apache Pulsar Contribution Guide](https://pulsar.apache.org/contribute/) to start your first contribution.
- Visit the [Pulsar GitHub repository](https://github.com/apache/pulsar), follow [@apache_pulsar](https://twitter.com/apache_pulsar) on Twitter/X , and join the [Pulsar community on Slack](https://apache-pulsar.slack.com/).
