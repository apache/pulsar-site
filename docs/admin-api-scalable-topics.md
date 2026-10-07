---
id: admin-api-scalable-topics
title: Manage scalable topics
sidebar_label: "Administration"
description: Create, inspect, migrate, and manage scalable topics with pulsar-admin, the REST API, or the Java admin client.
---

:::note

For the concepts behind this feature, see [Scalable topics](concepts-scalable-topics.md).

:::

This page covers administering scalable topics. To **produce and consume**, use a client with [v5 API support](concepts-scalable-topics.md#requirements); this page is about creating and operating the topics themselves.

Administration is available through the `pulsar-admin scalable-topics` CLI, the REST API under `/admin/v2/scalable`, and the Java admin client (`PulsarAdmin.scalableTopics()`). Some operations, such as rebucketing and policy overrides, are available only through REST and Java. The examples below lead with the CLI; the [REST API reference](#rest-api-reference) lists the topic-level endpoints.

The broker setting `scalableTopicsEnabled` must be `true` (the default). When it is `false`, the scalable-topic REST API is not registered and clients cannot access scalable topics. Changing this setting requires a broker restart.

In the commands below, a topic is identified by its `tenant/namespace/topic` name (without a URL scheme).

With authorization enabled, the parent API checks the corresponding namespace or topic permission for listing, creation, deletion, metadata, stats, and subscription operations. Manual split, merge, and rebucket operations require superuser access. Low-level segment lifecycle and cursor endpoints are intended for the controller and require superuser access; use the parent API for subscription administration.

## Create a scalable topic

A scalable topic is created with an initial number of segments. Start small -- one segment is the default -- and let [auto split/merge](concepts-scalable-topics.md#how-it-works) grow it to fit the load.

```shell
bin/pulsar-admin scalable-topics create my-tenant/my-namespace/my-topic --segments 1
```

| Option | Description | Default |
|--------|-------------|---------|
| `-s`, `--segments` | Number of initial segments | `1` |
| `-p`, `--property` | A `key=value` property; repeat for multiple | -- |

Java admin client:

```java
admin.scalableTopics().createScalableTopic("my-tenant/my-namespace/my-topic", 1);
```

V5 producers and consumers can also create a missing `topic://` topic on lookup, with one initial segment, when the broker or namespace auto-topic-creation policy allows it. Namespace-wide topic discovery does not create missing topics. Use explicit creation when you need properties or a different initial segment count.

## List scalable topics

List every scalable topic in a namespace:

```shell
bin/pulsar-admin scalable-topics list my-tenant/my-namespace
```

Filter to topics carrying specific properties (repeat `-p` to AND multiple filters):

```shell
bin/pulsar-admin scalable-topics list my-tenant/my-namespace -p team=ingest -p tier=gold
```

Filters match exact values. The CLI also accepts `-p team=ingest,tier=gold`; each `-p` consumes one argument. With Java, use `listScalableTopicsByProperties(namespace, Map.of("team", "ingest", "tier", "gold"))`. With REST, repeat the `property` query parameter, for example `?property=team%3Dingest&property=tier%3Dgold`. An empty filter lists all scalable topics. Filtering works with both ZooKeeper and Oxia; stores without native secondary indexes scan the namespace's topic records.

## Inspect a scalable topic

Get the topic metadata -- the segment DAG, including each segment's hash range and state:

```shell
bin/pulsar-admin scalable-topics get-metadata my-tenant/my-namespace/my-topic
```

Get aggregated runtime stats:

```shell
bin/pulsar-admin scalable-topics stats my-tenant/my-namespace/my-topic
```

The response includes aggregate traffic and storage, producers, subscriptions and their per-segment backlog, and `layout.segments`. Each layout entry includes its name, state, parent and child IDs, entry-bucket count, and owning broker. Both active and sealed segments appear in the layout. If a segment's stats cannot be collected, its `ownerBroker` is `null` and it contributes nothing to the aggregates, so these totals may be incomplete.

Inspect a single segment using its `name` from `layout.segments`:

```shell
bin/pulsar-admin scalable-topics segment-stats \
  'segment://my-tenant/my-namespace/my-topic/0000-7fff-3'
```

The hash bounds are hexadecimal and the segment ID is decimal. They are illustrative here; use the exact name returned by `stats`. With Java, you can address the same segment by topic and ID:

```java
admin.scalableTopics().getSegmentStats("my-tenant/my-namespace/my-topic", 3);
```

## Manage subscriptions

Use the parent scalable-topic API to manage subscriptions across its segment DAG. Creating a subscription explicitly creates cursors at the earliest position on the **currently active** segments; it does not create cursors on already sealed predecessors. To reserve backlog before consumers connect, create the subscription before publishing:

```java
admin.scalableTopics().createSubscription("my-tenant/my-namespace/my-topic",
        "my-sub", ScalableSubscriptionType.STREAM);
```

`ScalableSubscriptionType` is in `org.apache.pulsar.common.policies.data`. Choose `STREAM` for stream consumers or `QUEUE` for queue consumers. Repeating creation is idempotent and does not change an existing subscription's type or reset its cursors. Creation and deletion are available through Java and REST, with no corresponding scalable-topic CLI commands. Deletion unregisters coordinated consumers, removes the subscription metadata, and attempts to remove its cursors across active and sealed segments. Per-segment cursor cleanup is best effort; cleanup failures are logged by the broker:

```java
admin.scalableTopics().deleteSubscription("my-tenant/my-namespace/my-topic", "my-sub");
```

Reset a subscription to a point in the past (the offset is relative to now -- accepts units such as `30m`, `1h`, `5d`):

```shell
bin/pulsar-admin scalable-topics seek my-tenant/my-namespace/my-topic \
  --subscription my-sub --time 1h
```

Skip all undelivered messages on a subscription, across every segment:

```shell
bin/pulsar-admin scalable-topics clear-backlog my-tenant/my-namespace/my-topic \
  --subscription my-sub
```

Java's `seekSubscription(topic, subscription, timestampMs)` and REST's `seek?timestamp=...` accept wall-clock milliseconds since the Unix epoch. Seeking and clearing backlog operate on all segments still present in the DAG, including sealed predecessors. They cannot restore data removed by retention. These are per-segment operations, so a failure can leave some cursors changed; investigate the error and retry the parent operation when appropriate. A transient segment unload or ownership change is reported as an error, while a missing per-segment subscription is tolerated.

## Split and merge segments

Splitting a hot segment and merging cold adjacent segments normally happens **automatically** (see [auto split/merge](concepts-scalable-topics.md#how-it-works)). The commands below let you trigger them manually -- for testing, or to pre-scale ahead of a known traffic event.

Split one segment into two halves of its hash range:

```shell
bin/pulsar-admin scalable-topics split-segment my-tenant/my-namespace/my-topic --segment-id 3
```

Merge two adjacent segments back into one:

```shell
bin/pulsar-admin scalable-topics merge-segments my-tenant/my-namespace/my-topic \
  --segment-id-1 3 --segment-id-2 4
```

Segment IDs come from `get-metadata`. Both operations require active segments and superuser access. Merging requires the two segments to own adjacent hash ranges.

### Rebucket a segment

To change consumer parallelism within a segment, change its entry-bucket count. The controller seals the active segment and creates a successor covering the same hash range; the predecessor drains under its old bucket layout. This operation requires superuser access and is available through Java and REST:

```java
admin.scalableTopics().rebucketSegment("my-tenant/my-namespace/my-topic", 3, 8);
```

The new bucket count must differ from the current count and be between `1` and `scalableTopicEntryBucketMaxPerSegment` (default `1024`). Use a new segment ID from the updated metadata for subsequent operations. See [Entry buckets and consumer parallelism](concepts-scalable-topics.md#entry-buckets-and-consumer-parallelism).

## Configure auto split/merge

Auto split/merge is **on by default**: each topic's controller splits any segment whose load crosses the split thresholds and merges adjacent segments that stay cold below the merge thresholds. It is configured at three levels, and the most specific value wins **per setting**:

1. **Broker defaults** in `broker.conf` (cluster-wide).
2. **Per-namespace override**.
3. **Per-topic override**.

An override only sets the fields it changes; unset fields inherit from the level above.

Stream and grouped checkpoint consumer counts also drive scale-up. Below `scalableTopicSplitVsRebucketMinMsgRateInThreshold`, or when the topic reaches its segment ceiling, the controller increases entry-bucket capacity for stream consumers instead of adding physical segments; grouped checkpoint consumers drive only splits, because each member reads whole segments. Queue consumer counts do not drive this behavior. Automatic merges preserve the entry-bucket parallelism that stream consumers currently use, subject to the per-segment bucket ceiling. A checkpoint consumer group uses at most one member per segment, so a merge can leave one of its members idle.

### Broker defaults (`broker.conf`)

| Setting | Description | Default |
|---------|-------------|---------|
| `scalableTopicAutoScaleEnabled` | Master switch for auto split/merge. When `false`, segments change only via manual `split-segment` / `merge-segments`. | `true` |
| `scalableTopicMaxSegments` | Ceiling on active segments for automatic scaling; automatic splits stop once reached. | `64` |
| `scalableTopicMinSegments` | Floor on active segments for automatic scaling; automatic merges stop once reached. | `1` |
| `scalableTopicEntryBucketBudget` | Entry-bucket budget distributed across a topic's initial segments, with at least one bucket per segment. | `4` |
| `scalableTopicEntryBucketMaxPerSegment` | Maximum entry-bucket count per segment, for automatic and manual rebucketing. | `1024` |
| `scalableTopicMaxDagDepth` | Maximum merges in a segment's lineage; bounds split/merge flip-flopping (limits merges only -- splits are unaffected). | `10` |
| `scalableTopicSplitCooldownSeconds` | Minimum time between automatic splits on a topic (short -- only coalesces a burst of near-simultaneous triggers). | `60` |
| `scalableTopicSplitVsRebucketMinMsgRateInThreshold` | Inbound messages/second at or above which consumer-driven scale-up can split the busiest segment; below it, scale up entry buckets for stream consumers. | `1000` |
| `scalableTopicRebucketCooldownSeconds` | Minimum time between automatic rebuckets on a topic. | `60` |
| `scalableTopicMergeCooldownSeconds` | Minimum time between automatic merges on a topic. | `300` |
| `scalableTopicMergeWindowSeconds` | How long a segment must stay continuously below every merge threshold before it becomes merge-eligible. | `300` |
| `scalableTopicSplitMsgRateInThreshold` | Inbound messages/second above which a segment is split. | `10000` |
| `scalableTopicSplitBytesRateInThreshold` | Inbound bytes/second above which a segment is split. | `50000000` (50 MB/s) |
| `scalableTopicSplitMsgRateOutThreshold` | Outbound (dispatched) messages/second above which a segment is split. | `50000` |
| `scalableTopicSplitBytesRateOutThreshold` | Outbound bytes/second above which a segment is split. | `250000000` (250 MB/s) |
| `scalableTopicMergeMsgRateInThreshold` | Inbound messages/second below which a segment counts as cold for merging. | `1000` |
| `scalableTopicMergeBytesRateInThreshold` | Inbound bytes/second below which a segment counts as cold. | `5000000` (5 MB/s) |
| `scalableTopicMergeMsgRateOutThreshold` | Outbound messages/second below which a segment counts as cold. | `5000` |
| `scalableTopicMergeBytesRateOutThreshold` | Outbound bytes/second below which a segment counts as cold. | `25000000` (25 MB/s) |
| `scalableTopicAutoScaleIntervalSeconds` | Cadence of the controller's periodic traffic-driven evaluation. Consumer-count changes are handled immediately, independent of this interval. | `60` |
| `scalableTopicLoadReportIntervalSeconds` | How often a segment-owning broker samples segment load for auto-scaling. | `10` |
| `scalableTopicLoadReportRateChangeThreshold` | Minimum relative change in a segment's rate (`0.25` = 25%) since the last report that triggers a new load record; bounds metadata write volume. | `0.25` |

:::tip

Split thresholds sit well above the corresponding merge thresholds on purpose -- the gap between them is the hysteresis that stops a just-split segment from immediately re-merging. Preserve that ordering when you tune them.

Most of these settings are dynamic: apply them at runtime with `pulsar-admin brokers update-dynamic-config` without restarting. `scalableTopicLoadReportIntervalSeconds` is read at broker startup, and `scalableTopicAutoScaleIntervalSeconds` is read when a controller acquires leadership; neither supports dynamic configuration updates.

Load reports are written only when rates change enough relative to the last report. Consequently, a rate can cross a split threshold without causing a split if it remains within that change band. Lower `scalableTopicLoadReportRateChangeThreshold` for closer tracking, at the cost of more metadata writes.

:::

### Per-namespace and per-topic overrides

Both override levels support these optional fields (unset means inherit): `enabled`, `maxSegments`, `minSegments`, `maxDagDepth`, `splitCooldownSeconds`, `rebucketCooldownSeconds`, `splitVsRebucketMinMsgRateInThreshold`, `mergeCooldownSeconds`, `mergeWindowSeconds`, and the eight `split*`/`merge*` rate thresholds. The entry-bucket budget and per-segment bucket ceiling are broker settings only.

Overrides are set through the Java admin client or REST -- there is no `pulsar-admin` subcommand for them yet:

```java
AutoScalePolicyOverride override = AutoScalePolicyOverride.builder()
        .maxSegments(128)
        .splitMsgRateInThreshold(20_000.0)
        .build();

// Namespace level -- applies to every scalable topic in the namespace
admin.namespaces().setScalableTopicAutoScalePolicy("my-tenant/my-namespace", override);

// Topic level -- narrowest scope, wins over namespace and broker
admin.scalableTopics().setAutoScalePolicy("my-tenant/my-namespace/my-topic", override);
```

Read or clear an override with the matching `getScalableTopicAutoScalePolicy` / `removeScalableTopicAutoScalePolicy` (namespace) and `getAutoScalePolicy` / `removeAutoScalePolicy` (topic) methods.

Setters replace the stored override object, so include every override field you want to retain. Getters return the stored override, rather than the fully resolved policy. The effective combination must have positive split thresholds above their matching merge thresholds, non-negative cooldowns, and `minSegments <= maxSegments`. Invalid overrides are rejected. Later changes to inherited settings can invalidate a topic's effective policy; the controller then disables automatic scaling for that topic until the combination is valid again. Review topic overrides when changing namespace or broker defaults.

### Disable auto-scaling

To run a topic with manual scaling only, set `scalableTopicAutoScaleEnabled=false` cluster-wide, or apply an override with `enabled=false` at the namespace or topic level. This disables automatic splits, merges, and rebucketing; the topic remains available and manual operations still work. Sealed-segment retention cleanup continues.

## Migrate a regular topic

An existing partitioned or non-partitioned topic can be migrated in place to a scalable topic, with no data copy:

```shell
bin/pulsar-admin scalable-topics migrate my-tenant/my-namespace/my-topic
```

The source must be an existing persistent partitioned or non-partitioned topic. Migration is **one-way** -- a scalable topic cannot be converted back.

1. Upgrade all producers and consumers to the v5 client while they still use the source `persistent://` name. The v5 client supports regular topics using a synthetic segment layout.
2. Disconnect any remaining v4 clients. Migration is rejected while they are connected, unless you pass `--force`. Forcing migration does not make v4 clients compatible with scalable topics: the old topic is terminated and accepts no more writes.
3. Run `migrate`. The broker creates active successor segments and retains the old topics as sealed predecessors. Connected v5 clients follow the layout update, and consumers drain the predecessor data before consuming its successors.
4. Use the `topic://` name for new client configurations and the scalable-topic admin API for subsequent administration. Inspect `stats` to track the transition and remaining predecessor backlog.

## Delete a scalable topic

```shell
bin/pulsar-admin scalable-topics delete my-tenant/my-namespace/my-topic
```

Pass `--force` to delete even when the topic has active subscriptions.

## REST API reference

[OpenAPI documentation](pathname:///admin-rest-api/?version=@pulsar:rest_api_version@#tag/scalable-topic)

All endpoints are under `/admin/v2/scalable` and take `tenant`, `namespace`, and (except for list) `topic` as path parameters.

| Method & path | Operation |
|---------------|-----------|
| `GET /{tenant}/{namespace}` | List scalable topics in a namespace |
| `PUT /{tenant}/{namespace}/{topic}` | Create a scalable topic |
| `GET /{tenant}/{namespace}/{topic}` | Get topic metadata (segment DAG) |
| `GET /{tenant}/{namespace}/{topic}/stats` | Get aggregated stats |
| `GET /{tenant}/{namespace}/{topic}/segments/{segmentId}/stats` | Get one segment's stats |
| `DELETE /{tenant}/{namespace}/{topic}` | Delete a scalable topic |
| `POST /{tenant}/{namespace}/{topic}/migrate` | Migrate a regular topic to scalable |
| `POST /{tenant}/{namespace}/{topic}/split/{segmentId}` | Split a segment |
| `POST /{tenant}/{namespace}/{topic}/rebucket/{segmentId}?bucketCount={count}` | Roll over to a same-range segment with a new entry-bucket count |
| `POST /{tenant}/{namespace}/{topic}/merge/{segmentId1}/{segmentId2}` | Merge two adjacent segments |
| `GET /{tenant}/{namespace}/{topic}/autoScalePolicy` | Get the topic's auto split/merge override |
| `POST /{tenant}/{namespace}/{topic}/autoScalePolicy` | Set the topic's auto split/merge override |
| `DELETE /{tenant}/{namespace}/{topic}/autoScalePolicy` | Remove the topic's auto split/merge override |
| `PUT /{tenant}/{namespace}/{topic}/subscriptions/{subscription}` | Create a subscription |
| `DELETE /{tenant}/{namespace}/{topic}/subscriptions/{subscription}` | Delete a subscription |
| `POST /{tenant}/{namespace}/{topic}/subscriptions/{subscription}/seek` | Seek a subscription to a timestamp |
| `POST /{tenant}/{namespace}/{topic}/subscriptions/{subscription}/skip-all` | Clear a subscription's backlog |
