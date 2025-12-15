---
id: pulsar-client-go-0.18.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## What's Changed

* [improve] Modify the negativeACK structure to reduce memory overhead ([#1410](https://github.com/apache/pulsar-client-go/pull/1410)) by @gy-deng
* [feat] Use -1 as sentinel value for namespace and topic admin commands ([#1430](https://github.com/apache/pulsar-client-go/pull/1430)) by @klevy-toast
* [fix] Update namespace & topic admin methods to return nil if unset ([#1433](https://github.com/apache/pulsar-client-go/pull/1433)) by @klevy-toast
* [test] Add unit test for unloading topic before consuming zero queue messages ([#1434](https://github.com/apache/pulsar-client-go/pull/1434)) by @crossoverJie
* [feat] Add timestamp to schema info ([#1436](https://github.com/apache/pulsar-client-go/pull/1436)) by @freeznet
* [fix] Fix the issue of unable to parse non-batch messages that with non-empty properties and empty payloads ([#1435](https://github.com/apache/pulsar-client-go/pull/1435)) by @coderzc
* [chore] Bump `github.com/dvsekhvalnov/jose2go` from 1.6.0 to 1.7.0 ([#1439](https://github.com/apache/pulsar-client-go/pull/1439)) by @dependabot[bot]
* [fix] Fix partition update failure causing existing producers to close ([#1437](https://github.com/apache/pulsar-client-go/pull/1437)) by @RobertIndie
* [feat] Support reloading OAuth2 key file ([#1441](https://github.com/apache/pulsar-client-go/pull/1441)) by @RobertIndie
* [chore] Bump `golang.org/x/crypto` from 0.36.0 to 0.45.0 ([#1440](https://github.com/apache/pulsar-client-go/pull/1440)) by @dependabot[bot]
* [fix] Return error when the client transaction coordinator is nil to p… ([#1444](https://github.com/apache/pulsar-client-go/pull/1444)) by @thomas-bousquet
* [fix] Enhance zero queue consumer reconnection handling and message permit management ([#1443](https://github.com/apache/pulsar-client-go/pull/1443)) by @crossoverJie

## New Contributors

* @gy-deng made their first contribution in [#1410](https://github.com/apache/pulsar-client-go/pull/1410)
* @coderzc made their first contribution in [#1435](https://github.com/apache/pulsar-client-go/pull/1435)
