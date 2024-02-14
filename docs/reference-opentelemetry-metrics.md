---
id: reference-opentelemetry-metrics
title: Pulsar OpenTelemetry Metrics
sidebar_label: "OpenTelemetry Metrics"
---

## Broker

### Topic Lookup metrics

| Name                                         | Type          | Description |
|----------------------------------------------|---------------|---|
| pulsar_broker_load_manager_bundle_assignment | Histogram     | The summary of latency of bundles ownership operations. |
| pulsar_broker_lookup                         | Histogram     | The latency of all lookup operations. |
| pulsar_broker_lookup_redirects               | Counter       | The number of lookup redirected requests. |
| pulsar_broker_lookup_answers                 | Counter       | The number of lookup responses (i.e. not redirected requests). |
| pulsar_broker_lookup_failures                | Counter       | The number of lookup failures. |
| pulsar_broker_lookup_pending_requests        | UpDownCounter | The number of pending lookups in broker. When it is up to the threshold, new requests are rejected. |
| pulsar_broker_topic_load_pending_requests    | UpDownCounter | The load of pending topic operations. |
