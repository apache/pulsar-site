---
id: admin-api-clusters
title: Managing Clusters
sidebar_label: "Clusters"
description: Learn how to manage clusters using Pulsar CLI and admin APIs.
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

:::tip

This page only shows **some frequently used operations**. For the latest and complete information, see the **reference docs** below.

:::

Category|Method|If you want to manage clusters...
|---|---|---
[Pulsar CLI](reference-cli-tools.md) |[pulsar-admin](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/), which lists all commands, flags, descriptions, and more.| See the `clusters` command
[Pulsar admin APIs](admin-api-overview.md)| {@inject: rest:REST API:/}, which lists all parameters, responses, samples, and more.|See the `/admin/v2/clusters` endpoint
[Pulsar admin APIs](admin-api-overview.md)|[Java admin API](/api/admin/), which lists all classes, methods, descriptions, and more.|See the `clusters` method of the `PulsarAdmin` object

You can perform the following operations on [clusters](reference-terminology.md#cluster).

## Provision cluster

You can provision new clusters using the admin interface.

:::note

- This operation requires superuser privileges.

- When provisioning a new cluster, you need to [initialize cluster metadata](deploy-bare-metal.md#initialize-cluster-metadata). Cluster metadata can be initialized through the pulsar-admin CLI **only**. It cannot be performed via Pulsar admin APIs (REST API and Java admin API).

:::

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

You can provision a new cluster using the [`create`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/clusters?id=create) subcommand. Here's an example:

```shell
pulsar-admin clusters create cluster-1 \
    --url http://my-cluster.org.com:8080 \
    --broker-url pulsar://my-cluster.org.com:6650
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|PUT|/admin/v2/clusters/:cluster|operation/ClustersBase_createCluster?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java">

```java
ClusterData clusterData = new ClusterData(
        serviceUrl,
        serviceUrlTls,
        brokerServiceUrl,
        brokerServiceUrlTls
);
admin.clusters().createCluster(clusterName, clusterData);
```

</TabItem>

</Tabs>
````

## Get cluster configuration

You can fetch the [configuration](reference-configuration.md) for an existing cluster at any time.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

Use the [`get`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/clusters?id=get) subcommand and specify the name of the cluster. Here's an example:

```shell
pulsar-admin clusters get cluster-1
```
Output:

```json
{
    "serviceUrl": "http://my-cluster.org.com:8080/",
    "serviceUrlTls": null,
    "brokerServiceUrl": "pulsar://my-cluster.org.com:6650/",
    "brokerServiceUrlTls": null
    "peerClusterNames": null
}
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|GET|/admin/v2/clusters/:cluster|operation/ClustersBase_getCluster?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java">

```java
admin.clusters().getCluster(clusterName);
```

</TabItem>

</Tabs>
````

## Update cluster

### Update cluster configuration

You can update the configuration for an existing cluster at any time.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

Use the [`update`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/clusters?id=update) subcommand and specify new configuration values using flags.

```shell
pulsar-admin clusters update cluster-1 \
    --url http://my-cluster.org.com:4081 \
    --broker-url pulsar://my-cluster.org.com:3350
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v2/clusters/:cluster|operation/ClustersBase_updateCluster?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java">

```java
ClusterData clusterData = new ClusterData(
        serviceUrl,
        serviceUrlTls,
        brokerServiceUrl,
        brokerServiceUrlTls
);
admin.clusters().updateCluster(clusterName, clusterData);
```

</TabItem>

</Tabs>
````

### Update peer-cluster data

Peer clusters can be configured for a given cluster in a Pulsar [instance](reference-terminology.md#instance).

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

Use the [`update-peer-clusters`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/clusters?id=update) subcommand and specify the list of peer-cluster names.

```shell
pulsar-admin update-peer-clusters cluster-1 --peer-clusters cluster-2
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v2/clusters/:cluster/peers|operation/ClustersBase_setPeerClusterNames?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java">

```java
admin.clusters().updatePeerClusterNames(clusterName, peerClusterList);
```

</TabItem>

</Tabs>
````

## List cluster

You can fetch a list of all clusters in a Pulsar [instance](reference-terminology.md#instance).

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

Use the [`list`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/clusters?id=list) subcommand.

```shell
pulsar-admin clusters list
```

Output:

```
cluster-1
cluster-2
```
</TabItem>
<TabItem value="REST API">

{@inject: endpoint|GET|/admin/v2/clusters|operation/ClustersBase_getClusters?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java">

```java
admin.clusters().getClusters();
```

</TabItem>

</Tabs>
````
## Delete cluster

Clusters can be deleted from a Pulsar [instance](reference-terminology.md#instance).

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

Use the [`delete`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/clusters?id=delete) subcommand and specify the name of the cluster.

```
pulsar-admin clusters delete cluster-1
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|DELETE|/admin/v2/clusters/:cluster|operation/ClustersBase_deleteCluster?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java">

```java
admin.clusters().deleteCluster(clusterName);
```

</TabItem>

</Tabs>
````
