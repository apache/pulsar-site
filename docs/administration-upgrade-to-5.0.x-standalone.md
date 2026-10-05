---
id: administration-upgrade-to-5.0.x-standalone
title: Upgrading Pulsar standalone to 5.0.x
sidebar_label: Pulsar standalone
description: Upgrade Pulsar standalone to 5.0.x while retaining existing data and metadata.
---

For shared runtime and configuration requirements, see [Upgrading to Pulsar 5.0.x](administration-upgrade-to-5.0.x.md).

## Prepare persisted standalone data

This guide applies to `pulsar standalone`, which runs embedded BookKeeper storage and uses RocksDB for metadata by default. Standalone can also use embedded ZooKeeper or an explicit metadata-store URL.

Existing standalone data from Pulsar 4.x can be reused with Pulsar 5.0.0. Standalone preserves the stored bookie identities and recovers the listening ports of bookies with legacy hostname-and-port identities automatically. No cookie migration is required.

1. Stop the old standalone instance and back up its data, metadata, and configuration together. Retain the old binaries or container image for your rollback plan.
2. Prepare the new Pulsar installation and runtime using the [runtime and packaging requirements](administration-upgrade-to-5.0.x.md#check-runtime-and-packaging-requirements).
3. Start the new version with the same metadata store and BookKeeper data directories. Keep the configured storage paths unchanged, including the mount path inside a container. For Docker, attach the existing data volume.
4. Verify that existing topics, subscriptions, and messages are available, and test publishing and consuming with your workload.

For port configuration and data reuse, see [Run Pulsar locally](getting-started-standalone.md#reuse-standalone-data).
