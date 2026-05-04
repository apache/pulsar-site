---
id: pulsar-client-go-0.16.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## What's Changed

* [fix][sec] Bump golang.org/x/net to address CVE-2025-22870, requires go 1.23 by @lhotari in https://github.com/apache/pulsar-client-go/pull/1351
* [chore] Bump github.com/golang-jwt/jwt/v5 from 5.2.1 to 5.2.2 by @dependabot in https://github.com/apache/pulsar-client-go/pull/1349
* [chore] Bump github.com/containerd/containerd from 1.7.18 to 1.7.27 by @dependabot in https://github.com/apache/pulsar-client-go/pull/1348
* [fix] Use sha instead of tag for golangci/golangci-lint-action by @nodece in https://github.com/apache/pulsar-client-go/pull/1352
* [feat] Prefetch role tokens in the background in the Athenz auth plugin by @masahiro-sakamoto in https://github.com/apache/pulsar-client-go/pull/1355
* [feat] Make ZTS proxy configurable in athenz auth plugin by @masahiro-sakamoto in https://github.com/apache/pulsar-client-go/pull/1360
* [fix] Fix reader hanging when startMessageId is latest by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1364
* [fix] Fix CI can't be failed even the tests are failed by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1367
* [improve] Improve perf with level guard in slogWrapper calls by @gareth-murphy in https://github.com/apache/pulsar-client-go/pull/1374
* [feat] Support update or remove topic properties by @yunze-xu in https://github.com/apache/pulsar-client-go/pull/1381
* [test] Skip very flaky TestMessageSingleRouter for now by @yunze-xu in https://github.com/apache/pulsar-client-go/pull/1382
* [improve] Support ClientVersion in 2.x pulsar broker by @zhou-zhuohan in https://github.com/apache/pulsar-client-go/pull/1383
* [test] Add Testcase to test using keyShared subscription and delayed messages at the same time by @zhou-zhuohan in https://github.com/apache/pulsar-client-go/pull/1361
* [fix] Support json token file format authentication by @qiang-zhao in https://github.com/apache/pulsar-client-go/pull/1380
* [chore] Replace deprecated api rand.Seed by @young-xu in https://github.com/apache/pulsar-client-go/pull/1363
* [fix] Fix namespace schema compatibility strategy by @rui-fu in https://github.com/apache/pulsar-client-go/pull/1386
* [fix] Fix backoff unit tests by @zhou-zhuohan in https://github.com/apache/pulsar-client-go/pull/1387
* [improve] Support http lookup getSchema interface by @zhou-zhuohan in https://github.com/apache/pulsar-client-go/pull/1368
* [fix] Fix the default nack backoff policy by @Gilthoniel in https://github.com/apache/pulsar-client-go/pull/1385
* [feat] Add pulsar admin namespace properties methods for PUT/GET/DELETE by @thomas-bousquet in https://github.com/apache/pulsar-client-go/pull/1390
* [fix] Fix sending buffer race by using proper reference counting by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1394
* [fix] ZeroQueueConsumer is not supported with RetryEnable by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1391
* [fix] Add missing metric tracking of `pulsar_client_consumer_acks` for AckIDList method by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1396
* [feat] Align topics level policies admin apis to java restful apis by @rui-fu in https://github.com/apache/pulsar-client-go/pull/1398

## New Contributors
* @gmurphy-cogito made their first contribution in https://github.com/apache/pulsar-client-go/pull/1374
* @mattisonchao made their first contribution in https://github.com/apache/pulsar-client-go/pull/1380
* @xuthus5 made their first contribution in https://github.com/apache/pulsar-client-go/pull/1363
* @thomas-bousquet made their first contribution in https://github.com/apache/pulsar-client-go/pull/1390
