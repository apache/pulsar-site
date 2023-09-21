---
id: client-libraries-node-configs
title: Pulsar Node.js client configurations
sidebar_label: "Configs"
description: Get a comprehensive understanding of configurable parameters for Pulsar Node.js clients.  
---


## Client configs

The following configurable parameters are available for Pulsar Node.js clients:

| Parameter | Description | Default |
| :-------- | :---------- | :------ |
| `serviceUrl` | The connection URL for the Pulsar cluster. See [above](#connection-urls) for more info. |  |
| `authentication` | Configure the authentication provider. (default: no authentication). See [mTLS authentication](security-tls-authentication.md) for more info. | |
| `operationTimeoutSeconds` | The timeout for Node.js client operations (creating producers, subscribing to and unsubscribing from [topics](reference-terminology.md#topic)). Retries occur until this threshold is reached, at which point the operation fails. | 30 |
| `ioThreads` | The number of threads to use for handling connections to Pulsar [brokers](reference-terminology.md#broker). | 1 |
| `messageListenerThreads` | The number of threads used by message listeners ([consumers](#consumers) and [readers](#readers)). | 1 |
| `concurrentLookupRequest` | The number of concurrent lookup requests that can be sent on each broker connection. Setting a maximum helps to keep from overloading brokers. You should set values over the default of 50000 only if the client needs to produce and/or subscribe to thousands of Pulsar topics. | 50000 |
| `tlsTrustCertsFilePath` | The file path for the trusted TLS certificate. | |
| `tlsValidateHostname` | The boolean value of setup whether to enable TLS hostname verification. | `false` |
| `tlsAllowInsecureConnection` | The boolean value of setup whether the Pulsar client accepts untrusted TLS certificate from broker. | `false` |
| `statsIntervalInSeconds` | Interval between each stat info. Stats is activated with positive statsInterval. The value should be set to 1 second at least | 600 |
| `log` | A function that is used for logging. | `console.log` |


## Producer configs

| Parameter | Description | Default |
| :-------- | :---------- | :------ |
| `topic` | The Pulsar [topic](reference-terminology.md#topic) to which the producer publishes messages. The topic format is `<topic-name>` or `<tenant-name>/<namespace-name>/<topic-name>`. For example, `sample/ns1/my-topic`. | |
| `producerName` | A name for the producer. If you do not explicitly assign a name, Pulsar automatically generates a globally unique name.  If you choose to explicitly assign a name, it needs to be unique across *all* Pulsar clusters, otherwise the creation operation throws an error. | |
| `sendTimeoutMs` | When publishing a message to a topic, the producer waits for an acknowledgment from the responsible Pulsar [broker](reference-terminology.md#broker). If a message is not acknowledged within the threshold set by this parameter, an error is thrown. If you set `sendTimeoutMs` to -1, the timeout is set to infinity (and thus removed). Removing the send timeout is recommended when using Pulsar's [message de-duplication](cookbooks-deduplication.md) feature. | 30000 |
| `initialSequenceId` | The initial sequence ID of the message. When producer send message, add sequence ID to message. The ID is increased each time to send. | |
| `maxPendingMessages` | The maximum size of the queue holding pending messages (i.e. messages waiting to receive an acknowledgment from the [broker](reference-terminology.md#broker)). By default, when the queue is full all calls to the `send` method fails *unless* `blockIfQueueFull` is set to `true`. | 1000 |
| `maxPendingMessagesAcrossPartitions` | The maximum size of the sum of partition's  pending queue. | 50000 |
| `blockIfQueueFull` | If set to `true`, the producer's `send` method waits when the outgoing message queue is full rather than failing and throwing an error (the size of that queue is dictated by the `maxPendingMessages` parameter); if set to `false` (the default), `send` operations fails and throw a error when the queue is full. | `false` |
| `messageRoutingMode` | The message routing logic (for producers on [partitioned topics](concepts-messaging.md#partitioned-topics)). This logic is applied only when no key is set on messages. The available options are: round robin (`RoundRobinDistribution`), or publishing all messages to a single partition (`UseSinglePartition`, the default). | `UseSinglePartition` |
| `hashingScheme` | The hashing function that determines the partition on which a particular message is published (partitioned topics only). The available options are: `JavaStringHash` (the equivalent of `String.hashCode()` in Java), `Murmur3_32Hash` (applies the [Murmur3](https://en.wikipedia.org/wiki/MurmurHash) hashing function), or `BoostHash` (applies the hashing function from C++'s [Boost](https://www.boost.org/doc/libs/1_62_0/doc/html/hash.html) library). | `BoostHash` |
| `compressionType` | The message data compression type used by the producer. The available options are [`LZ4`](https://github.com/lz4/lz4), and [`Zlib`](https://zlib.net/), [ZSTD](https://github.com/facebook/zstd/), [SNAPPY](https://github.com/google/snappy/). | Compression None |
| `batchingEnabled` | If set to `true`, the producer send message as batch. | `true` |
| `batchingMaxPublishDelayMs` | The maximum time of delay sending message in batching. | 10 |
| `batchingMaxMessages` | The maximum size of sending message in each time of batching. | 1000 |
| `properties` | The metadata of producer. | |

## Consumer configs

| Parameter | Description | Default |
| :-------- | :---------- | :------ |
| `topic` | The Pulsar topic on which the consumer establishes a subscription and listen for messages. | |
| `topics` | The array of topics. | |
| `topicsPattern` | The regular expression for topics. | |
| `subscription` | The subscription name for this consumer. | |
| `subscriptionType` | Available options are `Exclusive`, `Shared`, `Key_Shared`, and `Failover`. | `Exclusive` |
| `subscriptionInitialPosition` | Initial position at which to set cursor when subscribing to a topic at first time. | `SubscriptionInitialPosition.Latest` |
| `ackTimeoutMs` | Acknowledge timeout in milliseconds. | 0 |
| `nAckRedeliverTimeoutMs` | Delay to wait before redelivering messages that failed to be processed. | 60000 |
| `receiverQueueSize` | Sets the size of the consumer's receiver queue, i.e. the number of messages that can be accumulated by the consumer before the application calls `receive`. A value higher than the default of 1000 could increase consumer throughput, though at the expense of more memory utilization. | 1000 |
| `receiverQueueSizeAcrossPartitions` | Set the max total receiver queue size across partitions. This setting is used to reduce the receiver queue size for individual partitions if the total exceeds this value. | 50000 |
| `consumerName` | The name of consumer. Currently(v2.4.1), [failover](concepts-messaging.md#failover) mode use consumer name in ordering. | |
| `properties` | The metadata of consumer. | |
| `listener`| A listener that is called for a message received. | |
| `readCompacted`| If enabling `readCompacted`, a consumer reads messages from a compacted topic rather than reading a full message backlog of a topic.<br /><br />A consumer only sees the latest value for each key in the compacted topic, up until reaching the point in the topic message when compacting backlog. Beyond that point, send messages as normal.<br /><br /> `readCompacted` can only be enabled on subscriptions to persistent topics, which have a single active consumer (like failure or exclusive subscriptions).<br /><br />Attempting to enable it on subscriptions to non-persistent topics or on shared subscriptions leads to a subscription call throwing a `PulsarClientException`. | false |

## Reader configs

| Parameter | Description | Default |
| :-------- | :---------- | :------ |
| `topic` | The Pulsar [topic](reference-terminology.md#topic) on which the reader establishes a subscription and listen for messages. | |
| `startMessageId` | The initial reader position, i.e. the message at which the reader begins processing messages. The options are `Pulsar.MessageId.earliest` (the earliest available message on the topic), `Pulsar.MessageId.latest` (the latest available message on the topic), or a message ID object for a position that is not earliest or latest. | |
| `receiverQueueSize` | Sets the size of the reader's receiver queue, i.e. the number of messages that can be accumulated by the reader before the application calls `readNext`. A value higher than the default of 1000 could increase reader throughput, though at the expense of more memory utilization. | 1000 |
| `readerName` | The name of the reader. |  |
| `subscriptionRolePrefix` | The subscription role prefix. | |
| `readCompacted` | If enabling `readCompacted`, a consumer reads messages from a compacted topic rather than reading a full message backlog of a topic.<br /><br />A consumer only sees the latest value for each key in the compacted topic, up until reaching the point in the topic message when compacting backlog. Beyond that point, send messages as normal.<br /><br /> `readCompacted` can only be enabled on subscriptions to persistent topics, which have a single active consumer (like failure or exclusive subscriptions).<br /><br />Attempting to enable it on subscriptions to non-persistent topics or on shared subscriptions leads to a subscription call throwing a `PulsarClientException`. | `false` |