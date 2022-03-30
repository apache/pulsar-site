---
id: pulsar-2.5.2
title: Apache Pulsar 2.5.2 
sidebar_label: Apache Pulsar 2.5.2 
---

## function
[Issue 5520][Function Doc] Add window function context docs for repo [#7741](https://github.com/apache/pulsar/pull/7741)  
[functions] Fix typos in exceptions related to functions [#6910](https://github.com/apache/pulsar/pull/6910)  
[functions] Fix validation of function's update [#6888](https://github.com/apache/pulsar/pull/6888)  
Fix localrunner netty dependency issue and add default log4j2 config file [#6779](https://github.com/apache/pulsar/pull/6779)  
Ensure that all dangling consumers are cleaned up during failures [#6778](https://github.com/apache/pulsar/pull/6778)  
Support function with format: Function`<I, CompletableFuture<O>>` [#6684](https://github.com/apache/pulsar/pull/6684)  

## admin
Fix pulsar admin thread number explode bug [#6940](https://github.com/apache/pulsar/pull/6940)  
[Issue 6887][pulsar-broker] ttlDurationDefaultInSeconds not applying [#6920](https://github.com/apache/pulsar/pull/6920)  
[function] Function endpoint admin/v3/functions/{tenant}/{namespace} always returns 404 [#6767](https://github.com/apache/pulsar/pull/6767)  
fix_admin_getIndividualMsgsFromBatch_bug [#6715](https://github.com/apache/pulsar/pull/6715)  
Retention policy should be respected when there is no traffic [#6676](https://github.com/apache/pulsar/pull/6676)  

## sql
Pulsar SQL Support Avro Schema `ByteBuffer` Type [#6925](https://github.com/apache/pulsar/pull/6925)  
Add a note for bookkeeper explicit LAC [#6908](https://github.com/apache/pulsar/pull/6908)  

## security
add keystore tls config doc [#6922](https://github.com/apache/pulsar/pull/6922)  
use originalAuthMethod on originalAuthChecker [#6870](https://github.com/apache/pulsar/pull/6870)  
Add Tls with keystore type config support [#6853](https://github.com/apache/pulsar/pull/6853)  

## metrics
Expose pulsar_out_bytes_total and pulsar_out_messages_total for namespace/subscription/consumer. [#6918](https://github.com/apache/pulsar/pull/6918)  

## broker
[Broker] Handle all exceptions from `topic.addProducer` [#6881](https://github.com/apache/pulsar/pull/6881)  
[broker] register loadbalance znode should attempt to wait until session expired [#6788](https://github.com/apache/pulsar/pull/6788)  
change nondurable cursor to active [#6769](https://github.com/apache/pulsar/pull/6769)  
Fix check backlogged cursors without consumer [#6766](https://github.com/apache/pulsar/pull/6766)  
[pulsar-broker] avoid backpressure by skipping dispatching if consumer channel is not writable [#6740](https://github.com/apache/pulsar/pull/6740)  
[pulsar-broker] Fix Deadlock by Consumer and Reader [#6728](https://github.com/apache/pulsar/pull/6728)  
[ISSUE 6563][Broker] Invalidate managed ledgers zookeeper cache instead of reloading on watcher triggered [#6659](https://github.com/apache/pulsar/pull/6659)  
[Issue #5395][broker] Implement AutoTopicCreation by namespace override [#6471](https://github.com/apache/pulsar/pull/6471)  

## build
[Dashboard]Fixed dashboard start failed [#6857](https://github.com/apache/pulsar/pull/6857)  
[build] Bump netty version to 4.1.48.Final [#6746](https://github.com/apache/pulsar/pull/6746)  

## connect
[JDBC Sink] JDBC sink does not handle null in schema [#6848](https://github.com/apache/pulsar/pull/6848)  

## schemaregistry
fix Get schema by version can get the deleted schema info #6754 [#6764](https://github.com/apache/pulsar/pull/6764)  
[issue 6694][AVRO ENCODE] Reset cursor if message encode fails. [#6695](https://github.com/apache/pulsar/pull/6695)  
ISSUE-6612 FIX: parse long field in GenricJsonRecord (#6612) [#6622](https://github.com/apache/pulsar/pull/6622)  
Make SchemaStorage accessible in Offloader [#6567](https://github.com/apache/pulsar/pull/6567)  

## tieredstorage
Avoid prefetch too much data when offloading data to HDFS [#6717](https://github.com/apache/pulsar/pull/6717)  
[Issue 6283][tiered-storage] Offload policies per namespace [#6422](https://github.com/apache/pulsar/pull/6422)  

## test
[hotfix]Python function protobuf missing field and broker test failed [#6641](https://github.com/apache/pulsar/pull/6641)  

## storage
[2nd Storage]Extract common method in tiered storage to managed-ledger module [#6533](https://github.com/apache/pulsar/pull/6533)  

