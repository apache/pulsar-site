---
id: pulsar-3.0.17
title: Apache Pulsar 3.0.17
sidebar_label: Apache Pulsar 3.0.17
---

#### 2026-04-27

### Library updates

- [fix][sec] Upgrade BouncyCastle to 1.84 (CVE-2026-5588, CVE-2026-0636) ([#25569](https://github.com/apache/pulsar/pull/25569))
- [fix][sec] Upgrade to async-http-client 2.14.5 to address CVE-2026-40490 ([#25546](https://github.com/apache/pulsar/pull/25546))
- [fix][sec] Upgrade to Netty 4.1.132.Final to address CVEs ([#25399](https://github.com/apache/pulsar/pull/25399))
- [fix][sec] Bump org.apache.zookeeper:zookeeper from 3.9.4 to 3.9.5 ([#25303](https://github.com/apache/pulsar/pull/25303))
- [fix][sec] Upgrade aircompressor to 2.0.3 to resolve CVE-2025-67721 ([#25256](https://github.com/apache/pulsar/pull/25256))
- [fix][sec] Upgrade Jackson version to 2.18.6 ([#25264](https://github.com/apache/pulsar/pull/25264))
- [fix][sec] Upgrade Python protobuf version to 6.33.5 to address CVE-2026-0994 ([#25250](https://github.com/apache/pulsar/pull/25250))
- [improve][fn] Upgrade Pulsar Python client version to 3.10.0 ([#25251](https://github.com/apache/pulsar/pull/25251))
- [fix][sec] Exclude org.lz4:lz4-java and standardize on at.yawk.lz4-java to remediate CVE-2025-12183 and CVE-2025-66566 ([#25198](https://github.com/apache/pulsar/pull/25198))
- [fix][sec] Override kafka-clients in kinesis-kpl-shaded to remediate CVE-2024-31141 and CVE-2025-27817 ([#24935](https://github.com/apache/pulsar/pull/24935))
- [fix][sec] Upgrade log4j to 2.25.4 to address CVE-2026-34477, CVE-2026-34478, CVE-2026-34480, CVE-2026-34481 ([#25521](https://github.com/apache/pulsar/pull/25521))
- [fix][sec]Upgrade jackson to 2.17.2 ([#23174](https://github.com/apache/pulsar/pull/23174))
- [improve] Upgrade Netty to 4.1.131.Final ([#25232](https://github.com/apache/pulsar/pull/25232))

### Broker

- [improve][broker] Close connection when close consumer write fails ([#25520](https://github.com/apache/pulsar/pull/25520))

### Client

- [fix][client] Fail messages immediately in ProducerImpl when in terminal state ([#25317](https://github.com/apache/pulsar/pull/25317))

### Pulsar IO and Pulsar Functions

- [fix][io] Restore lz4 compression with Kafka IO connector after [#25198](https://github.com/apache/pulsar/pull/25198) exclusion

### Others

- [improve][common] Optimize TopicName.get() to reduce lock contention on cache lookup ([#25367](https://github.com/apache/pulsar/pull/25367))
- [improve][broker] Improve the performance of TopicName constructor ([#24463](https://github.com/apache/pulsar/pull/24463))

### Tests & CI

- [improve][ci] Cleanup tune-runner-vm and clean-disk actions ([#25444](https://github.com/apache/pulsar/pull/25444))
- [cleanup][ci] Remove documentation label bot ([#25469](https://github.com/apache/pulsar/pull/25469))
- [cleanup][ci] Remove ready-to-test label enforcement ([#25470](https://github.com/apache/pulsar/pull/25470))
- [fix][ci] Fix .github/actions/ssh-access which is used for debugging Pulsar CI in forks ([#25075](https://github.com/apache/pulsar/pull/25075))
- [fix][test] Stabilize FunctionAssignmentTailerTest.testErrorNotifier by synchronizing mock stubbing with CountDownLatch ([#24875](https://github.com/apache/pulsar/pull/24875))
- [cleanup][build] Bumped version to 3.0.17-SNAPSHOT
- [fix][build][branch-3.0] Fix presto-distribution license file
- [fix][build][branch-3.0] Fix trino license
- [fix][build][branch-3.0] Fix trino license file
- [fix][ci][branch-3.0] Fix docker daemon configuration for branch-3.0
- [fix][ci][branch-3.0] Revert adding min-api-version: 1.24 to /etc/docker/daemon.json
- [improve][ci] Backport fix for ssh-access action

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.0.16...v3.0.17).
