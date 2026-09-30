---
id: administration-metadata-store-migration
title: Migrate metadata store from ZooKeeper to Oxia
sidebar_label: "Migrate metadata store"
description: Migrate a shared Pulsar metadata-store scope from ZooKeeper to Oxia with coordinated write pausing.
---

Pulsar supports live migration of the metadata store from [Apache ZooKeeper](https://zookeeper.apache.org/) to [Oxia](https://github.com/oxia-db/oxia). The migration coordinates a pause in metadata writes while active producers and consumers can continue using existing topics. Operations that require metadata changes, such as topic creation or ledger rollover, can be blocked or deferred during that window.

The migration framework coordinates the metadata consumers and copies their shared source data to Oxia; see [PIP-454](https://github.com/apache/pulsar/blob/master/pip/pip-454.md) for its design.

:::note

This procedure migrates the source metadata-store scope addressed by the broker's `metadataStoreUrl` into one Oxia namespace. The examples assume brokers, configuration metadata, and BookKeeper metadata share that scope. A separate configuration metadata store or BookKeeper metadata store is outside this procedure and must be migrated separately. ZooKeeper chroots define distinct scopes, even on the same ensemble.

:::

## How the migration works

The migration uses a **write-pause-and-copy** approach. At a high level:

1. All brokers and bookies temporarily pause metadata writes.
2. The coordinator copies all persistent metadata from ZooKeeper to Oxia.
3. All brokers and bookies switch to using Oxia.

The framework routes operations according to the migration phase and does not dual-write user metadata to both stores.

### Migration phases

| Phase | Reads from | Writes to | Data plane impact |
|-------|-----------|-----------|-------------------|
| **NOT_STARTED** | ZooKeeper | ZooKeeper | None |
| **PREPARATION** | ZooKeeper | Blocked | Existing traffic can continue; operations requiring metadata changes are blocked or deferred. |
| **COPYING** | ZooKeeper | Blocked | Same as PREPARATION |
| **COMPLETED** | Oxia | Oxia | None |
| **FAILED** | ZooKeeper | ZooKeeper | None (reverted to ZooKeeper) |

The write-pause window depends on participant readiness, metadata volume, and target performance. The coordinator uses a default preparation timeout of 60 seconds; this is not a guarantee of total migration duration.

### What happens at each phase

**PREPARATION** -- The coordinator writes a migration flag to ZooKeeper. Each broker and bookie detects the flag, connects to the target Oxia cluster, recreates its ephemeral nodes in Oxia, and signals readiness by removing its participant registration. The coordinator waits until all participants have acknowledged.

**COPYING** -- The coordinator traverses all persistent metadata in ZooKeeper and copies it to Oxia, preserving version IDs and modification counts. Ephemeral nodes are skipped because they were already recreated during preparation.

**COMPLETED** -- The coordinator writes the completed flag. All brokers and bookies switch their reads and writes to Oxia, invalidate their caches, and resume normal metadata operations.

If the coordinator encounters an error before completion, it sets the phase to **FAILED**, and participants resume operations against ZooKeeper. This recovery applies to an incomplete migration. After **COMPLETED**, writes go only to Oxia; ZooKeeper is no longer an up-to-date rollback copy.

## Prerequisites

Before starting the migration:

1. **Set up an Oxia cluster.** Ensure it is reachable from all Pulsar brokers and bookies, and that the target namespace exists in the Oxia cluster. Use a dedicated target namespace: copying metadata can overwrite matching keys. See the [Oxia documentation](https://oxia-db.github.io/) for deployment instructions.

2. **Verify migration support in every component.** All components that connect to the metadata store (brokers, bookies, and auto-recovery daemons) must run a version that supports migration. Complete any required [software upgrade](administration-upgrade.md) before starting metadata-store migration. No additional broker configuration is needed -- the migration wrapper (`DualMetadataStore`) is enabled automatically for ZooKeeper-based metadata stores.

3. **Run bookies with the Pulsar metadata driver.** Bookies participate in the migration only when they are configured with the `metadata-store:` scheme in `conf/bookkeeper.conf`:
   ```conf
   # Same source scope as metadataStoreUrl=zk:my-zk-1:2181
   metadataServiceUri=metadata-store:zk:my-zk-1:2181
   ```
   Bookies using the plain BookKeeper ZooKeeper driver (`zk+hierarchical://...`) do not participate and must be reconfigured (with a rolling restart) before starting the migration.

   Preserve the existing ledger root and ZooKeeper scope when changing drivers. For the Pulsar driver, a suffix in `metadata-store:zk:hosts/scope` selects a ZooKeeper chroot; it does not merely select the ledger root. Do not append `/ledgers` to an otherwise shared source URL when that would move bookies into a different scope. Verify that bookies and brokers register against the same migration coordination state.

4. **Verify the Oxia endpoint.** The target URL must use the `oxia://` scheme:
   ```
   oxia://<host>:<port>/<namespace>
   ```
   For example: `oxia://oxia-1.example.com:6648/broker`

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
bin/pulsar-admin metadata-migration start --target oxia://oxia-1.example.com:6648/broker
```

The command returns immediately after initiating the migration. The actual migration runs asynchronously on the broker that received the request.

`start` rejects a source whose flag is already `PREPARATION`, `COPYING`, or `COMPLETED`. A source in `FAILED` can be retried after the failure is resolved. The CLI exposes `start` and `status`; it has no cancel or reverse-migration command.

## Step 3: Monitor progress

Poll the migration status until it reports `COMPLETED`:

```shell
bin/pulsar-admin metadata-migration status
```

You will see the phase progress through `PREPARATION`, `COPYING`, and finally `COMPLETED`:

```json
{
  "phase" : "COMPLETED",
  "targetUrl" : "oxia://oxia-1.example.com:6648/broker"
}
```

If the status shows `FAILED`, check the broker logs and participant logs for error details. Participants resume using ZooKeeper; verify that recovery before retrying.

## Step 4: Update broker configuration

After migration completes, update the broker configuration to use Oxia directly. In `conf/broker.conf`:

```conf
metadataStoreUrl=oxia://oxia-1.example.com:6648/broker
configurationMetadataStoreUrl=oxia://oxia-1.example.com:6648/broker
```

If `bookkeeperMetadataServiceUri` is explicitly configured on brokers, update it to the same migrated target scope:

```conf
bookkeeperMetadataServiceUri=metadata-store:oxia://oxia-1.example.com:6648/broker
```

Then perform a rolling restart of all brokers. After restarting, brokers connect to Oxia directly without the migration wrapper. If you leave `configurationMetadataStoreUrl` empty, it continues to fall back to `metadataStoreUrl`; do not overwrite an independently configured store with this example.

## Step 5: Update BookKeeper configuration

Update the BookKeeper configuration to use Oxia. In `conf/bookkeeper.conf`:

```conf
metadataServiceUri=metadata-store:oxia://oxia-1.example.com:6648/broker
```

Then perform a rolling restart of all bookies. Update and restart standalone BookKeeper AutoRecovery processes as well; they also use the ledger metadata store. Inventory any other services or administrative tools that access this source and update their metadata URLs before retiring it.

Use the exact target namespace specified in `start`, because the migration copied the whole shared source into that namespace. Although separate `broker` and `bookkeeper` namespaces are recommended for new deployments, this migration does not repartition metadata into two namespaces. Pointing migrated bookies at a different, empty namespace would disconnect them from their ledger metadata. Keep the ledger root unchanged.

## Step 6: Decommission ZooKeeper

Decommission ZooKeeper only after every client of the migrated source has switched to Oxia and normal operation has been verified. This includes brokers, bookies, standalone AutoRecovery processes, and any other metadata consumers. Also confirm that ZooKeeper is not serving an independent configuration store or another application.

:::caution

ZooKeeper must remain available until all metadata consumers have been updated and restarted with the new configuration. Components that still have the old configuration connect to ZooKeeper on startup to discover the migration state before switching to Oxia.

:::

## Handling failures

### Migration fails during PREPARATION or COPYING

If the coordinator records `FAILED`, participants resume metadata operations against ZooKeeper. Persistent source data was retained, and writes were blocked while copying. A failed attempt can leave copied records and recreated ephemeral records in the target namespace, so verify the target before retrying or reusing it.

The API accepts a new `start` request after `FAILED`, but this is not a general recovery procedure. Partial preparation can remove participant registrations and leave target stores initialized. Establish and validate a recovery plan that accounts for every participant and the target's contents before attempting another migration. Do not change the target URL as a retry workaround: existing clients can retain the target store from the earlier attempt.

If the coordinating broker exits during PREPARATION or COPYING, the migration can remain in that phase. The coordinator runs in that broker's process; another broker does not automatically take over the migration. A process failure therefore requires a separate recovery assessment rather than an assumption that the migration will resume or roll back automatically.

### A broker restarts after migration completes

A broker or bookie that restarts after the migration completed (but before its configuration was updated) reads the migration state from ZooKeeper on startup and connects to Oxia for all metadata operations.

Avoid planned restarts while migration is in progress. A component starting during PREPARATION or COPYING reads the current phase and runs preparation so it can initialize the target and acknowledge readiness. Check its logs and the final migration state rather than assuming a second restart is required.

### Status after switching to direct Oxia configuration

The migration flag is retained only in the ZooKeeper source and is not copied to Oxia. During the transition, `status` reads that source flag through the migration wrapper, including after completion. Once a broker is configured to connect directly to Oxia, its status endpoint can return `NOT_STARTED` because the target has no flag. That result does not undo a completed migration; confirm the configured URLs and normal cluster operation before decommissioning the source.

### Rollback after completion

There is no reverse-migration command in this framework. Do not restore ZooKeeper URLs after Oxia has accepted writes: the retained source has diverged. A rollback that changes metadata backends requires a separate plan to transfer the current metadata and validate all consumers of that store.

## REST API

The migration is also available through the REST API:

**Start migration:**
```shell
curl -X POST "http://broker:8080/admin/v2/metadata/migration/start?target=oxia://oxia-1.example.com:6648/broker"
```

**Check status:**
```shell
curl "http://broker:8080/admin/v2/metadata/migration/status"
```
