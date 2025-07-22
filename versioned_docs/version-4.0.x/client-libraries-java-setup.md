---
id: client-libraries-java-setup
title: Set up Java client
sidebar_label: "Set up"
description: Learn how to set up Java client library in Pulsar.
---

To set up Java client in Pulsar, complete the following steps.

## Step 1: Install Java client library

The latest version of the Pulsar Java client library is available via [Maven Central](http://search.maven.org/#artifactdetails%7Corg.apache.pulsar%7Cpulsar-client%7C@pulsar:version@%7Cjar). To use the latest version, add the `pulsar-client` library to your build configuration.

:::tip

- [`pulsar-client`](https://search.maven.org/artifact/org.apache.pulsar/pulsar-client) and [`pulsar-client-admin`](https://search.maven.org/artifact/org.apache.pulsar/pulsar-client-admin) shade dependencies via [maven-shade-plugin](https://maven.apache.org/plugins/maven-shade-plugin/) to avoid conflicts of the underlying dependency packages (such as Netty). If you do not want to manage dependency conflicts manually, you can use them.
- [`pulsar-client-original`](https://search.maven.org/artifact/org.apache.pulsar/pulsar-client-original) and [`pulsar-client-admin-original`](https://search.maven.org/artifact/org.apache.pulsar/pulsar-client-admin-original) **does not** shade dependencies. If you want to manage dependencies manually, you can use them.

:::

### Maven

If you use Maven, add the following information to the `pom.xml` file.

```xml
<!-- in your <properties> block -->
<pulsar.version>@pulsar:version@</pulsar.version>

<!-- in your <dependencies> block -->
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-client</artifactId>
  <version>${pulsar.version}</version>
</dependency>
```

### Gradle

If you use Gradle, add the following information to the `build.gradle` file.

```groovy
def pulsarVersion = '@pulsar:version@'

dependencies {
	implementation "org.apache.pulsar:pulsar-client:${pulsarVersion}"
}
```

### Pulsar BOM

While the above dependencies are sufficient to obtain the Pulsar Java client, it is recommended to also use the [Pulsar BOM](https://github.com/apache/pulsar/blob/master/pip/pip-326.md) to ensure that all Pulsar dependencies (both direct and transitive) are at the same expected version.
In order to use the BOM, the previous directions are modified slightly as follows:

#### Maven {#pulsar-bom-maven}

:::note

Please notice that when using Spring Boot and the default Maven build, it is necessary to use Spring Boot Maven plugin features to configure the Pulsar version. Please refer to the [Spring Boot using Maven](#spring-boot-maven) section for more details.

:::

If you use Maven, add the following information to the `pom.xml` file.

```xml
<!-- in your <properties> block -->
<pulsar.version>@pulsar:version@</pulsar.version>

<!-- in your <dependencyManagement>/<dependencies> block -->
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-bom</artifactId>
  <version>${pulsar.version}</version>
  <type>pom</type>
  <scope>import</scope>
</dependency>

<!-- in your <dependencies> block -->
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-client</artifactId>
</dependency>
```

#### Gradle {#pulsar-bom-gradle}

If you use Gradle, add the following information to the `build.gradle` file.

:::note

Please notice that when using Spring Boot and the default Gradle  build with the Spring Dependency Management plugin (`io.spring.dependency-management`), it is necessary to use Spring Dependency Management plugin features to configure the Pulsar version. Please refer to the [Spring Boot using Gradle](#spring-boot-gradle) section for more details.

:::

```groovy
def pulsarVersion = '@pulsar:version@'

dependencies {
  implementation enforcedPlatform("org.apache.pulsar:pulsar-bom:${pulsarVersion}")
  implementation 'org.apache.pulsar:pulsar-client'
}
```

Note that the version is number for the `pulsar-client` dependency is now omitted as the Pulsar BOM dictates which version is used.

### Spring Boot

You can find more information about using Pulsar with Spring Boot in the [Spring Boot documentation](https://docs.spring.io/spring-boot/reference/messaging/pulsar.html).

#### Spring Boot using Maven {#spring-boot-maven}

The Spring Boot [Dependency Version properties](https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-dependency-versions.html) define `pulsar.version` and `pulsar-reactive.version` for controlling the Pulsar Java client version and Pulsar Reactive client version.

```xml
<!-- in your <properties> block -->
<pulsar.version>@pulsar:version@</pulsar.version>

<!-- in your <dependencies> block -->
<!-- The Pulsar Java client will be automatically added to dependencies as a transitive dependency of the spring-boot-starter-pulsar dependency -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-pulsar</artifactId>
</dependency>
```

#### Spring Boot using Gradle {#spring-boot-gradle}

Please notice that when using the Spring Dependency Management plugin (`io.spring.dependency-management`) in Gradle, it is necessary to use Spring Dependency Management plugin features to configure the Pulsar version.
The Spring Boot [Dependency Version properties](https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-dependency-versions.html) define `pulsar.version` and `pulsar-reactive.version` for controlling the Pulsar Java client version and Pulsar Reactive client version.

To use a specific Pulsar version for the Pulsar Java client in a Spring Boot application using Gradle, add the following to your `build.gradle` file in a Spring Boot project:

```groovy
// Alternatively, you can set the `pulsar.version` property in the `gradle.properties` file.
ext['pulsar.version'] = '@pulsar:version@'

// The Pulsar Java client will be automatically added to dependencies as a transitive dependency of the spring-boot-starter-pulsar dependency
dependencies {
  implementation 'org.springframework.boot:spring-boot-starter-pulsar'
}
```

## Step 2: Connect to Pulsar cluster

To connect to Pulsar using client libraries, you need to specify a [Pulsar protocol](developing-binary-protocol.md) URL.

You can assign Pulsar protocol URLs to specific clusters and use the `pulsar` scheme. The following is an example of `localhost` with the default port `6650`:

```http
pulsar://localhost:6650
```

If you have multiple brokers, separate `IP:port` by commas:

```http
pulsar://localhost:6550,localhost:6651,localhost:6652
```

If you use [mTLS](security-tls-authentication.md) authentication, add `+ssl` in the scheme:

```http
pulsar+ssl://pulsar.us-west.example.com:6651
```

## Java client Performance considerations {#java-client-performance}

### Increasing the memory limit

For high-throughput applications, you can increase the amount of memory with the Java client builder's [`memoryLimit` configuration option](https://pulsar.apache.org/api/client/4.0.x/org/apache/pulsar/client/api/ClientBuilder.html#memoryLimit(long,org.apache.pulsar.client.api.SizeUnit)). The default limit is 64MB which is usually too low for high-throughput applications.

By default Java applications have a limit for direct memory allocations. The allocations are limited by the `-XX:MaxDirectMemorySize` JVM option. In many JVM implementations, this defaults to the maximum heap size unless explicitly set. Allocations happen outside of the Java heap.

### Enabling optimized Netty direct memory buffer access

The Pulsar Java client uses [Netty](https://netty.io/) under the hood and uses Netty direct buffers for data transport.

Netty has a feature that allows optimized direct memory buffer access. This feature enables Netty to use low level APIs such as `sun.misc.Unsafe` for direct memory operations, which provides faster allocation and deallocation of direct buffers.
The faster deallocation can help avoid direct memory exhaustion and `java.lang.OutOfMemoryError: Direct buffer memory` errors. These errors can occur when the Netty memory pool and memory allocator cannot release memory back to the operating system quickly enough.

To enable this feature in Java clients since Java 11, you need to add the following JVM options to the application that uses the Java client:

- `--add-opens java.base/java.nio=ALL-UNNAMED`
- `--add-opens java.base/jdk.internal.misc=ALL-UNNAMED`

In addition, you need to add one of the following JVM options:

- `-Dorg.apache.pulsar.shade.io.netty.tryReflectionSetAccessible=true` for the default shaded Pulsar client
- `-Dio.netty.tryReflectionSetAccessible=true` for the unshaded "original" Pulsar client

### Enabling optimized checksum calculation when native library loading fails

The Pulsar Java client uses `com.scurrilous.circe.checksum.Crc32cIntChecksum` class from the BookKeeper client for checksum calculation. For optimized checksum calculation Pulsar attempts to load `libcirce-checksum` native library. When that isn't available, `com.scurrilous.circe.checksum.Java9IntHash` class is used.
This only works when `--add-opens java.base/java.util.zip=ALL-UNNAMED` is passed in the JVM options.
The error message will be `Unable to use reflected methods:
java.lang.reflect.InaccessibleObjectException: Unable to make private static int java.util.zip.CRC32C.updateBytes(int,byte[],int,int) accessible: module java.base does not "opens java.util.zip" to unnamed module` when the required JVM option is missing

