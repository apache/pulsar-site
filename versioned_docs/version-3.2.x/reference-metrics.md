---
id: reference-metrics
title: Pulsar metrics
sidebar_label: "Metrics"
---



Pulsar exposes the following metrics in Prometheus format. You can monitor your clusters with those metrics.

- [](./reference-metrics.md)
  - [Pulsar Functions](#pulsar-functions)
  - [Connectors](#connectors)
  - [Proxy](#proxy)
  - [Pulsar transaction](#pulsar-transaction)

The following types of metrics are available:

- [Counter](https://prometheus.io/docs/concepts/metric_types/#counter): a cumulative metric that represents a single monotonically increasing counter. The value increases by default. You can reset the value to zero or restart your cluster.
- [Gauge](https://prometheus.io/docs/concepts/metric_types/#gauge): a metric that represents a single numerical value that can arbitrarily go up and down.
- [Histogram](https://prometheus.io/docs/concepts/metric_types/#histogram): a histogram samples observations (usually things like request durations or response sizes) and counts them in configurable buckets. The `_bucket` suffix is the number of observations within a histogram bucket, configured with parameter `{le="<upper inclusive bound>"}`. The `_count` suffix is the number of observations, shown as a time series and behaves like a counter. The `_sum` suffix is the sum of observed values, also shown as a time series and behaves like a counter. These suffixes are together denoted by `_*` in this doc.
- [Summary](https://prometheus.io/docs/concepts/metric_types/#summary): similar to a histogram, a summary samples observations (usually things like request durations and response sizes). While it also provides a total count of observations and a sum of all observed values, it calculates configurable quantiles over a sliding time window.

## ZooKeeper

The ZooKeeper metrics are exposed under "/metrics" at port `8000`. You can use a different port by configuring the `metricsProvider.httpPort` in `conf/zookeeper.conf`.

ZooKeeper provides a New Metrics System since 3.6.0. For more detailed metrics, refer to the [ZooKeeper Monitor Guide](https://zookeeper.apache.org/doc/r3.7.0/zookeeperMonitor.html).

## BookKeeper

The BookKeeper metrics are exposed under "/metrics" at port `8000`. You can change the port by updating `prometheusStatsHttpPort`
in the `bookkeeper.conf` configuration file.

### Server metrics

| Name | Type | Description |
|---|---|---|
| bookie_SERVER_STATUS | Gauge | The server status for bookie server. <br /><ul><li>1: the bookie is running in writable mode.</li><li>0: the bookie is running in read-only mode.</li></ul> |
| bookkeeper_server_ADD_ENTRY_count | Counter | The total number of ADD_ENTRY requests received at the bookie. The `success` label is used to distinguish between successes and failures. |
| bookkeeper_server_READ_ENTRY_count | Counter | The total number of READ_ENTRY requests received at the bookie. The `success` label is used to distinguish between successes and failures. |
| bookie_WRITE_BYTES | Counter | The total number of bytes written to the bookie. |
| bookie_READ_BYTES | Counter | The total number of bytes read from the bookie. |
| bookkeeper_server_ADD_ENTRY_REQUEST | Summary | The summary of request latency of ADD_ENTRY requests at the bookie. The `success` label is used to distinguish between successes and failures. |
| bookkeeper_server_READ_ENTRY_REQUEST | Summary | The summary of request latency of READ_ENTRY requests at the bookie. The `success` label is used to distinguish between successes and failures. |
| bookkeeper_server_BookieReadThreadPool_queue_\{thread_id\}|Gauge|The number of requests to be processed in a read thread queue.|
| bookkeeper_server_BookieReadThreadPool_task_queued|Summary | The waiting time of a task to be processed in a read thread queue. |
| bookkeeper_server_BookieReadThreadPool_task_execution|Summary | The execution time of a task in a read thread queue.|

### Journal metrics

| Name | Type | Description |
|---|---|---|
| bookie_journal_JOURNAL_SYNC_count | Counter | The total number of journal fsync operations happening at the bookie. The `success` label is used to distinguish between successes and failures. |
| bookie_journal_JOURNAL_QUEUE_SIZE | Gauge | The total number of requests pending in the journal queue. |
| bookie_journal_JOURNAL_FORCE_WRITE_QUEUE_SIZE | Gauge | The total number of force write (fsync) requests pending in the force-write queue. |
| bookie_journal_JOURNAL_CB_QUEUE_SIZE | Gauge | The total number of callbacks pending in the callback queue. |
| bookie_journal_JOURNAL_ADD_ENTRY | Summary | The summary of request latency of adding entries to the journal. |
| bookie_journal_JOURNAL_SYNC | Summary | The summary of fsync latency of syncing data to the journal disk. |
| bookie_journal_JOURNAL_CREATION_LATENCY| Summary | The latency created by a journal log file. |

### Storage metrics

| Name | Type | Description |
|---|---|---|
| bookie_ledgers_count | Gauge | The total number of ledgers stored in the bookie. |
| bookie_entries_count | Gauge | The total number of entries stored in the bookie. |
| bookie_write_cache_size | Gauge | The bookie write cache size (in bytes). |
| bookie_read_cache_size | Gauge | The bookie read cache size (in bytes). |
| bookie_DELETED_LEDGER_COUNT | Counter | The total number of ledgers deleted since the bookie has started. |
| bookie_ledger_writable_dirs | Gauge | The number of writable directories in the bookie. |
| bookie_flush | Gauge| The table flush latency of bookie memory. |
| bookie_throttled_write_requests | Counter | The number of write requests to be throttled. |

### Replication metrics

| Name | Type | Description |
|---|---|---|
| auditor_NUM_UNDER_REPLICATED_LEDGERS | Summary | The distribution of num under_replicated ledgers on each auditor run. |
| auditor_UNDER_REPLICATED_LEDGERS_TOTAL_SIZE | Summary | The distribution of under_replicated ledgers total size on each auditor run. |
| auditor_URL_PUBLISH_TIME_FOR_LOST_BOOKIE | Summary | The latency distribution of publishing under replicated ledgers for lost bookies. |
| auditor_BOOKIE_TO_LEDGERS_MAP_CREATION_TIME | Summary | The latency distribution of creating bookies-to-ledgers map. |
| auditor_CHECK_ALL_LEDGERS_TIME | Summary | The latency distribution of checking all ledgers. |
| auditor_PLACEMENT_POLICY_CHECK_TIME | Summary | The latency distribution of placementPolicy check. |
| auditor_REPLICAS_CHECK_TIME | Summary | The latency distribution of replicas check. |
| auditor_AUDIT_BOOKIES_TIME | Summary | The latency distribution of auditing all the bookies. |
| auditor_NUM_LEDGERS_CHECKED | Counter | The number of ledgers checked by the auditor. |
| auditor_NUM_FRAGMENTS_PER_LEDGER | Summary | The distribution of number of fragments per ledger. |
| auditor_NUM_BOOKIES_PER_LEDGER | Summary | The distribution of number of bookies per ledger. |
| auditor_NUM_BOOKIE_AUDITS_DELAYED | Counter | The number of bookie-audits delayed. |
| auditor_NUM_DELAYED_BOOKIE_AUDITS_DELAYES_CANCELLED | Counter | The number of delayed-bookie-audits cancelled. |
| auditor_NUM_LEDGERS_NOT_ADHERING_TO_PLACEMENT_POLICY | Gauge | The number of ledgers not adhering to placement policy found in placement policy check. |
| auditor_NUM_LEDGERS_SOFTLY_ADHERING_TO_PLACEMENT_POLICY | Gauge | The number of ledgers softly adhering to placement policy found in placement policy check. |
| auditor_NUM_UNDERREPLICATED_LEDGERS_ELAPSED_RECOVERY_GRACE_PERIOD | Gauge | The number of underreplicated ledgers elapsed recovery grace period. |
| auditor_NUM_LEDGERS_HAVING_NO_REPLICA_OF_AN_ENTRY | Gauge | The number of ledgers having an entry with all the replicas missing. |
| auditor_NUM_LEDGERS_HAVING_LESS_THAN_AQ_REPLICAS_OF_AN_ENTRY | Gauge | The number of ledgers having an entry with less than AQ number of replicas, this doesn't include ledgers counted towards numLedgersHavingNoReplicaOfAnEntry. |
| auditor_NUM_LEDGERS_HAVING_LESS_THAN_WQ_REPLICAS_OF_AN_ENTRY | Gauge | The number of ledgers having an entry with less than WQ number of replicas, this doesn't include ledgers counted towards numLedgersHavingLessThanAQReplicasOfAnEntry. |
| election_attempts | Counter | The number of auditor election attempts. |
| replication_worker_NUM_BYTES_READ | Summary | The distribution size of entries read by the replicator. |
| replication_worker_NUM_ENTRIES_READ | Counter | Number of entries read by the replicator. |
| replication_worker_NUM_ENTRIES_WRITTEN | Counter | Number of entries written by the replicator. |
| replication_worker_NUM_BYTES_WRITTEN | Summary | The distribution size of entries written by the replicator. |
| replication_worker_READ_DATA_LATENCY | Summary | The distribution of latency of read entries by the replicator. |
| replication_worker_WRITE_DATA_LATENCY | Summary | The distribution of latency of write entries by the replicator. |
| replication_worker_exceptions | Summary | Replication related exceptions. |
| replication_worker_rereplicate | Summary | Operation stats of re-replicating ledgers. |
| replication_worker_NUM_FULL_OR_PARTIAL_LEDGERS_REPLICATED | Counter | The number of ledgers re-replicated. |
| replication_worker_NUM_DEFER_LEDGER_LOCK_RELEASE_OF_FAILED_LEDGER | Counter | The number of defer-ledger-lock-releases of failed ledgers. |
| replication_worker_NUM_ENTRIES_UNABLE_TO_READ_FOR_REPLICATION | Counter | The number of entries ReplicationWorker unable to read. |

## Broker

The broker metrics are exposed under "/metrics/" at port `8080`. You can change the port by updating `webServicePort` to a different port
in the `broker.conf` configuration file.

All the metrics exposed by a broker are labeled with `cluster=\$\{pulsar_cluster\}`. The name of Pulsar cluster is the value of `\$\{pulsar_cluster\}`, which you have configured in the `broker.conf` file.

### Broker metrics
All the broker metrics are labeled with the following labels:
- cluster: cluster=\$\{pulsar_cluster\}. \$\{pulsar_cluster\} is the cluster name that you have configured in the `broker.conf` file.

| Name                                                         | Type        | Description                                                                                                                 |
|--------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------|
| pulsar_ml_cache_evictions                                    | Gauge       | The number of cache evictions during the last minute.                                                                       |
| pulsar_ml_cache_inserted_entries_total                       | Counter     | The number of entries inserted into the entry cache.                                                                        |
| pulsar_ml_cache_evicted_entries_total                        | Counter     | The number of entries evicted from the entry cache.                                                                         |
| pulsar_ml_cache_entries                                      | Gauge       | The number of entries in the entry cache.                                                                                   |
| pulsar_ml_cache_hits_rate                                    | Gauge       | The number of cache hits per second on the broker side.                                                                     |
| pulsar_ml_cache_hits_throughput                              | Gauge       | The amount of data (byte per second) retrieved from the cache on the broker side.                                           |
| pulsar_ml_cache_misses_rate                                  | Gauge       | The number of cache missed per second on the broker side.                                                                   |
| pulsar_ml_cache_misses_throughput                            | Gauge       | The amount of data (byte per second) that cannot be retrieved from the cache on the broker side.                            |
| pulsar_ml_cache_pool_active_allocations                      | Gauge       | The number of currently active allocations in direct arena.                                                                 |
| pulsar_ml_cache_pool_active_allocations_huge                 | Gauge       | The number of currently active huge allocation in direct arena.                                                             |
| pulsar_ml_cache_pool_active_allocations_normal               | Gauge       | The number of currently active normal allocations in direct arena.                                                          |
| pulsar_ml_cache_pool_active_allocations_small                | Gauge       | The number of currently active small allocations in direct arena.                                                           |
| pulsar_ml_cache_pool_allocated                               | Gauge       | The total allocated memory of chunk lists in direct arena.                                                                  |
| pulsar_ml_cache_pool_used                                    | Gauge       | The total used memory of chunk lists in direct arena.                                                                       |
| pulsar_ml_cache_used_size                                    | Gauge       | The size used to store the payloads of entries (in bytes).                                                                  |
| pulsar_ml_count                                              | Gauge       | The number of currently opened managed ledgers.                                                                             |
| ~~topic_load_times (deprecated)~~                            | ~~Summary~~ | ~~The topic load latency calculated in milliseconds.~~                                                                      |
| pulsar_topic_load_times                                      | Summary     | The topic load latency calculated in milliseconds.                                                                          |
| pulsar_broker_topics_count                                   | Gauge       | The number of Pulsar topics in this broker.                                                                                 |
| pulsar_broker_subscriptions_count                            | Gauge       | The number of Pulsar subscriptions in this broker.                                                                          |
| pulsar_broker_producers_count                                | Gauge       | The number of active producers connected to this broker.                                                                    |
| pulsar_broker_consumers_count                                | Gauge       | The number of active consumers connected to this broker.                                                                    |
| pulsar_broker_rate_in                                        | Gauge       | The total message rate coming into this broker (message per second).                                                        |
| pulsar_broker_rate_out                                       | Gauge       | The total message rate going out from this broker (message per second).                                                     |
| pulsar_broker_throughput_in                                  | Gauge       | The total throughput coming into this broker (byte per second).                                                             |
| pulsar_broker_throughput_out                                 | Gauge       | The total throughput going out from this broker (byte per second).                                                          |
| pulsar_broker_storage_size                                   | Gauge       | The total storage size of all topics in this broker (in bytes).                                                             |
| pulsar_broker_storage_logical_size                           | Gauge       | The storage size of all topics in this broker without replicas (in bytes).                                                  |
| pulsar_broker_storage_write_rate                             | Gauge       | The total message batches (entries) written to the storage for this broker (message batch per second).                      |
| pulsar_broker_storage_read_rate                              | Gauge       | The total message batches (entries) read from the storage for this broker (message batch per second).                       |
| pulsar_broker_msg_backlog                                    | Gauge       | The total number of message backlogs in this broker (entries).                                                              |
| pulsar_storage_backlog_quota_check_duration_seconds          | Histogram   | The duration of the backlog quota check process (in seconds)                                                                |
| pulsar_broker_storage_backlog_quota_exceeded_evictions_total | Counter     | The number of times a backlog was evicted since it has exceeded its quota. Includes the label `quota_type = (time \| size)` |

### BookKeeper client metrics

The BookKeeper client metrics is disabled by default. Set `bookkeeperClientExposeStatsToPrometheus=true` in `broker.conf` to expose the BookKeeper client metrics. Suppose you want to expose PerChannel BookKeeper client metrics, which allows you to get the metrics for each bookie that the BookKeeper client connected. You can set `bookkeeperClientLimitStatsLogging=true` in `broker.conf`. Note that enabling the PerChannel BookKeeper client metrics might introduce performance issues in high-load situations.

All the BookKeeper client metrics are labeled with the following label:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you configured in `broker.conf`.

| Name | Type | Description |
|---|---|---|
| pulsar_managedLedger_client_bookkeeper_client_BOOKIE_QUARANTINE | Counter | The number of bookie clients to be quarantined. |
| pulsar_managedLedger_client_BookKeeperClientWorker_task_execution | Summary | The task execution latency calculated in milliseconds |
| pulsar_managedLedger_client_BookKeeperClientWorker_task_queued | Summary | The task queued latency calculated in milliseconds |
| pulsar_managedLedger_client_bookkeeper_client_ADD_ENTRY | Summary | Add entry latency calculated in milliseconds |
| pulsar_managedLedger_client_bookkeeper_client_READ_ENTRY | Summary | Read entry latency calculated in milliseconds |
| pulsar_managedLedger_client_bookkeeper_client_READ_LAC | Summary | Read Last Add Confirmed request latency calculated in milliseconds |
| pulsar_managedLedger_client_bookkeeper_client_WRITE_LAC | Summary | Write Last Add Confirmed request latency calculated in milliseconds |

### Namespace metrics

> Namespace metrics are only exposed when `exposeTopicLevelMetricsInPrometheus` is set to `false`.

All the namespace metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you configured in `broker.conf`.
- *namespace*: `namespace=\$\{pulsar_namespace\}`. `\$\{pulsar_namespace\}` is the namespace name.

| Name                                                    | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|---------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pulsar_topics_count                                     | Gauge     | The number of Pulsar topics of the namespace owned by this broker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| pulsar_subscriptions_count                              | Gauge     | The number of Pulsar subscriptions of the namespace served by this broker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| pulsar_producers_count                                  | Gauge     | The number of active producers of the namespace connected to this broker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| pulsar_consumers_count                                  | Gauge     | The number of active consumers of the namespace connected to this broker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| pulsar_rate_in                                          | Gauge     | The total message rate of the namespace coming into this broker (message per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| pulsar_rate_out                                         | Gauge     | The total message rate of the namespace going out from this broker (message per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| pulsar_throughput_in                                    | Gauge     | The total throughput of the namespace coming into this broker (byte per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| pulsar_throughput_out                                   | Gauge     | The total throughput of the namespace going out from this broker (byte per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| pulsar_consumer_msg_ack_rate                            | Gauge     | The total message acknowledgment rate of the namespace owned by this broker (message per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| pulsar_storage_size                                     | Gauge     | The total storage size of the topics in this namespace owned by this broker (bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| pulsar_storage_logical_size                             | Gauge     | The storage size of topics in the namespace owned by the broker without replicas (in bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| pulsar_storage_backlog_size                             | Gauge     | The total backlog size of the topics of this namespace owned by this broker (in bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| pulsar_storage_backlog_quota_exceeded_evictions_total   | Counter   | The number of times a backlog was evicted since it has exceeded its quota (When [backlog quota's retention policy](./cookbooks-retention-expiry.md#backlog-quotas) was set to `consumer_backlog_eviction`). Also includes label `quota_type = (time \| size)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| pulsar_storage_offloaded_size                           | Gauge     | The total amount of the data in this namespace offloaded to the tiered storage (bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| pulsar_storage_write_rate                               | Gauge     | The total message batches (entries) written to the storage for this namespace (message batch per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| pulsar_storage_read_rate                                | Gauge     | The total message batches (entries) read from the storage for this namespace (message batch per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| pulsar_subscription_delayed                             | Gauge     | The total message batches (entries) are delayed for dispatching.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| pulsar_storage_write_latency_le_*                       | Histogram | The entry rate of a namespace that the storage write latency is smaller with a given threshold.<br /> Available thresholds: <br /><ul><li>pulsar_storage_write_latency_le_0_5: &lt;= 0.5ms </li><li>pulsar_storage_write_latency_le_1: &lt;= 1ms</li><li>pulsar_storage_write_latency_le_5: &lt;= 5ms</li><li>pulsar_storage_write_latency_le_10: &lt;= 10ms</li><li>pulsar_storage_write_latency_le_20: &lt;= 20ms</li><li>pulsar_storage_write_latency_le_50: &lt;= 50ms</li><li>pulsar_storage_write_latency_le_100: &lt;= 100ms</li><li>pulsar_storage_write_latency_le_200: &lt;= 200ms</li><li>pulsar_storage_write_latency_le_1000: &lt;= 1s</li><li>pulsar_storage_write_latency_le_overflow: > 1s</li></ul>                                           |
| pulsar_entry_size_le_*                                  | Histogram | The entry rate of a namespace that the entry size is smaller with a given threshold.<br /> Available thresholds: <br /><ul><li>pulsar_entry_size_le_128: &lt;= 128 bytes </li><li>pulsar_entry_size_le_512: &lt;= 512 bytes</li><li>pulsar_entry_size_le_1_kb: &lt;= 1 KB</li><li>pulsar_entry_size_le_2_kb: &lt;= 2 KB</li><li>pulsar_entry_size_le_4_kb: &lt;= 4 KB</li><li>pulsar_entry_size_le_16_kb: &lt;= 16 KB</li><li>pulsar_entry_size_le_100_kb: &lt;= 100 KB</li><li>pulsar_entry_size_le_1_mb: &lt;= 1 MB</li><li>pulsar_entry_size_le_overflow: > 1 MB</li></ul>                                                                                                                                                                               |
| pulsar_delayed_message_index_size_bytes                 | Gauge     | The total memory size allocated by `DelayedDeliveryTracker` of the namespace owned by this broker (in bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| pulsar_delayed_message_index_bucket_total               | Gauge     | The number of delayed message index buckets (immutable buckets + LastMutableBucket )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| pulsar_delayed_message_index_loaded                     | Gauge     | The total number of delayed message indexes for in the memory.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| pulsar_delayed_message_index_bucket_snapshot_size_bytes | Gauge     | The total size of delayed message index bucket snapshot (in bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| pulsar_delayed_message_index_bucket_op_count            | Counter   | The total number of operation delayed message index bucket snapshots. The `state` label can be `succeed`,`failed`, and`all` (`all` means the total number of all states) and the `type` label can be `create`,`load`,`delete`, and `merge`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| pulsar_delayed_message_index_bucket_op_latency_ms       | Histogram | The latency of delayed message index bucket snapshot operation with a given quantile (threshold). The `type` label can be `create`,`load`,`delete`, and `merge`<br/>The label `quantile` can be:<ul><li>quantile="50" is operation latency between (0ms, 50ms]</li><li>quantile="100" is operation latency between (50ms, 100ms]</li><li>quantile="500" is operation latency between (100ms, 500ms]</li><li>quantile="1000" is operation latency between (500ms, 1s]</li><li>quantile="5000" is operation latency between (1s, 5s]</li><li>quantile="30000" is operation latency between (5s, 30s]</li><li>quantile="60000" is operation latency between (30s, 60s]</li><li>quantile="overflow" is operation latency > 1m</li></ul> |

### Topic metrics

> Topic metrics are only exposed when `exposeTopicLevelMetricsInPrometheus` is set to `true`.

All the topic metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you configured in `broker.conf`.
- *namespace*: `namespace=\$\{pulsar_namespace\}`. `\$\{pulsar_namespace\}` is the namespace name.
- *topic*: `topic=\$\{pulsar_topic\}`. `\$\{pulsar_topic\}` is the topic name.

| Name                                                    | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|---------------------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pulsar_subscriptions_count                              | Gauge     | The number of Pulsar subscriptions of the topic served by this broker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| pulsar_producers_count                                  | Gauge     | The number of active producers of the topic connected to this broker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| pulsar_consumers_count                                  | Gauge     | The number of active consumers of the topic connected to this broker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| pulsar_rate_in                                          | Gauge     | The total message rate of the topic coming into this broker (message per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| pulsar_rate_out                                         | Gauge     | The total message rate of the topic going out from this broker (message per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| pulsar_publish_rate_limit_times                         | Gauge     | The number of times the publish rate limit is triggered.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| pulsar_throughput_in                                    | Gauge     | The total throughput of the topic coming into this broker (byte per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| pulsar_throughput_out                                   | Gauge     | The total throughput of the topic going out from this broker (byte per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| pulsar_consumer_msg_ack_rate                            | Gauge     | The total message acknowledgment rate of the topic connected to this broker (message per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| pulsar_storage_size                                     | Gauge     | The total storage size of the topics in this topic owned by this broker (bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| pulsar_storage_logical_size                             | Gauge     | The storage size of topics in the namespace owned by the broker without replicas (in bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| pulsar_storage_backlog_size                             | Gauge     | The total backlog size of the topics of this topic owned by this broker (in bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| pulsar_storage_offloaded_size                           | Gauge     | The total amount of the data in this topic offloaded to the tiered storage (bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| pulsar_storage_backlog_quota_limit                      | Gauge     | The total amount of the data in this topic that limit the backlog quota (bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| pulsar_storage_backlog_age_seconds                      | Gauge     | The age of the oldest unacknowledged message (backlog).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| pulsar_storage_backlog_quota_exceeded_evictions_total   | Counter   | The number of times a backlog was evicted since it has exceeded its quota. Includes label `quota_type = (time \| size)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| pulsar_storage_write_rate                               | Gauge     | The total message batches (entries) written to the storage for this topic (message batch per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| pulsar_storage_read_rate                                | Gauge     | The total message batches (entries) read from the storage for this topic (message batch per second).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| pulsar_subscription_delayed                             | Gauge     | The total message batches (entries) are delayed for dispatching.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| pulsar_storage_write_latency_le_*                       | Histogram | The entry rate of a topic that the storage write latency is smaller with a given threshold.<br /> Available thresholds: <br /><ul><li>pulsar_storage_write_latency_le_0_5: &lt;= 0.5ms </li><li>pulsar_storage_write_latency_le_1: &lt;= 1ms</li><li>pulsar_storage_write_latency_le_5: &lt;= 5ms</li><li>pulsar_storage_write_latency_le_10: &lt;= 10ms</li><li>pulsar_storage_write_latency_le_20: &lt;= 20ms</li><li>pulsar_storage_write_latency_le_50: &lt;= 50ms</li><li>pulsar_storage_write_latency_le_100: &lt;= 100ms</li><li>pulsar_storage_write_latency_le_200: &lt;= 200ms</li><li>pulsar_storage_write_latency_le_1000: &lt;= 1s</li><li>pulsar_storage_write_latency_le_overflow: > 1s</li></ul>                                                    |
| pulsar_entry_size_le_*                                  | Histogram | The entry rate of a topic that the entry size is smaller with a given threshold.<br /> Available thresholds: <br /><ul><li>pulsar_entry_size_le_128: &lt;= 128 bytes </li><li>pulsar_entry_size_le_512: &lt;= 512 bytes</li><li>pulsar_entry_size_le_1_kb: &lt;= 1 KB</li><li>pulsar_entry_size_le_2_kb: &lt;= 2 KB</li><li>pulsar_entry_size_le_4_kb: &lt;= 4 KB</li><li>pulsar_entry_size_le_16_kb: &lt;= 16 KB</li><li>pulsar_entry_size_le_100_kb: &lt;= 100 KB</li><li>pulsar_entry_size_le_1_mb: &lt;= 1 MB</li><li>pulsar_entry_size_le_overflow: > 1 MB</li></ul>                                                                                                                                                                                        |
| pulsar_in_bytes_total                                   | Counter   | The total number of messages in bytes received for this topic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| pulsar_in_messages_total                                | Counter   | The total number of messages received for this topic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| pulsar_out_bytes_total                                  | Counter   | The total number of messages in bytes read from this topic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| pulsar_out_messages_total                               | Counter   | The total number of messages read from this topic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| pulsar_compaction_removed_event_count                   | Gauge     | The total number of removed events of the compaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| pulsar_compaction_succeed_count                         | Gauge     | The total number of successes of the compaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| pulsar_compaction_failed_count                          | Gauge     | The total number of failures of the compaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| pulsar_compaction_duration_time_in_mills                | Gauge     | The duration time of the compaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| pulsar_compaction_read_throughput                       | Gauge     | The read throughput of the compaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| pulsar_compaction_write_throughput                      | Gauge     | The write throughput of the compaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| pulsar_compaction_latency_le_*                          | Histogram | The compaction latency with given quantile. <br /> Available thresholds: <br /><ul><li>pulsar_compaction_latency_le_0_5: &lt;= 0.5ms </li><li>pulsar_compaction_latency_le_1: &lt;= 1ms</li><li>pulsar_compaction_latency_le_5: &lt;= 5ms</li><li>pulsar_compaction_latency_le_10: &lt;= 10ms</li><li>pulsar_compaction_latency_le_20: &lt;= 20ms</li><li>pulsar_compaction_latency_le_50: &lt;= 50ms</li><li>pulsar_compaction_latency_le_100: &lt;= 100ms</li><li>pulsar_compaction_latency_le_200: &lt;= 200ms</li><li>pulsar_compaction_latency_le_1000: &lt;= 1s</li><li>pulsar_compaction_latency_le_overflow: > 1s</li></ul>                                                                                                                                 |
| pulsar_compaction_compacted_entries_count               | Gauge     | The total number of the compacted entries.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| pulsar_compaction_compacted_entries_size                | Gauge     | The total size of the compacted entries.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| pulsar_txn_tb_active_total                              | Gauge     | The number of active transactions on this topic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| pulsar_txn_tb_aborted_total                             | Counter   | The number of aborted transactions on the topic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| pulsar_txn_tb_committed_total                           | Counter   | The number of committed transactions on the topic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| pulsar_delayed_message_index_size_bytes                 | Gauge     | The total memory size allocated by `DelayedDeliveryTracker` of the topic owned by this broker (in bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| pulsar_delayed_message_index_bucket_total               | Gauge     | The number of delayed message index buckets (immutable buckets + LastMutableBucket )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| pulsar_delayed_message_index_loaded                     | Gauge     | The total number of delayed message indexes for in the memory.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| pulsar_delayed_message_index_bucket_snapshot_size_bytes | Gauge     | The total size of delayed message index bucket snapshot (in bytes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| pulsar_delayed_message_index_bucket_op_count            | Counter   | The total number of operation delayed message index bucket snapshots. The `state` label can be `succeed`,`failed`, and`all` (`all` means the total number of all states) and the `type` label can be `create`,`load`,`delete`, and `merge`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| pulsar_delayed_message_index_bucket_op_latency_ms       | Histogram | The latency of delayed message index bucket snapshot operation with a given quantile (threshold). The label`type` label can be `create`,`load`,`delete`, and `merge`<br/>The label `quantile` can be:<ul><li>quantile="50" is operation latency between (0ms, 50ms]</li><li>quantile="100" is operation latency between (50ms, 100ms]</li><li>quantile="500" is operation latency between (100ms, 500ms]</li><li>quantile="1000" is operation latency between (500ms, 1s]</li><li>quantile="5000" is operation latency between (1s, 5s]</li><li>quantile="30000" is operation latency between (5s, 30s]</li><li>quantile="60000" is operation latency between (30s, 60s]</li><li>quantile="overflow" is operation latency > 1m</li></ul> |

### Replication metrics

If a namespace is configured to be replicated among multiple Pulsar clusters, the corresponding replication metrics is also exposed when `replicationMetricsEnabled` is enabled.

All the replication metrics are also labelled with `remoteCluster=\$\{pulsar_remote_cluster\}`.

| Name | Type | Description |
|---|---|---|
| pulsar_replication_rate_in | Gauge | The total message rate of the namespace replicating from remote cluster (messages/second). |
| pulsar_replication_rate_out | Gauge | The total message rate of the namespace replicating to remote cluster (messages/second). |
| pulsar_replication_throughput_in | Gauge | The total throughput of the namespace replicating from remote cluster (bytes/second). |
| pulsar_replication_throughput_out | Gauge | The total throughput of the namespace replicating to remote cluster (bytes/second). |
| pulsar_replication_backlog | Gauge | The total backlog of the namespace replicating to remote cluster (messages). |
| pulsar_replication_rate_expired | Gauge | Total rate of messages expired (messages/second). |
| pulsar_replication_connected_count | Gauge | The count of replication-subscriber up and running to replicate to remote cluster. |
| pulsar_replication_delay_in_seconds | Gauge | Time in seconds from the time a message was produced to the time when it is about to be replicated. |

### Topic lookup metrics

| Name | Type | Description |
|---|---|---|
| pulsar_broker_load_manager_bundle_assignment | Gauge | The summary of latency of bundles ownership operations. |
| pulsar_broker_lookup | Gauge | The latency of all lookup operations. |
| pulsar_broker_lookup_redirects | Gauge | The number of lookup redirected requests. |
| pulsar_broker_lookup_answers | Gauge | The number of lookup responses (i.e. not redirected requests). |
| pulsar_broker_lookup_failures | Gauge | The number of lookup failures. |
| pulsar_broker_lookup_pending_requests | Gauge | The number of pending lookups in broker. When it is up to the threshold, new requests are rejected. |
| pulsar_broker_topic_load_pending_requests | Gauge | The load of pending topic operations. |

### ManagedLedger metrics
All the managedLedger metrics are labeled with the following labels:
- cluster: cluster=\$\{pulsar_cluster\}. \$\{pulsar_cluster\} is the cluster name that you have configured in the `broker.conf` file.
- namespace: namespace=\$\{pulsar_namespace\}. \$\{pulsar_namespace\} is the namespace name.
- quantile: quantile=\$\{quantile\}. Quantile is only for `Histogram` type metric, and represents the threshold for given Buckets.

| Name | Type | Description |
| --- | --- | --- |
| pulsar_ml_AddEntryBytesRate | Gauge | The B/s rate of messages added |
| pulsar_ml_AddEntryWithReplicasBytesRate | Gauge | The B/s rate of messages added with replicas |
| pulsar_ml_AddEntryErrors | Gauge | The number of addEntry requests that failed |
| pulsar_ml_AddEntryLatencyBuckets | Histogram | The latency of adding a ledger entry with a given quantile (threshold), including time spent waiting in queue on the broker side.<br /> Available quantile: <br /><ul><li> quantile="0.0_0.5" is AddEntryLatency between (0.0ms, 0.5ms]</li> <li>quantile="0.5_1.0" is AddEntryLatency between (0.5ms, 1.0ms]</li><li>quantile="1.0_5.0" is AddEntryLatency between (1ms, 5ms]</li><li>quantile="5.0_10.0" is AddEntryLatency between (5ms, 10ms]</li><li>quantile="10.0_20.0" is AddEntryLatency between (10ms, 20ms]</li><li>quantile="20.0_50.0" is AddEntryLatency between (20ms, 50ms]</li><li>quantile="50.0_100.0" is AddEntryLatency between (50ms, 100ms]</li><li>quantile="100.0_200.0" is AddEntryLatency between (100ms, 200ms]</li><li>quantile="200.0_1000.0" is AddEntryLatency between (200ms, 1s]</li></ul>|
| pulsar_ml_AddEntryLatencyBuckets_OVERFLOW | Gauge | The number of times the AddEntryLatency is longer than 1 second |
| pulsar_ml_AddEntryMessagesRate | Gauge | The msg/s rate of messages added |
| pulsar_ml_AddEntrySucceed | Gauge | The number of addEntry requests that succeeded |
| pulsar_ml_EntrySizeBuckets | Histogram | The added entry size of a ledger with a given quantile.<br /> Available quantile: <br /><ul><li>quantile="0.0_128.0" is EntrySize between (0byte, 128byte]</li><li>quantile="128.0_512.0" is EntrySize between (128byte, 512byte]</li><li>quantile="512.0_1024.0" is EntrySize between (512byte, 1KB]</li><li>quantile="1024.0_2048.0" is EntrySize between (1KB, 2KB]</li><li>quantile="2048.0_4096.0" is EntrySize between (2KB, 4KB]</li><li>quantile="4096.0_16384.0" is EntrySize between (4KB, 16KB]</li><li>quantile="16384.0_102400.0" is EntrySize between (16KB, 100KB]</li><li>quantile="102400.0_1232896.0" is EntrySize between (100KB, 1MB]</li></ul> |
| pulsar_ml_EntrySizeBuckets_OVERFLOW |Gauge  | The number of times the EntrySize is larger than 1MB |
| pulsar_ml_LedgerSwitchLatencyBuckets | Histogram | The ledger switch latency with a given quantile. <br /> Available quantile: <br /><ul><li>quantile="0.0_0.5" is EntrySize between (0ms, 0.5ms]</li><li>quantile="0.5_1.0" is EntrySize between (0.5ms, 1ms]</li><li>quantile="1.0_5.0" is EntrySize between (1ms, 5ms]</li><li>quantile="5.0_10.0" is EntrySize between (5ms, 10ms]</li><li>quantile="10.0_20.0" is EntrySize between (10ms, 20ms]</li><li>quantile="20.0_50.0" is EntrySize between (20ms, 50ms]</li><li>quantile="50.0_100.0" is EntrySize between (50ms, 100ms]</li><li>quantile="100.0_200.0" is EntrySize between (100ms, 200ms]</li><li>quantile="200.0_1000.0" is EntrySize between (200ms, 1000ms]</li></ul> |
| pulsar_ml_LedgerSwitchLatencyBuckets_OVERFLOW | Gauge | The number of times the ledger switch latency is longer than 1 second |
| pulsar_ml_LedgerAddEntryLatencyBuckets | Histogram | The latency for bookie client to persist a ledger entry from broker to BookKeeper service with a given quantile (threshold). <br /> Available quantile: <br /><ul><li> quantile="0.0_0.5" is LedgerAddEntryLatency between (0.0ms, 0.5ms]</li> <li>quantile="0.5_1.0" is LedgerAddEntryLatency between (0.5ms, 1.0ms]</li><li>quantile="1.0_5.0" is LedgerAddEntryLatency between (1ms, 5ms]</li><li>quantile="5.0_10.0" is LedgerAddEntryLatency between (5ms, 10ms]</li><li>quantile="10.0_20.0" is LedgerAddEntryLatency between (10ms, 20ms]</li><li>quantile="20.0_50.0" is LedgerAddEntryLatency between (20ms, 50ms]</li><li>quantile="50.0_100.0" is LedgerAddEntryLatency between (50ms, 100ms]</li><li>quantile="100.0_200.0" is LedgerAddEntryLatency between (100ms, 200ms]</li><li>quantile="200.0_1000.0" is LedgerAddEntryLatency between (200ms, 1s]</li></ul>|
| pulsar_ml_LedgerAddEntryLatencyBuckets_OVERFLOW | Gauge | The number of times the LedgerAddEntryLatency is longer than 1 second |
| pulsar_ml_MarkDeleteRate | Gauge | The rate of mark-delete ops/s |
| pulsar_ml_NumberOfMessagesInBacklog | Gauge | The number of backlog messages for all the consumers |
| pulsar_ml_ReadEntriesBytesRate | Gauge | The B/s rate of messages read |
| pulsar_ml_ReadEntriesErrors | Gauge | The number of readEntries requests that failed |
| pulsar_ml_ReadEntriesRate | Gauge | The msg/s rate of messages read |
| pulsar_ml_ReadEntriesSucceeded | Gauge | The number of readEntries requests that succeeded |
| pulsar_ml_StoredMessagesSize | Gauge | The total size of the messages in active ledgers (accounting for the multiple copies stored) |

### Managed cursor acknowledgment state

The acknowledgment state is persistent to the ledger first. When the acknowledgment state fails to be persistent to the ledger, they are persistent to ZooKeeper. To track the stats of acknowledgment, you can configure the metrics for the managed cursor.

All the cursor acknowledgment state metrics are labeled with the following labels:

- namespace: `namespace=\$\{pulsar_namespace\}`. `\$\{pulsar_namespace\}` is the namespace name.

- ledger_name: `ledger_name=\$\{pulsar_ledger_name\}`. `\$\{pulsar_ledger_name\}` is the ledger name.

- cursor_name: `ledger_name=\$\{pulsar_cursor_name\}`. `\$\{pulsar_cursor_name\}` is the cursor name.

| Name	                                              | Type	 | Description                                                                                          |
|----------------------------------------------------|-------|------------------------------------------------------------------------------------------------------|
| pulsar_ml_cursor_persistLedgerSucceed              | Gauge | The number of acknowledgment states that is persistent to a ledger.                                  |
| pulsar_ml_cursor_persistLedgerErrors               | Gauge | The number of ledger errors occurred when acknowledgment states fail to be persistent to the ledger. |
| pulsar_ml_cursor_persistZookeeperSucceed           | Gauge | The number of acknowledgment states that is persistent to ZooKeeper.                                 |
| pulsar_ml_cursor_persistZookeeperErrors            | Gauge | The number of ledger errors occurred when acknowledgment states fail to be persistent to ZooKeeper.  |
| pulsar_ml_cursor_nonContiguousDeletedMessagesRange | Gauge | The number of non-contiguous deleted messages ranges.                                                |
| pulsar_ml_cursor_writeLedgerSize                   | Gauge | The size of write to ledger.                                                                         |
| pulsar_ml_cursor_writeLedgerLogicalSize            | Gauge | The size of write to ledger (accounting for without replicas).                                       |
| pulsar_ml_cursor_readLedgerSize                    | Gauge | The size of read from ledger.                                                                        |

### Subscription metrics

> Subscription metrics are only exposed when `exposeTopicLevelMetricsInPrometheus` is set to `true`.

All the subscription metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.
- *namespace*: `namespace=\$\{pulsar_namespace\}`. `\$\{pulsar_namespace\}` is the namespace name.
- *topic*: `topic=\$\{pulsar_topic\}`. `\$\{pulsar_topic\}` is the topic name.
- *subscription*: `subscription=\$\{subscription\}`. `\$\{subscription\}` is the topic subscription name.

| Name | Type | Description |
|---|---|---|
| pulsar_subscription_back_log | Gauge | The number of entries (messages/batched-messages) in unacknowledged state for a subscription |
| pulsar_subscription_back_log_no_delayed | Gauge | The backlog of a subscription that does not contain the delay messages (entries). |
| pulsar_subscription_delayed | Gauge | The total number of messages are delayed to be dispatched for a subscription (messages). |
| pulsar_subscription_msg_rate_redeliver | Gauge | The total message rate for message being redelivered (message per second). |
| pulsar_subscription_unacked_messages | Gauge | The number of entries (messages/batched-messages) dispatched to consumers and are still unacknowledged |
| pulsar_subscription_blocked_on_unacked_messages | Gauge | Indicate whether a subscription is blocked on unacknowledged messages or not. <br /> <ul><li>1 means the subscription is blocked on waiting for unacknowledged messages to be acked.</li><li>0 means the subscription is not blocked on waiting for unacknowledged messages to be acked.</li></ul> |
| pulsar_subscription_msg_rate_out | Gauge | The total message dispatch rate for a subscription (message per second). |
| pulsar_subscription_msg_throughput_out | Gauge | The total message dispatch throughput for a subscription (byte per second). |
| pulsar_subscription_msg_ack_rate | Gauge | The total message acknowledgment rate for a subscription (message per second). |
| pulsar_subscription_last_expire_timestamp | Gauge | The expiration timestamp of the last message on the subscription. |
| pulsar_subscription_last_acked_timestamp | Gauge | The timestamp of the last acknowledged message on the subscription. |
| pulsar_subscription_last_consumed_flow_timestamp | Gauge | The timestamp of the last received consume flow command on the subscription. |
| pulsar_subscription_last_consumed_timestamp | Gauge | The timestamp of the last consumed message on the subscription. |
| pulsar_subscription_last_mark_delete_advanced_timestamp | Gauge | The advanced timestamp of the last MarkDelete position on the subscription. |
| pulsar_subscription_msg_rate_expired | Gauge | The total rate of messages expired on this subscription (message per second). |
| pulsar_subscription_total_msg_expired | Gauge | The total number of messages expired on this subscription. |
| pulsar_subscription_msg_drop_rate | Gauge | The rate of messages dropped on this subscription (message per second). |
| pulsar_subscription_consumers_count | Gauge | The number of connected consumers on this subscription. |
| pulsar_subscription_filter_processed_msg_count | Counter | The number of messages processed by `EntryFilter`. |
| pulsar_subscription_filter_accepted_msg_count | Counter | The number of messages accepted by `EntryFilter`. |
| pulsar_subscription_filter_rejected_msg_count | Counter | The number of messages rejected by `EntryFilter`. |
| pulsar_subscription_filter_rescheduled_msg_count | Counter | The number of messages rescheduled by `EntryFilter`. |
| pulsar_delayed_message_index_size_bytes | Gauge | The total memory size allocated by `DelayedDeliveryTracker` of the subscription owned by this broker (in bytes). |
| pulsar_delayed_message_index_bucket_total | Gauge | The number of delayed message index buckets (immutable buckets + LastMutableBucket ) |
| pulsar_delayed_message_index_loaded | Gauge | The total number of delayed message indexes for in the memory. |
| pulsar_delayed_message_index_bucket_snapshot_size_bytes | Gauge | The total size of delayed message index bucket snapshot (in bytes). |
| pulsar_delayed_message_index_bucket_op_count | Counter | The total number of operation delayed message index bucket snapshots. The `state` label can be `succeed`,`failed`, and`all` (`all` means the total number of all states) and the `type` label can be `create`,`load`,`delete`, and `merge`. |
| pulsar_delayed_message_index_bucket_op_latency_ms | Histogram | The latency of delayed message index bucket snapshot operation with a given quantile (threshold). The label`type` label can be `create`,`load`,`delete`, and `merge`<br/>The label `quantile` can be:<ul><li>quantile="50" is operation latency between (0ms, 50ms]</li><li>quantile="100" is operation latency between (50ms, 100ms]</li><li>quantile="500" is operation latency between (100ms, 500ms]</li><li>quantile="1000" is operation latency between (500ms, 1s]</li><li>quantile="5000" is operation latency between (1s, 5s]</li><li>quantile="30000" is operation latency between (5s, 30s]</li><li>quantile="60000" is operation latency between (30s, 60s]</li><li>quantile="overflow" is operation latency > 1m</li></ul> |

### Consumer metrics

> Consumer metrics are only exposed when both `exposeTopicLevelMetricsInPrometheus` and `exposeConsumerLevelMetricsInPrometheus` are set to `true`.

All the consumer metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.
- *namespace*: `namespace=\$\{pulsar_namespace\}`. `\$\{pulsar_namespace\}` is the namespace name.
- *topic*: `topic=\$\{pulsar_topic\}`. `\$\{pulsar_topic\}` is the topic name.
- *subscription*: `subscription=\$\{subscription\}`. `\$\{subscription\}` is the topic subscription name.
- *consumer_name*: `consumer_name=\$\{consumer_name\}`. `\$\{consumer_name\}` is the topic consumer name.
- *consumer_id*: `consumer_id=\$\{consumer_id\}`. `\$\{consumer_id\}` is the topic consumer id.

| Name | Type | Description |
|---|---|---|
| pulsar_consumer_msg_rate_redeliver | Gauge | The total message rate for message being redelivered (message per second). |
| pulsar_consumer_unacked_messages | Gauge | The total number of unacknowledged messages of a consumer (messages). |
| pulsar_consumer_blocked_on_unacked_messages | Gauge | Indicate whether a consumer is blocked on unacknowledged messages or not. <br /> <ul><li>1 means the consumer is blocked on waiting for unacknowledged messages to be acked.</li><li>0 means the consumer is not blocked on waiting for unacknowledged messages to be acked.</li></ul> |
| pulsar_consumer_msg_rate_out | Gauge | The total message dispatch rate for a consumer (message per second). |
| pulsar_consumer_msg_ack_rate | Gauge | The total rate of message ack (message per second). |
| pulsar_consumer_msg_throughput_out | Gauge | The total message dispatch throughput for a consumer (byte per second). |
| pulsar_consumer_available_permits | Gauge | The available permits for for a consumer. |

### Managed ledger bookie client metrics

All the managed ledger bookie client metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.

| Name | Type | Description |
| --- | --- | --- |
| pulsar_managedLedger_client_bookkeeper_ml_scheduler_completed_tasks_* | Gauge |  The number of tasks the scheduler executor execute completed. <br />The number of metrics determined by the scheduler executor thread number configured by `managedLedgerNumSchedulerThreads` in `broker.conf`. <br /> |
| pulsar_managedLedger_client_bookkeeper_ml_scheduler_queue_* | Gauge | The number of tasks queued in the scheduler executor's queue. <br />The number of metrics determined by the scheduler executor's thread number configured by `managedLedgerNumSchedulerThreads` in `broker.conf`. <br /> |
| pulsar_managedLedger_client_bookkeeper_ml_scheduler_total_tasks_* | Gauge | The total number of tasks the scheduler executor received. <br />The number of metrics determined by the scheduler executor's thread number configured by `managedLedgerNumSchedulerThreads` in `broker.conf`. <br /> |
| pulsar_managedLedger_client_bookkeeper_ml_scheduler_task_execution | Summary | The scheduler task execution latency calculated in milliseconds. |
| pulsar_managedLedger_client_bookkeeper_ml_scheduler_task_queued | Summary | The scheduler task queued latency calculated in milliseconds. |

### Token metrics

All the token metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.

| Name | Type | Description |
|---|---|---|
| pulsar_expired_token_total | Counter | The number of expired tokens in Pulsar. |
| pulsar_expiring_token_minutes | Histogram | The remaining time of expiring tokens in minutes. |

### Authentication metrics

All the authentication metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.
- *provider_name*: `provider_name=\$\{provider_name\}`. `\$\{provider_name\}` is the class name of the authentication provider.
- *auth_method*: `auth_method=\$\{auth_method\}`. `\$\{auth_method\}` is the authentication method of the authentication provider.
- *reason*: `reason=\$\{reason\}`. `\$\{reason\}` is the reason for failing authentication operation. (This label is only for `pulsar_authentication_failures_total`.)

| Name | Type | Description |
|---|---|---|
| pulsar_authentication_success_total| Counter | The number of successful authentication operations. |
| pulsar_authentication_failures_total | Counter | The number of failing authentication operations. |

### Connection metrics

All the connection metrics are labelled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.
- *broker*: `broker=\$\{advertised_address\}`. `\$\{advertised_address\}` is the advertised address of the broker.
- *metric*: `metric=\$\{metric\}`. `\$\{metric\}` is the connection metric collective name.

| Name                                   | Type  | Description                                     |
|----------------------------------------|-------|-------------------------------------------------|
| pulsar_active_connections              | Gauge | The number of active connections.               |
| pulsar_connection_created_total_count  | Gauge | The total number of connections.                |
| pulsar_connection_create_success_count | Gauge | The number of successfully created connections. |
| pulsar_connection_create_fail_count    | Gauge | The number of failed connections.               |
| pulsar_connection_closed_total_count   | Gauge | The total number of closed connections.         |
| pulsar_broker_throttled_connections    | Gauge | The number of throttled connections.            |

### Jetty metrics

> For a functions-worker running separately from brokers, its Jetty metrics are only exposed when `includeStandardPrometheusMetrics` is set to `true`.

All the jetty metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.

| Name | Type | Description |
|---|---|---|
| jetty_requests_total | Counter | Number of requests. |
| jetty_requests_active | Gauge | Number of requests currently active. |
| jetty_requests_active_max | Gauge | Maximum number of requests that have been active at once. |
| jetty_request_time_max_seconds | Gauge | Maximum time spent handling requests. |
| jetty_request_time_seconds_total | Counter | Total time spent in all request handling. |
| jetty_dispatched_total | Counter | Number of dispatches. |
| jetty_dispatched_active | Gauge | Number of dispatches currently active. |
| jetty_dispatched_active_max | Gauge | Maximum number of active dispatches being handled. |
| jetty_dispatched_time_max | Gauge | Maximum time spent in dispatch handling. |
| jetty_dispatched_time_seconds_total | Counter | Total time spent in dispatch handling. |
| jetty_async_requests_total | Counter | Total number of async requests. |
| jetty_async_requests_waiting | Gauge | Currently waiting async requests. |
| jetty_async_requests_waiting_max | Gauge | Maximum number of waiting async requests. |
| jetty_async_dispatches_total | Counter | Number of requests that have been asynchronously dispatched. |
| jetty_expires_total | Counter | Number of async requests that have expired. |
| jetty_responses_total | Counter | Number of responses, labeled by status code. The `code` label can be "1xx", "2xx", "3xx", "4xx", or "5xx". |
| jetty_stats_seconds | Gauge | Time in seconds stats have been collected for. |
| jetty_responses_bytes_total | Counter | Total number of bytes across all responses. |

### Schema metrics

> For a functions-worker running separately from brokers, its schema metrics are only exposed when `includeStandardPrometheusMetrics` is set to `true`.

All the schema metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.

| Name                               | Type    | Description                                         |
|------------------------------------|---------|-----------------------------------------------------|
| pulsar_schema_del_ops_failed_total | Counter | Number of failed operations to delete schemas.      |
| pulsar_schema_get_ops_failed_total | Counter | Number of failed operations to get schemas.         |
| pulsar_schema_put_ops_failed_total | Counter | Number of failed operations to send schemas.        |
| pulsar_schema_compatible_total     | Counter | Number of compatible schemas.                       |
| pulsar_schema_incompatible_total   | Counter | Number of incompatible schemas.                     |
| pulsar_schema_del_ops_latency      | Summary | Latency of successful operations to delete schemas. |
| pulsar_schema_get_ops_latency      | Summary | Latency of successful operations to get schemas.    |
| pulsar_schema_put_ops_latency      | Summary | Latency of successful operations to send schemas.   |

### Offload metrics

All the offload metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you configured in `broker.conf`.
- *namespace*: `namespace=\$\{pulsar_namespace\}`. `\$\{pulsar_namespace\}` is the namespace name.
- *topic*: `topic=\$\{pulsar_topic\}`. `\$\{pulsar_topic\}` is the topic name.

| Name                                | Type    | Description                                                                     |
|-------------------------------------|---------|---------------------------------------------------------------------------------|
| pulsar_ledgeroffloader_offload_error | Counter | The number of failed operations to offload.                                     |
| pulsar_ledgeroffloader_offload_rate | Gauge   | The rate of offloading(byte per second).                                        |
| pulsar_ledgeroffloader_read_offload_error | Counter | The number of failed operations to read offload ledgers.                        |
| pulsar_ledgeroffloader_read_offload_rate | Gauge   | The rate of reading entries from offload ledgers(byte per second).              |
| pulsar_ledgeroffloader_write_storage_error | Counter | The number of failed operations to write to storage.                            |
| pulsar_ledgeroffloader_read_offload_index_latency | Summary | The latency of reading index from offload ledgers.                              |
| pulsar_ledgeroffloader_read_offload_data_latency | Summary | The latency of reading data from offload ledgers.                               |
| pulsar_ledgeroffloader_read_ledger_latency | Summary | The latency of reading entries from BookKeeper.                                 |
| pulsar_ledgeroffloader_delete_offload_ops | Counter | The total number of successful and failed operations to delete offload ledgers. |


### Web service executor metrics

> For functions workers running separately from brokers, their Jetty metrics are only exposed when `includeStandardPrometheusMetrics` is set to `true`.

All the web service executor metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.

| Name | Type | Description |
|---|---|---|
| pulsar_web_executor_max_threads | GAUGE | The max threads of pulsar-web  thread pool |
| pulsar_web_executor_min_threads | GAUGE | The min threads of pulsar-web thread pool |
| pulsar_web_executor_idle_threads | GAUGE | The idle threads of pulsar-web thread pool |
| pulsar_web_executor_active_threads | GAUGE | The number of threads performing tasks of pulsar-web thread pool |
| pulsar_web_executor_current_threads | GAUGE | The number of threads in the pulsar-web thread pool |

### Metadata store metrics

All the metadata store metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you configured in `broker.conf`.
- *name*: `name=\$\{metadata-store\|configuration-metadata-store\|state-metadata-store\}`. `\$\{name\}` is the metadata store name.

| Name                                               | Type      | Description                                                                                  |
|----------------------------------------------------|-----------|----------------------------------------------------------------------------------------------|
| pulsar_metadata_store_ops_latency                  | Histogram | The latency of getting/deleting/putting data from/to metadata store.                         |
| pulsar_metadata_store_put_bytes_total              | Counter   | The number of data put to metadata store.                                                    |
| pulsar_batch_metadata_store_executor_queue_size    | Gauge     | The number of blocking operations in metadata store executor.                                |
| pulsar_batch_metadata_store_queue_wait_time_ms     | Histogram | The waiting time of batch operations.                                                        |
| pulsar_batch_metadata_store_batch_execute_time_ms  | Histogram | The duration of the batch execution in milliseconds.                                         |
| pulsar_batch_metadata_store_batch_size             | Histogram | The number of read/write operations in the batch.                                            |

### JVM Metrics

#### Process Metrics
| Name                          | Type    | Description                                            |
|-------------------------------|---------|--------------------------------------------------------|
| process_cpu_seconds_total     | Counter | Total user and system CPU time spent in seconds.       |
| process_start_time_seconds    | Gauge   | Start time of the process since unix epoch in seconds. |
| process_open_fds              | Gauge   | Number of open file descriptors.                       |
| process_max_fds               | Gauge   | Maximum number of open file descriptors.               |
| process_virtual_memory_bytes  | Gauge   | Virtual memory size in bytes.                          |
| process_resident_memory_bytes | Gauge   | Resident memory size in bytes.                         |

#### Memory Metrics
| Name                                       | Type                                   | Description                                                                                |
|--------------------------------------------|----------------------------------------|--------------------------------------------------------------------------------------------|
| jvm_memory_objects_pending_finalization    | Gauge                                  | The number of objects waiting in the finalizer queue.                                      |
| jvm_memory_bytes_used                      | Gauge                                  | Used bytes of a given JVM memory area.                                                     |
| jvm_memory_bytes_committed                 | Gauge                                  | Committed (bytes) of a given JVM memory area.                                              |
| jvm_memory_bytes_max                       | Gauge                                  | Max (bytes) of a given JVM memory area.                                                    |
| jvm_memory_bytes_init                      | Gauge                                  | Initial bytes of a given JVM memory area.                                                  |
| jvm_memory_pool_bytes_used                 | Used bytes of a given JVM memory pool. |
| jvm_memory_pool_bytes_committed            | Gauge                                  | Committed bytes of a given JVM memory pool.                                                |
| jvm_memory_pool_bytes_max                  | Gauge                                  | Max bytes of a given JVM memory pool.                                                      |
| jvm_memory_pool_bytes_init                 | Gauge                                  | Initial bytes of a given JVM memory pool.                                                  |
| jvm_memory_pool_collection_used_bytes      | Gauge                                  | Used bytes after the last collection of a given JVM memory pool.                           |
| jvm_memory_pool_collection_committed_bytes | Gauge                                  | Committed after last collection bytes of a given JVM memory pool.                          |
| jvm_memory_pool_collection_max_bytes       | Gauge                                  | Max bytes after the last collection of a given JVM memory pool.                            |
| jvm_memory_pool_collection_init_bytes      | Gauge                                  | Initial after last collection bytes of a given JVM memory pool.                            |
| jvm_memory_pool_allocated_bytes_total      | Counter                                | Total bytes allocated in a given JVM memory pool. Only updated after GC, not continuously. |

#### Buffer Pools Metrics
| Name                           | Type  | Description                                |
|--------------------------------|-------|--------------------------------------------|
| jvm_buffer_pool_used_bytes     | Gauge | Used bytes of a given JVM buffer pool.     |
| jvm_buffer_pool_capacity_bytes | Gauge | Bytes capacity of a given JVM buffer pool. |
| jvm_buffer_pool_used_buffers   | Gauge | Used buffers of a given JVM buffer pool.   |

#### Garbage Collectors Metrics
| Name                      | Type    | Description                                             |
|---------------------------|---------|---------------------------------------------------------|
| jvm_gc_collection_seconds | Summary | Time spent in a given JVM garbage collector in seconds. |

#### Threads Metrics
| Name                           | Type    | Description                                                                                            |
|--------------------------------|---------|--------------------------------------------------------------------------------------------------------|
| jvm_threads_current            | Gauge   | Current thread count of a JVM                                                                          |
| jvm_threads_daemon             | Gauge   | Daemon thread count of a JVM                                                                           |
| jvm_threads_peak               | Gauge   | Peak thread count of a JVM                                                                             |
| jvm_threads_started_total      | Counter | Started thread count of a JVM                                                                          |
| jvm_threads_deadlocked         | Gauge   | Cycles of JVM-threads that are in deadlock waiting to acquire object monitors or ownable synchronizers |
| jvm_threads_deadlocked_monitor | Gauge   | Cycles of JVM-threads that are in deadlock waiting to acquire object monitors                          |
| jvm_threads_state              | Gauge   | Current count of threads by state                                                                      |

#### Classloaders Metrics
| Name                         | Type    | Description                                                                             |
|------------------------------|---------|-----------------------------------------------------------------------------------------|
| jvm_classes_currently_loaded | Gauge   | The number of classes that are currently loaded in the JVM                              |
| jvm_classes_loaded_total     | Counter | The total number of classes that have been loaded since the JVM has started execution   |
| jvm_classes_unloaded_total   | Counter | The total number of classes that have been unloaded since the JVM has started execution |

## Load balancing

This section shows all metrics related to [broker load balancing](./concepts-broker-load-balancing-overview.md).

:::note

- Load balancing metrics are **not exposed by default**. If you want to access load balancing metrics, you need to expose them by setting the following configurations in the `broker.conf` or `standalone.conf` file and ensure that your cluster has an active producer or consumer.

  ```conf
  loadManagerClassName=org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl
  loadBalancerEnabled=true
  exposeBundlesMetricsInPrometheus=true // Add this configuration to standalone.conf
  ``````

- Metrics with an asterisk (*) are only available in the **extensible** load balancer.

:::

### LoadBalancing metrics

All the loadbalancing metrics are labeled with the following labels:

- cluster: cluster=\$\{pulsar_cluster\}. \$\{pulsar_cluster\} is the cluster name that you have configured in the `broker.conf` file.
- broker: broker=\$\{broker\}. \$\{broker\} is the IP address of the broker
- metric: metric="loadBalancing".

| Name | Type | Description |
| --- | --- | --- |
| pulsar_lb_bandwidth_in_usage | Gauge | The broker inbound bandwidth usage (in percent). |
| pulsar_lb_bandwidth_out_usage | Gauge | The broker outbound bandwidth usage (in percent). |
| pulsar_lb_cpu_usage | Gauge | The broker cpu usage (in percent). |
| pulsar_lb_directMemory_usage | Gauge | The broker process direct memory usage (in percent). |
| pulsar_lb_memory_usage | Gauge | The broker process memory usage (in percent). |
| pulsar_lb_resource_usage \{feature=max\}* |Gauge|The max resource usage of the bandwidth, CPU, memory, and direct_memory.|
| pulsar_lb_resource_usage \{feature=max_ema\}* | Gauge | The broker load score (WeightedMaxEMA).|

### BundleUnloading metrics

All the bundleUnloading metrics are labeled with the following labels:

- cluster: cluster=\$\{pulsar_cluster\}. \$\{pulsar_cluster\} is the cluster name that you have configured in the `broker.conf` file.
- bundle: bundle=\$\{bundle\}. \$\{bundle\} is the bundle range on this broker.
- metric: metric="bundleUnloading".

| Name                          | Type    | Description                                  |
|-------------------------------|---------|----------------------------------------------|
| pulsar_lb_unload_broker_total | Counter | Unload broker count in this bundle unloading |
| pulsar_lb_unload_bundle_total | Counter | Bundle unload count in this bundle unloading. If the value of `pulsar_lb_unload_bundle_total` is greater than zero, it means that the bundle has been unloaded. |
| pulsar_lb_unload_broker_breakdown_total\{result, reason\}* | Counter | Unload broker breakdown count grouped by result and reason labels.|
| pulsar_lb_resource_usage_stats\{feature=max_ema, stat=avg\}* | Gauge | The average of brokers' load scores.|
| pulsar_lb_resource_usage_stats\{feature=max_ema, stat=std\}*   | Gauge | The standard deviation of brokers' load scores. |

### BundleSplit metrics

All the bundleUnloading metrics are labeled with the following labels:

- cluster: cluster=\$\{pulsar_cluster\}. \$\{pulsar_cluster\} is the cluster name that you have configured in the `broker.conf` file.
- bundle: bundle=\$\{bundle\}. \$\{bundle\} is the bundle range on this broker.
- metric: metric="bundlesSplit".

| Name                          | Type    | Description                                                |
|-------------------------------|---------|------------------------------------------------------------|
| pulsar_lb_bundles_split_total | Counter | The total count of bundle split in this leader broker |
| pulsar_lb_bundles_split_breakdown_total\{result, reason\}* | Counter | Bundle split breakdown count grouped by the result and reason labels.|


### Bundle metrics

All the bundle metrics are labeled with the following labels:

- cluster: cluster=\$\{pulsar_cluster\}. \$\{pulsar_cluster\} is the cluster name that you have configured in the `broker.conf` file.
- broker: broker=\$\{broker\}. \$\{broker\} is the IP address of the broker
- bundle: bundle=\$\{bundle\}. \$\{bundle\} is the bundle range on this broker
- metric: metric="bundle".

| Name | Type | Description |
| --- | --- | --- |
| pulsar_bundle_msg_rate_in | Gauge | The total message rate coming into the topics in this bundle  (message per second). |
| pulsar_bundle_msg_rate_out | Gauge | The total message rate going out from the topics in this bundle  (message per second).  |
| pulsar_bundle_topics_count | Gauge | The topic count in this bundle.  |
| pulsar_bundle_consumer_count | Gauge | The consumer count of the topics in this bundle. |
| pulsar_bundle_producer_count | Gauge | The producer count of the topics in this bundle. |
| pulsar_bundle_msg_throughput_in | Gauge | The total throughput coming into the topics in this bundle (byte per second). |
| pulsar_bundle_msg_throughput_out | Gauge | The total throughput going out from the topics in this bundle (byte per second). |

### Bundle assign metrics

All the bundle assign metrics are labeled with the following labels:

- cluster: cluster=\$\{pulsar_cluster\}. \$\{pulsar_cluster\} is the cluster name you have configured in the `broker.conf` file.
- broker: broker=\$\{broker\}. \$\{broker\} is the IP address of the broker.
- bundle: bundle=\$\{bundle\}. \$\{bundle\} is the bundle range on this broker.
- metric: metric="assign".

| Name                                                     | Type    | Description                                                        |
|----------------------------------------------------------|---------|--------------------------------------------------------------------|
| pulsar_lb_assign_broker_breakdown_total\{result, reason\}* | Counter | Assign broker breakdown count grouped by result and reason labels. |

### Service unit state channel metrics

All the service unit state channel metrics are labeled with the following labels:

- cluster: cluster=\$\{pulsar_cluster\}. \$\{pulsar_cluster\} is the cluster name you have configured in the `broker.conf` file.
- metric: metric="sunitStateChn".

| Name                                                              | Type    | Description                                                                                                       |
|-------------------------------------------------------------------|---------|-------------------------------------------------------------------------------------------------------------------|
| pulsar_sunit_state_chn_owner_lookup_total\{result, state\}*         | Counter | The owner broker lookup counts grouped by the result and state labels.                                            |
| pulsar_sunit_state_chn_event_publish_ops_total\{result, event\}*    | Counter | The published message count of service unit (e.g., bundle) state changes grouped by the result and event labels   |
| pulsar_sunit_state_chn_subscribe_ops_total\{result, event\}*        | Counter | The subscribed message count of service unit (e.g., bundle) state changes grouped by the result and event labels. |
| pulsar_sunit_state_chn_inactive_broker_cleanup_ops_total\{result\}* | Counter | The counts of inactive broker cleanup operations grouped by the result label.                                     |
| pulsar_sunit_state_chn_orphan_su_cleanup_ops_total*               | Counter | The total count of orphan service unit (e.g., bundle) cleanup operations.                                         |
| pulsar_sunit_state_chn_owned_su_total*                            | Gauge   | The number of owned bundles.                                                                                      |
| pulsar_sunit_state_chn_su_tombstone_cleanup_ops_total*            | Counter | The total count of deleted service units (e.g., bundles) tombstone operations.                                    |
| pulsar_sunit_state_chn_cleanup_ops_total\{result=Failure\}*         | Counter | The total count of cleanup operation failures.                                                                    |

## Pulsar Functions

All the Pulsar Functions metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.
- *namespace*: `namespace=\$\{pulsar_namespace\}`. `\$\{pulsar_namespace\}` is the namespace name.

| Name                                              | Type    | Description                                                               |
|---------------------------------------------------|---------|---------------------------------------------------------------------------|
| pulsar_function_processed_successfully_total      | Counter | The total number of messages processed successfully.                      |
| pulsar_function_processed_successfully_1min_total | Counter | The total number of messages processed successfully in the last 1 minute. |
| pulsar_function_system_exceptions_total           | Counter | The total number of system exceptions.                                    |
| pulsar_function_system_exceptions_1min_total      | Counter | The total number of system exceptions in the last 1 minute.               |
| pulsar_function_user_exceptions_total             | Counter | The total number of user exceptions.                                      |
| pulsar_function_user_exceptions_1min_total        | Counter | The total number of user exceptions in the last 1 minute.                 |
| pulsar_function_process_latency_ms                | Summary | The process latency in milliseconds.                                      |
| pulsar_function_process_latency_ms_1min           | Summary | The process latency in milliseconds in the last 1 minute.                 |
| pulsar_function_last_invocation                   | Gauge   | The timestamp of the last invocation of the function.                     |
| pulsar_function_received_total                    | Counter | The total number of messages received from source.                        |
| pulsar_function_received_1min_total               | Counter | The total number of messages received from source in the last 1 minute.   |
| pulsar_function_user_metric_                      | Summary | The user-defined metrics.                                                 |

## Connectors

All the Pulsar connector metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.
- *namespace*: `namespace=\$\{pulsar_namespace\}`. `\$\{pulsar_namespace\}` is the namespace name.

Connector metrics contain **source** metrics and **sink** metrics.

- **Source** metrics

  | Name                                       | Type    | Description                                                                 |
  |--------------------------------------------|---------|-----------------------------------------------------------------------------|
  | pulsar_source_written_total                | Counter | The total number of records written to a Pulsar topic.                      |
  | pulsar_source_written_1min_total           | Counter | The total number of records written to a Pulsar topic in the last 1 minute. |
  | pulsar_source_received_total               | Counter | The total number of records received from source.                           |
  | pulsar_source_received_1min_total          | Counter | The total number of records received from source in the last 1 minute.      |
  | pulsar_source_last_invocation              | Gauge   | The timestamp of the last invocation of the source.                         |
  | pulsar_source_source_exception             | Gauge   | The exception from a source.                                                |
  | pulsar_source_source_exceptions_total      | Counter | The total number of source exceptions.                                      |
  | pulsar_source_source_exceptions_1min_total | Counter | The total number of source exceptions in the last 1 minute.                 |
  | pulsar_source_system_exception             | Gauge   | The exception from system code.                                             |
  | pulsar_source_system_exceptions_total      | Counter | The total number of system exceptions.                                      |
  | pulsar_source_system_exceptions_1min_total | Counter | The total number of system exceptions in the last 1 minute.                 |
  | pulsar_source_user_metric_                 | Summary | The user-defined metrics.                                                   |

- **Sink** metrics

  | Name                                     | Type    | Description                                                                                    |
  |------------------------------------------|---------|------------------------------------------------------------------------------------------------|
  | pulsar_sink_written_total                | Counter | The total number of records processed by a sink.                                               |
  | pulsar_sink_written_1min_total           | Counter | The total number of records processed by a sink in the last 1 minute.                          |
  | pulsar_sink_received_1min_total          | Counter | The total number of messages that a sink has received from Pulsar topics in the last 1 minute. |
  | pulsar_sink_received_total               | Counter | The total number of records that a sink has received from Pulsar topics.                       |
  | pulsar_sink_last_invocation              | Gauge   | The timestamp of the last invocation of the sink.                                              |
  | pulsar_sink_sink_exception               | Gauge   | The exception from a sink.                                                                     |
  | pulsar_sink_sink_exceptions_total        | Counter | The total number of sink exceptions.                                                           |
  | pulsar_sink_sink_exceptions_1min_total   | Counter | The total number of sink exceptions in the last 1 minute.                                      |
  | pulsar_sink_system_exception             | Gauge   | The exception from system code.                                                                |
  | pulsar_sink_system_exceptions_total      | Counter | The total number of system exceptions.                                                         |
  | pulsar_sink_system_exceptions_1min_total | Counter | The total number of system exceptions in the last 1 minute.                                    |
  | pulsar_sink_user_metric_                 | Summary | The user-defined metrics.                                                                      |

## Proxy

All the proxy metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.
- *kubernetes_pod_name*: `kubernetes_pod_name=\$\{kubernetes_pod_name\}`. `\$\{kubernetes_pod_name\}` is the Kubernetes pod name.

| Name | Type | Description |
|---|---|---|
| pulsar_proxy_active_connections | Gauge | Number of connections currently active in the proxy. |
| pulsar_proxy_new_connections | Counter | Counter of connections being opened in the proxy. |
| pulsar_proxy_rejected_connections | Counter | Counter for connections rejected due to throttling. |
| pulsar_proxy_binary_ops | Counter | Counter of proxy operations. |
| pulsar_proxy_binary_bytes | Counter | Counter of proxy bytes. |

## Pulsar transaction

All the transaction metrics are labeled with the following labels:

- *cluster*: `cluster=\$\{pulsar_cluster\}`. `\$\{pulsar_cluster\}` is the cluster name that you have configured in the `broker.conf` file.
- *coordinator_id*: `coordinator_id=\$\{coordinator_id\}`. `\$\{coordinator_id\}` is the coordinator id.

| Name                              | Type | Description |
|-----------------------------------|---|---|
| pulsar_txn_active_count           | Gauge | Number of active transactions. |
| pulsar_txn_created_total          | Counter | Number of created transactions. |
| pulsar_txn_committed_total        | Counter | Number of committed transactions. |
| pulsar_txn_aborted_total          | Counter | Number of aborted transactions of this coordinator. |
| pulsar_txn_timeout_total          | Counter | Number of timeout transactions. |
| pulsar_txn_append_log_total       | Counter | Number of append transaction logs. |
| pulsar_txn_execution_latency_le_* | Histogram | Transaction execution latency. <br /> Available latencies are as below: <br /><ul><li> latency="10" is TransactionExecutionLatency between (0ms, 10ms]</li> <li>latency="20" is TransactionExecutionLatency between (10ms, 20ms]</li><li>latency="50" is TransactionExecutionLatency between (20ms, 50ms]</li><li>latency="100" is TransactionExecutionLatency between (50ms, 100ms]</li><li>latency="500" is TransactionExecutionLatency between (100ms, 500ms]</li><li>latency="1000" is TransactionExecutionLatency between (500ms, 1000ms]</li><li>latency="5000" is TransactionExecutionLatency between (1s, 5s]</li><li>latency="15000" is TransactionExecutionLatency between (5s, 15s]</li><li>latency="30000" is TransactionExecutionLatency between (15s, 30s]</li><li>latency="60000" is TransactionExecutionLatency between (30s, 60s]</li><li>latency="300000" is TransactionExecutionLatency between (1m,5m]</li><li>latency="1500000" is TransactionExecutionLatency between (5m,15m]</li><li>latency="3000000" is TransactionExecutionLatency between (15m,30m]</li><li>latency="overflow" is TransactionExecutionLatency between (30m,∞]</li></ul>|
| pulsar_txn_tb_client_abort_failed_total | Counter | The number of failures to abort transactions for `transaction buffer client`. |
| pulsar_txn_tb_client_commit_failed_total | Counter | The number of failures to commit transaction for `transaction buffer client`. |
| pulsar_txn_tb_client_abort_latency | Summary | The latency of aborting transactions for `transaction buffer client`. |
| pulsar_txn_tb_client_commit_latency | Summary | The latency of committing transactions for `transaction buffer client`. |
| pulsar_txn_tb_client_pending_requests | Counter | The number of pending requests for `transaction buffer client`. |
| pulsar_txn_tp_committed_count_total | Counter | The number of committed transactions for pending ack store. |
| pulsar_txn_tp_aborted_count_total | Counter | The number of aborted transactions for pending ack store. |
| pulsar_txn_tp_commit_latency | Summary | The latency of committing transactions for `transaction pending ack handle`. |
