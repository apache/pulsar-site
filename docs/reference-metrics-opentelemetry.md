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

#### pulsar.broker.topic.publish.rate.limit
The number of times the publish rate limit is triggered.
* Type: Counter
* Unit: `{event}`

#### pulsar.broker.topic.consumer.msg.ack
The total number of message acknowledgments received for this topic.
* Type: Counter
* Unit: `{ack}`

#### pulsar.broker.topic.storage.size
The total storage size of the messages in this topic.
* Type: UpDownCounter
* Unit: `{byte}`

#### pulsar.broker.topic.storage.logical.size
The storage size of topics in the namespace owned by the broker without replicas.
* Type: UpDownCounter
* Unit: `{byte}`

#### pulsar.broker.topic.storage.backlog.size
The total backlog size of the topics of this topic owned by this broker.
* Type: UpDownCounter
* Unit: `{byte}`

#### pulsar.broker.topic.storage.offloaded.size
The total amount of the data in this topic offloaded to the tiered storage (bytes).
* Type: UpDownCounter
* Unit: `{byte}`

#### pulsar.broker.topic.storage.backlog.quota.limit
The total amount of the data in this topic that limit the backlog quota.
* Type: UpDownCounter
* Unit: `{byte}`

#### pulsar.broker.topic.storage.backlog.quota.exceeded.eviction.count
The number of times a backlog was evicted since it has exceeded its quota. Includes label `quota_type = (time \| size)`
* Type: Counter
* Unit: `{eviction}`

#### pulsar.broker.topic.storage.backlog.age
The age of the oldest unacknowledged message (backlog).
* Type: UpDownCounter
* Unit: `{second}`

#### pulsar.broker.topic.storage.outgoing
The total message batches (entries) written to the storage for this topic.
* Type: UpDownCounter
* Unit: `{message batch}`

#### pulsar.broker.topic.storage.incoming
The total message batches (entries) read from the storage for this topic.
* Type: UpDownCounter
* Unit: `{message batch}`

#### pulsar.broker.topic.compaction.removed.event.count
The total number of removed events of the compaction.
* Type: UpDownCounter
* Unit: `{event}`

#### pulsar.broker.topic.compaction.succeed.count
The total number of successes of the compaction.
* Type: UpDownCounter
* Unit: `{event}`

#### pulsar.broker.topic.compaction.failed.count
The total number of failures of the compaction.
* Type: UpDownCounter
* Unit: `{event}`

#### pulsar.broker.topic.transaction
The number of transactions on this topic.
* Type: UpDownCounter
* Unit: `{transaction}`

#### pulsar.broker.topic.subscription.delayed
The total message batches (entries) are delayed for dispatching.
* Type: UpDownCounter
* Unit: `{message batch}`

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
