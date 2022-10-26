---
id: pulsar-2.7.3
title: Apache Pulsar 2.7.3 
sidebar_label: Apache Pulsar 2.7.3 
---

#### 2021-07-27

#### Broker
- Fix Delayed Messages. [#11374](https://github.com/apache/pulsar/pull/11374)
- Fix missing replicator metrics. [#11264](https://github.com/apache/pulsar/pull/11264)
- Fix branch-2.7 test. [#11254](https://github.com/apache/pulsar/pull/11254)
- Fix broker dispatch byte rate limiter [#11249](https://github.com/apache/pulsar/pull/11249)
- Fix websocket TLS bug [#11243](https://github.com/apache/pulsar/pull/11243)
- Fix init WebSocketService with ClusterData [#11234](https://github.com/apache/pulsar/pull/11234)
- Fix ledger roll over scheduler task [#11226](https://github.com/apache/pulsar/pull/11226)
- Remove unused listener to reduce creating executor pool [#11215](https://github.com/apache/pulsar/pull/11215)
- Make the compaction phase one loop timeout configurable [#11206](https://github.com/apache/pulsar/pull/11206)
- Fix failing auth test. [#11186](https://github.com/apache/pulsar/pull/11186)
- Fix the dead lock when using hasMessageAvailableAsync and readNextAsync [#11183](https://github.com/apache/pulsar/pull/11183)
- Fix compaction entry read exception [#11175](https://github.com/apache/pulsar/pull/11175)
- On multi-topic consumer, we shouldn't keep checking the partitioned metadata [#11168](https://github.com/apache/pulsar/pull/11168)
- Fix replay topic policy message not work [#11136](https://github.com/apache/pulsar/pull/11136)
- Fix broker dispatch byte rate limiter. [#11135](https://github.com/apache/pulsar/pull/11135)
- Change test group to broker for ReplicatorTest and fix the test [#11134](https://github.com/apache/pulsar/pull/11134)
- Fix ledger rollover scheduled task [#11116](https://github.com/apache/pulsar/pull/11116)
- Fix race condition of the SystemTopicBasedTopicPoliciesService [#11097](https://github.com/apache/pulsar/pull/11097)
- Print message metadata when getting message by id [#11092](https://github.com/apache/pulsar/pull/11092)
- Fix flaky test testEnableAndDisableTopicDelayedDelivery [#11009](https://github.com/apache/pulsar/pull/11009)
- Fix potential data lost on the system topic when topic compaction has not triggered yet [#11003](https://github.com/apache/pulsar/pull/11003)
- Fix direct memory leak in getLastMessageId [#10977](https://github.com/apache/pulsar/pull/10977)
- Fix the backlog issue with --precise-backlog=true [#10966](https://github.com/apache/pulsar/pull/10966)
- Fix NonRecoverableLedgerException when get last message ID by Reader [#10957](https://github.com/apache/pulsar/pull/10957)
- Fix compaction not working for system topic [#10941](https://github.com/apache/pulsar/pull/10941)
- Fix issue where Key_Shared consumers could get stuck [#10920](https://github.com/apache/pulsar/pull/10920)
- When the Replicator is enabled, no managedLedger is created when updating the number of partitions [#10910](https://github.com/apache/pulsar/pull/10910)
- Handle multiple topic creation for the same topic-name in broker [#10847](https://github.com/apache/pulsar/pull/10847)
- Release OpAddEntry.data when entry is copied and discarded [#10773](https://github.com/apache/pulsar/pull/10773)
- Fix issue that message ordering could be broken when redelivering messages on Key_Shared subscription [#10762](https://github.com/apache/pulsar/pull/10762)
- Fix solution for preventing race conditions between timeout and completion [#10740](https://github.com/apache/pulsar/pull/10740)
- Cancel scheduled tasks as the first step in closing [#10739](https://github.com/apache/pulsar/pull/10739)
- MINOR: Add error message to setMaxPendingMessagesAcrossPartitions [#10709](https://github.com/apache/pulsar/pull/10709)
- Make PrometheusMetricsTest. testAuthMetrics pass on CI [#10699](https://github.com/apache/pulsar/pull/10699)
- Fix issue where StackOverflowError occurs when trying to redeliver a large number of already acked messages [#10696](https://github.com/apache/pulsar/pull/10696)
- Revert "Creating a topic does not wait for creating cursor of replicators" [#10674](https://github.com/apache/pulsar/pull/10674)
- Use single instance of parser [#10664](https://github.com/apache/pulsar/pull/10664)
- Ensure all the ReadHandle gets properly closed on cache invalidation [#10659](https://github.com/apache/pulsar/pull/10659)
- Fix ConcurrentOpenLongPairRangeSet remove all ranges [#10656](https://github.com/apache/pulsar/pull/10656)
- TopicPoliciesTest.testMaxSubscriptionsFailFast fails [#10640](https://github.com/apache/pulsar/pull/10640)
- Add metrics for non-contiguous deleted messages range [#10638](https://github.com/apache/pulsar/pull/10638)
- Fixed missed ZK caching when fetching a list of namespaces for a tenant [#10594](https://github.com/apache/pulsar/pull/10594)
- Made OpAddEntry.toString() more robust to nulls to prevent NPEs [#10548](https://github.com/apache/pulsar/pull/10548)
- Fix partitioned system topic check bug [#10529](https://github.com/apache/pulsar/pull/10529)
- Make failPendingMessages called from within the ProducerImpl object mutex [#10528](https://github.com/apache/pulsar/pull/10528)
- Fix deadlock on Monitoring thread blocked by LeaderService.isLeader() [#10512](https://github.com/apache/pulsar/pull/10512)
- Fix: Topic loading fails without any error when replicator init fails [#10432](https://github.com/apache/pulsar/pull/10432)
- Fix hasMessageAvailable return true but can't read message [#10414](https://github.com/apache/pulsar/pull/10414)
- Added more unit tests to the JavaInstanceTest class [#10369](https://github.com/apache/pulsar/pull/10369)
- Fix authorization error if partition number of partitioned topic is updated. [#10333](https://github.com/apache/pulsar/pull/10333)
- Fix the inconsistency of AdvertisedAddress [#10312](https://github.com/apache/pulsar/pull/10312)
- Fix missing LoggerFactoryPtr type. [#10164](https://github.com/apache/pulsar/pull/10164)
- Ensure read-lock is not continuously held on a section while iterating over concurrent maps [#9787](https://github.com/apache/pulsar/pull/9787)
- Zookeeper connections monitor data [#9778](https://github.com/apache/pulsar/pull/9778)
- Change getWorkerService method to throw UnsupportedOperationException [#9738](https://github.com/apache/pulsar/pull/9738)
- Fix flaky unit test [#9262](https://github.com/apache/pulsar/pull/9262)
- Supply debug log for OpAddEntry [#9239](https://github.com/apache/pulsar/pull/9239)

#### Dependency upgrade
- Upgrade Jetty to 9.4.42.v20210604 [#10907](https://github.com/apache/pulsar/pull/10907)

#### Proxy
- Enable AutoTopicCreationType partitioned through proxy [#8048](https://github.com/apache/pulsar/pull/8048)

#### Pulsar Admin
- Fix create partitioned topic in replicated namespace [#11140](https://github.com/apache/pulsar/pull/11140)
- Add authoritative flag for topic policy to avoid redirect loop [#11131](https://github.com/apache/pulsar/pull/11131)
- Fix non-persistent topic get partitioned metadata error on discovery [#10806](https://github.com/apache/pulsar/pull/10806)
- Fix kinesis sink backoff class not found [#10744](https://github.com/apache/pulsar/pull/10744)

#### Docker
- K8s Function Name Length Check Allows Invalid StatefulSet  [#10531](https://github.com/apache/pulsar/pull/10531)

#### Functions and Pulsar IO
- Fix kinesis sink connector does not ack messages [#10769](https://github.com/apache/pulsar/pull/10769)
- Remove reference to ProducerSpec from Pulsar Functions GO [#10635](https://github.com/apache/pulsar/pull/10635)
- Process async results in the same Java runnable thread [#10618](https://github.com/apache/pulsar/pull/10618)
