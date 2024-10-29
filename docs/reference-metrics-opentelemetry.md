---
id: reference-metrics-opentelemetry
title: Pulsar OpenTelemetry Metrics
sidebar_label: "OpenTelemetry Metrics"
---

Pulsar exposes the following OpenTelemetry metrics.

## Broker

### Connection Metrics

#### pulsar.broker.connection.count
The number of connections.
* Type: UpDownCounter
* Unit: `{connection}`
* Attributes:
  * `pulsar.connection.status` - The status of the connection. Can be one of:
    * `active`
    * `open`
    * `close`

#### pulsar.broker.connection.create.operation.count
The number of connection create operations.
* Type: UpDownCounter
* Unit: `{operation}`
* Attributes:
  * `pulsar.connection.create.operation.status` - The status of the create operation. Can be one of:
    * `success`
    * `failure`

#### pulsar.broker.connection.rate_limit.count
The number of times a connection has been rate limited.
* Type: Counter
* Unit: `{operation}`
* Attributes:
  * `pulsar.connection.rate_limit.operation.name` - The name of the rate limiting operation performed. Can be one of:
    * `paused`
    * `resumed`
    * `throttled`
    * `unthrottled`

### Topic Messaging metrics

#### pulsar.broker.topic.subscription.count
The number of Pulsar subscriptions of the topic served by this broker.
* Type: UpDownCounter
* Unit: `{subscription}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.producer.count
The number of active producers of the topic connected to this broker.
* Type: UpDownCounter
* Unit: `{producer}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.consumer.count
The number of active consumers of the topic connected to this broker.
* Type: UpDownCounter
* Unit: `{consumer}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.message.incoming.count
The total number of messages received for this topic.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.message.outgoing.count
The total number of messages read from this topic.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.message.incoming.size
The total number of messages bytes received for this topic.
* Type: Counter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.message.outgoing.size
The total number of messages bytes read from this topic.
* Type: Counter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.publish.rate.limit.count
The number of times the publish rate limit is triggered.
* Type: Counter
* Unit: `{event}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.storage.size
The total storage size of the messages in this topic, including storage used by replicas.
* Type: UpDownCounter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.storage.logical.size
The storage size of the messages in this topic, excluding storage used by replicas.
* Type: UpDownCounter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.storage.backlog.size
The size of the backlog storage for this topic.
* Type: UpDownCounter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.storage.offloaded.size
The total amount of the data in this topic offloaded to the tiered storage.
* Type: UpDownCounter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.storage.backlog.quota.limit.size
The size based backlog quota limit for this topic.
* Type: UpDownCounter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.storage.backlog.quota.limit.time
The time based backlog quota limit for this topic.
* Type: Gauge
* Unit: `s`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.storage.backlog.quota.eviction.count
The number of times a backlog was evicted since it has exceeded its quota.
* Type: Counter
* Unit: `{eviction}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.backlog.quota.type` - The backlog quota type. Can be one of:
    * `size`
    * `time`

#### pulsar.broker.topic.storage.backlog.age
The age of the oldest unacknowledged message (backlog).
* Type: Gauge
* Unit: `s`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.storage.entry.outgoing.count
The total message batches (entries) written to the storage for this topic.
* Type: Counter
* Unit: `{entry}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.storage.entry.incoming.count
The total message batches (entries) read from the storage for this topic.
* Type: Counter
* Unit: `{entry}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.compaction.removed.message.count
The total number of messages removed by compaction.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.compaction.operation.count
The total number of compaction operations.
* Type: Counter
* Unit: `{operation}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.compaction.status` - The compaction status. Can be one of:
    * `success`
    * `failure

#### pulsar.broker.topic.compaction.duration
The total time duration of compaction operations on the topic.
* Type: DoubleUpDownCounter
* Unit: `s`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.compaction.incoming.size
The total count of bytes read by the compaction process for this topic.
* Type: Counter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.compaction.outgoing.size
The total count of bytes written by the compaction process for this topic.
* Type: Counter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.compaction.compacted.entry.count
The total number of compacted entries.
* Type: Counter
* Unit: `{entry}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.compaction.compacted.entry.size
The total size of the compacted entries.
* Type: Counter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

