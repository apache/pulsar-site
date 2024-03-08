---
id: pulsar-2.11.4
title: Apache Pulsar 2.11.4
sidebar_label: Apache Pulsar 2.11.4
---

## 2024-03-08

### Broker

- [fix][broker] Fix break change: could not subscribe partitioned topic with a suffix-matched regexp due to a mistake of PIP-145 (#21885)
- [fix][broker] Fix String wrong format (#21829)
- [fix][broker] Enabling batch causes negative unackedMessages due to ack and delivery concurrency (#22090)
- [fix][broker] Fix can not subscribe partitioned topic with a suffix-matched regexp (#22025)
- [fix][broker] Fix lookupRequestSemaphore leak when topic not found (#21646)
- [fix][broker] Fix the issue of topics possibly being deleted. (#21704)
- [fix][broker] Fix write all compacted out entry into compacted topic (#21917)
- [fix][broker] Replication stopped due to unload topic failed (#21947)
- [fix][broker] Sanitize values before logging in apply-config-from-env.py script (#22044)
- [fix][broker] Support running docker container with gid != 0 (#22081)
- [fix][broker] Update topic policies as much as possible when some ex was thrown (#21810)
- [fix][broker] fix the wrong value of BrokerSrevice.maxUnackedMsgsPerDispatcher (#21765)
- [fix][broker]Delete compacted ledger when topic is deleted (#21745) (#21850)
- [fix][broker]Fix NonPersistentDispatcherMultipleConsumers ArrayIndexOutOfBoundsException (#21856)
- [fix][broker][branch-3.1] Avoid PublishRateLimiter use an already closed RateLimiter (#22011)
- [fix][ml] Fix retry mechanism of deleting ledgers to invalidate (#21869)
- [improve][admin] internalGetMessageById shouldn't be allowed on partitioned topic (#19013)
- [improve][broker] Add fine-grain authorization to retention admin API (#22163)
- [improve][broker] Avoid print redirect exception log when get list from bundle (#20846)
- [improve][broker] Consistently add fine-grain authorization to REST API (#22202)
- [improve][broker] Do not print an Error log when responding to `HTTP-404` when calling `Admin API` and the topic does not exist. (#21995)
- [improve][broker] Make get list from bundle Admin API async (#20652)
- [refactor][broker] Suppress error logging when message expiration fails (#19778)

### Misc

- [improve][build] Upgrade Apache ZooKeeper to 3.9.1 (#20933)
- [fix][misc] Bump GRPC version to 1.55.3 to fix CVE (#21057)
- [fix][sec] Bump avro version to 1.11.3 for CVE-2023-39410 (#21341)
- [fix][sec] Exclude avro from hadoop-client (#21719)
- [fix][sec] Upgrade Jetty to 9.4.53 to address CVE-2023-44487 (#21395)
- [fix][sec] Upgrade Jetty to 9.4.54.v20240208 to address CVE-2024-22201 (#22144)
- [fix][sec] Upgrade Netty to 4.1.100 to address CVE-2023-44487 (#21397)
- [fix][sec] Upgrade commons-compress to 1.26.0 (#22086)
- [fix][sec] cve: exclude ch.qos.logback in canal.protocol * resolve CVE-2023-6378 (95e1de78)
- [fix][test] Fix PerformanceProducer send count error (#21706)
- [fix][test] Fix test testTransactionBufferMetrics (#22117)
- [fix][test] Make base test class method protected so that it passes ReportUnannotatedMethods validation (#21976)
- [fix][test] testModularLoadManagerRemoveBundleAndLoad (#19710)

### Proxy

- [improve][proxy] Fix comment about enableProxyStatsEndpoints (#21757)

### Functions

- [fix][fn] Fix Deadlock in Functions Worker LeaderService (#21711)
- [improve][fn] Add configuration for connector & functions package url sources (#22184)
- [improve][fn] Optimize Function Worker startup by lazy loading and direct zip/bytecode access (#22122)

### Clients

- [fix][client] fix huge permits if acked a half batched message (#22091)
