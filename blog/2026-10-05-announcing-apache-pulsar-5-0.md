---
title: "Apache Pulsar 5.0 LTS: Scalable Topics and Faster Existing Workloads"
author: Matteo Merli, Lari Hotari
date: 2026-10-05
---

The Apache Pulsar community is pleased to announce **Apache Pulsar 5.0.0**, the new long-term support (LTS) release. It follows the 5.0.0-M1 and 5.0.0-M2 milestones and is ready for production use.

Pulsar 5.0 has two headlines. **Scalable Topics** are a new kind of topic that grows and shrinks with demand while preserving per-key ordering, delivered together with a new Java client API and Oxia as the recommended metadata store for new clusters. The second is **major performance and reliability improvements for the topics and applications you already run**, which you get by upgrading your cluster, with no application changes.

The two are independent: you can upgrade a 4.x cluster to 5.0, keep your current topics, clients, and ZooKeeper metadata store, and adopt the new capabilities later, on your own schedule.

<!--truncate-->

## Upgrade first, adopt new capabilities when you're ready

Existing partitioned and non-partitioned topics, all subscription types, and the existing Java client, now called the **v4 client**, remain fully supported, and so does ZooKeeper for regular topics. Adopting the v5 client API, Scalable Topics, or Oxia is optional, and none of them is required to benefit from the improvements in 5.0. A typical path looks like this:

