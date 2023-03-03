---
id: client-cpp-3.1.1
title: Client CPP 3.1.1
sidebar_label: Client CPP 3.1.1
---

## What's Changed
* Fix segfault caused by socket I/O on a closed io_service by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/168
* [fix][build] Hide non-exported symbols from the dependencies by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/155
* [fix] Use authoritative argument correctly in BinaryProtoLookupService::findBroker by @erobot in https://github.com/apache/pulsar-client-cpp/pull/146
* [fix] Fix a crash when closing a connection while connecting by @erobot in https://github.com/apache/pulsar-client-cpp/pull/136
* [fix] Close broker producer created after producer close by @erobot in https://github.com/apache/pulsar-client-cpp/pull/131
* [fix] Fix hostname verification by @izumo27 in https://github.com/apache/pulsar-client-cpp/pull/126

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v3.1.0...v3.1.1
