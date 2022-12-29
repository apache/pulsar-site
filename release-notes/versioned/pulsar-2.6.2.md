---
id: pulsar-2.6.2
title: Apache Pulsar 2.6.2 
sidebar_label: Apache Pulsar 2.6.2 
---

#### 2020-11-09

The following lists fixes and enhancements in the 2.6.2 release.

#### Broker

- [Broker] Catch throwable when start pulsar [7221](https://github.com/apache/pulsar/pull/7221)
- [Broker] Protobuf-shaded package can not update version [7228](https://github.com/apache/pulsar/pull/7228)
- [Broker] Check for null arguments in Namespaces Rest API [7247](https://github.com/apache/pulsar/pull/7247)
- [Broker] Handle SubscriptionBusyException in resetCursor api [7335](https://github.com/apache/pulsar/pull/7335)
- [Broker] Converted the namespace bundle unload into async operation [7364](https://github.com/apache/pulsar/pull/7364)
- [Broker] Update Jersey to 2.31 [7515](https://github.com/apache/pulsar/pull/7515)
- [Broker] Stop to dispatch when skip message temporally since Key_Shared consumer stuck on delivery [7553](https://github.com/apache/pulsar/pull/7553)
- [Broker] Fix bug where producer for geo-replication is not closed when topic is unloaded [7735](https://github.com/apache/pulsar/pull/7735)
- [Broker] Make resetting cursor in REST API asynchronous [7744](https://github.com/apache/pulsar/pull/7744)
- [Broker] Reestablish namespace bundle ownership from false negative releasing and false positive acquiring [7773](https://github.com/apache/pulsar/pull/7773)
- [Broker] make pulsar executor pool size configurable [7782](https://github.com/apache/pulsar/pull/7782)
- [Broker] Redirect Get message by id request when broker not serve for the topic [7786](https://github.com/apache/pulsar/pull/7786)
- [Broker] Make zk cache executor thread pool size configurable [7794](https://github.com/apache/pulsar/pull/7794)
- [Broker] Implement toString() method for TopicMessageIdImpl class [7807](https://github.com/apache/pulsar/pull/7807)
- [Broker] Fix pending batchIndexAcks bitSet batchSize in PersistentAcknowledgmentsGroupingTracker [7828](https://github.com/apache/pulsar/pull/7828)
- [Broker] Fix deadlock when adding consumer [7841](https://github.com/apache/pulsar/pull/7841)
- [Broker] Split message ranges by ledger ID and store them in individualDeletedMessages [7861](https://github.com/apache/pulsar/pull/7861)
- [Broker]  Fix pulsar metrics providing wrong information [7905](https://github.com/apache/pulsar/pull/7905)
- [Broker] Don't fail the health check request when trying to delete the previous subscription [7906](https://github.com/apache/pulsar/pull/7906)
- [Broker] Add configuration to set number of channels per bookie [7910](https://github.com/apache/pulsar/pull/7910)
- [Broker] Fix publish buffer of one ServerCnx calculated multi-times when check broker's publish buffer [7926](https://github.com/apache/pulsar/pull/7926)
- [Broker] Add some logging to improve Authentication debugging and Fix typos in code "occured" -> "occurred" [7934](https://github.com/apache/pulsar/pull/7934)
- [Broker] Fix NPE when acknowledge messages at the broker side [7937](https://github.com/apache/pulsar/pull/7937)
- [Broker] Fix the wrong issuer url concatenate [7980](https://github.com/apache/pulsar/pull/7980)
- [Broker] Upgrade the snakeyaml version to 1.26 [7994](https://github.com/apache/pulsar/pull/7994)
- [Broker] Exclude vertx from bookkeeper-http package [7997](https://github.com/apache/pulsar/pull/7997)
- [Broker] Check null point before setting auto read [7999](https://github.com/apache/pulsar/pull/7999)
- [Broker] Fix IndexOutOfBoundsException in the KeyShared subscription when dispatching messages to consumers [8024](https://github.com/apache/pulsar/pull/8024)
- [Broker] Upgrade jetty-util version to 9.4.31 [8035](https://github.com/apache/pulsar/pull/8035)
- [Broker] Add replicated check to checkInactiveSubscriptions [8066](https://github.com/apache/pulsar/pull/8066)
- [Broker] Add get-last-message-id admin for v1 api [8081](https://github.com/apache/pulsar/pull/8081)
- [Broker] Fix client lookup hangs when broker restarts [8101](https://github.com/apache/pulsar/pull/8101)
- [Broker] Should not cache the owner that does not belong to current server [8111](https://github.com/apache/pulsar/pull/8111)
- [Broker] Support to specify multi ipv6 hosts in brokerServiceUrl [8120](https://github.com/apache/pulsar/pull/8120)
- [Broker] Intercept messages to consumers and add intercept exception [8129](https://github.com/apache/pulsar/pull/8129)
- [Broker] Add ChannelFutures utility class to pulsar-common [8137](https://github.com/apache/pulsar/pull/8137)
- [Broker] Support Disable Replicated Subscriptions [8144](https://github.com/apache/pulsar/pull/8144)
- [Broker] Fix error code returned to client when service unit is not ready [8147](https://github.com/apache/pulsar/pull/8147)
- [Broker] Skip intercepting multipart requests [8156](https://github.com/apache/pulsar/pull/8156)
- [Broker] Enable intercept filters only when interceptors are configured [8157](https://github.com/apache/pulsar/pull/8157)
- [Broker] Clean inactive non-persistent subscriptions [8166](https://github.com/apache/pulsar/pull/8166)
- [Broker] Add a new state for namespace-level TTL [8178](https://github.com/apache/pulsar/pull/8178)
- [Broker] Fix peek messages failed with subscriptionName not exist [8182](https://github.com/apache/pulsar/pull/8182)
- [Broker] Fix pulsar service close exception [8197](https://github.com/apache/pulsar/pull/8197)
- [Broker] Use ThreadPoolExecutor instead of EventLoop [8208](https://github.com/apache/pulsar/pull/8208)
- [Broker] Close ZK connections at end of metadata setup [8228](https://github.com/apache/pulsar/pull/8228)
- [Broker] Delete associated ledgers before deleting cluster metadata [8244](https://github.com/apache/pulsar/pull/8244)
- [Broker] Fix stuck lookup operations when the broker is starting up [8273](https://github.com/apache/pulsar/pull/8273)
- [Broker] Fix Broker enters an infinite loop in ManagedLedgerImpl.asyncReadEntries [8284](https://github.com/apache/pulsar/pull/8284)
- [Broker] Fix message TTL on Key_Shared subscription and Fix ordering issue when replay messages [8292](https://github.com/apache/pulsar/pull/8292)
- [Broker] Fix race condition in updating readPosition in ManagedCursorImpl [8299](https://github.com/apache/pulsar/pull/8299)
- [Broker] Refresh ZooKeeper-data cache in background to avoid deadlock and blocking IO on ZK thread [8304](https://github.com/apache/pulsar/pull/8304)
- [Broker] Upgrade hdfs2 version to 2.8.5 [8319](https://github.com/apache/pulsar/pull/8319)
- [Broker] Upgrade solr version to 8.6.3 [8328](https://github.com/apache/pulsar/pull/8328)
- [Broker] Fix deadlock that occurred during topic ownership check [8406](https://github.com/apache/pulsar/pull/8406)

#### Proxy

- [Proxy] Add advertisedAddress config field to ProxyConfiguration [7542](https://github.com/apache/pulsar/pull/7542) 
- [Proxy] Fix deadlock in pulsar proxy [7690](https://github.com/apache/pulsar/pull/7690)
- [Proxy] Handle NPE while updating proxy stats [7766](https://github.com/apache/pulsar/pull/7766)
- [Proxy] Fix the null exception when starting the proxy service [8019](https://github.com/apache/pulsar/pull/8019)
- [Proxy] Add proxy plugin interface to support user defined additional servlet [8067](https://github.com/apache/pulsar/pull/8067)

#### Pulsar SQL

- [Pulsar SQL] Upgrade Presto version to 332 [7194](https://github.com/apache/pulsar/pull/7194)
- [Pulsar SQL] Replace com.ning.asynchttpclient with org.asynchttpclient [8099](https://github.com/apache/pulsar/pull/8099)

#### Pulsar Functions

- [Pulsar Functions] During Function update, cleanup should only happen for temp files that were generated [7201](https://github.com/apache/pulsar/pull/7201)
- [Pulsar Functions] Have metadata tailer use its own thread for processing [7211](https://github.com/apache/pulsar/pull/7211)
- [Pulsar Functions] Allow kubernetes runtime to customize function instance class path [7844](https://github.com/apache/pulsar/pull/7844)
- [Pulsar Functions] SinkRecord adds an overridden method  [8038](https://github.com/apache/pulsar/pull/8038)
- [Pulsar Functions] Set dryrun of KubernetesRuntime is null [8064](https://github.com/apache/pulsar/pull/8064)
- [Pulsar Functions] Allow disabling forwarding source message properties [8158](https://github.com/apache/pulsar/pull/8158)
- [Pulsar Functions] Missed dryRun on maintenance of secrets [8286](https://github.com/apache/pulsar/pull/8286)

#### Pulsar Perf

- [Pulsar Perf] Support setting message key [7989](https://github.com/apache/pulsar/pull/7989)
- [Pulsar Perf] Make pulsar-perf ioThread number configurable [8090](https://github.com/apache/pulsar/pull/8090)

#### Pulsar Admin

- [Pulsar Admin] Support initial namespace of the cluster without startup the broker [7434](https://github.com/apache/pulsar/pull/7434)
- [Pulsar Admin] Fix some params on consumer broken by #4400 (regex, initialSouscriptionPosition) [7795](https://github.com/apache/pulsar/pull/7795)
- [Pulsar Admin] Return more informative error message when trying to create subscription on non-persistent through Rest API or pulsar-admin CLI [7831](https://github.com/apache/pulsar/pull/7831)
- [Pulsar Admin] Add cli command to get last message Id [8082](https://github.com/apache/pulsar/pull/8082)
- [Pulsar Admin] Support delete all data associated with a cluster [8133](https://github.com/apache/pulsar/pull/8133)
- [Pulsar Admin] Support delete schema ledgers when delete topics [8167](https://github.com/apache/pulsar/pull/8167)
- [Pulsar Admin] Add command to delete a cluster's metadata from ZK [8169](https://github.com/apache/pulsar/pull/8169)
- [Pulsar Admin] Support reset cursor to a batch index for Pulsar Admin [8329](https://github.com/apache/pulsar/pull/8329)

#### Tiered Storage

- [Tiered Storage] Refactored JCloud Tiered Storage [6335](https://github.com/apache/pulsar/pull/6335)
- [Tiered Storage] Remove duplicate updates [8198](https://github.com/apache/pulsar/pull/8198)
- [Tiered Storage] Make the field name in `OffloadPolicies` match with config file [8310](https://github.com/apache/pulsar/pull/8310)  

