---
id: performance-broker
title: Broker performance and memory tuning
sidebar_label: Broker performance and memory tuning
description: Tune JVM memory and Linux hosts, and understand storage-read, dispatch, and cache defaults for broker performance.
---

Broker storage reads, dispatch, and memory allocation have separate controls. Benchmark with representative message sizes, batching, backlogs, and subscription counts before changing them. Compare publish latency and backlog-draining latency as well as throughput, CPU, direct memory, and process memory. The [Pulsar performance tools](performance-pulsar-perf.md) can generate repeatable workloads.

## JVM and Linux host tuning

Use **Java 25 with ZGC** and leave `PULSAR_GC` unset so that the server launcher supplies its default garbage-collector options. Remove inherited overrides from service environments, container configuration, and deployment templates. Java 21 remains supported but is not recommended for performance deployments; its generational ZGC requires both `-XX:+UseZGC` and `-XX:+ZGenerational`, which the server launcher selects automatically. On Java 25, `-XX:+UseZGC` selects generational ZGC without the additional flag.

### Size and prepare the heap

The standard server launcher defaults `PULSAR_MEM` to `-Xms2g -Xmx2g -XX:MaxDirectMemorySize=4g`: a 2 GiB initial and maximum heap, with a 4 GiB direct-memory limit. Its default `PULSAR_GC` options enable ZGC, `-XX:+PerfDisableSharedMem`, and `-XX:+AlwaysPreTouch`. Transparent huge pages are not enabled by the default launcher options. Deployment templates can override these defaults.

For high performance, set `-Xms` equal to `-Xmx` in `PULSAR_MEM` and include `-XX:+UseTransparentHugePages -XX:+AlwaysPreTouch`. For example, on a host configured for transparent huge pages (THP):

```shell
export PULSAR_MEM='-Xms8g -Xmx8g -XX:MaxDirectMemorySize=8g -XX:+UseTransparentHugePages -XX:+AlwaysPreTouch'
```

These sizes are illustrative. Budget for heap, direct memory, other native allocations, and the operating system; in Kubernetes, leave room for those allocations within the container's memory limit. A fixed heap avoids heap expansion during traffic, and pre-touching prepares heap pages at startup instead of on first use. Allow for the resulting startup time and committed memory when configuring startup probes and scheduling pods. Keep the collector defaults in `PULSAR_GC`; place memory sizing and these memory-related options in `PULSAR_MEM`.

### Configure Linux hosts and Kubernetes nodes

