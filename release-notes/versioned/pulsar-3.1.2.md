---
id: pulsar-3.1.2
title: Apache Pulsar 3.1.2
sidebar_label: Apache Pulsar 3.1.2
---

#### 2024-01-02

## PIPs
- PIP-318: Support not retaining null-key message during topic compaction by @coderzc in [#21578](https://github.com/apache/pulsar/pull/21578)

### Broker
- Fixed ServiceUnitStateChannel monitor to tombstone only inactive bundle states by @heesung-sn in [#21721](https://github.com/apache/pulsar/pull/21721)
- Fix typo in the config key by @coderzc in [#21690](https://github.com/apache/pulsar/pull/21690)
- Record GeoPersistentReplicator.msgOut before producer#sendAsync by @nodece in [#21673](https://github.com/apache/pulsar/pull/21673)
- Print recoverBucketSnapshot log if cursorProperties are empty by @coderzc in [#21651](https://github.com/apache/pulsar/pull/21651)
- Support not retaining null-key message during topic compaction by @coderzc in [#21601](https://github.com/apache/pulsar/pull/21601)
- Delete topic timeout due to NPE by @poorbarcode in [#21595](https://github.com/apache/pulsar/pull/21595)
- Duplicate LedgerOffloader creation when namespace/topic policies are updated by @shibd in [#21591](https://github.com/apache/pulsar/pull/21591)
- Fix issue with consumer read uncommitted messages from compacted topic by @coderzc in [#21571](https://github.com/apache/pulsar/pull/21571)
- Fix create topic with different auto creation strategies causes race condition by @mattisonchao in [#21545](https://github.com/apache/pulsar/pull/21545)
- Fix orphan scheduled task for ledger create timeout check by @poorbarcode in [#21542](https://github.com/apache/pulsar/pull/21542)
- Fix thousands orphan PersistentTopic caused OOM by @poorbarcode in [#21540](https://github.com/apache/pulsar/pull/21540)
- Fix unfinished callback when deleting managed ledger by @mattisonchao in [#21530](https://github.com/apache/pulsar/pull/21530)
- Fix setReplicatedSubscriptionStatus incorrect behavior by @liudezhi2098 in [#21510](https://github.com/apache/pulsar/pull/21510)
- Fix failure while creating non-durable cursor with inactive managed-ledger by @rdhabalia in [#21508](https://github.com/apache/pulsar/pull/21508)
- Fix PulsarService/BrokerService shutdown when brokerShutdownTimeoutMs=0 by @lhotari in [#21496](https://github.com/apache/pulsar/pull/21496)
- Do not write replicated snapshot marker when the topic which is not enable replication by @liangyepianzhou in [#21495](https://github.com/apache/pulsar/pull/21495)
- Avoid pass null role in MultiRolesTokenAuthorizationProvider by @mattisonchao in [#21486](https://github.com/apache/pulsar/pull/21486)
- Fix the deadlock when using BookieRackAffinityMapping with rackaware policy by @erobot in [#21481](https://github.com/apache/pulsar/pull/21481)
- Fix issue with consumer read uncommitted messages from compacted topic by @coderzc in [#21465](https://github.com/apache/pulsar/pull/21465)
- Fix resource_quota_zpath by @AnonHxy in [#21461](https://github.com/apache/pulsar/pull/21461)
- Fix namespace bundle stuck in unloading status by @mattisonchao in [#21445](https://github.com/apache/pulsar/pull/21445)
- Ignore individual acknowledgment for CompactorSubscription when an entry has been filtered. by @coderzc in [#21434](https://github.com/apache/pulsar/pull/21434)
- Fix MultiRoles token provider NPE when using anonymous clients by @Technoboy- in [#21429](https://github.com/apache/pulsar/pull/21429)
- Fix heartbeat namespace create event topic and cannot delete heartbeat topic by @TakaHiR07 in [#21360](https://github.com/apache/pulsar/pull/21360)
- Fix heartbeat namespace create transaction internal topic by @TakaHiR07 in [#21348](https://github.com/apache/pulsar/pull/21348)
- Fix unload operation stuck when use ExtensibleLoadManager by @Demogorgon314 in [#21332](https://github.com/apache/pulsar/pull/21332)
- Fix lookup heartbeat and sla namespace bundle when using extensible load manager(#21213) by @Demogorgon314 in [#21314](https://github.com/apache/pulsar/pull/21314)
- Fix thread safe issue with RangeCache.put and RangeCache.clear by @lhotari in [#21302](https://github.com/apache/pulsar/pull/21302)
- use ConcurrentHashMap in ServiceUnitStateChannel and avoid recursive update error by @heesung-sn in [#21282](https://github.com/apache/pulsar/pull/21282)
- Fix inconsistent topic policy by @mattisonchao in [#21255](https://github.com/apache/pulsar/pull/21255)
- Let the producer request success at the first time if the previous one is inactive by @poorbarcode in [#21220](https://github.com/apache/pulsar/pull/21220)
- Fix lookup heartbeat and sla namespace bundle when using extensible load manager by @Demogorgon314 in [#21213](https://github.com/apache/pulsar/pull/21213)
- Avoid record inactiveproducers when deduplication is disable by @lifepuzzlefun in [#21193](https://github.com/apache/pulsar/pull/21193)
- Make specified producer could override the previous one by @poorbarcode in [#21155](https://github.com/apache/pulsar/pull/21155)
- Rackaware policy is ineffective when delete zk rack info after bkclient initialize by @TakaHiR07 in [#20944](https://github.com/apache/pulsar/pull/20944)
- Check that the super user role is in the MultiRolesTokenAuthorizationProvider plugin by @tuteng in [#20939](https://github.com/apache/pulsar/pull/20939)

### Transaction
- OpRequestSend reuse problem cause tbClient commitTxnOnTopic timeout unexpectedly by @TakaHiR07 in [#21505](https://github.com/apache/pulsar/pull/21505)
- Ack all message ids when ack chunk messages with transaction by @liangyepianzhou in [#21268](https://github.com/apache/pulsar/pull/21268)

### CI and Test
- Fix LocalBookkeeperEnsemble resource leak in tests by @lhotari in [#21407](https://github.com/apache/pulsar/pull/21407)
- Add new CI unit test group "Broker Group 4" with cluster migration tests by @lhotari in [#21391](https://github.com/apache/pulsar/pull/21391)
- Fix resource leaks with Pulsar Functions tests by @lhotari in [#21378](https://github.com/apache/pulsar/pull/21378)
- Fix some resource leaks in compaction tests by @lhotari in [#21374](https://github.com/apache/pulsar/pull/21374)
- Fix a resource leak in ClusterMigrationTest by @lhotari in [#21366](https://github.com/apache/pulsar/pull/21366)
- Fix docker image building by releasing more disk space before building by @lhotari in [#21365](https://github.com/apache/pulsar/pull/21365)
- Fix flaky CompactionTest.testDispatcherMaxReadSizeBytes by @lhotari in [#21329](https://github.com/apache/pulsar/pull/21329)
- Fix flaky test NarUnpackerTest by @lhotari in [#21328](https://github.com/apache/pulsar/pull/21328)
- Fix zookeeper related flacky test by @horizonzy in [#21310](https://github.com/apache/pulsar/pull/21310)
- fix flaky test PatternTopicsConsumerImplTest by @poorbarcode in [#21222](https://github.com/apache/pulsar/pull/21222)

### Security
- Upgrade rabbitmq client to address CVE-2023-46120 by @liangyepianzhou in [#21619](https://github.com/apache/pulsar/pull/21619)
- Upgrade Zookeeper to 3.8.3 to address CVE-2023-44981 by @lhotari in [#21398](https://github.com/apache/pulsar/pull/21398)
- Upgrade Netty to 4.1.100 to address CVE-2023-44487 by @lhotari in [#21397](https://github.com/apache/pulsar/pull/21397)
- Upgrade Jetty to 9.4.53 to address CVE-2023-44487 by @lhotari in [#21395](https://github.com/apache/pulsar/pull/21395)
- Fix MultiRoles token provider when using anonymous clients by @merlimat in [#21338](https://github.com/apache/pulsar/pull/21338)
- Add OWASP Dependency Check suppressions by @lhotari in [#21281](https://github.com/apache/pulsar/pull/21281)
- Upgrade snappy-java to 1.1.10.5 by @lhotari in [#21280](https://github.com/apache/pulsar/pull/21280)

### Build
- Fix Stage Docker images fail on M1 Mac by @AnonHxy in [#21659](https://github.com/apache/pulsar/pull/21659)
- Fix apt download issue in building the docker image by @lhotari in [#21489](https://github.com/apache/pulsar/pull/21489)
- Rename schema_example.conf to schema_example.json by @poorbarcode in [#21447](https://github.com/apache/pulsar/pull/21447)
- Upgrade Lombok to 1.18.30 to support compiling with JDK21 by @lhotari in [#21278](https://github.com/apache/pulsar/pull/21278)

### Others

- [offload] Don't cleanup data when offload met MetaStore exception by @zymap in [#21686](https://github.com/apache/pulsar/pull/21686)
- [proxy] Move status endpoint out of auth coverage by @mattisonchao in [#21428](https://github.com/apache/pulsar/pull/21428)
- [auto-recovery] Migrate the replication testing from BookKeeper to Pulsar by @horizonzy in [#21340](https://github.com/apache/pulsar/pull/21340)
- [bk-client] Fix bk client MinNumRacksPerWriteQuorum and EnforceMinNumRacksPerWriteQuorum not work problem by @horizonzy in [#21327](https://github.com/apache/pulsar/pull/21327)
- [sql] Support UUID for json and avro by @liangyepianzhou in [#21267](https://github.com/apache/pulsar/pull/21267)
- [log] fix the vague response if topic not found by @poorbarcode in [#20932](https://github.com/apache/pulsar/pull/20932)
