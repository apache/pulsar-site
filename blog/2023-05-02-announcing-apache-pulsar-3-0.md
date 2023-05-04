---
title: "Announcing Apache Pulsar 3.0: The First Long-Term Support Release"
date: 2023-05-02
author: Apache Pulsar Community
---

**The Apache Pulsar community today announces the release of Apache Pulsar 3.0, the first Long-Term Support (LTS) version!** This is a remarkable community effort, with over 140 contributors submitting about 1500 commits for feature enhancements and bug fixes. We would like to thank all of them for their contributions!

![](/img/annoucing-pulsar-3-0.jpeg)

<!--truncate-->

## Introducing Long-Term Support releases

Starting from Pulsar 3.0, the Pulsar community plans to release LTS versions to meet the needs of different users for stability and new features, as well as to reduce the burden of maintaining historical releases.

The previous release process has short maintenance cycles of approximately 3 to 4 months, while many users are still using old versions. To keep up with new updates and features, they may be forced to perform upgrades within a short timeframe, for which they are not prepared in terms of available time and required efforts.

Therefore, the Pulsar community introduces LTS versions with feature releases between them. The project follows a variant of Semantic Versioning, replacing `major.minor.patch` with `LTS.feature.patch`. For example:

- 2.11.0 is a feature release;
- 3.0.0 is the first LTS release;
- 3.0.1 is a patch release of the LTS release;
- 3.1.0 is a feature release;
- 3.2.0 is a feature release;
- 3.2.1 is a patch release;
- 4.0.0 is an LTS release.

This pattern provides version support for users seeking stability and those seeking new features. Users who want a more stable release can use versions 3.0.x, while those seeking new features can use versions 3.x. This new release model is a major step for the Pulsar community because it:

- Allows users to choose between different releases based on their needs for stability or new features;
- Clarifies the release cycle for both maintainers and users;
- Frees maintainers from spending too much time maintaining a long list of old releases.

With the new release model, the Pulsar community looks to release LTS versions every 18 months, with bug fixes continuing for 24 months and security vulnerability patches supported for 36 months. See the image below for details.

![](/img/pulsar-new-release-model.png)

