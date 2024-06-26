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
