---
id: client-java-3.1.1
title: Client Java 3.1.1
sidebar_label: Client Java 3.1.1
---

- Fix perf-producer get OOM with high publish latency [#20914](https://github.com/apache/pulsar/pull/20914)
- Fix RawReader hasMessageAvailable returns true when no messages [#21032](https://github.com/apache/pulsar/pull/21032)
- Fix consumer can't consume resent chunked messages [#21070](https://github.com/apache/pulsar/pull/21070)
- Fix cannot retry chunk messages and send to DLQ [#21048](https://github.com/apache/pulsar/pull/21048)
- Fix logging problem in pulsar client [#21094](https://github.com/apache/pulsar/pull/21094)
- Avoid ack hole for chunk message [#21101](https://github.com/apache/pulsar/pull/21101)
- Fix repeat consume when using n-ack and batched messages [#21116](https://github.com/apache/pulsar/pull/21116)
- Fix same producer/consumer use more than one connection per broker [#21144](https://github.com/apache/pulsar/pull/21144)
- Merge lookup requests for the same topic [#21232](https://github.com/apache/pulsar/pull/21232)
