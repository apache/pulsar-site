---
id: client-python-3.5.0
title: Client Python 3.5.0
sidebar_label: Client Python 3.5.0
---

## What's Changed
* Fix incorrect command in release doc by @RobertIndie in https://github.com/apache/pulsar-client-python/pull/176
* Fix incorrect python spec name for release wheels workflow by @RobertIndie in https://github.com/apache/pulsar-client-python/pull/177
* Fix incorrect version upgrade command in RELEASE.md by @RobertIndie in https://github.com/apache/pulsar-client-python/pull/179
* Fix negative acknowledge on a message ID does not work by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/180
* Fix windows release CI doesn't show the python version by @RobertIndie in https://github.com/apache/pulsar-client-python/pull/182
* Fix missing dependency of setuptools by @RobertIndie in https://github.com/apache/pulsar-client-python/pull/183
* Fix the incompatibility with Python 3.12 and drop the support for 3.7 by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/181
* Document the requirement for the send_async method by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/186
* Bumped version to 3.5.0a1 by @RobertIndie in https://github.com/apache/pulsar-client-python/pull/191
* Fix the release doc for PyPI login and release note sample PR by @RobertIndie in https://github.com/apache/pulsar-client-python/pull/192
* [asyncio] Support creating producer and sending messages by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/189
* [docs] Add guide to avoid logs from the default logger by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/195
* Disable topic level policies to make tests work for latest Pulsar by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/201
* Fix incorrect logs when a message failed to be decoded with the writer schema by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/200
* Enable CodeQL static scanner by @merlimat in https://github.com/apache/pulsar-client-python/pull/197
* Upgrade the C++ client to 3.5.0 for some bug fixes by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/202
* Fix incorrect type hints in Client by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/204
* Add documents for the batching arguments when creating producer by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/205
* Add Consumer.consumer_name() API by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/206
* Upgrade the C++ client to 3.5.1 by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/209


**Full Changelog**: https://github.com/apache/pulsar-client-python/compare/v3.4.0...v3.5.0
