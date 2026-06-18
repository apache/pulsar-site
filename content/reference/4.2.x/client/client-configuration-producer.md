# Producer

## Required
### topicName
Topic name

**Type**: `java.lang.String`

**Default**: `null`

## Optional
### batchingEnabled
Enable batching of messages.

**Type**: `boolean`

**Default**: `true`

### batchingMaxMessages
The maximum number of messages permitted in a batch.

**Type**: `int`

**Default**: `1000`

### batchingMaxPublishDelayMicros
Batching time period of sending messages.

**Type**: `long`

**Default**: `1000`

### blockIfQueueFull
If it is set to `true`, when the outgoing message queue is full, the `Send` and `SendAsync` methods of producer block, rather than failing and throwing errors.
If it is set to `false`, when the outgoing message queue is full, the `Send` and `SendAsync` methods of producer fail and `ProducerQueueIsFullError` exceptions occur.

The `MaxPendingMessages` parameter determines the size of the outgoing message queue.

**Type**: `boolean`

**Default**: `false`

### chunkingEnabled
Enable chunking of messages.

**Type**: `boolean`

**Default**: `false`

### compressionType
Message data compression type used by a producer.
Available options:
* [LZ4](https://github.com/lz4/lz4)
* [ZLIB](https://zlib.net/)
* [ZSTD](https://facebook.github.io/zstd/)
* [SNAPPY](https://google.github.io/snappy/)

**Type**: `org.apache.pulsar.client.api.CompressionType`

**Default**: `NONE`

### cryptoFailureAction
Producer should take action when encryption fails.
* **FAIL**: if encryption fails, unencrypted messages fail to send.
* **SEND**: if encryption fails, unencrypted messages are sent.

**Type**: `org.apache.pulsar.client.api.ProducerCryptoFailureAction`

**Default**: `FAIL`

### hashingScheme
Hashing function determining the partition where you publish a particular message (partitioned topics only).
Available options are as follows:
* `pulsar.JavastringHash`: the equivalent of `string.hashCode()` in Java
* `pulsar.Murmur3_32Hash`: applies the [Murmur3](https://en.wikipedia.org/wiki/MurmurHash) hashing function
* `pulsar.BoostHash`: applies the hashing function from C++'s[Boost](https://www.boost.org/doc/libs/1_62_0/doc/html/hash.html) library

**Type**: `org.apache.pulsar.client.api.HashingScheme`

**Default**: `JavaStringHash`

### initialSubscriptionName
Use this configuration to automatically create an initial subscription when creating a topic. If this field is not set, the initial subscription is not created.

**Type**: `java.lang.String`

**Default**: `null`

### maxPendingMessages
The maximum size of a queue holding pending messages.

For example, a message waiting to receive an acknowledgment from a [broker](https://pulsar.apache.org/docs/reference-terminology#broker).

By default, when the queue is full, all calls to the `Send` and `SendAsync` methods fail **unless** you set `BlockIfQueueFull` to `true`.

**Type**: `int`

**Default**: `0`

### maxPendingMessagesAcrossPartitions
The maximum number of pending messages across partitions.

Use the setting to lower the max pending messages for each partition ({@link #setMaxPendingMessages(int)}) if the total number exceeds the configured value.

**Type**: `int`

**Default**: `0`

### messageRoutingMode
Message routing logic for producers on [partitioned topics](https://pulsar.apache.org/docs/concepts-architecture-overview#partitioned-topics).
Apply the logic only when setting no key on messages.
Available options are as follows:
* `pulsar.RoundRobinDistribution`: round robin
* `pulsar.UseSinglePartition`: publish all messages to a single partition
* `pulsar.CustomPartition`: a custom partitioning scheme

**Type**: `org.apache.pulsar.client.api.MessageRoutingMode`

**Default**: `null`

### producerName
Producer name

**Type**: `java.lang.String`

**Default**: `null`

### sendTimeoutMs
Message send timeout in ms.
If a message is not acknowledged by a server before the `sendTimeout` expires, an error occurs.

**Type**: `long`

**Default**: `30000`


