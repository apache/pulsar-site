# Reader

## Required
### topicNames
Topic name

**Type**: `java.util.Set`

**Default**: `[]`

## Optional
### cryptoFailureAction
Consumer should take action when it receives a message that can not be decrypted.
* **FAIL**: this is the default option to fail messages until crypto succeeds.
* **DISCARD**: silently acknowledge and not deliver message to an application.
* **CONSUME**: deliver encrypted messages to applications. It is the application's responsibility to decrypt the message.

The message decompression fails.

If messages contain batch messages, a client is not be able to retrieve individual messages in batch.

Delivered encrypted message contains {@link EncryptionContext} which contains encryption and compression information in it using which application can decrypt consumed message payload.

**Type**: `org.apache.pulsar.client.api.ConsumerCryptoFailureAction`

**Default**: `FAIL`

### cryptoKeyReader
Interface that abstracts the access to a key store.

**Type**: `org.apache.pulsar.client.api.CryptoKeyReader`

**Default**: `null`

### readCompacted
If enabling `readCompacted`, a consumer reads messages from a compacted topic rather than a full message backlog of a topic.

A consumer only sees the latest value for each key in the compacted topic, up until reaching the point in the topic message when compacting backlog. Beyond that point, send messages as normal.

`readCompacted` can only be enabled on subscriptions to persistent topics, which have a single active consumer (for example, failure or exclusive subscriptions).

Attempting to enable it on subscriptions to non-persistent topics or on shared subscriptions leads to a subscription call throwing a `PulsarClientException`.

**Type**: `boolean`

**Default**: `false`

### readerListener
A listener that is called for message received.

**Type**: `org.apache.pulsar.client.api.ReaderListener`

**Default**: `null`

### readerName
Reader name

**Type**: `java.lang.String`

**Default**: `null`

### receiverQueueSize
Size of a consumer's receiver queue.

For example, the number of messages that can be accumulated by a consumer before an application calls `Receive`.

A value higher than the default value increases consumer throughput, though at the expense of more memory utilization.

**Type**: `int`

**Default**: `1000`

### resetIncludeHead
If set to true, the first message to be returned is the one specified by `messageId`.

If set to false, the first message to be returned is the one next to the message specified by `messageId`.

**Type**: `boolean`

**Default**: `false`

### subscriptionName
Subscription name

**Type**: `java.lang.String`

**Default**: `null`

### subscriptionRolePrefix
Prefix of subscription role.

**Type**: `java.lang.String`

**Default**: `null`


