---
id: administration-upgrade-to-5.0.x-configuration
title: Configuration default changes from Pulsar 4.x to 5.0.x
sidebar_label: Configuration default changes
description: Compare Pulsar 4.0.x and 4.2.x configuration defaults with Pulsar 5.0.0 before upgrading.
---

```mdx-code-block
import styles from '@site/src/css/upgrade-tables.module.css';
```

This page compares Pulsar **4.0.x** and **4.2.x** with **5.0.0**. It covers changed Pulsar configuration defaults, new settings that affect existing workloads, and removed settings. It compares both the shipped configuration files and the configuration classes used when a setting is omitted. New feature-specific settings are linked to their administration guides rather than reproduced in full here. It does not inventory every transitive library's internal defaults.

Use this comparison with the [Pulsar 5.0.x upgrade checklist](administration-upgrade-to-5.0.x.md#before-upgrading-to-pulsar-50). Before upgrading, establish a stable baseline on the latest maintenance release of your 4.0.x or 4.2.x line and [prepare and rehearse rollback](administration-upgrade-to-5.0.x.md#preserve-and-rehearse-rollback).

:::important Review explicit overrides

New defaults do not replace explicit values in your configuration files, environment variables, Helm values, or dynamic broker configuration. Carrying an old configuration file forward can preserve old behavior. Removed settings are an exception: keeping them does not restore removed implementations. Review each override instead of copying either the old or new configuration wholesale.

`Not available` below means that the release did not expose that setting; it does not mean that the new default was previously `false`.

:::

## Broker defaults changed from both 4.x lines

Unless a row says otherwise, the 4.0.x and 4.2.x defaults are identical. These settings are in `broker.conf`; embedded brokers use the same configuration class, with overrides from `standalone.conf`.

### Load balancing and namespace creation

<div className={styles.upgradeTable}>

| Setting | 4.0.1x / 4.2.x | 5.0.0 | Upgrade consideration |
|---|---|---|---|
| `loadBalancerLoadSheddingStrategy` | `ThresholdShedder` | `AvgShedder` | Moves load between heavily and lightly loaded brokers after sustained imbalance. |
| `loadBalancerLoadPlacementStrategy` | `LeastLongTermMessageRate` | `AvgShedder` | Uses the destinations planned by AvgShedder during shedding. |
| `loadBalancerDistributeBundlesEvenlyEnabled` | `true` | `false` | The optional bundle-count balancing constraint is disabled by default. |
| `maxUnloadPercentage` | `0.2` | `0.5` | AvgShedder moves half of the load difference between a broker pair per cycle. |
| `defaultNumberOfNamespaceBundles` | `4` | `32` | Affects newly created namespaces, not the bundle layout of existing namespaces. |

</div>

Strategy class names above are abbreviated; their package is `org.apache.pulsar.broker.loadbalance.impl`. The modular load manager remains the default. See [Load balancing](administration-load-balance.md) and [controlled rolling upgrades](administration-rolling-upgrade.md).

The new `defaultNumberOfSystemNamespaceBundles` defaults to **64**. Cluster initialization also changes the initial `public/default` namespace from **16 to 32** bundles and `pulsar/system` from **16 to 64**. Existing namespaces are not repartitioned by upgrading.

### Reads, dispatch, and acknowledgment metadata

<div className={styles.upgradeTable}>

| Setting | 4.0.1x / 4.2.x | 5.0.0 | Upgrade consideration |
|---|---|---|---|
| `bookkeeperClientSeparatedIoThreadsEnabled` | `false` | `true` | BookKeeper client I/O uses separate threads. |
| `dispatcherDispatchMessagesInSubscriptionThread` | `true` | `false` | Avoids a subscription-thread handoff. Test separately if compute-heavy broker entry filters benefit from the old value. |
| `dispatcherMaxReadBatchSize` | `100` | `500` entries | Raises the maximum entries per dispatcher read; the byte-size limit still applies. |
| `keySharedLookAheadMsgInReplayThresholdPerConsumer` | `2,000` | `4,000` messages | Raises the per-consumer replay look-ahead threshold. |
| `keySharedLookAheadMsgInReplayThresholdPerSubscription` | `20,000` | `40,000` messages | Raises the per-subscription replay look-ahead threshold. |
| `managedLedgerMaxReadsInFlightSizeInMB` | `0` (disabled) | Automatic | The default is the greater of 15% of JVM direct memory and `dispatcherMaxReadSizeBytes` (5 MiB), expressed in MB. An explicit old `0` still disables the limit. |
| `managedLedgerMaxUnackedRangesToPersist` | `10,000` | `200,000` | Allows more individual acknowledgment ranges in persisted cursor state. |
| `managedLedgerMaxBatchDeletedIndexToPersist` | `10,000` | `200,000` | Allows more persisted batch-index acknowledgment state. |
| `managedLedgerMaxUnackedRangesToPersistInMetadataStore` | `1,000` | `200,000` | Raises the acknowledgment-state limit when persisted in the metadata store. |
| `managedLedgerInfoCompressionType` | `NONE` | `LZ4` | Compresses managed-ledger metadata. |
| `managedCursorInfoCompressionType` | `NONE` | `LZ4` | Compresses managed-cursor metadata. |

</div>

See [Broker performance and memory tuning](performance-broker.md) for memory budgeting, read backpressure, and scheduling tradeoffs.

### New settings that change the default execution path

These settings were not available in either comparison baseline.

<div className={styles.upgradeTable}>

| Setting | 5.0.0 default | Upgrade consideration |
|---|---|---|
| `managedLedgerBatchReadEnabled` | `true` | Fetches multiple stored entries in a BookKeeper request when supported. Cache copies use the adaptive `ml-cache` allocator. If your environment needs a separate stability evaluation, defer batch reads with `false`. |
| `managedLedgerReadEntriesCallbackInline` | `true` | Allows successful ordinary multi-entry reads to complete inline. Normally, there is no need to disable it. |
| `managedLedgerAddEntryHandoverMaxBatchItems` | `1,024` | Batches publish-request handovers to reduce executor contention. |
| `managedLedgerAddEntryHandoverMaxBatchBytesSize` | `5,242,880` bytes (5 MiB) | Bounds the bytes processed per handover batch. These limits can change publishing patterns, but batching has greatly improved performance in tests. |
| `replicationMaxReadProcessingStepsPerTurn` | `64` | Bounds replication read-processing work before yielding. |
| `topicPoliciesCacheInitTimeoutSeconds` | `60` seconds | Bounds topic-policy cache initialization instead of allowing indefinite waits. |
| `enableShadowTopics` | `false` | Existing shadow-topic deployments must explicitly enable support before upgrading. |
| `packagesManagementJsonSerializationEnabled` | `true` | Functions and IO package-management metadata is now written as JSON. |
| `packagesManagementAllowLegacyJavaSerialization` | `true` | Allows reading package metadata written using the previous Java-based serialization format. |
| `httpMaxResponseHeaderSize` | `8,192` bytes | Explicit HTTP response-header size limit; also available for proxies. |

</div>

Package management remains disabled by default (`enablePackagesManagement=false`). If you enable it and require rollback to 4.x, set `packagesManagementJsonSerializationEnabled=false` before upgrading and keep `packagesManagementAllowLegacyJavaSerialization=true`. Follow [package-management rollback preparation](administration-upgrade-to-5.0.x.md#preserve-and-rehearse-rollback).

## Security, listeners, and service configuration

<div className={styles.upgradeTable}>

| Component and setting | 4.0.1x / 4.2.x | 5.0.0 | Upgrade consideration |
|---|---|---|---|
| Broker `authenticateOriginalAuthData` | `false` | `true` | Authenticates the original credentials forwarded by a proxy. |
| Proxy `forwardAuthorizationCredentials` | `false` | `true` | Forwards the original client's authentication data to brokers. |
| Broker, proxy, and WebSocket `tlsHostnameVerificationEnabled` | `false` | `true` | Outbound TLS connections verify certificate hostnames. |
| Functions worker and `client.conf` `tlsEnableHostnameVerification` | `false` | `true` | Verify names for outbound worker and CLI connections. |
| Java client `tlsHostnameVerificationEnable` | `false` | `true` | Applies when upgrading the Java client; a broker upgrade alone does not change existing client applications. |
| Broker `internalListenerName` | Unset | `internal` | Names the internal listener, whose endpoints are derived from the service ports and advertised address. Review explicit listener configurations. |
| Broker/proxy `webServiceTlsProvider`; WebSocket/worker shipped `tlsProvider` | `Conscrypt` | Unset | No longer forces the Conscrypt provider; review explicit provider selection and the new TLS factory API. |
| Bookie `statsProviderClass` | `org.apache.pulsar.`<br />`metrics.prometheus.`<br />`bookkeeper.`<br />`PrometheusMetricsProvider`<br />(single value) | `org.apache.bookkeeper.`<br />`stats.prometheus.`<br />`PrometheusMetricsProvider`<br />(single value) | Replace the old provider class in existing bookie configuration. Join the displayed parts without spaces or line breaks. |

</div>

The new `tlsFactoryClassName` / `tlsFactoryConfig` and outbound `brokerClientTlsFactoryClassName` / `brokerClientTlsFactoryConfig` settings default to empty values, selecting the built-in factory without custom parameters. Optional `jcaProvider` / `jsseProvider` and outbound provider overrides are unset by default. See [TLS transport](security-tls-transport.md), [multiple advertised listeners](concepts-multiple-advertised-listeners.md), and the [TLS upgrade checklist](administration-upgrade-to-5.0.x-applications.md#check-authentication-tls-and-extensions).

## Differences between the 4.0.x and 4.2.x upgrade paths

The following changes are additional considerations when starting from **4.0.x**. They are already present in **4.2.x**, except for the recent-access cache TTL setting, whose default changes again in 5.0.0.

<div className={styles.comparisonTable}>

| Setting | 4.0.x | 4.2.x | 5.0.0 |
|---|---|---|---|
| `acknowledgmentAtBatchIndexLevelEnabled` | `false` | `true` | `true` |
| `managedLedgerPersistIndividualAckAsLongArray` | `false` | `true` | `true` |
| `cacheEvictionByExpectedReadCount` | Not available | `true` | `true` |
| `managedLedgerCacheEvictionExtendTTLOfRecentlyAccessed` | Not available | `true` | `false` |
| `managedLedgerCacheEvictionExtendTTLOfEntriesWithRemainingExpectedReadsMaxTimes` | Not available | `5` | `5` |
| `managedLedgerContinueCachingAddedEntriesAfterLastActiveCursorLeavesMillis` | Not available | Twice `managedLedgerCacheEvictionTimeThresholdMillis` (2,000 ms by default) | Same as 4.2.x |
| `managedLedgerDeleteMaxConcurrentRequests` | Not available | `1,000` | `1,000` |
| `enableBrokerTopicListWatcher` | Not available | `true` | `true` |
| `schemaRegistryCompatibilityCheckers` | JSON, Avro, Protobuf Native | Also includes `ExternalSchemaCompatibilityCheck` | Same as 4.2.x |
| `schemaJsonAllowLegacyJacksonFormat` | Not available | `false` | `false` |
| Broker/proxy `authenticationRoleLoggingAnonymizer` | Not available | `NONE` | `NONE` |
| `exposeCustomTopicMetricLabelsEnabled` | Not available | `false` | `false` |
| `allowedTopicPropertyKeysForMetrics` | Not available | Empty set | Empty set |
| `loadBalancerOverrideBrokerNics` | Not available | Empty list | Empty list |
| `pulsarResourcesExtendedClassName` | Not available | `org.apache.pulsar.broker.DefaultPulsarResourcesExtended` | Same as 4.2.x |
| Proxy `proxyHttpResponseHeadersJson` | Not available | Unset | Unset |
| WebSocket `metadataStoreAllowReadOnlyOperations` | Not available | `false` | `false` |
| Java client `serviceUrlQuarantineInitDurationMs` | Not available | `60,000` ms | `60,000` ms |
| Java client `serviceUrlQuarantineMaxDurationMs` | Not available | `86,400,000` ms (1 day) | Same as 4.2.x |
| Java client `tracingEnabled` | Not available | `false` | `false` |

</div>

Batch-index acknowledgment allows individual messages within a batch to be acknowledged. Long-array persistence changes the stored representation of individual acknowledgments. Check your explicit old values and rollback compatibility rather than assuming the 4.2.x path has the same changes as the 4.0.x path.

Expected-read-count cache eviction takes precedence over `cacheEvictionByMarkDeletedPosition` (whose default remains `false`). In 5.0.0, merely reading an entry no longer extends its TTL by default; expected-read-count retention can still extend it. See [Cache retention and allocation](performance-broker.md#cache-retention-and-allocation).

## JVM and allocator defaults

The standard launcher selects **adaptive** allocation for general Pulsar buffers (`pulsar.allocator.default.type`) and Netty buffers (`io.netty.allocator.type`), replacing pooled allocation. Managed-ledger cache copies use a separate **adaptive** `ml-cache` allocator; keep it adaptive, particularly when using batch reads.

To restore pooled allocation for general Pulsar and Netty buffers, use the named startup overrides described in [the upgrade guide](administration-upgrade-to-5.0.x.md#check-metadata-and-broker-configuration). Avoid applying a global allocator override to cache copies.

Pulsar 4.0.x's `pulsar_env.sh` also supplied `-Dpulsar.allocator.exit_on_oom=true -Dio.netty.recycler.maxCapacityPerThread=4096` when `PULSAR_EXTRA_OPTS` was unset. That injected default is absent in both 4.2.x and 5.0.0. The 5.0 allocator's `exit_on_oom` default is `false`; review any inherited launcher overrides.

The default `PULSAR_MEM` remains `-Xms2g -Xmx2g -XX:MaxDirectMemorySize=4g`. The compared releases already select ZGC in the standard launcher; do not mistake an inherited G1 override for their default. Use Java 25 for 5.0 servers and follow [Remove garbage-collector overrides](administration-upgrade-to-5.0.x.md#remove-garbage-collector-overrides).

## New features and removed settings

- **Scalable topics**
  - `scalableTopicsEnabled=true` enables the new services, and `scalableTopicAutoScaleEnabled=true` enables automatic scaling of scalable topics. These settings do not convert existing topics.
  - For existing-cluster rollback preparation, set `scalableTopicsEnabled=false` before the first upgraded broker starts.
  - See the [scalable-topic default settings](admin-api-scalable-topics.md#broker-defaults-brokerconf).
- **Transactions**
  - `transactionCoordinatorEnabled` remains `false`. When transactions are enabled, `transactionCoordinatorScalableTopicsEnabled=true` adds the scalable-topic coordinator.
  - `transactionBufferProviderClassName` changes from `TopicTransactionBufferProvider` to `DispatchingTransactionBufferProvider`.
  - `transactionPendingAckStoreProviderClassName` changes from `MLPendingAckStoreProvider` to `DispatchingTransactionPendingAckStoreProvider`.
  - The new providers select implementations by topic type. See [scalable-topic transaction settings](txn-use.md#transactions-on-scalable-topics).
- **Opt-in operations**
  - New `brokerCloseInactiveTopicsEnabled`, `exposeSubscriptionBacklogAgeInPrometheus`, and `loadManagerMigrationEnabled` all default to `false`.
  - New Java client `socks5ProxyScope` defaults to `BINARY_ONLY`, preserving binary-connection proxying unless configured otherwise.
- **Classic dispatchers**
  - Remove `subscriptionSharedUseClassicPersistentImplementation` and `subscriptionKeySharedUseClassicPersistentImplementation`.
  - Both previously defaulted to `false`; their implementations have been removed.
- **Acknowledgment storage**
  - Remove `managedLedgerUnackedRangesOpenCacheSetEnabled` (previously `true`). Bitmap tracking is now always used.
  - This is separate from the persisted-format setting.
- **TLS factories**
  - Replace `sslFactoryPlugin` / `sslFactoryPluginParams` and outbound broker-client equivalents with the TLS factory settings.
  - Review [plugin compatibility](administration-upgrade-to-5.0.x-applications.md#check-authentication-tls-and-extensions) before upgrading.
- **Configuration-file cleanup**
  - The obsolete `disableBrokerInterceptors` and `bookkeeperClientMinAvailableBookiesInIsolationGroups` entries are removed from the shipped broker files.
  - The blank `proxyProtocol` entry is removed from `client.conf`.
  - These template changes are not switches to new default values.
