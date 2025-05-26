---
id: pulsar-client-go-0.15.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## Important notice

- The client has dropped support for Go 1.21. The minimum supported version is now Go
  1.22. ([Related PR](https://github.com/apache/pulsar-client-go/pull/1300))

## What's Changed
* [fix] Fix flaky test `TestCloseFlushWithTimer` by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1292
* [feat] Add GetAllSchemas command by @calindima in https://github.com/apache/pulsar-client-go/pull/1289
* [improve] Include std tlsconfig in tlsoptions by @dream-kzx in https://github.com/apache/pulsar-client-go/pull/1293
* [fix] Decompress payload only if not empty by @stepanbujnak in https://github.com/apache/pulsar-client-go/pull/1280
* [chore] Bump hamba version to v2.26.0 by @hezhangjian in https://github.com/apache/pulsar-client-go/pull/1294
* [chore] Delete unused .header file by @hezhangjian in https://github.com/apache/pulsar-client-go/pull/1295
* [test] Use pulsar-client-go-test docker for `TestBlueGreenMigrationTestSuite` by @geniusjoe in https://github.com/apache/pulsar-client-go/pull/1287
* [improve] Use `chan *message` instead of `chan []*message` for queueCh by @nodece in https://github.com/apache/pulsar-client-go/pull/1283
* [fix] Compatible with HTTP header properties PIP-279 by @shibd in https://github.com/apache/pulsar-client-go/pull/1299
* [chore] Bump minimum Go version to 1.22 by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/1300
* [test] Upgrade pulsar image to 4.0.0 in tests by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1304
* [feat] PIP-368: Support lookup based on lookup properties by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1303
* [fix] Fix seek race by @nodece in https://github.com/apache/pulsar-client-go/pull/1265
* [feat] Support acknowledging a list of message IDs by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/1301
* [improve] Use ctx and timer instead of sleep by @nodece in https://github.com/apache/pulsar-client-go/pull/1256
* [chore] Remove unused fields and methods for internal connection by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/1306
* [improve] Improve AckIDList performance with many subscribed topics by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/1305
* [chore] Remove unnecessary code by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1307
* [improve] Admin GetStats: Fill missing fields by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1309
* [fix] Revert #1283 to fix possible deadlock when queueCh is full by @shibd in https://github.com/apache/pulsar-client-go/pull/1311
* [fix] Fix close blocked by @nodece in https://github.com/apache/pulsar-client-go/pull/1308
* [fix] Fix DLQ producer name conflicts with same name consumers by @geniusjoe in https://github.com/apache/pulsar-client-go/pull/1314
* [fix] Fix multiple consumers using zeroQueueConsumer by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1278
* [feat] PIP-254: Support configuring client version by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1316
* [fix] Enhance transaction functionality by @reugn in https://github.com/apache/pulsar-client-go/pull/1281
* [chore] Bump golang.org/x/crypto from 0.22.0 to 0.31.0 by @dependabot in https://github.com/apache/pulsar-client-go/pull/1318
* [fix] Wrap errors using %w to preserve context by @reugn in https://github.com/apache/pulsar-client-go/pull/1321
* [refactor] Use errors.Join to wrap multiple errors by @reugn in https://github.com/apache/pulsar-client-go/pull/1322
* [fix] Fix same producer/consumer using more than one connection per broker by @shibd in https://github.com/apache/pulsar-client-go/pull/1323
* [chore] Deprecated usages by @miton18 in https://github.com/apache/pulsar-client-go/pull/1329
* [chore] Upgrade lz4 to v4 by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1341
* [opt] Delete redundant channel connection.incomingCmdCh by @gunli in https://github.com/apache/pulsar-client-go/pull/1343
* [improve] Improve message decompress error handling by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1342
* [fix] Fix potential data/write conflicts by @gunli in https://github.com/apache/pulsar-client-go/pull/1336
* [chore] Update dependency versions by @reugn in https://github.com/apache/pulsar-client-go/pull/1327
* [fix] Fix wrong result of reader.hasNext/Next after seeking by id or time by @shibd in https://github.com/apache/pulsar-client-go/pull/1340
* [fix] Fix potential data race by @gunli in https://github.com/apache/pulsar-client-go/pull/1338
* [chore] Bump golang.org/x/net from 0.23.0 to 0.33.0 by @dependabot in https://github.com/apache/pulsar-client-go/pull/1334
* [improve] Update deliverAfter and deliverAt API comments by @geniusjoe in https://github.com/apache/pulsar-client-go/pull/1339
* [fix] Fix potential data race in pendingItem.done() by @gunli in https://github.com/apache/pulsar-client-go/pull/1347

## New Contributors
* @calindima made their first contribution in https://github.com/apache/pulsar-client-go/pull/1289
* @stepanbujnak made their first contribution in https://github.com/apache/pulsar-client-go/pull/1280
* @miton18 made their first contribution in https://github.com/apache/pulsar-client-go/pull/1329