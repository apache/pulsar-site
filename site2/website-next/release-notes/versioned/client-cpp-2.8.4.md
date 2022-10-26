---
id: client-cpp-2.8.4
title: Client CPP 2.8.4
sidebar_label: Client CPP 2.8.4
---

- [improve][cpp] Expose getLastMessageId in the Reader API [11723](https://github.com/apache/pulsar/pull/11723)
- [fix][cpp] Fix hasMessageAvailable returns wrong value for last message [13883](https://github.com/apache/pulsar/pull/13883)
- [fix][cpp] Fix thread safety issue for multi topic consumer  [14380](https://github.com/apache/pulsar/pull/14380)
- [fix][cpp] Fix wrong unit of Access Token Response's `expires_in` field [14554](https://github.com/apache/pulsar/pull/14554)
- [fix][cpp] Handle exception in creating socket when fd limit is reached [14587](https://github.com/apache/pulsar/pull/14587)
- [cleanup][cpp] Add braces around initialization of subobject [14735](https://github.com/apache/pulsar/pull/14735)
- [fix][cpp] Fix producer is never destructed until client is closed [14797](https://github.com/apache/pulsar/pull/14797)
- [fix][cpp] Fix flaky tests about reference count [14854](https://github.com/apache/pulsar/pull/14854)
- [fix][cpp] Fix segmentation fault when creating socket failed [14834](https://github.com/apache/pulsar/pull/14834)
- [fix][cpp] Fix the race condition of connect timeout task [14823](https://github.com/apache/pulsar/pull/14823)
- [fix][cpp] Fix send callback might not be invoked in key-based batching [14898](https://github.com/apache/pulsar/pull/14898)
- [fix][cpp] Fix connection is not closed when broker closes the connection to proxy [15009](https://github.com/apache/pulsar/pull/15009)
- [fix][cpp] Fix single message metadata not set correctly [15072](https://github.com/apache/pulsar/pull/15072)
- [fix][cpp] Fix UnknownError might be returned for a partitioned producer [15161](https://github.com/apache/pulsar/pull/15161)
- [improve][cpp] Remove the flaky and meaningless tests [15271](https://github.com/apache/pulsar/pull/15271)
- [improve][cpp] Wait until event loop terminates when closing the Client [15316](https://github.com/apache/pulsar/pull/15316)
- [fix][cpp] Avoid race condition causing double callback on close [15508](https://github.com/apache/pulsar/pull/15508)
- [fix][cpp] Generate correct well-known OpenID configuration URL [15928](https://github.com/apache/pulsar/pull/15928)
- [fix][cpp] Rename function name: pulsar_producer_configuration_set_crypto_failure_action [16031](https://github.com/apache/pulsar/pull/16031)
- [cleanup][cpp] Clean up C++ client curl configuration [16064](https://github.com/apache/pulsar/pull/16064)
- [fix][cpp] Fix the close of Client might stuck or return a wrong result [16285](https://github.com/apache/pulsar/pull/16285)
- [improve][cpp] Fix flaky C++ ClientTest.testWrongListener [16510](https://github.com/apache/pulsar/pull/16510)
