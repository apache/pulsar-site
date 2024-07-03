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

#### Maven

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

#### Gradle

If you use Gradle, add the following information to the `build.gradle` file.

```groovy
def pulsarVersion = '@pulsar:version@'

dependencies {
  implementation enforcedPlatform("org.apache.pulsar:pulsar-bom:${pulsarVersion}")
  implementation 'org.apache.pulsar:pulsar-client'
}
```
Note that the version is number for the `pulsar-client` dependency is now omitted as the Pulsar BOM dictates which version is used.

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
