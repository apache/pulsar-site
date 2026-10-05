---
id: administration-logging
title: Configure structured logging
sidebar_label: Logging
description: Configure text or JSON logs and collect structured log attributes.
---

Pulsar uses structured logging to attach context such as the topic, subscription, or ledger ID to a log event. This context can follow an operation into storage components. Log4j2 controls the server's output format, destinations, and levels through `conf/log4j2.yaml`.

## Choose text or JSON output

The default server log format is **text**. In the supplied text layout, event context appears after the message through the Log4j2 context-map pattern (`%X`).

To enable JSON output for a broker started through `bin/pulsar`, set `PULSAR_LOG_FORMAT` before starting the process:

```shell
PULSAR_LOG_FORMAT=json bin/pulsar broker
```

For a container, supply `PULSAR_LOG_FORMAT=json` as an environment variable. For a bookie started through `bin/bookkeeper`, use `BOOKIE_LOG_FORMAT=json` instead. Keep the format consistent with the log collector's input configuration.

The supplied JSON layout uses `conf/OtelLogLayout.json`. It includes fields such as `Timestamp`, `SeverityText`, `Body`, and `Attributes`; contextual attributes are included under `Attributes`. Trace fields are populated when trace context is present. Choosing this layout does not enable an OpenTelemetry exporter or create trace context by itself.

To supply another Log4j2 JSON event template, set `PULSAR_LOG_JSON_TEMPLATE` to its URI, for example `file:/pulsar/conf/custom-log-layout.json`. For the BookKeeper launcher, the equivalent variable is `BOOKIE_LOG_JSON_TEMPLATE`. Make the file available to every affected process. If you maintain a custom `log4j2.yaml`, ensure its layout includes event context; a layout that writes only `%msg` omits the structured attributes.

## Collect and interpret structured attributes

Use context attributes to filter events when available, and verify their names against actual events. Check that parsers, searches, and alerts handle the chosen text or JSON layout, multiline exceptions, and contextual attributes.

A structured log event does not guarantee that every event contains a topic, subscription, or trace identifier. For log collector compatibility checks during upgrades, see the [upgrade guide](administration-upgrade.md).

The broker's `Messaging service is ready` event reports `configOverrides`: declared settings whose values differ from a fresh configuration of the installed version, plus extra configuration properties. Settings explicitly supplied with their default values are omitted. Keep the deployment configuration and version when investigating an incident; this startup event is a summary of overrides, and does not capture later dynamic changes.

Review alerts that depend on these log levels:

| Event | Level |
| --- | --- |
| Schema incompatibility | `WARN`; incompatible schemas are still rejected. |
| Partition-metadata lookup for a nonexistent resource | `WARN`; other lookup failures remain `ERROR`. |
| Missing draining-hash entry during a concurrent statistics read | `DEBUG`. |
| Deliberate namespace ownership release | `DEBUG`; an independently expired registered lock is logged at `INFO`. |

## Diagnose slow or failed topic loading

Persistent topic-load events include the `topic` and a `latency` attribute. The latency summary contains the state, start and end timestamps, total elapsed time, completed stage durations, and any pending steps or failure reason. At a timeout it also records the timeout timestamp. Stage names include `namespace-policies`, `local-topic-policies`, `open-ml`, `replication`, `deduplication`, and `max-concurrent-loading-limitation`. Use the pending steps to choose which policy reader, storage operation, replication initialization, or loading queue to investigate. Stages can overlap, so their durations do not add up to the total.

The warning `Failed to load topic within ... s` uses `topicLoadTimeoutSeconds` (default 60). If outstanding asynchronous actions finish later, the broker can emit `Finished pending topic loading actions after timeout` with an updated summary. That event reports completion of the outstanding actions; the original topic-load request has already failed. Correlate events using the topic and the start timestamp, and inspect the [topic-load failure metrics](reference-metrics.md) before increasing the timeout.

Storage events can carry inherited context such as `topic`, `managedLedger`, `cursor`, `subscription`, or `schemaId`, depending on the operation. Use this context to connect a slow topic load to its BookKeeper ledger and cursor events. The `Failed to synchronize metadata event` warning includes failures from processing the event or acknowledging it; inspect the attached exception and `messageId` to identify the failing operation.

Custom Java diagnostics can construct a `LatencyTracer` with a `NanoTimeSupplier` and inspect it with `getTracePoints()` and `getSnapshot()`. See the [upgrade guide](administration-upgrade.md) for API compatibility changes.

See [Monitoring](deploy-monitoring.md) for metrics collection and OpenTelemetry configuration.
