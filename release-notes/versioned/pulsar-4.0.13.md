---
id: pulsar-4.0.13
title: Apache Pulsar 4.0.13
sidebar_label: Apache Pulsar 4.0.13
---

#### 2026-08-03

### Library updates

- [fix][sec][branch-4.0] Upgrade Hadoop to 3.5.0 ([#26195](https://github.com/apache/pulsar/pull/26195))
- [fix][sec][branch-4.0] Upgrade Jackson version to 2.18.9 ([#26187](https://github.com/apache/pulsar/pull/26187))
- [fix][sec][branch-4.0] Upgrade Netty to 4.1.136.Final ([#26170](https://github.com/apache/pulsar/pull/26170))
- [fix][ci] Upgrade sandboxed-trivy-action to approved sha ([#26169](https://github.com/apache/pulsar/pull/26169))
- [improve][meta] Upgrade Oxia client to 0.8.0 ([#25964](https://github.com/apache/pulsar/pull/25964))
- [improve][meta] Upgrade Oxia client to 0.9.4 ([#26193](https://github.com/apache/pulsar/pull/26193))
- [improve][monitor][branch-4.0] Upgrade OpenTelemetry libraries ([#26165](https://github.com/apache/pulsar/pull/26165))
- [improve][build] Upgrade docker base image Alpine to 3.24 ([#26225](https://github.com/apache/pulsar/pull/26225))
- [improve][build] Upgrade slog to 0.10.0 ([#26226](https://github.com/apache/pulsar/pull/26226))
- [improve][misc] Upgrade Jetty to 12.1.11 ([#26233](https://github.com/apache/pulsar/pull/26233))
- [improve][misc] Upgrade to Alpine 3.23 ([#25180](https://github.com/apache/pulsar/pull/25180))

### Broker

- [fix][broker] Check deliverAt before containsMessage in bucket addMessage ([#26230](https://github.com/apache/pulsar/pull/26230))
- [fix][broker] Fix `getEstimatedSizeSinceMarkDeletePosition` throw `IllegalArgumentException` ([#26184](https://github.com/apache/pulsar/pull/26184))
- [fix][broker] Fix bucket delayed message index metrics reset on scrape ([#26171](https://github.com/apache/pulsar/pull/26171))
- [fix][broker] Fix delayed message index data loss when trimming overlapping bucket snapshots ([#26240](https://github.com/apache/pulsar/pull/26240))
- [fix][broker] Fix incorrect listener URLs returned by ModularLoadManager lookups ([#26245](https://github.com/apache/pulsar/pull/26245))
- [fix][broker] Fix Key_Shared delivery stall when look-ahead triggers at the end of the topic ([#26236](https://github.com/apache/pulsar/pull/26236))
- [fix][broker] Fix silently dropped acknowledgement failures in PulsarMetadataEventSynchronizer ([#26237](https://github.com/apache/pulsar/pull/26237))
- [fix][broker] Fix TableViewLoadDataStoreImpl close deadlock that stalls broker shutdown ([#26243](https://github.com/apache/pulsar/pull/26243))
- [fix][broker] Prevent completing replicated snapshot before marker publish ([#26119](https://github.com/apache/pulsar/pull/26119))
- [fix][broker] Prevent partition expansion from inheriting delayed-delivery bucket state ([#26179](https://github.com/apache/pulsar/pull/26179))
- [fix][broker] Prevent stale read completions from stranding Failover subscriptions ([#26174](https://github.com/apache/pulsar/pull/26174))
- [fix][broker] Prevent stale service unit callbacks from dropping active lookup and cleanup jobs ([#26146](https://github.com/apache/pulsar/pull/26146))
- [fix][broker] Prevent stale topic unload cleanup from removing active cache entries ([#26145](https://github.com/apache/pulsar/pull/26145))
- [fix][broker] Read subscription properties directly from cursor ([#26159](https://github.com/apache/pulsar/pull/26159))
- [fix][broker] Release entry on GetLastMessageId when parseMessageMetadata throws ([#26089](https://github.com/apache/pulsar/pull/26089))
- [fix][broker] Trigger max read position callback for messages published during transaction buffer recovery ([#26234](https://github.com/apache/pulsar/pull/26234))
- [fix][broker][branch-4.2] Fix admin API HTTP 400 FAIL_ON_TRAILING_TOKENS when a broker interceptor is loaded ([#26223](https://github.com/apache/pulsar/pull/26223))
- [fix][ml] Preserve ledger entries/size when transformLedgerInfo callback completes after a concurrent close ([#26228](https://github.com/apache/pulsar/pull/26228))
- [fix][meta] Complete handleMetadataEvent future exceptionally when the initial get fails ([#26199](https://github.com/apache/pulsar/pull/26199))
- [fix][meta] Fix NPE in shouldIgnoreEvent when MetadataEvent options is null ([#26200](https://github.com/apache/pulsar/pull/26200))
- [fix][meta] Fix RocksdbMetadataStore instanceId not advancing across restarts ([#26218](https://github.com/apache/pulsar/pull/26218))
- [fix][meta] Record get op stats on the correct completion branch in AbstractMetadataStore ([#26201](https://github.com/apache/pulsar/pull/26201))
- [improve][broker] Skip system cursor when check inactive cursor. ([#26149](https://github.com/apache/pulsar/pull/26149))
- [improve][broker][branch-4.0] Trace the asynchronous tasks in logs when loading topics ([#26163](https://github.com/apache/pulsar/pull/26163)) ([#26224](https://github.com/apache/pulsar/pull/26224))
- [improve][offload] Support credentials from offload policies for S3 and Aliyun OSS drivers ([#26232](https://github.com/apache/pulsar/pull/26232))

### Client

- [fix][client] Fix lookup permit double-release, waiting queue starvation and timeout-response races in ClientCnx ([#26143](https://github.com/apache/pulsar/pull/26143))
- [fix][client] Fix lookup request semaphore not release problem ([#25038](https://github.com/apache/pulsar/pull/25038))
- [fix][client] Fix UnAckedMessageRedeliveryTracker to skip cancelled timeouts ([#26043](https://github.com/apache/pulsar/pull/26043))
- [fix][client] Fix unAckedMessageTracker cleanup on multi-topics batch ack ([#26001](https://github.com/apache/pulsar/pull/26001))
- [fix][client] Preserve null values in pulsar-admin schema output ([#26196](https://github.com/apache/pulsar/pull/26196))
- [fix][client] Sync ackSet in client with broker to stop acked messages reaching the DLQ ([#26135](https://github.com/apache/pulsar/pull/26135))

### Pulsar IO and Pulsar Functions

- [fix][fn] Forward source message properties in Python runtime ([#26191](https://github.com/apache/pulsar/pull/26191))
- [fix][fn] Return inputSpecs consumerProperties in function GET info ([#26217](https://github.com/apache/pulsar/pull/26217))

### Others

- [improve][misc][branch-4.0] Add CustomLog config for slog
- [fix][metadata] Fix orphaned UR parent nodes not cleaned up with Oxia metadata backend ([#26158](https://github.com/apache/pulsar/pull/26158))
- [fix][misc][branch-4.0] Make log4j pattern compatible with slog which got pulled in by Oxia client upgrade

### Tests & CI

- [fix][test] Fix flaky test `testCompactionPriority ` ([#26198](https://github.com/apache/pulsar/pull/26198))
- [improve][ci] Replace trivy-action with sandboxed-trivy-action ([#25480](https://github.com/apache/pulsar/pull/25480))
- [fix][build][branch-4.0] Fix spotbugs failure in OffloadPoliciesImpl
- [fix][ci][branch-4.0] Fix OpenTelemetrySanityTest after Otel library upgrade
- [fix][ci][branch-4.0] Skip testMarkReplicatedDeletesEmptyParentNodes for Etcd

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.12...v4.0.13).
