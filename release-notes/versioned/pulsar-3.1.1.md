---
id: pulsar-3.1.1
title: Apache Pulsar 3.1.1
sidebar_label: Apache Pulsar 3.1.1
---

#### 2023-10-24

### Broker
- Fix incorrect number of read compacted entries [#20978](https://github.com/apache/pulsar/pull/20978)
- Fix message loss during topic compaction [#20980](https://github.com/apache/pulsar/pull/20980)
- Fix get outdated compactedTopicContext after compactionHorizon has been updated [#20984](https://github.com/apache/pulsar/pull/20984)
- Fix compaction subscription delete by inactive subscription check [#20983](https://github.com/apache/pulsar/pull/20983)
- Fix incorrect unack msk count when dup ack a message [#20990](https://github.com/apache/pulsar/pull/20990)
- Fix ModularLoadManagerImpl always delete active bundle-data [#20620](https://github.com/apache/pulsar/pull/20620)
- Use MessageDigest.isEqual when comparing digests [#21061](https://github.com/apache/pulsar/pull/21061)
- Fix can't stop phase-two of compaction even though messageId read reaches lastReadId [#20988](https://github.com/apache/pulsar/pull/20988)
- Make sure all inflight writes have finished before completion of compaction [#21067](https://github.com/apache/pulsar/pull/21067)
- Fix chunked messages will be filtered by duplicating [#20948](https://github.com/apache/pulsar/pull/20948)
- Fix potential case cause retention policy not working on topic level [#21041](https://github.com/apache/pulsar/pull/21041)
- Make read compacted entries support maxReadSizeBytes limitation [#21065](https://github.com/apache/pulsar/pull/21065)
- Remove bundle-data in local metadata store [#21078](https://github.com/apache/pulsar/pull/21078)
- Fix write duplicate entries into the compacted ledger after RawReader reconnects [#21081](https://github.com/apache/pulsar/pull/21081)
- Cleanup correctly heartbeat bundle ownership when handling broker deletion event [#21083](https://github.com/apache/pulsar/pull/21083)
- Avoid splitting one batch message into two entries in StrategicTwoPhaseCompactor [#21091](https://github.com/apache/pulsar/pull/21091)
- Fix unsubscribe non-durable subscription error [#21099](https://github.com/apache/pulsar/pull/21099)
- Fix isolated group not work problem [#21096](https://github.com/apache/pulsar/pull/21096)
- Consider iowait as idle [#19110](https://github.com/apache/pulsar/pull/19110)
- Fix deleting topic not delete the related topic policy and schema [#21093](https://github.com/apache/pulsar/pull/21093)
- Revert remove duplicate topics name when deleteNamespace [#21087](https://github.com/apache/pulsar/pull/21087)
- Improve logs for troubleshooting [#21141](https://github.com/apache/pulsar/pull/21141)
- Fix web tls url null cause NPE [#21137](https://github.com/apache/pulsar/pull/21137)
- Fix unack count when mixing non batch index and batch index acks [#21126](https://github.com/apache/pulsar/pull/21126)
- Backport fix UniformLoadShedder selecet wrong overloadbroker and underloadbroker [#21180](https://github.com/apache/pulsar/pull/21180)
- Fix bug caused by optimistic locking [#18390](https://github.com/apache/pulsar/pull/18390)
- Disable balancing based on DirectMemory [#21168](https://github.com/apache/pulsar/pull/21168)
- Fix replicator leak when removeReplicator in NonPersistentTopic [#21205](https://github.com/apache/pulsar/pull/21205)
- Fixed reset for AggregatedNamespaceStats [#21225](https://github.com/apache/pulsar/pull/21225)
- Fixed produce and consume when anonymousUserRole enabled [#21237](https://github.com/apache/pulsar/pull/21237)


### Pulsar IO and Pulsar Functions
- [FN] Fix ProducerConfig cannot update error [#21037](https://github.com/apache/pulsar/pull/21037)
- [FN] Fix the --batch-builder not working error for functions [#21023](https://github.com/apache/pulsar/pull/21023)
- [FN] Fix functions_log4j2.xml delete strategy config [#21215](https://github.com/apache/pulsar/pull/21215)
- [IO] Fix --retain[-key]-ordering not working error for sink [#21060](https://github.com/apache/pulsar/pull/21060)


### CLI
- [Admin] Fix get topic stats fail if a subscription catch up concurrently [#20971](https://github.com/apache/pulsar/pull/20971)

### Others
- [META] Fix deadlock in AutoRecovery [#21010](https://github.com/apache/pulsar/pull/21010)
- [META] Improve fault tolerance of blocking calls by supporting timeout [#21028](https://github.com/apache/pulsar/pull/21028)
- [META] Improve to the ReplicaitonWorker performance by deleting invalid underreplication nodes [#21059](https://github.com/apache/pulsar/pull/21059)
- [META] Fix metadata store deadlock due to BookkeeperInternalCallbacks.Processor [#21159](https://github.com/apache/pulsar/pull/21159)
- [META] Fix PulsarLedgerUnderreplicationManager notify problem [#21161](https://github.com/apache/pulsar/pull/21161)
- [META] Fix pulsar ledger auditor dead lock problem [#21181](https://github.com/apache/pulsar/pull/21181)
- [ML] Persist mark deleted ops to ZK if create cursor ledger was failed [#20935](https://github.com/apache/pulsar/pull/20935)
- [BK] Improve getIsolationGroup by avoid creating arrayList [#20952](https://github.com/apache/pulsar/pull/20952)
- [BK] Fix RocksDB configuration [#21157](https://github.com/apache/pulsar/pull/21157)
- [Proxy] Support disabling metrics endpoint [#21031](https://github.com/apache/pulsar/pull/21031)
- [Proxy] Fix Proxy 502 gateway error when it is configured with Keystore TLS and admin API is called [#21077](https://github.com/apache/pulsar/pull/21077)
- [TXN] Fix the consumer stuck due to deduplicated messages in pending ack state [#21177](https://github.com/apache/pulsar/pull/21177)

### Library updates
- Bump GRPC version to 1.55.3 to fix CVE [#21057](https://github.com/apache/pulsar/pull/21057)
- Bump broker okio version to 3.4.0 [#21064](https://github.com/apache/pulsar/pull/21064)
- Upgrade bookkeeper to 4.16.3 [#21146](https://github.com/apache/pulsar/pull/21146)

> A special thanks to the following contributors who contributed to Pulsar 3.1.1:
> mattisonchao, tuteng, poorbarcode, asafm, hanmz, horizonzy, aloyszhang, hrzzzz, thetumbled, hangc0276, zymap, Technoboy-, erobot, liangyepianzhou, Shawyeok, Demogorgon314, TakaHiR07, coderzc, Apurva007, RobertIndie, Crispy-fried-chicken, jiangpengcheng, michaeljmarshall, lifepuzzlefun, AnonHxy, codelipenghui
