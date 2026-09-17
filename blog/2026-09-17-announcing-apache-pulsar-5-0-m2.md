---
title: "Apache Pulsar 5.0.0-M2: The Final Milestone Before Pulsar 5.0"
author: Matteo Merli, Lari Hotari
date: 2026-09-17
---

The Apache Pulsar community is pleased to announce **Apache Pulsar 5.0.0-M2**, the second and final milestone before Pulsar 5.0.0. M2 builds on [5.0.0-M1](/blog/2026/06/23/announcing-apache-pulsar-5-0-m1) with improvements to broker efficiency, message-delivery reliability, and Scalable Topics. It is a **preview for evaluation and feedback, not for production use**.

For existing Pulsar users, the main reason to evaluate M2 is the work on features you already use: subscriptions, geo-replication, delayed delivery, and the Java client. Adopting Scalable Topics, the V5 client API, or Oxia is optional. You can continue running your existing workloads while benefiting from the performance and reliability improvements in Pulsar 5.0. The upgrade is a two-way door: downgrading clusters from 5.0.x to 4.0.x will remain supported for workloads using the existing 4.0.x feature set, giving you a path back if needed.

<!--truncate-->

## Highlights since 5.0.0-M1

- **Lower message-processing overhead** in broker dispatch, acknowledgment tracking, entry-cache reads, and Java client send paths.
- **More reliable message delivery**, with fixes for stalled replication and subscriptions, delayed-delivery snapshot data loss, and lost acknowledgment state during cursor recovery.
- **More consumer parallelism for Scalable Topics**, preserving per-key order while sharing a segment across consumers without requiring applications to disable producer batching.
- **Asynchronous authentication and a new TLS factory SPI**, with TLS hostname verification enabled by default.
- **Simpler Java client packaging**: one dependency can provide the existing client API, the V5 client, and the admin client.
- **Java 25 in the Docker images**, while the minimum supported Java version remains 17.

## Improvements to the workloads you already run

### Less allocation and contention

