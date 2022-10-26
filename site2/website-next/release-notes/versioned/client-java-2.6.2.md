---
id: client-java-2.6.2
title: Client Java 2.6.2 
sidebar_label: Client Java 2.6.2 
---

- [Java Client] Support input-stream for trustStore cert [7442](https://github.com/apache/pulsar/pull/7442)
- [Java Client] Avoid subscribing the same topic again [7823](https://github.com/apache/pulsar/pull/7823)
- [java Client] Add autoPartitionsUpdateInterval for producer and consumer [7840](https://github.com/apache/pulsar/pull/7840)
- [Java Client] Avoid resolving address for sni-host + thread-safe connection creation [8062](https://github.com/apache/pulsar/pull/8062)
- [Java Client] Websocket interface decode URL encoding [8072](https://github.com/apache/pulsar/pull/8072)
- [Java Client] Always use SNI for TLS enabled Pulsar Java broker client [8117](https://github.com/apache/pulsar/pull/8117)
- [Java Client] Improve timeout handling in ClientCnx to cover all remaining request types (GetLastMessageId, GetTopics, GetSchema, GetOrCreateSchema) [8149](https://github.com/apache/pulsar/pull/8149)
- [Java Client] Fix ConsumerImpl memory leaks [8160](https://github.com/apache/pulsar/pull/8160)
- [Java Client] Fix issue where paused consumer receives new message when reconnecting [8165](https://github.com/apache/pulsar/pull/8165)
- [Java Client] Improve refactored client connection code [8177](https://github.com/apache/pulsar/pull/8177)
- [Java Client] Add log level configuration in pulsar-client [8195](https://github.com/apache/pulsar/pull/8195)
- [Java Client] Remove unnecessary locks [8207](https://github.com/apache/pulsar/pull/8207)
- [Java Client] Fix AutoUpdatePartitionsInterval setting problem [8227](https://github.com/apache/pulsar/pull/8227)
- [Java Client] Add read position when joining in the consumer stats [8274](https://github.com/apache/pulsar/pull/8274)
- [Java Client] Support reset cursor to a batch index of the batching message [8285](https://github.com/apache/pulsar/pull/8285)
- [Java Client] Support exclude the message when reset cursor by message ID [8306](https://github.com/apache/pulsar/pull/8306)
- [Java Client] Increasing timeout for pulsar client io threads to shutdown [8316](https://github.com/apache/pulsar/pull/8316)
- [Java Client] Support cancelling message & batch futures returned from Reader & Consumer [8326](https://github.com/apache/pulsar/pull/8326)
- [Java Client] Disable batch receive timer for Readers [8381](https://github.com/apache/pulsar/pull/8381)
- [Java Client] Fix pause does not work for new created consumer  [8387](https://github.com/apache/pulsar/pull/8387)
