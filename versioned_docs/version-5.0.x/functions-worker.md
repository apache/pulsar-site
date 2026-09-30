---
id: functions-worker
title: Set up function workers
sidebar_label: "Set up function workers"
---

You have two ways to set up [function workers](functions-concepts.md#function-worker).
- [Run function workers with brokers](functions-worker-corun.md). Use it when:
    - resource isolation is not required when running functions in process or thread mode;
    - you configure the function workers to run functions on Kubernetes (where the resource isolation problem is addressed by Kubernetes).
- [Run function workers separately](functions-worker-run-separately.md). Use it when you want to separate functions and brokers.

**Optional configurations**
* [Configure temporary file path](functions-worker-temp-file-path.md)
* [Enable stateful functions](functions-worker-stateful.md)
* [Configure function workers for geo-replicated clusters](functions-worker-for-geo-replication.md)

**Reference**
* [Troubleshooting](functions-worker-troubleshooting.md)

## Custom worker extensions

Pulsar generates the Java messages in `org.apache.pulsar.functions.proto` with LightProto. Custom worker authentication providers, schedulers, runtimes, or other extensions that use these types must compile against the worker's API. For example, `FunctionAuthProvider` methods accept the top-level `FunctionDetails` type. Generated messages use mutable instances and setters. For migration from older generated APIs, see the [upgrade guide](administration-upgrade-to-5.0.x-applications.md#check-functions-behavior-and-extensions).

Ordinary function code should use the public [Functions SDK](functions-develop.md) rather than generated worker message types.
