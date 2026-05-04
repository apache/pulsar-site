---
id: client-cpp-3.7.0
title: Client CPP 3.7.0
sidebar_label: Client CPP 3.7.0
---

## What's Changed
* Fix buffer overflow for non-batched send when the message metadata size exceeds 64KB by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/443
* fix: Keep compatible with old boost versions by @erobot in https://github.com/apache/pulsar-client-cpp/pull/444
* Bumped version to 3.7.0-pre by @shibd in https://github.com/apache/pulsar-client-cpp/pull/445
* Fix ack failure on message listener in multi topics consumer by @nkurihar in https://github.com/apache/pulsar-client-cpp/pull/447
* Fix the YAML format error in latest image by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/452
* Fix default operation timeout by @arhoads in https://github.com/apache/pulsar-client-cpp/pull/450
* Expose keep alive interval for c and c++ client by @shibd in https://github.com/apache/pulsar-client-cpp/pull/457
* Handle the exception from the token supplier by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/458
* [fix][doc] Update README to build wireshark plugin correctly by @ocadaruma in https://github.com/apache/pulsar-client-cpp/pull/460
* Bump macos runner image to 14 by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/463
* Fix startMessageInclusive does not work if the 1st message is a chunked message by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/462
* [fix] Fix issue where cert chain is not taken into account in mTLS authentication by @massakam in https://github.com/apache/pulsar-client-cpp/pull/467
* Fix some compiler warnings in public headers by @erobot in https://github.com/apache/pulsar-client-cpp/pull/468
* Use vcpkg to build macOS packages by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/465

## New Contributors
* @nkurihar made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/447
* @arhoads made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/450
* @ocadaruma made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/460

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v3.6.0...v3.7.0