#### pulsar.broker.topic.transaction.count
The number of transactions on this topic.
* Type: UpDownCounter
* Unit: `{transaction}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.transaction.status` - The transaction status. Can be one of:
    * `active`
    * `committed`
    * `aborted`

#### pulsar.broker.topic.transaction.buffer.client.operation.count
The number of operations on the transaction buffer client.
* Type: Counter
* Unit: `{operation}`
* Attributes:
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.transaction.status` - The status of the Pulsar transaction. Can be one of:
    * `aborted`
    * `committed`
  * `pulsar.transaction.buffer.client.operation.status` - The status of the Pulsar transaction buffer client operation. Can be one of:
    * `failure`
    * `success`

#### pulsar.broker.topic.subscription.delayed.entry.count
The total number of message batches (entries) delayed for dispatching.
* Type: UpDownCounter
* Unit: `{entry}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.

### Topic Lookup metrics

#### pulsar.broker.lookup.request.duration
The duration of topic lookup requests (either binary or HTTP)
* Type: Histogram
* Unit: `second`
* Attributes:
  * `pulsar.lookup.response` - The response type of the lookup request
    * `failure`
    * `broker`
    * `redirect`

#### pulsar.broker.request.topic.lookup.concurrent.usage
The number of pending lookup operations in the broker. When it reaches threshold "maxConcurrentLookupRequest" defined in broker.conf, new requests are rejected.
* Type: UpDownCounter
* Unit: `{operation}`

#### pulsar.broker.request.topic.lookup.concurrent.limit
The maximum number of pending lookup operations in the broker. Equal to "maxConcurrentLookupRequest" defined in broker.conf.
* Type: UpDownCounter
* Unit: `{operation}`

#### pulsar.broker.topic.load.concurrent.usage
The number of pending topic load operations in the broker. When it reaches threshold "maxConcurrentTopicLoadRequest" defined in broker.conf, new requests are rejected.
* Type: UpDownCounter
* Unit: `{operation}`

#### pulsar.broker.topic.load.concurrent.limit
The maximum number of pending topic load operations in the broker. Equal to "maxConcurrentTopicLoadRequest" defined in broker.conf.
* Type: UpDownCounter
* Unit: `{operation}`

### Metadata Store metrics

#### pulsar.broker.metadata.store.outgoing.size
The total amount of data written to the metadata store.
* Type: Counter
* Unit: `{By}`
* Attributes:
  * `pulsar.metadata.store.name` - The name of the metadata store.

#### pulsar.broker.metadata.store.executor.queue.size
The number of batch operations in the metadata store executor queue.
* Type: UpDownCounter
* Unit: `{operation}`
* Attributes:
  * `pulsar.metadata.store.name` - The name of the metadata store.

### Consumer metrics

#### pulsar.broker.consumer.message.outgoing.count
The total number of messages dispatched to this consumer.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.subscription.name` - The topic subscription name.
  * `pulsar.subscription.type` - The subscription type.
  * `pulsar.consumer.name` - The name of the consumer.
  * `pulsar.consumer.id` - The ID of the consumer.

#### pulsar.broker.consumer.message.outgoing.size
The total number of messages bytes dispatched to this consumer.
* Type: Counter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.subscription.name` - The topic subscription name.
  * `pulsar.subscription.type` - The subscription type.
  * `pulsar.consumer.name` - The name of the consumer.
  * `pulsar.consumer.id` - The ID of the consumer.

#### pulsar.broker.consumer.message.ack.count
The total number of message acknowledgments received from this consumer.
* Type: Counter
* Unit: `{ack}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.subscription.name` - The topic subscription name.
  * `pulsar.subscription.type` - The subscription type.
  * `pulsar.consumer.name` - The name of the consumer.
  * `pulsar.consumer.id` - The ID of the consumer.

