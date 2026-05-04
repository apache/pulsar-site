---
id: client-cpp-3.7.1
title: Client CPP 3.7.1
sidebar_label: Client CPP 3.7.1
---

## What's Changed
* Fix TableView's existing key-value will never be updated by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/487
* Fix the scripts for downloading GitHub Action artifacts by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/485
* [ci] Fix upload-artifact v3 is not supported by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/484
* Bump curl, openssl, zlib to address CVEs by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/482
* Fix multi-topics-consumer new topic listeners stuck in paused state by @oversearch in https://github.com/apache/pulsar-client-cpp/pull/481
* fix: ignore ping command in connection keepalive logic by @erobot in https://github.com/apache/pulsar-client-cpp/pull/480
* Make it optional to link statically to libgcc and libstdc++ by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/474
* [fix] Fix an issue where zero queue consumers are unable to receive messages after topic unloading by @massakam in https://github.com/apache/pulsar-client-cpp/pull/473

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v3.7.0...v3.7.1
