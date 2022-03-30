---
id: pulsar-2.6.1
title: Apache Pulsar 2.6.1 
sidebar_label: Apache Pulsar 2.6.1 
---

## security
[docs] Add config info in security jwt [#8482](https://github.com/apache/pulsar/pull/8482)  
[Issue 7711][pulsar-broker] Use original role instead of proxy role to check permissions [#7712](https://github.com/apache/pulsar/pull/7712)  
Use Consume/Produce/Lookup interfaces for specific operations in allowTopicOperation [#7587](https://github.com/apache/pulsar/pull/7587)  
[Doc]--add authentication client with oauth2 support  [#7462](https://github.com/apache/pulsar/pull/7462)  
[client authentication] add authentication client with oauth2 support [#7420](https://github.com/apache/pulsar/pull/7420)  
[PIP-55][Doc]--Update security overview [#7302](https://github.com/apache/pulsar/pull/7302)  
Fix the regression in isSupperUser [#7241](https://github.com/apache/pulsar/pull/7241)  
Update Jetty to 9.4.29 [#7235](https://github.com/apache/pulsar/pull/7235)  

## k8s
[docs] Update helm deploy content [#8404](https://github.com/apache/pulsar/pull/8404)  
[docs] Sync K8S Helm content from 2.6.0 docs into 2.6.1 and 2.6.2 [#8398](https://github.com/apache/pulsar/pull/8398)  

## bookkeeper
[Issue 8364][docs] Update decommission content in different releases [#8368](https://github.com/apache/pulsar/pull/8368)  

## broker
allowTopicOperationAsync should check the original role is super user (#1355) [#7788](https://github.com/apache/pulsar/pull/7788)  
Replay delayed messages in order. [#7731](https://github.com/apache/pulsar/pull/7731)  
[Broker] Timeout opening managed ledger operation … [#7506](https://github.com/apache/pulsar/pull/7506)  
Fix ArrayIndexOutOfBoundsException when dispatch messages to consumer. [#7483](https://github.com/apache/pulsar/pull/7483)  
[broker] Consumer is registered on dispatcher even if hash range conflicts on Key_Shared subscription [#7444](https://github.com/apache/pulsar/pull/7444)  
Fix producer stuck issue due to NPE thrown when creating a new ledger [#7401](https://github.com/apache/pulsar/pull/7401)  
Avoid introduce null read position for the managed cursor. [#7264](https://github.com/apache/pulsar/pull/7264)  

## function
Fix functions-worker typos [#7746](https://github.com/apache/pulsar/pull/7746)  
[Issue 5520][Function Doc] Add window function context docs for repo [#7741](https://github.com/apache/pulsar/pull/7741)  
Improve security setting of Pulsar Functions [#7578](https://github.com/apache/pulsar/pull/7578)  
[Issue 7489] Remove timestamp from metrics [#7539](https://github.com/apache/pulsar/pull/7539)  
Fix: function BC issue introduced in 2.6 [#7528](https://github.com/apache/pulsar/pull/7528)  
Differentiate authorization between source/sink/function operations [#7466](https://github.com/apache/pulsar/pull/7466)  
[Doc]--Add labels to function statefulsets and services [#7428](https://github.com/apache/pulsar/pull/7428)  
[Issue 7267] Fixing go instance config port  [#7322](https://github.com/apache/pulsar/pull/7322)  

## schemaregistry
[Issue] Fix get schemaName by partitioned topic name [#7708](https://github.com/apache/pulsar/pull/7708)  

## tieredstorage
[Pulsar SQL] Make Pulsar SQL get correct offload configurations [#7701](https://github.com/apache/pulsar/pull/7701)  
[Issue 7402] Shaded jclouds to avoid gson conflict [#7435](https://github.com/apache/pulsar/pull/7435)  

## stats
[Issue 7669][pulsar-client] fix producer stats recorder time unit error [#7670](https://github.com/apache/pulsar/pull/7670)  

## build
[PROTOBUF] Fix protobuf generation on handling repeated long number … [#7540](https://github.com/apache/pulsar/pull/7540)  
Update Jackson to 2.11.1 and ensure all dependencies are pinned [#7519](https://github.com/apache/pulsar/pull/7519)  
fix #6834:  add pulsar-client-messagecrypto-bc into pulsar-client dependency to avoid method not found [#7447](https://github.com/apache/pulsar/pull/7447)  

## config
Fix typo in replicationPolicyCheckDurationSeconds config var [#7513](https://github.com/apache/pulsar/pull/7513)  

## cli
[pulsar-cli] fix update-cluster cli updates proxy-url [#7422](https://github.com/apache/pulsar/pull/7422)  
[pulsar-perf] Supports `tlsAllowInsecureConnection` in pulsar-perf produce/consume/read. [#7300](https://github.com/apache/pulsar/pull/7300)  

## storage
Fix producer stucks on creating ledger timeout [#7319](https://github.com/apache/pulsar/pull/7319)  

## deploy
[Issue 7315][docker-compose] [#7316](https://github.com/apache/pulsar/pull/7316)  