#### pulsar.broker.consumer.message.redeliver.count
The total number of messages that have been redelivered to this consumer.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.subscription.name` - The topic subscription name.
  * `pulsar.subscription.type` - The subscription type.
  * `pulsar.consumer.name` - The name of the consumer.
  * `pulsar.consumer.id` - The ID of the consumer.

#### pulsar.broker.consumer.message.unack.count
The number of messages currently unacknowledged by this consumer.
* Type: UpDownCounter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.subscription.name` - The topic subscription name.
  * `pulsar.subscription.type` - The subscription type.
  * `pulsar.consumer.name` - The name of the consumer.
  * `pulsar.consumer.id` - The ID of the consumer.

#### pulsar.broker.consumer.permit.count
The number of permits currently available for this consumer.
* Type: UpDownCounter
* Unit: `{permit}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.subscription.name` - The topic subscription name.
  * `pulsar.subscription.type` - The subscription type.
  * `pulsar.consumer.name` - The name of the consumer.
  * `pulsar.consumer.id` - The ID of the consumer.

### Managed Ledger Cursor metrics

#### pulsar.broker.managed_ledger.persist.operation.count
The number of acknowledgment operations on the ledger.
* Type: Counter
* Unit: `{operation}`
* Attributes:
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.
  * `pulsar.managed_ledger.cursor.name` - The name of the managed cursor.
  * `pulsar.managed_ledger.cursor.operation.status` - The status of the managed cursor operation. Can be one of:
    * `success`
    * `failure`

#### pulsar.broker.managed_ledger.persist.mds.operation.count
The number of acknowledgment operations in the metadata store.
* Type: Counter
* Unit: `{operation}`
* Attributes:
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.
  * `pulsar.managed_ledger.cursor.name` - The name of the managed cursor.
  * `pulsar.managed_ledger.cursor.operation.status` - The status of the managed cursor operation. Can be one of:
    * `success`
    * `failure`

#### pulsar.broker.managed_ledger.message_range.count
The number of non-contiguous deleted messages ranges.
* Type: UpDownCounter
* Unit: `{range}`
* Attributes:
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.
  * `pulsar.managed_ledger.cursor.name` - The name of the managed cursor.

#### pulsar.broker.managed_ledger.cursor.outgoing.size
The total amount of data written to the ledger.
* Type: Counter
* Unit: `{By}`
* Attributes:
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.
  * `pulsar.managed_ledger.cursor.name` - The name of the managed cursor.

#### pulsar.broker.managed_ledger.cursor.outgoing.logical.size
The total amount of data written to the ledger, not including replicas.
* Type: Counter
* Unit: `{By}`
* Attributes:
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.
  * `pulsar.managed_ledger.cursor.name` - The name of the managed cursor.

#### pulsar.broker.managed_ledger.cursor.incoming.size
The total amount of data read from the ledger.
* Type: Counter
* Unit: `{By}`
* Attributes:
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.
  * `pulsar.managed_ledger.cursor.name` - The name of the managed cursor.

### Managed Ledger Cache metrics

#### pulsar.broker.managed_ledger.count
The total number of managed ledgers.
* Type: UpDownCounter
* Unit: `{managed_ledger}`

#### pulsar.broker.managed_ledger.cache.eviction.count
The total number of cache eviction operations.
* Type: Counter
* Unit: `{eviction}`

#### pulsar.broker.managed_ledger.cache.entry.count
The number of entries in the entry cache.
* Type: UpDownCounter
* Unit: `{entry}`
* Attributes:
  * `pulsar.managed_ledger.cache.entry.status` - The status of the cache entry. Can be one of:
    * `active` - Indicates the number of entries currently in the cache. Equal to the `evicted - inserted`.
    * `inserted` - Indicates the total number of entries inserted into the cache.
    * `evicted` - Indicates the total number of entries evicted from the cache.

#### pulsar.broker.managed_ledger.cache.entry.size
The byte amount of entries stored in the entry cache.
* Type: UpDownCounter
* Unit: `{By}`

