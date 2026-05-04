---
id: pulsar-client-go-0.17.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## What's Changed

* [feat] Add `eventTime` support in `reconsumeLaterWithCustomProperties()` ([#1400](https://github.com/apache/pulsar-client-go/pull/1400)) by @YoungCoderboy
* [fix] Replace panic with proper error handling in RPC client and lookup service ([#1403](https://github.com/apache/pulsar-client-go/pull/1403)) by @RobertIndie
* [fix] DLQ messages lost system properties when sent from `reconsumeLater()` ([#1392](https://github.com/apache/pulsar-client-go/pull/1392)) by @geniusjoe
* [fix] Handle reconnection logic for zero-queue consumer ([#1404](https://github.com/apache/pulsar-client-go/pull/1404)) by @crossoverJie
* [fix] Add `DLQPolicy.DeadLetterTopicProducerName` to preserve producer name in DLQ messages ([#1417](https://github.com/apache/pulsar-client-go/pull/1417)) by @thomas-bousquet
* [fix] Fix missing topic in DLQ producer name when using `RetryEnable` option ([#1412](https://github.com/apache/pulsar-client-go/pull/1412)) by @geniusjoe
* [fix] `SendAsync` now respects context and can timeout during reconnection ([#1422](https://github.com/apache/pulsar-client-go/pull/1422)) by @RobertIndie
* [fix] Improve zero-queue consumer support for partitioned topics ([#1424](https://github.com/apache/pulsar-client-go/pull/1424)) by @crossoverJie
* [fix] Properties not consistently set in pulsar-admin subscription responses ([#1419](https://github.com/apache/pulsar-client-go/pull/1419)) by @JamesMurkin
* [feat] Support `Snappy` compression type ([#1406](https://github.com/apache/pulsar-client-go/pull/1406)) by @geniusjoe
* [feat] Add `WithContext()` admin client methods ([#1425](https://github.com/apache/pulsar-client-go/pull/1425)) by @thomas-bousquet
* [feat] Add support for max topics per namespace ([#1413](https://github.com/apache/pulsar-client-go/pull/1413)) by @miton18
* [fix] Allow multiple callbacks with concurrent producer flushes (async publish) ([#1409](https://github.com/apache/pulsar-client-go/pull/1409)) by @thomas-bousquet
* [improve] Change `pulsar_client_sending_buffers_count` metric to client level ([#1408](https://github.com/apache/pulsar-client-go/pull/1408)) by @BewareMyPower
* [chore] Upgrade `hamba/avro` to v2.29.0 ([#1414](https://github.com/apache/pulsar-client-go/pull/1414)) by @nodece
* [chore] Bump `github.com/go-viper/mapstructure/v2` from 2.2.1 to 2.4.0 ([#1415](https://github.com/apache/pulsar-client-go/pull/1415)) by @dependabot[bot]
* [chore] Bump `github.com/docker/docker` from 27.1.1+incompatible to 28.0.0+incompatible ([#1405](https://github.com/apache/pulsar-client-go/pull/1405)) by @dependabot[bot]

## New Contributors

* @YoungCoderboy made their first contribution in [#1400](https://github.com/apache/pulsar-client-go/pull/1400)
* @JamesMurkin made their first contribution in [#1419](https://github.com/apache/pulsar-client-go/pull/1419)