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
* [RocksDB](http://rocksdb.org/)
* Local memory

For new production clusters, [Oxia](https://github.com/oxia-db/oxia) is the recommended metadata store. ZooKeeper remains fully supported, and existing ZooKeeper-based clusters can use the [ZooKeeper-to-Oxia migration procedure](administration-metadata-store-migration.md). Review its prerequisites and operational limitations before scheduling a migration.

URLs beginning with `etcd:` are unsupported. The [live migration procedure](administration-metadata-store-migration.md) covers ZooKeeper sources; see the [upgrade guide](administration-upgrade.md) for deployments using an unsupported backend.

:::note

RocksDB and local memory are only applicable to standalone Pulsar or single-node Pulsar clusters.

:::

## Custom metadata-store implementations

Custom Java metadata-store implementations must implement the operation overloads that accept `Set<Option>`. Existing convenience methods without options delegate to those overloads with an empty set. Implementations extending `AbstractMetadataStore` must implement backend hooks that accept these options. Custom `MetadataCache<T>` implementations must implement `put(String path, T value, Set<Option> opts)`. The legacy `CreateOption` overloads remain adapters; they do not remove the need to implement the new methods.

Options include ephemeral and sequential creation, secondary indexes, and a partition key for sharded stores. Options unrelated to an operation are ignored, and backends without native secondary indexes ignore secondary-index write hints. Keep the same partition key when accessing an Oxia record; unsharded backends ignore that routing hint. See the [metadata API](https://github.com/apache/pulsar/tree/master/pulsar-metadata/src/main/java/org/apache/pulsar/metadata/api) for the options each operation supports.

The cached `exists` and `getChildren` methods in `AbstractMetadataStore` do not forward the supplied partition key to their cache loaders. For Oxia records written with a partition key, check existence with `get(path, opts)` and list with `getChildrenFromStore(path, opts)` or `scanChildren(path, consumer, opts)`. The built-in typed metadata cache also loads records without routing options; use direct store reads for these records.

The streaming `scanChildren` API returns direct children with values and metadata, without recursively scanning descendants. `AbstractMetadataStore` supplies a list-and-read fallback, while Oxia uses a native range scan. RocksDB and local memory snapshot the matching records before invoking callbacks, so the API does not guarantee bounded memory use across backends. `ScanConsumer.onNext` receives each record, followed by `onCompleted` or `onError`; the returned future tracks completion. Keep callbacks safe for metadata-store threads and avoid long blocking work that stalls the scan.

Sequence-key writes use `Option.SequenceKeysDeltas`: supply a nonempty list whose first delta is positive and remaining deltas are nonnegative. Use `Optional.empty()` or `Optional.of(-1L)` for the expected version, and do not combine this option with legacy sequential creation. The returned `Stat.getPath()` contains the generated key, with each sequence dimension encoded as a zero-padded 20-digit decimal suffix. Oxia requires a partition key for these writes; reuse it for reads and `subscribeSequence`. Other built-in backends allocate keys through a separate counter record and compare-and-set updates. Sequence values need not be contiguous.

`subscribeSequence` reports the latest sequence key and can coalesce updates, so it is not an event stream containing every created record. Close the returned subscription handle when it is no longer needed.

Avoid custom record names ending in `__seq_counter__`. The fallback sequence implementation reserves that suffix for counter records, and scans on ZooKeeper, RocksDB, and local memory filter matching names from their results.

## Use Oxia as metadata store

[Oxia](https://github.com/oxia-db/oxia) is the recommended metadata store for new Pulsar clusters. Deploy an Oxia cluster (or use an existing one); see the [Oxia documentation](https://oxia-db.github.io/) for deployment instructions.

Oxia organizes data into [namespaces](https://oxia-db.github.io/docs/features/namespaces). The namespaces you reference must already exist — they are defined in the Oxia coordinator configuration, not created on demand. Use **separate namespaces** for the Pulsar metadata store and for BookKeeper. To stay consistent with the [Pulsar Helm chart](https://github.com/apache/pulsar-helm-chart), this guide uses `broker` for Pulsar and `bookkeeper` for BookKeeper.

To use Oxia as the metadata store, add the following to `conf/broker.conf` (or `conf/standalone.conf`). `configurationMetadataStoreUrl` is optional and defaults to `metadataStoreUrl`, so a single cluster only needs:

```conf
metadataStoreUrl=oxia://oxia-1.example.com:6648/broker
```

The URL format is `oxia://<host>:<port>/<namespace>`. If the namespace is omitted, the provider uses Oxia's `default` namespace. An explicit namespace makes the intended scope clear.

BookKeeper connects through a different format: the `metadata-store:` prefix is required, and it should use its own namespace. Set `bookkeeperMetadataServiceUri` in `conf/broker.conf` to match the `metadataServiceUri` configured for the bookies in `conf/bookkeeper.conf`:

```conf
bookkeeperMetadataServiceUri=metadata-store:oxia://oxia-1.example.com:6648/bookkeeper
```

For BookKeeper connections created through the `metadata-store:` driver, the driver accepts metadata-store configuration parameters in the URI query string. For example:

```conf
bookkeeperMetadataServiceUri=metadata-store:oxia://oxia-1.example.com:6648/bookkeeper?batchingMaxDelayMillis=10&batchingMaxSizeKb=256&numSerDesThreads=4
```

See [Tune the metadata-store driver](bookkeeper-metadata-serviceuri.md#tune-the-metadata-store-driver) for supported parameters and validation. This query parsing belongs to the BookKeeper driver. Configure broker metadata batching, timeouts, and serialization threads through broker settings such as `metadataStoreBatchingMaxDelayMillis`, `metadataStoreSessionTimeoutMillis`, and `metadataStoreSerDesThreads`; do not append these BookKeeper query parameters to `metadataStoreUrl` or `configurationMetadataStoreUrl`.

To live-migrate an existing cluster from ZooKeeper to Oxia, see [Migrate metadata store](administration-metadata-store-migration.md).

## Use ZooKeeper as metadata store

ZooKeeper is fully supported and ships with the Pulsar binary package. The Pulsar metadata store can be deployed on a separate ZooKeeper cluster or deployed on an existing ZooKeeper cluster.

To use ZooKeeper as the metadata store, add the following parameters to the `conf/broker.conf` or `conf/standalone.conf` file.

```conf
metadataStoreUrl=zk:my-zk-1:2181,my-zk-2:2181,my-zk-3:2181
configurationMetadataStoreUrl=zk:my-global-zk-1:2181,my-global-zk-2:2181,my-global-zk-3:2181
```

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

For ZooKeeper, configure the following batching parameters in `conf/broker.conf` or `conf/standalone.conf`:

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

Oxia uses its client library's batching instead of the ZooKeeper batching implementation. Pulsar passes `metadataStoreBatchingMaxOperations` as the Oxia client's maximum requests per batch, but does not apply `metadataStoreBatchingEnabled`, `metadataStoreBatchingMaxDelayMillis`, or `metadataStoreBatchingMaxSizeKb` to that client. Setting the batching-enabled flag to `false` therefore does not disable Oxia client batching. An Oxia client configuration file loaded through `metadataStoreConfigPath` can override the client settings supplied by Pulsar.

## Store topic policies in the metadata store

`MetadataStoreTopicPoliciesService` is available as an alternative to the default system-topic policy backend. To select it, set the following consistently on the brokers and perform a rolling restart:

```conf
topicLevelPoliciesEnabled=true
topicPoliciesServiceClassName=org.apache.pulsar.broker.service.MetadataStoreTopicPoliciesService
```

With system topics enabled, routing is decided per namespace:

| Namespace state | Topic-policy backend |
|---|---|
| A topic-policy `__change_events` system topic already exists | `SystemTopicBasedTopicPoliciesService`, including when that topic is empty |
| No topic-policy `__change_events` system topic exists | The configured service, such as `MetadataStoreTopicPoliciesService` |

This preserves existing policies during adoption of a different backend. Changing the class does not copy policy data between backends, and deleting `__change_events` is not a migration procedure. When `systemTopicEnabled=false`, legacy-aware routing is bypassed and the configured alternate service is used directly. Keep system topics enabled while namespaces still rely on their existing policy data.

The metadata-store backend writes local policies under `/admin/topic-policies/local` in the local metadata store and global policies under `/admin/topic-policies/global` in the configuration metadata store. Normal topic-policy admin APIs continue to apply; there is no per-namespace backend switch command.

Older brokers do not perform this per-namespace routing. Before a rollback to a version that does not support it, reconcile any policy data stored in different backends. Restoring the default class alone does not move metadata-store policy records into system topics. See [Upgrade and rollback guidance](administration-upgrade-to-5.0.x.md#preserve-and-rehearse-rollback).
