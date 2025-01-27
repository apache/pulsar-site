---
id: client-python-3.6.0
title: Client Python 3.6.0
sidebar_label: Client Python 3.6.0
---

## What's Changed
* Bumped version to 3.6.0a1 by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/210
* Set grpcio minimum version to 1.59.3 so that Alpine py3-grpcio can be used by @lhotari in https://github.com/apache/pulsar-client-python/pull/211
* Fix failed AsyncioTest.test_send_failure and clean up tests by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/231
* Build the C extension with optimize options enabled by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/230
* Fix typos by @kianmeng in https://github.com/apache/pulsar-client-python/pull/232
* Fix the broken CI due to the regression of 4.0.1 and some deprecated image and links by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/235
* Upgrade the C++ client to 3.7.0 by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/237
* Support seek a MessageId from pulsar module by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/233
* Support Python 3.13 and drop the support for Python 3.8 by @BewareMyPower in https://github.com/apache/pulsar-client-python/pull/238

## New Contributors
* @lhotari made their first contribution in https://github.com/apache/pulsar-client-python/pull/211
* @kianmeng made their first contribution in https://github.com/apache/pulsar-client-python/pull/232

**Full Changelog**: https://github.com/apache/pulsar-client-python/compare/v3.5.0...v3.6.0
