---
id: administration-anti-affinity-namespaces
title: Anti-affinity namespaces
sidebar_label: "Anti-affinity namespaces"
description: Get a comprehensive understanding of anti-affinity namespaces in Pulsar.
---

## Distribute anti-affinity namespaces across failure domains

When your application has multiple namespaces and you want one of them available all the time to avoid any downtime, you can group these namespaces and distribute them across different [failure domains](reference-terminology.md#failure-domain) and different brokers. Thus, if one of the failure domains is down (due to release rollout or brokers restart), it only disrupts namespaces owned by that specific failure domain and the rest of the namespaces owned by other domains remain available without any impact.

Such a group of namespaces has anti-affinity to each other, that is, all the namespaces in this group are [anti-affinity namespaces](reference-terminology.md#anti-affinity-namespaces) and are distributed to different failure domains in a load-balanced manner.

As illustrated in the following figure, Pulsar has 2 failure domains (Domain1 and Domain2) and each domain has 2 brokers in it. You can create an anti-affinity namespace group that has 4 namespaces in it, and all the 4 namespaces have anti-affinity to each other. The load manager tries to distribute namespaces evenly across all the brokers in the same domain. Since each domain has 2 brokers, every broker owns one namespace from this anti-affinity namespace group, and you can see each domain owns 2 namespaces, and each broker owns 1 namespace.

![Distribute anti-affinity namespaces across failure domains](/assets/anti-affinity-namespaces-across-failure-domains.svg)

The load manager follows an even distribution policy across failure domains to assign anti-affinity namespaces. The following table outlines the even-distributed assignment sequence illustrated in the above figure.

| Assignment sequence | Namespace | Failure domain candidates | Broker candidates | Selected broker |
|:---|:------------|:------------------|:------------------------------------|:-----------------|
| 1 | Namespace1 | Domain1, Domain2 | Broker1, Broker2, Broker3, Broker4 | Domain1:Broker1 |
| 2 | Namespace2 | Domain2          | Broker3, Broker4                   | Domain2:Broker3 |
| 3 | Namespace3 | Domain1, Domain2 | Broker2, Broker4                   | Domain1:Broker2 |
| 4 | Namespace4 | Domain2          | Broker4                            | Domain2:Broker4 |

:::tip

* Each namespace belongs to only one anti-affinity group. If a namespace with an existing anti-affinity assignment is assigned to another anti-affinity group, the original assignment is dropped.

* If there are more anti-affinity namespaces than failure domains, the load manager distributes namespaces evenly across all the domains, and also every domain distributes namespaces evenly across all the brokers under that domain.

:::

### Create a failure domain and register brokers

:::note

One broker can only be registered to a single failure domain.

:::

To create a domain under a specific cluster and register brokers, run the following command:

```bash
pulsar-admin clusters create-failure-domain <cluster-name> --domain-name <domain-name> --broker-list <broker-list-comma-separated>
```

You can also view, update, and delete domains under a specific cluster. For more information, refer to [Pulsar admin docs](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/).

### Create an anti-affinity namespace group

An anti-affinity group is created automatically when the first namespace is assigned to the group. To assign a namespace to an anti-affinity group, run the following command. It sets an anti-affinity group name for a namespace.

```bash
pulsar-admin namespaces set-anti-affinity-group <namespace> --group <group-name>
```

For more information about `anti-affinity-group` related commands, refer to [Pulsar admin docs](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/).
