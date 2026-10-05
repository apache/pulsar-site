---
title: "Apache Pulsar 5.0 LTS: Scalable Topics and Faster Existing Workloads"
author: Matteo Merli, Lari Hotari
date: 2026-10-05
---

The Apache Pulsar community is pleased to announce **Apache Pulsar 5.0.0**, the new long-term support (LTS) release. It follows the 5.0.0-M1 and 5.0.0-M2 milestones and is ready for production use.

Pulsar 5.0 has two headline items. **Scalable Topics** are a new kind of topic that grows and shrinks with demand while preserving per-key ordering, delivered together with a new Java client API and Oxia as the recommended metadata store for new clusters. Alongside them come **major performance and reliability improvements for the topics and applications you already run**, which you get by upgrading your cluster, with no application changes.

These are separate decisions. You can upgrade an existing 4.x cluster to 5.0, keep your current topics, clients, and ZooKeeper metadata store, and adopt the new capabilities later, on your own schedule.

<!--truncate-->

## Upgrade first, adopt new capabilities when you're ready

Pulsar 5.0 is designed so that the upgrade itself is not a migration project:

- **Your applications and topics keep working.** Existing partitioned and non-partitioned topics, all subscription types, and the existing Java client, now called the **v4 client**, remain supported. v4 applications can keep their client dependency and API when you upgrade the brokers.
- **ZooKeeper remains supported.** With Scalable Topics disabled, all previously available features remain fully supported in production on ZooKeeper.
- **New capabilities are opt-in.** You can upgrade without adopting the v5 client API, Scalable Topics, or Oxia, and none of them is required to benefit from the improvements in 5.0. When you do adopt them, plan for their dependencies: the v5 API requires scalable-topic services on the brokers, and Scalable Topics use Oxia in production.
- **You keep a planned path back to 4.x.** Set `scalableTopicsEnabled=false` on every target broker before the first 5.0 broker starts. If you have enabled package management for Functions or IO connectors, additional settings apply; check the [rollback prerequisites](/docs/5.0.x/administration-upgrade-to-5.0.x#preserve-and-rehearse-rollback) in the upgrade guide for the specifics. Together, these preserve a rollback path to your tested 4.x release while you validate the upgraded cluster.

A typical path looks like this:

1. **Establish your starting point.** Run the latest maintenance release of your 4.0.x or 4.2.x line with your own workloads, and keep that release and its configuration available for rollback.
2. **Upgrade the cluster.** Prepare for the changes listed in [Before you upgrade](#before-you-upgrade), apply the rollback settings, and roll out 5.0 while applications continue to use the v4 client and existing topics.
3. **Adopt new capabilities when ready.** After validating the cluster and closing the rollback window, plan adoption of the v5 API, Scalable Topics, or Oxia where they help your applications.

The [Pulsar 5.0 release highlights](/docs/5.0.x/release-highlights) and the [Pulsar 5.0.x upgrade guide](/docs/5.0.x/administration-upgrade-to-5.0.x) cover each step in detail.

## Scalable Topics: topics that size themselves

A topic should be a **logical concept**: a named stream that applications publish to and consume from. Application developers shouldn't have to think about the infrastructure that makes that stream fast. Yet for its whole history, Pulsar has asked them to answer an infrastructure question up front that has nothing to do with their application: **how many partitions?**

That number is a guess that is easy to get wrong and hard to undo:

- **You must size capacity in advance.** The partition count is chosen before you know the real traffic, and increasing it is an administrative operation.
- **You cannot scale down.** A partition count can be increased but never decreased, so a topic sized for a traffic peak stays oversized.
- **Resizing can break key ordering.** Keys are routed with `hash(key) % partitionCount`, so adding partitions can move keys to different partitions, and consumers may read a key's newer messages before its older ones.

Choose too few partitions and you create hot partitions and costly migrations; choose too many and you pay for resources a quiet topic never needed.

**[Scalable Topics](/docs/5.0.x/concepts-scalable-topics) take that decision away.** A scalable topic, addressed with the new `topic://` scheme, is a single logical stream whose capacity follows its actual load, in both directions:

- **Key-range segments.** Internally, a scalable topic divides the key hash space into segments, each owning a contiguous range and backed by its own internal topic.
- **Split and merge at runtime.** When part of the key space gets hot, the broker splits that segment's range in two; when adjacent segments go cold, it merges them back. This happens with no downtime and is automatic by default, with thresholds you can tune per broker, namespace, and topic. You can also split and merge manually.
- **Per-key ordering is preserved.** Keys are routed by range, so a split or merge moves a key to a successor range that still contains it. Ordered consumers drain the predecessor segment before reading its successor, so each key's messages stay in order across every change.
- **Applications see one stream.** A per-topic controller in the broker manages the segment layout and pushes changes to clients. Applications never handle segments or react to resizing.

Consumer parallelism can grow within a segment, too. Messages in a segment are grouped into **entry buckets** by key hash, and multiple consumers share a segment's buckets while preserving per-key ordering, including when consumers join or leave. When more consumers join, Pulsar can either split a busy segment or give it more buckets. This helps drain backlogs after splits and merges, and lets producers keep batching enabled without choosing a key-based batcher.

**If you have struggled to combine Key_Shared subscriptions with producer batching, this feature addresses it.** With Scalable Topics and v5 stream consumers, you no longer have to choose between per-key ordering across many consumers and the efficiency of batching: producers can keep batching enabled while consumers share the work in key order.

| | Partitioned topic (v4) | Scalable topic |
| --- | --- | --- |
| Capacity | Fixed partition count, set at creation | Segments and entry buckets that change at runtime |
| Scale up | Increase the partition count manually | Hot segments split automatically |
| Scale down | Not possible | Cold segments merge automatically |
| Key ordering when resized | Keys can move between partitions | Preserved across splits and merges for ordered consumers |
| Layout visible to applications | Partition count and indexes | None; managed by the broker |

The goal is for one topic type to be the right choice across use cases, out of the box: you model your application around the topics that fit your domain, and Pulsar adapts them to how they are actually used, without capacity planning or re-sharding.

### Built from a family of proposals

Scalable Topics are delivered in 5.0 by a set of Pulsar Improvement Proposals:

- **[PIP-460](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-460.md): Scalable Topics**: the overall model, with the segment graph, range-based key routing, and design principles.
- **[PIP-468](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-468.md): Scalable Topic Controller**: the broker-side controller that runs splits and merges, coordinates consumers, and pushes the live layout to clients.
- **[PIP-483](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-483.md): Auto Split/Merge**: automatic splitting of hot segments and merging of cold ones, tunable per broker, namespace, and topic.
- **[PIP-486](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-486.md): Key-shared consumption**: multiple consumers per segment through entry buckets, preserving per-key ordering.
- **[PIP-466](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-466.md): New Java client API (v5)**: the client API built for Scalable Topics, described below.
- **[PIP-473](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-473.md): Metadata-driven transactions**: transactions that work across segment splits and merges.
- **[PIP-475](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-475.md): Regular-to-scalable migration**: in-place conversion of an existing topic, with no data copy.
- **[PIP-494](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-494.md): Scalable Topics Client Specification**: the language-neutral client contract and its change process, described below.

### A Java client API built around how you consume

Scalable Topics are used through the new [v5 Java client API](/docs/client-libraries/java-v5). Over more than a decade, Pulsar's client API grew one feature at a time, accumulating options, overloads, and subtle inconsistencies. The v5 API is a clean-slate redesign that distills the lessons learned from users running Pulsar in production into a focused API.

Consumption is the clearest example. The v4 client offers a single `Consumer` shaped by one of four subscription types (Exclusive, Failover, Shared, and Key_Shared), plus a separate `Reader`, with behavior that shifts as options are combined. The v5 API replaces them with three purpose-built consumers, each exposing only the operations that make sense for it:

- **Stream consumers** for ordered consumption with cumulative acknowledgment, including key-shared processing across consumers.
- **Queue consumers** for parallel work-queue processing with individual and negative acknowledgments and dead-letter handling.
- **Checkpoint consumers** for stream-processing engines such as Flink and Spark that track their own position, with no subscription or acknowledgment.

The v5 API also works with existing partitioned and non-partitioned topics, so you can adopt it before converting any topic, and a consumer can [subscribe across a namespace](/docs/client-libraries/java-v5#consume-a-namespace), selecting topics by their properties. Producer and receive-buffer backpressure, non-blocking asynchronous receives, and reduced acknowledgment overhead help applications handle bursts.

**One dependency for the v4, v5, and admin clients.** `org.apache.pulsar:pulsar-client-v5-all` contains everything needed to use Pulsar from Java: the Pulsar Java client, with both the v4 and v5 APIs, and the Pulsar Java admin client. It is unshaded, so you can upgrade third-party transitive dependencies yourself, for example to address CVEs, without waiting for a Pulsar release. Because the dependencies are not shaded, your build needs to align them: import both the Pulsar BOM and the Netty BOM so that Pulsar artifacts and Netty modules each resolve to one consistent version. [Java client dependency configuration](/docs/client-libraries/java-dependency-configuration) has complete Maven and Gradle examples, explains the [Pulsar and Netty BOM alignment](/docs/client-libraries/java-dependency-configuration#pulsar-bom), and shows how to exclude conflicting client artifacts.

Changing the dependency doesn't require changing your code. Moving application code from the v4 API to the v5 API is a separate step, covered by the [v4-to-v5 API migration guide](/docs/client-libraries/java-migrate-to-v5), which you can follow when you're ready to use the new consumer models.

### A client specification for every SDK

With Scalable Topics, clients do more than connect to a topic: they track the segment layout as it changes, route each key to the segment that owns it, and follow the controller's consumer assignments. To make every client do this the same way, Pulsar 5.0 ships the **[Scalable Topics Client Specification](https://github.com/apache/pulsar/tree/v5.0.0/spec/scalable-topics) 1.0**, governed by [PIP-494](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-494.md). It is the authoritative, language-neutral description of how a Scalable Topics client behaves:

- **One contract for all languages.** The specification separates the API contract that applications observe from the mechanisms a client implements internally and the exact wire-protocol interactions, documented with sequence diagrams. SDK authors build against the specification rather than reverse-engineering the Java client.
- **Interoperability by design.** Every conformant client routes keys identically and honors the same ordering and acknowledgment semantics, so producers and consumers written in different languages can work on the same scalable topic.
- **Stability you can rely on.** The specification is versioned and gives each feature a stability tier. Incompatible changes land only at an LTS boundary, and deprecated features remain available at least until the next LTS release.
- **A clear definition of support.** A conformance checklist defines what an SDK must implement to claim Scalable Topics support. The Java v5 client is the reference implementation, while the specification is the source of truth.
- **A controlled change process.** Every normative change goes through a PIP, and the specification edits land together with it, so the contract and its design rationale never drift apart.

**Work is ongoing to bring the client specification, and with it Scalable Topics support, to all Pulsar client SDKs shortly.** Today, the Java v5 client supports Scalable Topics; check each SDK's documentation for its v5 API support.

### Adopting Scalable Topics

- **New applications** are encouraged to build on Scalable Topics and the v5 API when the [requirements and limitations](/docs/5.0.x/concepts-scalable-topics#requirements) fit.
- **Existing applications** can keep using partitioned and non-partitioned topics, which remain fully supported, with no requirement to migrate. When you're ready, existing persistent topics can be [migrated in place](/docs/5.0.x/admin-api-scalable-topics#migrate-a-regular-topic) without copying their data, once their producers and consumers use the v5 client. The conversion is one-way.
- **Requirements:** Scalable Topics require a client with v5 API support; v4 clients cannot use `topic://` topics. In production, Scalable Topics use [Oxia](#oxia-for-new-clusters-continuity-for-zookeeper-deployments); ZooKeeper deployments can try them in test environments. [Transactions](/docs/5.0.x/txn-use#transactions-on-scalable-topics) work across segment splits and merges on brokers using Oxia.
- **Limitations:** geo-replication and replicated subscriptions are not supported for Scalable Topics in 5.0. Use partitioned or non-partitioned topics for applications that need them.
- **Rollback to 4.x:** Scalable Topics and the v5 API stay behind the `scalableTopicsEnabled` feature gate for as long as you need to retain the rollback path. The v5 API needs scalable-topic services enabled on the brokers, even for regular topics.

The existing client API and topic types remain fully supported throughout the 5.0 LTS line. Longer term, Scalable Topics are designed to cover all of Pulsar's use cases, and the v5 API is the direction Pulsar is heading; according to [PIP-460](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-460.md), any deprecation of the existing API would be planned for a later LTS release.

To get started, read the [Scalable Topics concepts](/docs/5.0.x/concepts-scalable-topics), the [v5 Java client guide](/docs/client-libraries/java-v5), and [Manage scalable topics](/docs/5.0.x/admin-api-scalable-topics).

## Performance and reliability for existing workloads

The improvements in this section apply to regular topics and v4 applications. They don't require Scalable Topics or the v5 client API.

### Consumers keep up with hundreds of publishers

Consider a typical IoT deployment: many devices connect to hundreds of gateways, and each gateway publishes the devices' telemetry to Pulsar. Messages are keyed by device ID so that each device's messages are processed in order, and for that reason they are often not batched. In Pulsar 4.x, broker queueing and contention in this kind of workload could make consumers fall behind, even when they were fast enough to keep up.

A benchmark compared Pulsar 4.0.13 and 5.0.0 on a simplified version of this use case: **500 publishers** sending keyed, unbatched 128-byte messages to one regular persistent topic, consumed by **20 consumers** on one Key_Shared subscription. Each publisher and consumer had its own client and connection, and both versions used the same client. The table shows the means of three runs.

| | 4.0.13 | 5.0.0 |
| --- | ---: | ---: |
| Consuming rate during publishing, messages/s | 131 | 106,875 |
| Publishing rate, messages/s | 128,716 | 107,048 |
| Consume + Publish rate, messages/s | 128,847 | 213,923 |
| **Pulsar 5.0.0 is about 1.7× faster when comparing the total consume+publish work performed by the broker.** | | |

![Throughput of Pulsar 4.0.13 and 5.0.0: published and consumed messages per second, in separate panels with the same axes](/assets/release-highlights-5.0/throughput-4.0.13-vs-5.0.0-separate.svg)

The gain comes from fewer thread handoffs and batched publish submission, which let dispatch keep moving instead of waiting behind one executor task per entry. These results describe this workload, not general broker capacity. The scenario is part of Pulsar's [performance testing framework](https://github.com/apache/pulsar/tree/master/tests/performance), so you can run it on your own hardware. The [release highlights](/docs/5.0.x/release-highlights#keep-consumers-at-the-tail-with-many-publishers) describe the setup, the metric definitions, and the latency results.

### Less work per message

Efficiency improvements reach across the messaging path:

- **Publishing and dispatch:** batched handovers reduce executor contention, independent producers no longer contend on a topic-wide deduplication lock, and Shared and Key_Shared dispatch use fewer synchronization and lookup operations.
- **Storage and memory:** [BookKeeper batch reads](https://bookkeeper.apache.org/bps/BP-62-new-API-for-batched-reads/) fetch multiple entries per request, which helps when draining backlogs of small entries. Cache-owned copies and Netty's adaptive allocator improve buffer use for small entries, and deferred metadata parsing reduces work on the publishing path.
- **Acknowledgments and client scheduling:** compact bitmaps, reused acknowledgment data, fewer temporary objects, and coalesced listener notifications reduce allocation and scheduling overhead.

The [broker performance guide](/docs/5.0.x/performance-broker) explains these changes and their tuning options.

### Seek by timestamp on offloaded topics with fewer object-store requests

Topics with long retention keep most of their history in [tiered storage](/docs/5.0.x/tiered-storage-overview). Seeking such a topic to a timestamp previously meant scanning offloaded data blocks from their start, one ranged read at a time. Pulsar 5.0 remembers the entry offsets it discovers and uses the indexed block starts, so a cold search sends about **90% fewer requests** to the object store (from 428 to 44 ranged reads in the benchmark), and a nearby follow-up search about 96% fewer. Fewer requests also means less data downloaded. These measurements count requests and bytes, not latency, which depends on your object store. New [message position search metrics](/docs/5.0.x/reference-metrics-opentelemetry#message-position-search-metrics) let you observe these searches on a running broker.

### More reliable delivery and recovery

Many fixes in 5.0 address stalls and recovery problems in features that applications use every day:

- **Geo-replication** recovers more reliably from remote publish failures, rate-limit throttling, and cursor rewinds.
- **Subscriptions** handle Key_Shared replay and slow consumers, Failover read completions, and Shared reconnects and backpressure more reliably.
- **Delayed delivery** preserves message indexes through snapshot trimming and tracker recovery, and no longer replays messages prematurely.
- **Acknowledgments and transactions** retain batch acknowledgment state and cursor properties during recovery, prevent already acknowledged messages from reaching dead-letter topics, and keep transactional and non-transactional messages in separate batches.
- **The extensible load manager** cleans up assignments and ownership more reliably during recovery.

### Easier operation at scale

- **Better load distribution.** The default modular load manager now uses **AvgShedder** for load shedding and placement, replacing ThresholdShedder and LeastLongTermMessageRate. It pairs heavily and lightly loaded brokers, filters out short spikes, and acts faster on sustained imbalances, which means less unnecessary bundle movement after adding brokers or completing a rolling upgrade. See [load balancing](/docs/5.0.x/administration-load-balance).
- **Rolling upgrades and restarts with less disruption.** A new [rolling broker upgrade and restart guide](/docs/5.0.x/administration-rolling-upgrade) describes how to minimize client disruption, including graceful shutdown, replacement capacity, and controlled rebalancing on [Kubernetes](/docs/5.0.x/administration-rolling-upgrade#kubernetes-deployments).
- **Close idle topics without deleting their data.** Large topic fleets can [close inactive topics](/docs/5.0.x/admin-api-topics#close-inactive-topics-without-deleting-data) ([PIP-470](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-470.md)) to release broker memory and remove idle metric series. The next producer or consumer reloads the topic. This is opt-in.
- **See how old a backlog is.** The new `pulsar_subscription_storage_backlog_age_seconds` metric shows the age of stored subscription backlog alongside its size. Enable it with `exposeSubscriptionBacklogAgeInPrometheus=true`.
- **Logs with the context you need.** Structured log events ([PIP-467](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-467.md)) carry topic, subscription, and storage context across broker and BookKeeper operations. [Choose text or JSON output](/docs/5.0.x/administration-logging); text remains the default.

## More new capabilities

These capabilities are also available once your cluster runs 5.0. Like Scalable Topics, most of them are opt-in, so you can adopt them when they suit your applications.

### Oxia for new clusters, continuity for ZooKeeper deployments

[Oxia](https://oxia-db.github.io/) is a scalable metadata store and coordination system, fully open source under the Apache-2.0 license and a [CNCF Sandbox project](https://www.cncf.io/projects/oxia/). It is the recommended metadata store for new Pulsar clusters and the supported choice for Scalable Topics in production.

Existing ZooKeeper deployments can keep running their workloads unchanged. When you choose to move to Oxia, the [metadata store migration framework](/docs/5.0.x/administration-metadata-store-migration) ([PIP-454](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-454.md)) copies metadata while publishing and consuming continue, with a planned cutover and validation procedure. You can schedule it separately from the software upgrade.

[Topic policies can also be stored directly in the metadata store](/docs/5.0.x/administration-metadata-store#store-topic-policies-in-the-metadata-store) ([PIP-469](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-469.md)). Namespaces whose policies are stored in system topics keep using them, so this transition can also be planned on its own.

### Security, TLS, and networking

- **TLS integration for security and compliance.** A new TLS factory API and configurable JSSE and JCA providers give organizations a common integration point for custom certificate handling, validated cryptographic providers, and hardware security module (HSM)-backed keys, including for FIPS 140-3 requirements. These capabilities do not make Pulsar FIPS 140-3 certified; compliance depends on the provider and the deployment configuration. See [TLS providers and custom factories](/docs/5.0.x/security-tls-transport#tls-providers-and-custom-factories).
- **Asynchronous authentication in the Java client** ([PIP-478](https://github.com/apache/pulsar/blob/v5.0.0/pip/pip-478.md)) keeps blocking credential work off network event-loop threads, reducing latency spikes caused by slow credential retrieval or refresh.
- **Multiple advertised listeners** now extend to HTTP/HTTPS admin access through listener-specific endpoints, which makes it easier to connect private networks and Kubernetes applications while keeping broker-to-broker traffic internal. See [multiple advertised listeners](/docs/5.0.x/concepts-multiple-advertised-listeners).

### More control over Python and Go Functions

Python and Go Functions now honor producer batching and negative-acknowledgment delay settings. Go Functions also honor ordering settings and continue processing after user-function errors, with retries governed by the processing guarantee. See [runtime settings](/docs/5.0.x/functions-concepts#python-and-go-runtime-settings).

## Before you upgrade {#before-you-upgrade}

The [Pulsar 5.0.x upgrade guide](/docs/5.0.x/administration-upgrade-to-5.0.x) brings together the release-specific steps. The main areas to prepare are:

- **Java:** servers require Java 21 or later; Java clients continue to require Java 17 or later. The Docker images use Java 25. Remove old garbage collector overrides such as `PULSAR_GC` so the new ZGC defaults take effect.
- **TLS and authentication:** hostname verification is now enabled by default in Java clients and outbound server connections. Check certificate names, custom TLS factories, and proxy authentication settings.
- **Docker images and connectors:** replace `apachepulsar/pulsar-all` with `apachepulsar/pulsar`, and supply the IO connector NARs you need separately. Pulsar 4.2.x connectors remain compatible with regular topics; a separate connectors release from the [Pulsar connectors project](https://github.com/apache/pulsar-connectors) is pending. The standard image includes the tiered-storage offloaders, except the filesystem offloader.
- **Changed defaults:** review your overrides against the [configuration comparison](/docs/5.0.x/administration-upgrade-to-5.0.x-configuration), including the new load-balancing strategy, larger dispatch read batches, BookKeeper batch reads, and the adaptive allocator. Clusters using shadow topics must set `enableShadowTopics=true`.
- **Applications, Functions, and plugins:** the [application and plugin guide](/docs/5.0.x/administration-upgrade-to-5.0.x-applications) covers Java dependencies, plugin builds for JDK 21 or later, the move from `javax.*` to `jakarta.*` APIs, and the default forwarding of message properties in Python Functions.
- **Logging:** update log parsers that depend on older message wording.
- **Metadata stores:** the etcd backend has been removed. Migrate to ZooKeeper or Oxia before upgrading.
- **Administration UI:** Pulsar Manager is no longer maintained. Choose an [alternative](/docs/5.0.x/administration-ui) and remove existing deployments.

As always, rehearse both the upgrade and the rollback in a test environment with representative workloads before upgrading production clusters.

## Get started with Pulsar 5.0

Pulsar 5.0.0 is available on the [download page](/download/), which also lists the Docker images. To try it out, run Pulsar [on your local machine, with Docker, or on Kubernetes](/docs/5.0.x/getting-started-home). The [Docker Compose setup](/docs/5.0.x/getting-started-docker-compose) runs Pulsar on Oxia out of the box.

For the complete list of changes, see the [5.0.0 release notes](/release-notes/versioned/pulsar-5.0.0/), which also link to the M1 and M2 milestone release notes.

## Thank you

Pulsar 5.0 is the result of work by contributors across the Apache Pulsar community: those who wrote code and documentation, reviewed changes, designed and voted on PIPs, and tested the milestone releases and release candidates. Feedback on the M1 and M2 milestones directly shaped this release, and we thank everyone who took the time to try them.

Share your experience on [GitHub](https://github.com/apache/pulsar/issues), the [dev@pulsar.apache.org mailing list](/contact/#mailing-lists), or the [Pulsar Slack community](/community/#section-discussions).
