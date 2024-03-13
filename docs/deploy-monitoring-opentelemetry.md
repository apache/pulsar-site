---
id: reference-opentelemetry-metrics
title: Pulsar OpenTelemetry Metrics
sidebar_label: "OpenTelemetry Metrics"
---

# Status
Pulsar emits OpenTelemetry metrics starting from version 3.3.0. OpenTelemetry support is currently **experimental**.
The metrics described below are subject to change.

# OpenTelemetry Configuration
Pulsar use the auto-configuration extension of OpenTelemetry to manage the SDK configuration
([ref](https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md)). The
extension allows parameter input from environment variables and Java system properties. The instructions below rely on
environment variables, but can be adapted to use system properties too. Note that the experimental file based
configuration is not currently supported by Pulsar.

## Telemetry Enablement
The OpenTelemetry pipeline is disabled by default. Setting environment variable `OTEL_SDK_DISABLED=false` enables the
feature. In order for the metrics to be collected, please configure a collector, as described below.

## Collector Configuration

OpenTelemetry exporters are included in the Pulsar distribution assembly by default. These can be used out-of-the-box.
Other exporters are not currently supported.

### OTLP

This is the recommended way.

https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md#otlp-exporter-span-metric-and-log-exporters

### Prometheus

Note: this may suffer from performance issues.

https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md#prometheus-exporter

## Resource Provider Configuration

(auto-configured providers, eg host name). The cluster ID is automatically set.

# Scope
Pulsar OpenTelemetry metrics are available for the following components:
- Broker
- Proxy
- Function Worker

# Metric Reference

## Broker

### Topic Lookup metrics

| Name                                         | Type          | Description |
|----------------------------------------------|---------------|---|
| pulsar_broker_lookup                         | Histogram     | The latency of all lookup operations. |
| pulsar.broker.lookup.redirect                | Counter       | The number of lookup redirected requests. |
| pulsar.broker.lookup.answers                 | Counter       | The number of lookup responses (i.e. not redirected requests). |
| pulsar_broker_lookup_failures                | Counter       | The number of lookup failures. |
| pulsar_broker_lookup_pending_requests        | UpDownCounter | The number of pending lookups in broker. When it is up to the threshold, new requests are rejected. |
| pulsar_broker_topic_load_pending_requests    | UpDownCounter | The load of pending topic operations. |