M2 reduces the work the broker and client do for each message. Acknowledgment tracking uses compact bitmaps and packed values, and fixes an allocation hotspot in individual acknowledgment processing ([#26500](https://github.com/apache/pulsar/pull/26500)). The broker and Java client also reuse acknowledgment data and avoid temporary objects in dispatch, send, and cached-read paths. These changes target CPU and garbage-collection overhead in everyday messaging workloads.

For topics with several subscriptions reading newly published messages, the entry cache now parses message metadata at insertion rather than under a write lock on the first read. This removes a source of contention between subscriptions tailing the same topic ([#26463](https://github.com/apache/pulsar/pull/26463)). Tiered-storage reads also reuse discovered entry offsets to avoid repeated scanning ([#26424](https://github.com/apache/pulsar/pull/26424)).

### Delivery and recovery fixes

The most consequential reliability changes include:

- **Geo-replication**: fixes for replication getting stuck after a remote publish failure, under rate-limit throttling, or after a cursor rewind ([#26002](https://github.com/apache/pulsar/pull/26002), [#26005](https://github.com/apache/pulsar/pull/26005), [#26106](https://github.com/apache/pulsar/pull/26106)).
- **Subscriptions**: fixes for Key_Shared stalls and replay starvation at the end of a topic, Failover subscriptions stranded by stale read completions, and Shared subscriptions losing throughput after frequent reconnects ([#26236](https://github.com/apache/pulsar/pull/26236), [#26268](https://github.com/apache/pulsar/pull/26268), [#26174](https://github.com/apache/pulsar/pull/26174), [#26289](https://github.com/apache/pulsar/pull/26289)).
- **Delayed delivery**: fixes for lost message indexes when trimming overlapping bucket snapshots, tracker recovery failures, and premature replay ([#26240](https://github.com/apache/pulsar/pull/26240), [#26160](https://github.com/apache/pulsar/pull/26160), [#26188](https://github.com/apache/pulsar/pull/26188)).
- **Acknowledgments and transactions**: cursor recovery preserves batch-acknowledgment state and cursor properties; client/broker acknowledgment synchronization prevents already acknowledged messages from reaching the dead-letter topic; transactional and non-transactional messages stay in separate batches ([#26474](https://github.com/apache/pulsar/pull/26474), [#26512](https://github.com/apache/pulsar/pull/26512), [#26135](https://github.com/apache/pulsar/pull/26135), [#26547](https://github.com/apache/pulsar/pull/26547)).

M2 also fixes assignment and ownership cleanup races in the extensible load manager and removes blocking operations from broker and proxy I/O and callback threads. Together, these changes address recovery, reconnect, and load-management conditions that can disrupt otherwise healthy workloads.

### Operating large topic fleets

Operators can now **close inactive topics without deleting their persistent data** ([PIP-470](https://github.com/apache/pulsar/blob/v5.0.0-M2/pip/pip-470.md)). This releases broker resources and removes the loaded topic's metric series; the next producer or consumer reloads the topic. The feature is opt-in through `brokerCloseInactiveTopicsEnabled`, requires the `delete_when_no_subscriptions` inactivity mode, and cannot be enabled alongside inactive-topic deletion.

The new **subscription storage backlog age** metric, `pulsar_subscription_storage_backlog_age_seconds`, helps operators track how old the storage backlog is alongside its size ([#26313](https://github.com/apache/pulsar/pull/26313)). Topic-level metric exposure can also be changed dynamically. Go and Python Functions now honor producer batching and negative-acknowledgment delay settings, and Go Functions honor ordering settings that were previously ignored.

## Scalable Topics: consumer scale-up without sacrificing batching

M1 introduced Scalable Topics, the V5 Java client, and Oxia as the recommended metadata store for new clusters. M2 adds **key-shared consumption within scalable-topic segments** ([PIP-486](https://github.com/apache/pulsar/blob/v5.0.0-M2/pip/pip-486.md)).

Previously, ordered consumption was limited to one consumer per segment. M2 groups entries into buckets so multiple consumers can share a segment while preserving per-key order, including during consumer joins and departures. This helps drain an old, sealed segment's backlog after a scale-up and allows consumer parallelism beyond the topic's segment limit. Producer batching remains enabled, without requiring applications to select a key-based batcher for this consumption mode.

The V5 client also gains producer and receiver-queue backpressure, fully non-blocking scalable-consumer `receiveAsync`, and fixes to flush and shutdown behavior. See [Scalable Topics concepts](/docs/5.0.x/concepts-scalable-topics), the [V5 Java client](/docs/client-libraries/java-v5), and the [migration guide](/docs/client-libraries/java-migrate-to-v5) for evaluation guidance.

## Authentication, TLS, and Java client dependencies

[PIP-478](https://github.com/apache/pulsar/blob/v5.0.0-M2/pip/pip-478.md) makes client authentication asynchronous and moves blocking credential work off Netty event-loop threads. The new `PulsarTlsFactory` SPI provides a common way to supply TLS material, replacing the PIP-337 `PulsarSslFactory`. **TLS hostname verification is now enabled by default**, so certificates must match the hostname used to connect.

Configurable JSSE and JCA providers and custom TLS factories also provide a foundation for deployments using validated cryptographic providers or HSM-backed keys. These capabilities do not make Pulsar FIPS 140-3 certified; compliance depends on the provider, its validated version, and the deployment configuration.

For Java applications, **`org.apache.pulsar:pulsar-client-v5-all`** combines the existing Java client, the V5 client, and the admin client ([#26545](https://github.com/apache/pulsar/pull/26545)). Despite its name, it can be used by applications that only use the existing API:

```xml
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-client-v5-all</artifactId>
  <version>5.0.0-M2</version>
</dependency>
```

This unshaded dependency lets applications manage third-party dependency versions directly, including compatible security updates. **`pulsar-client-v5-shaded`** provides the same three clients with relocated dependencies for applications that need classpath isolation. When adopting either combined artifact, remove or exclude the older client and admin implementation artifacts, including transitive copies, to avoid duplicate implementations. The [client packaging guide](https://github.com/apache/pulsar/blob/v5.0.0-M2/pulsar-client-v5-all/README.md) includes Maven and Gradle examples.

## Before evaluating an upgrade from 4.x

Existing partitioned and non-partitioned topics, subscription types, and the Java client API remain available. ZooKeeper remains supported, and adopting Oxia or the V5 API is a separate decision. Review these changes across the 5.0 line before evaluating an upgrade:

- **TLS and authentication**: check certificate hostname matching and migrate custom `PulsarSslFactory` plugins to `PulsarTlsFactory`. The old SSL-factory configuration keys and builder methods are removed. Proxy deployments using TLS client-certificate or SASL authentication need an explicit `authenticateOriginalAuthData=false` setting because original-client authentication now defaults to enabled ([#26549](https://github.com/apache/pulsar/pull/26549)).
- **Docker images**: replace `apachepulsar/pulsar-all` with `apachepulsar/pulsar`. The standard image includes tiered-storage offloaders, except the filesystem offloader, but does not bundle Pulsar IO connectors. Supply the connector NARs your deployment needs separately; connectors now have a [separate repository and release cycle](https://github.com/apache/pulsar-connectors). Test existing connectors against M2 before relying on them.
- **Runtime**: Docker images now use Java 25 and a trimmed runtime. Deployments supplying their own JDK retain Java 17 as the minimum supported version.
- **Custom extensions**: affected Java EE APIs move from `javax.*` to `jakarta.*` at the Jakarta EE 10 level. Update extensions that use those APIs; legacy `javax.servlet` `AdditionalServlet` plugins are adapted by the broker. Plugin authors can align dependency versions with `org.apache.pulsar:pulsar-dependencies`.
- **Metadata store**: the etcd backend is removed. Deployments using it must migrate to ZooKeeper or Oxia before upgrading.

## Looking ahead: performance work toward 5.0.0

Performance work continues on `master`. **The following changes landed after the M2 tag and are not included in this milestone.** They are being prepared for Pulsar 5.0.0:

- **[BookKeeper batch reads](https://github.com/apache/bookkeeper/blob/master/site3/website/src/pages/bps/BP-62-new-API-for-batched-reads.md)** fetch multiple stored entries in one request, reducing per-entry request overhead when reading a backlog, particularly with small entries ([#25280](https://github.com/apache/pulsar/pull/25280)). The path is enabled by default when the BookKeeper protocol and ledger support it, with regular-read fallbacks.
- **Fewer thread handoffs**: ledger callbacks run on the managed-ledger thread, and dispatch no longer switches to a subscription thread by default. This avoids extra queueing on read, write-completion, and dispatch paths ([#26599](https://github.com/apache/pulsar/pull/26599), [#26578](https://github.com/apache/pulsar/pull/26578)).
- **Better cache memory behavior**: batch-read entries are copied into cache-owned buffers so retaining a small entry does not retain the whole response frame. Netty's adaptive allocator becomes the default for cache copies, targeting fragmentation from many small, long-lived entries ([#26603](https://github.com/apache/pulsar/pull/26603)). It still pools memory; this is not a guarantee that process memory will match the cache's logical size.
- **Less dispatch and client scheduling overhead**: Shared consumer selection avoids redundant priority checks, Key_Shared lookups use immutable snapshots instead of read locks, and client listener notifications share drain tasks during bursts ([#26593](https://github.com/apache/pulsar/pull/26593), [#26591](https://github.com/apache/pulsar/pull/26591), [#26531](https://github.com/apache/pulsar/pull/26531)).

These changes target the costs that matter across both existing and scalable topics: storage requests, queueing, contention, and allocation. Their effect depends on message size, batching, backlog, subscription count, and consumer behavior. Component benchmarks help identify improvements, but do not establish an end-to-end throughput gain for every workload.

## Evaluate M2 and share your feedback

Run M2 in a **non-production** cluster with representative workloads. Feedback is especially useful on upgrades from 4.x, reconnect and recovery behavior, TLS and proxy configurations, and scalable-topic consumer scale-up. Compare throughput, tail latency, CPU, and memory with your current version using the same workload and settings.

Start with [Pulsar Standalone](/docs/5.0.x/getting-started-standalone) or [Docker Compose](/docs/5.0.x/getting-started-docker-compose). The [M2 release notes](/release-notes/versioned/pulsar-5.0.0-M2/) contain the full list of changes. Report issues on [GitHub](https://github.com/apache/pulsar/issues) or share feedback on the [dev mailing list](https://pulsar.apache.org/contact/) to help shape the final 5.0.0 release.
