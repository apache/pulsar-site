---
id: client-java-3.3.4
title: Client Java 3.3.4
sidebar_label: Client Java 3.3.4
---

- [Fix][Client] Fix pending message not complete when closeAsync ([#23761](https://github.com/apache/pulsar/pull/23761))
- [fix][client] Cannot access message data inside ProducerInterceptor#onSendAcknowledgement ([#23791](https://github.com/apache/pulsar/pull/23791))
- [fix][client] Fix enableRetry for consumers using legacy topic naming where cluster name is included ([#23753](https://github.com/apache/pulsar/pull/23753))
- [fix][client] Fix memory leak when publishing encountered a corner case error ([#23738](https://github.com/apache/pulsar/pull/23738))
- [fix][client] Fix reader message filtering issue during blue-green cluster switch ([#23693](https://github.com/apache/pulsar/pull/23693))
- [fix][client] Make DeadLetterPolicy & KeySharedPolicy serializable ([#23718](https://github.com/apache/pulsar/pull/23718))
- [fix][client] Prevent retry topic and dead letter topic producer leaks when sending of message fails ([#23824](https://github.com/apache/pulsar/pull/23824))
- [improve][client] Make replicateSubscriptionState nullable ([#23757](https://github.com/apache/pulsar/pull/23757))
