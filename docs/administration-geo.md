---
id: administration-geo
title: Pulsar geo-replication
sidebar_label: "Geo-replication"
description: Get a comprehensive understanding of geo-replication in Pulsar.
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````


## Enable geo-replication for a namespace

You must enable geo-replication on a [per-tenant basis](#concepts-multi-tenancy) in Pulsar. For example, you can enable geo-replication between two specific clusters only when a tenant has access to both clusters.

Geo-replication is managed at the namespace level, which means you only need to create and configure a namespace to replicate messages between two or more provisioned clusters that a tenant can access.

Complete the following tasks to enable geo-replication for a namespace:

* [Enable a geo-replication namespace](#enable-geo-replication-at-namespace-level)
* [Configure that namespace to replicate across two or more provisioned clusters](admin-api-namespaces.md#configure-replication-clusters)

### Replication configuration settings

The target clusters for replication of a message are determined by a hierarchy of settings at the tenant, namespace, topic, and message level:

* **Tenant `allowed-clusters`**: Specifies which clusters the tenant is permitted to use for replication. An empty value means all clusters are allowed. Note that this setting cannot be modified once the tenant has existing namespaces, so it must be configured before creating any namespaces under the tenant.

* **Namespace `clusters`**: Defines the default set of clusters that messages in the namespace are replicated to.

* **Namespace `allowed-clusters`**: Further restricts which clusters are permitted for replication at the namespace level, overriding the tenant-level setting. Introduced in [PIP-321](https://github.com/apache/pulsar/blob/master/pip/pip-321.md).

* **Topic-level policies**: Can override the namespace-level `clusters` setting for a specific topic. Topic policies can be **local** (applying only to the local cluster) or **global** (replicated to all clusters in the geo-replication set, see [PIP-92](https://github.com/apache/pulsar/blob/master/pip/pip-92.md)). Note that `allowed-clusters` has not been implemented at the topic level; [PIP-321](https://github.com/apache/pulsar/blob/master/pip/pip-321.md) mentions that it could be added in the future.

* **Message-level replication control**: Producers can override which clusters a specific message is replicated to using the [`replicationClusters`](/api/client/4.1.x/org/apache/pulsar/client/api/TypedMessageBuilder.html#replicationClusters(java.util.List)) method in the client API, or disable replication entirely for a message using [`disableReplication`](/api/client/4.1.x/org/apache/pulsar/client/api/TypedMessageBuilder.html#disableReplication()) (see [Selective replication](#selective-replication)). Note that these settings cannot override the `allowed-clusters` configuration — messages can only be routed to clusters that are permitted by the resolved `allowed-clusters` settings.

The `clusters` and `allowed-clusters` settings are resolved hierarchically. When the tenant-level `allowed-clusters` is non-empty, all clusters specified in namespace-level `allowed-clusters` must be a subset of it — this is validated when `allowed-clusters` is modified at the namespace level. Namespace-level `allowed-clusters` can further restrict the tenant-level configuration, and topic-level policies can override the namespace-level `clusters` setting for a specific topic.

### 1-way and 2-way geo-replication

Geo-replication can be configured as 1-way or 2-way:

* **2-way replication**: Messages flow in both directions (`us-west` ↔ `us-east`). For 2-way replication to work, the resolved hierarchical `allowed-clusters` configuration must include both clusters (so neither is blocked from replicating to the other), and the resolved hierarchical `clusters` configuration must include both clusters (so messages are sent to both by default).

* **1-way replication**: Messages flow in one direction only (for example, `us-west` → `us-east`). Replication in the other direction can be prevented using two mechanisms:
  * **`allowed-clusters`**: Forcefully prevents replication to clusters not in the resolved `allowed-clusters` configuration. This cannot be overridden by producers using the message-level `replicationClusters` setting.
  * **`clusters`**: Sets the default replication targets. If the reverse direction cluster is not included, replication is 1-way by default, though producers can still override this per-message using the `replicationClusters` setting.

  :::note
  The [replicated subscription](#replicated-subscriptions) feature requires 2-way geo-replication and is not available when geo-replication is configured as 1-way.
  :::

When using a **shared configuration store**, tenant-level and namespace-level configuration is shared across all clusters. If both clusters are listed in the shared namespace `clusters` setting and neither is excluded by `allowed-clusters`, replication is 2-way.

When using **separate metadata stores** (no shared configuration store), each cluster has its own metadata store and you must configure geo-replication independently on each cluster. To achieve 2-way replication, both clusters must be configured so that geo-replication is enabled for the topic on both sides — the tenant's `allowed-clusters`, the namespace `clusters`, and the namespace `allowed-clusters` must all include both clusters on each cluster.

## Local persistence and forwarding

When messages are produced on a Pulsar topic, messages are first persisted in the local cluster, and then forwarded asynchronously to the remote clusters.

In normal cases, when connectivity issues are none, messages are replicated immediately, at the same time as they are dispatched to local consumers. Typically, the network [round-trip time](https://en.wikipedia.org/wiki/Round-trip_delay_time) (RTT) between the remote regions defines end-to-end delivery latency.

Applications can create producers and consumers in any of the clusters, even when the remote clusters are not reachable (like during a network partition).

Producers and consumers can publish messages to and consume messages from any cluster in a Pulsar instance. However, subscriptions cannot only be local to the cluster where the subscriptions are created but also can be transferred between clusters after the replicated subscription is enabled. Once the replicated subscription is enabled, you can keep the subscription state in synchronization. Therefore, a topic can be asynchronously replicated across multiple geographical regions. In case of failover, a consumer can restart consuming messages from the failure point in a different cluster.

![Geo-replication example with a full-mesh pattern](/assets/geo-replication.png)

In the aforementioned example, the **T1** topic is replicated among three clusters, **Cluster-A**, **Cluster-B**, and **Cluster-C**.

All messages produced in any of the three clusters are delivered to all subscriptions in other clusters. In this case, **C1** and **C2** consumers receive all messages that **P1**, **P2**, and **P3** producers publish. Ordering is still guaranteed on a per-producer basis.

## Configure replication

To configure geo-replicated clusters, complete the following steps.

### Step 1: Connect replication clusters

To replicate data among clusters, you need to configure each cluster to connect to the other. You can use the [`pulsar-admin`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/) tool to create a connection.

**Example**

Suppose that you have 3 replication clusters: `us-west`, `us-cent`, and `us-east`.

1. Configure the connection from `us-west` to `us-east`.

   Run the following command on `us-west`.

   ```shell
   bin/pulsar-admin clusters create \
   --broker-url pulsar://<DNS-OF-US-EAST>:<PORT> \
   --url http://<DNS-OF-US-EAST>:<PORT> \
   us-east
   ```

:::tip

   - If you want to use a secure connection for a cluster, you can use the flags `--broker-url-secure` and `--url-secure`. For more information, see [pulsar-admin clusters create](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/clusters?id=create).
   - Different clusters may have different authentications. You can use the authentication flag `--auth-plugin` and `--auth-parameters` together to set cluster authentication, which overrides `brokerClientAuthenticationPlugin` and `brokerClientAuthenticationParameters` if `authenticationEnabled` sets to `true` in `broker.conf` and `standalone.conf`. For more information, see [authentication and authorization](concepts-authentication.md).

:::

2. Configure the connection from `us-west` to `us-cent`.

   Run the following command on `us-west`.

   ```shell
   bin/pulsar-admin clusters create \
   --broker-url pulsar://<DNS-OF-US-CENT>:<PORT>	\
   --url http://<DNS-OF-US-CENT>:<PORT> \
   us-cent
   ```

3. Run similar commands on `us-east` and `us-cent` to create connections among clusters.

### Step 2: Grant permissions to properties

To replicate to a cluster, the tenant needs permission to use that cluster. You can grant permission to the tenant when you create the tenant or grant it later.

Specify all the intended clusters when you create a tenant:

```shell
bin/pulsar-admin tenants create my-tenant \
--admin-roles my-admin-role \
--allowed-clusters us-west,us-east,us-cent
```

To update permissions of an existing tenant, use `update` instead of `create`.

### Step 3: Enable geo-replication

You can enable geo-replication at **namespace** or **topic** level.

#### Enable geo-replication at namespace level

You can create a namespace with the following command sample.

```shell
bin/pulsar-admin namespaces create my-tenant/my-namespace
```

Initially, the namespace is not assigned to any cluster. You can assign the namespace to clusters using the `set-clusters` subcommand:

```shell
bin/pulsar-admin namespaces set-clusters my-tenant/my-namespace \
--clusters us-west,us-east,us-cent
```

#### Enable geo-replication at topic level

You can set geo-replication at topic level using the command `pulsar-admin topics set-replication-clusters`. For the latest and complete information about `Pulsar admin`, including commands, flags, descriptions, and more information, see [Pulsar admin docs](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/).

```shell
bin/pulsar-admin topics set-replication-clusters --clusters us-west,us-east,us-cent my-tenant/my-namespace/my-topic
```

:::tip

- You can change the replication clusters for a namespace at any time, without disruption to ongoing traffic. Replication channels are immediately set up or stopped in all clusters as soon as the configuration changes.
- Once you create a geo-replication namespace, any topics that producers or consumers create within that namespace are replicated across clusters. Typically, each application uses the `serviceUrl` for the local cluster.
- If you are using Pulsar version `2.10.x`, to enable geo-replication at topic level, you need to change the following configurations in the `conf/broker.conf` or `conf/standalone.conf` file to enable topic policies service.

```conf
systemTopicEnabled=true
topicLevelPoliciesEnabled=true
```

:::

### Step 4: Use topics with geo-replication

#### Selective replication

By default, messages are replicated to all clusters configured for the namespace. You can restrict replication selectively by specifying a replication list for a message, and then that message is replicated only to the subset in the replication list.

The following is an example of the [Java API](client-libraries-java.md). Note the use of the `replicationClusters` method when you construct the [Message](/api/client/org/apache/pulsar/client/api/Message) object:

```java
List<String> restrictReplicationTo = Arrays.asList(
        "us-west",
        "us-east"
);

Producer producer = client.newProducer()
        .topic("some-topic")
        .create();

producer.newMessage()
        .value("my-payload".getBytes())
        .replicationClusters(restrictReplicationTo)
        .send();
```

#### Topic stats

You can check topic-specific statistics for geo-replication topics using one of the following methods.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"}]}>
<TabItem value="pulsar-admin">

Use the [`pulsar-admin topics stats`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/topics?id=stats) command.

```shell
bin/pulsar-admin topics stats persistent://my-tenant/my-namespace/my-topic
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v2/PersistentTopics_getStats)

</TabItem>

</Tabs>
````

Each cluster reports its own local stats, including the incoming and outgoing replication rates and backlogs.

#### Geo-replication topic deletion

**Topic deletion**

The recommended procedure for deleting a geo-replication topic from all clusters is:

1. Ensure there are no active producers or consumers on the topic across all clusters before proceeding. If any are present when the next step is performed, the topic will be forcefully deleted from under them. If auto-topic creation is also enabled, the topic may be immediately recreated.
2. Set a global topic-level `clusters` policy to include only the local cluster. This triggers the cascading deletion mechanism to remove the topic's sub-topics and clean up schemas and local topic policies on all excluded clusters. Producers and consumers connected to an excluded cluster will be rejected from reconnecting. See [Cascading topic deletions when modifying the replication clusters configuration](#cascading-topic-deletions-when-modifying-the-replication-clusters-configuration) for details.
3. Delete the topic. Geo-replication is now disabled, so the deletion only affects the local cluster.
4. Run `pulsar-admin topicPolicies delete <topic>` on each cluster to remove the remaining topic-level policy state.

Without this procedure, forcefully deleting a topic on one cluster leaves it orphaned — it still exists on peer clusters and geo-replication from those clusters remains active. If auto-topic creation is enabled on the cluster where the topic was deleted, the topic may be recreated through auto-creation or because `createTopicToRemoteClusterForReplication=true` is set on a peer cluster.

When namespace or topic configuration is shared via a shared configuration store or synchronized via `configurationMetadataSyncEventTopic`, forcefully deleting a topic propagates the deletion to all clusters that share or receive the configuration. However, replication delays may cause the topic to be recreated before the deletion takes effect everywhere. For this reason, it is recommended to follow the procedure above.

To remove a topic from a specific cluster only, set a global topic-level `clusters` policy that excludes that cluster. The broker automatically deletes the topic's sub-topics on the excluded cluster. Do not remove the global topic-level policy afterward, as this would allow the namespace-level `clusters` policy to take effect and potentially re-enable replication. To later delete the topic from all clusters, follow the full procedure above.

To retain the topic in a specific cluster while removing it from all others, follow the procedure above on the cluster where the topic should be retained, but omit steps 3 and 4.

**Garbage collection**

A geo-replication topic is also automatically deleted by garbage collection when `brokerDeleteInactiveTopicsEnabled=true` and no producers or consumers are connected to it. The additional conditions depend on the `brokerDeleteInactiveTopicsMode` setting:

- `delete_when_no_subscriptions`: the topic is deleted when there are no subscriptions.
- `delete_when_subscriptions_caught_up`: the topic is deleted when all subscriptions have caught up and there is no backlog.

Each region independently decides when it is safe to delete the topic locally. To trigger garbage collection, close all producers and consumers on the topic and delete all local subscriptions in every replication cluster. When Pulsar determines that no valid subscription remains across the system, it garbage collects the topic.

## Cascading topic deletions when modifying the replication clusters configuration

Tenant, namespace, and topic configurations can be shared or synchronized across clusters in two ways:

* **Shared configuration store**: Tenant and namespace metadata is stored in a shared configuration store accessible to all clusters.
* **`configurationMetadataSyncEventTopic`**: Tenant, namespace, and topic configuration changes are synchronized across clusters via geo-replication. The direction of synchronization follows the direction of replication — with 1-way replication, configuration updates flow in one direction only; with 2-way replication, they flow in both directions.

Topic policies are also shared via geo-replication when the namespace has geo-replication enabled, with support for both local (single-cluster) and global (all-clusters) policies. Topic policies require `topicLevelPoliciesEnabled=true` in broker configuration (enabled by default).

When the namespace `clusters` configuration is shared or synchronized across clusters and a cluster is removed from that list, Pulsar automatically deletes all topics for that namespace on the excluded cluster.

When a topic-level `clusters` policy is shared or synchronized across clusters and a cluster is removed from that policy, Pulsar automatically deletes the topic and all its partitions on the excluded cluster. Since [PIP-422](https://github.com/apache/pulsar/blob/master/pip/pip-422.md), this cascading deletion is supported at the topic level in addition to the namespace level. Schemas and local topic policies are cleaned up after the last sub-topic is deleted. Topic-level policy updates follow the replication direction of the namespace — with 1-way replication, policy updates flow only toward the destination cluster.

:::warning

When the namespace `clusters` configuration is shared or synchronized across clusters, removing a cluster from the list automatically deletes all topics in that namespace on the excluded cluster. When a topic-level `clusters` policy is shared or synchronized, removing a cluster deletes that topic and all its partitions on the excluded cluster.

To prevent a specific topic from being deleted when the namespace `clusters` configuration changes, set a global topic-level `clusters` policy for that topic listing the clusters where it should be retained. This overrides the namespace-level policy for that topic and is the only way to stop replication for a specific topic without triggering deletions on other clusters when namespace configuration is shared or synchronized.

:::

Geo-replication is designed for high availability and disaster recovery, not as a substitute for backups. When namespace or topic configuration is shared or synchronized across clusters, a misconfigured `clusters` policy can trigger cascading topic deletions on peer clusters. Always maintain independent backups if protection against accidental deletions is a requirement.

## Replicated subscriptions

Pulsar supports replicated subscriptions, so you can keep the subscription state in sync, within a sub-second timeframe, in the context of a topic that is being asynchronously replicated across multiple geographical regions.

In case of failover, a consumer can restart consuming from the failure point in a different cluster.

### Enable replicated subscription

:::note

Replicated subscriptions require [2-way geo-replication](#1-way-and-2-way-geo-replication) to be properly configured between all participating clusters. See [1-way and 2-way geo-replication](#1-way-and-2-way-geo-replication) for configuration requirements.

:::

If you want to use replicated subscriptions in Pulsar:

* For broker side: set `enableReplicatedSubscriptions` to `true` in [`broker.conf`](https://github.com/apache/pulsar/blob/470b674016c8718f2dfd0a0f93cf02d49af0fead/conf/broker.conf#L592).

* For consumer side: replicated subscription is disabled by default. You can enable replicated subscriptions when creating a consumer.

  ```java
  Consumer<String> consumer = client.newConsumer(Schema.STRING)
              .topic("my-topic")
              .subscriptionName("my-subscription")
              .replicateSubscriptionState(true)
              .subscribe();
  ```

### Advantages

The advantages of replicated subscription are as follows.

 * It is easy to implement the logic.
 * You can choose to enable or disable replicated subscription.
 * When you enable it, the overhead is low, and it is easy to configure.
 * When you disable it, the overhead is zero.

### Limitations

The limitations of replicated subscription are as follows.

* When you enable replicated subscriptions, you're creating a consistent distributed snapshot to establish an association between message ids from different clusters. The snapshots are taken periodically. The default value is `1 second`. It means that a consumer failing over to a different cluster can potentially receive 1 second of duplicates. You can also configure the frequency of the snapshot in the `broker.conf` file.
* Only the base line cursor position ("mark delete position") is synced in replicated subscriptions while the individual acknowledgments are not synced. This means the messages acknowledged out-of-order could end up getting delivered again, in the case of a cluster failover.
* Replicated subscriptions do not support consistent behavior when consumers are active on multiple clusters simultaneously. Most messages would be processed in both clusters (duplicate processing), and some may be processed in either cluster if the replication subscription update reaches the other cluster before the messages are consumed there. It is recommended to process messages in a single cluster when using replicated subscriptions.
* Delayed delivery prevents subscription replication because the cursor's mark-delete position does not advance until delayed messages have been delivered and processed.

:::note

* This replicated subscription will add a new special message every second, it will contains the [snapshot](https://github.com/apache/pulsar/blob/master/pip/pip-33.md#constructing-a-cursor-snapshot) of the subscription. That means, if there are inactive subscriptions over the topic there can be an increase in backlog in source and destination clusters. The snapshot is created only when new messages have been produced to the topic after the last snapshot creation begun.

:::

### Replicated subscriptions snapshot configuration and tuning

Replicated subscriptions use a periodic snapshotting mechanism to establish a consistent association between message positions across clusters. The design is described in [PIP-33: Replicated subscriptions](https://github.com/apache/pulsar/blob/master/pip/pip-33.md#constructing-a-cursor-snapshot).

Each snapshot requires either one or two rounds of round-trips between the participating clusters. When more than two clusters are involved, two rounds are always required. This increases the time needed for a snapshot to complete and makes snapshot timeout tuning more important.

A known issue where the snapshot condition was not met under high message rates with shared or key-shared subscriptions using individual acknowledgments was fixed in Pulsar 4.0.9 and 4.1.3 by [PR #25044](https://github.com/apache/pulsar/pull/25044). In that scenario, the cursor's mark-delete position advances slowly because all acknowledgment gaps must be filled before it can move forward. Previously, if the mark-delete position did not advance before cached snapshots expired, the subscription state would stop being replicated even after the position eventually moved forward.

After PR #25044, when the snapshot cache is full, snapshots are retained spread across the full range from just ahead of the current mark-delete position to the latest snapshot. This means that when the cursor eventually advances, a usable snapshot is always available nearby. With a larger cache, the gap between a usable snapshot and the actual mark-delete position is smaller, which reduces both the replication lag and the number of potential duplicate messages on failover.

The following broker settings control snapshot behavior:

| Setting | Default | Description |
| --- | --- | --- |
| `replicatedSubscriptionsSnapshotFrequencyMillis` | `1000` | How often snapshots are taken. |
| `replicatedSubscriptionsSnapshotTimeoutSeconds` | `30` | How long a snapshot can remain pending before it times out. |
| `replicatedSubscriptionsSnapshotMaxCachedPerSubscription` | `30` (increased from 10 in PR #25044) | Maximum number of snapshots cached per subscription. Each entry consumes approximately 200 bytes of memory. |

For setups with more than two clusters, it is recommended to increase `replicatedSubscriptionsSnapshotTimeoutSeconds` to `60` and `replicatedSubscriptionsSnapshotMaxCachedPerSubscription` to `50` to ensure that two-round snapshots complete before the timeout. The tradeoff is slightly higher memory consumption — with a value of `50`, the maximum heap memory consumed by the snapshot cache is approximately 10 KB per topic.

### Observability

Observability for replicated subscriptions is limited. For debugging, debug-level logs are available in `org.apache.pulsar.broker.service.persistent.ReplicatedSubscriptionsController`, though these are not suitable for production operations.

The following broker-level metrics are available for monitoring snapshot health. Note that these metrics are aggregated across all topics on a broker and do not include per-topic labels.

| Metric | OpenTelemetry name | Description |
| --- | --- | --- |
| `pulsar_replicated_subscriptions_pending_snapshots` | `pulsar.broker.replication.subscription.snapshot.operation.count` | Number of currently pending snapshots. |
| `pulsar_replicated_subscriptions_timedout_snapshots` | `pulsar.broker.replication.subscription.snapshot.operation.duration` | Number of snapshots that have timed out. |

Topic stats and internal stats can be used to inspect the state of subscriptions. The cursor's mark-delete position is particularly useful, as subscription state can only be replicated up to that position.

## Migrate data between clusters using geo-replication

Using geo-replication to migrate data between clusters is a special use case of the [active-active replication pattern](concepts-replication.md#active-active-replication) when you don't have a large amount of data.

1. Create your new cluster.
2. Add the new cluster to your old cluster.

   ```shell
   bin/pulsar-admin clusters create new-cluster
   ```

3. Add the new cluster to your tenant.

   ```shell
   bin/pulsar-admin tenants update my-tenant --cluster old-cluster,new-cluster
   ```

4. Set the clusters on your namespace.

   ```shell
   bin/pulsar-admin namespaces set-clusters my-tenant/my-ns --cluster old-cluster,new-cluster
   ```

5. Update your applications using [replicated subscriptions](#replicated-subscriptions).
6. Validate subscription replication is active.
   ```shell
   bin/pulsar-admin topics stats-internal public/default/t1
   ```

7. Move your consumers and producers to the new cluster by modifying the values of `serviceURL`.

:::note

* The replication starts from step 4, which means existing messages in your old cluster are not replicated.
* If you have some older messages to migrate, you can pre-create the replication subscriptions for each topic and set it at the earliest position by using `pulsar-admin topics create-subscription -s pulsar.repl.new-cluster -m earliest <topic>`. Until [PIP-356](https://github.com/apache/pulsar/blob/master/pip/pip-356.md) is merged you will need to unload the topic to start georeplication.

:::
