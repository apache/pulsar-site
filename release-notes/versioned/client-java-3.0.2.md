---
id: client-java-3.0.2
title: Client Java 3.0.2
sidebar_label: Client Java 3.0.2
---

- Fix print error log 'Auto getting partitions failed' when expend partition. [#21485](https://github.com/apache/pulsar/pull/21485)
- Fix reader.hasMessageAvailable return false when incoming queue is not empty [#21259](https://github.com/apache/pulsar/pull/21259)
- Merge lookup requests for the same topic [#21232](https://github.com/apache/pulsar/pull/21232)
- Fix same producer/consumer use more than one connection per broker [#21144](https://github.com/apache/pulsar/pull/21144)
- Fix repeat consume when using n-ack and batched messages [#21116](https://github.com/apache/pulsar/pull/21116)
- Avoid ack hole for chunk message [#21101](https://github.com/apache/pulsar/pull/21101)
- Fix logging problem in pulsar client [#21094](https://github.com/apache/pulsar/pull/21094)
- Fix consumer can't consume resent chunked messages [#21070](https://github.com/apache/pulsar/pull/21070)
- Fix cannot retry chunk messages and send to DLQ [#21048](https://github.com/apache/pulsar/pull/21048)
- Fix RawReader hasMessageAvailable returns true when no messages [#21032](https://github.com/apache/pulsar/pull/21032)
- Fix perf-producer get OOM with high publish latency [#20914](https://github.com/apache/pulsar/pull/20914)
- Disable polling pattern topics when TopicListWatcher is enabled. [#20779](https://github.com/apache/pulsar/pull/20779)
- Fix subscribing pattern topics through Proxy not working [#20739](https://github.com/apache/pulsar/pull/20739)
- Messages lost when consumer reconnect [#20695](https://github.com/apache/pulsar/pull/20695)
- Fix the consumer stuck due to deduplicated messages in pending ack state [#21177](https://github.com/apache/pulsar/pull/21177)