#### pulsar.broker.managed_ledger.cache.operation.count
The number of cache operations.
* Type: Counter
* Unit: `{entry}`
* Attributes:
  * `pulsar.managed_ledger.cache.operation.status` - The cache operation result. Can be one of:
    * `hit` - Indicates a successful cache lookup operation.
    * `miss` - Indicates a failed cache lookup operation.

#### pulsar.broker.managed_ledger.cache.operation.size
The byte amount of data retrieved from cache operations.
* Type: Counter
* Unit: `{By}`
* Attributes:
  * `pulsar.managed_ledger.cache.operation.status` - The cache operation result. Can be one of:
    * `hit` - Indicates a successful cache lookup operation.
    * `miss` - Indicates a failed cache lookup operation.

#### pulsar.broker.managed_ledger.cache.pool.allocation.active.count
The number of currently active allocations in the direct arena.
* Type: UpDownCounter
* Unit: `{allocation}`
* Attributes:
  * `pulsar.managed_ledger.pool.arena.type` - The arena type. Can be one of:
    * `small`
    * `normal`
    * `huge`

#### pulsar.broker.managed_ledger.cache.pool.allocation.size
The memory allocated in the direct arena.
* Type: UpDownCounter
* Unit: `{By}`
* Attributes:
  * `pulsar.managed_ledger.pool.chunk.allocation.type` - The chunk allocation type. Can be one of:
    * `allocated`
    * `used`

### Producer metrics

#### pulsar.broker.producer.message.incoming.count
The total number of messages received from this producer.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.producer.name` - The name of the producer.
  * `pulsar.producer.id` - The ID of the producer.
  * `pulsar.producer.access_mode` - The access mode of the producer. Can be one of:
    * `shared`
    * `exclusive`
    * `wait_for_exclusive`
    * `exclusive_with_fencing`

#### pulsar.broker.producer.message.incoming.size
The total number of messages bytes received from this producer.
* Type: Counter
* Unit: `By`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.producer.name` - The name of the producer.
  * `pulsar.producer.id` - The ID of the producer.
  * `pulsar.producer.access_mode` - The access mode of the producer. Can be one of:
    * `shared`
    * `exclusive`
    * `wait_for_exclusive`
    * `exclusive_with_fencing`

