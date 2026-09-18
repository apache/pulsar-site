---
id: administration-rolling-restart
title: Rolling restarts
sidebar_label: "Rolling restarts"
description: Learn what happens when a broker is restarted, how to drain brokers gracefully, and how to keep the load balancer from fighting a rolling restart.
---

A rolling restart of the brokers, whether for an [upgrade](administration-upgrade.md) or for a configuration change, is the largest reassignment of topics a cluster goes through. Every broker that stops hands all of its bundles to the others, and every broker that starts comes back empty. This page explains what happens at each step and how to keep the restart, and the rebalancing after it, under control. Bookies, the metadata store and proxies are covered by the [upgrade guide](administration-upgrade.md).

The steps below use `pulsar-admin` commands for readability. Every one of them is an admin API call and can be issued from whatever drives your restarts: a script calling the [REST API](reference-rest-api-overview.md#automate-with-the-rest-api) with `curl`, a client generated from the [OpenAPI specification](reference-rest-api-overview.md#generate-a-client-from-the-specification), or the Java or Go admin library inside a Kubernetes operator or a deployment pipeline. See [Admin API - Get started](admin-get-started.md) for an overview of the interfaces and how to set them up.

## What happens when a broker stops

When a broker receives `SIGTERM`, or when you run `pulsar-admin brokers shutdown`, it goes through the following steps:

1. The broker deregisters from the load manager, so that it is no longer a candidate for new bundle assignments.
2. The broker releases the bundles it owns.
   - With the **modular** load manager, the broker unloads its owned bundles one after another. The topics of a bundle are closed in parallel, then the ownership of the bundle is released in the metadata store. Clients of the closed topics reconnect through a lookup; the lookup redirects them to the leader broker, which assigns the bundle to a new owner.
   - With the **extensible** load manager, the stopping broker selects a new owner for each of its bundles and transfers the ownerships concurrently through the ownership channel. The new owner is included in the message that closes the topic on the client, so clients reconnect to the new owner without a lookup ([PIP-307](https://github.com/apache/pulsar/blob/master/pip/pip-307.md)).

   Only bundles that are owned are released; the unused bundles of a namespace do not add to the shutdown time. The broker logs `Unloading namespace-bundles completed in seconds` with the number of bundles and the time this step took. Each bundle is given at most `namespaceBundleUnloadingTimeoutMs` (60 seconds) to unload.
3. The broker closes its remaining services and exits. `brokerShutdownTimeoutMs` (60 seconds) bounds this last step, not the release of the bundles in the step before.

A broker that is killed before it has released its bundles leaves them behind as orphans. With the modular load manager, the ownership entries expire with the broker's metadata store session (`metadataStoreSessionTimeoutMillis`, 30 seconds by default), and the topics are unavailable until then. With the extensible load manager, the leader detects the inactive broker, verifies that it is gone with a health check, and reassigns its bundles. In both cases clients see a longer interruption than with a graceful release, so make sure that whatever stops the broker waits for it to finish.

## Drain a broker at a controlled rate

Releasing all bundles as fast as possible produces a burst of reconnecting clients, lookups and topic loads on the remaining brokers. To drain a broker gradually, use the admin API instead of `SIGTERM`:

```shell
pulsar-admin brokers shutdown --max-concurrent-unload-per-sec 5
```

The broker releases at most the given number of bundles per second and then shuts down. Without the option, or with `SIGTERM`, there is no rate limit. Add `--forced-terminate-topic` to close topics without waiting for their clients to disconnect first.

Whatever the rate, the process must be allowed to finish. Size the grace period that your process manager or orchestrator gives the broker from the `Unloading namespace-bundles completed in seconds` log line of the broker that takes longest, plus `brokerShutdownTimeoutMs`. On Kubernetes this is `terminationGracePeriodSeconds`; see [Kubernetes deployments](#kubernetes-deployments) below.

## Pause automatic rebalancing during the restart

The load manager reacts to every restart: the bundles released by a stopping broker raise the load of the others, and a broker that has just started is nearly idle. If load shedding runs while brokers are still being restarted, it moves bundles that the next restart moves again. Both load managers re-read the following settings every cycle, so you can switch them off for the duration of the restart without restarting anything:

```shell
pulsar-admin brokers update-dynamic-config --config loadBalancerSheddingEnabled --value false
pulsar-admin brokers update-dynamic-config --config loadBalancerAutoBundleSplitEnabled --value false
```

Restart the brokers, then switch them back on:

```shell
pulsar-admin brokers update-dynamic-config --config loadBalancerSheddingEnabled --value true
pulsar-admin brokers update-dynamic-config --config loadBalancerAutoBundleSplitEnabled --value true
```

Expect one corrective pass after the restart rather than a series of moves. The default shedding strategies both handle the shape a cluster is in after a rolling restart, a few brokers carrying more than their share and the last restarted broker nearly empty:

- The **modular** load manager uses `AvgShedder` by default since Pulsar 5.0 (`ThresholdShedder` in 2.10 to 4.x). AvgShedder pairs the most and the least loaded broker and moves bundles between them once their difference has exceeded `loadBalancerAvgShedderHighThreshold` (40) for `loadBalancerAvgShedderHitCountHighThreshold` (2) consecutive cycles, or `loadBalancerAvgShedderLowThreshold` (15) for 8 cycles, and it pre-plans the destination of each bundle it moves. If you still run `ThresholdShedder`, note that it does not shed towards an idle broker unless `lowerBoundarySheddingEnabled=true`; see [ThresholdShedder](administration-load-balance.md#thresholdshedder).
- The **extensible** load manager uses `TransferShedder`, which transfers bundles from the most to the least loaded broker until the standard deviation of the broker loads is below `loadBalancerBrokerLoadTargetStd` (0.25). It waits `loadBalanceSheddingDelayInSeconds` (180) after each transfer and does not run at all while any registered broker has not yet published its load data, which is one more reason to let each broker fully start before stopping the next one.

## Restart one broker at a time

Stop the next broker only when the previous one is back and participating in load balancing:

1. Wait for the broker to be listed:

   ```shell
   pulsar-admin brokers list <cluster-name>
   ```

2. Wait for its health check to pass:

   ```shell
   pulsar-admin brokers healthcheck
   ```

3. Give it a few seconds more. A broker publishes its first load report `loadBalancerReportUpdateMinIntervalMillis` (5 seconds) after it starts, and with the extensible load manager a broker without load data is neither chosen as the destination of transferred bundles nor lets the shedder run.

If you upgrade in batches on a large cluster, keep the batch small enough that the remaining brokers can carry the released bundles, and apply the same wait between batches.

Keep client timeouts at their defaults during the restart. A short `operationTimeoutMs` on producers and consumers turns every bundle move into repeated lookups and reconnects instead of one.

## Move bundles yourself

Instead of letting each restarting broker release its bundles wherever the load manager puts them, you can move them to chosen brokers before stopping a broker, for example to fill a broker that has already been restarted:

```shell
pulsar-admin namespaces unload my-tenant/my-namespace --bundle 0x00000000_0x08000000 --destinationBroker broker-2.example.com:8080
```

Both load managers honor the destination: the extensible load manager transfers the bundle directly, the modular load manager applies the destination to the next assignment of the bundle. `pulsar-admin brokers namespaces <cluster-name> --url <broker-url>` lists the bundles a broker owns.

## Kubernetes deployments

On Kubernetes, the [Pulsar Helm chart](helm-overview.md) runs brokers as a StatefulSet. The following settings matter for a rolling restart:

- **Grace period.** `broker.gracePeriod` sets `terminationGracePeriodSeconds` and defaults to 30 seconds, which is shorter than the broker's own `brokerShutdownTimeoutMs`. A broker that owns many bundles is killed mid-release and its remaining bundles go through the orphan path described above. Set it to the drain time of your slowest broker plus `brokerShutdownTimeoutMs`.
- **Update strategy.** With the default `RollingUpdate` strategy the StatefulSet controller stops the next pod as soon as the previous one is `Ready`, which is before the broker has published its first load report. `broker.updateStrategy.type: OnDelete` (chart 4.6.0 and later) leaves the deletion of pods to you, so that you can apply the waits above between brokers.
- **Broker addresses.** Since chart 4.6.0, the broker StatefulSet uses a separate headless Service with `publishNotReadyAddresses: true` for the per-pod DNS names that brokers advertise, so that other brokers, proxies and clients can reach a broker as soon as it has registered, without waiting for the pod to become `Ready`. The readiness-gated ClusterIP Service (`<release>-broker`) remains the address that clients and proxies use for their service URL. If you deploy without the chart, set up the two Services the same way: a broker that is registered in the load manager but whose advertised address does not resolve yet causes lookup failures and delays for every bundle assigned to it.

For the chart upgrade procedure itself, see [Upgrade Pulsar Helm release](helm-upgrade.md).
