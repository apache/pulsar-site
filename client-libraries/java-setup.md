---
id: java-setup
title: Set up Java client
sidebar_label: "Set up"
description: Learn how to set up Java client library in Pulsar.
---

Use the combined Java dependency for applications using the v4 client, v5 client, the admin API, or any combination of them. The combined artifacts require **Java 17 or later**.

Changing dependencies and changing client APIs are separate choices. Both combined artifacts support the existing v4 API (`org.apache.pulsar.client.api`), the v5 API (`org.apache.pulsar.client.api.v5`), and the admin API. You can update the dependency while keeping your v4 application code. Existing v4 applications using regular topics do not need to change their API or dependencies for a broker upgrade. Use this setup when configuring or updating application dependencies.

## Step 1: Install Java client library

Use **`pulsar-client-v5-all`** by default for new dependency configurations. It is an unshaded aggregate that resolves the client and admin implementations transitively. If conflicts in the unshaded dependency graph cannot be resolved, **`pulsar-client-v5-shaded`** is a fallback with relocated implementation dependencies.

| Artifact | Dependency graph |
| --- | --- |
| `pulsar-client-v5-all` | Unshaded v4 client, v5 client, and admin implementations, with their transitive dependencies |
| `pulsar-client-v5-shaded` | One JAR containing relocated v4 client, v5 client, and admin implementations and bundled third-party dependencies |

Set `pulsar.version` in Maven or `pulsarVersion` in Gradle to your target client release from Pulsar 5 or later that publishes the chosen combined artifact. Use the same version for all Pulsar dependencies. These variables identify the dependency version; they do not select the v4 or v5 API.

### Maven

Add the following dependency to your `pom.xml`. The `${pulsar.version}` value comes from your Maven properties.

```xml
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-client-v5-all</artifactId>
  <version>${pulsar.version}</version>
</dependency>
```

### Gradle

In Gradle Kotlin DSL, define the `pulsarVersion` project property and use it in `build.gradle.kts`:

```kotlin
val pulsarVersion: String by project

dependencies {
    implementation("org.apache.pulsar:pulsar-client-v5-all:$pulsarVersion")
}
```

### Shaded fallback

If you need the shaded fallback, use `pulsar-client-v5-shaded` as an ordinary dependency, without a classifier, variant attributes, or implementation exclusions on this dependency. Despite its name, it includes the v4 client and admin implementation too.

```xml
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-client-v5-shaded</artifactId>
  <version>${pulsar.version}</version>
</dependency>
```

```kotlin
val pulsarVersion: String by project

dependencies {
    implementation("org.apache.pulsar:pulsar-client-v5-shaded:$pulsarVersion")
}
```

The shaded artifact has its own dependency-reduced POM. A Maven classifier shares the original artifact's POM and dependency graph: selecting a shaded classifier on an unshaded aggregate would still pull in its unshaded implementations. No `shaded` classifier is published for `pulsar-client-v5-all`.

