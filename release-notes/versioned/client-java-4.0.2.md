---
id: client-java-4.0.2
title: Client Java 4.0.2
sidebar_label: Client Java 4.0.2
---

- [Fix][Client] Fix pending message not complete when closeAsync ([#23761](https://github.com/apache/pulsar/pull/23761))
- [fix][client] Cannot access message data inside ProducerInterceptor#onSendAcknowledgement ([#23791](https://github.com/apache/pulsar/pull/23791))
- [fix][client] Fix compatibility between kerberos and tls ([#23798](https://github.com/apache/pulsar/pull/23798))
- [fix][client] Fix enableRetry for consumers using legacy topic naming where cluster name is included ([#23753](https://github.com/apache/pulsar/pull/23753))
- [fix][client] Fix memory leak when publishing encountered a corner case error ([#23738](https://github.com/apache/pulsar/pull/23738))
- [fix][client] Fix reader message filtering issue during blue-green cluster switch ([#23693](https://github.com/apache/pulsar/pull/23693))
- [fix][client] Fix wrong start message id when it's a chunked message id ([#23713](https://github.com/apache/pulsar/pull/23713))
- [fix][client] Make DeadLetterPolicy & KeySharedPolicy serializable ([#23718](https://github.com/apache/pulsar/pull/23718))
- [fix][client] Orphan producer when concurrently calling producer closing and reconnection ([#23853](https://github.com/apache/pulsar/pull/23853))
- [fix][client] Prevent retry topic and dead letter topic producer leaks when sending of message fails ([#23824](https://github.com/apache/pulsar/pull/23824))
- [fix][doc] Refine ClientBuilder#memoryLimit and ConsumerBuilder#autoScaledReceiverQueueSizeEnabled javadoc ([#23687](https://github.com/apache/pulsar/pull/23687))
- [improve][client] Make replicateSubscriptionState nullable ([#23757](https://github.com/apache/pulsar/pull/23757))
- [improve][client] PIP-393: Improve performance of Negative Acknowledgement ([#23600](https://github.com/apache/pulsar/pull/23600))
- [improve][client] PIP-393: Support configuring NegativeAckPrecisionBitCnt while building consumer. ([#23804](https://github.com/apache/pulsar/pull/23804))
- [improve][client] Print consumer stats log if prefetched messages are not zero ([#23698](https://github.com/apache/pulsar/pull/23698))
