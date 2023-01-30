---
id: client-libraries-cluster-level-failover
title: Configure cluster-level failover
sidebar_label: "Configure cluster-level failover"
---

For more concepts and reference information about cluster-level failover, including concepts, benefits, use cases, constraints, usage and working principles, see [Cluster-level failover](concepts-cluster-level-failover.md). 

:::tip

- You should configure cluster-level failover only when the cluster contains sufficient resources to handle all possible consequences. Workload intensity on the backup cluster may increase significantly.

- Connect clusters to an uninterruptible power supply (UPS) unit to reduce the risk of unexpected power loss.

:::

**Requirements**

* Pulsar client 2.10 or later versions.
* For backup clusters:
  * The number of BookKeeper nodes should be equal to or greater than the ensemble quorum.
  * The number of ZooKeeper nodes should be equal to or greater than 3.
* **Turn on geo-replication** between the primary cluster and any dependent cluster (primary to backup or backup to backup) to prevent data loss.
* Set `replicateSubscriptionState` to `true` when creating consumers.

**Configuration**

See [cluster-level failover configs](client-libraries-java-configs.md#cluster-level-failover-configs) for more details.