For more information, see [PIP-175](https://github.com/apache/pulsar/issues/15966) and the [Release policy](pathname:///contribute/release-policy/).

## What’s new in Apache Pulsar 3.0?

Apache Pulsar 3.0 is an LTS release with a number of important features, enhancements, and fixes. Here are some of the highlighted ones.

### New Pulsar broker load balancer

[PIP-192](https://github.com/apache/pulsar/issues/16691) introduces a new load manager implementation, aiming to balance cluster utilization as evenly as possible while minimizing latency and reducing reliance on ZooKeeper.

Issues with the previous load manager include:

- Load data for all brokers and bundles is replicated to all brokers via ZK watchers. This N-replication poses scalability issues when Pulsar clusters grow to thousands of brokers and millions of topics.
- Lookup requires redirection to the leader broker.

In Pulsar 3.0, the broker and bundle load data have been re-evaluated. The new load manager stores this load data in non-persistent topics, while topic ownership information is saved in system topics and maintained with a state machine for eventual consistency. Clients can now connect to any broker for lookup without redirection.

### Large-scale delayed message support

Scheduled and delayed message delivery is a common feature in messaging systems. [PIP-195](https://github.com/apache/pulsar/issues/16763) aims to address limitations in this feature, which has been supported since version 2.4.0. The issues with the current implementation include:

- Memory constraints: The delayed message index is typically maintained in memory, leading to high memory overhead when there are many delayed messages. Although it is possible to utilize multiple brokers’ memory by creating multiple partitions for a topic and distributing them across multiple brokers, the overall memory consumption remains unchanged.
- Expensive index rebuilding: In the case of a large number of delayed messages (e.g. hundreds of millions), when migrating a topic to a different broker or recovering from broker downtime, rebuilding the index requires replaying logs. This process consumes significant resources and affects both the client and catch-up reads.

The objectives of the new delayed message mechanism introduced in Pulsar 3.0 are:

- Supporting delayed message index snapshots to minimize the costs of rebuilding the index;
- Reducing memory usage for maintaining the delayed message index.

### Build multi-arch docker images

With 3.0, Pulsar will start publishing Docker images with versions both for Intel x86-64 and Arm64 architectures. 

Users trying to use Pulsar standalone, or running TestContainer tests on a Mac M1/M2 laptop will now see much improved performance and avoid all the issues with the Docker container engine when it emulates x86-64 CPU withing an Arm64 host.

At the same time, this image will make it possible to run Pulsar in a Docker/Kubernetes production environment on Arm64 machines.

From a user perspective, no change is required: when pulling the image, Docker will select the appropriate version based on the host architecture.

For more information, see [PR-19432](https://github.com/apache/pulsar/pull/19432).

### BookKeeper direct IO logic optimization

The current ledger read/write logic in BookKeeper involves multiple buffering and caching layers, which cause limitations in read and write throughput due to memory consumption, inefficient cache utilization, and eviction problems.

More specifically, when writing an entry, data is buffered in both the memory table and the OS PageCache (after the memory table is full). When reading an entry, data may be fetched from the memory table, read cache, or read from the entry log file based on cache hits, potentially causing memory waste and reduced cache hit rate. Since the OS PageCache is shared by all read and write files, and the OS will prefetch a fixed amount of data when reading files, it is easy to cause OS PageCache pollution and affect the read and write performance.

[BP-47](https://github.com/apache/bookkeeper/issues/2943#issuecomment-1086446251) introduces optional support to bypass the OS PageCache using the O_DIRECT flag for [open(2)](https://man7.org/linux/man-pages/man2/open.2.html) and [fallocate(2)](https://man7.org/linux/man-pages/man2/fallocate.2.html) syscalls on supported systems (Linux and macOS). The new implementation uses JNI for direct I/O and incorporates write buffer pools and read buffer management. It helps reduce memory consumption and achieve better control over cache utilization. It modifies the existing ledger read/write logic while maintaining the original organization of the entry log file.

### Transaction Buffer segmented snapshot optimization

The current Transaction Buffer in Pulsar involves handling messages sent with transactions and taking periodic snapshots to avoid replaying all messages from the original topic. However, when a topic has long-term data retention and many aborted transactions, a snapshot may become a bottleneck, causing increased costs as the snapshot size grows.

[PIP-196](https://github.com/apache/pulsar/issues/16913) introduces a segmented transaction buffer snapshot, which allows splitting the snapshot into multiple parts, each with a fixed number of aborted transactions and a maxReadPosition identity. This approach aims to support a large number of aborted transactions, improve transaction buffer recovery speed, and address the write amplification issue in system topic snapshots.

In Pulsar 3.0, the new design incorporates multiple snapshot segments through a secondary index, with index and snapshot segments stored in different compact topics. The snapshot segment is an immutable segment that can be configured in size. A new system topic is used to store snapshot segments, while a separate index topic stores the snapshot segment indexes, allowing for more efficient recovery and reduced memory overhead.

The proposal modifies the existing transaction buffer logic while maintaining the original organization of the transaction buffer, with the goal of improving overall performance and resource utilization.

### Blue-green cluster deployment support

Blue-green deployment is a widely-used solution for migrating live traffic from one cluster to another. In this model, traffic is gradually transferred from the blue cluster to the green cluster, allowing for smooth upgrades and the possibility of rollbacks if necessary.

[PIP-188](https://github.com/apache/pulsar/issues/16551) implements blue-green deployment in Pulsar by introducing changes to the broker, client, and managedLedger. The broker will support an admin API that allows marking a cluster for migration and specifying redirection URLs. The migration state and redirection URLs are persisted in the cluster metadata. The broker asynchronously marks each topic owned by that broker as migrated and notifies all the producers and consumers (which have drained the backlog for their subscriptions) with a new client-protocol command called “Migrated-Topic”, which has redirection URLs to the green cluster. Producers and consumers for those topics cache the redirection URLs and retry to connect to the broker with that URL which redirects them to the green cluster.

With such capability introduced in Pulsar 3.0, users can achieve seamless traffic migration between clusters without causing downtime for topics.

For more information about the Pulsar 3.0 release, see the [release notes](pathname:///release-notes/versioned/pulsar-3.0.0/).

## Compatibility between releases

When upgrading an existing Pulsar version, it is important to upgrade components linearly.

Before Pulsar 3.0, upgrades should be performed linearly through each feature version. For example, when upgrading from 2.8 to 2.10, it is important to upgrade to 2.9 before going to 2.10.

Starting from 3.0, users can perform live upgrades or downgrades between two consecutive LTS versions. For example:

- ✅ 3.0 -> 4.0 -> 3.0;
- ✅ 3.2 -> 4.0 -> 3.2;
- ✅ 3.2 -> 4.4 -> 3.2;
- ❌ 3.2 -> 5.0.

## Getting started

Pulsar 3.0.0 is now available for download on GitHub. To get started with Pulsar, you can run a Pulsar cluster [on your local machine, Docker, or Kubernetes](pathname:///docs/3.0.x/getting-started-home/).

## Looking forward

With Pulsar 3.0 LTS model, it will be easier for users to choose to stay on LTS stable releases or newer releases with the latest feature and improvements, all with the guarantee of longer support and a path to a live upgrade to the next LTS version.

At the same time, several features introduced in 3.0 sets the stage for further improvements. One such example is the new load balancer (PIP-192): while immediately useful and a marked improvement as it is, it also paves the way for many more optimizations in how topics are transferred from one broker to another, with the goal of minimizing the latency impact of such operations.

Another exciting area of development is the proposal to rehaul the metric collection and aggregation system described in [PIP-264](https://github.com/apache/pulsar/issues/20197).

Finally, Pulsar 3.0 is benefitting from the performance improvements introduced in Apache BookKeeper 4.16. We see a lot of potential to further improve BookKeeper performance for an even faster Pulsar!

## Getting involved

Apache Pulsar is one of the fastest-growing open-source projects, recognized by the [Apache Software Foundation](https://thestack.technology/top-apache-projects-in-2021-from-superset-to-nuttx/) as a Top 5 Project based on engagement. The vitality of Pulsar relies on continued community growth, which would not be possible without each and every contributor to the project. The Pulsar community welcomes contributions from anyone with a passion for open source, messaging and streaming, as well as distributed systems! Looking for more ways to stay connected with the Pulsar community? Check out the following resources:

- Pulsar Virtual Summit Europe 2023 will take place on Tuesday, May 23rd, 2023! [Register now for free](https://events.zoom.us/ev/Ap6rsDg9LeVfmdajJ_eB13HH026J1d_o8OoTKkQnl_jzVl-srhwB~AggLXsr32QYFjq8BlYLZ5I06Dg) and follow @PulsarSummit on Twitter for updates and details of this much-anticipated one-day event.
- Read the [Apache Pulsar Contribution Guide](pathname:///contribute/) to start your first contribution.
- Visit the [Pulsar GitHub repository](https://github.com/apache/pulsar), follow the project on Twitter [@apache_pulsar](https://twitter.com/apache_pulsar), and join the [Pulsar community on Slack](https://apache-pulsar.slack.com/).