#### pulsar.broker.producer.message.drop.count
The total number of messages dropped from this producer.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.producer.name` - The name of the producer.
  * `pulsar.producer.id` - The ID of the producer.
  * `pulsar.producer.access_mode` - The access mode of the producer. Can be one of:
    * `shared`
    * `exclusive`
    * `wait_for_exclusive`
    * `exclusive_with_fencing`

### Managed Ledger metrics

#### pulsar.broker.managed_ledger.message.outgoing.count
The number of write operations to this ledger.
* Type: UpDownCounter
* Unit: `{operation}`
* Attributes:
  * `pulsar.namespace` - The managed ledger namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.
  * `pulsar.managed_ledger.operation.status` - The status of the managed ledger operation. Can be one of:
    * `success`
    * `failure`

#### pulsar.broker.managed_ledger.message.outgoing.logical.size
The total number of messages bytes written to this ledger, excluding replicas.
* Type: Counter
* Unit: `By`
* Attributes:
  * `pulsar.namespace` - The managed ledger namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.

#### pulsar.broker.managed_ledger.message.outgoing.replicated.size
The total number of messages bytes written to this ledger, including replicas.
* Type: Counter
* Unit: `By`
* Attributes:
  * `pulsar.namespace` - The managed ledger namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.

#### pulsar.broker.managed_ledger.backlog.count
The number of messages in backlog for all consumers from this ledger.
* Type: UpDownCounter
* Unit: `{message}`
* Attributes:
  * `pulsar.namespace` - The managed ledger namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.

#### pulsar.broker.managed_ledger.message.incoming.count
The number of read operations from this ledger.
* Type: UpDownCounter
* Unit: `{operation}`
* Attributes:
  * `pulsar.namespace` - The managed ledger namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.
  * `pulsar.managed_ledger.operation.status` - The status of the managed ledger operation. Can be one of:
    * `success`
    * `failure`

#### pulsar.broker.managed_ledger.message.incoming.size
The total number of messages bytes read from this ledger.
* Type: Counter
* Unit: `By`
* Attributes:
  * `pulsar.namespace` - The managed ledger namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.

#### pulsar.broker.managed_ledger.message.incoming.cache.miss.count
The number of cache misses during read operations from this ledger.
* Type: UpDownCounter
* Unit: `{operation}`
* Attributes:
  * `pulsar.namespace` - The managed ledger namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.

#### pulsar.broker.managed_ledger.mark_delete.count
The total number of mark delete operations for this ledger.
* Type: Counter
* Unit: `{operation}`
* Attributes:
  * `pulsar.namespace` - The managed ledger namespace.
  * `pulsar.managed_ledger.name` - The name of the managed ledger.

#### pulsar.broker.managed_ledger.inflight.read.limit
Maximum number of bytes that can be retained by managed ledger data read from storage or cache.
* Type: Counter
* Unit: `By`

#### pulsar.broker.managed_ledger.inflight.read.usage
Estimated number of bytes retained by managed ledger data read from storage or cache.
* Type: Counter
* Unit: `By`
* Attributes:
  * `pulsar.managed_ledger.inflight.read.usage.state` - Indicates managed ledger memory limiter usage state. Can be one of:
    * `used`
    * `free`

### Web Executor Service metrics

#### pulsar.web.executor.thread.limit
The thread limits for the pulsar-web executor pool.
* Type: UpDownCounter
* Unit: `{thread}`
* Attributes:
  * `pulsar.web.executor.thread.limit.type` - The limit type for the thread pool.
    * `max`
    * `min`

#### pulsar.web.executor.thread.usage
The current usage of threads in the pulsar-web executor pool.
* Type: UpDownCounter
* Unit: `{thread}`
* Attributes:
  * `pulsar.web.executor.thread.usage.type` - The usage type for the thread pool.
    * `active` - Indicates the number of threads actively serving requests.
    * `current` - Indicates the total number of threads currently associated with the pool.
    * `idle` - Indicates the number of threads available to serve requests.

### Replicator metrics

#### pulsar.broker.replication.message.incoming.count
The total number of messages received from the remote cluster through this replicator.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.replication.remote.cluster.name` - The name of the remote cluster.

#### pulsar.broker.replication.message.outgoing.count
The total number of messages sent to the remote cluster through this replicator.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.replication.remote.cluster.name` - The name of the remote cluster.

#### pulsar.broker.replication.message.incoming.size
The total number of messages bytes received from the remote cluster through this replicator.
* Type: Counter
* Unit: `{By}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.replication.remote.cluster.name` - The name of the remote cluster.

#### pulsar.broker.replication.message.outgoing.size
The total number of messages bytes sent to the remote cluster through this replicator.
* Type: Counter
* Unit: `{By}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.replication.remote.cluster.name` - The name of the remote cluster.

#### pulsar.broker.replication.message.backlog.count
The total number of messages in the backlog for this replicator.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.replication.remote.cluster.name` - The name of the remote cluster.

#### pulsar.broker.replication.message.backlog.age
The age of the oldest message in the replicator backlog.
* Type: Gauge
* Unit: `s`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.replication.remote.cluster.name` - The name of the remote cluster.

#### pulsar.broker.replication.message.expired.count
The total number of messages that expired for this replicator.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.replication.remote.cluster.name` - The name of the remote cluster.

