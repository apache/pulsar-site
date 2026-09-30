---
id: functions-worker-troubleshooting
title: Troubleshooting
sidebar_label: "Troubleshooting"
description: Troubleshooting function worker configuration in Pulsar.
---

**Error message: Namespace missing local cluster name in clusters list**

```text

Failed to get partitioned topic metadata: org.apache.pulsar.client.api.PulsarClientException$BrokerMetadataException: Namespace missing local cluster name in clusters list: local_cluster=xyz ns=public/functions clusters=[standalone]

```

The error message displays when any of the following cases occurs:
- a broker is started with `functionsWorkerEnabled=true`, but `pulsarFunctionsCluster` in the `conf/functions_worker.yml` file is not set to the correct cluster.
- setting up a geo-replicated Pulsar cluster with `functionsWorkerEnabled=true`, while brokers in one cluster run well, brokers in the other cluster do not work well.

**Workaround**

If any of these cases happen, follow the instructions below to fix the problem.

1. Disable function workers by setting `functionsWorkerEnabled=false`, and restart brokers.

2. Get the current cluster list of the `public/functions` namespace.

   ```bash
   bin/pulsar-admin namespaces get-clusters public/functions
   ```

3. Check if the cluster is in the cluster list. If not, add it and update the list.

   ```bash
   bin/pulsar-admin namespaces set-clusters --clusters <existing-clusters>,<new-cluster> public/functions
   ```

4. After setting the cluster successfully, enable function workers by setting `functionsWorkerEnabled=true`.

5. Set the correct cluster name for the `pulsarFunctionsCluster` parameter in the `conf/functions_worker.yml` file.

6. Restart brokers.

## Function package downloads and process failures

For function packages downloaded through DistributedLog-backed BookKeeper storage, Pulsar bounds each wait to open the reader or obtain the next records to 60 seconds. This is a per-wait timeout, not a total package-download limit. A log stream without its upload-completion marker can report a download timeout instead of blocking the worker indefinitely. Check BookKeeper availability and whether the upload completed; re-upload an incomplete package before retrying the deployment. HTTP downloads and package-management storage providers have their own download paths.

The worker logs successful package downloads with `sizeBytes` and `durationMs`. Process-runtime start and unexpected-exit events include `pid`, which helps correlate worker events with the function process's logs. When a process has already died, its status reports `running=false` and the recorded failure exception, when available, without waiting for a gRPC status request to time out.
