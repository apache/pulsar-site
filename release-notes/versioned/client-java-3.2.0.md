---
id: client-java-3.2.0
title: Client Java 3.2.0
sidebar_label: Client Java 3.2.0
---

- Fix DLQ producer name conflicts when multiples consumers send messages to DLQ [#21890](https://github.com/apache/pulsar/pull/21890)
- Fix messages in the batch container timed out unexpectedly [#21889](https://github.com/apache/pulsar/pull/21889)
- Messages lost due to TopicListWatcher reconnect [#21853](https://github.com/apache/pulsar/pull/21853)
- Prevent reserve memory with a negative memory size to avoid send task stuck [#21804](https://github.com/apache/pulsar/pull/21804)
- Fix producer thread block forever on memory limit controller [#21790](https://github.com/apache/pulsar/pull/21790)
- PIP-313 Support force unsubscribe using consumer api [#21687](https://github.com/apache/pulsar/pull/21687)
- Exit when no msg to consume if time reaches the limit [#21622](https://github.com/apache/pulsar/pull/21622)
- Fix inconsistent API annotations of `getTopicName` [#21620](https://github.com/apache/pulsar/pull/21620)
- Add producerName for deadLetterProducer [#21589](https://github.com/apache/pulsar/pull/21589)
- Fix print error log 'Auto getting partitions failed' when expend partition. [#21485](https://github.com/apache/pulsar/pull/21485)
- Fix some typos in client module [#21416](https://github.com/apache/pulsar/pull/21416)
- Add `REAL_SUBSCRIPTION` when produces msg to DLQ [#21369](https://github.com/apache/pulsar/pull/21369)
- Fix producer/consumer perform lookup for migrated topic [#21356](https://github.com/apache/pulsar/pull/21356)
- Avert extensive time consumption during table view construction [#21270](https://github.com/apache/pulsar/pull/21270)
- Fix reader.hasMessageAvailable return false when incoming queue is not empty [#21259](https://github.com/apache/pulsar/pull/21259)
- Merge lookup requests for the same topic [#21232](https://github.com/apache/pulsar/pull/21232)
- Fix same producer/consumer use more than one connection per broker [#21144](https://github.com/apache/pulsar/pull/21144)
- Fix repeat consume when using n-ack and batched messages [#21116](https://github.com/apache/pulsar/pull/21116)
- Avoid ack hole for chunk message [#21101](https://github.com/apache/pulsar/pull/21101)
- Fix logging problem in pulsar client [#21094](https://github.com/apache/pulsar/pull/21094)
- Implement getLastMessageIds API for Reader [#21051](https://github.com/apache/pulsar/pull/21051)
- Fix cannot retry chunk messages and send to DLQ [#21048](https://github.com/apache/pulsar/pull/21048)
- Fix RawReader hasMessageAvailable returns true when no messages [#21032](https://github.com/apache/pulsar/pull/21032)
- Add backoff for `seek` [#20963](https://github.com/apache/pulsar/pull/20963)
- Fix perf-producer get OOM with high publish latency [#20914](https://github.com/apache/pulsar/pull/20914)
- PIP-253 Expose ProducerStats for DeadLetter and RetryLetter producers in ConsumerStats [#20239](https://github.com/apache/pulsar/pull/20239)
