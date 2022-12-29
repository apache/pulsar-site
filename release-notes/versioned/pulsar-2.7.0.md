---
id: pulsar-2.7.0
title: Apache Pulsar 2.7.0 
sidebar_label: Apache Pulsar 2.7.0 
---

#### 2020-11-25

The following lists fixes and enhancements in the 2.7.0 release.

#### Transactions

- Implement the Transaction Buffer Client [#6544](https://github.com/apache/pulsar/pull/6544)
- Support produce messages with transaction and commit transaction [#7552](https://github.com/apache/pulsar/pull/7552)
- Support consume transaction messages [#7781](https://github.com/apache/pulsar/pull/7781) [#7833](https://github.com/apache/pulsar/pull/7833)
- Message acknowledgment with transaction [#7856](https://github.com/apache/pulsar/pull/7856) [#8007](https://github.com/apache/pulsar/pull/8007)
- Support transaction abort on partition [#7953](https://github.com/apache/pulsar/pull/7953)
- Support transaction abort on subscription [#7979](https://github.com/apache/pulsar/pull/7979)
- Handle pending ack at the client side [#8037](https://github.com/apache/pulsar/pull/8037)
- Pending ack state implementation [#8426](https://github.com/apache/pulsar/pull/8426)
- Support get reponse for message acknowledge [#8161](https://github.com/apache/pulsar/pull/8161)
- Refactor the transaction buffer implementation [#8291](https://github.com/apache/pulsar/pull/8291) [#8347](https://github.com/apache/pulsar/pull/8347)
- Transaction marker deletion [#8318](https://github.com/apache/pulsar/pull/8318)
- Support produce messages with transaction in batch [#8415](https://github.com/apache/pulsar/pull/8415)
- Register transaction metadata before send or ack messages [#8493](https://github.com/apache/pulsar/pull/8493)
- Expose transaction interface [#8505](https://github.com/apache/pulsar/pull/8505)
- Guarantee transaction metadata handlers connected [#8563](https://github.com/apache/pulsar/pull/8563)
- Add the batch size in transaction ack command [#8659](https://github.com/apache/pulsar/pull/8659)
- Implement the Transaction Log [#8658](https://github.com/apache/pulsar/pull/8658)

#### Topic policy

- Support setting message TTL on topic level [#7738](https://github.com/apache/pulsar/pull/7738)
- Support setting retention on topic level [#7747](https://github.com/apache/pulsar/pull/7747)
- Support setting delayed delivery policy on topic level [#7784](https://github.com/apache/pulsar/pull/7784)
- Support setting max unacked message per subscription on topic level [#7802](https://github.com/apache/pulsar/pull/7802)
- Support setting persistence policie on topic level [#7817](https://github.com/apache/pulsar/pull/7817)
- Support setting max unacked messages per consumer on topic level [#7818](https://github.com/apache/pulsar/pull/7818)
- Support setting deduplication policy on topic level [#7821](https://github.com/apache/pulsar/pull/7821)
- Support setting message dispatch rate on topic level [#7863](https://github.com/apache/pulsar/pull/7863))
- Support setting compaction threshold on topic level [#7881](https://github.com/apache/pulsar/pull/7881)
- Support setting offload policy on topic level [#7883](https://github.com/apache/pulsar/pull/7883)
- Support setting max producers for a topic [#7914](https://github.com/apache/pulsar/pull/7914)
- Support setting max consumers for a topic [#7968](https://github.com/apache/pulsar/pull/7968)
- Support setting publish rate limitation for a topic [#7948](https://github.com/apache/pulsar/pull/7948)
- Support setting inactive topic policy on topic level [#7986](https://github.com/apache/pulsar/pull/7986)
- Support setting subscribe rate for a topic [#7991](https://github.com/apache/pulsar/pull/7991)
- Support setting max consumers per subscription on topic level [#8003](https://github.com/apache/pulsar/pull/8003)
- Support setting subscription dispatch rate on topic level [#8087](https://github.com/apache/pulsar/pull/8087)
- Support setting deduplication snapshot interval on topic level [#8552](https://github.com/apache/pulsar/pull/8552)

#### Broker

- Upgrade BookKeeper version to 4.12.0 [#8447](https://github.com/apache/pulsar/pull/8447)
- Capture the add entry latency of managed-ledger [#4419](https://github.com/apache/pulsar/pull/4419)
- Keep max-concurrent http web-request configurable [#7250](https://github.com/apache/pulsar/pull/7250)
- Perform the unload in background after bundle split [#7387](https://github.com/apache/pulsar/pull/7387)
- Cleanup already deleted namespace topics when remove cluster [#7473](https://github.com/apache/pulsar/pull/7473)
- Support partitioned topics in the Reader [#7518](https://github.com/apache/pulsar/pull/7518)
- Support partitioned topic lookup [#7605](https://github.com/apache/pulsar/pull/7605)
- Make OrderedExecutor threads number configurable [#7765](https://github.com/apache/pulsar/pull/7765)
- Add config to lazily recover cursors when recovering a managed ledger [#7858](https://github.com/apache/pulsar/pull/7858)
- Make BookKeeper throttle configurable [#7901](https://github.com/apache/pulsar/pull/7901)
- Report compacted topic ledger info when calling get internal stats [#7988](https://github.com/apache/pulsar/pull/7988)
- Add broker config to enforce producer to publish encrypted message [#8055](https://github.com/apache/pulsar/pull/8055)
- Expose ensemble placement policy in bookkeeper.conf [#8210](https://github.com/apache/pulsar/pull/8210)
- Support limit topic publish rate at the broker level [#8235](https://github.com/apache/pulsar/pull/8235)
- Support limit the max tenants of the Pulsar cluster [#8261](https://github.com/apache/pulsar/pull/8261)
- Support limit the max namespaces per tenant [#8267](https://github.com/apache/pulsar/pull/8267)
- Support limit max subscriptions per topic [#8289](https://github.com/apache/pulsar/pull/8289)
- Added metrics for topic lookups operations [#8272](https://github.com/apache/pulsar/pull/8272)
- Added REST handler for broker ready probe [#8303](https://github.com/apache/pulsar/pull/8303)
- Configure namespace anti-affinity in local policies [#8349](https://github.com/apache/pulsar/pull/8349)
- Handle hash collision in KeyShared subscription mode [#8396](https://github.com/apache/pulsar/pull/8396)
- Configure maxMsgReplDelayInSeconds for each repl-cluster [#8409](https://github.com/apache/pulsar/pull/8409)
- Support taking de-duplication snapshots based on time [#8474](https://github.com/apache/pulsar/pull/8474)
- Support namespace-level duplication snapshot [#8506](https://github.com/apache/pulsar/pull/8506)
- Expose consumer names after the mark delete position for the Key_Shared subscription [#8545](https://github.com/apache/pulsar/pull/8545)
- Close topics that remain fenced forcefully [#8561](https://github.com/apache/pulsar/pull/8561)

#### Functions

- Separate out FunctionMetadata related helper functions [#7146](https://github.com/apache/pulsar/pull/7146)
- Attach names for all producers/readers in worker service [#7165](https://github.com/apache/pulsar/pull/7165)
- Add support to read compacted topic [#7193](https://github.com/apache/pulsar/pull/7193)
- Re-work Function MetaDataManager to make all metadata writes only by the leader [#7255](https://github.com/apache/pulsar/pull/7255)
- Fix leader/scheduler assignment processing lag problem [#7237](https://github.com/apache/pulsar/pull/7237)
- Set source spec's negativeacktimeout as well as timeout [#7337](https://github.com/apache/pulsar/pull/7337)
- Add an endpoint to check whether function worker service is initialized [#7350](https://github.com/apache/pulsar/pull/7350)
- Functions metadata compaction [#7377](https://github.com/apache/pulsar/pull/7377)
- Implement rebalance mechanism [#7388](https://github.com/apache/pulsar/pull/7388)
- Improve security setting [#7424](https://github.com/apache/pulsar/pull/7424)
- Allow function rebalance to be run periodically [#7449](https://github.com/apache/pulsar/pull/7449)
- Log scheduler stats for Pulsar Functions [#7474](https://github.com/apache/pulsar/pull/7474)
- Add BatchPushSource interface [#7493](https://github.com/apache/pulsar/pull/7493)
- Rejigger contract between LeaderService and rest of components [#7520](https://github.com/apache/pulsar/pull/7520)
- Allow null consume in BatchPushSource [#7573](https://github.com/apache/pulsar/pull/7573)
- Add readiness api for the worker leader [#7601](https://github.com/apache/pulsar/pull/7601)
- Reduce in the leader init time in Pulsar Functions [#7611](https://github.com/apache/pulsar/pull/7611)
- Export Function worker internal stats via Prometheus [#7641](https://github.com/apache/pulsar/pull/7641)
- Allow ability to specify retain key ordering in functions [#7647](https://github.com/apache/pulsar/pull/7647)
- Added ability to specify runtime for localrunner [#7681](https://github.com/apache/pulsar/pull/7681)
- Add additional metrics for Pulsar Function Worker [#7685](https://github.com/apache/pulsar/pull/7685)
- Use available cores for io thread processing [#7689](https://github.com/apache/pulsar/pull/7689)
- Added ability to specify producer config for functions and sources [#7721](https://github.com/apache/pulsar/pull/7721)
- Allow the option to make producers thread local [#7764](https://github.com/apache/pulsar/pull/7764)
- Add ability for BatchPushSource to notify errors asynchronously [#7865](https://github.com/apache/pulsar/pull/7865)
- Allow ability to specify sub position in functions [#7891](https://github.com/apache/pulsar/pull/7891)
- Add hostname to consumer/producer properties in Pulsar Functions [#7897](https://github.com/apache/pulsar/pull/7897)
- Allow specifying state storage url for Source/Sink localrun [#7930](https://github.com/apache/pulsar/pull/7930)
- Enable function worker JVM metrics to be reported via Prometheus [#8097](https://github.com/apache/pulsar/pull/8097)
- Add ability to specify EnvironmentBasedSecretsProvider in LocalRunner [#8098](https://github.com/apache/pulsar/pull/8098)
- Added ability to specify secrets class in localrunner builder [#8127](https://github.com/apache/pulsar/pull/8127)
- Add access to the current message from the function context [#8290](https://github.com/apache/pulsar/pull/8290)
- Enable e2e encryption for Pulsar Function [#8432](https://github.com/apache/pulsar/pull/8432)
- Support key_based batch builder for functions and sources [#8523](https://github.com/apache/pulsar/pull/8523)
- Refactor Context and State API to allow plugging different state store implementations [#8537](https://github.com/apache/pulsar/pull/8537)

#### IO connectors

- [HDFS] Add config to create sub directory from current time [#7771](https://github.com/apache/pulsar/pull/7771)
- [NSQ] Add NSQ Source [#8372](https://github.com/apache/pulsar/pull/8372)

#### Schema

- Add java8 date and time type to primitive schemas [#7874](https://github.com/apache/pulsar/pull/7874)
- Native protobuf schema support [#7874](https://github.com/apache/pulsar/pull/7874)
- Refactor multi-version schema reader [#8464](https://github.com/apache/pulsar/pull/8464)

#### Tiered storage 
- Support Azure BlobStore offload [#8436](https://github.com/apache/pulsar/pull/8436)

#### Clients

- [cgo] Remove CGO client from repo [#8514](https://github.com/apache/pulsar/pull/8514)


#### Admin

- [Pulsar Admin] support config request timeout [#7698](https://github.com/apache/pulsar/pull/7698)
- [Pulsar Admin] Ensure deleting a partitioned-topic on a non existing namespace returns 404  [#7777](https://github.com/apache/pulsar/pull/7777)
- [Pulsar Admin] Added support to force deleting namespace [#7993](https://github.com/apache/pulsar/pull/7993)
- [Pulsar Admin] Allow to get ledger metadata along with topic stats-internal [#8180](https://github.com/apache/pulsar/pull/8180)
- [Pulsar Admin] Support remove namespace level offload policy [#8446](https://github.com/apache/pulsar/pull/8446)
- [Pulsar Admin] Suport get list of bundles under a namespace [#8450](https://github.com/apache/pulsar/pull/8450)
- [Pulsar Admin] Add ability to examine specific message by position relative to earliest or latest message [#8494](https://github.com/apache/pulsar/pull/8494)
- [Pulsar Admin] Add key-shared consumer range to internal topic stats [#8567](https://github.com/apache/pulsar/pull/8567)

#### Fixes

- [Broker] Prevent redirection of lookup requests from looping [#7200](https://github.com/apache/pulsar/pull/7200)
- [Broker] Ensure that admin operations are gated by super user check [#7226](https://github.com/apache/pulsar/pull/7226)
- [Broker] Fix race condition when delete topic forcelly [#7356](https://github.com/apache/pulsar/pull/7356)
- [Tiered Storage] Fix NPE when offload data to GCS [#7400](https://github.com/apache/pulsar/pull/7400)
- [Function]Fix race condition in which exitFuture in FunctionAssignmentTailer never gets completed even though the tailer thread has exited [#7351](https://github.com/apache/pulsar/pull/7351)
- [Function] Various fixes and optimizations for processing assignments in function worker [#7338](https://github.com/apache/pulsar/pull/7338)
- [Function] Fix deadlock between create function and leader initialization [#7508](https://github.com/apache/pulsar/pull/7508)
- [Pulsar Admin] Fix exceptions being ignored in PulsarAdmin [#7510](https://github.com/apache/pulsar/pull/7510)
- [Broker] Fix the nondurable consumer can not specify the initial position [#7702](https://github.com/apache/pulsar/pull/7702)
- [Broker] Fixed race condition on deleting topic with active readers [#7715](https://github.com/apache/pulsar/pull/7715)
- [Broker] Avoid ConcurrentModificationException of LocalBrokerData [#7729](https://github.com/apache/pulsar/pull/7729)
- [Pulsar Proxy] Fix memory leak with debug log-level  [#7963](https://github.com/apache/pulsar/pull/7963)
- [Broker] Double check from zookeeper if availableBrokers is empty for discovery service [#7975](https://github.com/apache/pulsar/pull/7975)
- [Broker] Fix broker-ml bucket stats show high metrics rate [#8218](https://github.com/apache/pulsar/pull/8218)
- [Broker] Fix incorrect configuration for zk-cache expire time  [#8302](https://github.com/apache/pulsar/pull/8302)
- [Function] Fix returned status code for get function state when state does not exist [#8437](https://github.com/apache/pulsar/pull/8437)
- [Broker] Fix the residual of inactive partitioned-topic cleaning [#8442](https://github.com/apache/pulsar/pull/8442)
- [Pulsar Proxy] Fix request.getContentLength() to return 0 if it is less than 0 [#8448](https://github.com/apache/pulsar/pull/8448)
- [Broker] Fix race condition when calling acknowledgementWasProcessed() [#8499](https://github.com/apache/pulsar/pull/8499)

