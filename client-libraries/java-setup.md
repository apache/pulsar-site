---
id: java-setup
title: Set up Java client
sidebar_label: "Set up"
description: Learn how to set up Java client library in Pulsar.
---

Use the combined Java dependency for applications using the v4 client, v5 client, the admin API, or any combination of them. The combined artifacts require **Java 17 or later**. **Choose Java 25 LTS for running new applications when you have the choice.**

Changing dependencies and changing client APIs are separate choices. Both combined artifacts support the existing v4 API (`org.apache.pulsar.client.api`), the v5 API (`org.apache.pulsar.client.api.v5`), and the admin API. You can update the dependency while keeping your v4 application code. Existing v4 applications using regular topics do not need to change their API or dependencies for a broker upgrade. Use this setup when configuring or updating application dependencies.

## Step 1: Install Java client library

Use **`pulsar-client-v5-all`** by default for new dependency configurations. It is an unshaded aggregate that resolves the client and admin implementations transitively. If conflicts in the unshaded dependency graph cannot be resolved, **`pulsar-client-v5-shaded`** is a fallback with relocated implementation dependencies.

| Artifact | Dependency graph |
| --- | --- |
| `pulsar-client-v5-all` | Unshaded v4 client, v5 client, and admin implementations, with their transitive dependencies |
| `pulsar-client-v5-shaded` | One JAR containing relocated v4 client, v5 client, and admin implementations and bundled third-party dependencies |

:::info Strongly recommended: align dependencies and exclude conflicting clients

To avoid classpath conflicts and incompatible libraries:

- **Import both the [Pulsar and Netty BOMs](java-dependency-configuration.md#pulsar-bom)** to align dependency versions.
- **[Remove and exclude conflicting clients](java-dependency-configuration.md#replace-existing-dependencies).** BOMs do not remove duplicate implementations. Never combine `pulsar-client-v5-all` with `pulsar-client-v5-shaded`.
- **[Verify the runtime dependency graph](java-dependency-configuration.md#verify-netty-alignment)**, including dependencies supplied by frameworks.

:::

### Complete dependency configuration {#pulsar-bom}

For copyable build files with both BOMs and conflict handling, see [Java dependency configuration](java-dependency-configuration.md):

- [Complete Maven example](java-dependency-configuration.md#maven)
- [Complete Gradle example](java-dependency-configuration.md#gradle)
- [Replace existing dependencies](java-dependency-configuration.md#replace-existing-dependencies), [shaded fallback](java-dependency-configuration.md#shaded-fallback), and [Spring Boot](java-dependency-configuration.md#spring-boot)

## Step 2: Connect to Pulsar cluster

To connect to Pulsar using client libraries, you need to specify a [Pulsar protocol](pathname:///docs/developing-binary-protocol) URL.

You can assign Pulsar protocol URLs to specific clusters and use the `pulsar` scheme. The following is an example of `localhost` with the default port `6650`:

```http
pulsar://localhost:6650
```

If you have multiple brokers, separate `IP:port` by commas:

```http
pulsar://localhost:6550,localhost:6651,localhost:6652
```

If you use [mTLS](pathname:///docs/security-tls-authentication) authentication, add `+ssl` in the scheme:

```http
pulsar+ssl://pulsar.us-west.example.com:6651
```

## Java client Performance considerations {#java-client-performance}

### Increasing the memory limit

For high-throughput applications, tune the amount of memory with the v4 Java client builder's [`memoryLimit` configuration option](@pulsar:javadoc:client@/org/apache/pulsar/client/api/ClientBuilder.html#memoryLimit(long,org.apache.pulsar.client.api.SizeUnit)). The default limit is 64 MiB. Choose a limit that fits your workload and the application's available memory. To share a limit across several clients, see [Share resources across client instances](java-initialize.md#share-resources-across-client-instances).

By default Java applications have a limit for direct memory allocations. The allocations are limited by the `-XX:MaxDirectMemorySize` JVM option. In many JVM implementations, this defaults to the maximum heap size unless explicitly set. Allocations happen outside of the Java heap.

### Pending producer queues when the memory limit is disabled

A v4 producer with no explicit message-count limits normally relies on the client memory limit. If you disable that memory limit with `memoryLimit(0, SizeUnit.BYTES)`, an unset `maxPendingMessages` instead resolves to `1000`; an unset `maxPendingMessagesAcrossPartitions` normally resolves to `50000`. These defaults keep producers from silently losing their queue bounds when the memory cap is removed.

An explicit value takes precedence, including `maxPendingMessages(0)`, which removes the message-count bound even when the client memory limit is disabled. An explicitly configured positive across-partition budget can lower the per-partition queue limit to its share of that budget, with at least one pending message per partition. The implicit fallback budget is not divided across partitions and does not lower a per-partition limit that the application explicitly set.

v4 producers fail sends when a queue is full by default; `blockIfQueueFull(true)` makes them wait for capacity. v5 producers use a client memory budget without these v4 pending-message settings; see [Bound pending sends](java-v5.md#bound-pending-sends).

### Enabling optimized Netty direct memory buffer access

The Pulsar Java client uses [Netty](https://netty.io/) under the hood and uses Netty direct buffers for data transport.

Netty has a feature that allows optimized direct memory buffer access. This feature enables Netty to use low level APIs such as `sun.misc.Unsafe` for direct memory operations, which provides faster allocation and deallocation of direct buffers.
The faster deallocation can help avoid direct memory exhaustion and `java.lang.OutOfMemoryError: Direct buffer memory` errors. These errors can occur when the Netty memory pool and memory allocator cannot release memory back to the operating system quickly enough.

To enable this feature in Java clients since Java 11, you need to add the following JVM options to the application that uses the Java client:

- `--add-opens java.base/java.nio=ALL-UNNAMED`
- `--add-opens java.base/jdk.internal.misc=ALL-UNNAMED`

In addition, you need to add one of the following JVM options:

- `-Dorg.apache.pulsar.shade.io.netty.tryReflectionSetAccessible=true` for the shaded client fallback
- `-Dio.netty.tryReflectionSetAccessible=true` for the unshaded client

### Enabling optimized checksum calculation when native library loading fails

The Pulsar Java client uses `com.scurrilous.circe.checksum.Crc32cIntChecksum` class from the BookKeeper client for checksum calculation. For optimized checksum calculation Pulsar attempts to load `libcirce-checksum` native library. When that isn't available, `com.scurrilous.circe.checksum.Java9IntHash` class is used.
This only works when `--add-opens java.base/java.util.zip=ALL-UNNAMED` is passed in the JVM options.
The error message will be `Unable to use reflected methods:
java.lang.reflect.InaccessibleObjectException: Unable to make private static int java.util.zip.CRC32C.updateBytes(int,byte[],int,int) accessible: module java.base does not "opens java.util.zip" to unnamed module` when the required JVM option is missing

## GraalVM native images

The unshaded v4 client and admin implementations embed native-image reflection, resource, and runtime-initialization metadata in `pulsar-client-original` and `pulsar-client-admin-original`. GraalVM Native Image consumes this metadata from the JARs' `META-INF/native-image` directories.

Use the **unshaded** artifacts for this configuration: its class names refer to the unshaded client implementation. The embedded configuration does not establish native-image compatibility for the relocated classes in the shaded artifacts. Follow the dependency-alignment guidance above when using the unshaded clients.

The Pulsar source includes native-image smoke tests for v4 Java string-message production/consumption and admin operations in `tests/pulsar-client-native-image`. Validate the features your application uses, including schemas and authentication plugins; application-specific classes accessed through reflection can require additional reachability metadata.
