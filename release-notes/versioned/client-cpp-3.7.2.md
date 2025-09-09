---
id: client-cpp-3.7.2
title: Client CPP 3.7.2
sidebar_label: Client CPP 3.7.2
---

**What's Changed**

* Remove static link to libstdc++ to avoid conflicts by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/493
* Fix acknowledgeCumulative never returns when accepting an invalid message id for a multi-topics consumer by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/492
* Avoid getLastMessageId RPC when calling hasMessageAvailable after seek by timestamp by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/491
* Fix stage-release.sh does not delete the Windows temporary directories by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/488

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v3.7.1...v3.7.2
