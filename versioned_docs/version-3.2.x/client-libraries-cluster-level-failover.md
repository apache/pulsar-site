---
id: client-libraries-cluster-level-failover
title: Configure cluster-level failover
sidebar_label: "Configure cluster-level failover"
description: Learn how to configure cluster-level failover in Pulsar.
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

For more information about cluster-level failover, including concepts, benefits, use cases, constraints, usage and working principles, see [Cluster-level failover concepts](concepts-cluster-level-failover.md).

:::tip

- You should configure cluster-level failover only when the cluster contains sufficient resources to handle all possible consequences. Workload intensity on the backup cluster may increase significantly.

- Connect your clusters to an uninterruptible power supply (UPS) unit to reduce the risk of unexpected power loss.

:::

## Prerequisites

* Pulsar Java client 2.10 or later versions.
* For backup clusters:
  * The number of BookKeeper nodes should be equal to or greater than the ensemble quorum.
  * The number of ZooKeeper nodes should be equal to or greater than 3.
* **Turn on geo-replication** between the primary cluster and any dependent cluster (primary to backup or backup to backup) to prevent data loss.
* [Enable replicated subscription](administration-geo.md#enable-replicated-subscription).

## Configure cluster-level failover

### Automatic failover

This is an example of how to construct a Java Pulsar client to use automatic cluster-level failover. The switchover is triggered automatically.

```java
private PulsarClient getAutoFailoverClient() throws PulsarClientException {
    String primaryUrl = "pulsar+ssl://localhost:6651";
    String secondaryUrl = "pulsar+ssl://localhost:6661";
    String primaryTlsTrustCertsFilePath = "primary/path";
    String secondaryTlsTrustCertsFilePath = "secondary/path";
    Authentication primaryAuthentication = AuthenticationFactory.create(
        "org.apache.pulsar.client.impl.auth.AuthenticationTls",
        "tlsCertFile:/path/to/primary-my-role.cert.pem,"
                + "tlsKeyFile:/path/to/primary-role.key-pk8.pem");
    Authentication secondaryAuthentication = AuthenticationFactory.create(
        "org.apache.pulsar.client.impl.auth.AuthenticationTls",
        "tlsCertFile:/path/to/secondary-my-role.cert.pem,"
                + "tlsKeyFile:/path/to/secondary-role.key-pk8.pem");

    // You can put more failover cluster config in to map
    Map<String, String> secondaryTlsTrustCertsFilePaths = new HashMap<>();
    secondaryTlsTrustCertsFilePaths.put(secondaryUrl, secondaryTlsTrustCertsFilePath);
    Map<String, Authentication> secondaryAuthentications = new HashMap<>();
    secondaryAuthentications.put(secondaryUrl, secondaryAuthentication);
    ServiceUrlProvider failover = AutoClusterFailover.builder()
        .primary(primaryUrl)
        .secondary(List.of(secondaryUrl))
        .failoverDelay(30, TimeUnit.SECONDS)
        .switchBackDelay(60, TimeUnit.SECONDS)
        .checkInterval(1000, TimeUnit.MILLISECONDS)
        .secondaryTlsTrustCertsFilePath(secondaryTlsTrustCertsFilePaths)
        .secondaryAuthentication(secondaryAuthentications)
        .build();

    PulsarClient pulsarClient = PulsarClient.builder()
        .authentication(primaryAuthentication) 
        .tlsTrustCertsFilePath(primaryTlsTrustCertsFilePath)
        .build();

    failover.initialize(pulsarClient);
    return pulsarClient;
}
```

Configure the following parameters:

Parameter|Default value|Required?|Description
|---|---|---|---
`primary`|N/A|Yes|Service URL of the primary cluster.
`secondary`|N/A|Yes|Service URL(s) of one or several backup clusters.<br /><br />You can specify several backup clusters using a comma-separated list.<br /><br /> Note that:<br />- The backup cluster is chosen in the sequence shown in the list. <br />- If all backup clusters are available, the Pulsar client chooses the first backup cluster.
`failoverDelay`|N/A|Yes|The delay before the Pulsar client switches from the primary cluster to the backup cluster.<br /><br />Automatic failover is controlled by a probe task: <br />1) The probe task first checks the health status of the primary cluster. <br /> 2) If the probe task finds the continuous failure time of the primary cluster exceeds `failoverDelayMs`, it switches the Pulsar client to the backup cluster.
`switchBackDelay`|N/A|Yes|The delay before the Pulsar client switches from the backup cluster to the primary cluster.<br /><br />Automatic failover switchover is controlled by a probe task: <br /> 1) After the Pulsar client switches from the primary cluster to the backup cluster, the probe task continues to check the status of the primary cluster. <br /> 2) If the primary cluster functions well and continuously remains active longer than `switchBackDelay`, the Pulsar client switches back to the primary cluster.
`checkInterval`|30s|No|Frequency of performing a probe task (in seconds).
`secondaryTlsTrustCertsFilePath`|N/A|No|Path to the trusted TLS certificate file of the backup cluster.
`secondaryAuthentication`|N/A|No|Authentication of the backup cluster.

### Controlled failover

This is an example of how to construct a Java Pulsar client to use controlled cluster-level failover. The switchover is triggered by administrators manually.

:::note
You can have one or several backup clusters but can only specify one.
:::

```java
public PulsarClient getControlledFailoverClient() throws IOException {
    Map<String, String> header = new HashMap();
    header.put("service_user_id", "my-user");
    header.put("service_password", "tiger");
    header.put("clusterA", "tokenA");
    header.put("clusterB", "tokenB");

    ServiceUrlProvider provider =
            ControlledClusterFailover.builder()
                    .defaultServiceUrl("pulsar://localhost:6650")
                    .checkInterval(1, TimeUnit.MINUTES)
                    .urlProvider("http://localhost:8080/test")
                    .urlProviderHeader(header)
                    .build();

    PulsarClient pulsarClient =
            PulsarClient.builder()
                    .build();

    provider.initialize(pulsarClient);
    return pulsarClient;
}
```

Parameter|Default value|Required?|Description
|---|---|---|---
`defaultServiceUrl`|N/A|Yes|Pulsar service URL.
`checkInterval`|30s|No|Frequency of performing a probe task (in seconds).
`urlProvider`|N/A|Yes|URL provider service.
`urlProviderHeader`|N/A|No|`urlProviderHeader` is a map containing tokens and credentials. <br /><br />If you enable authentication or authorization between Pulsar clients and primary and backup clusters, you need to provide `urlProviderHeader`.

Here is an example of how `urlProviderHeader` works.

![Workflow of urlProviderHeader in Pulsar](/assets/cluster-level-failover-3.png)

Assume that you want to connect Pulsar client 1 to cluster A.

1. Pulsar client 1 sends the token *t1* to the URL provider service.

2. The URL provider service returns the credential *c1* and the cluster A URL to the Pulsar client.

   The URL provider service manages all tokens and credentials. It returns different credentials based on different tokens and different target cluster URLs to different Pulsar clients.

   :::note

   The credential must be in a JSON file and contain parameters as shown.

   :::

   ```java
   {
   "serviceUrl": "pulsar+ssl://target:6651",
   "tlsTrustCertsFilePath": "/security/ca.cert.pem",
   "authPluginClassName":"org.apache.pulsar.client.impl.auth.AuthenticationTls",
   "authParamsString": " \"tlsCertFile\": \"/security/client.cert.pem\"
       \"tlsKeyFile\": \"/security/client-pk8.pem\" "
   }
   ```

3. Pulsar client 1 connects to cluster A using credential *c1*.