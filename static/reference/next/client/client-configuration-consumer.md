# Consumer

## Required
### topicNames
Topic name

**Type**: `java.util.Set`

**Default**: `[]`

## Optional
### ackTimeoutMillis
Timeout of unacked messages

**Type**: `long`

**Default**: `0`

### ackTimeoutRedeliveryBackoff
Interface for custom message is ackTimeout policy. You can specify `RedeliveryBackoff` for a consumer.

**Type**: `org.apache.pulsar.client.api.RedeliveryBackoff`

**Default**: `null`

### acknowledgementsGroupTimeMicros
Group a consumer acknowledgment for a specified time.

By default, a consumer uses 100ms grouping time to send out acknowledgments to a broker.

Setting a group time of 0 sends out acknowledgments immediately.

A longer ack group time is more efficient at the expense of a slight increase in message re-deliveries after a failure.

**Type**: `long`

**Default**: `100000`

### autoAckOldestChunkedMessageOnQueueFull
Whether to automatically acknowledge pending chunked messages when the threshold of `maxPendingChunkedMessage` is reached. If set to `false`, these messages will be redelivered by their broker.

**Type**: `boolean`

**Default**: `false`

### autoUpdatePartitions
If `autoUpdatePartitions` is enabled, a consumer subscribes to partition increasement automatically.

**Note**: this is only for partitioned consumers.

**Type**: `boolean`

**Default**: `true`

### consumerName
Consumer name

**Type**: `java.lang.String`

**Default**: `null`

### cryptoFailureAction
Consumer should take action when it receives a message that can not be decrypted.
* **FAIL**: this is the default option to fail messages until crypto succeeds.
* **DISCARD**:silently acknowledge and not deliver message to an application.
* **CONSUME**: deliver encrypted messages to applications. It is the application's responsibility to decrypt the message.

The decompression of message fails.

If messages contain batch messages, a client is not be able to retrieve individual messages in batch.

Delivered encrypted message contains {@link EncryptionContext} which contains encryption and compression information in it using which application can decrypt consumed message payload.

**Type**: `org.apache.pulsar.client.api.ConsumerCryptoFailureAction`

**Default**: `FAIL`

### deadLetterPolicy
Dead letter policy for consumers.

By default, some messages are probably redelivered many times, even to the extent that it never stops.

By using the dead letter mechanism, messages have the max redelivery count. **When exceeding the maximum number of redeliveries, messages are sent to the Dead Letter Topic and acknowledged automatically**.

You can enable the dead letter mechanism by setting `deadLetterPolicy`.

**Example**
```java
client.newConsumer()
.deadLetterPolicy(DeadLetterPolicy.builder().maxRedeliverCount(10).build())
.subscribe();
```
Default dead letter topic name is `{TopicName}-{Subscription}-DLQ`.

To set a custom dead letter topic name:
```java
client.newConsumer()
.deadLetterPolicy(DeadLetterPolicy.builder().maxRedeliverCount(10)
.deadLetterTopic("your-topic-name").build())
.subscribe();
```
When specifying the dead letter policy while not specifying `ackTimeoutMillis`, you can set the ack timeout to 30000 millisecond.

**Type**: `org.apache.pulsar.client.api.DeadLetterPolicy`

**Default**: `null`

### expireTimeOfIncompleteChunkedMessageMillis
The time interval to expire incomplete chunks if a consumer fails to receive all the chunks in the specified time period. The default value is 1 minute.

**Type**: `long`

**Default**: `60000`

### maxAcknowledgmentGroupSize
Group a consumer acknowledgment for the number of messages.

**Type**: `int`

**Default**: `1000`

### maxPendingChunkedMessage
The maximum size of a queue holding pending chunked messages. When the threshold is reached, the consumer drops pending messages to optimize memory utilization.

**Type**: `int`

**Default**: `10`

### maxTotalReceiverQueueSizeAcrossPartitions
The max total receiver queue size across partitions.

This setting reduces the receiver queue size for individual partitions if the total receiver queue size exceeds this value.

**Type**: `int`

**Default**: `50000`

