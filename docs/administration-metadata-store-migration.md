---
id: administration-metadata-store-migration
title: Migrate metadata store from ZooKeeper to Oxia
sidebar_label: "Migrate metadata store"
description: Learn how to live-migrate a Pulsar cluster's metadata store from ZooKeeper to Oxia with no downtime.
---

Pulsar supports live migration of the metadata store from [Apache ZooKeeper](https://zookeeper.apache.org/) to [Oxia](https://github.com/oxia-db/oxia) without downtime. During migration, the data plane (publish and consume) continues operating normally.

The migration framework was introduced in Pulsar 5.0 by [PIP-454](https://github.com/apache/pulsar/blob/master/pip/pip-454.md).

:::note

This procedure migrates the cluster's metadata store (`metadataStoreUrl`). Migrating a separate configuration metadata store (`configurationMetadataStoreUrl` pointing to a different ensemble) is out of scope and must be handled separately. If your cluster uses a single metadata store for both (the default for standalone and single-cluster deployments), this procedure covers everything.

:::

## How the migration works

The migration uses a **write-pause-and-copy** approach. At a high level:

1. All brokers and bookies temporarily pause metadata writes.
2. The coordinator copies all persistent metadata from ZooKeeper to Oxia.
3. All brokers and bookies switch to using Oxia.

Because there is a single source of truth at every point in time (no dual-writes or dual-reads), metadata is always in a consistent state.

### Migration phases

| Phase | Reads from | Writes to | Data plane impact |
|-------|-----------|-----------|-------------------|
| **NOT_STARTED** | ZooKeeper | ZooKeeper | None |
| **PREPARATION** | ZooKeeper | Blocked | Publish/consume works. Topic and subscription creation blocked, load-balancing operations deferred. |
| **COPYING** | ZooKeeper | Blocked | Same as PREPARATION |
| **COMPLETED** | Oxia | Oxia | None |
| **FAILED** | ZooKeeper | ZooKeeper | None (reverted to ZooKeeper) |

The PREPARATION and COPYING phases typically complete in under 30 seconds, even for clusters with hundreds of megabytes of metadata.

### What happens at each phase

**PREPARATION** -- The coordinator writes a migration flag to ZooKeeper. Each broker and bookie detects the flag, connects to the target Oxia cluster, recreates its ephemeral nodes in Oxia, and signals readiness by removing its participant registration. The coordinator waits until all participants have acknowledged.

**COPYING** -- The coordinator traverses all persistent metadata in ZooKeeper and copies it to Oxia, preserving version IDs and modification counts. Ephemeral nodes are skipped because they were already recreated during preparation.

**COMPLETED** -- The coordinator writes the completed flag. All brokers and bookies switch their reads and writes to Oxia, invalidate their caches, and resume normal metadata operations.

If any error occurs during migration, the phase is set to **FAILED** and all brokers and bookies automatically revert to using ZooKeeper. No manual rollback is required.

## Prerequisites

Before starting the migration:

1. **Set up an Oxia cluster.** Ensure it is reachable from all Pulsar brokers and bookies, and that the target namespace exists in the Oxia cluster. See the [Oxia documentation](https://oxia-db.github.io/) for deployment instructions.

2. **Upgrade to Pulsar 5.0 or later.** All components that connect to the metadata store (brokers, bookies, and auto-recovery daemons) must run a version that supports migration. No additional broker configuration is needed -- the migration wrapper (`DualMetadataStore`) is enabled automatically for ZooKeeper-based metadata stores.

3. **Run bookies with the Pulsar metadata driver.** Bookies participate in the migration only when they are configured with the `metadata-store:` scheme in `conf/bookkeeper.conf`:
   ```conf
   metadataServiceUri=metadata-store:zk:my-zk-1:2181/ledgers
   ```
   Bookies using the plain BookKeeper ZooKeeper driver (`zk+hierarchical://...`) do not participate and must be reconfigured (with a rolling restart) before starting the migration.

4. **Verify the Oxia endpoint.** The target URL must use the `oxia://` scheme:
   ```
   oxia://<host>:<port>/<namespace>
   ```
   For example: `oxia://oxia-1.example.com:6648/pulsar`

:::tip

The migration admin commands require superuser permissions.

:::

## Step 1: Check the current status

Verify that no migration is already in progress:

```shell
bin/pulsar-admin metadata-migration status
```

Expected output:
```json
{
  "phase" : "NOT_STARTED"
}
```

## Step 2: Start the migration

Trigger the migration by specifying the target Oxia URL:

```shell
bin/pulsar-admin metadata-migration start --target oxia://oxia-1.example.com:6648/pulsar
```

The command returns immediately after initiating the migration. The actual migration runs asynchronously on the broker that received the request.

## Step 3: Monitor progress

Poll the migration status until it reports `COMPLETED`:

```shell
bin/pulsar-admin metadata-migration status
```

You will see the phase progress through `PREPARATION`, `COPYING`, and finally `COMPLETED`:

```json
{
  "phase" : "COMPLETED",
  "targetUrl" : "oxia://oxia-1.example.com:6648/pulsar"
}
```

If the status shows `FAILED`, check the broker logs for error details. The cluster automatically reverts to ZooKeeper, so you can investigate and retry.

## Step 4: Update broker configuration

After migration completes, update the broker configuration to use Oxia directly. In `conf/broker.conf`:

```conf
metadataStoreUrl=oxia://oxia-1.example.com:6648/pulsar
configurationMetadataStoreUrl=oxia://oxia-1.example.com:6648/pulsar
```

Then perform a rolling restart of all brokers. After restarting, brokers connect to Oxia directly without the migration wrapper.

## Step 5: Update BookKeeper configuration

Update the BookKeeper configuration to use Oxia. In `conf/bookkeeper.conf`:

```conf
metadataServiceUri=metadata-store:oxia://oxia-1.example.com:6648/pulsar
```

Then perform a rolling restart of all bookies.

## Step 6: Decommission ZooKeeper

After all brokers and bookies have been restarted with the new configuration and are confirmed to be running normally, the ZooKeeper cluster can be safely decommissioned.

:::caution

ZooKeeper must remain available until every broker and bookie has been restarted with the new configuration. Components that still have the old configuration connect to ZooKeeper on startup to discover the migration state before switching to Oxia.

:::

## Handling failures

### Migration fails during PREPARATION or COPYING

If the migration fails, the phase is automatically set to `FAILED`. All brokers and bookies revert to ZooKeeper immediately. No data is lost because writes were paused during the migration and ZooKeeper was never modified.

To retry, simply run the `start` command again:

```shell
bin/pulsar-admin metadata-migration start --target oxia://oxia-1.example.com:6648/pulsar
```

### A broker restarts after migration completes

A broker or bookie that restarts after the migration completed (but before its configuration was updated) reads the migration state from ZooKeeper on startup and connects to Oxia for all metadata operations.

Avoid restarting brokers or bookies while a migration is in progress -- the write-pause window is typically under 30 seconds. If a component does restart during that window, restart it again once the migration reports `COMPLETED` so that it picks up the new metadata store.

## REST API

The migration is also available through the REST API:

**Start migration:**
```shell
curl -X POST "http://broker:8080/admin/v2/metadata/migration/start?target=oxia://oxia-1.example.com:6648/pulsar"
```

**Check status:**
```shell
curl "http://broker:8080/admin/v2/metadata/migration/status"
```
