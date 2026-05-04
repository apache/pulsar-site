---
id: pulsar-4.0.4
title: Apache Pulsar 4.0.4
sidebar_label: Apache Pulsar 4.0.4
---

#### 2025-04-09

### Library updates

- [fix][sec] Upgrade jwt/v5 to 5.2.2 to address CVE-2025-30204 ([#24140](https://github.com/apache/pulsar/pull/24140))
- [fix][sec] Upgrade pulsar-function-go dependencies to address CVE-2025-22870 ([#24135](https://github.com/apache/pulsar/pull/24135))
- [improve] Upgrade Netty to 4.1.119.Final ([#24049](https://github.com/apache/pulsar/pull/24049))

### Broker

- [fix] Avoid negative estimated entry count ([#24055](https://github.com/apache/pulsar/pull/24055))
- [fix][broker] Add expire check for replicator ([#23975](https://github.com/apache/pulsar/pull/23975))
- [fix][broker] Avoid IllegalStateException when marker_type field is not set in publishing ([#24087](https://github.com/apache/pulsar/pull/24087))
- [fix][broker] fix delay queue sequence issue. ([#24035](https://github.com/apache/pulsar/pull/24035))
- [fix][broker] Fix Metadata Event Synchronizer producer creation retry so that the producer gets created eventually ([#24081](https://github.com/apache/pulsar/pull/24081))
- [fix][broker] Fix Metadata event synchronizer should not fail with bad version ([#24080](https://github.com/apache/pulsar/pull/24080))
- [fix][broker] Fix missing validation when setting retention policy on topic level ([#24032](https://github.com/apache/pulsar/pull/24032))
- [fix][broker] Fix NPE while publishing Metadata-Event with not init producer ([#24079](https://github.com/apache/pulsar/pull/24079))
- [fix][broker] Fix UnsupportedOperationException while setting subscription level dispatch rate policy ([#24048](https://github.com/apache/pulsar/pull/24048))
- [fix][broker] http metric endpoint get compaction latency stats always be 0 ([#24067](https://github.com/apache/pulsar/pull/24067))
- [fix][broker] Pattern subscription doesn't work when the pattern excludes the topic domain. ([#24072](https://github.com/apache/pulsar/pull/24072))
- [fix][broker] Restore the behavior to dispatch batch messages according to consumer permits ([#24092](https://github.com/apache/pulsar/pull/24092))
- [fix][broker] topics infinitely failed to delete after remove cluster from replicated clusters modifying when using partitioned system topic ([#24097](https://github.com/apache/pulsar/pull/24097))
- [fix][broker]Fix failed consumption after loaded up a terminated topic ([#24063](https://github.com/apache/pulsar/pull/24063))
- [fix][ml] Corrected pulsar_storage_size metric to not multiply offloaded storage by the write quorum ([#24054](https://github.com/apache/pulsar/pull/24054))
- [fix][ml] Don't estimate number of entries when ledgers are empty, return 1 instead ([#24125](https://github.com/apache/pulsar/pull/24125))
- [fix][ml] Fix issues in estimateEntryCountBySize ([#24089](https://github.com/apache/pulsar/pull/24089))
- [fix][ml] Return 1 when bytes size is 0 or negative for entry count estimation ([#24131](https://github.com/apache/pulsar/pull/24131))
- [improve][broker] Change topic exists log to warn ([#24116](https://github.com/apache/pulsar/pull/24116))
- [improve][broker] extract getMaxEntriesInThisBatch into a method and add unit test for it ([#24117](https://github.com/apache/pulsar/pull/24117))
- [improve][broker] Optimize message expiration rate repeated update issues ([#24073](https://github.com/apache/pulsar/pull/24073))
- [improve][broker] Optimize ThresholdShedder with improved boundary checks and parameter reuse ([#24064](https://github.com/apache/pulsar/pull/24064))
- [improve][broker][branch-4.0] PIP-406: Introduce metrics related to dispatch throttled events ([#24111](https://github.com/apache/pulsar/pull/24111))
- [improve][meta] Change log level from error to warn for unknown notification types in OxiaMetadataStore ([#24126](https://github.com/apache/pulsar/pull/24126))

### Client

- [fix][client] Copy eventTime to retry letter topic and DLQ messages ([#24059](https://github.com/apache/pulsar/pull/24059))
- [fix][client] Fix building broken batched message when publishing ([#24061](https://github.com/apache/pulsar/pull/24061))
- [fix][client] Fix consumer leak when thread is interrupted before subscribe completes ([#24100](https://github.com/apache/pulsar/pull/24100))
- [fix][client] Pattern subscription regression when broker-side evaluation is disabled ([#24104](https://github.com/apache/pulsar/pull/24104))
- [fix][client] PIP-409 retry/dead letter topic producer config don't take effect. ([#24071](https://github.com/apache/pulsar/pull/24071))
- [improve][client] PIP-409: support producer configuration for retry/dead letter topic producer ([#24020](https://github.com/apache/pulsar/pull/24020))
- [improve][client] Prevent NullPointException when closing ClientCredentialsFlow ([#24123](https://github.com/apache/pulsar/pull/24123))
- [clean][client] Clean code for the construction of retry/dead letter topic name ([#24082](https://github.com/apache/pulsar/pull/24082))

### Pulsar IO and Pulsar Functions

- [fix][io] Fix KinesisSink json flattening for AVRO's SchemaType.BYTES ([#24132](https://github.com/apache/pulsar/pull/24132))
- [improve][fn] Introduce NewOutputMessageWithError to enable error handling ([#24122](https://github.com/apache/pulsar/pull/24122))
- [improve][io] Enhance Kafka connector logging with focused bootstrap server information ([#24128](https://github.com/apache/pulsar/pull/24128))
- [improve][io] Remove sleep when sourceTask.poll of kafka return null ([#24124](https://github.com/apache/pulsar/pull/24124))

### Others

- [fix][doc] fix doc related to chunk message feature. ([#24023](https://github.com/apache/pulsar/pull/24023))
- [fix][doc] Workaround Go Yaml issue go-yaml/yaml#789 in docker-compose example ([#24040](https://github.com/apache/pulsar/pull/24040))
- [improve][monitor] Add version=0.0.4 to /metrics content type for Prometheus 3.x compatibility ([#24060](https://github.com/apache/pulsar/pull/24060))

### Tests & CI

- [fix][ci] Bump dependency-check to 12.1.0 to fix OWASP Dependency Check job ([#24083](https://github.com/apache/pulsar/pull/24083))
- [fix][test] Fix flaky NonPersistentTopicTest.testMsgDropStat ([#24134](https://github.com/apache/pulsar/pull/24134))
- [fix][test] Fix flaky PrometheusMetricsTest.testBrokerMetrics ([#24042](https://github.com/apache/pulsar/pull/24042))


For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.3...v4.0.4).
