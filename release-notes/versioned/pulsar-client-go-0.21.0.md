---
id: pulsar-client-go-0.21.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## What's Changed

* [improve] Reduce unnecessary creation of retry topics and DLQ topics ([#1459](https://github.com/apache/pulsar-client-go/pull/1459)) by @zjxxzjwang
* [feat] Add offload policies API and tests to pulsaradmin ([#1512](https://github.com/apache/pulsar-client-go/pull/1512)) by @freeznet
* [fix] Escape configuration values in `UpdateDynamicConfiguration` ([#1505](https://github.com/apache/pulsar-client-go/pull/1505)) by @Demogorgon314
* [chore] Update Go to 1.25 and update the linter ([#1515](https://github.com/apache/pulsar-client-go/pull/1515)) by @kellyfj
* [improve] Implement `tls_client_auth` for OAuth2 ([#1514](https://github.com/apache/pulsar-client-go/pull/1514)) by @izumo27
* [chore] Update Testcontainers and change the Docker dependency to Moby ([#1513](https://github.com/apache/pulsar-client-go/pull/1513)) by @kellyfj
* [docs] Add chunking documentation for DLQ/RLQ and integration tests ([#1511](https://github.com/apache/pulsar-client-go/pull/1511)) by @geniusjoe
* [fix] Add bounds check for partition index `int32` conversion ([#1517](https://github.com/apache/pulsar-client-go/pull/1517)) by @merlimat

## New Contributors

* @zjxxzjwang made their first contribution in [#1459](https://github.com/apache/pulsar-client-go/pull/1459)
* @kellyfj made their first contribution in [#1515](https://github.com/apache/pulsar-client-go/pull/1515)
