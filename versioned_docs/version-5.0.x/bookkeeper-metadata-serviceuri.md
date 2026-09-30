---
id: bookkeeper-metadata-serviceuri
title: BookKeeper metadata configuration
sidebar_label: "BookKeeper metadata URI"
description: Configure the Pulsar metadata-store driver for BookKeeper and tune its metadata connections.
---

BookKeeper uses `metadataServiceUri` in `conf/bookkeeper.conf` to select a metadata driver and locate ledger metadata and bookie registrations. Brokers connect to that same store through `bookkeeperMetadataServiceUri` in `conf/broker.conf`.

## Use the Pulsar metadata-store driver

The `metadata-store:` prefix selects the Pulsar driver. For a new deployment with a dedicated Oxia namespace for BookKeeper, configure bookies with:

```conf
metadataServiceUri=metadata-store:oxia://oxia-1.example.com:6648/bookkeeper
```

Configure brokers to use the same endpoint and namespace:

```conf
bookkeeperMetadataServiceUri=metadata-store:oxia://oxia-1.example.com:6648/bookkeeper
```

The Oxia namespace must already exist. For new deployments, keep it separate from the namespace used by the brokers' `metadataStoreUrl`. For a live migration of a shared ZooKeeper store, preserve the single target scope used by that migration instead; see [Migrate metadata store](administration-metadata-store-migration.md#step-5-update-bookkeeper-configuration).

For a ZooKeeper store shared with brokers using `metadataStoreUrl=zk:zk1:2181,zk2:2181,zk3:2181`, use the same source scope on bookies:

```conf
metadataServiceUri=metadata-store:zk:zk1:2181,zk2:2181,zk3:2181
```

The Pulsar driver uses `/ledgers` as its default ledger root within the selected store. A path appended to the inner ZooKeeper URL selects a ZooKeeper chroot. For example, `metadata-store:zk:zk1:2181/pulsar` opens the store under `/pulsar`; it does not simply change the ledger root to `/pulsar`. Verify the existing chroot and ledger paths before changing a running deployment's URI. Copying a plain BookKeeper `zk+hierarchical://hosts/ledgers` URI into the Pulsar format can change its meaning.

If `bookkeeperMetadataServiceUri` is empty, the broker uses its local metadata store for BookKeeper and shares the existing metadata-store instance. Set an explicit URI when BookKeeper has a separate store. All brokers, bookies, and auto-recovery processes must agree on the location of the existing ledger metadata.

The Pulsar distribution's `bin/bookkeeper` and `bin/pulsar` scripts register the Pulsar client and bookie metadata drivers. If you launch BookKeeper through another wrapper, provide the equivalent JVM options and the Pulsar metadata driver on the classpath:

```text
-Dbookkeeper.metadata.client.drivers=org.apache.pulsar.metadata.bookkeeper.PulsarMetadataClientDriver
-Dbookkeeper.metadata.bookie.drivers=org.apache.pulsar.metadata.bookkeeper.PulsarMetadataBookieDriver
```

## Tune the metadata-store driver

Pulsar accepts `MetadataStoreConfig` query parameters on `metadata-store:` URIs. The driver removes recognized parameters from the provider URL and applies them when it creates the metadata-store connection:

```conf
metadataServiceUri=metadata-store:oxia://oxia-1.example.com:6648/bookkeeper?batchingMaxDelayMillis=10&batchingMaxSizeKb=256&numSerDesThreads=4
```

Use the same URI on the broker's `bookkeeperMetadataServiceUri` when its BookKeeper client creates a separate connection.

| Parameter | Accepted values | Default when omitted |
|---|---|---|
| `allowReadOnlyOperations` | `true` or `false` | `false` |
| `batchingEnabled` | `true` or `false` | `true` |
| `batchingMaxDelayMillis` | Integer greater than or equal to `0` | `5` |
| `batchingMaxOperations` | Positive integer | `1000` |
| `batchingMaxSizeKb` | Positive integer | `128` |
| `configFilePath` | URL-encoded file path understood by the backend | Unset |
| `fsyncEnable` | `true` or `false`; applies to backends supporting it, such as RocksDB | `true` |
| `numSerDesThreads` | Positive integer | `1` |
| `sessionTimeoutMillis` | Positive integer, in milliseconds | BookKeeper's configured ZooKeeper timeout |

Invalid recognized values fail metadata-store initialization. Other query parameters are passed to the underlying provider; their support depends on that provider. URL-encode special characters in keys and values, and quote the complete URI when passing it through a shell because `&` has shell syntax.

These query parameters are applied only when the BookKeeper driver creates a metadata-store instance. They are not applied when a broker injects its existing shared instance. Configure that instance through the broker's metadata-store settings instead. The direct Oxia provider does not parse these BookKeeper query settings on `metadataStoreUrl` or `configurationMetadataStoreUrl`.

## Legacy ZooKeeper configuration

BookKeeper also accepts its native ZooKeeper driver, such as `zk+hierarchical://hosts/ledgers`, and can derive a ZooKeeper URI from legacy settings such as `zkServers` and `zkLedgersRootPath`. These select a different driver from `metadata-store:`.

For new Pulsar deployments, configure the Pulsar metadata-store driver explicitly. It supports the metadata-store integration and migration framework used by Pulsar. Bookies using the native ZooKeeper driver do not participate in the [live ZooKeeper-to-Oxia migration](administration-metadata-store-migration.md). Before converting an existing deployment, verify that the new driver points at its existing ledger metadata; changing the URI does not move data.
