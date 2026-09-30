---
id: administration-upgrade-to-5.0.x-metrics
title: Metrics changes when upgrading to Pulsar 5.0.x
sidebar_label: Metrics changes
description: Review Prometheus and OpenTelemetry metrics additions and monitoring changes when upgrading from Pulsar 4.0.x to 5.0.x.
---

```mdx-code-block
import styles from '@site/src/css/upgrade-tables.module.css';
```

Use this page with [Upgrading to Pulsar 5.0.x](administration-upgrade-to-5.0.x.md). It compares Pulsar-owned metric instruments and exporters in the maintained 4.0.x line with 5.0.0. A metric newly described in the reference is not necessarily a newly introduced metric: many documentation gaps concerned instruments already present in 4.0.x.

Before upgrading, save representative scrapes and dashboard queries from your current deployment. Check the upgraded canary with the same feature flags and workload. Metrics from BookKeeper, ZooKeeper, the JVM, connectors, and OpenTelemetry runtime instrumentation also depend on the dependency version and enabled components; their complete upstream inventories are outside this Pulsar-owned instrument comparison.

## Added Prometheus metrics

<div className={styles.upgradeTable}>

| Metric | Type | Upgrade consideration |
|---|---|---|
| `pulsar_broker_publish_latency` | Summary | Broker publish latency in milliseconds, with quantile, `_count`, and `_sum` samples. Quantiles roll over with the stats collection period. Use it to distinguish broker publish latency from end-to-end application latency. |
| `pulsar_subscription_storage_backlog_age_seconds` | Gauge | Age of the oldest backlog entry for an individual subscription. Enable `exposeSubscriptionBacklogAgeInPrometheus` (default `false`) and topic-level metrics to expose it. |

</div>

See [Prometheus metrics](reference-metrics.md) for labels, aggregation levels, and exposure settings.

## Added OpenTelemetry instruments

These are instrument names, before any exporter-specific translation. A Prometheus exporter can replace punctuation and append unit and type suffixes.

<div className={styles.upgradeTable}>

| Instrument | Type | Unit | Purpose |
|---|---|---|---|
| `pulsar.broker.managed_ledger.cursor.persist.batch_deleted_indexes.truncated` | Counter | `{truncation}` | Cursor persistence exceeded the batch-deleted-index limit. |
| `pulsar.broker.managed_ledger.cursor.persist.unacked_ranges.truncated` | Counter | `{truncation}` | Cursor persistence exceeded the unacknowledged-range limit. |
| `pulsar.broker.managed_ledger.entry.size` | Histogram | `By` | Size of entries written to the ledger. |
| `pulsar.broker.managed_ledger.inflight.read.acquire.count` | Counter | `{event}` | Permit acquisitions that decrease the remaining byte allowance. |
| `pulsar.broker.managed_ledger.inflight.read.release.count` | Counter | `{event}` | Permit releases that increase the remaining byte allowance. |
| `pulsar.broker.managed_ledger.ledger.switch.latency` | Histogram | `s` | Time taken to switch to a new ledger. |
| `pulsar.broker.managed_ledger.message.outgoing.latency` | Histogram | `s` | End-to-end managed-ledger add-entry latency, including executor queue time. |
| `pulsar.broker.managed_ledger.message.outgoing.ledger.latency` | Histogram | `s` | BookKeeper ledger add-entry latency. |
| `pulsar.broker.message.find.duration` | Histogram | `s` | Time taken to find the position of a message by timestamp. |
| `pulsar.broker.message.find.entry.read.count` | Counter | `{entry}` | Entries read during timestamp-based message-position searches. |
| `pulsar.broker.message.find.entry.read.size` | Counter | `By` | Bytes read during timestamp-based message-position searches. |
| `pulsar.broker.topic.publish.latency` | Histogram | `s` | The latency in seconds for publishing messages. |
| `pulsar.client.auth.credential.duration` | Histogram | `s` | Latency of async credential acquisition (getAuthDataAsync / getHttpHeadersAsync). |
| `pulsar.client.auth.failure` | Counter | Unspecified | Authentication failures by error class (terminal/transient). |
| `pulsar.tls.last_reload_success` | Gauge | `s` | Time (unix seconds) of the last successful TLS material load/reload per purpose. |
| `pulsar.tls.reload` | Counter | Unspecified | TLS material load/reload events per purpose, client and server side. |