1. **Establish your starting point.** Run the latest maintenance release of your 4.0.x or 4.2.x line with your own workloads, and keep that release and its configuration available for rollback.
2. **Upgrade the cluster.** Prepare for the changes in [Before you upgrade](#before-you-upgrade) and roll out 5.0 while applications keep using the v4 client and existing topics. To keep a path back to your tested 4.x release, set `scalableTopicsEnabled=false` (the default is `true`) on every target broker before the first 5.0 broker starts, and if you use package management for Functions or IO connectors, apply the other [rollback prerequisites](/docs/5.0.x/administration-upgrade-to-5.0.x#preserve-and-rehearse-rollback) too.
3. **Adopt new capabilities when ready.** After validating the cluster and closing the rollback window, adopt the v5 API, Scalable Topics, or Oxia where they help your applications.

## Scalable Topics: topics that size themselves

A topic should be a **logical concept**: a named stream that applications publish to and consume from. Yet for its whole history, Pulsar has asked application developers to answer an infrastructure question up front: **how many partitions?** That number is a guess that is easy to get wrong and hard to undo. It is chosen before you know the real traffic, it can be increased but never decreased, and because keys are routed with `hash(key) % partitionCount`, increasing it moves keys to different partitions, so consumers may read a key's newer messages before its older ones. Choose too few partitions and you create hot partitions and costly migrations; choose too many and you pay for resources a quiet topic never needed.

**[Scalable Topics](/docs/5.0.x/concepts-scalable-topics) take that decision away.** A scalable topic, addressed with the new `topic://` scheme, is a single logical stream whose capacity follows its actual load, in both directions:

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

### A Java client API built around how you consume

Scalable Topics are used through the new [v5 Java client API](/docs/client-libraries/java-v5). Over more than a decade, Pulsar's client API grew one feature at a time, accumulating options, overloads, and subtle inconsistencies; the v5 API is a clean-slate redesign that distills the lessons from production use into a focused API.

Consumption is the clearest example. The v4 client offers a single `Consumer` shaped by one of four subscription types (Exclusive, Failover, Shared, and Key_Shared), plus a separate `Reader`, with behavior that shifts as options are combined. The v5 API replaces them with three purpose-built consumers, each exposing only the operations that make sense for it:

- **Stream consumers** for ordered consumption with cumulative acknowledgment, including key-shared processing across consumers.
- **Queue consumers** for parallel work-queue processing with individual and negative acknowledgments and dead-letter handling.
- **Checkpoint consumers** for stream-processing engines such as Flink and Spark that track their own position, with no subscription or acknowledgment.

The v5 API also works with existing partitioned and non-partitioned persistent topics, so you can adopt it before converting any topic. Stream and queue consumers can also [subscribe to all scalable topics in a namespace](/docs/client-libraries/java-v5#consume-a-namespace), selecting them by their properties. Producer and receive-buffer backpressure, non-blocking asynchronous receives, and reduced acknowledgment overhead help applications handle bursts.

**One dependency for the v4, v5, and admin clients.** `org.apache.pulsar:pulsar-client-v5-all` contains the Java client, with both the v4 and v5 APIs, and the Java admin client. It is unshaded, so you can upgrade third-party dependencies yourself, for example to address CVEs, without waiting for a Pulsar release; import the Pulsar and Netty BOMs to keep their versions aligned, as described in [Java client dependency configuration](/docs/client-libraries/java-dependency-configuration#pulsar-bom). Switching to it doesn't require changes to code that uses only Pulsar's public APIs, and moving code to the v5 API is a separate step, covered by the [migration guide](/docs/client-libraries/java-migrate-to-v5).

### A client specification for every SDK

With Scalable Topics, clients do more than connect to a topic: they track the segment layout as it changes, route each key to the segment that owns it, and follow the controller's consumer assignments. To make every client behave the same way, Pulsar 5.0 ships the **[Scalable Topics Client Specification](https://github.com/apache/pulsar/tree/v5.0.0/spec/scalable-topics) 1.0**, the authoritative, language-neutral contract for Scalable Topics clients:

- **One contract for all languages.** It separates the API contract that applications observe from a client's internal mechanisms and the exact wire-protocol interactions, documented with sequence diagrams. Conformant clients route keys identically and share ordering and acknowledgment semantics, so producers and consumers written in different languages can work on the same scalable topic.
- **Stable and versioned.** Each feature has a stability tier. Incompatible changes land only at an LTS boundary, deprecated features remain available at least until the next LTS release, and every normative change goes through a PIP together with its specification edits.
- **A clear definition of support.** A conformance checklist defines what an SDK must implement to claim Scalable Topics support. The Java v5 client is the reference implementation, while the specification is the source of truth.

Today, the Java v5 client supports Scalable Topics, and work is ongoing to bring that support to the other Pulsar client SDKs.

### Adopting Scalable Topics

- **New applications** are encouraged to build on Scalable Topics and the v5 API when the [requirements and limitations](/docs/5.0.x/concepts-scalable-topics#requirements) fit.
- **Existing applications** can keep their partitioned and non-partitioned topics, with no requirement to migrate. When you're ready, existing persistent topics can be [migrated in place](/docs/5.0.x/admin-api-scalable-topics#migrate-a-regular-topic), without copying their data, once their producers and consumers use the v5 client. The conversion is one-way.
- **Requirements:** a client with v5 API support, since v4 clients cannot use `topic://` topics, and scalable-topic services enabled on the brokers, which the v5 API needs even for regular topics. Scalable Topics work with ZooKeeper and Oxia, with Oxia recommended, and support [transactions](/docs/5.0.x/txn-use#transactions-on-scalable-topics) across segment splits and merges.
- **Functions and IO connectors:** Java Functions and IO connectors switch to the v5 client automatically when their topics are `topic://` topics. Python and Go Functions keep the v4 client and cannot use `topic://` topics.
- **Limitations:** geo-replication and replicated subscriptions are not supported for Scalable Topics in 5.0. Use partitioned or non-partitioned topics for applications that need them.

The v4 API and existing topic types remain fully supported throughout the 5.0 LTS line. Longer term, Scalable Topics are designed to cover all of Pulsar's use cases, and the v5 API is the direction Pulsar is heading; according to [PIP-460](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-460.md), any deprecation of the existing API would be planned for a later LTS release.

To get started, read the [Scalable Topics concepts](/docs/5.0.x/concepts-scalable-topics), the [v5 Java client guide](/docs/client-libraries/java-v5), and [Manage scalable topics](/docs/5.0.x/admin-api-scalable-topics).

## Performance and reliability for existing workloads

### Consumers keep up with hundreds of publishers

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

The gains come mainly from fewer thread handoffs and batched publish submission, which keep dispatch moving instead of waiting behind one executor task per entry. These results describe this workload, not general broker capacity. You can run the [`iot-telemetry-max-rate`](https://github.com/apache/pulsar/blob/v5.0.0/tests/performance/scenarios/iot-telemetry-max-rate.yaml) scenario on your own hardware with Pulsar's [performance testing framework](https://github.com/apache/pulsar/tree/v5.0.0/tests/performance), and the [release highlights](/docs/5.0.x/release-highlights#keep-consumers-at-the-tail-with-many-publishers) describe the setup and the metrics.

### Less work per message

- **Publishing and dispatch:** batched handovers reduce executor contention, producers on a topic with deduplication enabled no longer contend on a topic-wide lock, and Shared and Key_Shared dispatch use fewer synchronization and lookup operations.
- **Storage and memory:** [BookKeeper batch reads](https://bookkeeper.apache.org/bps/BP-62-new-API-for-batched-reads/) fetch multiple entries per request when draining backlogs of small entries, cache-owned copies and Netty's adaptive allocator improve buffer use, and deferred metadata parsing reduces work when publishing.
- **Acknowledgments and client scheduling:** compact bitmaps, reused acknowledgment data, and coalesced listener notifications reduce allocation and scheduling overhead; the client-side changes take effect with the 5.0 client library.

The [broker performance guide](/docs/5.0.x/performance-broker) covers the related settings and how to tune them.

### Seek by timestamp on offloaded topics with fewer object-store requests

Seeking a topic in [tiered storage](/docs/5.0.x/tiered-storage-overview) to a timestamp previously meant scanning offloaded data blocks from their start, one ranged read at a time. Pulsar 5.0 remembers the entry offsets it discovers and uses the indexed block starts. Compared with 4.0.13 and 4.2.4, a cold search in the benchmark sent about **90% fewer requests** to the object store (44 ranged reads instead of 428) and a nearby follow-up search about 96% fewer, which also means less data downloaded; the offset reuse is also in 4.0.14 and 4.2.5. The latency gain depends on your object store. New OpenTelemetry [message position search metrics](/docs/5.0.x/reference-metrics-opentelemetry#message-position-search-metrics) let you observe these searches on a running broker.

### More reliable delivery and recovery

Pulsar 5.0 includes many fixes for stalls and recovery problems in features that applications use every day: geo-replication, Key_Shared, Failover, and Shared subscriptions, delayed delivery, acknowledgment and transaction recovery, dead-letter handling, and the extensible load manager. Most of them are also in the 4.0.14 and 4.2.5 maintenance releases.

### Easier operation at scale

- **Better load distribution.** The default modular load manager now uses **AvgShedder** for load shedding and placement, replacing ThresholdShedder and LeastLongTermMessageRate. It pairs heavily and lightly loaded brokers, plans where shed bundles go, ignores short spikes, and acts sooner on large imbalances, so clusters settle faster and with less unnecessary bundle movement after adding brokers or a rolling upgrade. See [load balancing](/docs/5.0.x/administration-load-balance).
- **Rolling upgrades and restarts with less disruption.** A new [rolling broker upgrade and restart guide](/docs/5.0.x/administration-rolling-upgrade) describes how to minimize client disruption, including graceful shutdown, replacement capacity, and controlled rebalancing on [Kubernetes](/docs/5.0.x/administration-rolling-upgrade#kubernetes-deployments).
- **Close idle topics without deleting their data.** Large topic fleets can opt in to [closing, instead of deleting, inactive topics](/docs/5.0.x/admin-api-topics#close-inactive-topics-without-deleting-data) that have no subscriptions or producers ([PIP-470](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-470.md)), releasing broker memory and per-topic metric series while keeping their data. The next producer or consumer reloads the topic.
- **Logs with the context you need.** Structured log events ([PIP-467](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-467.md)) carry topic, subscription, and storage context across broker and BookKeeper operations. [Choose text or JSON output](/docs/5.0.x/administration-logging); text remains the default.

## More new capabilities

### Oxia for new clusters, continuity for ZooKeeper deployments

[Oxia](https://oxia-db.github.io/) is a scalable metadata store and coordination system, fully open source under the Apache-2.0 license and a [CNCF Sandbox project](https://www.cncf.io/projects/oxia/). It is the recommended metadata store for new Pulsar clusters and for Scalable Topics.

Existing ZooKeeper deployments can keep running unchanged. When you choose to move to Oxia, the [metadata store migration framework](/docs/5.0.x/administration-metadata-store-migration) ([PIP-454](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-454.md)) copies metadata while existing producers and consumers keep running; metadata changes such as topic creation and ledger rollovers pause during the copy. A planned cutover and validation procedure completes the move, which you can schedule separately from the software upgrade.

### Security, TLS, and networking

- **TLS integration for security and compliance.** A new TLS factory API and configurable JSSE and JCA providers ([PIP-478](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-478.md)) give organizations a common integration point for custom certificate handling, validated cryptographic providers, and hardware security module (HSM)-backed keys, including for FIPS 140-3 requirements. Pulsar itself is not FIPS 140-3 certified; compliance depends on the provider and the deployment configuration. See [TLS providers and custom factories](/docs/5.0.x/security-tls-transport#tls-providers-and-custom-factories).
- **Asynchronous authentication in the 5.0 Java client** ([PIP-478](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-478.md)) keeps blocking credential work off network event-loop threads, including for existing authentication plugins, reducing latency spikes caused by slow credential retrieval or refresh.
- **Multiple advertised listeners** now extend to HTTP/HTTPS admin access through listener-specific endpoints, which makes it easier to connect private networks and Kubernetes applications while keeping broker-to-broker traffic internal. See [multiple advertised listeners](/docs/5.0.x/concepts-multiple-advertised-listeners).

## Before you upgrade {#before-you-upgrade}

The [Pulsar 5.0.x upgrade guide](/docs/5.0.x/administration-upgrade-to-5.0.x) brings together the release-specific steps. The main areas to prepare are:

- **Java:** servers require Java 21 or later, and Java 25, which the Docker images use, is recommended. Java client libraries require Java 17 or later, while 4.0.x clients also supported Java 8 and 11. Remove `PULSAR_GC` and other garbage collector overrides so the launcher's default ZGC settings take effect.
- **TLS and authentication:** hostname verification is now enabled by default in Java clients and outbound server connections, and brokers authenticate the original credentials that proxies forward (`authenticateOriginalAuthData=true`); deployments using mTLS or SASL through a proxy must set it to `false`. Check certificate names and custom TLS factories.
- **Bookies:** in `statsProviderClass`, replace `org.apache.pulsar.metrics.prometheus.bookkeeper.PrometheusMetricsProvider`, which has been removed, with `org.apache.bookkeeper.stats.prometheus.PrometheusMetricsProvider`. A `bookkeeper.conf` carried over from 4.x still sets the old class, and bookies don't start with it.
- **Docker images and connectors:** replace `apachepulsar/pulsar-all` with `apachepulsar/pulsar`, and supply the IO connector NARs you need separately. Pulsar 4.2.x connectors remain compatible with regular topics; a separate connectors release from the [Pulsar connectors project](https://github.com/apache/pulsar-connectors) is pending. The standard image includes the tiered-storage offloaders, except the filesystem offloader.
- **Changed defaults:** review your overrides against the [configuration comparison](/docs/5.0.x/administration-upgrade-to-5.0.x-configuration), including the new load-balancing strategy (a `broker.conf` carried over from 4.x sets the previous strategies explicitly), larger dispatch read batches, BookKeeper batch reads, the adaptive allocator, and the new `internal` default for `internalListenerName`. Clusters using shadow topics must set `enableShadowTopics=true`.
- **Applications, Functions, and plugins:** the [application and plugin guide](/docs/5.0.x/administration-upgrade-to-5.0.x-applications) covers Java dependencies, plugin builds for JDK 21 or later, and the move from `javax.*` to `jakarta.*` APIs.
- **Logging:** update log parsers that depend on older message wording.
- **Metadata stores:** the etcd backend has been removed, and the migration framework does not support etcd as a source. Move etcd-based clusters to ZooKeeper or Oxia before upgrading.
- **Administration UI:** Pulsar Manager is no longer maintained. Choose an [alternative](/docs/5.0.x/administration-ui) and remove existing deployments.

As always, rehearse both the upgrade and the rollback in a test environment with representative workloads before upgrading production clusters.

## Get started with Pulsar 5.0

Pulsar 5.0.0 is available on the [download page](/download/), which also lists the Docker images. To try it out, run Pulsar [on your local machine, with Docker, or on Kubernetes](/docs/5.0.x/getting-started-home). The [Docker Compose setup](/docs/5.0.x/getting-started-docker-compose) runs Pulsar on Oxia out of the box.

For the complete list of changes, see the [5.0.0 release notes](/release-notes/versioned/pulsar-5.0.0/), which also link to the M1 and M2 milestone release notes.

## Thank you

Pulsar 5.0 is the result of work by contributors across the Apache Pulsar community: those who wrote code and documentation, reviewed changes, designed and voted on PIPs, and tested the milestone releases and release candidates. Feedback on the M1 and M2 milestones directly shaped this release, and we thank everyone who took the time to try them.

Share your experience on [GitHub](https://github.com/apache/pulsar/issues), the [dev@pulsar.apache.org mailing list](/contact/#mailing-lists), or the [Pulsar Slack community](/community/#section-discussions).
