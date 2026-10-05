---
id: java-dependency-configuration
title: Java dependency configuration
sidebar_label: "Dependency configuration"
description: Copy complete Maven and Gradle configurations for the Pulsar Java client, align dependencies with BOMs, and avoid conflicting client libraries.
---

:::tip One dependency for v4, v5, and admin clients

**`pulsar-client-v5-all`** provides the v4 client, v5 client, and Pulsar admin client through one unshaded dependency, with its libraries resolved transitively. Migrating applications can use this same dependency while keeping the v4 API; using v5 is optional, and separate client dependencies are unnecessary.

:::

The clients require **JDK 17 or newer**. **Choose Java 25 LTS for running new applications when you have the choice.** The examples below target Java 17 bytecode and configure both BOMs and checks or exclusions for conflicting client libraries. Use JDK 25 to run Maven; the Gradle example selects a Java 25 toolchain.

The version values below use the latest published Pulsar 5-or-later client release and the Netty version used by the current Pulsar documentation. Set the Pulsar version to your chosen release. When updating versions or adding dependencies, [verify the resolved runtime graph](#verify-netty-alignment).

## Complete Maven example {#maven}

Copy this into `pom.xml` for a new project. For an existing project, merge the properties, dependency management, dependency, and plugin configuration into your existing POM.

```xml title="pom.xml"
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>pulsar-client-example</artifactId>
  <version>1.0-SNAPSHOT</version>

  <properties>
    <maven.compiler.release>17</maven.compiler.release>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <pulsar.version>@pulsar:version:latest-v5plus@</pulsar.version>
    <!-- Match the Netty version used by this Pulsar release, or use a newer compatible version.
         See https://github.com/apache/pulsar/blob/v@pulsar:version:latest-v5plus@/gradle/libs.versions.toml -->
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

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.16.0</version>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-enforcer-plugin</artifactId>
        <version>3.6.3</version>
        <executions>
          <execution>
            <id>reject-conflicting-pulsar-clients</id>
            <goals>
              <goal>enforce</goal>
            </goals>
            <configuration>
              <rules>
                <bannedDependencies>
                  <excludes>
                    <exclude>org.apache.pulsar:pulsar-client</exclude>
                    <exclude>org.apache.pulsar:pulsar-client-admin</exclude>
                    <exclude>org.apache.pulsar:pulsar-client-all</exclude>
                    <exclude>org.apache.pulsar:pulsar-client-v5-shaded</exclude>
                  </excludes>
                  <searchTransitive>true</searchTransitive>
                  <message>Remove conflicting Pulsar clients or exclude them from the dependencies that introduce them.</message>
                </bannedDependencies>
              </rules>
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>
```

Run `mvn verify` to build and check the dependencies. The [Maven Enforcer rule](https://maven.apache.org/enforcer/enforcer-rules/bannedDependencies.html) fails the build if a conflicting client is present, including through transitive dependencies. It does not remove dependencies: use the [exclusions below](#replace-existing-dependencies) on each dependency that introduces a banned artifact.

## Complete Gradle example {#gradle}

Create these three files in the project root. For an existing project, merge them into your current configuration. Use your project's Gradle Wrapper to run the build.

```kotlin title="settings.gradle.kts"
rootProject.name = "pulsar-client-example"
```

```properties title="gradle.properties"
pulsarVersion=@pulsar:version:latest-v5plus@
# Match the Netty version used by this Pulsar release, or use a newer compatible version.
# See https://github.com/apache/pulsar/blob/v@pulsar:version:latest-v5plus@/gradle/libs.versions.toml
nettyVersion=@pulsar:version:netty@
```

```kotlin title="build.gradle.kts"
plugins {
    java
}

repositories {
    mavenCentral()
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

tasks.withType<JavaCompile>().configureEach {
    options.release = 17
}

val pulsarVersion = providers.gradleProperty("pulsarVersion").get()
val nettyVersion = providers.gradleProperty("nettyVersion").get()

configurations.configureEach {
    exclude(group = "org.apache.pulsar", module = "pulsar-client")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-admin")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-all")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-v5-shaded")
}

dependencies {
    implementation(platform("org.apache.pulsar:pulsar-bom:$pulsarVersion"))
    implementation(platform("io.netty:netty-bom:$nettyVersion"))
    implementation("org.apache.pulsar:pulsar-client-v5-all")
}
```

Run `./gradlew build` to build the project. If you are starting a new project without a wrapper, generate one with `gradle wrapper` using your installed Gradle distribution. The exclusions apply to this project's configurations; check the runtime graph of the final application, especially when publishing a library for other applications to consume.

### Internal libraries: separate API and implementation {#gradle-library-dependencies}

Gradle's `java-library` plugin provides separate **`api` and `implementation`** configurations. Use `api` only for dependencies whose types appear in your library's public API, such as method parameters or return types. Use `implementation` for internal dependencies. See [Gradle's API and implementation separation](https://docs.gradle.org/current/userguide/java_library_plugin.html#sec:java_library_separation).

**Do not add the Pulsar client implementation to an internal library's `api` configuration.** If your library exposes Pulsar types, expose the corresponding public API artifact: `pulsar-client-api` for v4, or `pulsar-client-api-v5` for v5. Add only the API artifacts your public signatures use.

For a library exposing both v4 and v5 types, replace the complete Gradle example's plugin and dependency declarations with the following. Keep its repositories, Java toolchain, values in `gradle.properties`, and conflict exclusions:

```kotlin
plugins {
    `java-library`
}

val pulsarVersion = providers.gradleProperty("pulsarVersion").get()
val nettyVersion = providers.gradleProperty("nettyVersion").get()

dependencies {
    api(platform("org.apache.pulsar:pulsar-bom:$pulsarVersion"))
    api("org.apache.pulsar:pulsar-client-api")
    api("org.apache.pulsar:pulsar-client-api-v5")

    implementation(platform("io.netty:netty-bom:$nettyVersion"))
    implementation("org.apache.pulsar:pulsar-client-v5-all")
}
```

The API dependencies are available on consumers' compile classpaths. The client implementation remains a runtime dependency of consumers, so the application's BOM alignment and conflict exclusions still matter. If your library exposes no Pulsar types, declare its Pulsar dependencies with `implementation` instead.

## How the configuration works

- **Version properties** select the client release and compatible Netty version. They do not select the v4 or v5 API.
- **Both BOMs** manage dependency versions. They do not add the client or remove conflicting implementations.
- **`pulsar-client-v5-all`** brings in the unshaded v4 client, v5 client, and admin implementations.
- **Conflict handling** keeps separately shaded clients off the classpath. Gradle excludes them; Maven detects them and requires exclusions on the dependencies that introduce them.

## Pulsar and Netty BOMs {#pulsar-bom}

Import `pulsar-bom` to align Pulsar artifacts and `io.netty:netty-bom` to align Netty modules. A BOM manages versions; it does not replace artifacts or remove duplicate implementations.

Set the Netty version to the version used by your chosen Pulsar release or a newer compatible version. Check the `netty` entry in [Pulsar's version catalog](https://github.com/apache/pulsar/blob/v@pulsar:version:latest-v5plus@/gradle/libs.versions.toml). If you choose a different Pulsar version, update the version tag in the URL accordingly.

The recommended unshaded client uses **Netty 4.2.x**, currently **@pulsar:version:netty@**. Applications using Netty 4.1.x should upgrade their Netty dependencies to 4.2.x together. Netty 4.2 is largely backward compatible with 4.1, but the two lines cannot coexist on the same classpath. Review the [Netty migration guide](https://netty.io/wiki/netty-4.2-migration-guide.html), particularly TLS hostname verification, allocator defaults, and libraries that use Netty internally.

### Maven {#pulsar-bom-maven}

The [complete Maven example](#maven) imports the Netty BOM before the Pulsar BOM. Remove older explicit Netty versions and reconcile dependency management inherited from frameworks or parent POMs. When imported BOMs manage the same artifact, Maven gives precedence to the first import; direct dependency-management entries take precedence over imports. See [Maven dependency management](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#dependency-management).

### Gradle {#pulsar-bom-gradle}

The [complete Gradle example](#gradle) uses `platform` to import both BOMs. This allows normal dependency conflict resolution; inspect the resolved graph to confirm that Pulsar and Netty versions remain aligned. Avoid `enforcedPlatform` as a general default, especially for published libraries, because its enforced versions propagate to consumers. See [Gradle platform guidance](https://docs.gradle.org/current/userguide/platforms.html#sec:enforced-platform).

### Verify Netty alignment

Inspect the resolved runtime graph after applying the BOMs:

```shell
mvn dependency:tree -Dscope=runtime '-Dincludes=io.netty:*'
./gradlew dependencyInsight --dependency io.netty --configuration runtimeClasspath
```

Ensure the resolved Netty core modules use one consistent 4.2.x version and that the packaged application contains no leftover 4.1.x or duplicate Netty JARs. Requested versions shown as replaced in a dependency report are not additional runtime copies. Netty components with independent version schemes, such as `netty-tcnative`, should use the versions managed by the Netty BOM rather than being assigned the core version manually.

## Replace existing dependencies {#replace-existing-dependencies}

When adopting a combined dependency, replace separately declared `pulsar-client`, `pulsar-client-admin`, and the older `pulsar-client-all` aggregate. `pulsar-client-admin` is the Java artifact; `pulsar-admin` is the CLI name. Exclude older artifacts from dependencies that introduce them transitively. Keeping the separately shaded client/admin JARs alongside the combined dependency duplicates implementations and bundled libraries on the classpath. For the shaded fallback, also remove separately declared unshaded implementations.

For the unshaded `pulsar-client-v5-all` setup, also exclude and ban `pulsar-client-v5-shaded`. The complete examples above include this rule. For the shaded setup, use the [opposite exclusions and bans below](#shaded-fallback).

For Gradle, apply exclusions to application configurations:

```kotlin
configurations.configureEach {
    exclude(group = "org.apache.pulsar", module = "pulsar-client")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-admin")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-all")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-v5-shaded")
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
  <exclusion>
    <groupId>org.apache.pulsar</groupId>
    <artifactId>pulsar-client-v5-shaded</artifactId>
  </exclusion>
</exclusions>
```

Inspect the resolved runtime dependency graph:

```shell
mvn dependency:tree -Dscope=runtime '-Dincludes=org.apache.pulsar:*'
./gradlew dependencies --configuration runtimeClasspath
```

Verify that the replaced artifacts are gone and Pulsar versions agree. The unshaded aggregate resolves implementation modules such as `pulsar-client-v5`, `pulsar-client-original`, and `pulsar-client-admin-original`. The shaded fallback instead exposes the external APIs and intentionally non-bundled libraries through its dependency-reduced publication. Code that directly imports relocated implementation or third-party classes must move to public APIs or use the unshaded aggregate.

## Shaded fallback

If you need the shaded fallback due to classpath conflicts in your application dependency graph, use `pulsar-client-v5-shaded` as an ordinary dependency, without a classifier, variant attributes, or implementation exclusions on this dependency. Despite its name, it includes the v4 client and admin implementation too.

**The Pulsar BOM and dependency exclusions still apply when using the shaded fallback.** Keep importing `pulsar-bom` to align the external Pulsar API dependencies, and keep excluding the older `pulsar-client`, `pulsar-client-admin`, and `pulsar-client-all` artifacts from dependencies that introduce them transitively.

When adapting either complete example, replace `pulsar-client-v5-all` with `pulsar-client-v5-shaded`. Reverse the conflict rules: allow `pulsar-client-v5-shaded`, and exclude and ban `pulsar-client-v5-all` and its unshaded implementation modules (`pulsar-client-v5`, `pulsar-client-original`, and `pulsar-client-admin-original`). Retain the exclusions and bans for the older client artifacts. Do not exclude the external API modules required by the shaded client.

```xml
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-client-v5-shaded</artifactId>
  <version>${pulsar.version}</version>
</dependency>
```

```kotlin
val pulsarVersion = providers.gradleProperty("pulsarVersion").get()

dependencies {
    implementation("org.apache.pulsar:pulsar-client-v5-shaded:$pulsarVersion")
}
```

For Maven, replace the complete example's `bannedDependencies` rule with:

```xml
<bannedDependencies>
  <excludes>
    <exclude>org.apache.pulsar:pulsar-client</exclude>
    <exclude>org.apache.pulsar:pulsar-client-admin</exclude>
    <exclude>org.apache.pulsar:pulsar-client-all</exclude>
    <exclude>org.apache.pulsar:pulsar-client-v5-all</exclude>
    <exclude>org.apache.pulsar:pulsar-client-v5</exclude>
    <exclude>org.apache.pulsar:pulsar-client-original</exclude>
    <exclude>org.apache.pulsar:pulsar-client-admin-original</exclude>
  </excludes>
  <searchTransitive>true</searchTransitive>
  <message>Remove conflicting Pulsar clients or exclude them from the dependencies that introduce them.</message>
</bannedDependencies>
```

Apply Maven dependency exclusions for these same artifacts to each dependency that introduces them, using the [exclusion syntax above](#replace-existing-dependencies). The Enforcer rule detects conflicts; it does not exclude dependencies automatically.

For Gradle, replace the complete example's `configurations.configureEach` block with:

```kotlin
configurations.configureEach {
    exclude(group = "org.apache.pulsar", module = "pulsar-client")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-admin")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-all")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-v5-all")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-v5")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-original")
    exclude(group = "org.apache.pulsar", module = "pulsar-client-admin-original")
}
```

The shaded artifact has its own dependency-reduced POM. A Maven classifier shares the original artifact's POM and dependency graph: selecting a shaded classifier on an unshaded aggregate would still pull in its unshaded implementations. No `shaded` classifier is published for `pulsar-client-v5-all`.

The shaded artifact keeps `pulsar-client-api`, `pulsar-client-api-v5`, `pulsar-client-admin-api`, `pulsar-tls-factory-api`, and `pulsar-http-client-api` as unshaded external dependencies. Logging, Bouncy Castle, and other intentionally non-bundled libraries also remain external. Resolve the published metadata with Maven or Gradle instead of copying only the client JAR. For provider replacement and packaging requirements, see [Bouncy Castle providers](pathname:///docs/next/security-bouncy-castle).

Applications using protobuf schemas must also provide `com.google.protobuf:protobuf-java`. The client artifacts neither bundle it nor declare it transitively. Align generated Protobuf classes and dependency overrides with the resolved runtime. Applications using reflective Avro schemas should also review [Java Avro class trust](pathname:///docs/next/schema-get-started#java-avro-class-trust).

## Spring Boot

When a framework supplies Pulsar dependencies, align its managed Pulsar and Netty versions with the [BOMs above](#pulsar-bom), apply the [transitive exclusions](#replace-existing-dependencies), and inspect the resulting runtime graph. Adding a combined dependency alone does not remove the framework's existing client dependency.

### Spring Boot using Maven {#spring-boot-maven}

Set Spring Boot's `pulsar.version` Maven property to the same target client version used above. Set `netty.version` to `@pulsar:version:netty@` as well. Add the combined dependency and exclude the replaced artifacts from dependencies that introduce them, such as the Pulsar starter. See [Spring Boot's Pulsar support](https://docs.spring.io/spring-boot/reference/messaging/pulsar.html) for its dependency management.

### Spring Boot using Gradle {#spring-boot-gradle}

When using the Spring Dependency Management plugin (`io.spring.dependency-management`), set its `pulsar.version` property to the same `pulsarVersion`, for example `extra["pulsar.version"] = pulsarVersion`. Also set `extra["netty.version"] = "@pulsar:version:netty@"` to align Spring's managed Netty dependencies. Apply the combined dependency and exclusions above. See [Spring Boot's dependency version properties](https://docs.spring.io/spring-boot/appendix/dependency-versions/properties.html) for managed versions.
