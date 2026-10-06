---
id: release-highlights
title: Pulsar 5.0 - Release highlights and upgrading
sidebar_label: Release highlights and upgrading
description: Faster messaging for existing workloads, Scalable Topics for growing applications, and a staged upgrade path from Pulsar 4.x.
---

import ReleaseSeriesNotes from '@site/src/components/ReleaseSeriesNotes';

Pulsar 5.0 introduces **Scalable Topics** for applications that need to grow beyond a fixed partition count, alongside **major performance and reliability improvements for existing workloads**. Scale topics and consumers as demand changes, benefit from more efficient brokers, and keep the applications and topics you already run.

- **Scalable Topics: topics that size themselves.** Instead of choosing a partition count up front, a scalable topic splits hot key-range segments and merges cold ones at runtime, while preserving per-key ordering and producer batching.
- **More performance from existing workloads.** Fewer thread handoffs, less contention, and batched storage reads reduce the work behind each message. In a [benchmark with 500 publishers](#keep-consumers-at-the-tail-with-many-publishers), consumers stayed at the tail instead of stalling behind the producers, the broker sustained about **1.7× the total load**, published plus consumed, and p99 end-to-end latency fell from **202.3 s to 1.08 s**.
- **More dependable delivery.** Fixes across geo-replication, subscriptions, delayed delivery, and acknowledgment recovery address stalls in the features applications use every day.
- **Easier operation at scale.** Better load distribution, coordinated rolling-upgrade guidance, structured logs, and the ability to close idle topics without deleting their data give operators more control.

:::tip Upgrade with confidence

**Keep your applications and topics.** Existing partitioned and non-partitioned topics, subscription types, and the existing Java client—now called the **v4 client**—remain supported. Your v4 applications can keep their client dependency and API when you upgrade the cluster. ZooKeeper remains fully supported as the metadata store.

**Adopt new capabilities on your schedule.** The v5 client API, Scalable Topics, and Oxia are separate choices. Upgrade your cluster first, then introduce the capabilities that suit your applications.

**Keep a planned path back to 4.x.** The [upgrade guide](administration-upgrade-to-5.0.x.md) explains how to prepare and rehearse rollback to your tested 4.x release. Apply the rollback settings before the first 5.0 broker starts and retain the existing feature set during the rollback window.

:::

[Download Pulsar](pathname:///download) · [Upgrading to Pulsar 5.0.x](administration-upgrade-to-5.0.x.md) · [Explore Scalable Topics](concepts-scalable-topics.md)

## Changelog {#detailed-changes}

<ReleaseSeriesNotes series="5.0" />

<!-- Release-note links update automatically. Retain this page's stable document ID. -->

## Scalable Topics: topics that size themselves {#scalable-topics}

A topic should be a **logical concept**: a named stream that applications publish to and consume from. Yet for its whole history, Pulsar has asked application developers to answer an infrastructure question up front: **how many partitions?** That number is a guess that is easy to get wrong and hard to undo. It is chosen before you know the real traffic, it can be increased but never decreased, and because keys are routed with `hash(key) % partitionCount`, increasing it moves keys to different partitions, so consumers may read a key's newer messages before its older ones. Choose too few partitions and you create hot partitions and costly migrations; choose too many and you pay for resources a quiet topic never needed.

**[Scalable Topics](concepts-scalable-topics.md) take that decision away.** A scalable topic, addressed with the new `topic://` scheme, is a single logical stream whose capacity follows its actual load, in both directions:

- **Key-range segments.** The key hash space is divided into segments, each owning a contiguous range and backed by its own internal topic.
- **Split and merge at runtime.** The broker splits hot segments and merges adjacent cold ones with no downtime. This is automatic by default, with thresholds you can tune per broker, namespace, and topic, and you can also split and merge manually.
- **Per-key ordering is preserved.** A split or merge moves a key to a successor range that still contains it, and stream consumers drain the predecessor segment before reading its successor.
- **Applications see one stream.** A per-topic controller in the broker manages the segment layout and pushes changes to clients, so applications never handle segments or react to resizing.

Consumer parallelism can grow within a segment, too. Messages are grouped into **entry buckets** by key hash, and multiple stream consumers share a segment's buckets in key order, including when consumers join or leave. When more consumers join, Pulsar can split a busy segment or give it more buckets, and after a split or merge, consumers share the sealed segment's buckets to drain its backlog. **If you have struggled to combine Key_Shared subscriptions with producer batching, this addresses it:** producers keep batching enabled, without a key-based batcher, while stream consumers share the work in key order.

| | Partitioned topic (v4) | Scalable topic |
| --- | --- | --- |
| Capacity | Partition count chosen at creation | Segments and entry buckets that change at runtime |
| Scale up | Increase the partition count manually | Hot segments split automatically |
| Scale down | Not possible | Cold segments merge automatically |
| Key ordering when resized | Keys can move between partitions | Preserved across splits and merges for stream consumers |
| Layout visible to applications | Partition count and indexes | None; managed by the broker |

The goal is for one topic type to be the right choice across use cases, out of the box: you model your application around the topics that fit your domain, and Pulsar adapts them to how they are actually used, without capacity planning or re-sharding.

Scalable Topics are delivered by a family of Pulsar Improvement Proposals:

- **[PIP-460](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-460.md)**: Scalable Topics, the overall model
- **[PIP-468](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-468.md)**: the per-topic controller
- **[PIP-483](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-483.md)**: automatic split and merge
- **[PIP-486](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-486.md)**: key-shared consumption with entry buckets
- **[PIP-466](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-466.md)**: the v5 Java client API
- **[PIP-473](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-473.md)**: transactions across splits and merges
- **[PIP-475](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-475.md)**: in-place migration of regular topics, with no data copy
- **[PIP-494](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-494.md)**: the client specification and its change process
- **[PIP-496](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-496.md)**: Functions and IO connectors on Scalable Topics

### A client specification for every SDK {#scalable-topics-client-specification}

With Scalable Topics, clients do more than connect to a topic: they track the segment layout as it changes, route each key to the segment that owns it, and follow the controller's consumer assignments. To make every client behave the same way, Pulsar 5.0 ships the **[Scalable Topics Client Specification](https://github.com/apache/pulsar/tree/v5.0.0/spec/scalable-topics) 1.0**, the authoritative, language-neutral contract for Scalable Topics clients:

- **One contract for all languages.** It separates the API contract that applications observe from a client's internal mechanisms and the exact wire-protocol interactions, documented with sequence diagrams. Conformant clients route keys identically and share ordering and acknowledgment semantics, so producers and consumers written in different languages can work on the same scalable topic.
- **Stable and versioned.** Each feature has a stability tier. Incompatible changes land only at an LTS boundary, deprecated features remain available at least until the next LTS release, and every normative change goes through a PIP together with its specification edits.
- **A clear definition of support.** A conformance checklist defines what an SDK must implement to claim Scalable Topics support. The Java v5 client is the reference implementation, while the specification is the source of truth.

Today, the Java [v5 client](#v5-java-client) supports Scalable Topics, and work is ongoing to bring that support to the other Pulsar client SDKs.

### Adopting Scalable Topics {#adopting-scalable-topics}

- **New applications** are encouraged to build on Scalable Topics and the v5 API when the [requirements and limitations](concepts-scalable-topics.md#requirements) fit.
- **Existing applications** can keep their partitioned and non-partitioned topics, with no requirement to migrate. When you're ready, existing persistent topics can be [migrated in place](admin-api-scalable-topics.md#migrate-a-regular-topic), without copying their data, once their producers and consumers use the v5 client. The conversion is one-way.
- **Requirements:** a client with v5 API support, since v4 clients cannot use `topic://` topics, and scalable-topic services enabled on the brokers, which the v5 API needs even for regular topics. Scalable Topics work with ZooKeeper and Oxia, with Oxia recommended, and support [transactions](txn-use.md#transactions-on-scalable-topics) across segment splits and merges.
- **Functions and IO connectors:** Java Functions and IO connectors switch to the v5 client automatically when their topics are `topic://` topics. Python and Go Functions keep the v4 client and cannot use `topic://` topics.
- **Limitations:** geo-replication and replicated subscriptions are not supported for Scalable Topics in 5.0. Use partitioned or non-partitioned topics for applications that need them.

Operators can keep Scalable Topics behind a feature gate during the upgrade by setting `scalableTopicsEnabled=false` (the default is `true`) on every target broker before the first 5.0 broker starts. Together with the other [rollback prerequisites](administration-upgrade-to-5.0.x.md#preserve-and-rehearse-rollback), this preserves a safe path back to the tested 4.x release if problems arise during the 5.x upgrade. Enable the feature in production when you are ready, after validating the upgraded cluster and closing the rollback window.

The v4 API and existing topic types remain fully supported throughout the 5.0 LTS line. Longer term, Scalable Topics are designed to cover all of Pulsar's use cases, and the v5 API is the direction Pulsar is heading; according to [PIP-460](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-460.md), any deprecation of the existing API would be planned for a later LTS release.

To get started, read the [Scalable Topics concepts](concepts-scalable-topics.md), the [v5 Java client guide](pathname:///docs/client-libraries/java-v5), and [Manage scalable topics](admin-api-scalable-topics.md).

## Performance and reliability for existing workloads {#performance-and-reliability}

:::tip

The performance and reliability improvements in Pulsar 5.0 apply to existing applications and topics. They don't require adopting Scalable Topics or the v5 client API. After [upgrading from Pulsar 4.x](administration-upgrade-to-5.0.x.md), existing applications continue to work with all their current features and benefit from these improvements without code changes.

:::

### Consumers keep up with hundreds of publishers {#keep-consumers-at-the-tail-with-many-publishers}

In a typical IoT deployment, devices connect to hundreds of gateways that publish the devices' telemetry to Pulsar. Messages are keyed by device ID so that each device's messages are processed in order, and for that reason they are often not batched.

A benchmark compared Pulsar 4.0.13 and 5.0.0 on a simplified version of this use case: **500 publishers** sent keyed, unbatched 128-byte messages, as fast as the broker accepted them, to one regular persistent topic, consumed by **20 consumers** on one Key_Shared subscription. Each publisher and consumer had its own client and connection, and both versions were driven by the same 5.0.0 Java client. The table shows the means of three runs.

| | 4.0.13 | 5.0.0 |
| --- | ---: | ---: |
| Publishing rate, messages/s | 128,716 | 107,048 |
| Consuming rate during publishing, messages/s | 131 | 106,875 |
| Published + consumed, messages/s | 128,847 | 213,923 |
| End-to-end latency, p99 | 202.3 s | 1.08 s |

Once the broker reached its CPU limit, contention between threads in 4.0.13 left the consumers stalled behind the producers: they received almost nothing until publishing ended, and the backlog grew to almost 4 million messages. 4.0.13 accepted messages faster only because it was barely delivering any. Pulsar 5.0.0 shares the broker fairly between publishing and dispatch, so consumers stay at the tail and it sustains about **1.7× the total load**, published plus consumed.

![Throughput of one run of Pulsar 4.0.13 and of 5.0.0: published and consumed messages per second, in separate panels with the same axes](/assets/release-highlights-5.0/throughput-4.0.13-vs-5.0.0-separate.svg)

The gains come mainly from fewer thread handoffs and batched publish submission, which keep dispatch moving instead of waiting behind one executor task per entry. These results describe this workload, not general broker capacity. Consumers still need enough processing capacity to keep up with producers.

How it was measured:

- [Pulsar's performance testing framework](https://github.com/apache/pulsar/tree/v5.0.0/tests/performance) ran its [`iot-telemetry-max-rate`](https://github.com/apache/pulsar/blob/v5.0.0/tests/performance/scenarios/iot-telemetry-max-rate.yaml) scenario, with single-copy ledgers on three bookies, on one 8-core host at a fixed 2.4 GHz. You can run the scenario on your own hardware to compare with your application.
- Each run measured 4 million messages after a warmup. With 4.0.13, publishing took about 31 s and the last message arrived after about 235 s; with 5.0.0, both took about 37 s.
- The topic was a regular persistent topic, not a Scalable Topic, so that both versions ran the same kind of topic and the comparison with 4.0.13 is like for like. 4.0.13 ran with its own defaults. Every run delivered every message without duplicates or ordering violations.
- **Consuming rate during publishing** counts the messages consumed by the time all publishers finished, divided by the publishing duration. **Published + consumed** is the sum of the publishing rate and the consuming rate during publishing, the total message load the broker handled while publishing.

### Less work per message {#less-work-per-message}

- **Publishing and dispatch:** batched handovers reduce executor contention, producers on a topic with deduplication enabled no longer contend on a topic-wide lock, and Shared and Key_Shared dispatch use fewer synchronization and lookup operations.
- **Storage and memory:** [BookKeeper batch reads](https://bookkeeper.apache.org/bps/BP-62-new-API-for-batched-reads/) fetch multiple entries per request when draining backlogs of small entries, cache-owned copies and Netty's adaptive allocator improve buffer use, and deferred metadata parsing reduces work when publishing.
- **Acknowledgments and client scheduling:** compact bitmaps, reused acknowledgment data, and coalesced listener notifications reduce allocation and scheduling overhead; the client-side changes take effect with the 5.0 client library.

The [broker performance guide](performance-broker.md) covers the related settings and how to tune them. The [configuration comparison](administration-upgrade-to-5.0.x-configuration.md) helps operators review changed defaults against their own workloads.

### Seek by timestamp on offloaded topics with fewer object-store requests {#seek-by-timestamp-in-offloaded-topics}

Seeking a topic in [tiered storage](tiered-storage-overview.md) to a timestamp previously meant scanning offloaded data blocks from their start, one ranged read at a time. Pulsar 5.0 remembers the entry offsets it discovers and uses the indexed block starts. Compared with 4.0.13 and 4.2.4, a cold search in the benchmark sent about **90% fewer requests** to the object store (44 ranged reads instead of 428) and a nearby follow-up search about 96% fewer, which also means less data downloaded; the offset reuse is also in 4.0.14 and 4.2.5. The latency gain depends on your object store. New OpenTelemetry [message position search metrics](reference-metrics-opentelemetry.md#message-position-search-metrics) let you observe these searches on a running broker. See [read performance for object storage](tiered-storage-overview.md#read-performance-for-object-storage) for the settings involved.

### More reliable delivery and recovery {#more-reliable-delivery-and-recovery}

Reliability improvements strengthen the features existing applications use every day:

- **Geo-replication** recovers more reliably from remote publish failures, rate-limit throttling, and cursor rewinds.
- **Subscriptions** handle Key_Shared replay and slow consumers, Failover read completions, and Shared reconnects and backpressure more reliably.
- **Delayed delivery** fixes preserve message indexes through snapshot trimming and tracker recovery, and prevent premature replay.
- **Acknowledgments and transactions** retain batch acknowledgment state and cursor properties during recovery, prevent already acknowledged messages from reaching dead-letter topics, and keep transactional and non-transactional messages in separate batches.

Assignment and ownership cleanup fixes also improve recovery in the extensible load manager. Most of these fixes are also in the 4.0.14 and 4.2.5 maintenance releases.

## New capabilities {#new-capabilities}

### Scalable Topics {#scalable-topics-capability}

[See section above](#scalable-topics).

### A Java client API built around how you consume {#v5-java-client}

Scalable Topics are used through the new [v5 Java client API](pathname:///docs/client-libraries/java-v5). Over more than a decade, Pulsar's client API grew one feature at a time, accumulating options, overloads, and subtle inconsistencies; the v5 API is a clean-slate redesign that distills the lessons from production use into a focused API.

Consumption is the clearest example. The v4 client offers a single `Consumer` shaped by one of four subscription types (Exclusive, Failover, Shared, and Key_Shared), plus a separate `Reader`, with behavior that shifts as options are combined. The v5 API replaces them with three purpose-built consumers, each exposing only the operations that make sense for it:

- **Stream consumers** for ordered consumption with cumulative acknowledgment, including key-shared processing across consumers.
- **Queue consumers** for parallel work-queue processing with individual and negative acknowledgments and dead-letter handling.
- **Checkpoint consumers** for stream-processing engines such as Flink and Spark that track their own position, with no subscription or acknowledgment.

The v5 API also works with existing partitioned and non-partitioned persistent topics, so you can adopt it before converting any topic. Stream and queue consumers can also [subscribe to all scalable topics in a namespace](pathname:///docs/client-libraries/java-v5#consume-a-namespace), selecting them by their properties. Producer and receive-buffer backpressure, non-blocking asynchronous receives, and reduced acknowledgment overhead help applications handle bursts.

**One dependency for the v4, v5, and admin clients.** `org.apache.pulsar:pulsar-client-v5-all` contains the Java client, with both the v4 and v5 APIs, and the Java admin client. It is unshaded, so you can upgrade third-party dependencies yourself, for example to address CVEs, without waiting for a Pulsar release; import the Pulsar and Netty BOMs to keep their versions aligned, as described in [Java client dependency configuration](pathname:///docs/client-libraries/java-dependency-configuration#pulsar-bom). Switching to it doesn't require changes to code that uses only Pulsar's public APIs, and moving code to the v5 API is a separate step, covered by the [migration guide](pathname:///docs/client-libraries/java-migrate-to-v5).

The v5 API requires scalable-topic services to be enabled on the brokers, including for regular topics. The v4 API works whether those services are enabled or disabled, so application migration can follow the cluster upgrade on its own schedule.

### Oxia for new clusters, continuity for ZooKeeper deployments {#oxia-and-metadata-migration}

[Oxia](https://oxia-db.github.io/) is fully open source under the [Apache-2.0 license](https://github.com/oxia-db/oxia/blob/main/LICENSE) and has been accepted into CNCF at the [Sandbox maturity level](https://www.cncf.io/projects/oxia/). It is the recommended metadata store for new Pulsar clusters and for Scalable Topics.

Existing ZooKeeper deployments can keep running unchanged. When you choose to move to Oxia, the [metadata store migration framework](administration-metadata-store-migration.md) ([PIP-454](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-454.md)) copies metadata while existing producers and consumers keep running; metadata changes such as topic creation and ledger rollovers pause during the copy. A planned cutover and validation procedure completes the move, which you can schedule separately from the software upgrade.

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
