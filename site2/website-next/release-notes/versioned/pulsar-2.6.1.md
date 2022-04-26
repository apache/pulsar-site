---
id: pulsar-2.6.1
title: Apache Pulsar 2.6.1 
sidebar_label: Apache Pulsar 2.6.1 
---

#### 2020-08-21

The following lists fixes and enhancements in 2.6.1 release.

#### Broker

- [Broker] Limit batch size to the minimum of the `maxNumberOfMessages` and `maxSizeOfMessages` [#6865](https://github.com/apache/pulsar/pull/6865)
- [Broker] Fix hash range conflict issue in Key_Shared with sticky hash range [#7231](https://github.com/apache/pulsar/pull/7231)
- [Broker] Fix the issue that get lookup permission error [#7234](https://github.com/apache/pulsar/pull/7234)
- [Broker] Update Jetty to version 9.4.29 [#7235](https://github.com/apache/pulsar/pull/7235)
- [Broker] Fix readers backlog stats after data is skipped [#7236](https://github.com/apache/pulsar/pull/7236)
- [Broker] Fix the regression in `isSupperUser` [#7241](https://github.com/apache/pulsar/pull/7241)
- [Broker] Avoid introducing null read position for the managed cursor [#7264](https://github.com/apache/pulsar/pull/7264)
- [Broker] Fix permission operation check on setRetention admin operation [#7281](https://github.com/apache/pulsar/pull/7281)
- [Broker] Fix error in creation of non-durable cursor [#7355](https://github.com/apache/pulsar/pull/7355)
- [Broker] Fix bug related to managedLedger properties [#7357](https://github.com/apache/pulsar/pull/7357)
- [Broker] Add tenant name check in list namespaces function [#7369](https://github.com/apache/pulsar/pull/7369)
- [Broker] Avoid the NPE occurs in method `ManagedLedgerImpl.isOffloadedNeedsDelete` [#7389](https://github.com/apache/pulsar/pull/7389)
- [Broker] Fix producer stuck issue due to NPE thrown when creating a new ledger [#7401](https://github.com/apache/pulsar/pull/7401)
- [Broker] Avoid NPEs at ledger creation when DNS failures happen [#7403](https://github.com/apache/pulsar/pull/7403)
- [Broker] Support decompression payload if needed in KeyShared subscription [#7416](https://github.com/apache/pulsar/pull/7416)
- [Broker] Fix update-cluster cli updates proxy-url [#7422](https://github.com/apache/pulsar/pull/7422)
- [Broker] Handle `NotAllowed Exception` at the client side [#7430](https://github.com/apache/pulsar/pull/7430)
- [Broker] Shade jclouds to avoid Gson conflict [#7435](https://github.com/apache/pulsar/pull/7435)
- [Broker] Consumer is registered on dispatcher even if hash range conflicts on Key_Shared subscription [#7444](https://github.com/apache/pulsar/pull/7444)
- [Broker] Add pulsar-client-messagecrypto-bc into pulsar-client dependency to avoid method not found [#7447](https://github.com/apache/pulsar/pull/7447)
- [Broker] Fix update partitions error for non-persistent topic [#7459](https://github.com/apache/pulsar/pull/7459)
- [Broker] Use CGroup CPU usage when present [#7475](https://github.com/apache/pulsar/pull/7475)
- [Broker] Fix ArrayIndexOutOfBoundsException when dispatch messages to consumer [#7483](https://github.com/apache/pulsar/pull/7483)
- [Broker] Get last entry is trying to read entry -1 [#7495](https://github.com/apache/pulsar/pull/7495)
- [Broker] Fix timeout opening managed ledger operation [#7506](https://github.com/apache/pulsar/pull/7506)
- [Broker] Fixes the exception that occurred when the geo-replication policy is updated [#7514](https://github.com/apache/pulsar/pull/7514)
- [Broker] Update Jackson to version 2.11.1 and ensure all dependencies are pinned [#7519](https://github.com/apache/pulsar/pull/7519)
- [Broker] Fix protobuf generation on handling repeated long number [#7540](https://github.com/apache/pulsar/pull/7540)
- [Broker] Add more logging to the auth operations on failure [#7567](https://github.com/apache/pulsar/pull/7567)
- [Broker] Use Consume/Produce/Lookup interfaces for specific operations in allowTopicOperation [#7587](https://github.com/apache/pulsar/pull/7587)
- [Broker] Support configuring `DeleteInactiveTopic` setting in namespace policy [#7598](https://github.com/apache/pulsar/pull/7598)
- [Broker] Fix NPE when using advertisedListeners [#7620](https://github.com/apache/pulsar/pull/7620)
- [Broker] Fix the issue that deduplication cursor can not be deleted after disabling message deduplication [#7656](https://github.com/apache/pulsar/pull/7656)
- [Broker] Add missing AuthenticationDataSource to canConsumeAsync method call [#7694](https://github.com/apache/pulsar/pull/7694)
- [Broker] Close the previous reader of the health check topic [#7724](https://github.com/apache/pulsar/pull/7724)
- [Broker] Change some WebApplicationException log level to debug [#7725](https://github.com/apache/pulsar/pull/7725)
- [Broker] Replay delayed messages in order [#7731](https://github.com/apache/pulsar/pull/7731)
- [Broker] Fix the wrong returned URL for lookup when specify advertised listener [#7737](https://github.com/apache/pulsar/pull/7737)
- [Broker] Fix topic getting recreated immediately after deletion [#7524](https://github.com/apache/pulsar/pull/7524)
- [Broker] Set default root log level to debug [#7789](https://github.com/apache/pulsar/pull/7789)
- [Broker] Fix producer stucks on creating ledger timeout [#7319](https://github.com/apache/pulsar/pull/7319)
- [Broker] AllowTopicOperationAsync should check the original role is super user [#7788](https://github.com/apache/pulsar/pull/7788)

#### Zookeeper

- [Zookeeper] Use hostname for bookie rackawareness mapping [#7361](https://github.com/apache/pulsar/pull/7361)

#### Pulsar SQL

- [Pulsar SQL] Make Pulsar SQL get correct offload configurations [#7701](https://github.com/apache/pulsar/pull/7701)

#### Pulsar Schema
- [Schema] Fix the error that occurs when getting schemaName by partitioned topic name [#7708](https://github.com/apache/pulsar/pull/7708)


#### Pulsar Functions

- [Pulsar Function] Use fully qualified hostname as default to advertise worker [#7360](https://github.com/apache/pulsar/pull/7360)
- [Pulsar Function] Fix the function BC issue introduced in release 2.6.0 [#7528](https://github.com/apache/pulsar/pull/7528)
- [Pulsar Function] Improve security setting of Pulsar Functions [#7578](https://github.com/apache/pulsar/pull/7578)
- [Pulsar Function] Differentiate authorization between source/sink/function operations [#7466](https://github.com/apache/pulsar/pull/7466)

#### Go Function

- [Go Function] Fix Go instance config port [#7322](https://github.com/apache/pulsar/pull/7322)
- [Go Function] Remove timestamp from metrics [#7539](https://github.com/apache/pulsar/pull/7539)

#### Pulsar Perf

- [Pulsar Perf] Supports `tlsAllowInsecureConnection` in pulsar-perf produce/consume/read [#7300](https://github.com/apache/pulsar/pull/7300) 

