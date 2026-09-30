---
id: administration-upgrade
title: Upgrade guide
sidebar_label: "Cluster upgrade"
description: Learn to upgrade a Pulsar cluster.
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

:::important Upgrading to Pulsar 5.x?

<span id="before-upgrading-to-pulsar-50" />
<span id="check-runtime-and-packaging-requirements" />
<span id="remove-garbage-collector-overrides" />
<span id="enable-transparent-huge-pages-and-configure-linux-kernel-settings" />
<span id="prepare-persisted-standalone-data" />
<span id="check-application-and-plugin-compatibility" />
<span id="check-metadata-and-broker-configuration" />
<span id="preserve-and-rehearse-rollback" />
<span id="choose-java-client-dependencies-separately" />
<span id="align-application-netty-dependencies" />
<span id="check-authentication-tls-and-extensions" />
<span id="check-functions-behavior-and-extensions" />

Complete the [Upgrading to Pulsar 5.0.x checklist](administration-upgrade-to-5.0.x.md) before following the software upgrade procedures below. Its subpages cover configuration defaults, applications and plugins, and metrics changes.

:::

:::info Using Kubernetes?

This guide was originally written when servers were treated more like pets than cattle: individually named, carefully tended, and upgraded one at a time. Its manual, server-by-server procedures are not a practical runbook for Kubernetes and other modern orchestrated deployments. Updates to this guidance are pending.