#### pulsar.broker.replication.message.dropped.count
The total number of messages dropped by this replicator.
* Type: Counter
* Unit: `{message}`
* Attributes:
  * `pulsar.domain` - The domain of the topic. Can be one of:
    * `persistent`
    * `non-persistent`
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.replication.remote.cluster.name` - The name of the remote cluster.

### Schema Registry Metrics

#### pulsar.broker.request.schema_registry.duration
The duration of Schema Registry requests
* Type: Histogram
* Unit: `s`
* Attributes:
  * `pulsar.namespace` - The namespace referred by the Schema Registry request
  * `pulsar.schema_registry.request` - The Schema Registry request type
    * `get`
    * `list`
    * `put`
    * `delete`
  * `pulsar.schema_registry.response` - The Schema Registry response type
    * `success`
    * `failure`

#### pulsar.broker.operation.schema_registry.compatibility_check.count
The number of Schema Registry compatibility check operations performed by the broker.
* Type: Counter
* Unit: `{operation}`
* Attributes:
  * `pulsar.namespace` - The namespace referred by the compatibility check operation
  * `pulsar.schema_registry.compatibility_check.response` - The compatibility check response type
    * `compatible`
    * `incompatible`

### HTTP Request Filter Metrics

#### pulsar.web.filter.rate_limit.request.count
Counter of HTTP requests processed by the rate limiting filter.
* Type: Counter
* Unit: `{request}`
* Attributes:
  * `pulsar.web.filter.rate_limit.result` - The result of the rate limiting operation. Can be one of:
    * `accepted`
    * `rejected`

### Transaction Coordinator Metrics

#### pulsar.broker.transaction.coordinator.transaction.count
The number of transactions handled by the coordinator.
* Type: UpDownCounter
* Unit: `{transaction}`
* Attributes:
  * `pulsar.transaction.coordinator.id` - The ID of the Pulsar transaction coordinator.
  * `pulsar.transaction.status` - The status of the Pulsar transaction. Can be one of:
    * `aborted`
    * `active`
    * `created`
    * `committed`
    * `timeout`

#### pulsar.broker.transaction.coordinator.append.log.count
The number of transaction metadata entries appended by the coordinator.
* Type: Counter
* Unit: `{entry}`
* Attributes:
  * `pulsar.transaction.coordinator.id` - The ID of the Pulsar transaction coordinator.
  * `pulsar.transaction.status` - The status of the Pulsar transaction. Can be one of:
    * `aborted`
    * `active`
    * `created`
    * `committed`
    * `timeout`

### Transaction Pending Acknowledgment Store Metrics

#### pulsar.broker.transaction.pending.ack.store.transaction.count
The number of transactions handled by the persistent ack store.
* Type: Counter
* Unit: `{transaction}`
* Attributes:
  * `pulsar.tenant` - The topic tenant.
  * `pulsar.namespace` - The topic namespace.
  * `pulsar.topic` - The topic name.
  * `pulsar.partition.index` - The partition index of the topic. Present only if the topic is partitioned.
  * `pulsar.subscription.name` - The name of the Pulsar subscription.
  * `pulsar.transaction.status` - The Pulsar transaction status. Can be one of:
    * `aborted`
    * `committed`
  * `pulsar.transaction.pending.ack.store.operation.status` - The status of the pending acknowledgment store operation. Can be one of:
    * `failure`
    * `success`

### Authentication Metrics

#### pulsar.authentication.operation.count
The number of authentication operations.
* Type: Counter
* Unit: `{operation}`
* Attributes:
  * `pulsar.authentication.provider` - The name of the authentication provider class.
  * `pulsar.authentication.method` - The name of the authentication method.
  * `pulsar.authentication.result` - The authentication result. Can be one of:
    * `success`
    * `failure`
  * `pulsar.authentication.error` - The authentication error, if the result is `failure`.

### Token Metrics

#### pulsar.authentication.token.expired.count
The total number of expired tokens.
* Type: Counter
* Unit: `{token}`

#### pulsar.authentication.token.expiry.duration
The remaining time of expiring token in seconds.
* Type: Histogram
* Unit: `s`

### Replication Subscription Metrics

#### pulsar.broker.replication.subscription.snapshot.operation.count
The number of snapshot operations attempted.
* Type: Counter
* Unit: `{operation}`

#### pulsar.broker.replication.subscription.snapshot.operation.duration
Time taken to complete a consistent snapshot operation across clusters.
* Type: Histogram
* Unit: `s`
* Attributes:
  * `pulsar.replication.subscription.snapshot.operation.result` - The result of the snapshot operation. Can be one of:
    * `success`
    * `timeout`
