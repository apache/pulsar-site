---
id: pulsar-2.8.1
title: Apache Pulsar 2.8.1 
sidebar_label: Apache Pulsar 2.8.1 
---

## security
Forbid to read other topic's data in managedLedger layer [#11912](https://github.com/apache/pulsar/pull/11912)  
[Security] Upgrade commons-compress to 1.21 [#11345](https://github.com/apache/pulsar/pull/11345)  
[Security] Bump Netty version to 4.1.66.Final [#11344](https://github.com/apache/pulsar/pull/11344)  
[broker] fix `GetTopicsOfNamespace` with binary lookup service not check auth [#11172](https://github.com/apache/pulsar/pull/11172)  
[Security] Use ubuntu:20.04 base image for Pulsar docker images [#11026](https://github.com/apache/pulsar/pull/11026)  

## broker
[Broker] Refine topic level backlog quota policies warning log [#11863](https://github.com/apache/pulsar/pull/11863)  
Fix all web threads will get stuck when deleting the namespace [#11596](https://github.com/apache/pulsar/pull/11596)  
[broker] Improve error logs in BacklogQuotaManager [#11469](https://github.com/apache/pulsar/pull/11469)  
[issue #13351] Solving precise rate limiting does not takes effect [#11446](https://github.com/apache/pulsar/pull/11446)  
[Broker] Fix replicated subscriptions direct memory leak [#11396](https://github.com/apache/pulsar/pull/11396)  
expose broker entry metadata and deliverAtTime to peekMessages/getMes… [#11279](https://github.com/apache/pulsar/pull/11279)  
[Issue-11270] Change ContextClassLoader to NarClassLoader in ProtocolHandler [#11276](https://github.com/apache/pulsar/pull/11276)  
Allow null to be set as namespace level subscription TTL [#11253](https://github.com/apache/pulsar/pull/11253)  
[Ledger] Fix ledger rollover scheduled task [#11116](https://github.com/apache/pulsar/pull/11116)  
fix publish_time not set error when broker entry metadata enable without AppendBrokerTimestampMetadataInterceptor [#11014](https://github.com/apache/pulsar/pull/11014)  
fix parseMessageMetadata error cause by not skip broker entry metadata [#10968](https://github.com/apache/pulsar/pull/10968)  
[broker] Fix issue where Key_Shared consumers could get stuck [#10920](https://github.com/apache/pulsar/pull/10920)  

## build
Source tarball: apply executable file permissions to shell scripts (fixes #10917)  [#11858](https://github.com/apache/pulsar/pull/11858)  
fix java_test_functions build failed [#11829](https://github.com/apache/pulsar/pull/11829)  
fix generate javadoc for kafka-connect-adaptor failed [#11807](https://github.com/apache/pulsar/pull/11807)  
Fix unnecessary user interactions when building pulsar-standalone image [#11623](https://github.com/apache/pulsar/pull/11623)  

## admin
[Issue 11814] fix pulsar admin method:getMessageById. [#11852](https://github.com/apache/pulsar/pull/11852)  
[pulsar-admin] allow create functions with package URL [#11666](https://github.com/apache/pulsar/pull/11666)  
Add compacted topic metrics for TopicStats in CLI [#11564](https://github.com/apache/pulsar/pull/11564)  
Fix time based backlog quota. [#11509](https://github.com/apache/pulsar/pull/11509)  
[Issue 11440]. Add complete metadata for admin.topics().examineMessages [#11443](https://github.com/apache/pulsar/pull/11443)  
Remove duplicate check for replicationClusterSet [#11429](https://github.com/apache/pulsar/pull/11429)  
[Issue 11339] Pulsar Admin List Subscription lists only subscriptions created for Partition-0 when partition specific subscriptions are created [#11355](https://github.com/apache/pulsar/pull/11355)  
[admin] Enable peeking encrypted batch messages [#11244](https://github.com/apache/pulsar/pull/11244)  
[Broker] Fix async response filter [#11052](https://github.com/apache/pulsar/pull/11052)  

## dependency
Upgrade bk version to resolve the BouncyCatle issue [#11759](https://github.com/apache/pulsar/pull/11759)  

## metrics
Expose compaction metrics to Prometheus [#11739](https://github.com/apache/pulsar/pull/11739)  
Fix missing replicator metrics [#11264](https://github.com/apache/pulsar/pull/11264)  

## function
[Functions]Support protobuf schema for pulsar function [#11709](https://github.com/apache/pulsar/pull/11709)  
Fix: Cast exception occurs if function/source/sink type is ByteBuffer [#11611](https://github.com/apache/pulsar/pull/11611)  
[pulsar-io] fix source stats exposing empty exceptions list [#11478](https://github.com/apache/pulsar/pull/11478)  
[pulsar function] set exposePulsarAdmin to true if enabled [#11417](https://github.com/apache/pulsar/pull/11417)  
[pulsar function] add instanceId and fqn into log message properties [#11399](https://github.com/apache/pulsar/pull/11399)  

## topic-policy
Avoid redundant calls for getting the offload policies from the offloader [#11629](https://github.com/apache/pulsar/pull/11629)  
Fix some topic policy operation without backoff [#11560](https://github.com/apache/pulsar/pull/11560)  
Make getTopicPoliciesAsyncWithRetry as a default method [#11518](https://github.com/apache/pulsar/pull/11518)  
Add backoff for setting for getting topic policies. [#11487](https://github.com/apache/pulsar/pull/11487)  
Disable replicate system topic across clusters. [#11376](https://github.com/apache/pulsar/pull/11376)  
When delete a topic, delete the topic policy together. [#11316](https://github.com/apache/pulsar/pull/11316)  
Fix using partitioned topic name to get Policy [#11294](https://github.com/apache/pulsar/pull/11294)  
fix replay topic policy message not work [#11136](https://github.com/apache/pulsar/pull/11136)  
Fix race condition of the SystemTopicBasedTopicPoliciesService [#11097](https://github.com/apache/pulsar/pull/11097)  
fix retention policy in topic policy not work [#11021](https://github.com/apache/pulsar/pull/11021)  
Fix potential data lost on the system topic when topic compaction have not triggered yet [#11003](https://github.com/apache/pulsar/pull/11003)  

## bookkeeper
fix getPreviousPosition npe [#11621](https://github.com/apache/pulsar/pull/11621)  

## test
[Tests] Fix cpp build not failing when tests fail [#11575](https://github.com/apache/pulsar/pull/11575)  
add test for auto-created partitioned system topic [#11545](https://github.com/apache/pulsar/pull/11545)  
[Tests] Reduce integration test memory usage in CI [#11414](https://github.com/apache/pulsar/pull/11414)  
fix flaky test in AdminApiOffloadTest [#11028](https://github.com/apache/pulsar/pull/11028)  
[Tests] Fix the flaky test in the ManagedLedgerTest [#11016](https://github.com/apache/pulsar/pull/11016)  
Make Metadata ZKSessionTest less Flaky [#10955](https://github.com/apache/pulsar/pull/10955)  
Fix the unit tests for the websocket and run tests under websocket group [#10921](https://github.com/apache/pulsar/pull/10921)  

## transaction
Pending ack set managed ledger config true [#11494](https://github.com/apache/pulsar/pull/11494)  
Add getTxnID method in Transaction.java [#11438](https://github.com/apache/pulsar/pull/11438)  
[Transaction] Fix direct memory leak related to commit and abort markers [#11407](https://github.com/apache/pulsar/pull/11407)  
[Transaction] Fix transaction buffer client handle endTxn op when topic or sub have been deleted. [#11304](https://github.com/apache/pulsar/pull/11304)  
[Transaction] Fix the transaction marker doe not deleted as expect. [#11126](https://github.com/apache/pulsar/pull/11126)  
[Transaction] Fix delete sub then delete pending ack. [#11023](https://github.com/apache/pulsar/pull/11023)  
[Transaction] Fix broker init transaction related topic. [#11022](https://github.com/apache/pulsar/pull/11022)  
[Transactions] Prevent NPE in case of closeAsync() without a successful execution of startAsync() [#10948](https://github.com/apache/pulsar/pull/10948)  

## storage
[ManagedLedger] Compress managed ledger info [#11490](https://github.com/apache/pulsar/pull/11490)  

## tieredstorage
Add offload ledger info for admin topics stats [#11465](https://github.com/apache/pulsar/pull/11465)  
[fix] OffloadPoliciesImplBuilder missing method and not implements OffloadPolicies.Builder [#11453](https://github.com/apache/pulsar/pull/11453)  
Remove unused listener to reduce creating executor pool [#11215](https://github.com/apache/pulsar/pull/11215)  

## stats
[stats] Do not expose meaningless stats for publisher [#11454](https://github.com/apache/pulsar/pull/11454)  
Add metrics `storageLogicalSize` for the TopicStats and NamespaceStats [#11430](https://github.com/apache/pulsar/pull/11430)  

## connector
[pulsar io] make KafkaSourceRecord ack() non-blocking to avoid deadlock [#11435](https://github.com/apache/pulsar/pull/11435)  
Pulsar IO: allow Sinks to use native AVRO and JSON [#11322](https://github.com/apache/pulsar/pull/11322)  
[pulsar-io] Refine the key in redis sink when key is null [#11192](https://github.com/apache/pulsar/pull/11192)  

## compaction
Fixed retention of keys in compaction [#11287](https://github.com/apache/pulsar/pull/11287)  

## config
remove duplicated configuration [#11283](https://github.com/apache/pulsar/pull/11283)  

## tool
Print message metadata when getting message by id [#11092](https://github.com/apache/pulsar/pull/11092)  

