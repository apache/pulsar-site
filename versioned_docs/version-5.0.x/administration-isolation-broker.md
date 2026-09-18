---
id: administration-isolation-broker
title: Isolate brokers
sidebar_label: "Isolate brokers"
description: Learn to set a namespace isolation policy for a broker cluster in Pulsar.
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````


In Pulsar, when namespaces (more specifically, namespace bundles) are assigned dynamically to brokers, the namespace isolation policy limits the set of brokers that can be used for assignment. Before topics are assigned to brokers, you can set the namespace isolation policy with a primary or a secondary regex to select desired brokers.

## Match broker addresses

The `--primary` and `--secondary` regular expressions match the **hostname or address portion of the registered broker ID, without the port**. This applies to both the modular and extensible load managers. The expression must match the entire address; listener names, URL schemes, ports, and Kubernetes labels are not part of the match.

| Broker configuration | Address matched by the isolation policy |
|---|---|
| `advertisedAddress` is configured, without additional advertised listeners | The configured `advertisedAddress`. |
| `advertisedAddress` is unset or blank, without additional advertised listeners | The local canonical hostname, normally the FQDN, as resolved by the broker's runtime environment. |
| `advertisedListeners` and `internalListenerName` are used, with `advertisedAddress` configured | The configured `advertisedAddress`, even if the selected internal listener advertises a different hostname. |
| `advertisedListeners` and `internalListenerName` are used, with `advertisedAddress` unset or blank | The local canonical hostname. The internal listener's hostname does not replace it in the broker ID. |

`advertisedListeners` defines connection endpoints, and `internalListenerName` selects the listener for cluster-internal communication. Neither changes the address used for isolation-policy matching. Do not build the regex from a listener URL unless its hostname also matches the broker's registered identity. A trailing dot in `advertisedAddress` is removed when the broker ID is formed.

For example, consider these broker settings:

```properties
advertisedAddress=broker-0.brokers.example.com
internalListenerName=internal
advertisedListeners=internal:pulsar://broker-0.internal.example.com:6650,external:pulsar://broker-0.public.example.com:6650
```

The isolation regex must match `broker-0.brokers.example.com`, such as `broker-[0-9]+[.]brokers[.]example[.]com`. It does not match against `broker-0.internal.example.com` or `broker-0.public.example.com`. If `advertisedAddress` is left blank, use the broker's resolved canonical hostname instead, even with the same listener configuration.

Verify the actual registered IDs before creating the policy:

```shell
pulsar-admin brokers list my-cluster
```

For an ID such as `broker-0.brokers.example.com:8080`, match `broker-0.brokers.example.com`. On Kubernetes, this is typically a per-pod FQDN when using the default canonical hostname; verify the output rather than assuming a particular DNS suffix.

## Configure a namespace isolation policy

:::info Broker reservation

Brokers matching a policy's primary regex are excluded from normal bundle assignment for namespaces without an isolation policy. Secondary brokers remain in the shared pool unless a policy also lists them as primary. Another isolation policy can explicitly allow its namespaces onto the same brokers, so check for overlapping broker selections.

