---
id: pulsar-3.0.15
title: Apache Pulsar 3.0.15
sidebar_label: Apache Pulsar 3.0.15
---

#### 2025-11-17

### Library updates

- [improve][misc] Upgrade Netty to 4.1.128.Final ([#24911](https://github.com/apache/pulsar/pull/24911))
- [fix][sec] Bump io.vertx:vertx-web from 4.5.10 to 4.5.22 ([#24889](https://github.com/apache/pulsar/pull/24889))
- [fix][sec] Upgrade BouncyCastle FIPS to 2.0.10 to remediate CVE-2025-8916 ([#24923](https://github.com/apache/pulsar/pull/24923))
- [fix][sec] Upgrade Jetty to 9.4.58.v20250814 to address CVE-2025-5115 ([#24897](https://github.com/apache/pulsar/pull/24897))
- [fix][sec] Upgrade Spring to 6.2.12 to remediate CVE-2025-22233 and CVE-2025-41249 ([#24903](https://github.com/apache/pulsar/pull/24903))
- [improve][ci] Upgrade GitHub Actions workflows to use ubuntu-24.04 ([#24841](https://github.com/apache/pulsar/pull/24841))

### Broker

- [fix][broker] Avoid recursive update in ConcurrentHashMap during policy cache cleanup ([#24939](https://github.com/apache/pulsar/pull/24939))
- [fix][broker] BacklogMessageAge is not reset when cursor mdPosition is on an open ledger ([#24915](https://github.com/apache/pulsar/pull/24915))
- [fix][broker] fix getMaxReadPosition in TransactionBufferDisable should return latest ([#24898](https://github.com/apache/pulsar/pull/24898))
- [fix][broker] Fix stack overflow caused by race condition when closing a connection ([#24934](https://github.com/apache/pulsar/pull/24934))
- [fix][broker] Fix totalAvailablePermits not reduced when removing consumer from non-persistent dispatcher ([#24885](https://github.com/apache/pulsar/pull/24885))
- [fix][broker] Flaky-test: ExtensibleLoadManagerImplTest.testDisableBroker ([#24770](https://github.com/apache/pulsar/pull/24770))
- [fix][broker] Run ResourceGroup tasks only when tenants/namespaces registered ([#24859](https://github.com/apache/pulsar/pull/24859))
- [fix][broker] Stop to retry to read entries if the replicator has terminated ([#24880](https://github.com/apache/pulsar/pull/24880))
- [fix][broker] Trigger topic creation event only once for non-existent topic ([#24802](https://github.com/apache/pulsar/pull/24802))
- [fix][admin] Set local policies overwrites "number of bundles" passed during namespace creation ([#24762](https://github.com/apache/pulsar/pull/24762))
- [fix][ml] Fix `getNumberOfEntries` may point to deleted ledger ([#24852](https://github.com/apache/pulsar/pull/24852))
- [fix][txn] fix concurrent error cause txn stuck in TransactionBufferHandlerImpl#endTxn ([#23551](https://github.com/apache/pulsar/pull/23551))
- [cleanup][broker][branch-3.0] Remove no-op configurations caused by cherry-picking ([#24960](https://github.com/apache/pulsar/pull/24960))

### Client

- [fix][client] Fix deduplication for getPartitionedTopicMetadata to include method parameters ([#24965](https://github.com/apache/pulsar/pull/24965))
- [fix][client] Fix getPendingQueueSize for PartitionedTopicProducerStatsRecorderImpl: avoid NPE and implement aggregation ([#24830](https://github.com/apache/pulsar/pull/24830))
- [fix][client] Fix thread leak in reloadLookUp method which is used by ServiceUrlProvider ([#24794](https://github.com/apache/pulsar/pull/24794))
- [fix][client] Make auto partitions update work for old brokers without PIP-344 ([#24822](https://github.com/apache/pulsar/pull/24822))
- [improve][client]Add null check for Pulsar client clock configuration ([#24848](https://github.com/apache/pulsar/pull/24848))
- [fix] Fix mixed lookup/partition metadata requests causing reliability issues and incorrect responses ([#24832](https://github.com/apache/pulsar/pull/24832))

### Tests & CI

- [fix][build] Remove invalid profile in settings.xml that caused gpg signing to fail ([#24812](https://github.com/apache/pulsar/pull/24812))
- [fix][test] Fix flaky KeySharedSubscriptionBrokerCacheTest.testReplayQueueReadsGettingCached ([#24955](https://github.com/apache/pulsar/pull/24955))
- [fix][test] Fix flaky NonPersistentTopicTest.testProducerRateLimit ([#24951](https://github.com/apache/pulsar/pull/24951))
- [fix][test] Fix flaky ReplicatorTest.testResumptionAfterBacklogRelaxed ([#24904](https://github.com/apache/pulsar/pull/24904))
- [fix][test] Fix flaky SubscriptionSeekTest.testSeekWillNotEncounteredFencedError by counting subscription is fenced only after seek ([#24865](https://github.com/apache/pulsar/pull/24865))
- [fix][test] Fix invalid test NonPersistentTopicTest.testProducerRateLimit ([#24957](https://github.com/apache/pulsar/pull/24957))
- [fix][test] Stabilize SequenceIdWithErrorTest by fencing after first publish to avoid empty-ledger deletion and send timeout ([#24861](https://github.com/apache/pulsar/pull/24861))
- [fix][test] Stabilize testMsgDropStat by reliably triggering non-persistent publisher drop ([#24929](https://github.com/apache/pulsar/pull/24929))
- [improve][ci] Move replication tests to new group Broker Group 5 in Pulsar CI ([#24917](https://github.com/apache/pulsar/pull/24917))
- [fix][ci][branch-3.0] Drop UBUNTU_MIRROR/UBUNTU_SECURITY_MIRROR support in Dockerfile since it's broken
- [fix][test][branch-3.0] Backport test case so that it compiles in branch-3.0

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.0.14...v3.0.15).
