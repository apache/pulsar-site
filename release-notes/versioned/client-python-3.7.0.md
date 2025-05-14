---
id: client-python-3.7.0
title: Client Python 3.7.0
sidebar_label: Client Python 3.7.0
---

## What's Changed
* Set the minimum macOS version to 13 by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/239
* Update the release process for twine upload and supported versions by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/240
* Fix conflicts with other python libraries due to static link to libgcc and libstdc++ by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/244
* Bumped version to 3.7.0a1 by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/241
* add stats_interval_in_seconds parameter to the client configuration by @hadican in https://github.com/apache/pulsar-client-python/pull/248
* Bump manylinux versions for CVEs by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/250
* Add separated TLS transport configs by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/252
* Support constructing MessageId from results of send() and receive() by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/254
* Support ConsumerCryptoFailureAction for consumer and reader by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/253
* Support TableView by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/251

## New Contributors
* @hadican made their first contribution in https://github.com/apache/pulsar-client-python/pull/248

**Full Changelog**: https://github.com/apache/pulsar-client-python/compare/v3.6.1...v3.7.0