The shaded artifact keeps `pulsar-client-api`, `pulsar-client-api-v5`, `pulsar-client-admin-api`, `pulsar-tls-factory-api`, and `pulsar-http-client-api` as unshaded external dependencies. Logging, Bouncy Castle, and other intentionally non-bundled libraries also remain external. Resolve the published metadata with Maven or Gradle instead of copying only the client JAR. For provider replacement and packaging requirements, see [Bouncy Castle providers](pathname:///docs/next/security-bouncy-castle).

Applications using protobuf schemas must also provide `com.google.protobuf:protobuf-java`. The client artifacts neither bundle it nor declare it transitively. Align generated Protobuf classes and dependency overrides with the resolved runtime. Applications using reflective Avro schemas should also review [Java Avro class trust](pathname:///docs/next/schema-get-started#java-avro-class-trust).

### Replace existing dependencies {#replace-existing-dependencies}

When adopting a combined dependency, replace separately declared `pulsar-client`, `pulsar-client-admin`, and the older `pulsar-client-all` aggregate. `pulsar-client-admin` is the Java artifact; `pulsar-admin` is the CLI name. Exclude older artifacts from dependencies that introduce them transitively. Keeping the separately shaded client/admin JARs alongside the combined dependency duplicates implementations and bundled libraries on the classpath. For the shaded fallback, also remove separately declared unshaded implementations.

For Gradle, apply exclusions to application configurations:

```kotlin
configurations.configureEach {
    exclude(group = "org.apache.pulsar", module = "pulsar-client")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-admin")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-all")
}
```

In Maven, add exclusions to **each dependency** that introduces those artifacts. Maven exclusions apply to that dependency's subtree, not globally:

```xml
<exclusions>
  <exclusion>
    <groupId>org.apache.pulsar</groupId>
    <artifactId>pulsar-client</artifactId>
  </exclusion>
  <exclusion>
    <groupId>org.apache.pulsar</groupId>
    <artifactId>pulsar-client-admin</artifactId>
  </exclusion>
  <exclusion>
    <groupId>org.apache.pulsar</groupId>
    <artifactId>pulsar-client-all</artifactId>
  </exclusion>
</exclusions>
```

Inspect the resolved runtime dependency graph:

```shell
mvn dependency:tree -Dscope=runtime '-Dincludes=org.apache.pulsar:*'
./gradlew dependencies --configuration runtimeClasspath
```

Verify that the replaced artifacts are gone and Pulsar versions agree. The unshaded aggregate resolves implementation modules such as `pulsar-client-v5`, `pulsar-client-original`, and `pulsar-client-admin-original`. The shaded fallback instead exposes the external APIs and intentionally non-bundled libraries through its dependency-reduced publication. Code that directly imports relocated implementation or third-party classes must move to public APIs or use the unshaded aggregate.

### Pulsar and Netty BOMs {#pulsar-bom}

Import `pulsar-bom` to align Pulsar artifacts and `io.netty:netty-bom` to align Netty modules. A BOM manages versions; it does not replace artifacts or remove duplicate implementations.

The recommended unshaded client uses **Netty 4.2.x**, currently **@pulsar:version:netty@**. Applications using Netty 4.1.x should upgrade their Netty dependencies to 4.2.x together. Netty 4.2 is largely backward compatible with 4.1, but the two lines cannot coexist on the same classpath. Review the [Netty migration guide](https://netty.io/wiki/netty-4.2-migration-guide.html), particularly TLS hostname verification, allocator defaults, and libraries that use Netty internally.

#### Maven {#pulsar-bom-maven}

Add the Netty version property and import both BOMs in `pom.xml`, using your existing `pulsar.version` property:

```xml
<properties>
  <netty.version>@pulsar:version:netty@</netty.version>
</properties>

<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>io.netty</groupId>
      <artifactId>netty-bom</artifactId>
      <version>${netty.version}</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
    <dependency>
      <groupId>org.apache.pulsar</groupId>
      <artifactId>pulsar-bom</artifactId>
      <version>${pulsar.version}</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependencies>
  <dependency>
    <groupId>org.apache.pulsar</groupId>
    <artifactId>pulsar-client-v5-all</artifactId>
  </dependency>
</dependencies>
```

Remove older explicit Netty versions and reconcile dependency management inherited from frameworks or parent POMs. When imported BOMs manage the same artifact, Maven gives precedence to the first import; direct dependency-management entries take precedence over imports.

#### Gradle {#pulsar-bom-gradle}

Use `platform` to import the BOMs. It allows normal dependency conflict resolution; inspect the resolved graph to confirm that Pulsar and Netty versions remain aligned. Avoid `enforcedPlatform` as a general default, especially for published libraries, because its enforced versions propagate to consumers. See [Gradle platform guidance](https://docs.gradle.org/current/userguide/platforms.html#sec:enforced-platform).

```kotlin
val pulsarVersion: String by project
val nettyVersion = "@pulsar:version:netty@"

dependencies {
    implementation(platform("org.apache.pulsar:pulsar-bom:$pulsarVersion"))
    implementation(platform("io.netty:netty-bom:$nettyVersion"))
    implementation("org.apache.pulsar:pulsar-client-v5-all")
}
```

#### Verify Netty alignment

Inspect the resolved runtime graph after applying the BOMs:

```shell
mvn dependency:tree -Dscope=runtime '-Dincludes=io.netty:*'
./gradlew dependencyInsight --dependency io.netty --configuration runtimeClasspath
```

Ensure the resolved Netty core modules use one consistent 4.2.x version and that the packaged application contains no leftover 4.1.x or duplicate Netty JARs. Requested versions shown as replaced in a dependency report are not additional runtime copies. Netty components with independent version schemes, such as `netty-tcnative`, should use the versions managed by the Netty BOM rather than being assigned the core version manually.

### Spring Boot

When a framework supplies Pulsar dependencies, align its managed Pulsar and Netty versions with the [BOMs above](#pulsar-bom), apply the [transitive exclusions](#replace-existing-dependencies), and inspect the resulting runtime graph. Adding a combined dependency alone does not remove the framework's existing client dependency.

#### Spring Boot using Maven {#spring-boot-maven}

Set Spring Boot's `pulsar.version` Maven property to the same target client version used above. Set `netty.version` to `@pulsar:version:netty@` as well. Add the combined dependency and exclude the replaced artifacts from dependencies that introduce them, such as the Pulsar starter. See [Spring Boot's Pulsar support](https://docs.spring.io/spring-boot/reference/messaging/pulsar.html) for its dependency management.

#### Spring Boot using Gradle {#spring-boot-gradle}

When using the Spring Dependency Management plugin (`io.spring.dependency-management`), set its `pulsar.version` property to the same `pulsarVersion`, for example `extra["pulsar.version"] = pulsarVersion`. Also set `extra["netty.version"] = "@pulsar:version:netty@"` to align Spring's managed Netty dependencies. Apply the combined dependency and exclusions above. See [Spring Boot's dependency version properties](https://docs.spring.io/spring-boot/appendix/dependency-versions/properties.html) for managed versions.

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
