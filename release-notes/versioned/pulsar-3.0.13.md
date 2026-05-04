---
id: pulsar-3.0.13
title: Apache Pulsar 3.0.13
sidebar_label: Apache Pulsar 3.0.13
---

#### 2025-07-31

### Library updates

- [improve][broker][branch-3.0] Upgrade BookKeeper to 4.16.7
- [improve] Upgrade pulsar-client-python to 3.8.0 in Docker image ([#24544](https://github.com/apache/pulsar/pull/24544))
- [improve][misc] Upgrade Netty to 4.1.122.Final and tcnative to 2.0.72.Final ([#24397](https://github.com/apache/pulsar/pull/24397))
- [fix][sec] Upgrade Kafka connector and clients version to 3.9.1 to address CVE-2025-27818 ([#24564](https://github.com/apache/pulsar/pull/24564))
- [fix][sec] Upgrade pulsar-function-go dependencies to address CVE-2025-22868 ([#24547](https://github.com/apache/pulsar/pull/24547))
- [improve][build] replace org.apache.commons.lang to org.apache.commons.lang3 ([#24473](https://github.com/apache/pulsar/pull/24473))

### Broker

- [fix][broker] expose consumer name for partitioned topic stats ([#24360](https://github.com/apache/pulsar/pull/24360))
- [fix][broker] Fix ack hole in cursor for geo-replication ([#20931](https://github.com/apache/pulsar/pull/20931))
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
- [Fix][broker] Limit replication rate based on bytes ([#22674](https://github.com/apache/pulsar/pull/22674))
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

### Pulsar IO and Pulsar Functions

- [fix][io] Acknowledge RabbitMQ message after processing the message successfully ([#24354](https://github.com/apache/pulsar/pull/24354))
- [fix][io] Fix kinesis avro bytes handling ([#24316](https://github.com/apache/pulsar/pull/24316))
- [fix][io][branch-3.0] Backport Kinesis Sink custom native executable support [#23762](https://github.com/apache/pulsar/pull/23762) ([#24349](https://github.com/apache/pulsar/pull/24349))
- [fix][io][branch-3.0]Pulsar-SQL: Fix classcast ex when decode decimal value ([#24317](https://github.com/apache/pulsar/pull/24317))

### Others

- [fix][proxy] Fix default value of connectionMaxIdleSeconds in Pulsar Proxy ([#24529](https://github.com/apache/pulsar/pull/24529))
- [fix][proxy] Fix proxy OOM by replacing TopicName with a simple conversion method ([#24465](https://github.com/apache/pulsar/pull/24465))
- [improve][misc] Optimize topic list hashing so that potentially large String allocation is avoided ([#24525](https://github.com/apache/pulsar/pull/24525))

### Tests & CI

- [fix][build] Add missing &lt;name&gt; to submodules ([#24421](https://github.com/apache/pulsar/pull/24421))
- [fix][build] Fix potential insufficient protostuff-related configs ([#21629](https://github.com/apache/pulsar/pull/21629))
- [fix][ci][branch-3.0] Fix issue in GitHub Actions when /etc/docker/daemon.json file doesn't exist
- [fix][test] Cleanup resources if starting PulsarService fails in PulsarTestContext ([#21467](https://github.com/apache/pulsar/pull/21467))
- [fix][test] Fix flaky AutoScaledReceiverQueueSizeTest.testNegativeClientMemory ([#24324](https://github.com/apache/pulsar/pull/24324))
- [fix][test] fix flaky GrowableArrayBlockingQueueTest.testPollBlockingThreadsTermination ([#24576](https://github.com/apache/pulsar/pull/24576))
- [fix][test] Fix flaky test SimpleProducerConsumerStatTest#testPartitionTopicStats ([#21642](https://github.com/apache/pulsar/pull/21642))
- [fix][test] Move ExtensibleLoadManagerImplTest to flaky tests ([#22495](https://github.com/apache/pulsar/pull/22495))
- [fix][test][branch-3.0] Correct topic policy loading logic and improve related tests ([#24451](https://github.com/apache/pulsar/pull/24451))
- [fix][test]fix flaky test BrokerServiceAutoTopicCreationTest.testDynamicConfigurationTopicAutoCreationPartitioned ([#24505](https://github.com/apache/pulsar/pull/24505))
- [improve][test] Fix flaky test SimpleProducerConsumerStatTest#testMsgRateExpired ([#20629](https://github.com/apache/pulsar/pull/20629))
- [improve][test] Remove EntryCacheCreator from ManagedLedgerFactoryImpl ([#24552](https://github.com/apache/pulsar/pull/24552))
- [improve][test][branch-3.0] Backport MockedPulsarServiceBaseTest.registerCloseable to branch-3.0

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.0.12...v3.0.13).
