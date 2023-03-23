---
id: admin-api-clusters
title: Managing Clusters
sidebar_label: "Clusters"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````


:::tip

 This page only shows **some frequently used operations**.

 - For the latest and complete information about `Pulsar admin`, including commands, flags, descriptions, and more, see [Pulsar admin docs](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/).

 - For the latest and complete information about `REST API`, including parameters, responses, samples, and more, see {@inject: rest:REST:/} API doc.

 - For the latest and complete information about `Java admin API`, including classes, methods, descriptions, and more, see [Java admin API doc](/api/admin/).

:::

You can manage [clusters](reference-terminology.md#cluster) via one of the following methods:

* [Pulsar CLI](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/)
  
  * The `clusters` command of the [`pulsar-admin`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/) tool

* [Pulsar admin APIs](admin-api-overview.md)
  
  * The `/admin/v2/clusters` endpoint of the admin {@inject: rest:REST:/} API
  
  * The `clusters` method of the `PulsarAdmin` object in the [Java API](client-libraries-java.md)

## Provision cluster

New clusters can be provisioned using the admin interface.

:::note

- This operation requires superuser privileges.

- When provisioning a new cluster, you need to [initialize cluster metadata](deploy-bare-metal.md#initialize-cluster-metadata). Cluster metadata can be initialized through the pulsar-admin CLI **only**. It cannot be performed via Pulsar admin APIs (REST API and Java admin API).

:::

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

You can provision a new cluster using the [`create`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/clusters?id=create) subcommand. Here's an example:

```shell
pulsar-admin clusters create cluster-1 \
    --url http://my-cluster.org.com:8080 \
    --broker-url pulsar://my-cluster.org.com:6650
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|PUT|/admin/v2/clusters/:cluster|operation/createCluster?version=@pulsar:version_number@}

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

Use the [`get`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/clusters?id=get) subcommand and specify the name of the cluster. Here's an example:

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

{@inject: endpoint|GET|/admin/v2/clusters/:cluster|operation/getCluster?version=@pulsar:version_number@}

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

Use the [`update`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/clusters?id=update) subcommand and specify new configuration values using flags.

```shell
pulsar-admin clusters update cluster-1 \
    --url http://my-cluster.org.com:4081 \
    --broker-url pulsar://my-cluster.org.com:3350
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v2/clusters/:cluster|operation/updateCluster?version=@pulsar:version_number@}

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

Use the [`update-peer-clusters`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/clusters?id=update) subcommand and specify the list of peer-cluster names.

```shell
pulsar-admin update-peer-clusters cluster-1 --peer-clusters cluster-2
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v2/clusters/:cluster/peers|operation/setPeerClusterNames?version=@pulsar:version_number@}

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

Use the [`list`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/clusters?id=list) subcommand.

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

{@inject: endpoint|GET|/admin/v2/clusters|operation/getClusters?version=@pulsar:version_number@}

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

Use the [`delete`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/clusters?id=delete) subcommand and specify the name of the cluster.

```
pulsar-admin clusters delete cluster-1
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|DELETE|/admin/v2/clusters/:cluster|operation/deleteCluster?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java">

```java
admin.clusters().deleteCluster(clusterName);
```

</TabItem>

</Tabs>
````



