---
id: administration-autorecovery
title: BookKeeper AutoRecovery
sidebar_label: "BookKeeper AutoRecovery"
description: Learn how BookKeeper AutoRecovery works in Pulsar, and how to configure, enable, disable, and monitor it.
---

When a bookie in a Pulsar cluster becomes unavailable, the ledgers it stored become under-replicated, meaning the data no longer meets the configured replication factor. BookKeeper provides **AutoRecovery** to detect this situation automatically and rereplicate affected ledgers to healthy bookies — without manual intervention.

## How AutoRecovery works

AutoRecovery runs as two concurrent components within the `autorecovery` process:

### Auditor

The **Auditor** is a singleton node, elected via ZooKeeper leader election from all nodes participating in AutoRecovery. When a bookie fails or is reported unavailable, the Auditor:

1. Scans all ledgers to identify those that stored data on the failed bookie.
2. Publishes rereplication tasks to the `/underreplicated/` ZooKeeper znode.

Only one Auditor is active in a cluster at any time. If the current Auditor node fails, a new leader election takes place automatically.

### Replication Worker

A **Replication Worker** runs on every node participating in AutoRecovery. Each worker:

1. Monitors the `/underreplicated/` ZooKeeper znode for tasks published by the Auditor.
2. Acquires a ZooKeeper ephemeral lock on an available task (ensuring no two workers replicate the same fragment simultaneously).
3. Copies the under-replicated ledger fragments to its local bookie to restore the configured replication factor.

## Deploy AutoRecovery

AutoRecovery can be deployed in two ways:

- **Alongside bookies** — each bookie also runs an AutoRecovery thread (default behavior when `autoRecoveryDaemonEnabled=true`).
- **On dedicated nodes** — separate machines run only AutoRecovery. This is recommended for large clusters where you want to isolate recovery I/O from normal bookie traffic. Set `autoRecoveryDaemonEnabled=false` on the bookies to disable the embedded AutoRecovery thread.

## Start AutoRecovery

To start AutoRecovery as a standalone process in the foreground:

```shell
bin/bookkeeper autorecovery
```

To start AutoRecovery as a background daemon:

```shell
bin/pulsar-daemon start autorecovery
```

Ensure [`zkServers`](reference-configuration.md#bookkeeper-zkServers) in `conf/bookkeeper.conf` points to your ZooKeeper cluster before starting.

## Configure AutoRecovery

AutoRecovery settings are configured in [`conf/bookkeeper.conf`](reference-configuration.md#bookkeeper).

| Parameter | Default | Description |
|---|---|---|
| `autoRecoveryDaemonEnabled` | `true` | Whether AutoRecovery runs as a thread embedded inside each bookie process. Set to `false` when running AutoRecovery on dedicated nodes. |
| `openLedgerRereplicationGracePeriod` | `30000` | Time in milliseconds to wait before fencing and rereplicated an open ledger fragment. This grace period avoids unnecessary rereplication when a bookie restarts quickly. |
| `lostBookieRecoveryDelay` | `0` | Time in seconds to wait after detecting a bookie failure before triggering AutoRecovery. Useful during rolling restarts to avoid unnecessary rereplication. |
| `rereplicationEntryBatchSize` | `10` | Number of entries to rereplicate in a single batch. |

:::note

Set `lostBookieRecoveryDelay` to a value greater than `0` (for example, `60`) in production clusters that undergo rolling restarts. This prevents AutoRecovery from triggering rereplication for bookies that are only temporarily unavailable.

:::

## Enable and disable AutoRecovery

You can temporarily disable AutoRecovery cluster-wide (for example, during planned maintenance) and re-enable it afterward.

**Disable** AutoRecovery across the cluster:

```shell
bin/bookkeeper shell autorecovery -disable
```

**Enable** AutoRecovery across the cluster:

```shell
bin/bookkeeper shell autorecovery -enable
```

**Check** whether AutoRecovery is currently enabled:

```shell
bin/bookkeeper shell autorecovery -status
```

## Manual recovery

If AutoRecovery is disabled or you need to recover a specific failed bookie manually, use the `recover` shell command.

Recover all ledgers from a failed bookie:

```shell
bin/bookkeeper shell recover <failed-bookie-address>
```

Recover a specific ledger from a failed bookie:

```shell
bin/bookkeeper shell recover -ledger <ledger-id> <failed-bookie-address>
```

List all currently under-replicated ledgers in the cluster:

```shell
bin/bookkeeper shell listunderreplicated
```

:::note

Manual recovery requires the failed bookie to be permanently decommissioned. If the bookie is still running, stop it before issuing the recover command to avoid split-brain scenarios.

:::

## Monitor AutoRecovery

To enable Prometheus metrics on a bookie or AutoRecovery node, set the following in `conf/bookkeeper.conf`:

```properties
statsProviderClass=org.apache.bookkeeper.stats.prometheus.PrometheusMetricsProvider
```

The following metrics are relevant to AutoRecovery:

| Metric | Type | Description |
|---|---|---|
| `bookkeeper_server_BOOKIE_UNDERREPLICATED_LEDGERS` | Gauge | Number of under-replicated ledgers currently detected by the Auditor. A sustained non-zero value indicates rereplication is falling behind. |
| `bookkeeper_server_NUM_BOOKIE_AUDITS_DELAYED` | Counter | Number of times a bookie audit was delayed because `lostBookieRecoveryDelay` had not yet elapsed. |
| `bookkeeper_server_NUM_DELAYED_BOOKIE_AUDITS_CANCELLED` | Counter | Number of delayed audits that were cancelled because the bookie came back online before the delay expired. |
| `bookkeeper_server_REPLICATION_WORKER_REREPLICATE_OP` | Counter | Number of ledger fragment rereplication operations completed by the Replication Worker. |

## Related resources

- [BookKeeper AutoRecovery reference](https://bookkeeper.apache.org/docs/admin/autorecovery/)
- [ZooKeeper and BookKeeper administration](administration-zk-bk.md)
- [BookKeeper configuration reference](reference-configuration.md#bookkeeper)
- [Decommission bookies](administration-zk-bk.md#decommission-bookies-cleanly)
