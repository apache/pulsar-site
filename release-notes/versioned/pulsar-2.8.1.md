---
id: pulsar-2.8.1
title: Apache Pulsar 2.8.1 
sidebar_label: Apache Pulsar 2.8.1 
---

#### 2021-09-10
### Broker
- Fix the issue of all web threads get stuck when deleting a namespace [#11596](https://github.com/apache/pulsar/pull/11596)
- Improve error logs in BacklogQuotaManager [#11469](https://github.com/apache/pulsar/pull/11469)
- Solve the issue of precise rate limiting does not take effect [#11446](https://github.com/apache/pulsar/pull/11446)
- Fix replicated subscriptions direct memory leak [#11396](https://github.com/apache/pulsar/pull/11396)
- Change ContextClassLoader to NarClassLoader in ProtocolHandler [#11276](https://github.com/apache/pulsar/pull/11276)
- Fix the issue of ledger rollover scheduled tasks were executed before reaching the ledger maximum rollover time [#11116](https://github.com/apache/pulsar/pull/11116)
- Fix publish_time not set error when broker entry metadata enable without AppendBrokerTimestampMetadataInterceptor [#11014](https://github.com/apache/pulsar/pull/11014)
- Fix parseMessageMetadata error cause by not skip broker entry metadata [#10968](https://github.com/apache/pulsar/pull/10968)
- Fix issue where Key_Shared consumers could get stuck [#10920](https://github.com/apache/pulsar/pull/10920)
- Fix throwable exception not thrown [#10863](https://github.com/apache/pulsar/pull/10863)
- Handle multiple topic creation for the same topic-name in broker [#10847](https://github.com/apache/pulsar/pull/10847)
- Add REST API to enable or disable replicated subscriptions [#10790](https://github.com/apache/pulsar/pull/10790)
- Fix issue that message ordering could be broken when redelivering messages on Key_Shared subscription [#10762](https://github.com/apache/pulsar/pull/10762)
- Fix set-publish-rate when using preciseTopicPublishRateLimiterEnable=true [#10384](https://github.com/apache/pulsar/pull/10384)
- Upgrade BookKeeper version to resolve the BouncyCastle issue [#11759](https://github.com/apache/pulsar/pull/11759)
- Fix getPreviousPosition NPE [#11621](https://github.com/apache/pulsar/pull/11621)
- Remove duplicated configuration [#11283](https://github.com/apache/pulsar/pull/11283)
- Source tarball: apply executable file permissions to shell scripts [#11858](https://github.com/apache/pulsar/pull/11858)
- Fix java_test_functions build failed [#11829](https://github.com/apache/pulsar/pull/11829)
- Fix generate javadoc for kafka-connect-adaptor failed [#11807](https://github.com/apache/pulsar/pull/11807)
- Fix unnecessary user interactions when building pulsar-standalone image [#11623](https://github.com/apache/pulsar/pull/11623)
- Do not expose meaningless stats for publisher [#11454](https://github.com/apache/pulsar/pull/11454)
- Add metrics storageLogicalSize for the TopicStats and NamespaceStats [#11430](https://github.com/apache/pulsar/pull/11430)
- Compress managed ledger info [#11490](https://github.com/apache/pulsar/pull/11490)
- Print message metadata when getting message by id [#11092](https://github.com/apache/pulsar/pull/11092)
- Query parameter "negativeAckRedeliveryDelay" should be effective even if DLQ is disabled [#11495](https://github.com/apache/pulsar/pull/11495)
- Fix websocket TLS bug [#11243](https://github.com/apache/pulsar/pull/11243)
- Fix the Pulsar Proxy flaky test (Collector already registered that provides name: jvm_memory_direct_bytes_used) [#11900](https://github.com/apache/pulsar/pull/11900)
- Fix flaky test testReacquireLocksAfterSessionLost [#11815](https://github.com/apache/pulsar/pull/11815)
- Fix flaky test testUpdateDynamicLocalConfiguration [#11115](https://github.com/apache/pulsar/pull/11115)
- Fix flaky test testBrokerRanking [#11114](https://github.com/apache/pulsar/pull/11114)
- Fix flaky test in AdminApiOffloadTest [#11028](https://github.com/apache/pulsar/pull/11028)
- Fix the flaky test in the ManagedLedgerTest [#11016](https://github.com/apache/pulsar/pull/11016)
- Make Metadata ZKSessionTest less Flaky [#10955](https://github.com/apache/pulsar/pull/10955)
- Make MetadataCacheTest reliable. [#10877](https://github.com/apache/pulsar/pull/10877)
- Fix pulsar_standalone docker image build failed [#11862](https://github.com/apache/pulsar/pull/11862)
- Producer getting producer busy is removing existing producer from list [#11804](https://github.com/apache/pulsar/pull/11804)
- Revert PR 11594 to avoid copy data to direct buffer [#11792](https://github.com/apache/pulsar/pull/11792)
- Upgrade aircompressor to 0.20 [#11790](https://github.com/apache/pulsar/pull/11790)
- Fix wrappedBuffer always using the same block of memory [#11782](https://github.com/apache/pulsar/pull/11782)
- Fix com.squareup.okhttp-okhttp-2.7.4.jar unaccounted for in LICENSE bug [#11769](https://github.com/apache/pulsar/pull/11769)
- Handle NPE and memory leak when full key range isn't covered with active consumers [#11749](https://github.com/apache/pulsar/pull/11749)
- Call .release() when discarding entry to prevent direct memory leak [#11748](https://github.com/apache/pulsar/pull/11748)
- Avoid duplicated disconnecting producers after fail to add entry[#11741](https://github.com/apache/pulsar/pull/11741)
- Expose compaction metrics to Prometheus [#11739](https://github.com/apache/pulsar/pull/11739)
- Fix the topic in a fenced state and can not recover[#11737](https://github.com/apache/pulsar/pull/11737)
- Remove subscription when closing Reader on non-persistent topics [#11731](https://github.com/apache/pulsar/pull/11731)
- Fix branch-2.8 cherry-pick issue. [#11694](https://github.com/apache/pulsar/pull/11694)
- KeyShared dispatcher on non-persistent topics was not respecting consumer flow-control [#11692](https://github.com/apache/pulsar/pull/11692)
- Fix the bug, can not update topic when the update topicName is contained by an existed topic as a part [#11686](https://github.com/apache/pulsar/pull/11686)
- If a topic has compaction policies configured, we must ensure the subscription is always pre-created [#11672](https://github.com/apache/pulsar/pull/11672)
- Fix testSetReplicatedSubscriptionStatus run failed [#11661](https://github.com/apache/pulsar/pull/11661)
- Fix Pulsar didn't respond error messages when throw InterceptException [#11650](https://github.com/apache/pulsar/pull/11650)
- Fix license mismatch [#11645](https://github.com/apache/pulsar/pull/11645)
- Remove unnecessary jar name in LICENSE files [#11644](https://github.com/apache/pulsar/pull/11644)
- Fix java.lang.NoSuchMethodError: java.nio.ByteBuffer.position(I)Ljava/nio/ByteBuffer when enabling topic metadata compression [#11594](https://github.com/apache/pulsar/pull/11594)
- Fix decode compression managedLedgerInfo data [#11569](https://github.com/apache/pulsar/pull/11569)
- Fix data lost when using earliest position to subscribe to a topic [#11547](https://github.com/apache/pulsar/pull/11547)
- Add test for auto-created partitioned system topic [#11545](https://github.com/apache/pulsar/pull/11545)
- Replace orElse with orElseGet to avoid calling too many times. [#11542](https://github.com/apache/pulsar/pull/11542)
- Fix the schema deletion when deleting topic with delete schema [#11501](https://github.com/apache/pulsar/pull/11501)
- Add metrics for writing or reading size of cursor [#11500](https://github.com/apache/pulsar/pull/11500)
- Do not create system topic for heartbeat namespace [#11499](https://github.com/apache/pulsar/pull/11499)
- Add additional servlet support to broker [#11498](https://github.com/apache/pulsar/pull/11498)
- Add metrics [AddEntryWithReplicasBytesRate] for namespace [#11472](https://github.com/apache/pulsar/pull/11472)
- Deep copy the tenants to avoid concurrent sort exception [#11463](https://github.com/apache/pulsar/pull/11463)
- Reduce the probability of cache inconsistencies [#11423](https://github.com/apache/pulsar/pull/11423)
- Reduce integration test memory usage in CI [#11414](https://github.com/apache/pulsar/pull/11414)
- Swap getTopicReference(topic) with serviceUnit.includes to reduce calling getTopicReference [#11405](https://github.com/apache/pulsar/pull/11405)
- Invalidate the read handle after all cursors are consumed[#11389](https://github.com/apache/pulsar/pull/11389)
- Parallel Precise Publish Rate Limiting Fix [#11372](https://github.com/apache/pulsar/pull/11372)
- Fix concurrency issues in NarUnpacker [#11343](https://github.com/apache/pulsar/pull/11343)
- Close the replicator and replication client when delete cluster[#11342](https://github.com/apache/pulsar/pull/11342)
- Add multi roles support for authorization [#11341](https://github.com/apache/pulsar/pull/11341)
- Fix NPE when unloading persistent partitioned topic [#11310](https://github.com/apache/pulsar/pull/11310)
- Fixed retention of keys in compaction [#11287](https://github.com/apache/pulsar/pull/11287)
- Fix missing replicator metrics [#11264](https://github.com/apache/pulsar/pull/11264)
- Simplify managedLedger retention trim logic [#11255](https://github.com/apache/pulsar/pull/11255)
- Fix retention size policy delete too much ledgers [#11242](https://github.com/apache/pulsar/pull/11242)
- Fix init WebSocketService with ClusterData [#11234](https://github.com/apache/pulsar/pull/11234)
- Make the compaction phase one loop timeout configurable [#11206](https://github.com/apache/pulsar/pull/11206)
- Fixed using CommandSubscribe.getConsumerName() without checking [#11199](https://github.com/apache/pulsar/pull/11199)
- Fix some typos of the PersistentTopics [#11187](https://github.com/apache/pulsar/pull/11187)
- Fix failing auth test. [#11186](https://github.com/apache/pulsar/pull/11186)
- Fix the deadlock when using hasMessageAvailableAsync and readNextAsync [#11183](https://github.com/apache/pulsar/pull/11183)
- Fix compaction entry read exception [#11175](https://github.com/apache/pulsar/pull/11175)
- Set -Dio.netty.tryReflectionSetAccessible=true for pulsar processes [#11138](https://github.com/apache/pulsar/pull/11138)
- Fix broker dispatch byte rate limiter. [#11135](https://github.com/apache/pulsar/pull/11135)
- Change test group to broker for ReplicatorTest and fix the test [#11134](https://github.com/apache/pulsar/pull/11134)
- Fix subscription permission not working in reset cursor [#11132](https://github.com/apache/pulsar/pull/11132)
- Fix Flaky-test: [TopicFromMessageTest].[testMultiTopicConsumerBatchShortName [#11125](https://github.com/apache/pulsar/pull/11125)
- Fix the timestamp description for resetCursor [#11121](https://github.com/apache/pulsar/pull/11121)
- Fix MsgDropRate missing from NonPersistentTopics stats output. [#11119](https://github.com/apache/pulsar/pull/11119)
- Fix GetListInBundle return all Topics in bundle [#11110](https://github.com/apache/pulsar/pull/11110)
- Added missing configuration entries [#11095](https://github.com/apache/pulsar/pull/11095)
- Fix inputs to return a list of topic [#11094](https://github.com/apache/pulsar/pull/11094)
- Add authoritative flag for topic policy to avoid redirect loop [#11051](https://github.com/apache/pulsar/pull/11051)
- Made the PulsarClusterMetadataTeardown deletes idempotent [#11042](https://github.com/apache/pulsar/pull/11042)
- Fix flaky test testEnableAndDisableTopicDelayedDelivery [#11009](https://github.com/apache/pulsar/pull/11009)
- Do not expose meaningless stats for consumers[#11005](https://github.com/apache/pulsar/pull/11005)
- Fix NoClassDefFoundError - io.airlift.compress.lz4.UnsafeUtil [#10983](https://github.com/apache/pulsar/pull/10983)
- Fix direct memory leak in getLastMessageId [#10977](https://github.com/apache/pulsar/pull/10977)
- Fix the backlog issue with --precise-backlog=true [#10966](https://github.com/apache/pulsar/pull/10966)
- Fix create partitioned topic in replicated namespace [#10963](https://github.com/apache/pulsar/pull/10963)
- Fix incorrect port of advertisedListener [#10961](https://github.com/apache/pulsar/pull/10961)
- Fix NonRecoverableLedgerException when get last message ID by Reader [#10957](https://github.com/apache/pulsar/pull/10957)
- Fix compaction not working for system topic [#10941](https://github.com/apache/pulsar/pull/10941)
- Fix peek message failure when broker entry metadata is enabled [#10924](https://github.com/apache/pulsar/pull/10924)
- Fix the unit tests for the websocket and run tests under websocket group [#10921](https://github.com/apache/pulsar/pull/10921)
- When the Replicator is enabled, no managedLedger is created when updating the number of partitions [#10910](https://github.com/apache/pulsar/pull/10910)
- Correct code example in transaction doc [#10901](https://github.com/apache/pulsar/pull/10901)
- When topic does not exist, optimize the prompt message [#10845](https://github.com/apache/pulsar/pull/10845)

### Topic Policy
- Refine topic level backlog quota policies warning log [#11863](https://github.com/apache/pulsar/pull/11863)
- Avoid redundant calls for getting the offload policies from the offloader [#11629](https://github.com/apache/pulsar/pull/11629)
- Fix some topic policy operation without backoff [#11560](https://github.com/apache/pulsar/pull/11560)
- Add backoff for setting for getting topic policies[#11487](https://github.com/apache/pulsar/pull/11487)
- Disable replicating system topic across clusters[#11376](https://github.com/apache/pulsar/pull/11376)
- When deleting a topic, delete the topic policy together[#11316](https://github.com/apache/pulsar/pull/11316)
- Fix using partitioned topic name to get Policy [#11294](https://github.com/apache/pulsar/pull/11294)
- Fix replay topic policy message not work [#11136](https://github.com/apache/pulsar/pull/11136)
- Fix race condition of the SystemTopicBasedTopicPoliciesService [#11097](https://github.com/apache/pulsar/pull/11097)
- Fix retention policy in topic policy not work [#11021](https://github.com/apache/pulsar/pull/11021)
- Fix potential data lost on the system topic when topic compaction have not triggered yet [#11003](https://github.com/apache/pulsar/pull/11003)
- Make getTopicPoliciesAsyncWithRetry as a default method [#11518](https://github.com/apache/pulsar/pull/11518)

### Proxy
- Fixed Proxy leaking outbound connections [#11848](https://github.com/apache/pulsar/pull/11848)

### Functions
- Support protobuf schema for Pulsar function [#11709](https://github.com/apache/pulsar/pull/11709)
- Fix cast exception occurs if function/source/sink type is ByteBuffer [#11611](https://github.com/apache/pulsar/pull/11611)
- Fix source stats exposing empty exceptions list [#11478](https://github.com/apache/pulsar/pull/11478)
- Set exposePulsarAdmin to true if enabled [#11417](https://github.com/apache/pulsar/pull/11417)
- Add instanceId and fqn into log message properties [#11399](https://github.com/apache/pulsar/pull/11399)
- Fix tls_validate_hostname is not supported in python functions runtime [#11087](https://github.com/apache/pulsar/pull/11087)
- Use the subscription name defined in function details [#11076](https://github.com/apache/pulsar/pull/11076)
- Fix build failure because of spotbugs [#10792](https://github.com/apache/pulsar/pull/10792)
- Use keyword argument to create pulsar_client [#11080](https://github.com/apache/pulsar/pull/11080)

### Security
- Upgrade commons-compress to 1.21 [#11345](https://github.com/apache/pulsar/pull/11345)
- Fix GetTopicsOfNamespace with binary lookup service not check auth [#11172](https://github.com/apache/pulsar/pull/11172)
- Use ubuntu:20.04 base image for Pulsar docker images [#11026](https://github.com/apache/pulsar/pull/11026)
- Upgrade vertx to 3.9.8 to address CVE-2019-17640 [#10889](https://github.com/apache/pulsar/pull/10889)
- Exclude and remove freebuilder dependency [#10869](https://github.com/apache/pulsar/pull/10869)
- Upgrade bouncycastle version to 1.69 [#10867](https://github.com/apache/pulsar/pull/10867)
- Upgrade K8s client-java to 12.0.1 [#10866](https://github.com/apache/pulsar/pull/10866)
- Upgrade caffeine to 2.9.1 [#10865](https://github.com/apache/pulsar/pull/10865)
- Upgrade commons-codec to 1.15 [#10864](https://github.com/apache/pulsar/pull/10864)
- Load credentials from secrets for Kinesis connectors [#10822](https://github.com/apache/pulsar/pull/10822)
- Forbid to read other topic's data in managedLedger layer [#11912](https://github.com/apache/pulsar/pull/11912)
- Bump Netty version to 4.1.66.Final [#11344](https://github.com/apache/pulsar/pull/11344)

### Transaction
- Pending ack set managed ledger config true [#11494](https://github.com/apache/pulsar/pull/11494)
- Add getTxnID method in Transaction.java [#11438](https://github.com/apache/pulsar/pull/11438)
- Fix direct memory leak related to commit and abort markers [#11407](https://github.com/apache/pulsar/pull/11407)
- Fix transaction buffer client handle endTxn op when topic or sub have been deleted[#11304](https://github.com/apache/pulsar/pull/11304)
- Fix the transaction markers that are not deleted as expected[#11126](https://github.com/apache/pulsar/pull/11126)
- Fix delete sub then delete pending ack[#11023](https://github.com/apache/pulsar/pull/11023)
- Prevent NPE in case of closeAsync() without a successful execution of startAsync() [#10948](https://github.com/apache/pulsar/pull/10948)
- Fixed possible deadlock in the initialization of MLTransactionLog [#11194](https://github.com/apache/pulsar/pull/11194)
- Fix broker init transaction related topic. [#11022](https://github.com/apache/pulsar/pull/11022)

### Pulsar Admin
- Fix pulsar admin method\:getMessageById[#11852](https://github.com/apache/pulsar/pull/11852)
- Allow create functions with package URL [#11666](https://github.com/apache/pulsar/pull/11666)
- Add compacted topic metrics for TopicStats in CLI [#11564](https://github.com/apache/pulsar/pull/11564)
- Fix time based backlog quota. [#11509](https://github.com/apache/pulsar/pull/11509)
- Add offload ledger info for admin topics stats [#11465](https://github.com/apache/pulsar/pull/11465)
- Add complete metadata for admin.topics().examineMessages [#11443](https://github.com/apache/pulsar/pull/11443)
- Remove duplicate check for replicationClusterSet [#11429](https://github.com/apache/pulsar/pull/11429)
- Pulsar Admin List Subscription lists only subscriptions created for Partition-0 when partition specific subscriptions are created [#11355](https://github.com/apache/pulsar/pull/11355)
- Expose broker entry metadata and deliverAtTime to peekMessages/getMessages [#11279](https://github.com/apache/pulsar/pull/11279)
- Allow null to be set as namespace level subscription TTL [#11253](https://github.com/apache/pulsar/pull/11253)
- Enable peeking encrypted batch messages [#11244](https://github.com/apache/pulsar/pull/11244)
- Fix async response filter [#11052](https://github.com/apache/pulsar/pull/11052)
- Add error log for schema admin operation [#11427](https://github.com/apache/pulsar/pull/11427)

### Tiered Storage
- OffloadPoliciesImplBuilder missing method and not implements OffloadPolicies.Builder [#11453](https://github.com/apache/pulsar/pull/11453)
- Remove unused listener to reduce creating executor pool [#11215](https://github.com/apache/pulsar/pull/11215)

### Pulsar IO
- Make KafkaSourceRecord ack() non-blocking to avoid deadlock [#11435](https://github.com/apache/pulsar/pull/11435)
- Allow Sinks to use native AVRO and JSON [#11322](https://github.com/apache/pulsar/pull/11322)
- Refine the key in redis sink when key is null [#11192](https://github.com/apache/pulsar/pull/11192)
- Change the nar package name for pulsar-io-kafka-connect-adaptor [#10976](https://github.com/apache/pulsar/pull/10976)
