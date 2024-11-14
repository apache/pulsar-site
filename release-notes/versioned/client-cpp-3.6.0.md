---
id: client-cpp-3.6.0
title: Client CPP 3.6.0
sidebar_label: Client CPP 3.6.0
---

## What's Changed
* [feat] Add startPaused setting to consumer by @massakam in https://github.com/apache/pulsar-client-cpp/pull/416
* Support customize vcpkg directory when INTEGRATE_VCPKG is ON by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/417
* Fix broken wireshark build workflow on macOS  by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/414
* Bumped version to 3.6.0-pre by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/418
* Fix minor issues reported by CodeQL by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/421
* Fix wrong results of hasMessageAvailable and readNext after seeking by timestamp by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/422
* fix: Incorrect acknowledgment behavior in the listener of the multi-t… by @shibd in https://github.com/apache/pulsar-client-cpp/pull/423
* Support seek operation on a multi-topics consumer by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/426
* Log the default location of trusted CA certificates when tlsTrustCertsFilePath is not specified by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/429
* Use Rocky Linux 8 and vcpkg to build RPM packages by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/428
* Add -Bsymbolic link option to avoid symbol interposition by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/432
* [CI] Use macos-12 to build macOS libraries by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/433
* feat: expose partitions update interval configuration to C client by @shibd in https://github.com/apache/pulsar-client-cpp/pull/437
* Fix consumer might not subscribe after a reconnection by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/438
* Fix invalid memory access on the first pending batch receive callback by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/441


**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v3.5.1...v3.6.0
