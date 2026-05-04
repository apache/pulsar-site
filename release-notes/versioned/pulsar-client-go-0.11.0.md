---
id: pulsar-client-go-0.11.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## Features
* Support the schema type ProtoNativeSchema by @gaoran10 in https://github.com/apache/pulsar-client-go/pull/1006
* Implement transactional consumer/producer API by @liangyepianzhou in https://github.com/apache/pulsar-client-go/pull/1002
* Support NonDurable subscriptions by @dinghram in https://github.com/apache/pulsar-client-go/pull/992
* Allow user to specify TLS ciphers an min/max TLS version by @dinghram in https://github.com/apache/pulsar-client-go/pull/1041
* Add single partition router by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/999

## Improve
* Fix missing link in the release process by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1000
* Stablize golangci-lint task in CI by @tisonkun in https://github.com/apache/pulsar-client-go/pull/1007
* Fix reconnection backoff logic by @wolfstudy in https://github.com/apache/pulsar-client-go/pull/1008
* Change token name to `GITHUB_TOKEN` in CI by @labuladong in https://github.com/apache/pulsar-client-go/pull/910
* Add links to client docs and feature matrix in README.md by @momo-jun in https://github.com/apache/pulsar-client-go/pull/1014
* Fix flaky test `TestMaxPendingChunkMessages` by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/1003
* Fix flaky test in `negative_acks_tracker_test.go` by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1017
* Fix event time not being set when batching is disabled by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1015
* Use maphash instead of crypto/sha256 for hash function of hashmap in Schema.hash() by @bpereto in https://github.com/apache/pulsar-client-go/pull/1022
* Improve logs on failTimeoutMessages by @tisonkun in https://github.com/apache/pulsar-client-go/pull/1025
* Delete LICENSE-go-rate.txt by @tisonkun in https://github.com/apache/pulsar-client-go/pull/1028
* Fix broken master by upgrading JRE to 17 by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/1030
* Split sendRequest and make reconnectToBroker and other operation in the same coroutine by @zengguan in https://github.com/apache/pulsar-client-go/pull/1029
* Install openjdk-17 in Dockerfile by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1037
* Fix ordering key not being set and parsed when batching is disabled by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1034
* Check if callback is nil before calling it by @gunli in https://github.com/apache/pulsar-client-go/pull/1036
* Refactor duplicated code lines and fix typo errors by @gunli in https://github.com/apache/pulsar-client-go/pull/1039

## New Contributors
* @gaoran10 made their first contribution in https://github.com/apache/pulsar-client-go/pull/1006
* @momo-jun made their first contribution in https://github.com/apache/pulsar-client-go/pull/1014
* @bpereto made their first contribution in https://github.com/apache/pulsar-client-go/pull/1022
* @zengguan made their first contribution in https://github.com/apache/pulsar-client-go/pull/1029
* @gunli made their first contribution in https://github.com/apache/pulsar-client-go/pull/1036