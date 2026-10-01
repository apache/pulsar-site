---
id: release-highlights
title: Pulsar 5.0 - Release highlights and upgrading
sidebar_label: Release highlights and upgrading
description: Faster messaging for existing workloads, Scalable Topics for growing applications, and a staged upgrade path from Pulsar 4.x.
---

import ReleaseSeriesNotes from '@site/src/components/ReleaseSeriesNotes';

Pulsar 5.0 introduces **Scalable Topics** for applications that need to grow beyond a fixed partition count, alongside **major performance and reliability improvements for existing workloads**. Scale topics and consumers as demand changes, benefit from more efficient brokers, and keep the applications and topics you already run.

- **Scalable Topics: grow beyond a fixed partition count.** Traditional partitions cannot shrink, and adding partitions can disrupt per-key ordering. Sizing too generously wastes resources; sizing too narrowly creates hot partitions and costly migrations. Scalable Topics let you split and merge key ranges and scale consumers while preserving per-key ordering and producer batching.
- **More performance from existing workloads.** Fewer thread handoffs, less contention, and batched storage reads reduce the work behind each message. In one [many-publisher benchmark](#keep-consumers-at-the-tail-with-many-publishers), steady consumption rose from about **5,700 to 153,000 messages/s** and the maximum backlog fell by more than **99%**.
- **More dependable delivery.** Fixes across geo-replication, subscriptions, delayed delivery, and acknowledgment recovery address stalls in the features applications use every day.
- **Easier operation at scale.** Better load distribution, coordinated rolling-upgrade guidance, structured logs, and the ability to close idle topics without deleting their data give operators more control.

:::tip Upgrade with confidence

**Keep your applications and topics.** Existing partitioned and non-partitioned topics, subscription types, and the existing Java client—now called the **v4 client**—remain supported. Your v4 applications can keep their client dependency and API when you upgrade the cluster. With Scalable Topics disabled, all previously available features remain fully supported in production on ZooKeeper.

**Adopt new capabilities on your schedule.** The v5 client API, Scalable Topics, and Oxia are separate choices. Upgrade your cluster first, then introduce the capabilities that suit your applications.

**Keep a planned path back to 4.x.** The [upgrade guide](administration-upgrade-to-5.0.x.md#preserve-and-rehearse-rollback) explains how to prepare and rehearse rollback to your tested 4.x release. Apply the rollback settings before the first 5.0 broker starts and retain the existing feature set during the rollback window.

:::

[Download Pulsar](pathname:///download) · [Plan your upgrade](administration-upgrade-to-5.0.x.md) · [Explore Scalable Topics](concepts-scalable-topics.md)

## Changelog {#detailed-changes}

<ReleaseSeriesNotes series="5.0" />

<!-- Release-note links update automatically. Retain this page's stable document ID. -->

## Scalable Topics {#scalable-topics}

[Scalable Topics](concepts-scalable-topics.md) give applications a logical topic that can grow as demand changes. Key-range segments can split and merge, so applications use a `topic://` address without managing a partition count.

Consumer parallelism can grow within each segment, too. Multiple consumers share the work while preserving per-key ordering, including when consumers join or leave. This helps drain backlogs left in segments after they split or merge and lets applications keep producer batching enabled without selecting a key-based batcher for this consumption mode.

Existing persistent topics can be [migrated in place](admin-api-scalable-topics.md#migrate-a-regular-topic), without copying their data, after their producers and consumers move to the v5 client. [Transactions](txn-use.md#transactions-on-scalable-topics) work across segment splits and merges when enabled on brokers using Oxia. In production, Scalable Topics use Oxia; ZooKeeper deployments can try them in test environments. The [administration guide](admin-api-scalable-topics.md) covers scaling, configuration, and the one-way transition from regular to Scalable Topics.

Operators can keep Scalable Topics behind a feature gate during the upgrade by setting `scalableTopicsEnabled=false` on every target broker before the first 5.0 broker starts. Together with the other [rollback prerequisites](administration-upgrade-to-5.0.x.md#preserve-and-rehearse-rollback), this preserves a safe path back to the tested 4.x release if problems arise during the 5.x upgrade. Enable the feature in production when you are ready, after validating the upgraded cluster and closing the rollback window.

## Performance and reliability {#performance-and-reliability}

:::tip

The performance and reliability improvements in Pulsar 5.0 apply to existing applications and topics. They don't require adopting Scalable Topics or the v5 client API. After [upgrading from Pulsar 4.x](administration-upgrade-to-5.0.x.md), existing applications continue to work with all their current features and benefit from these improvements without code changes.

:::

### Keep consumers at the tail with 100s of publishers {#keep-consumers-at-the-tail-with-many-publishers}

In a typical IoT deployment, hundreds of thousands of devices connect to hundreds of gateways, and each gateway publishes the devices' telemetry to Pulsar, which serves as the message bus for the applications that process it. The messages are keyed by device ID, so that each device's messages are processed in order, and for that reason they usually aren't batched. Pulsar 5.0 reduces the broker queueing and contention that could make the consuming applications fall behind even when they were fast enough to keep up.

A benchmark compared Pulsar 4.0.13 and 5.0.0 in a simplified version of this use case:

- **500 gateways** publish keyed, unbatched 128-byte messages to one shared topic, as fast as the cluster accepts them.
- **20 instances of a message-processing application** consume them from that topic on one Key_Shared subscription, which delivers each key's messages in order to one instance at a time.
- Each gateway and each application instance has its own Pulsar client and TCP connection.

The results:

<div className="release-highlights-benchmark">

| Means of 3 runs | 4.0.13 | 5.0.0 | Change |
| --- | ---: | ---: | ---: |
| Publishing rate, messages/s | 128,716 | 107,048 | −16.8% |
| Consuming rate during publishing, messages/s | 131 | 106,875 | ×816 |
| **Backlog growth rate during publishing, messages/s** | **128,585** | **173** | **−99.9%** |
| Delivered throughput, until the last message arrived, messages/s | 17,038 | 106,658 | +526% |
| Time the consumers needed after publishing ended | 202–205 s | 0 s | |
| **Maximum backlog, messages** | **3,990,044** | **12,729** | **−99.7%** |
| End-to-end latency, p99 | 202.3 s | 1.08 s | −99.5% |

</div>

**Backlog growth rate during publishing** is **publishing rate − consumption rate during publishing**, or equivalently **(messages published − messages consumed by the time all publishers finished) ÷ publishing duration in seconds**. A lower value means consumers keep closer to the publishers.

**Delivered throughput** is calculated for each run as **4,000,000 messages ÷ elapsed seconds from the start of publishing until the last message was consumed**, including any time spent draining the backlog after publishing ended. The table reports the mean of the three runs.

What the results show:

- **4.0.13's consumers fell behind:** they received almost nothing while the producers published, and needed more than 200 s afterwards to catch up.
- **5.0.0's consumers kept up:** they received the messages as fast as they were published, about 1 s after publishing at p99.
- **4.0.13 published faster** because its broker was hardly delivering anything at the same time, while 5.0.0's broker did both.

Throughput of one run of each version, each in a panel of its own with the same axes. With 4.0.13, consumption (the solid line) stays near zero until publishing ends, then drains the backlog at about 20,000 messages/s for more than 200 s; with 5.0.0, it follows publishing (the dashed line):

![Throughput of Pulsar 4.0.13 and 5.0.0: published and consumed messages per second, in separate panels with the same axes](/assets/release-highlights-5.0/throughput-4.0.13-vs-5.0.0-separate.svg)

Publish and end-to-end latency by percentile, on a logarithmic scale. The publish latencies are similar, about 1 s, while 4.0.13's end-to-end latency reaches about 200 s:

![Latency by percentile of Pulsar 4.0.13 and 5.0.0 on a logarithmic scale, in separate panels with the same axes](/assets/release-highlights-5.0/latency-percentiles-log-4.0.13-vs-5.0.0-separate.svg)

For these **tailing reads**—consuming newly published messages near the end of the topic—fewer thread handoffs and batched publish submission let dispatch keep moving instead of waiting behind one executor task per entry.

How it was measured:

- [Pulsar's performance testing framework](https://github.com/apache/pulsar/tree/master/tests/performance) ran its [`iot-telemetry-max-rate`](https://github.com/apache/pulsar/blob/master/tests/performance/scenarios/iot-telemetry-max-rate.yaml) scenario, with single-copy ledgers on three bookies, on one 8-core host at a fixed 2.4 GHz.
- Each run measured 4 million messages after a warmup. With 4.0.13, publishing took about 31 s and the last message arrived after about 235 s; with 5.0.0, both took about 37 s.
- The topic was a regular persistent topic, not a Scalable Topic, so that both versions ran the same kind of topic and the comparison with 4.0.13 is like for like.
- 4.0.13 ran with its own defaults, and both versions used the same 5.0.0 client. Every run delivered every message without duplicates or ordering violations.

The results describe this workload, not general broker capacity: run the scenario on your own hardware to compare with your application. Consumers still need enough processing capacity to keep up with producers.

### Less work per message {#less-work-per-message}

The efficiency improvements reach across the messaging path:

- **Publishing and dispatch:** batched handovers reduce executor contention, independent producers avoid a topic-wide deduplication lock, and Shared and Key_Shared dispatch use fewer synchronization and lookup operations.
- **Storage and memory:** BookKeeper batch reads fetch multiple entries per request using [BP-62 New API for batched reads](https://bookkeeper.apache.org/bps/BP-62-new-API-for-batched-reads/). Cache-owned copies and the [Netty adaptive allocator](https://netty.io/wiki/analyzing-memory-allocator-behavior.html) improve buffer use for small entries. Deferred metadata parsing reduces work on the publishing path, and tiered-storage reads reuse discovered entry offsets.
- **Acknowledgments and client scheduling:** compact bitmaps, reused acknowledgment data, fewer temporary objects, and coalesced listener notifications reduce allocation and scheduling overhead.

The [broker performance guide](performance-broker.md) explains the improvements and tuning options. The [configuration comparison](administration-upgrade-to-5.0.x-configuration.md) helps operators review changed defaults against their own workloads.

### More reliable delivery and recovery {#more-reliable-delivery-and-recovery}

Reliability improvements strengthen the features existing applications use every day:

- **Geo-replication** recovers more reliably from remote publish failures, rate-limit throttling, and cursor rewinds.
- **Subscriptions** handle Key_Shared replay and slow consumers, Failover read completions, and Shared reconnects and backpressure more reliably.
- **Delayed delivery** fixes preserve message indexes through snapshot trimming and tracker recovery, and prevent premature replay.
- **Acknowledgments and transactions** retain batch acknowledgment state and cursor properties during recovery, prevent already acknowledged messages from reaching dead-letter topics, and keep transactional and non-transactional messages in separate batches.

Assignment and ownership cleanup fixes also improve recovery in the extensible load manager.

## New capabilities {#new-capabilities}

### A Java client API built around how you consume {#v5-java-client}

The [v5 Java client API](pathname:///docs/client-libraries/java-v5) gives applications three focused consumption models:

- **Stream consumers** for ordered consumption with cumulative acknowledgment.
- **Queue consumers** for parallel processing with individual acknowledgments and dead-letter handling.
- **Checkpoint consumers** for applications that manage their own processing position.

The API supports Scalable Topics and existing persistent topics. Applications can also [subscribe across a namespace](pathname:///docs/client-libraries/java-v5#consume-a-namespace), selecting topics by properties. Producer and receive-buffer backpressure, non-blocking asynchronous receives, and reduced acknowledgment overhead help applications handle bursts efficiently.

**One dependency for the v4, v5, and admin clients.** For new applications or dependency updates, `org.apache.pulsar:pulsar-client-v5-all` provides all three through a single unshaded dependency with transitive dependencies. You can adopt it while continuing to use only the v4 API. See [Pulsar Java client dependency configuration](pathname:///docs/client-libraries/java-dependency-configuration) for complete Maven and Gradle examples, BOM alignment, and conflict exclusions, and the [API migration guide](pathname:///docs/client-libraries/java-migrate-to-v5) when you are ready to use the new consumer models.

The v5 API requires scalable-topic services to be enabled on the brokers, including for regular topics. The v4 API works whether those services are enabled or disabled, so application migration can follow the cluster upgrade on its own schedule.

### Oxia for new clusters, continuity for ZooKeeper deployments {#oxia-and-metadata-migration}

Oxia is the recommended metadata store for new clusters and the supported choice for Scalable Topics in production. Existing ZooKeeper deployments can continue running their workloads: with Scalable Topics disabled, all previously available features remain fully supported in production configurations with ZooKeeper.

When you choose to move to Oxia, the [metadata-store migration framework](administration-metadata-store-migration.md) copies metadata while publishing and consuming continue, with a planned cutover and validation procedure. You can schedule this separately from the software upgrade. ZooKeeper can also be used to test Scalable Topics in Pulsar 5.0.0; some scalable-topic features, including transactions, require Oxia.

[Topic policies can now be stored directly in the metadata store](administration-metadata-store.md#store-topic-policies-in-the-metadata-store). Topics whose policies are stored in system topics keep using them, allowing operators to plan that transition separately as well.

### TLS integration for corporate security and compliance {#authentication-tls-and-networking}

The **TLS factory API** gives organizations a common integration point for custom certificate handling and TLS configuration. Together with **configurable JSSE and JCA providers**, it provides a foundation for deployments that need validated cryptographic providers or hardware security module (HSM)-backed keys to meet corporate security and compliance requirements, including FIPS 140-3 requirements.

These capabilities do not make Pulsar FIPS 140-3 certified; compliance depends on the provider, its validated version, and the deployment configuration. See [TLS providers and custom factories](security-tls-transport.md#tls-providers-and-custom-factories) and [cryptographic provider guidance](security-bouncy-castle.md#validation-and-fips-requirements) for configuration and validation considerations.

[Multiple advertised listeners](concepts-multiple-advertised-listeners.md) now extend to direct HTTP/HTTPS admin access through listener-specific endpoints, alongside separate internal and client-facing messaging paths. This makes it easier to connect private networks and Kubernetes applications while keeping broker-to-broker traffic internal.

Asynchronous authentication in the Java client keeps blocking credential work off network event-loop threads. This reduces latency spikes caused by slow credential retrieval or refresh, helping message traffic and connection handling stay responsive during authentication.

### Release idle resources and see backlog age {#close-inactive-topics-without-deleting-them}

Large topic fleets can [close inactive topics](admin-api-topics.md#close-inactive-topics-without-deleting-data) to release broker memory and remove idle metric series while retaining persistent data. The next producer or consumer reloads the topic. This opt-in capability helps operators manage resource use without deleting topics and their messages.

The new `pulsar_subscription_storage_backlog_age_seconds` metric shows how old stored subscription backlog is, alongside how large it is. Enable it with `exposeSubscriptionBacklogAgeInPrometheus=true` (default `false`). Dynamic topic-level metric exposure gives operators more control over monitoring cardinality. See [Broker metrics](reference-metrics.md#broker).

### Logs with the context you need {#structured-logging}

Structured log events carry topic, subscription, and storage context, helping operators follow activity across broker and storage operations. [Choose text or JSON output](administration-logging.md) to fit your logging pipeline. Text remains the default.

### More control over Python and Go Functions {#python-and-go-functions}

Python and Go Functions honor producer batching and negative-acknowledgment delay settings. Go Functions also honor ordering settings and continue processing after user-function errors, with retries governed by the processing guarantee. These improvements bring more of the messaging configuration into the function runtimes. See [runtime settings](functions-concepts.md#python-and-go-runtime-settings).

## Operational improvements {#operational-improvements}

### Rolling upgrades and restarts with less disruption {#rolling-upgrades-and-restarts-with-less-disruption}

The new [rolling broker upgrade and restart guide](administration-rolling-upgrade.md) gives operators a detailed procedure for minimizing client disruption. It is especially useful for [Kubernetes deployments](administration-rolling-upgrade.md#kubernetes-deployments), covering graceful shutdown, replacement capacity, ownership recovery, and controlled rebalancing.

The Pulsar Helm chart's default Kubernetes rolling updates remain a straightforward option when applications tolerate client reconnections. For tighter continuity requirements, the guide explains the additional coordination that the chart does not currently automate. Operators can use those steps in scripts, deployment pipelines, or Kubernetes operators, for both version upgrades and configuration restarts.

### Better load distribution after broker changes {#better-load-distribution-after-broker-changes}

The default modular load manager now uses **AvgShedder** for load shedding and placement, replacing **ThresholdShedder** and **LeastLongTermMessageRate**. It pairs heavily and lightly loaded brokers and plans destinations for moved bundles. Repeated load checks filter out short spikes, while larger sustained imbalances trigger faster action.

The result is more deliberate rebalancing after adding brokers or completing a rolling upgrade, with less unnecessary bundle movement. The updated [load-balancing administration guide](administration-load-balance.md) explains the behavior and how to tune it.

## Upgrading {#start-with-the-upgrade-guide}

<span id="upgrading-pulsar-standalone" />
<span id="replace-pulsar-manager" />

**Move the cluster forward while keeping application changes on your own schedule.** The [Pulsar 5.0.x upgrade guide](administration-upgrade-to-5.0.x.md) brings together the release-specific steps. The [cluster upgrade guide](administration-upgrade.md) covers component order, and the [rolling broker guide](administration-rolling-upgrade.md) covers controlled rollouts.

1. **Establish your starting point.** Run the latest maintenance release in your 4.0.x or 4.2.x line with your workload. Keep that tested release and its configuration available for rollback.
2. **Prepare and upgrade the cluster.** Review runtime, security, packaging, and configuration changes below. Keep existing topics and the v4 client API during the rollout. To retain rollback to 4.x, configure the [rollback settings](administration-upgrade-to-5.0.x.md#preserve-and-rehearse-rollback) on every target broker before the first 5.0 broker starts, including `scalableTopicsEnabled=false` and, if package management is enabled, `packagesManagementJsonSerializationEnabled=false`.
3. **Adopt new capabilities when ready.** After validating the cluster and closing the rollback window, plan adoption of the v5 API, Scalable Topics, or Oxia. Existing applications can continue using the v4 API. Converting a regular topic to a scalable topic is a one-way operation.

The main preparation areas are:

| Area | What to prepare |
| --- | --- |
| Java | Servers require Java 21 or later; Java clients require Java 17 or later. Container images use Java 25. |
| TLS and authentication | Hostname verification is enabled by default in Java clients and outbound server connections. Check certificate names, custom TLS factories, and proxy authentication settings. |
| Images and connectors | Replace `apachepulsar/pulsar-all` with `apachepulsar/pulsar` and supply IO connector NARs separately. Pulsar 4.2.x connectors remain compatible with regular partitioned and non-partitioned topics; the separate connectors release is pending. The standard image includes offloaders except the filesystem offloader. |
| Applications, Functions, and broker plugins | Review the [application and plugin guide](administration-upgrade-to-5.0.x-applications.md) for Java dependencies and cryptographic providers, JDK 21+ plugin builds, Jakarta API changes, and Python Functions' default forwarding of message properties. |
| Load balancing | If you tuned ThresholdShedder or LeastLongTermMessageRate, review the [AvgShedder configuration](administration-load-balance.md) for the new default strategies. |
| Logging | Update parsers that depend on older message wording; [structured text or JSON output](administration-logging.md) carries the event context. |
| Administration UI | Pulsar Manager is no longer maintained and will receive no new releases, fixes, or compatibility updates. Choose an [alternative](administration-ui.md) and remove existing deployments. Helm users should disable `pulsar_manager`, already disabled by default in current chart versions. |
| Metadata stores | The etcd backend has been removed. Migrate to ZooKeeper or Oxia before upgrading. |

## Development and system performance testing {#development-and-system-performance-testing}

Pulsar's source build now uses **Gradle**, with incremental development tasks and profiling support. Build broker-side components with Java 21 or later; the Java client runtime baseline remains Java 17.

An **IoT telemetry simulation** is part of Pulsar's [system performance testing framework](https://github.com/apache/pulsar/tree/master/tests/performance). It models many publishers, keyed telemetry, independent consuming applications, and client restarts. Runs verify delivery, ordering, and duplicates while recording throughput, latency, and backlog.

![IoT telemetry simulation with device gateways publishing to Pulsar and independent applications consuming the telemetry.](/assets/iot-system-overview.svg)

The Docker-based framework supports repeatable comparisons between revisions, CPU and allocation profiling, off-CPU analysis, and **AI-assisted performance analysis, profiling, and optimization**. Contributors can use the reports and recordings to find bottlenecks, test changes, and turn real workload observations into improvements. These scenarios are part of development, rather than an automated CI performance regression gate.
