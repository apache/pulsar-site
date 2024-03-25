---
id: client-java-2.11.3
title: Client Java 2.11.3
sidebar_label: Client Java 2.11.3
---

- [fix][client] Fix print error log 'Auto getting partitions failed' when expend partition. [#21485](https://github.com/apache/pulsar/pull/21485)
- [fix][client] fix reader.hasMessageAvailable return false when incoming queue is not empty [#21259](https://github.com/apache/pulsar/pull/21259)
- [improve][client] Merge lookup requests for the same topic [#21232](https://github.com/apache/pulsar/pull/21232)
- [fix][client] fix same producer/consumer use more than one connection per broker [#21144](https://github.com/apache/pulsar/pull/21144)
- [fix][client] Fix repeat consume when using n-ack and batched messages [#21116](https://github.com/apache/pulsar/pull/21116)
- [fix][client] Fix logging problem in pulsar client [#21094](https://github.com/apache/pulsar/pull/21094)
- [fix][client] Fix subscribing pattern topics through Proxy not working [#20739](https://github.com/apache/pulsar/pull/20739)
- [fix][client] Fix producer could send timeout when enable batching [#19191](https://github.com/apache/pulsar/pull/19191)
- [fix][client] Fix perf-producer get OOM with high publish latency [#20914](https://github.com/apache/pulsar/pull/20914)
- [fix][client] Fix RawReader hasMessageAvailable returns true when no messages [#21032](https://github.com/apache/pulsar/pull/21032)
- [fix][client] Fix cannot retry chunk messages and send to DLQ [#21048](https://github.com/apache/pulsar/pull/21048)
- [fix][client] Fix consumer can't consume resent chunked messages [#21070](https://github.com/apache/pulsar/pull/21070)
