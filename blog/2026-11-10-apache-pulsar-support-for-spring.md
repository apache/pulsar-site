---
title: "Spring Pulsar Has a New Home: Apache Pulsar support for Spring"
author: Lari Hotari
date: 2026-11-10
---

Spring for Apache Pulsar, also known as Spring Pulsar, has a new home in the Apache Pulsar project. Development continues as **Apache Pulsar support for Spring**, a subproject of Apache Pulsar at the Apache Software Foundation, in the [apache/pulsar-spring](https://github.com/apache/pulsar-spring) repository.

The first release, **3.0.0-M1**, is available on Maven Central with new Maven coordinates, and the [migration guide](https://pulsar.apache.org/pulsar-spring/reference/migration.html) describes what to change in your application. The Spring team has published [its own announcement](https://spring.io/blog/2026/11/10/spring-pulsar-new-home-asf) of the move.

<!--truncate-->

## What's happening

Three pieces of Apache Pulsar integration for Spring used to live in three separate repositories. They now live together in one, [apache/pulsar-spring](https://github.com/apache/pulsar-spring):

| Previous repository | Code |
|---|---|
| [spring-projects/spring-pulsar](https://github.com/spring-projects/spring-pulsar) | Spring Pulsar libraries |
| [spring-projects/spring-boot](https://github.com/spring-projects/spring-boot) | Spring Boot's Apache Pulsar starter and auto-configuration |
| [spring-cloud/spring-cloud-stream](https://github.com/spring-cloud/spring-cloud-stream) | Spring Cloud Stream's Apache Pulsar binder |

[Spring for Apache Pulsar 2.0.8](https://github.com/spring-projects/spring-pulsar/releases/tag/v2.0.8) is the final release from the Spring team. From now on, development, bug fixes, support and releases happen in the Apache Pulsar project.

## Why Apache Pulsar is the right home

The Spring integration depends closely on the Pulsar client, so it's a natural part of the Pulsar project. Developing it alongside the broker and the client libraries keeps it aligned with Pulsar as Pulsar evolves. The first release already shows this, as it moves to the [Pulsar 5.0](/blog/2026/10/05/announcing-apache-pulsar-5-0/) client. This client is fully compatible with older Pulsar broker versions, so you can switch to the new library without upgrading your brokers.

The subproject follows the same open governance as the rest of Apache Pulsar. Discussion happens on the dev@pulsar.apache.org mailing list, changes go through GitHub issues and pull requests, and the Pulsar PMC votes on releases.

## What this means if you use Spring Pulsar

- **Nothing breaks today.** Your applications can keep using 2.0.8 while you plan the move.
- **Plan your move.** Version 2.0.8 won't get further updates from the Spring team, so future fixes and features will be in the new artifacts.
- **Try 3.0.0-M1.** It's a milestone release, and your feedback will help us shape the 3.0.0 release.

We chose 3.0.0 rather than 1.0.0 for the version to make it clear that this continues from Spring Pulsar 2.x.

## What changes

The [migration guide](https://pulsar.apache.org/pulsar-spring/reference/migration.html) has the details, including the changes for your tests. These are the main ones:

**Maven coordinates.** All artifacts now use the `org.apache.pulsar` group ID:

| Previous | New |
|---|---|
| `org.springframework.pulsar:spring-pulsar` | `org.apache.pulsar:pulsar-spring` |
| `org.springframework.pulsar:spring-pulsar-bom` | `org.apache.pulsar:pulsar-spring-bom` |
| `org.springframework.pulsar:spring-pulsar-test` | `org.apache.pulsar:pulsar-spring-test` |
| `org.springframework.boot:spring-boot-pulsar` | `org.apache.pulsar:pulsar-spring-boot-autoconfigure` |
| `org.springframework.boot:spring-boot-starter-pulsar` | `org.apache.pulsar:pulsar-spring-boot-starter` |
| `org.springframework.boot:spring-boot-starter-pulsar-test` | `org.apache.pulsar:pulsar-spring-boot-starter-test` |
| `org.springframework.cloud:spring-cloud-stream-binder-pulsar` | `org.apache.pulsar:pulsar-spring-cloud-stream-binder` |

Replace the previous dependencies rather than adding the new ones next to them, so that the previous auto-configuration and binder aren't also on the classpath.

**Java packages.**

| Previous | New |
|---|---|
| `org.springframework.pulsar` | `org.apache.pulsar.spring` |
| `org.springframework.boot.pulsar` | `org.apache.pulsar.spring.boot` |
| `org.springframework.cloud.stream.binder.pulsar` | `org.apache.pulsar.spring.cloud.stream.binder` |

**Versions.** Spring Boot doesn't manage the version of the new artifacts, so declare it on each dependency or import `pulsar-spring-bom`. Spring Boot applications must also set the `pulsar.version` property, since Spring Boot manages an older version of Pulsar, and we recommend setting `netty.version` too:

```xml
<properties>
    <pulsar.version>5.0.1</pulsar.version>
    <netty.version>4.2.20.Final</netty.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.apache.pulsar</groupId>
        <artifactId>pulsar-spring-boot-starter</artifactId>
        <version>3.0.0-M1</version>
    </dependency>
</dependencies>
```

The [Quick Tour](https://pulsar.apache.org/pulsar-spring/reference/pulsar/quick-tour.html) shows the same for Gradle, along with a complete application.

**Pulsar client.** 3.0.0-M1 requires the Pulsar 5.0.x client, which is fully compatible with older Pulsar broker versions, so you don't need to upgrade your cluster. It uses the unshaded client artifacts rather than `pulsar-client-all`, so libraries such as Netty and Jackson are now regular dependencies of your application, and the classes in `org.apache.pulsar.shade` are no longer available. This release doesn't add specific support for the new Pulsar v5 client API yet. See the [version compatibility](https://pulsar.apache.org/pulsar-spring/reference/appendix/version-compatibility.html) and the [Pulsar client requirements](https://pulsar.apache.org/pulsar-spring/reference/intro/system-requirements.html#pulsar-client-dependencies) for more.

## What stays the same

`PulsarTemplate`, `@PulsarListener`, `@PulsarReader`, the Spring Boot auto-configuration and the Spring Cloud Stream binder all carry over. The `spring.pulsar.*` and `spring.cloud.stream.pulsar.*` configuration properties haven't changed. The project remains open source under the Apache License, Version 2.0.

## Where to find everything

- **Reference documentation:** [pulsar.apache.org/pulsar-spring/reference](https://pulsar.apache.org/pulsar-spring/reference)
- **Migration guide:** [Migration from Spring's Pulsar support](https://pulsar.apache.org/pulsar-spring/reference/migration.html)
- **What's new in 3.0:** [What's New](https://pulsar.apache.org/pulsar-spring/reference/whats-new.html)
- **Javadoc:** [pulsar.apache.org/pulsar-spring/api](https://pulsar.apache.org/pulsar-spring/api/)
- **Source code and issues:** [apache/pulsar-spring](https://github.com/apache/pulsar-spring)
- **Maven Central:** [org.apache.pulsar:pulsar-spring-boot-starter](https://central.sonatype.com/artifact/org.apache.pulsar/pulsar-spring-boot-starter)
- **Source release:** [Pulsar download page](https://pulsar.apache.org/download/#apache-pulsar-support-for-spring)

## Get involved

Please try 3.0.0-M1 and tell us how it goes. Report bugs and enhancement requests in [GitHub issues](https://github.com/apache/pulsar-spring/issues), and see the [contributing guide](https://github.com/apache/pulsar-spring/blob/main/CONTRIBUTING.md) if you'd like to work on the code. You can reach the community through the [Pulsar discussion channels](https://pulsar.apache.org/community/#section-discussions).

## Thank you

We're grateful to the Spring team for creating this project and for supporting its move to Apache Pulsar, in particular to Soby Chacko, Jason Konicki, Michael Minella and Chris Bono, and to everyone who has contributed to, tested and used Spring Pulsar. Chris Bono also did much of the groundwork for the migration, including the conversion of the source code's Git history and the package migration. We look forward to continuing this work with you.

Apache Pulsar support for Spring is derived from Spring for Apache Pulsar, also known as Spring Pulsar (https://github.com/spring-projects/spring-pulsar), from the Apache Pulsar starter and auto-configuration in Spring Boot (https://github.com/spring-projects/spring-boot), and from the Apache Pulsar binder in Spring Cloud Stream (https://github.com/spring-cloud/spring-cloud-stream), all licensed under the Apache License, Version 2.0. Those works remain the copyright of their original authors and contributors, as stated in the headers of the source files.
