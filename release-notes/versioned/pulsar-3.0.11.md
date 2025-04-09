---
id: pulsar-3.0.11
title: Apache Pulsar 3.0.11
sidebar_label: Apache Pulsar 3.0.11
---

#### 2025-04-09

### Library updates

- [fix] Bump google.golang.org/protobuf from 1.32.0 to 1.33.0 in /pulsar-function-go ([#22261](https://github.com/apache/pulsar/pull/22261))
- [fix][sec] Upgrade jwt/v5 to 5.2.2 to address CVE-2025-30204 ([#24140](https://github.com/apache/pulsar/pull/24140))
- [fix][sec] Upgrade pulsar-function-go dependencies to address CVE-2025-22870 ([#24135](https://github.com/apache/pulsar/pull/24135))
- [improve] Upgrade Netty to 4.1.119.Final ([#24049](https://github.com/apache/pulsar/pull/24049))

### Broker

- [fix] Avoid negative estimated entry count ([#24055](https://github.com/apache/pulsar/pull/24055))
- [fix][admin] Verify is policies read only before revoke permissions on topic ([#23730](https://github.com/apache/pulsar/pull/23730))
- [fix][broker] Add expire check for replicator ([#23975](https://github.com/apache/pulsar/pull/23975))
- [fix][broker] Avoid IllegalStateException when marker_type field is not set in publishing ([#24087](https://github.com/apache/pulsar/pull/24087))
- [fix][broker] fix broker identifying incorrect stuck topic ([#24006](https://github.com/apache/pulsar/pull/24006))
- [fix][broker] Fix BucketDelayedDeliveryTracker thread safety ([#24014](https://github.com/apache/pulsar/pull/24014))
- [fix][broker] Fix get outdated compactedTopicContext after compactionHorizon has been updated ([#20984](https://github.com/apache/pulsar/pull/20984))
- [fix][broker] Fix Metadata Event Synchronizer producer creation retry so that the producer gets created eventually ([#24081](https://github.com/apache/pulsar/pull/24081))
- [fix][broker] Fix Metadata event synchronizer should not fail with bad version ([#24080](https://github.com/apache/pulsar/pull/24080))
- [fix][broker] Fix NPE while publishing Metadata-Event with not init producer ([#24079](https://github.com/apache/pulsar/pull/24079))
- [fix][broker] Fix UnsupportedOperationException while setting subscription level dispatch rate policy ([#24048](https://github.com/apache/pulsar/pull/24048))
- [fix][broker] Geo Replication lost messages or frequently fails due to Deduplication is not appropriate for Geo-Replication ([#23697](https://github.com/apache/pulsar/pull/23697))
- [fix][broker] http metric endpoint get compaction latency stats always be 0 ([#24067](https://github.com/apache/pulsar/pull/24067))
- [fix][broker] Pattern subscription doesn't work when the pattern excludes the topic domain. ([#24072](https://github.com/apache/pulsar/pull/24072))
- [fix][broker] topics infinitely failed to delete after remove cluster from replicated clusters modifying when using partitioned system topic ([#24097](https://github.com/apache/pulsar/pull/24097))
- [fix][broker]Fix failed consumption after loaded up a terminated topic ([#24063](https://github.com/apache/pulsar/pull/24063))
- [fix][ml] Corrected pulsar_storage_size metric to not multiply offloaded storage by the write quorum ([#24054](https://github.com/apache/pulsar/pull/24054))
- [fix][ml] Don't estimate number of entries when ledgers are empty, return 1 instead ([#24125](https://github.com/apache/pulsar/pull/24125))
- [fix][ml] Fix issues in estimateEntryCountBySize ([#24089](https://github.com/apache/pulsar/pull/24089))
- [fix][ml] Return 1 when bytes size is 0 or negative for entry count estimation ([#24131](https://github.com/apache/pulsar/pull/24131))
- [improve][broker] Change topic exists log to warn ([#24116](https://github.com/apache/pulsar/pull/24116))
- [improve][broker] Fix non-persistent system topic schema compatibility ([#23286](https://github.com/apache/pulsar/pull/23286))
- [improve][broker] Improve CompactedTopicImpl lock ([#20697](https://github.com/apache/pulsar/pull/20697))
- [improve][broker] Make the estimated entry size more accurate ([#23931](https://github.com/apache/pulsar/pull/23931))
- [improve][broker] Optimize message expiration rate repeated update issues ([#24073](https://github.com/apache/pulsar/pull/24073))
- [improve][broker] Optimize ThresholdShedder with improved boundary checks and parameter reuse ([#24064](https://github.com/apache/pulsar/pull/24064))
- [improve][ml] Use lock-free queue in InflightReadsLimiter since there's no concurrent access  ([#23962](https://github.com/apache/pulsar/pull/23962))

### Client

- [fix][client] Copy eventTime to retry letter topic and DLQ messages ([#24059](https://github.com/apache/pulsar/pull/24059))
- [fix][client] Fix building broken batched message when publishing ([#24061](https://github.com/apache/pulsar/pull/24061))
- [fix][client] Fix consumer leak when thread is interrupted before subscribe completes ([#24100](https://github.com/apache/pulsar/pull/24100))
- [fix][client] Pattern subscription regression when broker-side evaluation is disabled ([#24104](https://github.com/apache/pulsar/pull/24104))
- [improve][client] Prevent NullPointException when closing ClientCredentialsFlow ([#24123](https://github.com/apache/pulsar/pull/24123))
- [clean][client] Clean code for the construction of retry/dead letter topic name ([#24082](https://github.com/apache/pulsar/pull/24082))

### Pulsar IO and Pulsar Functions

- [fix][io] Fix KinesisSink json flattening for AVRO's SchemaType.BYTES ([#24132](https://github.com/apache/pulsar/pull/24132))
- [improve][fn] Set default tenant and namespace for ListFunctions cmd ([#23881](https://github.com/apache/pulsar/pull/23881))
- [improve][io] Enhance Kafka connector logging with focused bootstrap server information ([#24128](https://github.com/apache/pulsar/pull/24128))
- [improve][io] Remove sleep when sourceTask.poll of kafka return null ([#24124](https://github.com/apache/pulsar/pull/24124))

### Others

- [fix][doc] fix doc related to chunk message feature. ([#24023](https://github.com/apache/pulsar/pull/24023))
- [improve][cli] Support additional msg metadata for V1 topic on peek message cmd ([#23978](https://github.com/apache/pulsar/pull/23978))
- [improve][monitor] Add version=0.0.4 to /metrics content type for Prometheus 3.x compatibility ([#24060](https://github.com/apache/pulsar/pull/24060))

### Tests & CI

- [fix][test] Fix flaky test OneWayReplicatorUsingGlobalZKTest.testConfigReplicationStartAt ([#24011](https://github.com/apache/pulsar/pull/24011))
- [fix][test]Fix flaky test V1_ProducerConsumerTest.testConcurrentConsumerReceiveWhileReconnect ([#24019](https://github.com/apache/pulsar/pull/24019))
- [fix][ci] Bump dependency-check to 12.1.0 to fix OWASP Dependency Check job ([#24083](https://github.com/apache/pulsar/pull/24083))
- [improve][test] Upgrade Testcontainers to 1.20.4 and docker-java to 3.4.0 ([#24003](https://github.com/apache/pulsar/pull/24003))
- [improve][ci] Upgrade Gradle Develocity Maven Extension to 1.23.1 ([#24004](https://github.com/apache/pulsar/pull/24004))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.0.10...v3.0.11).
