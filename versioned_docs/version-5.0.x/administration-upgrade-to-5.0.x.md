---
id: administration-upgrade-to-5.0.x
title: Upgrading to Pulsar 5.0.x
sidebar_label: Upgrading to Pulsar 5.x
description: Prepare a Pulsar 4.x cluster, configuration, applications, and monitoring for Pulsar 5.0.x.
---

Use this checklist for the release-specific changes when upgrading to Pulsar 5.0.x. For software upgrade principles, component order, and rollout procedures, follow the [cluster upgrade guide](administration-upgrade.md). Review the [configuration default changes](administration-upgrade-to-5.0.x-configuration.md), [application and plugin changes](administration-upgrade-to-5.0.x-applications.md), and [metrics additions and removals](administration-upgrade-to-5.0.x-metrics.md) before starting the rollout.

<span id="prepare-persisted-standalone-data" />

For `pulsar standalone`, follow the separate [standalone upgrade guide](administration-upgrade-to-5.0.x-standalone.md) before reusing existing data.

## Plan and validate rollback

Every upgrade should have a rollback strategy. Before moving to a new release line, first upgrade to the latest maintenance release in your current supported line and run it with your own workloads for a sufficient period to establish stability. Include normal traffic, peak load, and the operational events important to your deployment; a successful startup alone is not enough.

