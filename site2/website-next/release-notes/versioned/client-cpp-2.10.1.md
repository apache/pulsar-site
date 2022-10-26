---
id: client-cpp-2.10.1
title: Client CPP 2.10.1 
sidebar_label: Client CPP 2.10.1 
---

- [fix][C++] avoid race condition causing double callback on close [15508](https://github.com/apache/pulsar/pull/15508)
- [fix][C++] Wait until event loop terminates when closing the Client [15316](https://github.com/apache/pulsar/pull/15316)
- [fix][C++] Fix UnknownError might be returned for a partitioned producer [15161](https://github.com/apache/pulsar/pull/15161)
- [fix][C++] Fix single message metadata not set correctly [15072](https://github.com/apache/pulsar/pull/15072)
- [fix][C++] Fix connection is not closed when broker closes the connection to proxy [15009](https://github.com/apache/pulsar/pull/15009)
- [fix][C++] Fix send callback might not be invoked in key based batching [14898](https://github.com/apache/pulsar/pull/14898)
- [fix][C++] Fix segmentation fault when creating socket failed [14834](https://github.com/apache/pulsar/pull/14834)
- [fix][C++] Fix the race condition of connect timeout task [14823](https://github.com/apache/pulsar/pull/14823)
- [fix][C++] Fix producer is never destructed until client is closed [14797](https://github.com/apache/pulsar/pull/14797)