### negativeAckRedeliveryBackoff
Interface for custom message is negativeAcked policy. You can specify `RedeliveryBackoff` for a consumer.

**Type**: `org.apache.pulsar.client.api.RedeliveryBackoff`

**Default**: `null`

### negativeAckRedeliveryDelayMicros
Delay to wait before redelivering messages that failed to be processed.

When an application uses {@link Consumer#negativeAcknowledge(Message)}, failed messages are redelivered after a fixed timeout.

**Type**: `long`

**Default**: `60000000`

### patternAutoDiscoveryPeriod
Topic auto discovery period when using a pattern for topic's consumer.

The default and minimum value is 1 minute.

**Type**: `int`

**Default**: `60`

### priorityLevel
Priority level for a consumer to which a broker gives more priority while dispatching messages in Shared subscription type.

The broker follows descending priorities. For example, 0=max-priority, 1, 2,...

In Shared subscription type, the broker **first dispatches messages to the max priority level consumers if they have permits**. Otherwise, the broker considers next priority level consumers.

**Example 1**
If a subscription has consumerA with `priorityLevel` 0 and consumerB with `priorityLevel` 1, then the broker **only dispatches messages to consumerA until it runs out permits** and then starts dispatching messages to consumerB.

**Example 2**
Consumer Priority, Level, Permits
C1, 0, 2
C2, 0, 1
C3, 0, 1
C4, 1, 2
C5, 1, 1

Order in which a broker dispatches messages to consumers is: C1, C2, C3, C1, C4, C5, C4.

**Type**: `int`

**Default**: `0`

### properties
A name or value property of this consumer.

`properties` is application defined metadata attached to a consumer.

When getting a topic stats, associate this metadata with the consumer stats for easier identification.

**Type**: `java.util.SortedMap`

**Default**: `{}`

### readCompacted
If enabling `readCompacted`, a consumer reads messages from a compacted topic rather than reading a full message backlog of a topic.

A consumer only sees the latest value for each key in the compacted topic, up until reaching the point in the topic message when compacting backlog. Beyond that point, send messages as normal.

Only enabling `readCompacted` on subscriptions to persistent topics, which have a single active consumer (like failure or exclusive subscriptions).

Attempting to enable it on subscriptions to non-persistent topics or on shared subscriptions leads to a subscription call throwing a `PulsarClientException`.

**Type**: `boolean`

**Default**: `false`

### receiverQueueSize
Size of a consumer's receiver queue.

For example, the number of messages accumulated by a consumer before an application calls `Receive`.

A value higher than the default value increases consumer throughput, though at the expense of more memory utilization.

**Type**: `int`

**Default**: `1000`

### regexSubscriptionMode
When subscribing to a topic using a regular expression, you can pick a certain type of topics.

* **PersistentOnly**: only subscribe to persistent topics.
* **NonPersistentOnly**: only subscribe to non-persistent topics.
* **AllTopics**: subscribe to both persistent and non-persistent topics.

**Type**: `org.apache.pulsar.client.api.RegexSubscriptionMode`

**Default**: `PersistentOnly`

### replicateSubscriptionState
If `replicateSubscriptionState` is enabled, a subscription state is replicated to geo-replicated clusters.

**Type**: `boolean`

**Default**: `false`

### subscriptionInitialPosition
Initial position at which to set cursor when subscribing to a topic at first time.

**Type**: `org.apache.pulsar.client.api.SubscriptionInitialPosition`

**Default**: `Latest`

### subscriptionName
Subscription name

**Type**: `java.lang.String`

**Default**: `null`

### subscriptionType
Subscription type.
Four subscription types are available:
* Exclusive
* Failover
* Shared
* Key_Shared

**Type**: `org.apache.pulsar.client.api.SubscriptionType`

**Default**: `Exclusive`

### tickDurationMillis
Granularity of the ack-timeout redelivery.

Using an higher `tickDurationMillis` reduces the memory overhead to track messages when setting ack-timeout to a bigger value (for example, 1 hour).

**Type**: `long`

**Default**: `1000`

### topicsPattern
The regexp for the topic name(not contains partition suffix).

**Type**: `java.util.regex.Pattern`

**Default**: `null`


