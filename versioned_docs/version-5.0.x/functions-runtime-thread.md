---
id: functions-runtime-thread
title: Configure thread runtime
sidebar_label: "Configure thread runtime"
description: Configure thread runtime for functions in Pulsar.
---

:::warning Run only fully trusted code

Pulsar Functions and connectors execute user-provided code by design. This intended capability is not itself a remote code execution (RCE) vulnerability. **Run only code that you fully trust**, because it can modify its execution environment:

- **Thread and process runtimes** can read or modify any files and state accessible to the process they run in.
- **The Kubernetes runtime** does not, on its own, restrict access to Kubernetes cluster resources. Pulsar provides hooks for custom hardening, but the hardening itself is outside the project.

:::

You can use the default configurations of thread runtime in the `conf/functions_worker.yml` file.

If you want to customize more parameters, such as thread group name, refer to the following example.

```yaml
functionRuntimeFactoryClassName: org.apache.pulsar.functions.runtime.thread.ThreadRuntimeFactory
functionRuntimeFactoryConfigs:
  threadGroupName: "Your Function Container Group"
```

To set the client memory limit for thread runtime, you can configure `pulsarClientMemoryLimit`.

```yaml
functionRuntimeFactoryConfigs:
#  pulsarClientMemoryLimit
# # the max memory in bytes the pulsar client can use
#   absoluteValue:
# # the max memory the pulsar client can use as a percentage of max direct memory set for JVM
#   percentOfMaxDirectMemory:
```

:::note

If `absoluteValue` and `percentOfMaxDirectMemory` are both set, the smaller value is used.

:::

For more details, see [code](https://github.com/apache/pulsar/blob/master/pulsar-functions/runtime/src/main/java/org/apache/pulsar/functions/runtime/thread/ThreadRuntimeFactoryConfig.java).