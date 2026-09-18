---
id: helm-upgrade
title: Upgrade Pulsar Helm release
sidebar_label: "Upgrade"
description: Learn to upgrade Apache Pulsar Helm to a newer version.
---


To upgrade Apache Pulsar Helm to a newer version, complete the following steps.

1. Check the change log for the specific version you would like to upgrade to and read the release notes that might pertain to the new Pulsar Helm Chart version.

2. Go through the [deployment guide](helm-deploy.md) step by step.

3. Extract your previous `--set` arguments with the following command and change the values if required.

   ```bash
   helm get values <release-name> > pulsar.yaml
   ```

   :::note

   It's highly recommended to provide all values using the `helm upgrade --set key=value` syntax or the `-f values.yml` instead of using `--reuse-values`, because some of the current values might be deprecated.

   You can retrieve your previous `--set` arguments cleanly, with `helm get values <release-name>`. If you direct this into a file (`helm get values <release-name> > pulsar.yml`), you can safely pass this file through `-f`, namely `helm upgrade <release-name> apache/pulsar -f pulsar.yaml`. This safely replaces the behavior of `--reuse-values`.

   :::

4. Perform the upgrade, with all `--set` arguments extracted in step 3.

   ```bash
   helm upgrade <release-name> apache/pulsar \
       --version <new version> \
       -f pulsar.yaml \
       --set ...
   ```

## Restart brokers gracefully

An upgrade that changes the broker image or configuration restarts every broker pod. What happens to the topics of a broker when its pod stops, and how to keep the load balancer from reshuffling bundles while the pods are being restarted, is described in [Rolling restarts](administration-rolling-restart.md). For the Helm chart, the settings that matter are:

- `broker.gracePeriod` (`terminationGracePeriodSeconds`, 30 seconds by default) must be long enough for a broker to release all of its bundles and shut down; 30 seconds is shorter than the broker's own `brokerShutdownTimeoutMs`. Size it from the `Unloading namespace-bundles completed in seconds` log line of your brokers.
- `broker.updateStrategy.type: OnDelete` (chart 4.6.0 and later) lets you delete the broker pods one at a time and wait until each broker is listed by `pulsar-admin brokers list` and healthy before deleting the next one, instead of the StatefulSet controller proceeding as soon as a pod is `Ready`.
- Pause automatic load shedding and bundle splitting with `pulsar-admin brokers update-dynamic-config` before the upgrade and re-enable them afterwards, as described in [Pause automatic rebalancing during the restart](administration-rolling-restart.md#pause-automatic-rebalancing-during-the-restart).
- Since chart 4.6.0, the broker StatefulSet uses a headless Service with `publishNotReadyAddresses: true` for the per-pod broker addresses, so a restarted broker is reachable as soon as it has registered; clients and proxies keep using the readiness-gated `<release>-broker` Service. On the first upgrade to chart 4.6.0 or later, a pre-upgrade job (`broker.statefulsetUpgrade.enabled`) deletes the old broker StatefulSet with `--cascade=orphan`, so that the running broker pods are kept and adopted by the new StatefulSet, because the `serviceName` of a StatefulSet cannot be changed in place.

