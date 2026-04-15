---
id: pulsar-client-go-0.19.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## What's Changed

* [fix] Add JSON tag for `UpdateAuthData` in `UpdateOptions` ([#1450](https://github.com/apache/pulsar-client-go/pull/1450)) by @freeznet
* [feat] Add `RemovePersistence` methods to namespace admin ([#1447](https://github.com/apache/pulsar-client-go/pull/1447)) by @freeznet
* [improve] Add support for PIP-431: creation and last publish timestamps ([#1451](https://github.com/apache/pulsar-client-go/pull/1451)) by @codelipenghui
* [docs] Update example code and add log initialization configurations ([#1449](https://github.com/apache/pulsar-client-go/pull/1449)) by @geniusjoe
* [docs] Update release process to link release and release notes to the Pulsar website ([#1453](https://github.com/apache/pulsar-client-go/pull/1453)) by @RobertIndie
* [improve] Change producer reconnect error logs to warn logs ([#1445](https://github.com/apache/pulsar-client-go/pull/1445)) by @RobertIndie
* [feat] Implement `ReconsumeLater` on regex consumer ([#1456](https://github.com/apache/pulsar-client-go/pull/1456)) by @jordanfitz
* [feat] Add support for issuer URL override in client credentials flow ([#1463](https://github.com/apache/pulsar-client-go/pull/1463)) by @freeznet
* [feat] Add removal methods for namespace policies ([#1465](https://github.com/apache/pulsar-client-go/pull/1465)) by @freeznet
* [feat] Add support for retrieving schema compatibility strategy with options ([#1469](https://github.com/apache/pulsar-client-go/pull/1469)) by @freeznet
* [feat] Add remove replication clusters topic API ([#1470](https://github.com/apache/pulsar-client-go/pull/1470)) by @freeznet
* [feat] Treat `ProducerBlockedQuotaExceededException` as retryable and continue reconnecting ([#1457](https://github.com/apache/pulsar-client-go/pull/1457)) by @geniusjoe
* [fix] Fix panic when messages size is 0 ([#1460](https://github.com/apache/pulsar-client-go/pull/1460)) by @unJASON
* [improve] Make service URL parsing compatible with Go 1.26 ([#1468](https://github.com/apache/pulsar-client-go/pull/1468)) by @nodece
* [feat] Add scoped topic policies support ([#1471](https://github.com/apache/pulsar-client-go/pull/1471)) by @freeznet
* [fix] Fix consumer not consuming resent chunked messages ([#1464](https://github.com/apache/pulsar-client-go/pull/1464)) by @geniusjoe

## New Contributors

* @codelipenghui made their first contribution in [#1451](https://github.com/apache/pulsar-client-go/pull/1451)
* @jordanfitz made their first contribution in [#1456](https://github.com/apache/pulsar-client-go/pull/1456)
* @unJASON made their first contribution in [#1460](https://github.com/apache/pulsar-client-go/pull/1460)