Before upgrading from Pulsar 4.x to 5.0.x, establish that baseline on the **latest Pulsar 4.0.x or 4.2.x release**, as appropriate for your cluster. Preserve its binaries or images, configuration, and the data and metadata needed for recovery. If the upgrade exposes problems, this gives you a version already proven with your use case and workloads to return to while you [report the issues to the Apache Pulsar project](https://github.com/apache/pulsar/issues).

A stable baseline does not by itself make a downgrade safe. Rehearse the rollback and follow the [rollback prerequisites and compatibility restrictions](#preserve-and-rehearse-rollback) before starting the upgrade, particularly before enabling new features or changing stored metadata formats.

## Upgrading from Pulsar 4.x to Pulsar 5.0.x {#before-upgrading-to-pulsar-50}

This checklist focuses on upgrades from the 4.x release line. It is not a compatibility matrix for arbitrary starting versions. For an earlier release, review the intervening release upgrade guides and validate a staged path before applying this procedure. Rehearse both the upgrade and rollback from your exact starting version.

Read the [Pulsar 5.0 release highlights](release-highlights.md) alongside this guide. Existing partitioned and non-partitioned topics, subscription types, and the v4 Java client API remain available. Existing v4 applications do not need to change their client dependency or API merely to upgrade brokers. Adopting scalable topics, the v5 Java client API, or Oxia is a separate decision from upgrading the cluster. ZooKeeper remains supported.

Compare your overrides with [Configuration default changes from 4.x to 5.0](administration-upgrade-to-5.0.x-configuration.md). The comparison covers Pulsar 4.0.13 and 4.2.4, including differences between the two upgrade paths. Review [Application, Functions, and plugin upgrades](administration-upgrade-to-5.0.x-applications.md) for changes to your application code, dependencies, and custom extensions.

### Check runtime and packaging requirements

- **Server runtime:** standard Pulsar 5.0 server components, including the Functions runtime, require **Java 21 or later**. Update the runtime on each server before starting the upgraded component. See [application and extension Java requirements](administration-upgrade-to-5.0.x-applications.md#java-requirements) for clients, Function implementations, and plugins.
- **Docker images:** use `apachepulsar/pulsar` in place of the removed `apachepulsar/pulsar-all` image. The standard image uses Java 25 with a trimmed runtime. Test custom agents, plugins, and operational tools that depend on additional JDK modules or tools.
- **Connectors and offloaders:** the standard Docker image includes tiered-storage offloader NARs except the filesystem offloader. Supply the filesystem offloader separately if you use it. IO connector NARs are no longer bundled in the image or core release; install the required NARs separately. Pulsar 4.2.x connectors are compatible with Pulsar 5.0 v4 topics. A separate release from the [Pulsar connectors project](https://github.com/apache/pulsar-connectors) is pending. This compatibility statement does not cover v5 scalable topics. Verify connector startup and restart with your deployment before rolling workers.

### Remove garbage-collector overrides

Use **Java 25 with ZGC** for the upgraded servers. Remove existing `PULSAR_GC` overrides from service environment files, container or Helm configuration, and customized `conf/pulsar_env.sh` files so the new release's launcher defaults take effect. Also remove conflicting garbage collector-selection options from `PULSAR_MEM`, `PULSAR_EXTRA_OPTS` or other injected JVM options. Preserve memory sizing in `PULSAR_MEM` rather than carrying forward an old garbage-collector configuration.

Java 25 uses generational ZGC with `-XX:+UseZGC`; it does not need `-XX:+ZGenerational`. When using Java 21, generational ZGC needs to be explicitly enabled with `-XX:+ZGenerational` in addition to `-XX:+UseZGC`. The standard server launcher supplies the appropriate options for either runtime when `PULSAR_GC` is unset. For a custom launcher, verify that its effective JVM options select the appropriate collector for its Java version.

### Enable Transparent Huge Pages and configure Linux kernel settings

For high-performance deployments on Linux hosts, set `-Xms` equal to `-Xmx` and add `-XX:+UseTransparentHugePages -XX:+AlwaysPreTouch` in `PULSAR_MEM`. Configure Transparent Huge Pages (THP) in the Linux kernel settings on your hosts, including Kubernetes nodes, before relying on it. See [JVM and Linux host tuning](performance-broker.md#jvm-and-linux-host-tuning) for persistent settings, memory budgeting, and startup considerations.

### Check application and plugin compatibility

<span id="choose-java-client-dependencies-separately" />
<span id="align-application-netty-dependencies" />
<span id="check-authentication-tls-and-extensions" />
<span id="check-functions-behavior-and-extensions" />

Review [Application, Functions, and plugin upgrades](administration-upgrade-to-5.0.x-applications.md) for client dependencies, Function implementations, broker extensions, and authentication and TLS plugins. Complete the [authentication and TLS checks](administration-upgrade-to-5.0.x-applications.md#check-authentication-tls-and-extensions) before rolling brokers, including certificate verification, proxy authentication, and custom authorization providers.

### Check metadata and broker configuration

Use the [configuration default comparison](administration-upgrade-to-5.0.x-configuration.md) to review file settings, environment variables, and dynamic overrides.

- **Preserve rollback before the first 5.0 broker starts.** If you need to retain an existing-feature rollback path, set `scalableTopicsEnabled=false` on every target 5.0 broker and keep applications on the v4 client API. If you enable package management for Functions or IO connectors (disabled by default), preserve the Java metadata format as described below. Complete the [rollback preparation](#preserve-and-rehearse-rollback) before rolling any brokers.

- **etcd is no longer a metadata-store backend.** Migrate deployments using `etcd:` metadata URLs to a supported backend before upgrading. The [ZooKeeper-to-Oxia migration procedure](administration-metadata-store-migration.md) introduced in 5.0 does not migrate etcd. Complete the software upgrade separately from an optional ZooKeeper-to-Oxia migration.
- **Existing shadow topics require an explicit opt-in.** Set `enableShadowTopics=true` on every target 5.0 broker before rolling a cluster that uses shadow topics. The new default is `false`, which disables shadow-topic creation, loading, and replication. Changing this setting requires a broker restart.
- **Remove obsolete dispatcher overrides.** The classic persistent Shared and Key_Shared dispatcher implementations have been removed. Remove `subscriptionSharedUseClassicPersistentImplementation` and `subscriptionKeySharedUseClassicPersistentImplementation` from file configuration and dynamic overrides. Test reconnects, redelivery, and per-key ordering with your Shared and Key_Shared workloads if either override was enabled.
- **Review changed defaults against explicit overrides.** The modular load manager changes its default shedding and placement strategies from `ThresholdShedder` / `LeastLongTermMessageRate` to `AvgShedder`. `maxUnloadPercentage` increases from `0.2` to `0.5`, and `loadBalancerDistributeBundlesEvenlyEnabled` changes from `true` to `false`. `dispatcherMaxReadBatchSize` increases from 100 to 500. Check both file and dynamic configuration; explicit old values are preserved. See [Load balancing](administration-load-balance.md).
- **Review dispatch scheduling for expensive entry filters.** `dispatcherDispatchMessagesInSubscriptionThread` changes from `true` to `false`, avoiding an extra subscription-thread handoff. Configurations with compute-heavy server-side broker entry filters may benefit from setting it back to `true`, but this is not a general recommendation: test the change separately with representative workloads. The related `managedLedgerReadEntriesCallbackInline` optimization (default `true`) enables inline read completion. Publish-request handover batching is controlled by `managedLedgerAddEntryHandoverMaxBatchItems` (default 1,024) and `managedLedgerAddEntryHandoverMaxBatchBytesSize` (default 5 MiB). These batching limits can change publishing patterns, but handover batching has greatly improved performance in tests. There should normally be no need to disable inline read completion or handover batching during an upgrade. See [Scheduling and batching tradeoffs](performance-broker.md#scheduling-and-batching-tradeoffs) in the broker performance guide.
- **Namespace creation defaults:** the broker default increases from 4 to 32 bundles. Cluster initialization changes `public/default` from 16 to 32 and `pulsar/system` from 16 to 64. New `defaultNumberOfSystemNamespaceBundles` and `--system-namespace-bundle-number` settings select the system-namespace count. Existing layouts are preserved; see [Namespace bundles](administration-namespace-bundles.md).
- **Load-manager initialization now fails fast.** Check `loadManagerClassName` and custom implementations during the canary. Instantiation or initialization failures no longer silently fall back to `SimpleLoadManagerImpl`.
- **Validate batch reads under representative load.** `managedLedgerBatchReadEnabled` defaults to `true`. Batch reads can greatly improve backlog-draining performance, but they change memory allocation patterns: entries are copied from batch responses into the entry cache using the `ml-cache` allocator. Keep `pulsar.allocator.ml-cache.type` at its default, `adaptive`. Some environments may need to establish stability before enabling batch reads during an existing-cluster upgrade. To defer this change, set `managedLedgerBatchReadEnabled=false` in `conf/broker.conf` on the target brokers before rolling them. Validate memory usage, latency, and throughput with batch reads before enabling them. See [BookKeeper batch reads](performance-broker.md#bookkeeper-batch-reads).
- **Review the allocator change.** The standard server launcher now defaults to `adaptive` for general Pulsar allocations (`pulsar.allocator.default.type`) and Netty buffers (`io.netty.allocator.type`). To restore the previous pooled behavior, add `-Dpulsar.allocator.default.type=pooled -Dio.netty.allocator.type=pooled` to the existing `PULSAR_EXTRA_OPTS` value and restart the brokers. Keep the separate `ml-cache` allocator adaptive for batch-read cache copies; avoid a global `pulsar.allocator.type=pooled` override, which also changes the cache allocator. See [Cache retention and allocation](performance-broker.md#cache-retention-and-allocation).
- **Storage reads and acknowledgment persistence:** when `managedLedgerMaxReadsInFlightSizeInMB` is unset, the broker now limits in-flight storage/cache reads to the greater of `dispatcherMaxReadSizeBytes` and 15% of JVM direct memory. An explicit old value of `0` still disables the limit. The defaults for `managedLedgerMaxUnackedRangesToPersist`, `managedLedgerMaxBatchDeletedIndexToPersist`, and `managedLedgerMaxUnackedRangesToPersistInMetadataStore` are now 200,000, and ledger/cursor metadata compression defaults to `LZ4`. These settings affect backpressure and acknowledgment-state recovery. Monitor direct memory, backlog-draining latency, metadata size, and acknowledgment truncation warnings during the canary, especially if you retain older explicit limits.
- **Topic-policy initialization:** `topicPoliciesCacheInitTimeoutSeconds` defaults to 60 seconds. A stuck namespace policy reader is closed and its initialization can be retried, rather than indefinitely blocking topic loading. Test recovery of namespaces with large `__change_events` backlogs and tune the timeout if replay needs longer in your environment.
- **HTTP executor queues are bounded.** Broker, proxy, and WebSocket HTTP executor queues now enforce `httpServerThreadPoolQueueSize` (default 8192), rather than growing beyond that initial capacity. Rehearse bursts of admin and HTTP traffic and check queue saturation before the rollout.
- **Remove obsolete storage and allocator overrides.** `managedLedgerUnackedRangesOpenCacheSetEnabled` has been removed; individual acknowledgments always use bitmap tracking, while `managedLedgerPersistIndividualAckAsLongArray` still selects the persisted format. Replace the unsupported JVM property `pulsar.allocator.leak_detection` with Netty's `io.netty.leakDetection.level`.
- **Review heap sizing:** bucket-based delayed-delivery queues and transaction timeout queues now use heap arrays instead of direct buffers. Compare heap occupancy and GC pauses during the canary; this change does not affect the default in-memory delayed tracker's bitmap index. See [Broker memory](performance-broker.md).
- **Bookie metrics provider:** replace `org.apache.pulsar.metrics.prometheus.bookkeeper.PrometheusMetricsProvider` with `org.apache.bookkeeper.stats.prometheus.PrometheusMetricsProvider` in `statsProviderClass`. The Pulsar-specific class has been removed. Keep configuration appropriate to each binary during mixed-version rollout; see [BookKeeper configuration](administration-zk-bk.md#pulsar-specific-configuration).
- **Package-management service for Functions and IO connectors:** package management is disabled by default (`enablePackagesManagement=false`). If you enable it and need rollback to 4.0.x or 4.2.x, set `packagesManagementJsonSerializationEnabled=false` on every target broker before upgrading, and keep `packagesManagementAllowLegacyJavaSerialization=true` (the default). See [rollback preparation](#preserve-and-rehearse-rollback).

### Preserve and rehearse rollback

Rollback is intended for workloads that retain the pre-upgrade feature set and formats readable by the previous version. For a 4.0.x deployment, this means preserving the existing 4.0.x feature set; using that feature set alone is not sufficient if package or shared metadata has been rewritten incompatibly. Use the exact pre-upgrade release as the rollback target, rather than assuming that any 4.x version is interchangeable. Keep the previous binaries or images, configuration, connector NARs, and deployment manifests, and rehearse the rollback with representative data and clients before the rollout. A broker image rollback does not undo changes to shared metadata, topic types, or other cluster components.

To preserve this rollback path, disable scalable-topic services in the configuration of **every target 5.0 broker before the first one starts**:

```properties
scalableTopicsEnabled=false
```

Changing this setting requires a broker restart. It disables scalable-topic services, scalable-topic admin APIs and client access, and segment loading. The v5 API also requires these services for regular topics, so continue using the v4 API while this setting is disabled. This applies even if the application uses the combined `pulsar-client-v5-all` or `pulsar-client-v5-shaded` dependency; v4 API usage does not require scalable-topic services. Existing scalable-topic data is retained but inaccessible while the feature is disabled. Enable it in a separate, planned rollout when you are ready to adopt scalable topics or the v5 API. Converting an existing regular topic to a scalable topic is one-way: an older broker cannot serve the converted topic. Stop scalable-topic workloads before a downgrade and preserve their data and metadata for a later compatible upgrade. See [Scalable topics](concepts-scalable-topics.md) and [Topic migration](admin-api-scalable-topics.md#migrate-a-regular-topic).

Package management is **disabled by default** (`enablePackagesManagement=false`). If you enable it to store Pulsar Functions or IO connector packages (`function://`, `source://`, or `sink://` URLs), preserve the Java metadata format while rollback to 4.0.x or 4.2.x is required. Configure every target broker before the first upgraded broker starts:

```properties
packagesManagementJsonSerializationEnabled=false
packagesManagementAllowLegacyJavaSerialization=true
```

For **Pulsar Helm chart deployments**, use the `PULSAR_PREFIX_` prefix in `broker.configData`. These settings are not listed in the default `broker.conf`, so the prefix is required for the configuration helper to add them:

```yaml
broker:
  configData:
    PULSAR_PREFIX_packagesManagementJsonSerializationEnabled: "false"
    PULSAR_PREFIX_packagesManagementAllowLegacyJavaSerialization: "true"
```

For deployments that manage `broker.conf` directly, add the properties shown above to the file. See [Helm component configuration](helm-deploy.md#component-configuration).

This keeps package metadata readable by the previous release. The default `packagesManagementJsonSerializationEnabled=true` writes JSON, which the 4.x package-management service cannot read. Keep Java writes throughout mixed-version operation and the rollback window. These are startup settings; changing them requires a broker restart.

Changing the write-format flag does not convert existing records. If JSON metadata has already been written, restore or convert those records to the Java format before a downgrade, and verify that the rollback release can inspect and download all required package versions. Once the rollback window closes, you can enable JSON writes and migrate retained metadata as described in [Functions and IO package metadata and upgrades](admin-api-packages.md#metadata-format-and-upgrades).

Keep the topic-policies backend unchanged during the software upgrade. The default remains `org.apache.pulsar.broker.service.SystemTopicBasedTopicPoliciesService`. If you later opt into `MetadataStoreTopicPoliciesService`, 5.0 retains system-topic policies for namespaces with an existing `__change_events` topic and uses the configured backend for other namespaces. Older brokers do not perform this per-namespace routing. A downgrade with both backends in use needs a plan to consolidate or migrate policy data; changing the broker setting alone does not copy policies between them. See [PIP-469](https://github.com/apache/pulsar/blob/master/pip/pip-469.md).

Treat changes to the metadata-store backend, load-manager type, and topic-policies backend as separate migrations with their own compatibility and rollback checks. After a canary downgrade, verify policy enforcement, authentication, geo-replication, publish/consume traffic, and subscription recovery before reverting the remaining brokers.