For a rollout example, see [Test the replacement with canary namespaces](administration-rolling-upgrade.md#test-the-replacement-with-canary-namespaces).

:::

To set a namespace isolation policy for a broker cluster, you can use one of the following methods.

````mdx-code-block
<Tabs
  defaultValue="Pulsar-admin CLI"
  values={[{"label":"Pulsar-admin CLI","value":"Pulsar-admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java admin API","value":"Java admin API"}]}>

<TabItem value="Pulsar-admin CLI">

```shell
pulsar-admin ns-isolation-policy set options
```

For more information about the command `pulsar-admin ns-isolation-policy set options`, see [Pulsar admin docs](/reference/#/@pulsar:version_reference@/pulsar-admin/).

**Example**

For an Apache Pulsar Helm chart release named `pulsar` in the Kubernetes namespace `pulsar`, with the default component names and cluster domain `cluster.local`, reserve brokers `pulsar-broker-0.pulsar-broker-headless.pulsar.svc.cluster.local` and `pulsar-broker-1.pulsar-broker-headless.pulsar.svc.cluster.local` for the `finance/payments` namespace in the `production` Pulsar cluster, with broker ordinals `2` through `19` as the secondary group:

```shell
pulsar-admin ns-isolation-policy set production payments-brokers \
  --auto-failover-policy-type min_available \
  --auto-failover-policy-params min_limit=1,usage_threshold=80 \
  --namespaces 'finance/payments' \
  --primary 'pulsar-broker-[01][.]pulsar-broker-headless[.]pulsar[.]svc[.]cluster[.]local' \
  --secondary 'pulsar-broker-([2-9]|1[0-9])[.]pulsar-broker-headless[.]pulsar[.]svc[.]cluster[.]local'
```

The quoted regexes select broker ordinals `0` and `1` as primary and `2` through `19` as secondary by their complete advertised addresses, with `[.]` matching a literal dot. The secondary group provides fallback when the policy allows failover and remains available for ordinary namespaces unless another policy reserves those brokers as primary. Replace the cluster, namespace, and broker addresses with your own.

To delete this policy:

```shell
pulsar-admin ns-isolation-policy delete production payments-brokers
```

After the deletion propagates, brokers `0` and `1` become eligible for normal bundle assignment for namespaces without isolation policies, unless another policy still reserves them as primary. When retiring a reserved broker group, keep its policy until the brokers have unregistered if they must remain excluded from ordinary workloads. Changing the primary regex to cover the remaining shared brokers would reserve those brokers too; it is not equivalent to removing the policy.

</TabItem>
<TabItem value="REST API">

The namespace isolation endpoints are part of the **clusters** API. See the OpenAPI reference for request bodies, parameters, and responses:

| Operation | REST API reference |
|---|---|
| Create or update a policy | [](swagger:/admin/v2/setNamespaceIsolationPolicy?tag=clusters) |
| Get a policy | [](swagger:/admin/v2/getNamespaceIsolationPolicy?tag=clusters) |
| List policies | [](swagger:/admin/v2/getNamespaceIsolationPolicies?tag=clusters) |
| Delete a policy | [](swagger:/admin/v2/deleteNamespaceIsolationPolicy?tag=clusters) |
| List brokers with their isolation policy information | [](swagger:/admin/v2/getBrokersWithNamespaceIsolationPolicy?tag=clusters) |
| Get isolation policy information for a broker | [](swagger:/admin/v2/getBrokerWithNamespaceIsolationPolicy?tag=clusters) |

</TabItem>
<TabItem value="Java admin API">

Use the [`Clusters`](@pulsar:javadoc:admin@/org/apache/pulsar/client/admin/Clusters.html) API, available through `PulsarAdmin.clusters()`. The following asynchronous methods correspond to the REST operations above; synchronous counterparts without the `Async` suffix are also available.

| Operation | Java admin API reference |
|---|---|
| Create a policy | [`createNamespaceIsolationPolicyAsync`](@pulsar:javadoc:admin@/org/apache/pulsar/client/admin/Clusters.html#createNamespaceIsolationPolicyAsync(java.lang.String,java.lang.String,org.apache.pulsar.common.policies.data.NamespaceIsolationData)) |
| Update a policy | [`updateNamespaceIsolationPolicyAsync`](@pulsar:javadoc:admin@/org/apache/pulsar/client/admin/Clusters.html#updateNamespaceIsolationPolicyAsync(java.lang.String,java.lang.String,org.apache.pulsar.common.policies.data.NamespaceIsolationData)) |
| Get a policy | [`getNamespaceIsolationPolicyAsync`](@pulsar:javadoc:admin@/org/apache/pulsar/client/admin/Clusters.html#getNamespaceIsolationPolicyAsync(java.lang.String,java.lang.String)) |
| List policies | [`getNamespaceIsolationPoliciesAsync`](@pulsar:javadoc:admin@/org/apache/pulsar/client/admin/Clusters.html#getNamespaceIsolationPoliciesAsync(java.lang.String)) |
| Delete a policy | [`deleteNamespaceIsolationPolicyAsync`](@pulsar:javadoc:admin@/org/apache/pulsar/client/admin/Clusters.html#deleteNamespaceIsolationPolicyAsync(java.lang.String,java.lang.String)) |
| List brokers with their isolation policy information | [`getBrokersWithNamespaceIsolationPolicyAsync`](@pulsar:javadoc:admin@/org/apache/pulsar/client/admin/Clusters.html#getBrokersWithNamespaceIsolationPolicyAsync(java.lang.String)) |
| Get isolation policy information for a broker | [`getBrokerWithNamespaceIsolationPolicyAsync`](@pulsar:javadoc:admin@/org/apache/pulsar/client/admin/Clusters.html#getBrokerWithNamespaceIsolationPolicyAsync(java.lang.String,java.lang.String)) |

</TabItem>

</Tabs>
````


## Control unloading when updating a policy

Creating or updating a policy can unload namespaces immediately, independently of automatic load shedding. Use `--unload-scope` on `ns-isolation-policy set` to control this behavior:

| Value | Behavior |
|---|---|
| `changed` (default) | Unloads namespaces matching namespace regexes added or removed by the update. If the primary broker regex list changes, unloads namespaces matching either the old or new namespace regexes. |
| `all_matching` | Unloads namespaces matching either the old or new namespace regexes. |
| `none` | Does not unload namespaces as part of the policy update. Existing bundles keep their owners until they are moved or otherwise unloaded. |

For a controlled rollout, specify `--unload-scope none` when creating the policy and on every subsequent update, wait for policy propagation, then move the intended bundles explicitly. Disabling automatic load shedding alone does not prevent policy-triggered unloads. Conversely, `none` does not disable automatic shedding or prevent other operations from unloading bundles.

The `changed` scope compares namespace regex entries and the primary broker regex list; it does not check every existing bundle's placement. Changing only the secondary broker list or failover parameters does not trigger unloading under this scope. Verify actual ownership after policy changes and transfers.

## Understand secondary broker failover

With `--auto-failover-policy-type min_available`, the modular and extensible load managers make secondary brokers eligible when the number of registered primary candidates is below `min_limit`. With `min_limit=1`, this happens when no primary candidate is available. This decision uses broker membership, not an application health test; `usage_threshold` does not add a load-based failover check to this candidate-count decision.

Omitting `--secondary` confines normal assignment to the primary group, but leaves the namespace without an eligible owner if that group is unavailable. There is no fallback to arbitrary shared brokers outside the policy's primary and secondary groups.

## Placement and rebalancing considerations

- **Policies select entire namespaces.** They do not select a percentage of requests or individual topics. Adding a namespace makes all its bundles eligible for the selected brokers, even if you initially move only a few bundles.
- **Avoid overlapping namespace regexes across policies.** Matching policies are not combined. Audit primary and secondary broker selections as well so another policy does not admit unintended namespaces to a reserved group.
- **Explicit administrative destinations can bypass placement filtering.** With either load manager, validate every `--destinationBroker` against the intended isolation policy before transferring a bundle.
- **Check other placement filters.** Nondefault settings such as `preferLaterVersions` can affect broker selection during a mixed-version rollout.
- **Isolation controls ownership placement.** Shared Services can still route lookup or admin requests to a reserved broker. Brokers continue to participate in the same cluster coordination and shared storage; namespace isolation does not provide a separate cluster or network security boundary.

The extensible load manager skips automatic shedding of bundles with isolation policies by default, unless `loadBalancerSheddingBundlesWithPoliciesEnabled=true`. If you retain isolation policies after a rollout, restoring global load shedding alone does not rebalance those bundles.

:::tip

To guarantee all the data that belongs to a namespace is stored in desired bookies, you can isolate the data of the namespace into user-defined groups of bookies. See [configure bookie affinity groups](administration-isolation-bookie.md#configure-bookie-affinity-groups) for more details.

:::