THP can reduce address-translation overhead for large heaps. ZGC uses shared memory for its heap, so setting only `-XX:+UseTransparentHugePages` is insufficient if Linux disables THP for shared memory. In particular, `shmem_enabled=never` prevents that heap from benefiting. The configuration below follows the [Netflix generational ZGC tuning guidance](https://netflixtechblog.com/bending-pause-times-to-your-will-with-generational-zgc-256629c9386b).

For Kubernetes, configure the **nodes that run Pulsar**, including replacement and autoscaled nodes. Pod JVM options do not configure the host kernel. Persist settings through the node image or provisioning configuration, and verify them after reboot. On Linux servers, a custom `tuned` profile can manage these settings; alternatively, use `sysfsutils` for THP and `sysctl` for swappiness. Use one configuration mechanism consistently so that another profile does not overwrite the settings.

The defaults for the THP controls below depend on the kernel build, distribution, and node provisioning; Pulsar does not set them. Check the effective values on each host before tuning.

On a distribution with `sysfsutils` installed and support for `/etc/sysfs.d/` and `sysfsutils.service`, persist the THP settings as follows:

```shell
sudo mkdir -p /etc/sysfs.d
cat <<'EOF' | sudo tee /etc/sysfs.d/transparent_hugepage.conf
# Permit Java processes to request transparent huge pages, including ZGC's shared heap.
kernel/mm/transparent_hugepage/enabled=madvise
kernel/mm/transparent_hugepage/shmem_enabled=advise
kernel/mm/transparent_hugepage/defrag=defer
kernel/mm/transparent_hugepage/khugepaged/defrag=1
EOF
sudo systemctl enable sysfsutils.service
sudo systemctl restart sysfsutils.service
```

`madvise` and `advise` allow applications to request THP for their mappings. `defrag=defer` moves allocation-time reclaim and compaction work to the background, while `khugepaged/defrag=1` allows the background huge-page daemon to compact memory. See the [Linux THP documentation](https://docs.kernel.org/admin-guide/mm/transhuge.html) for kernel-specific controls.

The Linux kernel default for `vm.swappiness` is **60**, although distributions and node profiles can override it. Where swap is enabled, use a low swappiness value to strongly favor keeping application memory resident:

```shell
cat <<'EOF' | sudo tee /etc/sysctl.d/99-tune-swappiness.conf
# Strongly reduce the preference for swapping anonymous memory.
vm.swappiness=1
EOF
sudo sysctl -p /etc/sysctl.d/99-tune-swappiness.conf
```

`vm.swappiness=1` does not disable swap or guarantee that swapping occurs only as a last resort. It changes the relative reclaim preference; see the [Linux swappiness documentation](https://docs.kernel.org/admin-guide/sysctl/vm.html#swappiness). Keep the node's existing Kubernetes swap policy; this tuning does not require enabling swap.

Verify the effective host settings, including after node replacement:

```shell
cat /sys/kernel/mm/transparent_hugepage/enabled
cat /sys/kernel/mm/transparent_hugepage/shmem_enabled
cat /sys/kernel/mm/transparent_hugepage/defrag
cat /sys/kernel/mm/transparent_hugepage/khugepaged/defrag
sysctl vm.swappiness
```

The THP choice lists show the active value in brackets. Confirm `madvise`, `advise`, `defer`, and `1`, respectively. Compare tail latency, CPU use, page faults, and memory pressure under representative load; enabling THP permits huge-page use but does not guarantee every allocation receives a huge page.

## Bound outstanding reads

`managedLedgerMaxReadsInFlightSizeInMB` limits the memory retained by outstanding storage and cache reads until their data is delivered to the consumer's Netty channel. This provides read backpressure; it is separate from the managed-ledger entry-cache size.

In Pulsar **5.0.0 and later**, the default limit is the greater of **15% of JVM direct memory** and `dispatcherMaxReadSizeBytes` (default **5,242,880 bytes**, or **5 MiB**), expressed in MB.

If permits are exhausted, reads wait up to `managedLedgerMaxReadsInFlightPermitsAcquireTimeoutMillis` (default 60,000 ms), with up to `managedLedgerMaxReadsInFlightPermitsAcquireQueueSize` queued requests (default 50,000). Inspect the [in-flight read metrics](reference-metrics-opentelemetry.md) alongside consumer throughput before increasing these limits. Increasing the queue is not a substitute for enough consumer and storage capacity.

## BookKeeper batch reads

`managedLedgerBatchReadEnabled` (default **`true`**) enables fetching multiple stored entries in one BookKeeper request. This reduces per-entry request overhead, especially when draining backlogs of small entries. It does not change producer message batching.

The path also requires the BookKeeper v2 wire protocol (`bookkeeperUseV2WireProtocol`, default **`true`**) and the BookKeeper client setting `bookkeeper_batchReadEnabled` (default **`true`**). These client capabilities are checked when a topic is loaded. Pulsar uses regular reads when the requirements are not met, for striped ledgers whose ensemble and write quorum differ, or for bookies without batch-read support.

A request is bounded by the dispatcher's read-size limit and the BookKeeper client's maximum frame size. Larger reads are split into sequential requests. Entries obtained through batch reads are copied when inserted into the entry cache, so retaining one small entry does not retain the whole batch response frame. This copy occurs even when `managedLedgerCacheCopyEntries=false` (the default). These copies use the `ml-cache` allocator; keep `pulsar.allocator.ml-cache.type` at its default, **`adaptive`**, for this allocation pattern.

The default `dispatcherMaxReadBatchSize` is **500 entries**. This is a maximum rather than a guarantee of 500 entries per read. Compare latency, outstanding read memory, and backlog throughput when evaluating a larger batch size.

## Key_Shared replay look-ahead

When a slow consumer or an ordering constraint blocks a key, a persistent `Key_Shared` subscription can read ahead and queue messages for replay while looking for messages it can dispatch to other consumers. The dispatcher bounds this look-ahead before starting another normal read.

With both limits positive, the replay threshold is the smaller of:

- `keySharedLookAheadMsgInReplayThresholdPerConsumer` (default 4,000) multiplied by the connected consumer count.
- `keySharedLookAheadMsgInReplayThresholdPerSubscription` (default 40,000).

A read started below the threshold can add one read batch beyond it, so this is a bound with one-batch overflow. Normal reads pause at the threshold while replayed messages drain; consumers for other keys can temporarily become idle as a result. For workloads with few distinct keys, compare consumer utilization, replay depth, cache hits, and storage reads before increasing both limits.

Setting either look-ahead limit to `0` disables that component of the calculation. If both are disabled, the dispatcher falls back to the configured per-consumer and per-subscription unacknowledged-message limits. These look-ahead settings support dynamic configuration.

## Acknowledgment tracking

Individual acknowledgment tracking uses the bitmap implementation. `managedLedgerPersistIndividualAckAsLongArray` (default **`true`**) selects the persisted acknowledgment format; the default stores the bitmap as an array of long values. See the [upgrade guide](administration-upgrade.md) for compatibility changes to acknowledgment persistence settings.

## Cache retention and allocation

`managedLedgerCacheSizeMB` controls the logical size of the shared entry cache. Its default is **20% of JVM direct memory**, expressed in MB, with a minimum of **64 MB**. It does not cap all direct memory or the process's resident memory. Allocators, network buffers, outstanding reads, and other broker state consume additional memory.

By default, `managedLedgerCacheEvictionExtendTTLOfRecentlyAccessed=false`: merely reading an entry does not extend its cache lifetime. The separate expected-read-count mechanism can still extend retention for entries with remaining expected reads, subject to its configured limit. Changing the recently-accessed setting can affect cache reuse for replay and lagging consumers; measure cache hits and storage reads as well as memory.

The standard server launcher selects Netty's **adaptive** allocator for general Pulsar operations and Netty buffers. Managed-ledger cache copies use a separate allocator named `ml-cache`, also adaptive by default. Adaptive allocation still pools memory; logical cache usage and process memory need not fall together after eviction.

Keep the `ml-cache` allocator adaptive, especially with `managedLedgerBatchReadEnabled=true` (the default), because batch reads copy entries into cache buffers. The default for `pulsar.allocator.ml-cache.type` is **`adaptive`**.

Allocator choices are JVM startup settings. To restore the previous pooled allocator for general Pulsar operations, add `-Dpulsar.allocator.default.type=pooled` to the existing `PULSAR_EXTRA_OPTS` value (unset by default) and restart the broker. Netty's own allocator can be restored separately with `-Dio.netty.allocator.type=pooled`. Both settings default to **`adaptive`** in the standard server launcher. Use these named settings to keep the cache allocator adaptive. The global `pulsar.allocator.type` (unset by default) also affects the cache allocator and does not override the launcher's named `default` selection.

For leak detection, use the global Netty property `io.netty.leakDetection.level` (the broker launcher default is **`disabled`**). See the [upgrade guide](administration-upgrade.md) for obsolete allocator properties. See [allocator metrics](reference-metrics.md) when comparing allocator choices.

## Heap retained by queues

Pulsar stores the priority queues used by bucket-based delayed delivery and transaction timeout tracking in JVM heap arrays. Include heap occupancy and GC pauses in performance measurements for workloads with many delayed messages or open transactions. The default in-memory delayed-delivery tracker uses a bitmap index.

Single-thread executors created through Pulsar's shared executor factory also reclaim spare task-queue capacity after bursts. Background maintenance starts when their estimated backing-array storage exceeds 5% of maximum heap and attempts to reduce it toward 4%. These percentages count array slots, excluding task objects and array headers. This is a retention target, not a hard memory limit or admission-control setting: live tasks are retained, busy queues may not shrink, and GC determines when the old arrays are reclaimed.

## Scheduling and batching tradeoffs

The default `dispatcherDispatchMessagesInSubscriptionThread=false` avoids an extra subscription-thread handoff during dispatch. `bookkeeperClientSeparatedIoThreadsEnabled` (default **`true`**) gives the BookKeeper client separate I/O threads. Keep these defaults unless measurements identify a reason to change them. Configurations with compute-heavy server-side broker entry filters may benefit from `dispatcherDispatchMessagesInSubscriptionThread=true`. This is not a general recommendation; test it separately under representative load and compare throughput, latency, and CPU use.

`managedLedgerReadEntriesCallbackInline` (default **`true`**) lets successful ordinary multi-entry reads complete on the calling thread; a cache hit can complete before the read method returns. The policy is captured when a managed ledger opens, so changing it does not affect already loaded topics. The JVM startup property `pulsar.managedLedger.maxReadCompletionDepth` bounds nested inline completions (default 10). Custom managed-ledger integrations must not assume asynchronous completion or a particular callback thread.

Publish requests are handed to the managed-ledger executor in batches controlled by `managedLedgerAddEntryHandoverMaxBatchItems` (default 1,024) and `managedLedgerAddEntryHandoverMaxBatchBytesSize` (default 5 MiB). Handover batching can change publishing patterns by grouping requests before execution. In tests, it has greatly improved performance. A larger batch reduces scheduling overhead but can delay other work sharing the executor. Set the item limit to `0` or `1` to disable handover batching. Set the byte limit to `0` to limit only by item count. A batch always accepts at least one entry, even when that entry exceeds the byte threshold.

Although the handover limits support dynamic configuration, updates apply only to managed ledgers opened after the change. Already open ledgers keep their captured values. Plan any unloads separately and account for their impact on clients.
