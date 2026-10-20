---
id: functions-worker-temp-file-path
title: Configure temporary file path
sidebar_label: "Configure temporary file path"
description: Configure temporary file path for function workers in Pulsar.
---

Function workers use `java.io.tmpdir` in the JVM as the default temporary file path, which is also used as the default extraction file path for each NAR package. NAR packages require a local file path to extract and load to the Java class loader.

:::note

On VM or bare-metal installations, OS cleanup of `/tmp` can delete extracted files while the functions worker is running, which causes `ClassNotFoundException` or `NoClassDefFoundError` errors. Use a dedicated directory instead. See [Configure the NAR extraction directory](deploy-bare-metal.md#configure-the-nar-extraction-directory).

:::

If you want to change the default extraction file path for NAR packages to another directory, you can add the following parameter with the desired directory in the `functions_worker.yml` file. The configuration varies depending on the [function runtime](functions-concepts.md#function-runtime) you are using.

| Function runtime | Configuration for temporary file path |
|:------------------------|:-------------------------------------------------|
| [Thread runtime](functions-runtime-thread.md)<br /> [Process runtime](functions-runtime-process.md) | `narExtractionDirectory` |
| [Kubernetes runtime](functions-runtime-kubernetes.md) | `functionRuntimeFactoryConfigs.narExtractionDirectory` |
