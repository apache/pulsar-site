---
id: reference-opentelemetry-metrics
title: Pulsar OpenTelemetry Metrics
sidebar_label: "OpenTelemetry Metrics"
---

Pulsar exposes the folowing OpenTelemetry metrics.

## Broker

### Topic Lookup metrics

| Name                                                | Type              | Unit          | Attributes                        | Description                                                                                                                                                             |
|-----------------------------------------------------|-------------------|---------------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pulsar.broker.lookup.request.duration               | Histogram         | `second`      |                                   | The duration of topic lookup requests (either binary or HTTP)                                                                                                           |
|                                                     |                   |               | `pulsar.lookup.response=failure`  |                                                                                                                                                                         |
|                                                     |                   |               | `pulsar.lookup.response=broker`   |                                                                                                                                                                         |
|                                                     |                   |               | `pulsar.lookup.response=redirect` |                                                                                                                                                                         |
| pulsar.broker.request.topic.lookup.concurrent.usage | LongUpDownCounter | `{operation}` |                                   | The number of pending lookup operations in the broker. When it reaches threshold "maxConcurrentLookupRequest" defined in broker.conf, new requests are rejected.        |
| pulsar.broker.request.topic.lookup.concurrent.limit | LongUpDownCounter | `{operation}` |                                   | The maximum number of pending lookup operations in the broker. Equal to "maxConcurrentLookupRequest" defined in broker.conf.                                            |
| pulsar.broker.topic.load.concurrent.usage           | LongUpDownCounter | `{operation}` |                                   | The number of pending topic load operations in the broker. When it reaches threshold "maxConcurrentTopicLoadRequest" defined in broker.conf, new requests are rejected. |
| pulsar.broker.topic.load.concurrent.limit           | LongUpDownCounter | `{operation}` |                                   | The maximum number of pending topic load operations in the broker. Equal to "maxConcurrentTopicLoadRequest" defined in broker.conf.                                     |
