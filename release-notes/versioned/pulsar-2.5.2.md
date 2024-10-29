---
id: pulsar-2.5.2
title: Apache Pulsar 2.5.2 
sidebar_label: Apache Pulsar 2.5.2 
---

#### 2020-05-19

#### Fixes and Enhancements

##### Broker
* [Broker] Implement AutoTopicCreation by namespace level override [#6471](https://github.com/apache/pulsar/pull/6471)
* [Broker] Add custom deletionLag and threshold for offload policies per namespace  [#6422](https://github.com/apache/pulsar/pull/6422)
* [Broker] Invalidate managed ledgers zookeeper cache instead of reloading on watcher triggered [#6659](https://github.com/apache/pulsar/pull/6659) 
* [Broker] Retention policy should be respected when there is no traffic [#6676](https://github.com/apache/pulsar/pull/6676)
* [Broker] Fixed double delete on a namespace [#6713](https://github.com/apache/pulsar/pull/6713)
* [Broker] fix get batch message from http response, only get the first message[#6715](https://github.com/apache/pulsar/pull/6715)
* [Broker] Fix Deadlock by Consumer and Reader[#6728](https://github.com/apache/pulsar/pull/6728)
* [Broker] avoid backpressure by skipping dispatching if consumer channel is not writable [#6740](https://github.com/apache/pulsar/pull/6740)
* [Broker] fix when producing encrypted messages, MessageMetadata objects are not released after they are created. [#6745](https://github.com/apache/pulsar/pull/6745)
* [Broker] Bump netty version to 4.1.48.Final [#6746](https://github.com/apache/pulsar/pull/6746)
* [Broker] Increase timeout for loading topics [#6750](https://github.com/apache/pulsar/pull/6750)
* [Broker] Fix wrong cursor state for cursor without consumer  [#6766](https://github.com/apache/pulsar/pull/6766)
* [Broker] change nondurable cursor to active to improve performance [#6769](https://github.com/apache/pulsar/pull/6769)
* [Broker] register loadbalance znode should attempt to wait until session expired [#6788](https://github.com/apache/pulsar/pull/6788)
* [Broker] Fix some empty message related problems in the compacted topic. [#6795](https://github.com/apache/pulsar/pull/6795)
* [Broker] Avoid creating partitioned topic for partition name [#6846](https://github.com/apache/pulsar/pull/6846)
* [Broker] Add Tls with keystore type config support [#6853](https://github.com/apache/pulsar/pull/6853)
* [Broker] fix consumer stuck when batchReceivePolicy maxNumMessages > maxReceiverQueueSize [#6862](https://github.com/apache/pulsar/pull/6862)
* [Broker] use originalAuthMethod on originalAuthChecker in Proxy Authentication [#6870](https://github.com/apache/pulsar/pull/6870)
* [Broker] Close producer when the topic does not exists. [#6879](https://github.com/apache/pulsar/pull/6879)
* [Broker] Handle all exceptions from `topic.addProducer` [#6881](https://github.com/apache/pulsar/pull/6881)
* [Broker] fix topicPublishRateLimiter not effective after restart broker [#6893](https://github.com/apache/pulsar/pull/6893)
* [Broker] Expose pulsar_out_bytes_total and pulsar_out_messages_total for namespace/subscription/consumer. [#6918](https://github.com/apache/pulsar/pull/6918)
* [Broker] Policy ttlDurationDefaultInSeconds not applying  [#6920](https://github.com/apache/pulsar/pull/6920)
* [Broker] Fix pulsar admin thread number explode bug. [#6940](https://github.com/apache/pulsar/pull/6940)

##### Pulsar Schema

* [Schema] Fix long field parse in GenricJsonRecord [#6622](https://github.com/apache/pulsar/pull/6622) 
* [Schema] Fix the leak of cursor reset if message encode fails in Avro schema. [#6695](https://github.com/apache/pulsar/pull/6695) 
* [Schema] fix Get schema by version can get the deleted schema info #6754 [#6754](https://github.com/apache/pulsar/pull/6754)
* [Schema] Fix serialization of enums with json/avro schemas in python [#6808](https://github.com/apache/pulsar/pull/6808) 
* [Schema] Pulsar SQL Support Avro Schema `ByteBuffer` Type [#6925](https://github.com/apache/pulsar/pull/6925) 

##### Pulsar Functions
* [Functions] Support function with format: `Function&lt;I, CompletableFuture&lt;O&gt;&gt;`[#6684](https://github.com/apache/pulsar/pull/6684)
* [Functions] Function endpoint admin/v3/functions/\{tenant\}/\{namespace\} always returns 404 [#6767](https://github.com/apache/pulsar/pull/6767)
* [Functions] Ensure that all dangling consumers are cleaned up during failures [#6778](https://github.com/apache/pulsar/pull/6778)
* [Functions] Fix localrunner netty dependency issue [#6779](https://github.com/apache/pulsar/pull/6779)
* [Functions] Fix SerDe validation of function's update [#6888](https://github.com/apache/pulsar/pull/6888)

##### Tiered Storage
* [Tiered Storage]  Extract common SerDe method in tiered storage to managed-ledger module [#6533](https://github.com/apache/pulsar/pull/6533)
* [Tiered Storage]  Make SchemaStorage accessible in Offloader [#6567](https://github.com/apache/pulsar/pull/6567)
* [Tiered Storage]  Avoid prefetch too much data causing OutOfMemory, when offloading data to HDFS [#6717](https://github.com/apache/pulsar/pull/6717)

##### Pulsar IO
* [IO] JDBC sink does not handle null in schema [#6848](https://github.com/apache/pulsar/pull/6848)
