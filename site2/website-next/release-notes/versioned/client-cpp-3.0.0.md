---
id: client-cpp-3.0.0
title: Client CPP 3.0.0
sidebar_label: Client CPP 3.0.0
---

- [fix][c++] Rename function name: pulsar_producer_configuration_set_crypto_failure_action [#16031](https://github.com/apache/pulsar/pull/16031)
- [fix][c++] Fix the close of Client might stuck or return a wrong result [#16285](https://github.com/apache/pulsar/pull/16285)
- [fix][c++] Fix libcurl build failure when building deb package [#17614](https://github.com/apache/pulsar/pull/17614)
- [fix][c++] Fix multi-topics consumer close segmentation fault [#17239](https://github.com/apache/pulsar/pull/17239)
- [fix][c++] Fix potential segfault when resending messages [#17395](https://github.com/apache/pulsar/pull/17395)
- [improve][c++] Reset `havePendingPingRequest` flag for any data received from broker [#17658](https://github.com/apache/pulsar/pull/17658)
- [improve][c++] Use an atomic `state_` instead of the lock to improve performance [#16940](https://github.com/apache/pulsar/pull/16940)
- [improve][c++] Upgrade OpenSSL to version 1.1.1n [#17538](https://github.com/apache/pulsar/pull/17538)
- [improve][c++] Delete PartitionedConsumerImpl, use MultiTopicsConsumerImpl instead [#16969](https://github.com/apache/pulsar/pull/16969)
- [cleanup][c++] Clean up C++ client curl configuration [#16064](https://github.com/apache/pulsar/pull/16064)

## What's Changed
* PIP-209: Removed Python client wrapper by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/1
* PIP-209: Build C++ client in standalone repo by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/2
* Added .asf.yaml file by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/3
* Add pull request template by @Demogorgon314 in https://github.com/apache/pulsar-client-cpp/pull/8
* Add bug report issue template by @Demogorgon314 in https://github.com/apache/pulsar-client-cpp/pull/7
* Added license and notice files by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/9
* Fixed RPM / Deb / APK packages and enabled CI build by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/11
* Add TLS transport config by @nodece in https://github.com/apache/pulsar-client-cpp/pull/12
* Build release artifacts by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/15
* Run unit tests in CI by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/14
* Enable format check in PR validation by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/17
* Install googletest with homebrew in macOS by @maxsxu in https://github.com/apache/pulsar-client-cpp/pull/20
* Added script to download release artifacts by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/18
* Build images with deps versions by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/19
* Renamed github action jobs and removed centos7 build by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/25
* Generate and install pulsarStaticWithDeps into correct paths by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/26
* [fix] Fix README.md build path by @Demogorgon314 in https://github.com/apache/pulsar-client-cpp/pull/29
* [fix] Force static libraries to be linked when LINK_STATIC is enabled by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/28
* [feat] Expose start message id inclusive configuration to C API by @Demogorgon314 in https://github.com/apache/pulsar-client-cpp/pull/27
* Removed extra call of `find_package(OpenSSL)` by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/30
* Fix incorrect path in docker scripts by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/32
* Enable required check status for PR validation by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/33
* Link to OpenSSL statically when LINK_STATIC is ON by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/31
* [docs] Fix compilation guidance on Ubuntu by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/34

## New Contributors
* @nodece made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/12
* @maxsxu made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/20

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/commits/v3.0.0
