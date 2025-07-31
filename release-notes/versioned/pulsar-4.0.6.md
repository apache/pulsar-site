---
id: pulsar-4.0.6
title: Apache Pulsar 4.0.6
sidebar_label: Apache Pulsar 4.0.6
---

#### 2025-07-31

### Known issues

- The changes from PR [#24533](https://github.com/apache/pulsar/pull/24533) included in this release might break proxy authorization scenarios for some custom implementations of AuthorizationProvider, where both the proxy's auth data (`authDataSource`) and the original client's auth data (`originalAuthDataSource`) need to be validated separately.
  - A fix will be provided in the next release with [#24593](https://github.com/apache/pulsar/pull/24593)

### Library updates

- [improve] Upgrade pulsar-client-python to 3.8.0 in Docker image ([#24544](https://github.com/apache/pulsar/pull/24544))
- [improve][misc] Upgrade Netty to 4.1.122.Final and tcnative to 2.0.72.Final ([#24397](https://github.com/apache/pulsar/pull/24397))
- [fix][sec] Upgrade Kafka connector and clients version to 3.9.1 to address CVE-2025-27818 ([#24564](https://github.com/apache/pulsar/pull/24564))
- [fix][sec] Upgrade pulsar-function-go dependencies to address CVE-2025-22868 ([#24547](https://github.com/apache/pulsar/pull/24547))
- [improve][build] replace org.apache.commons.lang to org.apache.commons.lang3 ([#24473](https://github.com/apache/pulsar/pull/24473))
- [improve][build] Bump org.apache.commons:commons-lang3 from 3.17.0 to 3.18.0 ([#24514](https://github.com/apache/pulsar/pull/24514))
- [improve][broker] Upgrade bookkeeper to 4.17.2/commons-configuration to 2.x/grpc to 1.72.0 and enable ZooKeeper client to establish connection in read-only mode ([#24468](https://github.com/apache/pulsar/pull/24468))
- [fix][sec] Remove dependency on out-dated commons-configuration 1.x ([#24562](https://github.com/apache/pulsar/pull/24562))
- [improve][misc] Upgrade RE2/J to 1.8 ([#24530](https://github.com/apache/pulsar/pull/24530))

### Broker

- [fix][broker] expose consumer name for partitioned topic stats ([#24360](https://github.com/apache/pulsar/pull/24360))
- [fix][broker] Fix Broker OOM due to too many waiting cursors and reuse a recycled OpReadEntry incorrectly ([#24551](https://github.com/apache/pulsar/pull/24551))
- [fix][broker] Fix deduplication replay might never complete for exceptions ([#24511](https://github.com/apache/pulsar/pull/24511))
- [fix][broker] Fix duplicate increment of ADD_OP_COUNT_UPDATER in OpAddEntry ([#24506](https://github.com/apache/pulsar/pull/24506))
- [fix][broker] Fix exclusive producer creation when last shared producer closes ([#24516](https://github.com/apache/pulsar/pull/24516))
- [fix][broker] Fix issue that topic policies was deleted after a sub topic deleted, even if the partitioned topic still exists ([#24350](https://github.com/apache/pulsar/pull/24350))
- [fix][broker] Fix ManagedCursor state management race conditions and lifecycle issues ([#24569](https://github.com/apache/pulsar/pull/24569))
- [fix][broker] Fix matching of topicsPattern for topic names which contain non-ascii characters ([#24543](https://github.com/apache/pulsar/pull/24543))
- [fix][broker] Fix maxTopicsPerNamespace might report a false failure ([#24560](https://github.com/apache/pulsar/pull/24560))
- [fix][broker] Fix the non-persistenttopic's replicator always get error "Producer send queue is full" if set a small value of the config replicationProducerQueueSize ([#24424](https://github.com/apache/pulsar/pull/24424))
- [fix][broker] Ignore metadata changes when broker is not in the Started state ([#24352](https://github.com/apache/pulsar/pull/24352))
- [fix][broker] No longer allow creating subscription that contains slash ([#23594](https://github.com/apache/pulsar/pull/23594))
- [fix][broker] Once the cluster is configured incorrectly, the broker maintains the incorrect cluster configuration even if you removed it ([#24419](https://github.com/apache/pulsar/pull/24419))
- [fix][broker] replication does not work due to the mixed and repetitive sending of user messages and replication markers ([#24453](https://github.com/apache/pulsar/pull/24453))
- [fix][broker] Resolve the issue of frequent updates in message expiration deletion rate ([#24190](https://github.com/apache/pulsar/pull/24190))
- [fix][broker]excessive replication speed leads to error: Producer send queue is full ([#24189](https://github.com/apache/pulsar/pull/24189))
- [fix][broker]Fix deadlock when compaction and topic deletion execute concurrently ([#24366](https://github.com/apache/pulsar/pull/24366))
- [fix][broker]Global topic policies do not affect after unloading topic and persistence global topic policies never affect ([#24279](https://github.com/apache/pulsar/pull/24279))
- [fix][broker]Non-global topic policies and global topic policies overwrite each other ([#24286](https://github.com/apache/pulsar/pull/24286))
- [fix] Prevent IllegalStateException: Field 'message' is not set ([#24472](https://github.com/apache/pulsar/pull/24472))
- [fix][ml] Cursor ignores the position that has an empty ack-set if disabled deletionAtBatchIndexLevelEnabled ([#24406](https://github.com/apache/pulsar/pull/24406))
- [fix][ml] Enhance OpFindNewest to support skip non-recoverable data ([#24441](https://github.com/apache/pulsar/pull/24441))
- [fix][ml] Fix asyncReadEntries might never complete if empty entries are read from BK ([#24515](https://github.com/apache/pulsar/pull/24515))
- [fix][ml] Fix ManagedCursorImpl.individualDeletedMessages concurrent issue ([#24338](https://github.com/apache/pulsar/pull/24338))
- [fix][ml] Fix the possibility of message loss or disorder when ML PayloadProcessor processing fails ([#24522](https://github.com/apache/pulsar/pull/24522))
- [fix][ml]Received more than once callback when calling cursor.delete ([#24405](https://github.com/apache/pulsar/pull/24405))
- [fix][ml]Revert a behavior change of releasing idle offloaded ledger handle: only release idle BlobStoreBackedReadHandle ([#24384](https://github.com/apache/pulsar/pull/24384))
- [fix][ml]Still got BK ledger, even though it has been deleted after offloaded ([#24432](https://github.com/apache/pulsar/pull/24432))
- [fix][offload] Complete the future outside of the reading loop in BlobStoreBackedReadHandleImplV2.readAsync ([#24331](https://github.com/apache/pulsar/pull/24331))
- [fix][txn] Fix deadlock when loading transaction buffer snapshot ([#24401](https://github.com/apache/pulsar/pull/24401))
- [improve][broker] Add managedCursor/LedgerInfoCompressionType settings to broker.conf ([#24391](https://github.com/apache/pulsar/pull/24391))
- [improve][broker] Added synchronized for sendMessages in Non-Persistent message dispatchers ([#24386](https://github.com/apache/pulsar/pull/24386))
- [improve][broker] change to warn log level for ack validation error ([#24459](https://github.com/apache/pulsar/pull/24459))
- [improve][broker] Deny removing local cluster from topic level replicated cluster policy ([#24351](https://github.com/apache/pulsar/pull/24351))
- [improve][broker] Improve the log when namespace bundle is not available ([#24434](https://github.com/apache/pulsar/pull/24434))
- [improve][broker] Make maxBatchDeletedIndexToPersist configurable and document other related configs ([#24392](https://github.com/apache/pulsar/pull/24392))
- [improve][broker]Improve the log when encountered in-flight read limitation ([#24359](https://github.com/apache/pulsar/pull/24359))
- [improve][ml] Offload ledgers without check ledger length ([#24344](https://github.com/apache/pulsar/pull/24344))
- [improve][ml]Release idle offloaded read handle only the ref count is 0 ([#24381](https://github.com/apache/pulsar/pull/24381))
- [improve][offloaders] Automatically evict Offloaded Ledgers from memory ([#19783](https://github.com/apache/pulsar/pull/19783))
- [fix][broker] Fix NPE when getting delayed delivery policy ([#24512](https://github.com/apache/pulsar/pull/24512))
- [fix][broker] Fix the wrong cache name ([#24407](https://github.com/apache/pulsar/pull/24407))
- [fix][broker] Fix wrong backlog age metrics when the mark delete position point to a deleted ledger ([#24518](https://github.com/apache/pulsar/pull/24518))
- [fix][broker][branch-4.0] Revert "[improve][broker] Reduce memory occupation of the delayed message queue ([#23611](https://github.com/apache/pulsar/pull/23611))" ([#24429](https://github.com/apache/pulsar/pull/24429))
- [fix][broker]Data lost due to conflict loaded up a topic for two brokers, when enabled ServiceUnitStateMetadataStoreTableViewImpl ([#24478](https://github.com/apache/pulsar/pull/24478))
- [fix][broker]Fix thread safety issues in BucketDelayedDeliveryTracker with StampedLock optimistic reads ([#24542](https://github.com/apache/pulsar/pull/24542))
- [improve][broker] Enable concurrent processing of pending read Entries to avoid duplicate Reads ([#24346](https://github.com/apache/pulsar/pull/24346))
- [improve][broker][branch-4.0] Update to Oxia 0.6.0 and use new group-id ([#24454](https://github.com/apache/pulsar/pull/24454))
- [refactor][broker] Expose the managedLedger field for the sub class ([#24448](https://github.com/apache/pulsar/pull/24448))

### Client

- [fix][client] Close orphan producer or consumer when the creation is interrupted ([#24539](https://github.com/apache/pulsar/pull/24539))
- [fix][client] Fix ClientCnx handleSendError NPE ([#24517](https://github.com/apache/pulsar/pull/24517))
- [fix][client] Fix issue in auto releasing of idle connection with topics pattern consumer ([#24528](https://github.com/apache/pulsar/pull/24528))
- [fix][client] Fix some potential resource leak ([#24402](https://github.com/apache/pulsar/pull/24402))
- [fix][client] NPE in MultiTopicsConsumerImpl.negativeAcknowledge ([#24476](https://github.com/apache/pulsar/pull/24476))
- [fix][client] Prevent NPE when seeking with null topic in TopicMessageId ([#24404](https://github.com/apache/pulsar/pull/24404))
- [fix][client][branch-4.0] Partitioned topics are unexpectedly created by client after deletion ([#24554](https://github.com/apache/pulsar/pull/24554)) ([#24571](https://github.com/apache/pulsar/pull/24571))
- [fix][txn] Fix negative unacknowledged messages in transactions by ensuring that the batch size is added into CommandAck ([#24443](https://github.com/apache/pulsar/pull/24443))
- [improve][client] Terminate consumer.receive() when consumer is closed ([#24550](https://github.com/apache/pulsar/pull/24550))
- [fix][client] Fix consumer not returning encrypted messages on decryption failure with compression enabled ([#24356](https://github.com/apache/pulsar/pull/24356))

### Pulsar IO and Pulsar Functions

- [fix][io] Acknowledge RabbitMQ message after processing the message successfully ([#24354](https://github.com/apache/pulsar/pull/24354))
- [fix][io] Fix kinesis avro bytes handling ([#24316](https://github.com/apache/pulsar/pull/24316))
- [fix][io] Fix data loss issue in Kinesis source connector ([#24501](https://github.com/apache/pulsar/pull/24501))
- [fix][io] Fix Kinesis checkpoint mechanism to prevent data duplication ([#24534](https://github.com/apache/pulsar/pull/24534))
- [fix][io] Make record properties configurable for kinesis source ([#24495](https://github.com/apache/pulsar/pull/24495))

### Others

- [fix][proxy] Fix default value of connectionMaxIdleSeconds in Pulsar Proxy ([#24529](https://github.com/apache/pulsar/pull/24529))
- [fix][proxy] Fix proxy OOM by replacing TopicName with a simple conversion method ([#24465](https://github.com/apache/pulsar/pull/24465))
- [improve][misc] Optimize topic list hashing so that potentially large String allocation is avoided ([#24525](https://github.com/apache/pulsar/pull/24525))
- [fix][ws] Fix WebSocket authorization issue due to originalPrincipal must be provided ([#24533](https://github.com/apache/pulsar/pull/24533))
- [fix][cli] Fix pulsar-shell cannot produce message with quotes and space ([#24320](https://github.com/apache/pulsar/pull/24320))
- [improve][client] Add `startTimestamp` and `endTimestamp` for consuming message in client cli ([#24521](https://github.com/apache/pulsar/pull/24521))
- [fix][misc] Fix topics pattern consumer backwards compatibility ([#24537](https://github.com/apache/pulsar/pull/24537))
- [improve] Enable metrics for all broker caches ([#24365](https://github.com/apache/pulsar/pull/24365))

### Tests & CI

- [fix][build] Add missing &lt;name&gt; to submodules ([#24421](https://github.com/apache/pulsar/pull/24421))
- [fix][test] Fix flaky AutoScaledReceiverQueueSizeTest.testNegativeClientMemory ([#24324](https://github.com/apache/pulsar/pull/24324))
- [fix][test] fix flaky GrowableArrayBlockingQueueTest.testPollBlockingThreadsTermination ([#24576](https://github.com/apache/pulsar/pull/24576))
- [fix][test]fix flaky test BrokerServiceAutoTopicCreationTest.testDynamicConfigurationTopicAutoCreationPartitioned ([#24505](https://github.com/apache/pulsar/pull/24505))
- [improve][test] Remove EntryCacheCreator from ManagedLedgerFactoryImpl ([#24552](https://github.com/apache/pulsar/pull/24552))
- [improve][ci] Fixes [#23079](https://github.com/apache/pulsar/pull/23079): Checkstyle checks applied to all test ([#24492](https://github.com/apache/pulsar/pull/24492))
- [improve][test] Add test for concurrent processing of pending read Entries ([#24519](https://github.com/apache/pulsar/pull/24519))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.5...v4.0.6).
