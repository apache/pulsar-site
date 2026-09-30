---
id: java
title: Pulsar Java client
sidebar_label: "Java"
description: Learn how to use the Pulsar Java client to create producers, consumers, and readers, and to perform administrative tasks.
---

You can use a Pulsar Java client to create Pulsar [producers](pathname:///docs/concepts-clients#producer), [consumers](pathname:///docs/concepts-clients#consumer), and [readers](pathname:///docs/concepts-clients#reader) in Java and perform [administrative tasks](pathname:///docs/admin-get-started). Share a client instance across your producers and consumers.

## Java client SDKs

The names **v4** and **v5** identify Java API generations, not dependency or server release versions. The v4 client remains supported with Pulsar 5 and later. Pulsar provides both APIs:

| | v4 client | v5 client |
|---|---|---|
| Package | `org.apache.pulsar.client.api` | `org.apache.pulsar.client.api.v5` |
| Topics | Regular partitioned and non-partitioned topics | [Scalable topics](pathname:///docs/concepts-scalable-topics) and regular persistent topics |
| Consumption | Exclusive / Failover / Shared / Key_Shared subscriptions | Stream / Queue / Checkpoint consumers |
| Minimum Java with the combined artifacts | 17 | 17 |

The **v4 client** is the existing supported client used by applications with regular topics. The [Get started](#get-started) and [Advanced use](clients.md) guides describe this API.

The **v5 client** supports [scalable topics](pathname:///docs/concepts-scalable-topics) and also works against regular persistent topics. See [Java client (v5)](java-v5.md). It requires Pulsar 5.x brokers with `scalableTopicsEnabled=true`, even for regular topics. Use the v4 API for older brokers, non-persistent topics, or features outside the v5 API.

Use **`pulsar-client-v5-all`** by default to obtain the v4 client, v5 client, and admin implementations through unshaded dependencies. If unshaded dependency conflicts cannot be resolved, `pulsar-client-v5-shaded` is a fallback with relocated implementations. Follow [Java client setup](java-setup.md) for release selection, external dependencies, and classpath exclusions. Both APIs can run side by side in one application; adopting a combined dependency and [migrating source code to v5](java-migrate-to-v5.md) are separate choices. Existing v4 applications using regular topics do not need to change their API or dependencies for a broker upgrade.

## Get started

1. [Set up Java client library](java-setup.md)
2. [Initialize a Java client](java-initialize.md)
3. [Use a Java client](java-use.md)

:::note

Please refer to [Java client Performance considerations](java-setup.md#java-client-performance) for more information on how to improve the performance of the Java client and tune the Java JVM options to avoid `java.lang.OutOfMemoryError: Direct buffer memory` errors in high-throughput applications.

:::

## What's next?

- [Work with clients](clients.md)
- [Work with producers](producers.md)
- [Work with consumers](consumers.md)
- [Work with readers](readers.md)
- [Work with TableView](tableviews.md)
- [Configure cluster-level failover](cluster-level-failover.md)

## Reference doc

#### API reference

The following table outlines the API packages and reference docs for Pulsar Java clients.

| Package | Description | Recommended dependency |
|---|---|---|
| [`org.apache.pulsar.client.api`](@pulsar:javadoc:client@) | v4 Java client API | `pulsar-client-v5-all` |
| [`org.apache.pulsar.client.api.v5`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/package-summary.html) | v5 Java client API | `pulsar-client-v5-all` |
| [`org.apache.pulsar.client.admin`](@pulsar:javadoc:admin@/org/apache/pulsar/client/admin/package-summary.html) | Java admin API | `pulsar-client-v5-all` |

All three APIs are also available with the shaded fallback. See [Java client setup](java-setup.md#step-1-install-java-client-library) for the dependency graph; an aggregate artifact name does not introduce a separate API package.

#### More reference

- [Java client configurations](/reference/#/@pulsar:version_reference@/client/)
- [Release notes](/release-notes/client-java)
- [Client feature matrix](/docs/client-libraries/feature-matrix)
