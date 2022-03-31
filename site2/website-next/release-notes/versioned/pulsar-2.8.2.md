---
id: pulsar-2.8.2
title: Apache Pulsar 2.8.2 
sidebar_label: Apache Pulsar 2.8.2 
---

## security
[Security] Upgrade to Log4J 2.17.0 to mitigate CVE-2021-45105 [#13392](https://github.com/apache/pulsar/pull/13392)  
[security] Upgrade Netty to 4.1.72 - CVE-2021-43797 [#13328](https://github.com/apache/pulsar/pull/13328)  
Bump log4j to 2.15.0 [#13226](https://github.com/apache/pulsar/pull/13226)  
[Authorization] Revert new AuthorizationProvider method [#13133](https://github.com/apache/pulsar/pull/13133)  
[Authorization] Support CLEAR_BACKLOG namespace op after enable auth [#12963](https://github.com/apache/pulsar/pull/12963)  
[security] Upgrade netty to 4.1.68.Final [#12218](https://github.com/apache/pulsar/pull/12218)  

## broker
[Broker] Fix and improve topic ownership assignment [#13069](https://github.com/apache/pulsar/pull/13069)  
[Broker] Fix LeaderElectionService.getCurrentLeader and add support for empheralOwner in MockZooKeeper [#13066](https://github.com/apache/pulsar/pull/13066)  
Do not reuse the Failed OpAddEntry object which lead bundle unloading timeout. [#12993](https://github.com/apache/pulsar/pull/12993)  
Remove readerCaches and close reader when exception occurs in SystemTopicBasedTopicPoliciesService [#12873](https://github.com/apache/pulsar/pull/12873)  
Fix TopicPoliciesCacheNotInitException issue. [#12773](https://github.com/apache/pulsar/pull/12773)  
[Authorization] Support UNSUBSCRIBE namespace op after enable auth [#12742](https://github.com/apache/pulsar/pull/12742)  
[Issue 12723] Fix race condition in PersistentTopic#addReplicationCluster [#12729](https://github.com/apache/pulsar/pull/12729)  
Even if always compatible is set, Consumers cannot be created [#12721](https://github.com/apache/pulsar/pull/12721)  
[Managed Ledger] Fix the incorrect total size when BrokerEntryMetadata is enabled [#12714](https://github.com/apache/pulsar/pull/12714)  
[Config] Add readWorkerThreadsThrottlingEnabled to conf/bookkeeper.conf [#12666](https://github.com/apache/pulsar/pull/12666)  
[Authorization] Support GET_METADATA topic op after enable auth [#12656](https://github.com/apache/pulsar/pull/12656)  
Fix false positive ownership check in OwnershipCache#checkOwnership [#12650](https://github.com/apache/pulsar/pull/12650)  
[Broker] Optimize exception information for schemas [#12647](https://github.com/apache/pulsar/pull/12647)  
Support retry when creating reader of Topic Policies [#12622](https://github.com/apache/pulsar/pull/12622)  
Fix String should use equals but not ==. [#12619](https://github.com/apache/pulsar/pull/12619)  
fix 12614, waitingForPingResponse needs to be modified with volatile for concurrent sence  [#12615](https://github.com/apache/pulsar/pull/12615)  
[Test] Cleanup ProxyPublishConsumeTest [#12607](https://github.com/apache/pulsar/pull/12607)  
[ML] Avoid passing OpAddEntry across a thread boundary in asyncAddEntry [#12606](https://github.com/apache/pulsar/pull/12606)  
[#12423] allow `GetTopicsOfNamespace` op with `consume` permission [#12600](https://github.com/apache/pulsar/pull/12600)  
Allow to configure schema compatibility policy for system topics [#12598](https://github.com/apache/pulsar/pull/12598)  
[pulsar-broker] Cleanup already deleted namespace topics. [#12597](https://github.com/apache/pulsar/pull/12597)  
Fix additional servlets nar might extract to null directory [#12585](https://github.com/apache/pulsar/pull/12585)  
Fix log typo in NamespaceService#checkHeartbeatNamespace  [#12582](https://github.com/apache/pulsar/pull/12582)  
[ML] Add OpAddEntry to pendingAddEntries after the state check [#12570](https://github.com/apache/pulsar/pull/12570)  
[broker] Cancel scheduled tasks when deleting ManagedLedgerImpl [#12565](https://github.com/apache/pulsar/pull/12565)  
[pulsar-broker] Add git branch information for PulsarVersion [#12541](https://github.com/apache/pulsar/pull/12541)  
Websocket should pass the encryption context to the consumers [#12539](https://github.com/apache/pulsar/pull/12539)  
The count of topics on the bundle is less than 2，skip split [#12527](https://github.com/apache/pulsar/pull/12527)  
[Broker] Fix messageDedup delete inactive producer name [#12493](https://github.com/apache/pulsar/pull/12493)  
Optimize the code: remove extra spaces [#12470](https://github.com/apache/pulsar/pull/12470)  
Fix wrong property name in NamespaceIsolationDataImpl#secondary [#12433](https://github.com/apache/pulsar/pull/12433)  
Fix the null point caused by deleting the system topic policy [#12367](https://github.com/apache/pulsar/pull/12367)  
Future completed twice in the method of  impl.MLPendingAckStore#closeAsync [#12362](https://github.com/apache/pulsar/pull/12362)  
fix the race of delete subscription and delete topic [#12240](https://github.com/apache/pulsar/pull/12240)  
Disable stats recorder for built-in PulsarClient [#12217](https://github.com/apache/pulsar/pull/12217)  
fix delete authentication policies when delete topic. [#12215](https://github.com/apache/pulsar/pull/12215)  
Optimize the memory usage of Cache Eviction [#12045](https://github.com/apache/pulsar/pull/12045)  
Avoid adding duplicated BrokerEntryMetadata [#12018](https://github.com/apache/pulsar/pull/12018)  
Fix update ledger list to znode version mismatch failed, ledger not delete [#12015](https://github.com/apache/pulsar/pull/12015)  

## sql
[Pulsar SQL] Handle message null schema version in PulsarRecordCursor [#12809](https://github.com/apache/pulsar/pull/12809)  
[Pulsar SQL] Pulsar SQL support query big entry data [#12448](https://github.com/apache/pulsar/pull/12448)  

## admin
[pulsar-admin] Print topic internal info as formatted json [#12709](https://github.com/apache/pulsar/pull/12709)  
PulsarAdmin: Fix last exit code storage [#12581](https://github.com/apache/pulsar/pull/12581)  
[pulsar-admin] Modify exception of set-properties for namespace [#12436](https://github.com/apache/pulsar/pull/12436)  
[Admin] Get schema validation enforce add applied. [#12349](https://github.com/apache/pulsar/pull/12349)  
[pulsar-admin] Perfect judgment conditions of pulsar-admin [#12315](https://github.com/apache/pulsar/pull/12315)  

## compaction
Fix lost compaction data due to compaction properties missed during reset-cursor [#12698](https://github.com/apache/pulsar/pull/12698)  
[Compaction] Do not move the non-durable cursor position when trimming ledgers while topic with compaction [#12602](https://github.com/apache/pulsar/pull/12602)  
Fix the reader skips compacted data which original ledger been removed [#12522](https://github.com/apache/pulsar/pull/12522)  
Fix skips compacted data for reader/consumer [#12464](https://github.com/apache/pulsar/pull/12464)  
Fix compactor skips data from last compacted Ledger [#12429](https://github.com/apache/pulsar/pull/12429)  
Fix incorrect returned last message ID while the `lastConfirmedEntry` with negative entry ID [#12277](https://github.com/apache/pulsar/pull/12277)  
Fix typo of the returned last message ID when the last message ID is from compacted ledger [#12237](https://github.com/apache/pulsar/pull/12237)  
Return the last position of the compacted data while the original data been deleted [#12161](https://github.com/apache/pulsar/pull/12161)  

## test
[tools] fix TestRunMain test [#12675](https://github.com/apache/pulsar/pull/12675)  
[test] Add @Test annotation to test methods [#12640](https://github.com/apache/pulsar/pull/12640)  
broker resource group test optimize fail msg [#12438](https://github.com/apache/pulsar/pull/12438)  
[Test] Fix some tests not enabled in integration tests [#12417](https://github.com/apache/pulsar/pull/12417)  
fix windows test path probleam [#12398](https://github.com/apache/pulsar/pull/12398)  
Make AuthenticationTokenTest to run on windows [#12329](https://github.com/apache/pulsar/pull/12329)  
[unit test] use correct line separator instead of \n [#12143](https://github.com/apache/pulsar/pull/12143)  
Force Python CI to use earlier version of Protobuf which supports Python2 [#12058](https://github.com/apache/pulsar/pull/12058)  
[testclient] hide option -s and substitute -ss(0) for it [#11828](https://github.com/apache/pulsar/pull/11828)  

## cli
[cli] Enable CLI to publish non-batched messages [#12641](https://github.com/apache/pulsar/pull/12641)  
[pulsar-client] Make it possible to disable poolMessages [#12108](https://github.com/apache/pulsar/pull/12108)  
[testclient] Add total messages when periodic printing throughput [#12084](https://github.com/apache/pulsar/pull/12084)  

## proxy
Reduced severity of log "refreshing key manager" in KeyManagerProxy [#12594](https://github.com/apache/pulsar/pull/12594)  
Fix the batch message ack for WebSocket proxy. [#12530](https://github.com/apache/pulsar/pull/12530)  
[Issue-11966][pulsar-proxy] set default http proxy request timeout [#11971](https://github.com/apache/pulsar/pull/11971)  

## build
[Python] Provide __str__ operator for BytesSchema [#12593](https://github.com/apache/pulsar/pull/12593)  
Release: allow Integration Tests Jar to be deployed to Maven central [#12292](https://github.com/apache/pulsar/pull/12292)  
Fix build from submodules (broker, transaction coordinator) [#11795](https://github.com/apache/pulsar/pull/11795)  

## function
k8s runtime: force deletion to avoid hung function worker during connector restart [#12504](https://github.com/apache/pulsar/pull/12504)  
Fix k8s pulsar functions containers not exposing metrics port for scraping [#12065](https://github.com/apache/pulsar/pull/12065)  
[pulsar-functions-go] support set subscription position [#11990](https://github.com/apache/pulsar/pull/11990)  
[function] enable protobuf-native schema support for function [#11868](https://github.com/apache/pulsar/pull/11868)  
[pulsar-functions-go] sync to the latest function proto [#11853](https://github.com/apache/pulsar/pull/11853)  
[pulsar-functions] Pass `SubscriptionPosition` from `FunctionDetails` to `FunctionConfig` / `SinkConfig` [#11831](https://github.com/apache/pulsar/pull/11831)  

## connector
Stop OffsetStore when stopping the connector [#12457](https://github.com/apache/pulsar/pull/12457)  

## tieredstorage
Add retry to tolerate the offload index file read failure [#12452](https://github.com/apache/pulsar/pull/12452)  
Fix the read performance issue in the offload readAsync [#12443](https://github.com/apache/pulsar/pull/12443)  
[offload] fix FileSystemManagedLedgerOffloader can not cleanup outdated ledger [#12309](https://github.com/apache/pulsar/pull/12309)  
Fix the potential race condition in the BlobStore readhandler [#12123](https://github.com/apache/pulsar/pull/12123)  

## config
Reduce the readFailureBackoff time [#12444](https://github.com/apache/pulsar/pull/12444)  

## bookkeeper
useV2WireProtocol for bookkeeper autorecovery [#12311](https://github.com/apache/pulsar/pull/12311)  

## key-shared
Fix returned wrong hash ranges for the consumer with same consumer name [#12212](https://github.com/apache/pulsar/pull/12212)  

## connect
Remove the deprecated api usage in hdfs [#12080](https://github.com/apache/pulsar/pull/12080)  

## transaction
[Transaction] add method to clear up transaction buffer snapshot [#11934](https://github.com/apache/pulsar/pull/11934)  

## topic-policy
Fix messages in TopicPolicies will never be cleaned up [#11928](https://github.com/apache/pulsar/pull/11928)  

## stats
[stats] Add Key_Shared metadata to topic stats [#11839](https://github.com/apache/pulsar/pull/11839)  