If brief periods of service unavailability are acceptable, the default Apache Pulsar Helm chart provides a straightforward way to upgrade a cluster. It does not guarantee uninterrupted service or a maximum outage duration. Start with [Upgrading Pulsar on Kubernetes](helm-upgrade.md). If you need to minimize disruption during broker upgrades, see [Rolling upgrade of brokers: Kubernetes deployments](administration-rolling-upgrade.md#kubernetes-deployments).

:::

This guide covers upgrades across the Pulsar cluster and the order in which to upgrade its components. For broker-specific rollout strategies, graceful shutdown, and load distribution, see [Rolling upgrade of brokers](administration-rolling-upgrade.md).

## Plan and validate rollback

Every software upgrade should have a rollback strategy. First upgrade to the latest maintenance release in your current supported line and run it with your own workloads for a sufficient period to establish stability. Include normal traffic, peak load, and important operational events; a successful startup alone is not enough.

Preserve the binaries or images, configuration, and recoverable data and metadata for that proven baseline. Rehearse both upgrade and rollback. Restoring an older binary does not undo shared metadata or storage-format changes; follow the target release's compatibility requirements. For Pulsar 5.0.x, see [rollback preparation](administration-upgrade-to-5.0.x.md#preserve-and-rehearse-rollback).

## Upgrade guidelines

Apache Pulsar is comprised of multiple components, the metadata store (Oxia or ZooKeeper), bookies, and brokers. These components are either stateful or stateless. You do not have to upgrade the metadata store unless you have special requirements. While you upgrade, you need to pay attention to bookies (stateful), brokers, and proxies (stateless).

Read the following guidelines before upgrading a Pulsar cluster.

- Back up all your configuration files before upgrading.
- Read the guide entirely, make a plan, and then execute the plan. When you make an upgrade plan, you need to take your specific requirements and environment into consideration.
- Pay attention to the [upgrade sequence of components](#upgrade-sequence). In general, you do not need to upgrade your metadata store or configuration store cluster. You need to upgrade bookies first, and then upgrade brokers, proxies, and your clients.
- If `autorecovery` is enabled, you need to disable `autorecovery` in the upgrade process, and re-enable it after completing the process.
- Read the [release highlights](release-highlights.md) and release notes carefully for each release. They contain features and configuration changes that might impact your upgrade.
- Upgrade a small subset of nodes of each type to canary test the new version before upgrading all nodes of that type in the cluster. When you have upgraded the canary nodes, run for a while to ensure that they work correctly.
- Upgrade one data center to verify the new version before upgrading all data centers if your cluster runs in multi-cluster replicated mode.

:::note

Client and wire-protocol compatibility does not make every configuration, extension, or new feature compatible with older servers. Review the target release's upgrade requirements and [rollback considerations](#plan-and-validate-rollback), and test the mixed-version period with your applications.

For updating brokers in Kubernetes, please check [Kubernetes deployments](administration-rolling-upgrade.md#kubernetes-deployments).

:::

## Upgrade sequence

To upgrade an Apache Pulsar cluster, follow the upgrade sequence.

1. Upgrade the metadata store (optional). The steps below describe a ZooKeeper-based metadata store; if you use Oxia, follow the equivalent procedure in the [Oxia documentation](https://oxia-db.github.io/).
   - Canary test: test an upgraded version in one or a small set of metadata store nodes.
   - Rolling upgrade: roll out the upgraded version to all metadata store nodes incrementally, one at a time. Monitor your dashboard during the whole rolling upgrade process.
2. Upgrade bookies.
   - Canary test: test an upgraded version in one or a small set of bookies.
   - Rolling upgrade:
     - a. Disable `autorecovery` with the following command.

     ```shell
     bin/bookkeeper shell autorecovery -disable
     ```

     - b. Roll out the upgraded version to all bookies in the cluster after you determine that a version is safe after canary.
     - c. After you upgrade all bookies, re-enable `autorecovery` with the following command.

     ```shell
     bin/bookkeeper shell autorecovery -enable
     ```

3. Upgrade brokers.
   - Canary test: test an upgraded version in one or a small set of brokers.
   - Rolling upgrade: roll out the upgraded version to all brokers in the cluster after you determine that a version is safe after canary. Follow the procedure in [Rolling upgrade of brokers](administration-rolling-upgrade.md) so that each broker hands over its bundles gracefully and the load balancer does not rebalance the cluster while brokers are still being restarted. For Kubernetes, first configure the [deployment prerequisites](administration-rolling-upgrade.md#kubernetes-deployments); the default StatefulSet `RollingUpdate` strategy does not enforce the Pulsar restart checks.
4. Upgrade proxies.
   - Canary test: test an upgraded version in one or a small set of proxies.
   - Rolling upgrade: roll out the upgraded version to all proxies in the cluster after you determine that a version is safe after canary.

## Upgrade ZooKeeper (optional)
While you upgrade ZooKeeper servers, you can do a canary test first, and then upgrade all ZooKeeper servers in the cluster.

### Canary test

You can test an upgraded version in one of ZooKeeper servers before upgrading all ZooKeeper servers in your cluster.

To upgrade a ZooKeeper server to a new version, complete the following steps:

1. Stop the ZooKeeper server.
2. Upgrade the binary and configuration files.
3. Start the ZooKeeper server with the new binary files.
4. Use `pulsar zookeeper-shell` to connect to the newly upgraded ZooKeeper server and run a few commands to verify if it works as expected.
5. Run the ZooKeeper server for a few days, observe and make sure the ZooKeeper cluster runs well.

:::tip

If issues occur during the canary test, you can shut down the problematic ZooKeeper node, revert the binary and configuration, and restart the ZooKeeper with the reverted binary.

:::

### Upgrade all ZooKeeper servers

After the canary test to upgrade one ZooKeeper in your cluster, you can upgrade all ZooKeeper servers in your cluster.

You can upgrade all ZooKeeper servers one by one by following the steps in the canary test.

## Upgrade bookies

While you upgrade bookies, you can do a canary test first, and then upgrade all bookies in the cluster.
For more details, you can read Apache BookKeeper [Upgrade guide](https://bookkeeper.apache.org/docs/next/admin/upgrade).

### Canary test

You can test an upgraded version in one or a small set of bookies before upgrading all bookies in your cluster.

To upgrade a bookie to a new version, complete the following steps:

1. Stop the bookie.
2. Upgrade the binary and configuration files.
3. Start the bookie in `ReadOnly` mode to verify if the bookie of this new version runs well for reading workload.

   ```shell
   bin/pulsar bookie --readOnly
   ```

4. When the bookie runs successfully in `ReadOnly` mode, stop the bookie and restart it in `Write/Read` mode.

   ```shell
   bin/pulsar bookie
   ```

5. Observe and make sure the cluster serves both write and read traffic.

:::tip

If issues occur during the canary test, stop the rollout and shut down the problematic bookie. Use the BookKeeper upgrade and recovery guidance to decide whether to restore the node or replace it. Auto-recovery does not run while it is disabled for the upgrade.

:::

### Upgrade all bookies

After the canary test to upgrade some bookies in your cluster, you can upgrade all bookies in your cluster.

Before upgrading, you have to decide whether to upgrade the whole cluster at once, including downtime and rolling upgrade scenarios.

In a rolling upgrade scenario, upgrade one bookie at a time. In a downtime upgrade scenario, shut down the entire cluster, upgrade each bookie, and then start the cluster.

While you upgrade in both scenarios, the procedure is the same for each bookie.

1. Stop the bookie.
2. Upgrade the software (either new binary or new configuration files).
2. Start the bookie.

:::tip

When you upgrade a large BookKeeper cluster in a rolling upgrade scenario, upgrading one bookie at a time is slow. If you configure a rack-aware or region-aware placement policy, you can upgrade bookies rack by rack or region by region, which speeds up the whole upgrade process.

:::

## Upgrade brokers and proxies

:::tip The default Kubernetes rolling update may be sufficient

**Following the controlled procedures in the [rolling broker upgrade guide](administration-rolling-upgrade.md) is not required to perform a rolling upgrade of brokers.** On Kubernetes, the simplest option is the Apache Pulsar Helm chart's default `RollingUpdate` strategy. Kubernetes replaces broker pods automatically as their template changes. If your applications tolerate the resulting client interruptions, use this default strategy; you do not need to orchestrate the additional steps described in that guide.

Use the controlled procedures when you need to minimize client disruptions and manage load distribution during the rollout. With either approach, allow enough time for graceful shutdown; see [Allow enough time for termination](administration-rolling-upgrade.md#allow-enough-time-for-termination).

:::

The upgrade procedure for brokers and proxies is the same. Brokers and proxies are `stateless`, so upgrading the two services is easy. A broker does own the bundles that are assigned to it, though, and hands them over to the other brokers when it stops; how that happens, how long it takes and how to keep the load balancer from reacting to every restart is described in [Rolling upgrade of brokers](administration-rolling-upgrade.md).

:::note When using a controlled rollout

For upgrades that require minimizing disruption, follow the [rolling upgrade procedure for brokers](administration-rolling-upgrade.md), including during the canary. Before using these controlled procedures in Kubernetes, configure the [Kubernetes deployment prerequisites](administration-rolling-upgrade.md#kubernetes-deployments), including controlled pod deletion with an API-calling `preStop` hook, a sufficient termination budget, and the required Service layout. These [shared prerequisites](administration-rolling-upgrade.md#prerequisites-for-both-controlled-strategies) apply to both in-place replacement and replacement with a new broker StatefulSet.

The Apache Pulsar Helm chart does **not** automate this procedure by default; the Pulsar-aware rollout automation is currently missing, and contributions are welcome. Some parts of full automation require Kubernetes operator logic or an equivalent custom controller. **The Apache Pulsar project does not provide a Kubernetes operator for Pulsar.** Arrange the required orchestration yourself; a Helm upgrade alone does not perform these checks.

:::

### Canary test

You can test an upgraded version in one or a small set of nodes before upgrading all nodes in your cluster.

To upgrade a broker (or proxy) to a new version, complete the following steps:

1. Stop a broker (or proxy). Stop a broker with `pulsar-admin --admin-url <broker-admin-url> brokers shutdown` or `SIGTERM`, and wait for the process to exit: it releases its bundles first (see [What happens when a broker stops](administration-rolling-upgrade.md#what-happens-when-a-broker-stops)). Use the individual broker's admin URL so the command reaches the intended broker.
2. Upgrade the binary and configuration file.
3. Start a broker (or proxy).
4. For a broker, verify registration, health at its individual admin URL, reachability, and load reporting before continuing with the next one. Follow all checks in [Restart one broker at a time](administration-rolling-upgrade.md#restart-one-broker-at-a-time).

:::tip

If issues occur during the canary test, stop the rollout and shut down the problematic broker (or proxy) node. Restore its previous binary or image and matching configuration, then restart it and repeat the health and traffic-recovery checks. Confirm the [rollback prerequisites](#plan-and-validate-rollback) before reverting versions; restoring a binary does not undo shared metadata changes.

:::

### Upgrade all brokers or proxies

After the canary test to upgrade some brokers or proxies in your cluster, you can upgrade all brokers or proxies in your cluster.

For a controlled rolling upgrade of brokers, follow the [rolling upgrade procedure for brokers](administration-rolling-upgrade.md) throughout the upgrade, from pausing automatic rebalancing to verifying recovery after the last broker restarts.

Before upgrading, you have to decide whether to upgrade the whole cluster at once, including downtime and rolling upgrade scenarios.

In a rolling upgrade scenario, you can upgrade one broker or one proxy at a time if the size of the cluster is small. If your cluster is large, you can upgrade brokers or proxies in batches. When you upgrade a batch of brokers or proxies, make sure the remaining brokers and proxies in the cluster have enough capacity to handle the traffic during the upgrade. When using the controlled procedure, before you start rolling the brokers, [pause automatic load shedding and bundle splitting](administration-rolling-upgrade.md#pause-automatic-rebalancing-during-the-upgrade), and restore their previous settings when the last broker is healthy and reporting load.

In a downtime upgrade scenario, shut down the entire cluster, upgrade each broker or proxy, and then start the cluster.

For each broker or proxy, perform the following steps. During a controlled rolling broker upgrade, apply them as part of the [rolling upgrade procedure for brokers](administration-rolling-upgrade.md), restart the current leader last, and complete the [registration, health, reachability, and load-reporting checks](administration-rolling-upgrade.md#restart-one-broker-at-a-time) before stopping the next broker. Query the current leader with `pulsar-admin brokers leader-broker` (`GET /admin/v2/brokers/leaderBroker`). Verify that the replacement's load information and updated reports reflecting the increased workload on receiving brokers have reached the load managers making placement decisions before continuing. For a controlled rollout on Kubernetes, choose either [in-place replacement with `OnDelete` or replacement with a new StatefulSet](administration-rolling-upgrade.md#choose-a-rollout-strategy). The stop/start steps below describe in-place replacement; the new-pool alternative starts each new broker and transfers workload before retiring an old one. Both require the same health and load-reporting checks.

1. Stop the broker (or proxy) and wait for the process to exit.
2. Upgrade the software (either new binary or new configuration files).
3. Start the broker (or proxy) and, for a broker, complete the [restart checks](administration-rolling-upgrade.md#restart-one-broker-at-a-time) before stopping the next one.

:::tip

To check the health of the broker, use its individual admin URL with the following command or API. A shared Service or proxy can send the health check to a different broker.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"}]}>

<TabItem value="Admin CLI">

```bash
pulsar-admin --admin-url <broker-admin-url> brokers healthcheck
```

</TabItem>
<TabItem value="REST API">

Send a `GET` request to this endpoint: [](swagger:/admin/v2/healthCheck)

</TabItem>

</Tabs>
````

:::
