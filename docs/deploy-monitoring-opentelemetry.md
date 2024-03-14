---
id: deploy-monitoring-opentelemetry
title: OpenTelemetry Monitoring
sidebar_label: "OpenTelemetry Monitoring"
---

# Status
Pulsar emits OpenTelemetry metrics starting from version 3.3.0. OpenTelemetry log and trace signals are not exposed by
Pulsar. OpenTelemetry support is currently **experimental** and complements the pre-existing Prometheus metric system,
with the goal of eventually replacing it. The metrics it exposes are semantically equivalent to the Prometheus metrics.

# Scope
Pulsar OpenTelemetry metrics are gradually being added for the broker only. Support for the proxy and function worker is
planned for a future release.

# OpenTelemetry Configuration
Pulsar use the auto-configuration [extension](https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md)
of OpenTelemetry to manage the SDK configuration. The extension allows parameter input from environment variables and
Java system properties. The instructions below rely on environment variables, but can be adapted to use system
properties too. These variables must be exposed to the Pulsar process via the respective deployment method.

Note that the experimental file based configuration is not currently supported by Pulsar.

## Telemetry Enablement
The OpenTelemetry pipeline is disabled by default. Set environment variable `OTEL_SDK_DISABLED=false` to allow the
collection of metrics.

## Exporter Configuration

Exporters using the native OpenTelemetry Protocol and Prometheus are included in the Pulsar distribution assembly by
default and can be used out-of-the-box. Other exporters are not currently supported.

### OTLP

The native OTLP exporter is the recommended way to obtain metrics out of Pulsar. Pulsar defaults to using the OTLP
exporter unless otherwise overridden by environment variable `OTEL_METRICS_EXPORTER`.

To use the exporter, set environment variable `OTEL_EXPORTER_OTLP_ENDPOINT` to the respective URL endpoint. This should
represent the location of the OpenTelemetry [Collector](https://opentelemetry.io/docs/collector/). Pulsar supports both
gRPC and HTTP endpoints.

The exporter periodically collects and sends metrics. This process occurs every 60 seconds by default, and can be
controlled by changing environment variable `OTEL_METRIC_EXPORT_INTERVAL`.

Additional parameters that can be configured, such as authentication, compression, and timeout, are described in the
exporter [documentation](https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md#otlp-exporter-span-metric-and-log-exporters).

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
to those emitted by the OTLP exporter.

For further configuration details, refer to the exporter
[documentation](https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md#prometheus-exporter).

## Resource Attributes Configuration

Pulsar automatically sets the following resource attributes:

| Attribute         | Description                                                                       |
|-------------------|-----------------------------------------------------------------------------------|
| `pulsar.cluster`  | The name of the Pulsar cluster.                                                   |
| `service.name`    | The name of the Pulsar service. For the broker, this defaults to `pulsar-broker`. |
| `service.version` | The version of the Pulsar service.                                                |

Any of these attributes can be overriden by means of environment variable `OTEL_RESOURCE_ATTRIBUTES`:

```shell
OTEL_RESOURCE_ATTRIBUTES=pulsar.cluster=my-cluster,service.name=my-broker,service.version=1.0.0
```

Additional runtime resource attributes, such as hostname, process ID, or operating system, are automatically inferred by
the SDK using Resource Providers. For a description of these attributes, refer to the respective [documentation](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/resources/library).

For further details on configuring resource attributes, refer to the SDK [documentation](https://github.com/open-telemetry/opentelemetry-java/tree/main/sdk-extensions/autoconfigure#opentelemetry-resource-attributes).
