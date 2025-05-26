---
id: pulsar-client-go-0.14.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## Important notice

- The client has dropped support for Go 1.20. The minimum supported version is now Go
  1.21. ([Related PR](https://github.com/apache/pulsar-client-go/pull/1249))
- The `BackoffPolicy` interface and related methods has been moved to the `backoff` package from the `internal` package.
  The `BackoffPolicy` interface is renamed to
  `Policy`. ([Related PR](https://github.com/apache/pulsar-client-go/pull/1197))

## What's Changed
* [improve] Install golang by image in the Dockerfile by @nodece in https://github.com/apache/pulsar-client-go/pull/1246
* [ci] Validate multiple version builds and use golangci-lint-action by @nodece in https://github.com/apache/pulsar-client-go/pull/1250
* [ci] Add merge limitation by @nodece in https://github.com/apache/pulsar-client-go/pull/1248
* [fix] Fix the key-based batch can't guarantee the ordering when flushing by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1252
* [fix] FailTimeoutMessages cannot delete outdated messages by @nodece in https://github.com/apache/pulsar-client-go/pull/1247
* [fix] Fix pulsar admin revoke subscription permission endpoint by @NoFacePeace in https://github.com/apache/pulsar-client-go/pull/1251
* [fix] Producer close was blocked by @nodece in https://github.com/apache/pulsar-client-go/pull/1249
* [fix] PulsarCtl 1266 Oauth2 Client credentials flow use scopes from the keyfile as well by @Nikolajls in https://github.com/apache/pulsar-client-go/pull/1244
* [feat] Add support for subscription expiration time namespace settings by @klevy-toast in https://github.com/apache/pulsar-client-go/pull/1254
* [fix] Prevent panic when calling Flush on closed producer by @Gilthoniel in https://github.com/apache/pulsar-client-go/pull/1260
* [fix] Avoid a data race when flushing with load by @Gilthoniel in https://github.com/apache/pulsar-client-go/pull/1261
* [improve] Add InitialSubscriptionName for DLQPolicy by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1264
* [fix] Peek message will return -1 for partitionIndex by @shibd in https://github.com/apache/pulsar-client-go/pull/1267
* [chore] Bump github.com/docker/docker from 27.0.3+incompatible to 27.1.1+incompatible by @dependabot in https://github.com/apache/pulsar-client-go/pull/1269
* [feat] Support the namespace offloadThresholdInSeconds API in pulsaradmin pkg by @ericsyh in https://github.com/apache/pulsar-client-go/pull/1271
* [fix] Stop timer when close timedAckGroupingTracker by @geniusjoe in https://github.com/apache/pulsar-client-go/pull/1279
* [improve] Refactor connection concurrency model by @Gilthoniel in https://github.com/apache/pulsar-client-go/pull/1275
* [fix] Attempt to avoid deadlock during reconnection by @Gilthoniel in https://github.com/apache/pulsar-client-go/pull/1273
* [fix] Fixed panic caused by memory not aligned in arm32 arch by @dream-kzx in https://github.com/apache/pulsar-client-go/pull/1286
* [fix] Reconnection logic and Backoff policy doesn't work correctly by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1197

## New Contributors
* @NoFacePeace made their first contribution in https://github.com/apache/pulsar-client-go/pull/1251
* @Nikolajls made their first contribution in https://github.com/apache/pulsar-client-go/pull/1244
* @klevy-toast made their first contribution in https://github.com/apache/pulsar-client-go/pull/1254
* @ericsyh made their first contribution in https://github.com/apache/pulsar-client-go/pull/1271
* @dream-kzx made their first contribution in https://github.com/apache/pulsar-client-go/pull/1286