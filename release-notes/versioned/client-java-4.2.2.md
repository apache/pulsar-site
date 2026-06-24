---
id: client-java-4.2.2
title: Client Java 4.2.2
sidebar_label: Client Java 4.2.2
---

- [fix][sec] Upgrade Netty to 4.1.135.Final to address several CVEs ([#25918](https://github.com/apache/pulsar/pull/25918))
- [fix][sec] Bump org.asynchttpclient:async-http-client from 2.14.5 to 2.15.0 ([#25818](https://github.com/apache/pulsar/pull/25818))
- [improve][misc] Upgrade Caffeine to 3.2.4 ([#25663](https://github.com/apache/pulsar/pull/25663))
- [fix][client] Apply Avro logical type conversions when decoding schema without classloader ([#25759](https://github.com/apache/pulsar/pull/25759))
- [fix][client] Clean up unacked messages when unsubscribing a topic with ack timeout backoff ([#25916](https://github.com/apache/pulsar/pull/25916))
- [fix][client] Fix failed to close consumer because of the error: param memorySize is a negative value ([#25805](https://github.com/apache/pulsar/pull/25805))
- [fix][client] Make ClientBuilder serializable ([#25730](https://github.com/apache/pulsar/pull/25730)) ([#25739](https://github.com/apache/pulsar/pull/25739))
- [fix][client] Match logical topic when removing unacked messages ([#25921](https://github.com/apache/pulsar/pull/25921))
- [fix][client] Preserve equals in FieldParser map values ([#25907](https://github.com/apache/pulsar/pull/25907))
- [fix][client] Prevent duplicate ServiceUrlProvider initialization ([#25899](https://github.com/apache/pulsar/pull/25899))
- [fix][client] Reset higher-index states on recovery in SameAuthParamsLookupAutoClusterFailover ([#25826](https://github.com/apache/pulsar/pull/25826))
- [fix][client] Stabilize scaleReceiverQueueHint against concurrent enqueue/take ([#25578](https://github.com/apache/pulsar/pull/25578))
- [fix][client]Broker-side producer handle leak if closes a producer which state is regitering schema ([#25725](https://github.com/apache/pulsar/pull/25725))
- [improve][client] Best-effort retry for individual/batch-index acks on send failure when ackReceiptEnabled=false ([#25525](https://github.com/apache/pulsar/pull/25525))
- [improve][client] Clean up unacked message tracker when topics are removed in multi-topic consumers ([#25923](https://github.com/apache/pulsar/pull/25923))
- [improve][client] Implement tls_client_auth for AuthenticationOAuth2 ([#25538](https://github.com/apache/pulsar/pull/25538))
- [improve][client] In cases where there is a risk of message loss, adjust the log level to error ([#25854](https://github.com/apache/pulsar/pull/25854))
