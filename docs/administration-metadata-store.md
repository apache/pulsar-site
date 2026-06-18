---
id: administration-metadata-store
title: Configure metadata store
sidebar_label: "Configure metadata store"
description: Get a comprehensive understanding of metadata store in Pulsar.
---

Pulsar metadata store maintains all the metadata, configuration, and coordination of a Pulsar cluster, such as topic metadata, schema, broker load data, and so on.

The metadata store of each Pulsar instance should contain the following two components:
* A local metadata store ensemble (`metadataStoreUrl`) that stores cluster-specific configuration and coordination, such as which brokers are responsible for which topics as well as ownership metadata, broker load reports, and BookKeeper ledger metadata.
* A configuration store quorum (`configurationMetadataStoreUrl`) stores configuration for clusters, tenants, namespaces, topics, and other entities that need to be globally consistent.

:::note

If you are using a standalone Pulsar or a single Pulsar cluster, you only need to configure one metadata store (via `metadataStoreUrl`) and it also serves as a configuration store.

:::

Pulsar supports the following metadata store services:
* [Oxia](https://github.com/oxia-db/oxia) (recommended)
* [Apache ZooKeeper](https://zookeeper.apache.org/)
* [Etcd](https://etcd.io/)
* [RocksDB](http://rocksdb.org/)
* Local memory

For new production clusters, [Oxia](https://github.com/oxia-db/oxia) is the recommended metadata store. ZooKeeper remains fully supported, and existing ZooKeeper-based clusters can [live-migrate to Oxia](administration-metadata-store-migration.md) without downtime.

:::note

RocksDB and local memory are only applicable to standalone Pulsar or single-node Pulsar clusters.

:::

## Use Oxia as metadata store

[Oxia](https://github.com/oxia-db/oxia) is the recommended metadata store for new Pulsar clusters. Deploy an Oxia cluster (or use an existing one); see the [Oxia documentation](https://oxia-db.github.io/) for deployment instructions.

Oxia organizes data into [namespaces](https://oxia-db.github.io/docs/features/namespaces). The namespaces you reference must already exist — they are defined in the Oxia coordinator configuration, not created on demand. Use **separate namespaces** for the Pulsar metadata store and for BookKeeper. To stay consistent with the [Pulsar Helm chart](https://github.com/apache/pulsar-helm-chart), this guide uses `broker` for Pulsar and `bookkeeper` for BookKeeper.

To use Oxia as the metadata store, add the following to `conf/broker.conf` (or `conf/standalone.conf`). `configurationMetadataStoreUrl` is optional and defaults to `metadataStoreUrl`, so a single cluster only needs:

```conf
metadataStoreUrl=oxia://oxia-1.example.com:6648/broker
```

The URL format is `oxia://<host>:<port>/<namespace>`.

BookKeeper connects through a different format: the `metadata-store:` prefix is required, and it should use its own namespace. Set `bookkeeperMetadataServiceUri` in `conf/broker.conf` to match the `metadataServiceUri` configured for the bookies in `conf/bookkeeper.conf`:

```conf
bookkeeperMetadataServiceUri=metadata-store:oxia://oxia-1.example.com:6648/bookkeeper
```

To live-migrate an existing cluster from ZooKeeper to Oxia, see [Migrate metadata store](administration-metadata-store-migration.md).

## Use ZooKeeper as metadata store

ZooKeeper is fully supported and ships with the Pulsar binary package. The Pulsar metadata store can be deployed on a separate ZooKeeper cluster or deployed on an existing ZooKeeper cluster.

To use ZooKeeper as the metadata store, add the following parameters to the `conf/broker.conf` or `conf/standalone.conf` file.

```conf
metadataStoreUrl=zk:my-zk-1:2181,my-zk-2:2181,my-zk-3:2181
configurationMetadataStoreUrl=zk:my-global-zk-1:2181,my-global-zk-2:2181,my-global-zk-3:2181
```

## Use etcd as metadata store

To use etcd as the metadata store, add the following parameters to the `conf/broker.conf` or `conf/standalone.conf` file.

```conf
metadataStoreUrl=etcd:http://my-etcd-1:2379,http://my-etcd-2:2379,http://my-etcd-3:2379
configurationMetadataStoreUrl=etcd:my-global-etcd-1:2379,my-global-etcd-2:2379,my-global-etcd-3:2379
# metadataStoreConfigPath=/path/to/file
```

:::tip

The `metadataStoreConfigPath` parameter is required when you want to use the following advanced configurations.

```
useTls=false
tlsProvider=JDK
tlsTrustCertsFilePath=
tlsKeyFilePath=
tlsCertificateFilePath=
authority=
```

:::

## Use RocksDB as metadata store

To use RocksDB as the metadata store, add the following parameters to the `conf/broker.conf` or `conf/standalone.conf` file.

```conf
metadataStoreUrl=rocksdb://data/metadata
# metadataStoreConfigPath=/path/to/file
```

:::tip

The `metadataStoreConfigPath` parameter is required when you want to use advanced configurations. See [this example](https://github.com/facebook/rocksdb/blob/main/examples/rocksdb_option_file_example.ini) for more information.

:::

## Use local memory as metadata store

To use local memory as the metadata store, add the following parameters to the `conf/broker.conf` or `conf/standalone.conf` file.

```conf
metadataStoreUrl=memory://local
```


## Enable batch operations on metadata store

Pulsar metadata store supports batch operations and caching to meet low latency and high throughput and improve performance.

To enable batch operations on the metadata store, you can configure the following parameters in the `conf/broker.conf` or `conf/standalone.conf` file.

```conf
# Whether we should enable metadata operations batching
metadataStoreBatchingEnabled=true

# Maximum delay to impose on batching grouping
metadataStoreBatchingMaxDelayMillis=5

# Maximum number of operations to include in a singular batch
metadataStoreBatchingMaxOperations=1000

# Maximum size of a batch
metadataStoreBatchingMaxSizeKb=128
```

