---
id: administration-rolling-upgrade
title: Rolling upgrade of brokers
sidebar_label: "Rolling upgrade of brokers"
description: Learn to upgrade or reconfigure Pulsar brokers incrementally with minimal service disruption and controlled load distribution.
---

A **rolling upgrade of brokers** applies a new software version or a configuration change incrementally, with the aim of keeping the Pulsar service available and minimizing disruption. Brokers are restarted or replaced one at a time, or in controlled batches, until every broker runs the intended version and configuration. For configuration settings that require a restart, the change is fully effective only after all brokers have been restarted or replaced.

This guide focuses on broker availability, bundle placement, and load distribution during that process. For a cluster-wide upgrade, follow the [Cluster upgrade guide](administration-upgrade.md), which covers component ordering and upgrades of bookies, the metadata store, brokers, proxies, and clients.

## When to use this guide

**Following the controlled procedures in this guide is not required to perform a rolling upgrade of brokers.** On Kubernetes, the simplest option is the **Apache Pulsar Helm chart's default `RollingUpdate` strategy**. Kubernetes replaces broker pods automatically as their template changes. If your applications tolerate the resulting client interruptions, use this default strategy; you do not need to orchestrate the additional steps described here.

For this default approach, the main setting to tune is **`terminationGracePeriodSeconds`**, configured as `broker.gracePeriod` in the Helm chart. Allow enough time for the broker to drain its bundles and finish shutting down before Kubernetes forcefully terminates it. The chart default of 30 seconds can be too short; size the value from observed shutdown times as described in [Allow enough time for termination](#allow-enough-time-for-termination).

The problem these procedures address is disruption during the transition between brokers. When a broker stops, its namespace bundles need an available owner and its clients must reconnect. The receiving brokers take on more load, while a newly started broker initially has little or none. Kubernetes readiness alone does not confirm that transferred traffic has recovered or that updated load reports have reached the load manager. Proceeding too quickly, or allowing automatic rebalancing to move bundles repeatedly during the rollout, can prolong client interruptions and create uneven load.

With a default rollout, these client micro-outages can last from a few seconds to several minutes, depending on shutdown and startup times, ownership recovery, load, and client retry behavior. **Use this guide when those interruptions are unacceptable or you need to reduce load imbalance and repeated bundle movement during broker upgrades.** The procedures coordinate graceful shutdown, replacement capacity, load reporting, and rebalancing to minimize service disruption. Topic hand-off and client reconnection can still briefly interrupt operations.

## Using the controlled procedures

The steps below use `pulsar-admin` commands for readability. Every one of them is an admin API call and can be issued from whatever drives your broker upgrades: a script calling the [REST API](reference-rest-api-overview.md#automate-with-the-rest-api) with `curl`, a client generated from the [OpenAPI specification](reference-rest-api-overview.md#generate-a-client-from-the-specification), or the Java or Go admin library inside a Kubernetes operator or a deployment pipeline. See [Admin API - Get started](admin-get-started.md) for an overview of the interfaces and how to set them up.

:::info Running Pulsar on Kubernetes?

You may find it helpful to start with [Kubernetes deployments](#kubernetes-deployments). That section compares the rollout strategies, explains their shared requirements, and links to the relevant procedures elsewhere in this guide, including graceful shutdown, load reporting, and rebalancing.

:::

## What happens when a broker stops

When a broker receives `SIGTERM`, or when you run `pulsar-admin brokers shutdown`, it goes through the following steps:

1. The broker disables itself in the load manager to stop accepting new bundle assignments. With the extensible load manager, ownership cleanup happens as part of this step, before the broker unregisters.
2. The broker releases the bundles it owns.
   - With the **modular** load manager, the broker unloads its owned bundles one after another. The topics of a bundle are closed in parallel, then the ownership of the bundle is released in the metadata store. Clients of the closed topics reconnect through a lookup; the lookup redirects them to the leader broker, which assigns the bundle to a new owner.
   - With the **extensible** load manager, the stopping broker selects new owners and transfers ownerships through the **ownership channel**, which coordinates bundle ownership state between brokers. Ownership overrides are submitted in concurrent batches, controlled by `loadBalancerServiceUnitStateMaxConcurrentOverrides` (64 by default), with system bundles handled after the other bundles. For clients that support broker redirection, the new owner is included in the message that closes the topic on the client, allowing reconnection without a lookup ([PIP-307](https://github.com/apache/pulsar/blob/master/pip/pip-307.md)). The shutdown destination is selected by the placement strategy, so a recently restarted, lightly loaded broker can receive many transfers at once.

   Unused bundles do not add to the shutdown time. The broker logs `Disable broker in load manager completed in seconds` and then `Unloading namespace-bundles completed in seconds`. Include **both phases** when measuring the drain: extensible ownership transfers happen in the first phase. The subsequent per-bundle unload loop uses `namespaceBundleUnloadingTimeoutMs` (60 seconds by default) for each bundle; this is not a limit on the total drain time.
3. The broker closes its remaining services and exits. `brokerShutdownTimeoutMs` (60 seconds) bounds this last step, not the release of the bundles in the step before.

### Ownership leases and forced termination

With the **modular load manager**, ownership of a namespace bundle acts as a **lease tied to the broker's metadata-store session**. Pulsar implements this lease through its metadata-store lock API, using an ephemeral znode in ZooKeeper or an ephemeral record in Oxia. That entry contains the owning broker's advertised addresses. Lookups return that owner while its ownership entry exists; a different owner cannot simply claim the bundle because the old broker's TCP connection has failed. During a graceful unload, the broker closes the topics and explicitly releases the ownership lease by deleting its ephemeral entry, allowing the bundle to be assigned again without waiting for session expiry.

If the broker process crashes or Kubernetes terminates it with **`SIGKILL` (signal 9, as in `kill -9`)**, it cannot run the shutdown hooks that release ownership and close the metadata-store session. ZooKeeper or Oxia can retain the session and its ephemeral entries until the session expires. Pulsar requests a session timeout of `metadataStoreSessionTimeoutMillis=30000` by default. When the old session expires, the metadata store deletes its ephemeral entries, releasing the ownership leases. A surviving broker with a different identity must wait for this cleanup before acquiring ownership, adding an unavailability window for the affected topics. The delay is governed by the remaining session lifetime and the store's expiry processing, not an exact 30 seconds from pod deletion; ZooKeeper also negotiates the timeout within its server-side limits. See [ZooKeeper sessions](https://zookeeper.apache.org/doc/current/zookeeperProgrammers.html#ch_zkSessions) and [Oxia ephemeral records](https://oxia-db.github.io/docs/features/ephemerals).

There is an important exception for a replacement with the **same advertised ownership information**. Pulsar can recognize it as the same logical owner and reestablish the ownership lease under its new session by replacing the stale ephemeral entry before the old session expires. A StatefulSet's stable per-pod hostname makes this possible when the advertised URLs, ports, and listeners remain the same. The complete ownership record must match, including its `disabled` flag. If the old broker dies during an unload after marking the bundle disabled, the replacement cannot use this same-owner reclaim path for that bundle and may have to wait for session expiry. A stable pod name alone is insufficient if the advertised values change. Clients still cannot use that broker until the replacement is reachable and has loaded their topics.

The **extensible load manager** uses its ownership channel instead of this per-bundle session-backed lease mechanism. Its leader detects an inactive broker, verifies that it is gone with a health check, and reassigns its bundles. Cleanup scheduling also depends on the leader's metadata-store connection: a stable session adds no scheduling delay, a recently reestablished session defers cleanup by 180 seconds, and an unstable session causes cleanup to be skipped until recovery permits it. These are scheduling decisions, not guarantees of when topics become available. Do not apply the modular manager's lease-expiry timing to extensible ownership recovery. In either case, allow graceful shutdown to finish to avoid the additional recovery delay.

## Drain a broker at a controlled rate

Releasing all bundles as fast as possible produces a burst of reconnecting clients, lookups and topic loads on the remaining brokers. With the **modular load manager**, use the admin API to rate-limit the per-bundle unload loop instead of sending `SIGTERM`:

```shell
pulsar-admin --admin-url http://broker-0.example.com:8080 brokers shutdown --max-concurrent-unload-per-sec 5
```

Target the individual broker's admin URL, with the authentication and TLS settings required by your cluster. Sending this command through a shared Service or proxy can shut down a different broker from the one you intend to restart.

The option limits the rate at which the unload loop starts bundles, and the broker shuts down afterwards. Without the option, or with `SIGTERM`, that loop has no rate limit. Add `--forced-terminate-topic` to close topics without waiting for their clients to disconnect first; the `SIGTERM` path already uses that behavior. Unlike the CLI, the REST shutdown endpoint defaults `forcedTerminateTopic` to `true` when omitted; pass `forcedTerminateTopic=false` to wait for clients to disconnect.

With the **extensible load manager**, ownership transfers happen when the broker disables itself, before this rate-limited loop runs. `--max-concurrent-unload-per-sec` therefore does **not** throttle those transfers. The dynamic setting `loadBalancerServiceUnitStateMaxConcurrentOverrides` (64 by default) controls the batch size of ownership overrides; lowering it reduces the number submitted together, but does not set a per-second transfer rate or bound all client reconnections and topic loads. To pace the workload moves, [move bundles explicitly](#move-bundles-yourself) before shutting down the broker.

Whatever the rate, the process must be allowed to finish. Measure the full drain of your slowest broker, including the disable and unload phases, then allow `brokerShutdownTimeoutMs` for the remaining services and a margin for variation. On Kubernetes this is `terminationGracePeriodSeconds`; see [Allow enough time for termination](#allow-enough-time-for-termination).

<span id="pause-automatic-rebalancing-during-the-restart" />

## Pause automatic rebalancing during the upgrade

The load manager reacts to every restart: the bundles released by a stopping broker raise the load of the others, and a broker that has just started is nearly idle. If load shedding runs while brokers are still being restarted, it moves bundles that the next restart moves again. Splitting can add more moves when `loadBalancerAutoUnloadSplitBundlesEnabled=true`. Both load managers re-read the following settings every cycle, so you can switch them off for the duration of the upgrade without restarting brokers to apply these settings. Record the existing dynamic overrides with `pulsar-admin brokers get-all-dynamic-config` and the effective settings with `pulsar-admin brokers get-runtime-config` first:

```shell
pulsar-admin brokers update-dynamic-config --config loadBalancerSheddingEnabled --value false
pulsar-admin brokers update-dynamic-config --config loadBalancerAutoBundleSplitEnabled --value false
```

Wait for the settings to take effect before stopping the first broker. Pausing automatic shedding does not prevent graceful shutdown transfers, manual unloads, or recovery after a crash.

In particular, `loadBalancerSheddingEnabled=false` stops periodic rebalancing of already-owned bundles; it does not disable assignment of unowned bundles. Clients can look up a gracefully released bundle and reconnect to a surviving broker while shedding is paused. Pausing shedding therefore does not itself make topics unavailable, although closing and reopening topics still causes a client interruption during hand-off. Keep `loadBalancerEnabled` enabled and retain enough capacity on the remaining brokers.

Once surviving brokers receive the released bundles, that load stays with them until shedding resumes, unless another shutdown, failure, or explicit unload moves it. Starting an empty replacement does not automatically move existing load onto it while shedding is disabled. Check the increased load of the receiving brokers before stopping another broker; otherwise, successive shutdowns can concentrate traffic on too few brokers.

After the last broker is healthy and reporting load, restore the previous settings. If both were enabled, restore them with:

```shell
pulsar-admin brokers update-dynamic-config --config loadBalancerSheddingEnabled --value true
pulsar-admin brokers update-dynamic-config --config loadBalancerAutoBundleSplitEnabled --value true
```

Preserve settings that were already disabled; do not enable them merely because the upgrade finished. If you added a temporary dynamic override where none existed, remove it with `pulsar-admin brokers delete-dynamic-config --config <config-name>` to return to the file configuration.

Rebalancing can take multiple shedding cycles, depending on thresholds, cooldowns, bundle sizes, and placement policies. The default shedding strategies both handle the shape a cluster is in after a rolling upgrade of brokers: a few brokers carrying more than their share and the last restarted broker nearly empty:

- The **modular** load manager uses `AvgShedder` by default from Pulsar 5.0.0 (`ThresholdShedder` in 2.10 to 4.x and the 5.0.0-M1/M2 milestones). AvgShedder pairs the most and the least loaded broker and moves bundles between them once their difference has exceeded `loadBalancerAvgShedderHighThreshold` (40) for `loadBalancerAvgShedderHitCountHighThreshold` (2) consecutive cycles, or `loadBalancerAvgShedderLowThreshold` (15) for 8 cycles, and it pre-plans the destination of each bundle it moves. If you still run `ThresholdShedder`, an idle broker alone may not trigger shedding unless `lowerBoundarySheddingEnabled=true`; see [ThresholdShedder](administration-load-balance.md#thresholdshedder).
- The **extensible** load manager uses `TransferShedder`, which targets `loadBalancerBrokerLoadTargetStd` (0.25) and also checks for underloaded and overloaded brokers even when the standard-deviation target is met. Its cooldown requires load data timestamped at least `loadBalanceSheddingDelayInSeconds` (180) after a source broker's last scheduled unload; it is not a delay measured from broker startup. It skips shedding when a registered broker has no load data. See [TransferShedder](administration-load-balance.md#transfershedder).

For the modular load manager, use [AvgShedder](administration-load-balance.md#avgshedder) as both the shedding and placement strategy, as configured by default from Pulsar 5.0.0, after the 5.0.0-M1/M2 milestones. Once shedding resumes and the leader has current load reports, AvgShedder can pair heavily loaded brokers with lightly loaded replacements and direct shed bundles to those replacements. While shedding is paused, ordinary assignments without a planned shedding destination use random selection from the eligible candidates; AvgShedder does **not** guarantee that each released bundle goes to the newly started, least-loaded broker. Use [explicit destination unloads](#move-bundles-yourself) if the rollout needs that placement guarantee.

## Restart one broker at a time

**Restart the current leader broker last in this rollout.** With the modular load manager, each broker runs a load-manager instance, but the leader normally makes assignment decisions for unowned bundles and schedules shedding. Keeping it running while the other brokers are replaced preserves continuity of those decisions and its view of their load reports.

Query the current leader with:

```shell
pulsar-admin brokers leader-broker
```

The equivalent Admin REST API is `GET /admin/v2/brokers/leaderBroker`; its response includes `brokerId` and `serviceUrl`. Map that identity to the broker pod and leave it until the other brokers have been upgraded. Recheck leadership before selecting each pod because the leader can change during the rollout. Restart the leader only after the other brokers have passed the checks below, then verify that a new leader is elected and the replaced broker recovers. Leader-last ordering avoids an election in the middle of the other replacements; Pulsar can recover from a leader failure, so this is an orchestration rule rather than a requirement that the same leader survive indefinitely.

Stop the next broker only when the previous one is back and participating in load balancing:

1. Wait for the broker to be listed:

   ```shell
   pulsar-admin brokers list <cluster-name>
   ```

2. Wait for the restarted broker's health check to pass, using **that broker's own admin URL**:

   ```shell
   pulsar-admin --admin-url http://broker-0.example.com:8080 brokers healthcheck
   ```

   A health check through a shared Service or proxy can succeed on another broker. On Kubernetes, also check that the replacement pod is `Ready` and its advertised per-pod name resolves and is reachable from the brokers and proxies that use it.

   With the modular load manager, the leader normally identifies active brokers from their ephemeral registrations in the metadata store, without probing each broker directly. Registration is separate from the per-bundle ownership leases and is not proof of network reachability or health: a crashed broker can remain registered until session expiry. This is why an individual health check is required in addition to listing brokers. The extensible manager's inactive-broker recovery includes a health check, as described [above](#ownership-leases-and-forced-termination).

3. Wait for load reporting. With the modular load manager, the replacement publishes initial load data during registration, and the leader reads the reports into its own load-manager view in response to metadata-store notifications. **Do not stop the next broker until the replacement's current load information is available to the leader.** Local registration or a log saying that the replacement published a report does not by itself confirm that the leader has processed it. Verify this in the leader's load-manager diagnostics or monitoring, including the absence of errors reading the replacement's report.

   The extensible load manager schedules periodic reporting at `loadBalancerReportUpdateMinIntervalMillis` (5 seconds by default) after it is ready for incoming requests; scheduling, publication, and propagation can take longer. Allow at least a reporting interval after startup and verify that the report is available to the load managers making placement decisions and to the leader running the shedder. `loadBalancerDebugModeEnabled=true` enables diagnostic reporting logs; restore its previous value afterwards. A fixed sleep or a successful health check alone does not prove that load data has reached the load manager.

   **Check updated reports from the brokers that received the stopped broker's bundles too.** Their bundle counts, message rates, throughput, and resource usage must reflect the additional workload in the deciding load managers' view before the next shutdown. Wait for transferred client traffic to recover, then for the resulting load to be sampled, published, and processed. Publication thresholds and smoothed resource measurements can delay that view beyond a single reporting interval. Checking only the empty replacement's report can leave placement decisions based on the receivers' lower, pre-transfer load.

   Missing load data blocks extensible shedding and excludes the broker from load-based ranking, but placement can still choose it in the random fallback when no preferred candidate exists. Do not rely on missing load data to prevent early assignments.

If you upgrade in batches on a large cluster, keep the batch small enough that the remaining brokers can carry the released bundles, and apply the same wait between batches.

Avoid shortening client operation and retry timeouts to make a rollout finish faster. Allow time for ownership hand-off and reconnection; aggressive timeouts can turn a temporary interruption into repeated application retries.

## Move bundles yourself

Instead of letting each restarting broker release its bundles wherever the load manager puts them, you can move them to chosen brokers before stopping a broker, for example to fill a broker that has already been restarted:

```shell
pulsar-admin namespaces unload my-tenant/my-namespace --bundle 0x00000000_0x08000000 --destinationBroker broker-2.example.com:8080
```

Both load managers honor the destination: the extensible load manager transfers the bundle directly, the modular load manager applies the destination to the next assignment of the bundle. `pulsar-admin brokers namespaces <cluster-name> --url <broker-url>` lists the bundles a broker owns.

For a rollout with a second broker pool, start replacement capacity before unloading bundles to it, and retire old brokers only after their workload has moved. Both load managers support this rollout; the extensible load manager additionally redirects compatible clients to the destination broker without another lookup. See [Replace the existing broker StatefulSet with a new broker StatefulSet](#replace-the-existing-broker-statefulset-with-a-new-broker-statefulset) for the Kubernetes orchestration required.

If the rollout also changes the load manager type, follow [load manager migration](concepts-broker-load-balancing-migration.md#enable-lookup-redirection-during-a-rolling-migration). Pulsar 5.0 requires `loadManagerMigrationEnabled=true` on the existing brokers before introducing the new type. Plan for the new load manager's initial broker pool to receive new assignments, and keep an ownership-store migration separate from this rollout.

## Kubernetes deployments

To minimize disruption with the controlled rollout strategies below, the StatefulSet deployment used by the [Pulsar Helm chart](helm-overview.md) needs **rollout control, sufficient termination time, and the two-Service layout**. Apply the same requirements to custom manifests and operators. Using Pulsar Proxy does not remove them.

:::note Rollout automation

The Apache Pulsar Helm chart does **not** perform this Pulsar-aware rolling upgrade procedure for brokers automatically. Its default StatefulSet rollout does not pause and restore rebalancing, pace bundle transfers, or wait for all Pulsar restart checks before replacing the next broker.

Some parts of a fully automated rollout require Kubernetes operator logic, or an equivalent custom controller, to continuously observe cluster state and coordinate recovery and subsequent actions. Helm configuration alone cannot provide that reconciliation. **The Apache Pulsar project does not provide a Kubernetes operator for Pulsar.** This procedure can be followed manually or used as a reference for implementing an automated solution that implements the required procedures.

:::

### Why brokers use StatefulSets

Although brokers do not store durable message data locally, stable network identity is useful. A StatefulSet replacement retains its ordinal and name, such as `pulsar-broker-1` or `pulsar-broker-2`, and its headless Service supplies a stable per-pod DNS name even if the pod IP changes. These names are easier to target in administration commands and monitoring than generated Deployment pod names. They also allow certificates to list predictable, individual DNS names when wildcard certificates are prohibited; each certificate must cover the actual advertised endpoints.

Stable identity can also help recovery after a crash with the **modular load manager**. Clients retry connections with backoff, and lookups can keep returning the old advertised owner while its bundle ownership lease remains. If the replacement starts with the same advertised ownership information before the old metadata-store session expires, it can reclaim those leases and serve the same bundles, as described in [Ownership leases and forced termination](#ownership-leases-and-forced-termination). If expiry and reassignment happen first, another broker can own them instead. This is best-effort recovery subject to races, not a guarantee that every previous bundle returns to the replacement.

A Deployment normally gives a replacement pod a new name, so it does not provide this stable per-pod identity across pod replacement. A container restart within an existing Deployment pod can retain its identity, but that is different from replacing the pod. Custom deployments would need another way to preserve the same advertised endpoints to obtain the same recovery behavior.

### Choose a rollout strategy

The main difference is **how much control you need over replacement timing and bundle placement**.

| Strategy | Control over the rollout | Load distribution and bundle movement | When to choose it |
|---|---|---|---|
| **Default `RollingUpdate`** | Kubernetes replaces pods automatically, advancing on readiness. Tune [`terminationGracePeriodSeconds`](#allow-enough-time-for-termination). | Stopping brokers release bundles to surviving brokers; automatic shedding can move them again during the rollout. | The simplest option when client micro-outages and temporary load imbalance are acceptable. The controlled procedures below are optional. |
| **[In-place replacement with `OnDelete`](#replace-brokers-in-place-with-ondelete)** | You control each pod deletion and wait for Pulsar health and load-reporting checks. | Paused shedding avoids automatic reshuffling, but shutdown still redistributes bundles to surviving brokers. The replacement initially has little load. | Use when you need more control over timing without provisioning an additional broker. |
| **[Replace the existing broker StatefulSet with a new broker StatefulSet](#replace-the-existing-broker-statefulset-with-a-new-broker-statefulset)** | You start replacement capacity first and choose the destination and pace of bundle moves before deleting each old pod. | Direct moves let you preserve or deliberately adjust the distribution, avoiding an intermediate spread across surviving brokers and later reshuffling. | **Preferred for the most control over load balance and the fewest unnecessary bundle moves.** Requires temporary capacity for an additional broker and more orchestration. |

For the replacement-StatefulSet strategy, size each receiving broker for the workload you move to it and verify the resulting load before proceeding. Explicit placement makes a balanced rollout easier to maintain; it does not automatically correct an already uneven distribution or compensate for insufficient capacity.

The two controlled strategies share the prerequisites below. Default `RollingUpdate` remains available without implementing those procedures; its main tuning requirement is a sufficient termination budget.

### Prerequisites for both controlled strategies

Configure the following before deleting broker pods, whether replacing them in place or retiring them after moving bundles to a new StatefulSet. Neither strategy is automated by the Apache Pulsar Helm chart.

- **Graceful pod termination:** configure the broker container's [`preStop` hook](#configure-graceful-pod-termination) to call that broker's shutdown API when the pod is deleted.
- **Termination budget:** set [`terminationGracePeriodSeconds`](#allow-enough-time-for-termination) to cover the hook, bundle draining, and process shutdown.
- **Broker reachability:** use the [required Service layout](#required-services-for-brokers-and-zookeeper) for both the existing and replacement StatefulSets.
- **Rollout sequencing:** recheck leadership before choosing each broker, leave the current leader until last, and complete the [health, traffic-recovery, and load-reporting checks](#restart-one-broker-at-a-time) before proceeding.

**Before starting either strategy, disable automatic load shedding and bundle splitting**, as described in [Pause automatic rebalancing during the upgrade](#pause-automatic-rebalancing-during-the-upgrade). Keep them disabled for the entire rollout. **Re-enable them only after all old broker pods have been replaced and the health and load-reporting checks have passed**, restoring their previous settings if either was already disabled before the rollout.

#### Configure graceful pod termination

For both controlled strategies, **delete the pod normally and let its `preStop` hook invoke the shutdown API**. Configure `lifecycle.preStop` on the broker container to call [the individual broker's shutdown API](#drain-a-broker-at-a-controlled-rate), with the authentication and TLS settings required by your cluster. The hook must wait for the drain request to complete; do not launch the API call in the background. Kubernetes runs the hook before sending the termination signal. See [Kubernetes container lifecycle hooks](https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks).

**The Apache Pulsar Helm chart through version 4.7.0 does not provide a broker `preStop` hook or a values setting for one.** Add `lifecycle.preStop` to the broker container using a Helm post-renderer, a Kustomize patch, or a custom StatefulSet manifest. Without this customization, normal pod deletion sends `SIGTERM`, which still drains bundles gracefully but without the shutdown API's unload-rate limit and with forced topic closure. It must still finish within `broker.gracePeriod`. Support for a broker lifecycle-hook setting in the chart would make this easier; contributions are welcome.

The shutdown API stops the broker process; it does not delete the pod or apply an updated StatefulSet template. Calling it on a surviving pod can cause Kubernetes to restart the container with its old configuration. Orphaning a StatefulSet does not change this container restart behavior. Deleting the pod coordinates the API-driven drain with retirement of that pod: the existing StatefulSet creates its replacement in the in-place strategy, while an orphaned pod has no StatefulSet controller to recreate it.

Configure the hook in advance and verify that it is present on the **running pods being retired**, as well as in the replacement pod templates. Updating a StatefulSet template does not add a hook to existing pods. Validate the hook and its API access before relying on it during the rollout.

#### Allow enough time for termination

The termination budget is the pod's **`terminationGracePeriodSeconds`**, set by `broker.gracePeriod` in the Helm chart. The countdown starts when pod termination begins and includes both `preStop` execution and broker process shutdown; the hook does not get a separate allowance. See the Kubernetes [pod termination flow](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination-flow).

Size this budget from the slowest broker's **full disable-and-unload duration**, plus `brokerShutdownTimeoutMs` converted to seconds, any additional hook overhead, and a margin for variation. Do not count the drain twice when it runs inside `preStop`. The chart default is 30 seconds, which is shorter than `brokerShutdownTimeoutMs` alone; the drain occurs before that timeout starts. If the Kubernetes deadline expires, the broker can be killed before shutdown finishes and unfinished hand-offs require crash recovery. The 300-second example below is illustrative, not a universal setting.

```yaml
broker:
  # Example only: size from the full drain, shutdown, hook overhead, and a margin.
  gracePeriod: 300
```

#### Ensure broker reachability

For **both strategies**, each broker StatefulSet **must be bound through `spec.serviceName` to a headless Service with `publishNotReadyAddresses: true`** to avoid extending client interruptions with a readiness-dependent DNS delay. This applies to the existing StatefulSet and, when using a new pool, the replacement StatefulSet. It allows each replacement broker's advertised name to resolve before its readiness probe succeeds. It removes one avoidable source of downtime; broker startup, ownership recovery, topic loading, and client retry timing still determine when traffic resumes. See the [required Service layout](#required-services-for-brokers-and-zookeeper).

#### Coordinate components and verify the deployment

For either broker strategy, coordinate ZooKeeper, BookKeeper, and proxy changes separately; broker rollout settings do not control those components. When ZooKeeper must be restarted, preserve quorum and wait for each member to rejoin before restarting the next one. Follow the [upgrade sequence](administration-upgrade.md#upgrade-sequence).

Before the first deletion, [inspect the deployed resources](#verify-the-deployment-before-rolling), including the running pods' hooks and termination budgets. During the rollout, check both the replacement broker and the brokers receiving its predecessor's bundles; Kubernetes readiness alone does not verify traffic recovery or load-report propagation.

### Controlled rollout procedures

Choose one of the [controlled strategies](#choose-a-rollout-strategy) and apply the [shared prerequisites](#prerequisites-for-both-controlled-strategies), including leader-last ordering, before starting. Replacing the StatefulSet with a new pool does not require first performing the in-place `OnDelete` procedure.

#### Replace brokers in place with OnDelete

This `OnDelete` procedure applies to brokers deployed in a **StatefulSet**, with the stable identity described above. A Kubernetes Deployment does not support the StatefulSet `OnDelete` update strategy; use rollout orchestration appropriate to that controller.

Set `broker.updateStrategy.type: OnDelete` (chart 4.6.0 and later) before changing the broker image or pod configuration:

```yaml
broker:
  updateStrategy:
    type: OnDelete
```

The chart defaults to `RollingUpdate`. Kubernetes then advances according to pod readiness and any configured `minReadySeconds`; it does not check Pulsar registration, load reports, or whether transferred traffic has recovered. A pod can pass its readiness probe before these conditions are satisfied. A longer readiness-probe delay alone does not verify them.

You can change an existing StatefulSet's `spec.updateStrategy.type` to `OnDelete` without recreating it. Persist the change in Helm values or your deployment manifests and apply it **before** changing the pod template. Switching back to `RollingUpdate` can start automatic replacement of pods that still have an older revision, so keep `OnDelete` throughout the controlled rollout.

With `OnDelete`, applying a new pod template **does not restart existing pods**. Your script, operator, or manual procedure must delete one broker pod at a time using the [shared graceful-termination procedure](#configure-graceful-pod-termination). The StatefulSet recreates the pod with the updated template. Wait for its replacement to pass [all restart checks](#restart-one-broker-at-a-time) before proceeding to the next broker. Follow the leader-last ordering above, rather than deleting pods solely by ordinal. Repeat until every broker runs the intended revision. If you use another rollout controller, it must enforce those same checks before proceeding. See Kubernetes [StatefulSet update strategies](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#update-strategies).

Replacing a pod in place removes that broker's capacity until its replacement starts. Clients connected to the removed broker must reconnect, so this procedure is not a guarantee of uninterrupted client operations. If a bundle is handed off gracefully to a surviving broker, its clients can recover before the replacement starts. If ownership still points at the removed broker, clients can remain unavailable until the replacement starts and reclaims ownership, or until session expiry releases the old ownership lease and another broker acquires ownership. See [Ownership leases and forced termination](#ownership-leases-and-forced-termination). A [second broker pool](#replace-the-existing-broker-statefulset-with-a-new-broker-statefulset) lets you bring up replacement capacity before retiring old pods.

#### Replace the existing broker StatefulSet with a new broker StatefulSet

This is similar to a **blue-green deployment for the brokers alone**: the existing and replacement broker StatefulSets serve the same Pulsar cluster, while BookKeeper and the metadata store remain in place. Workload moves gradually, one broker at a time. If the upgrade causes problems, you can stop the rollout and move workload back to brokers running the previous version and configuration; see [Roll back a broker rollout](#roll-back-a-broker-rollout).

This rollout works with **both the modular and extensible load managers**: start each replacement broker, move bundles to it using explicit destination unloads, and then retire the old broker. Starting replacement capacity first and moving bundles gracefully avoids waiting for an in-place replacement to start or for session expiry to release an abandoned ownership lease.

The **extensible load manager** adds a client hand-off: when disconnecting compatible clients from a topic, it supplies the new broker address so they can reconnect directly, avoiding an extra lookup ([PIP-307](https://github.com/apache/pulsar/blob/master/pip/pip-307.md)). With the modular load manager, clients discover the destination through a lookup. Topic hand-off and client reconnection still introduce a short interruption with either manager.

This alternative replaces the whole StatefulSet rather than updating its pods in place. It does not depend on `OnDelete`: orphaning the old pods and explicitly retiring them controls their removal. Keep the new StatefulSet's pod template unchanged while growing it.

Use two broker pools in the **same Pulsar cluster**, with sufficient temporary capacity for one additional broker and enough capacity on each destination for the transferred workload. The following is an orchestration pattern, not an automated Helm feature. To test the replacement with selected namespaces first, complete the optional [canary phase](#test-the-replacement-with-canary-namespaces) before orphaning the existing StatefulSet in step 2:

1. With automatic shedding and splitting already paused, create a replacement StatefulSet with **one replica**, a distinct name, and a selector that does not match the old pods. Apply the [shared deployment prerequisites](#prerequisites-for-both-controlled-strategies), including its headless Service, advertised addresses, and certificates. Ensure the readiness-gated client Service can route to both pools. Keep the old headless Service and its DNS names available until all old pods have gone.
2. Before replacing brokers, stop Helm, GitOps, or another controller from recreating the old StatefulSet, and orphan its running pods:

   ```shell
   kubectl -n <namespace> delete statefulset <old-broker-statefulset> --cascade=orphan
   ```

   [Orphan deletion](https://kubernetes.io/docs/tasks/administer-cluster/use-cascading-deletion/#delete-owner-objects-and-orphan-dependents) leaves the pods running but removes the StatefulSet controller that would replace a deleted pod. The rollout controller or operator must now handle failures of those orphaned pods.
3. Wait for the new StatefulSet's first broker to pass all [registration, health, reachability, and load-reporting checks](#restart-one-broker-at-a-time).
4. Choose an old broker other than the current leader. Enumerate its workload bundles and [unload them with an explicit destination](#move-bundles-yourself) pointing to the new broker, at a controlled rate. Verify ownership and client traffic on the destination. A shutdown command alone selects destinations from eligible brokers; it does **not** guarantee that all traffic moves to the new broker. The orchestration must also account for new assignments to the old broker while draining and for any bundles remaining at final shutdown.
5. After the workload has moved, delete the old **pod** using the [shared graceful-termination procedure](#configure-graceful-pod-termination) to release any remaining ownership. Deleting the drained orphan pod retires it without the old StatefulSet creating a replacement. Verify its removal and updated load reports from every broker receiving its bundles.
6. Increase the new StatefulSet by one replica and repeat steps 3–5: check the new broker, move an old broker's bundles to it, and delete the old pod. Follow the shared leader-last ordering for each iteration. Continue until the new pool has the intended size and all old pods are gone, then restore the previous shedding and splitting settings and [verify recovery](#verify-recovery-after-the-upgrade).

Reliable automation needs to track transfer completion, concurrent assignments, broker and controller failures, and progress across retries. Improving this orchestration is an opportunity for contributions; both load managers supply the broker-side capability to move bundles to a chosen destination, while Kubernetes operator or equivalent controller logic must coordinate the rollout.

### Test the replacement with canary namespaces

[Namespace isolation policies](administration-isolation-broker.md) support a canary phase with either load manager: run selected namespaces on the replacement StatefulSet's first broker while keeping the existing StatefulSet intact.

Use the replacement brokers as the primary group to reserve them from ordinary namespace assignment, and the existing brokers as an optional secondary group for fallback. Before starting, review [broker reservation](administration-isolation-broker.md#configure-a-namespace-isolation-policy), [secondary broker failover](administration-isolation-broker.md#understand-secondary-broker-failover), and the [placement and rebalancing considerations](administration-isolation-broker.md#placement-and-rebalancing-considerations). Audit existing policies so none also admit production namespaces to the replacement group.

**Create the namespace isolation policy before creating the replacement StatefulSet.** The policy stores broker address patterns; matching brokers do not need to be online or registered when it is created. Save existing policies, pause automatic shedding and splitting, then create the temporary policy for the planned replacement broker names. For example, with brokers advertising their per-pod FQDNs in the `pulsar` Kubernetes namespace:

```shell
# Primary brokers are excluded from normal bundle assignment and load balancing.
pulsar-admin ns-isolation-policy set my-cluster broker-upgrade-canary \
  --namespaces 'my-tenant/canary' \
  --primary 'broker-green-\d+[.].*' \
  --secondary 'broker-blue-\d+[.].*' \
  --auto-failover-policy-type min_available \
  --auto-failover-policy-params min_limit=1,usage_threshold=100 \
  --unload-scope none
```

Replace the example hostnames and namespace with your own, following [Match broker addresses](administration-isolation-broker.md#match-broker-addresses). Reserve the whole replacement StatefulSet's hostname range so later replicas remain reserved. Wait for the policy to propagate before creating the replacement StatefulSet, so its first broker is reserved when it joins. Check actual bundle ownership after it joins. Use `--unload-scope none` throughout this procedure to control when bundles move; see [Control unloading when updating a policy](administration-isolation-broker.md#control-unloading-when-updating-a-policy).

1. After the isolation policy is in place and has propagated, create the replacement StatefulSet with **one replica**. Wait for the broker's registration, health, reachability, and load reports. Keep the existing StatefulSet and its pods running during evaluation.
2. Move only the canary namespace's bundles to the replacement at a controlled rate. Verify their owners and monitor client errors, latency, and broker load. Validate every explicit `--destinationBroker` against the intended canary policy.
3. To expand the canary, add selected namespaces to the temporary policy using `--unload-scope none`, wait for propagation, then move their bundles explicitly. Check capacity before each expansion.
4. **To promote**, remove the temporary canary policy once the replacement is approved for general workloads, or update your existing production isolation policies to admit the new brokers. Verify the resulting placement rules, then continue the StatefulSet replacement procedure from step 2. Keep automatic shedding paused through the complete rollout.
5. **To abandon the canary**, keep its reservation policy in place, prevent the replacement StatefulSet from recreating its pods, move the canary bundles back to healthy old brokers, and delete the replacement pods using the [shared graceful-termination procedure](#configure-graceful-pod-termination). After they have unregistered, remove the temporary policy and restore any original policies.

If you retain isolation policies after promotion, check their [effect on automatic rebalancing](administration-isolation-broker.md#placement-and-rebalancing-considerations) before restoring load shedding.

### Roll back a broker rollout

Both strategies allow a controlled rollback if an upgrade causes problems. Keep the previous broker image, manifests, and configuration available, and confirm that the Pulsar versions and configuration changes support rollback. Restoring a StatefulSet does not undo changes to shared cluster metadata or other components.

- **In-place replacement with `OnDelete`:** restore the StatefulSet's previous pod template, including its image and configuration, while keeping `updateStrategy.type: OnDelete`. Existing pods remain running; applying the old template does not replace them automatically. Manually delete only the upgraded pods, one at a time, using the [shared graceful-termination procedure](#configure-graceful-pod-termination). Their replacements use the restored template. Pods already running the previous version can stay in place.
- **Replacement with a new broker StatefulSet:** stop moving bundles to the upgraded brokers. Recreate the original StatefulSet from its saved configuration, using `OnDelete`, matching selectors, and a replica count that preserves any retained old pods. Restore enough capacity on the previous version and wait for its health and load-reporting checks. Move bundles back to those brokers, then gracefully retire the upgraded pods. Orphan the upgraded StatefulSet before deleting its pods so it does not recreate them, coordinating Helm or GitOps reconciliation as in the forward rollout. Keep each StatefulSet's Services available until its last broker has been retired.

For either rollback, follow the [shared prerequisites](#prerequisites-for-both-controlled-strategies), including paused rebalancing, leader-last ordering, and the recovery checks between brokers. Restore the previous balancing settings after the rollback is complete.

### Required Services for brokers and ZooKeeper

**Deploy two Services for each of the broker and ZooKeeper StatefulSets.** Chart 4.6.0 and later provide this layout. The headless Service supplies per-pod identity before readiness; the other Service accepts initial client connections only for Ready pods. One Service cannot provide both behaviors.

The names below use the chart's default component names; adjust them for your release and namespace.

| Component | Service | Required configuration | Use |
|---|---|---|---|
| Brokers | `<release>-broker-headless` | `clusterIP: None`, `publishNotReadyAddresses: true`; referenced by the broker StatefulSet's `spec.serviceName` | Per-pod names advertised by brokers for direct connections and lookup redirects. |
| Brokers | `<release>-broker` | `type: ClusterIP`; leave `publishNotReadyAddresses` unset or `false` | Broker-facing client `serviceUrl` / `webServiceUrl`, and proxy `brokerServiceURL` / `brokerWebServiceURL` (including TLS variants). |
| ZooKeeper | `<release>-zookeeper-headless` | `clusterIP: None`, `publishNotReadyAddresses: true`; referenced by the ZooKeeper StatefulSet's `spec.serviceName` | Stable per-pod names for ensemble peer discovery and communication. |
| ZooKeeper | `<release>-zookeeper` | `type: ClusterIP`; leave `publishNotReadyAddresses` unset or `false` | ZooKeeper client connections from brokers, bookies, and other components. |

Both Services for a component must select that component's pods. A headless Service's `type` can also be `ClusterIP`; the distinguishing field is `clusterIP: None`. The client-facing Service must have an allocated cluster IP. Do not point the StatefulSet's `serviceName` at the client-facing Service, and do not use the headless Service as the shared client entry point.

**Brokers must advertise an individually reachable address.** With the chart layout, this is the per-pod name `<pod>.<headless-service>.<namespace>.svc.<cluster-domain>`. Leaving `advertisedAddress` unset uses the canonical hostname; verify that it resolves to the intended per-pod name, or configure that name explicitly. Do not advertise the shared ClusterIP Service as the address of every broker. If you configure advertised listeners, ensure that each advertised endpoint reaches its specific broker from the network where it is used.

A broker can register with the load manager and receive bundles before Kubernetes marks its pod Ready. Without `publishNotReadyAddresses: true` on its headless Service, [Kubernetes withholds the pod's DNS record until readiness](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pods). Clients redirected to that broker then fail to resolve its name, and negative DNS caching can prolong the interruption. Publishing per-pod addresses before readiness removes this dependency on the readiness probe; it does not eliminate DNS propagation time or prove that the broker is healthy.

**Proxy-fronted clusters need the same layout.** The proxy uses the readiness-gated broker Service for lookups, then opens a connection to the owning broker's advertised per-pod address. An unresolved broker name therefore interrupts external clients behind the proxy too. External clients continue to use the proxy's endpoint; the proxy's broker-facing URLs use the broker ClusterIP Service. The shared ClusterIP name also avoids returning every broker IP in one DNS answer, which can exceed UDP DNS limits for clients without TCP fallback.

**ZooKeeper needs the split for the complementary reason.** Ensemble peers need per-pod discovery while starting, but brokers and bookies must not be sent to a ZooKeeper server that is still starting or unhealthy. Point their ZooKeeper connection strings at the readiness-gated client Service. Setting `publishNotReadyAddresses: true` on that client Service defeats this protection.

These requirements and their upgrade implications are documented in the chart's [Service-split upgrade notes](https://github.com/apache/pulsar-helm-chart/blob/master/README.md#zookeeper-and-broker-services-split-into-clusterip--headless).

### Migrate an existing deployment to the Service layout

The first upgrade from a chart older than 4.6.0 changes **both** broker and ZooKeeper StatefulSet `serviceName` values. That field is immutable, so the StatefulSets must be recreated. The chart provides per-component `pre-upgrade` Jobs, controlled by `broker.statefulsetUpgrade.enabled` and `zookeeper.statefulsetUpgrade.enabled`, which delete the old StatefulSets with `--cascade=orphan` to preserve the running pods and ZooKeeper data for adoption by the replacements.

For GitOps tools that render and apply Helm manifests, verify that the pre-upgrade Jobs run **before** the replacement StatefulSets are applied. If your tool does not honor that ordering, disable the corresponding hook flags and perform the orphan deletion as a planned migration step. An ordinary cascading deletion is not equivalent: it would delete the pods as well.

The per-pod hostnames also change. When TLS is enabled, reissue certificates with the new `*-headless` names in their subject alternative names, then roll ZooKeeper and brokers to load the matching certificates. With `OnDelete`, adopted broker pods keep their old pod configuration until you explicitly replace them; complete the controlled rollout to apply the new identity and certificates.

### Verify the deployment before rolling

Inspect the deployed resources, including any overrides applied by an operator or GitOps tool:

```shell
kubectl -n <namespace> get statefulset <release>-broker <release>-zookeeper -o yaml
kubectl -n <namespace> get pod <broker-pod> -o yaml
kubectl -n <namespace> get service <release>-broker <release>-broker-headless <release>-zookeeper <release>-zookeeper-headless -o yaml
```

Check the broker update strategy, `lifecycle.preStop` hook, and termination grace period in both the templates and running pods. Check both StatefulSets' `serviceName` values, and the Service selectors, cluster IPs, and `publishNotReadyAddresses` settings against the requirements above. For deployments without ZooKeeper, omit the ZooKeeper resources. Verify client and proxy URLs, advertised broker names, and TLS certificates as well.

During a canary broker upgrade, verify from the broker/proxy network that the replacement broker's advertised name resolves before its readiness probe passes, that shared Services exclude unready pods, and that the broker becomes healthy and reports load before the next deletion. DNS reachability and load reporting are separate requirements; satisfying either one alone is insufficient.

For the chart upgrade procedure itself, see [Upgrade Pulsar Helm release](helm-upgrade.md).

<span id="verify-recovery-after-the-restart" />

## Verify recovery after the upgrade

Monitor client errors and publish latency alongside resource usage and bundle movement. Compare the busiest and least busy brokers using the limiting resource, such as CPU or bandwidth, rather than requiring equal traffic on brokers with different capacities. The extensible load manager exposes `pulsar_lb_resource_usage_stats{feature="max_ema",stat="std"}` and unload decision reasons in `pulsar_lb_unload_broker_breakdown_total`. Track `pulsar_lb_unload_bundle_total` for shedding activity; it is not a count of every shutdown hand-off. See [Load balancing metrics](reference-metrics.md#load-balancing).

After restoring the previous balancing settings, load should settle without sustained repeated unloads. If it does not, check reporting failures, cooldown and hit-count decisions, placement policies, and [bundle granularity](administration-namespace-bundles.md). No shedder can move part of an oversized bundle. Use [load balancing configuration](administration-load-balance.md) to investigate before tightening thresholds during a rollout.
