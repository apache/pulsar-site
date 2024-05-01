---
id: reference-metrics-opentelemetry
title: Pulsar OpenTelemetry Metrics
sidebar_label: "OpenTelemetry Metrics"
---

Pulsar exposes the following OpenTelemetry metrics.

## Broker

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