</div>

The `message.outgoing.*latency` instrument names above measure writes to managed-ledger storage, not delivery latency to a consumer. Keep their meaning and units in mind when updating dashboards. Authentication and TLS instruments require a real OpenTelemetry instance in their initialization contexts. See the [OpenTelemetry reference](reference-metrics-opentelemetry.md) for attributes and enablement.

## Removed metrics and corrected names

The comparison found no removed Pulsar-owned Prometheus collector families or OpenTelemetry instrument names from the maintained 4.0.x baseline. This does not mean every deployment will emit an identical set of series: runtime, allocator, load-manager, topic type, and exposure settings affect which series and labels are available.

- **OpenTelemetry lookup name:** use `pulsar.broker.request.topic.lookup.duration`. The earlier documentation's `pulsar.broker.lookup.request.duration` was a documentation error, not an instrument that was renamed during this upgrade.
- **Metadata-store executor queue:** the previously documented `pulsar.broker.metadata.store.executor.queue.size` has no corresponding instrument in either compared source baseline. Use the Prometheus gauge `pulsar_batch_metadata_store_executor_queue_size` instead. This is a reference correction, not a removed instrument.
- **Prometheus prefixes:** generated broker metrics convert their internal `brk_` prefix to `pulsar_`. Directly registered collectors do not pass through that conversion. Offloader metrics retain `brk_ledgeroffloader_*`, and extensible load-manager latency histograms retain `brk_lb_*_latency_ms`. Correcting those names in the reference does not indicate a metric rename in 5.0.
- **Metadata-store operation latency:** the full exported family name is `pulsar_metadata_store_ops_latency_ms`. Earlier documentation omitted the unit suffix.
- **Counter samples:** Java Prometheus counter collectors expose a `_total` sample suffix. Do not infer a removal from a table that previously listed only the collector's base name. Validate dashboard queries against actual samples.

## Existing metrics whose interpretation or exposure changes

- **Allocator metrics:** the standard launcher now selects the Netty adaptive allocator. `pulsar_ml_cache_pool_active_allocations` and its `_small`, `_normal`, and `_huge` variants return `-1` when the allocator does not support these counts. The allocated and used byte values can be identical for adaptive and unpooled allocators. Update alerts that assume pooled-arena counts are nonnegative or that allocated and used bytes must differ. See [broker allocator metrics](reference-metrics.md#broker-metrics).
- **Topic property labels:** persistent-topic metrics can include allowlisted topic-property labels. Prometheus preserves property key case; OpenTelemetry lowercases it. Account for the added cardinality and label differences before enabling [custom topic metric labels](deploy-monitoring.md#configure-topic-metric-labels).
- **Dynamic metric exposure:** topic, consumer, and producer metric exposure and partition-label splitting are read from the current broker configuration for each metrics generation. Updating these settings can change the available series and labels without a broker restart.
- **BookKeeper provider:** replace `org.apache.pulsar.metrics.prometheus.bookkeeper.PrometheusMetricsProvider` with `org.apache.bookkeeper.stats.prometheus.PrometheusMetricsProvider` in bookie configuration. The old provider class was removed; it is a configuration migration, not evidence that all BookKeeper metrics were removed. See [BookKeeper configuration](administration-zk-bk.md#pulsar-specific-configuration).
- **Java runtime and garbage collector:** follow the Java and ZGC guidance in the [release upgrade checklist](administration-upgrade-to-5.0.x.md#remove-garbage-collector-overrides). Review dashboards that match particular garbage-collector or memory-pool label values, since the runtime and collector determine them.
- **Collection periods:** match the Prometheus scrape interval to the broker and bookie stats periods for non-cumulative rates and latency buckets. See [Matching the scrape interval to the stats periods](reference-metrics.md#matching-the-scrape-interval-to-the-stats-periods).
