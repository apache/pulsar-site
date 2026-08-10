---
id: administration-upgrade-observability
title: Upgrade Observability Checklist
sidebar_label: "Upgrade Observability"
description: Metrics to monitor during and after a Pulsar cluster upgrade, healthy vs unhealthy indicators, and rollback decision criteria.
---

This page provides a structured checklist of metrics and signals to observe during and after a Pulsar cluster upgrade. Use it alongside the [Upgrade Guide](administration-upgrade.md) to validate each upgrade phase and detect issues early.

## Before you upgrade: establish a baseline

Before starting the upgrade, record the current values for each metric below. Baseline values are cluster-specific and essential for distinguishing normal post-upgrade variation from a real regression.

| Area | Metric | Where to check |
|------|--------|----------------|
| Broker throughput | `pulsar_rate_in`, `pulsar_rate_out` | Prometheus / Grafana |
| Broker message backlog | `pulsar_storage_backlog_size` | Prometheus / Grafana |
| Broker JVM | GC pause duration, heap usage | JVM metrics endpoint or Grafana |
| BookKeeper write latency | `bookkeeper_server_ADD_ENTRY_REQUEST` p99 | BookKeeper Prometheus endpoint |
| BookKeeper disk | Bookie disk write/read latency, `pulsar_storage_write_latency_le_*` | Prometheus |
| Topic ownership | Number of topics per broker | `pulsar-admin broker-stats topics` |
| ZooKeeper | Request latency, outstanding requests | ZooKeeper Prometheus endpoint |

## During the upgrade

### ZooKeeper (if upgrading)

- **Watch for:** increased request latency or outstanding request queue growth.
- **Healthy:** latency stays within 2× baseline; outstanding requests do not trend upward.
- **Unhealthy:** sustained latency spike or growing request queue — pause the rollout.

### BookKeeper (bookies)

Bookies are stateful. Roll out one at a time and verify before proceeding.

- **Disable AutoRecovery** before starting the bookie rollout (see [Upgrade Guide](administration-upgrade.md)).
- After each bookie restart, verify the bookie rejoins the ensemble:

  ```shell
  bin/bookkeeper shell simpletest --ensemble 3 --writeQuorum 2 --ackQuorum 2 --numEntries 10
  ```

Key metrics to watch per bookie:

| Metric | What to check |
|--------|---------------|
| `bookkeeper_server_ADD_ENTRY_REQUEST` (p99) | Should return to baseline within 5 minutes of restart |
| Ledger write latency (`pulsar_storage_write_latency_le_*`) | No sustained increase |
| Bookie disk utilisation | No spike indicating compaction or replication backlog |
| Journal write latency | Should be stable; sudden increases indicate I/O pressure |

- **Re-enable AutoRecovery** after all bookies are upgraded.

### Brokers

Brokers are stateless — topic ownership will rebalance as brokers restart. This is expected, but watch for rebalance storms.

| Metric | What to check |
|--------|---------------|
| `pulsar_topics_count` per broker | Should converge to an even distribution within a few minutes |
| `pulsar_rate_in` / `pulsar_rate_out` | Should recover to baseline within 2–3 minutes of each broker restart |
| Broker JVM GC pause duration | Should not exceed 2× baseline |
| `pulsar_producers_count`, `pulsar_consumers_count` | Client reconnect spike is normal; watch for connections that do not recover |
| `pulsar_storage_backlog_size` | Should not grow persistently during the rollout |

**Canary step:** upgrade one broker, run for 15–30 minutes, verify metrics are stable before continuing the rolling upgrade.

### Proxies

Proxies are stateless with no persistent state. After each proxy restart:

- Confirm client connections are re-establishing (check connection counts in Grafana).
- Verify no increase in client-side connection error rates.

## After the upgrade: validation checklist

Run the following checks after all components have been upgraded.

### Cluster health

```shell
# Verify all brokers are active
bin/pulsar-admin brokers list <cluster-name>

# Verify all bookies are active
bin/bookkeeper shell listbookies -rw

# Check for under-replicated ledgers
bin/bookkeeper shell listunderreplicated
```

Under-replicated ledgers after the upgrade indicate a bookie did not come back cleanly. Investigate before declaring the upgrade complete.

### Metric validation

Compare the following against your pre-upgrade baseline:

| Metric | Acceptable range | Action if outside range |
|--------|-----------------|------------------------|
| `pulsar_rate_in` / `pulsar_rate_out` | Within 10% of baseline | Investigate broker logs for errors |
| `pulsar_storage_backlog_size` | Not growing; stable or decreasing | Check consumer connectivity and lag |
| Broker JVM GC pause p99 | Within 1.5× baseline | Check for memory pressure; consider heap tuning |
| BookKeeper write latency p99 | Within 1.5× baseline | Check bookie disk and journal performance |
| `pulsar_topics_count` per broker | Evenly distributed | Trigger manual rebalance if needed |

### Client connectivity

- Confirm producers and consumers have reconnected to all topics.
- Check client application logs for persistent reconnect errors.
- Verify no increase in message acknowledgement failures.

## Rollback decision criteria

Initiate a rollback if **any** of the following conditions persist for more than 10 minutes after the upgrade step:

- Message publish latency is more than 3× the pre-upgrade baseline.
- `pulsar_storage_backlog_size` is growing and consumer lag is increasing.
- Bookie write failures or persistent under-replicated ledgers that AutoRecovery is not resolving.
- Broker JVM GC pauses are causing consumer timeouts or client disconnects.
- Cluster health commands return errors or missing components.

:::note

Before rolling back, capture broker and bookie logs and heap dumps if possible. These are useful for reporting the issue upstream.

:::

Refer to the [Upgrade Guide](administration-upgrade.md) for rollback procedures specific to each component.

## See also

- [Upgrade Guide](administration-upgrade.md)
- [Monitoring](deploy-monitoring.md)
- [Reference: Metrics](reference-metrics.md)
