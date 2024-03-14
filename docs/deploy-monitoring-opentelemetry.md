---
id: reference-opentelemetry-metrics
title: Pulsar OpenTelemetry Metrics
sidebar_label: "OpenTelemetry Metrics"
---

# Status
Pulsar emits OpenTelemetry metrics starting from version 3.3.0. OpenTelemetry support is currently **experimental** and
complements the pre-existing Prometheus metric system, with the goal of eventually replacing it. The metrics it exposes
are semantically equivalent to the Prometheus metrics.

# Scope
Pulsar OpenTelemetry metrics are available for the broker only. Support for the proxy and function worker is planned for
a future release.

# Metric Types

The following metric types are available, as described by the OpenTelemetry [documentation](https://opentelemetry.io/docs/concepts/signals/metrics/#metric-instruments):

- `LongCounter`
- `Gauge`
- `Histogram`

# OpenTelemetry Configuration
Pulsar use the auto-configuration extension of OpenTelemetry to manage the SDK configuration
([ref](https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md)). The
extension allows parameter input from environment variables and Java system properties. The instructions below rely on
environment variables, but can be adapted to use system properties too. Note that the experimental file based
configuration is not currently supported by Pulsar.

## Telemetry Enablement
The OpenTelemetry pipeline is disabled by default. Set environment variable `OTEL_SDK_DISABLED=false` to allow the
collection of metrics.

## Exporter Configuration

Exporters using the native OpenTelemetry Protocol and Prometheus are included in the Pulsar distribution assembly by
default and can be used out-of-the-box. Other exporters are not currently supported.

### OTLP

The native OTLP exporter is the recommended way to obtain metrics out of Pulsar, due to its superior performance. Pulsar
defaults to using the OTLP exporter unless overridden by environment variable `OTEL_METRICS_EXPORTER`.

To use the exporter, set environment variable `OTEL_EXPORTER_OTLP_ENDPOINT` to the respective URL endpoint. This should
represent the location of the OpenTelemetry [Collector](https://opentelemetry.io/docs/collector/). Pulsar supports both
gRPC and HTTP endpoints.

Additional parameters that can be configured, such as authentication, compression, and timeout, are described in the
exporter [documentation](https://opentelemetry.io/docs/specs/otel/protocol/exporter/).

https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md#otlp-exporter-span-metric-and-log-exporters

### Prometheus

Pulsar supports exporting OpenTelemetry metrics in Prometheus format. This exporter is pull based and operates by
opening up a server in the local Pulsar process. To use it, set `OTEL_METRICS_EXPORTER=prometheus` and the Prometheus
listener details using the following environment variables:

```shell
OTEL_EXPORTER_PROMETHEUS_HOST
OTEL_EXPORTER_PROMETHEUS_PORT
```

This endpoint must be accessible by the remote Prometheus scrape server. Note that the exporter is less resource
efficient than the OTLP exporter. Due to divergent feature sets, the metrics emitted by this exporter are not identical
to those emitted by the OTLP exporter. For further details, refer to the exporter
[documentation](https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md#prometheus-exporter).

## Resource Provider Configuration

(auto-configured providers, eg host name). The cluster ID is automatically set.

# Example Configuration
