---
id: admin-api-brokers
title: Managing Brokers
sidebar_label: "Brokers"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

:::tip

This page only shows **some frequently used operations**. For the latest and complete information, see the **reference docs** below.

:::

Category|Method|If you want to manage brokers...
|---|---|---
[Pulsar CLI](reference-cli-tools.md) |[pulsar-admin](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/), which lists all commands, flags, descriptions, and more.| See the `broker` command
[Pulsar admin APIs](admin-api-overview.md)| {@inject: rest:REST API:/}, which lists all parameters, responses, samples, and more.|See the `/admin/v2/brokers` endpoint
[Pulsar admin APIs](admin-api-overview.md)|[Java admin API](/api/admin/), which lists all classes, methods, descriptions, and more.|See the `brokers` method of the `PulsarAdmin` object

## List active broker

Fetch all available active brokers that are serving traffic with cluster name.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

```shell
pulsar-admin brokers list use
```

Example output:

```
localhost:8080
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v2/BrokersBase_getActiveBrokers?summary=in+the+cluster)

</TabItem>
<TabItem value="Java">

```java
admin.brokers().getActiveBrokers(clusterName)
```

</TabItem>

</Tabs>
````

## List namespace owned by broker

You can list all namespaces which are owned and served by a given broker.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

```shell
pulsar-admin brokers namespaces use \
    --url localhost:8080
```

Example output:

```
public/default/0x00000000_0x40000000    [broker_assignment=shared is_controlled=false is_active=true]
public/default/0xc0000000_0xffffffff    [broker_assignment=shared is_controlled=false is_active=true]
public/functions/0x40000000_0x80000000    [broker_assignment=shared is_controlled=false is_active=true]
public/functions/0x00000000_0x40000000    [broker_assignment=shared is_controlled=false is_active=true]
pulsar/standalone/localhost:8080/0x00000000_0xffffffff    [broker_assignment=shared is_controlled=false is_active=true]
pulsar/localhost:8080/0x00000000_0xffffffff    [broker_assignment=shared is_controlled=false is_active=true]
public/functions/0x80000000_0xc0000000    [broker_assignment=shared is_controlled=false is_active=true]
public/default/0x80000000_0xc0000000    [broker_assignment=shared is_controlled=false is_active=true]
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v2/BrokersBase_getOwnedNamespaces)

</TabItem>
<TabItem value="Java">

```java
admin.brokers().getOwnedNamespaces(cluster,brokerUrl);
```

</TabItem>

</Tabs>
````

## Update broker conf

You can update broker configurations using one of the following ways:

- Supply [configurations](pathname:///reference/#/@pulsar:version_reference@/config/reference-configuration-broker) when starting up brokers.

- [Update configurations dynamically](#update-broker-conf-dynamically) **when running brokers**.

  Since all broker configurations in Pulsar are stored in ZooKeeper, configuration values can also be dynamically updated when brokers are running. When you update broker configurations dynamically, ZooKeeper will notify the broker of the change and then the broker will override any existing configuration values.

### List updatable broker conf

Fetch a list of all potentially updatable configuration parameters.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

```shell
pulsar-admin brokers list-dynamic-config
```

Example output:

```
forceDeleteNamespaceAllowed
loadBalancerMemoryResourceWeight
allowAutoTopicCreation
brokerDeleteInactivePartitionedTopicMetadataEnabled
managedLedgerInactiveLedgerRolloverTimeSeconds
loadBalancerNamespaceBundleMaxMsgRate
resourceUsageTransportPublishIntervalInSecs
# omit...
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v2/BrokersBase_getDynamicConfigurationName)

</TabItem>
<TabItem value="Java">

```java
admin.brokers().getDynamicConfigurationNames();
```

</TabItem>

</Tabs>
````

### Update broker conf dynamically

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

The [`update-dynamic-config`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/brokers?id=update-dynamic-config) subcommand will update existing configuration. It takes two arguments: the name of the parameter and the new value using the `config` and `value` flag respectively. Here's an example of the [`brokerShutdownTimeoutMs`](reference-configuration.md#broker-brokerShutdownTimeoutMs) parameter:

```shell
pulsar-admin brokers update-dynamic-config --config brokerShutdownTimeoutMs --value 100
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v2/BrokersBase_updateDynamicConfiguration)

</TabItem>
<TabItem value="Java">

```java
admin.brokers().updateDynamicConfiguration(configName, configValue);
```

</TabItem>

</Tabs>
````

### List updated broker conf

Fetch a list of all parameters that have been dynamically updated.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

```shell
pulsar-admin brokers get-all-dynamic-config
```
Example output:

```
brokerShutdownTimeoutMs    100
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v2/BrokersBase_getAllDynamicConfigurations)

</TabItem>
<TabItem value="Java">

```java
admin.brokers().getAllDynamicConfigurations();
```

</TabItem>

</Tabs>
````

## Get info of leader broker

Fetch the information of the leader broker, for example, the service URL.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

```shell
pulsar-admin brokers leader-broker
```

Example output:

```json
{
  "serviceUrl" : "http://localhost:8080"
}
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v2/BrokersBase_getLeaderBroker)

</TabItem>
<TabItem value="Java">

```java
admin.brokers().getLeaderBroker()
```

For the detail of the code above, see [here](https://github.com/apache/pulsar/blob/master/pulsar-client-admin/src/main/java/org/apache/pulsar/client/admin/internal/BrokersImpl.java#L80)

</TabItem>

</Tabs>
````
