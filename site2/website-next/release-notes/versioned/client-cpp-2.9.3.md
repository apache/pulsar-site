---
id: client-cpp-2.9.3
title: Client CPP 2.9.3
sidebar_label: Client CPP 2.9.3
---

- [fix][c++] Fix UnknownError might be returned for a partitioned producer [#15161](https://github.com/apache/pulsar/pull/15161)
- [fix][c++] Fix connection is not closed when broker closes the connection to proxy [#15009](https://github.com/apache/pulsar/pull/15009)
- [fix][c++] Fix producer is never destructed until client is closed [#14797](https://github.com/apache/pulsar/pull/14797)
- [fix][c++] Fix segmentation fault when creating socket failed [#14834](https://github.com/apache/pulsar/pull/14834)
- [fix][c++] Fix send callback might not be invoked in key-based batching [#14898](https://github.com/apache/pulsar/pull/14898)
- [fix][c++] Fix single message metadata not set correctly [#15072](https://github.com/apache/pulsar/pull/15072)
- [fix][c++] Fix the race condition of connect timeout task [#14823](https://github.com/apache/pulsar/pull/14823)
- [fix][c++] Handle exception in creating socket when fd limit is reached [#14587](https://github.com/apache/pulsar/pull/14587)
- [fix][c++] Wait until event loop terminates when closing the Client [#15316](https://github.com/apache/pulsar/pull/15316)
- [fix][c++] Avoid race condition causing double callback on close [#15508](https://github.com/apache/pulsar/pull/15508)
- [improve][c++] Add braces around initialization of subobject [#14735](https://github.com/apache/pulsar/pull/14735)
