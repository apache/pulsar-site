---
id: reference-metrics-opentelemetry
title: Pulsar OpenTelemetry Metrics
sidebar_label: "OpenTelemetry Metrics"
---

Pulsar exposes the following OpenTelemetry metrics.

## Broker

### Topic Messaging metrics

#### pulsar.broker.topic.subscription.count
The number of Pulsar subscriptions of the topic served by this broker.
* Type: UpDownCounter
* Unit: `{subscription}`

#### pulsar.broker.topic.producer.count
The number of active producers of the topic connected to this broker.
* Type: UpDownCounter
* Unit: `{producer}`

#### pulsar.broker.topic.consumer.count
The number of active consumers of the topic connected to this broker.
* Type: UpDownCounter
* Unit: `{consumer}`

#### pulsar.broker.topic.message.incoming.count
The total number of messages received for this topic.
* Type: Counter
* Unit: `{message}`

#### pulsar.broker.topic.message.outgoing.count
The total number of messages read from this topic.
* Type: Counter
* Unit: `{message}`

#### pulsar.broker.topic.message.incoming.size
The total number of messages bytes received for this topic.
* Type: Counter
* Unit: `{byte}`

#### pulsar.broker.topic.message.outgoing.size
The total number of messages bytes read from this topic.
* Type: Counter
* Unit: `{byte}`

#### pulsar.broker.topic.publish.rate.limit.count
The number of times the publish rate limit is triggered.
* Type: Counter
* Unit: `{event}`

#### pulsar.broker.topic.storage.size
The total storage size of the messages in this topic, including storage used by replicas.
* Type: UpDownCounter
* Unit: `{byte}`

#### pulsar.broker.topic.storage.logical.size
The storage size of the messages in this topic, excluding storage used by replicas.
* Type: UpDownCounter
* Unit: `{byte}`

#### pulsar.broker.topic.storage.backlog.size
The size of the backlog storage for this topic.
* Type: UpDownCounter
* Unit: `{byte}`

#### pulsar.broker.topic.storage.offloaded.size
The total amount of the data in this topic offloaded to the tiered storage.
* Type: UpDownCounter
* Unit: `{byte}`

#### pulsar.broker.topic.storage.backlog.quota.limit.size
The size based backlog quota limit for this topic.
* Type: Gauge
* Unit: `{byte}`

#### pulsar.broker.topic.storage.backlog.quota.limit.time
The time based backlog quota limit for this topic.
* Type: Gauge
* Unit: `{second}`

#### pulsar.broker.topic.storage.backlog.quota.eviction.count
The number of times a backlog was evicted since it has exceeded its quota.
* Type: Counter
* Unit: `{eviction}`

#### pulsar.broker.topic.storage.backlog.age
The age of the oldest unacknowledged message (backlog).
* Type: Gauge
* Unit: `{second}`

#### pulsar.broker.topic.storage.entry.outgoing.count
The total message batches (entries) written to the storage for this topic.
* Type: Counter
* Unit: `{entry}`

#### pulsar.broker.topic.storage.entry.incoming.count
The total message batches (entries) read from the storage for this topic.
* Type: Counter
* Unit: `{entry}`

#### pulsar.broker.topic.compaction.removed.message.count
The total number of messages removed by compaction.
* Type: Counter
* Unit: `{message}`

#### pulsar.broker.topic.compaction.succeed.count
The total number of successes of the compaction.
* Type: Counter
* Unit: `{event}`

#### pulsar.broker.topic.compaction.failed.count
The total number of failures of the compaction.
* Type: Counter
* Unit: `{event}`

#### pulsar.broker.topic.compaction.duration
The total time duration of compaction operations on the topic.
* Type: DoubleCounter
* Unit: `{second}`

#### pulsar.broker.topic.compaction.incoming.size
The total count of bytes read by the compaction process for this topic.
* Type: Counter
* Unit: `{byte}`

#### pulsar.broker.topic.compaction.outgoing.size
The total count of bytes written by the compaction process for this topic.
* Type: Counter
* Unit: `{byte}`

#### pulsar.broker.topic.compaction.compacted.entry.count
The total number of compacted entries.
* Type: Counter
* Unit: `{entry}`

#### pulsar.broker.topic.compaction.compacted.entry.size
The total size of the compacted entries.
* Type: Counter
* Unit: `{byte}`

#### pulsar.broker.topic.transaction.count
The number of transactions on this topic.
* Type: UpDownCounter
* Unit: `{transaction}`

#### pulsar.broker.topic.subscription.delayed.entry.count
The total number of message batches (entries) delayed for dispatching.
* Type: UpDownCounter
* Unit: `{entry}`

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
