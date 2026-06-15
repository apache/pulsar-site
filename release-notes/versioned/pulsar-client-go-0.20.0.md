---
id: pulsar-client-go-0.20.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## What's Changed

* [test] Add localhost advertised address to standalone startup ([#1480](https://github.com/apache/pulsar-client-go/pull/1480)) by @RobertIndie
* [fix] Deliver null-value tombstones instead of discarding them ([#1482](https://github.com/apache/pulsar-client-go/pull/1482)) by @jcmfernandes
* [fix] Fix race in `grabConn` dropping messages before handler registration ([#1476](https://github.com/apache/pulsar-client-go/pull/1476)) by @aleks-lazic
* [fix] Add `batchIdx` to `messageID.String()` for batched messages ([#1491](https://github.com/apache/pulsar-client-go/pull/1491)) by @adrianiacobghiula
* [feat] Add consumer `PriorityLevel` support ([#1487](https://github.com/apache/pulsar-client-go/pull/1487)) by @grishaf
* [fix] Make access to `consumer.consumers` thread-safe ([#1494](https://github.com/apache/pulsar-client-go/pull/1494)) by @BewareMyPower
* [fix] Fix connection panic caused by `WaitGroup` misuse on close ([#1484](https://github.com/apache/pulsar-client-go/pull/1484)) by @nodece
* [test] Fix `TestPriorityConsumer` ([#1495](https://github.com/apache/pulsar-client-go/pull/1495)) by @nodece
* [docs] Enhance `ConnectionTimeout` and `KeepAliveInterval` comments ([#1488](https://github.com/apache/pulsar-client-go/pull/1488)) by @geniusjoe
* [fix] Add reconnect failure listener and auto-close on max retry exhaustion ([#1490](https://github.com/apache/pulsar-client-go/pull/1490)) by @PavelZeger
* [fix] Fix deadlock when increasing partitioned consumers ([#1500](https://github.com/apache/pulsar-client-go/pull/1500)) by @BewareMyPower
* [docs] Clarify `SendAsync` description ([#1485](https://github.com/apache/pulsar-client-go/pull/1485)) by @MukundaKatta
* [fix] Remove default case in `waitWithContext` to prevent busy-spin deadlock ([#1503](https://github.com/apache/pulsar-client-go/pull/1503)) by @nodece

## New Contributors

* @jcmfernandes made their first contribution in [#1482](https://github.com/apache/pulsar-client-go/pull/1482)
* @aleks-lazic made their first contribution in [#1476](https://github.com/apache/pulsar-client-go/pull/1476)
* @grishaf made their first contribution in [#1487](https://github.com/apache/pulsar-client-go/pull/1487)
* @PavelZeger made their first contribution in [#1490](https://github.com/apache/pulsar-client-go/pull/1490)
* @MukundaKatta made their first contribution in [#1485](https://github.com/apache/pulsar-client-go/pull/1485)
