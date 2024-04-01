---
id: deploy-monitoring
title: Monitor
sidebar_label: "Monitoring"
---

You can use different ways to monitor a Pulsar cluster, exposing both metrics related to the usage of topics and the overall health of the individual components of the cluster.

## Collect metrics

You can collect broker stats, ZooKeeper stats, and BookKeeper stats.

### Broker stats

You can collect Pulsar broker metrics from brokers and export the metrics in JSON format. The Pulsar broker metrics mainly have two types:

* *Destination dumps*, which contain stats for each topic. You can fetch the destination dumps using the command below:

  ```shell
  bin/pulsar-admin broker-stats destinations
  ```

* Broker metrics, which contain the broker information and topics stats aggregated at the namespace level. You can fetch the broker metrics by using the following command:

  ```shell
  bin/pulsar-admin broker-stats monitoring-metrics
  ```

All the message rates are updated every minute.

The aggregated broker metrics are also exposed in the [Prometheus](https://prometheus.io) format at:

```shell
http://$BROKER_ADDRESS:8080/metrics/
```

### ZooKeeper stats

The local ZooKeeper, configuration store server and clients that are shipped with Pulsar can expose detailed stats through Prometheus.

```shell
http://$LOCAL_ZK_SERVER:8000/metrics
http://$GLOBAL_ZK_SERVER:8001/metrics
```

The default port of local ZooKeeper is `8000` and the default port of the configuration store is `8001`. You can use a different stats port by configuring `metricsProvider.httpPort` in the `conf/zookeeper.conf` file.

### BookKeeper stats

You can configure the stats frameworks for BookKeeper by modifying the `statsProviderClass` in the `conf/bookkeeper.conf` file.

The default BookKeeper configuration enables the Prometheus exporter. The configuration is included with Pulsar distribution.

```shell
http://$BOOKIE_ADDRESS:8000/metrics
```

The default port for bookie is `8000`. You can change the port by configuring `prometheusStatsHttpPort` in the `conf/bookkeeper.conf` file.

### Managed cursor acknowledgment state
The acknowledgment state is persistent to the ledger first. When the acknowledgment state fails to be persistent to the ledger, they are persistent to ZooKeeper. To track the stats of acknowledgment, you can configure the metrics for the managed cursor.

```
pulsar_ml_cursor_persistLedgerSucceed(namespace=", ledger_name="", cursor_name:")
pulsar_ml_cursor_persistLedgerErrors(namespace="", ledger_name="", cursor_name:"")
pulsar_ml_cursor_persistZookeeperSucceed(namespace="", ledger_name="", cursor_name:"")
pulsar_ml_cursor_persistZookeeperErrors(namespace="", ledger_name="", cursor_name:"")
pulsar_ml_cursor_nonContiguousDeletedMessagesRange(namespace="", ledger_name="", cursor_name:"")
```

Those metrics are added in the Prometheus interface, you can monitor and check the metrics stats in Grafana.

### Function and connector stats

You can collect functions worker stats from `functions-worker` and export the metrics in JSON formats, which contain functions worker JVM metrics.

```shell
pulsar-admin functions-worker monitoring-metrics
```

You can collect functions and connectors metrics from `functions-worker` and export the metrics in JSON formats.

```shell
pulsar-admin functions-worker function-stats
```

The aggregated functions and connectors metrics can be exposed in Prometheus formats as below. You can get [`FUNCTIONS_WORKER_ADDRESS`](/functions-worker.md) and `WORKER_PORT` from the `functions_worker.yml` file.

```shell
http://$FUNCTIONS_WORKER_ADDRESS:$WORKER_PORT/metrics:
```

## Configure Prometheus

You can use Prometheus to collect all the metrics exposed for Pulsar components and set up [Grafana](https://grafana.com/) dashboards to display the metrics and monitor your Pulsar cluster. For details, refer to [Prometheus guide](https://prometheus.io/docs/introduction/getting_started/).

When you run Pulsar on bare metal, you can provide the list of nodes to be probed. When you deploy Pulsar in a Kubernetes cluster, the monitoring is set up automatically. For details, refer to [Kubernetes instructions](helm-deploy.md).

## Dashboards

When you collect time-series statistics, the major problem is to make sure the number of dimensions attached to the data does not explode. Thus you only need to collect time series of metrics aggregated at the namespace level.

### Pulsar per-topic dashboard

The per-topic dashboard instructions are available at [Pulsar manager](administration-pulsar-manager.md).

### Grafana

You can use Grafana to create a dashboard driven by the data that is stored in Prometheus.

When you deploy Pulsar on Kubernetes with the Pulsar Helm Chart, a `pulsar-grafana` Docker image is enabled by default. You can use the docker image with the principal dashboards.

The following are some Grafana dashboards examples:

- [pulsar-grafana](deploy-monitoring.md#grafana): a Grafana dashboard that displays metrics collected in Prometheus for Pulsar clusters running on Kubernetes.
- [apache-pulsar-grafana-dashboard](https://github.com/streamnative/apache-pulsar-grafana-dashboard): a collection of Grafana dashboard templates for different Pulsar components running on both Kubernetes and on-premise machines.

## Alerting rules
You can set alerting rules according to your Pulsar environment. To configure alerting rules for Apache Pulsar, refer to [alerting rules](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/).

## OpenTelemetry

### Status
Pulsar emits OpenTelemetry metrics starting from version 3.3.0. OpenTelemetry log and trace signals are not exposed by
Pulsar. OpenTelemetry support is currently **experimental** and complements the pre-existing Prometheus metric system,
with the goal of eventually replacing it. The metrics it exposes are semantically equivalent to the Prometheus metrics.

For a detailed list of OpenTelemetry metrics exposed by Pulsar, refer to [OpenTelemetry Metrics](reference-metrics-opentelemetry.md).

### Scope
Pulsar OpenTelemetry metrics are gradually being added for the broker only. Support for the proxy and function worker is
planned for a future release.

### OpenTelemetry Configuration
Pulsar natively supports OpenTelemetry via manual instrumentation, instead of relying on the OpenTelemetry automatic
instrumentation agent. Pulsar uses the auto-configuration [extension](https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md)
of OpenTelemetry to manage the SDK configuration. The extension allows parameter input from environment variables and
Java system properties. The instructions below rely on environment variables, but can be adapted to use system
properties too. These variables must be exposed to the Pulsar process via the respective deployment method.

Note that the experimental [file based configuration](https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md#file-configuration)
is not currently supported by Pulsar.

#### Telemetry Enablement
The experimental OpenTelemetry feature is explicitly disabled by default in Pulsar. Set environment variable `OTEL_SDK_DISABLED=false` to enable the SDK. When disabled, metrics will not be collected nor exported.
collection of metrics.

#### Exporter Configuration

Exporters using the native OpenTelemetry Protocol and Prometheus are included in the Pulsar distribution assembly by
default and can be used out-of-the-box. Other exporters are not currently supported.

##### OTLP

The native OTLP exporter is the recommended way to obtain metrics out of Pulsar. Pulsar defaults to using the OTLP
exporter unless otherwise overridden by environment variable `OTEL_METRICS_EXPORTER`.

To use the exporter, set environment variable `OTEL_EXPORTER_OTLP_ENDPOINT` to the respective URL endpoint. This should
represent the location of the OpenTelemetry [Collector](https://opentelemetry.io/docs/collector/). Pulsar supports both
gRPC and HTTP endpoints.

The exporter periodically collects and sends metrics. This process occurs every 60 seconds by default, and can be
controlled by changing environment variable `OTEL_METRIC_EXPORT_INTERVAL`.

Additional parameters that can be configured, such as authentication, compression, and timeout, are described in the
exporter [documentation](https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md#otlp-exporter-span-metric-and-log-exporters).

###### Remote Collector Considerations

If the remote OTLP collector sends data downstream to Prometheus or a Prometheus like-system, it is recommended to copy
OpenTelemetry resource attribute `pulsar.cluster` to Prometheus labels on each time-series (metric). This can be done
using [collector transformations](https://opentelemetry.io/docs/collector/transforming-telemetry/).

The example below leverages the [OpenTelemetry Transformation Language](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl)
and the [transform processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor)
to achieve this.

```
metrics:
  set(attributes["pulsar_cluster"], resource.attributes["pulsar.cluster"])
```

##### Prometheus

Pulsar supports exporting OpenTelemetry metrics in Prometheus format. This exporter is pull based and operates by
opening up a server in the local Pulsar process. To use it, set `OTEL_METRICS_EXPORTER=prometheus` and the Prometheus
listener details using the following environment variables:

```shell
OTEL_EXPORTER_PROMETHEUS_HOST
OTEL_EXPORTER_PROMETHEUS_PORT
```

This endpoint must be accessible by the remote Prometheus scrape server. Note that the exporter is less resource
efficient than the OTLP exporter.

Prometheus currently exports the resource attributes in metric `target_info`. In practice, if you have more than one
cluster, it forces you to use PromQL joins to obtain the cluster ID label.

The Pulsar community has added the option to the OpenTelemetry Java SDK Prometheus Exporter to embed (copy) the cluster
ID label (`pulsar.cluster`) to each outgoing time series labels. Once this is finalized it will be added by default into
Pulsar.

For further configuration details, refer to the exporter
[documentation](https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md#prometheus-exporter).

#### Resource Attributes Configuration

Pulsar automatically sets the following resource attributes:

| Attribute         | Description                                                                       |
|-------------------|-----------------------------------------------------------------------------------|
| `pulsar.cluster`  | The name of the Pulsar cluster.                                                   |
| `service.name`    | The name of the Pulsar service. For the broker, this defaults to `pulsar-broker`. |
| `service.version` | The version of the Pulsar service.                                                |

Any of these attributes can be overridden by means of environment variable `OTEL_RESOURCE_ATTRIBUTES`. Additional
attributes can be added too. For example:

```shell
OTEL_RESOURCE_ATTRIBUTES=pulsar.cluster=my-cluster,service.name=my-broker,service.version=1.0.0,custom.attr=custom-value
```

For further details on configuring resource attributes, refer to the SDK [documentation](https://github.com/open-telemetry/opentelemetry-java/tree/main/sdk-extensions/autoconfigure#opentelemetry-resource-attributes).

Additional runtime resource attributes, such as hostname, process ID, or operating system, are automatically inferred by
the SDK using Resource Providers. For a description of these attributes, refer to the respective [documentation](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/resources/library).
Further details regarding the configuration of Resource Providers can be obtained via the [documentation](https://github.com/open-telemetry/opentelemetry-java/tree/main/sdk-extensions/autoconfigure#resource-provider-spi).

#### Attribute Cardinality Configuration

OpenTelemetry provides an experimental mechanism to control the maximum cardinality of attributes. This is useful for
limiting the resource usage of the exporter. Pulsar sets the value to 10000 attributes by default. For brokers with a
large number of topics, this can prove insufficient. The value is controlled by environment variable
`OTEL_EXPERIMENTAL_METRICS_CARDINALITY_LIMIT`.
