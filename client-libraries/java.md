---
id: java
title: Pulsar Java client
sidebar_label: "Java"
description: Learn how to use the Pulsar Java client to create producers, consumers, and readers, and to perform administrative tasks.
---

You can use a Pulsar Java client to create Pulsar [producers](pathname:///docs/concepts-clients#producer), [consumers](pathname:///docs/concepts-clients#consumer), and [readers](pathname:///docs/concepts-clients#reader) in Java and perform [administrative tasks](pathname:///docs/admin-api-overview). All the methods in Java clients are thread-safe. The current Java client LTS version is **@pulsar:version:lts@** and the latest version is **@pulsar:version:latest@**.

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

Package | Description | Maven Artifact
:-------|:------------|:--------------
[`org.apache.pulsar.client.api`](@pulsar:javadoc:client@) | Java client API. <br/> See [Client API overview](pathname:///docs/pulsar-api-overview#pulsar-client-apis) for more reference. | [org.apache.pulsar:pulsar-client:@pulsar:version:lts@](http://search.maven.org/#artifactdetails%7Corg.apache.pulsar%7Cpulsar-client%7C@pulsar:version:lts@%7Cjar)
[`org.apache.pulsar.client.admin`](@pulsar:javadoc:admin@admin) | Java admin API. <br/> See [Admin API overview](pathname:///docs/admin-api-overview) for more reference. | [org.apache.pulsar:pulsar-client-admin:@pulsar:version:lts@](http://search.maven.org/#artifactdetails%7Corg.apache.pulsar%7Cpulsar-client-admin%7C@pulsar:version:lts@%7Cjar)
`org.apache.pulsar.client.all` | Include both `pulsar-client` and `pulsar-client-admin`.<br /> Both `pulsar-client` and `pulsar-client-admin` are independently shaded packages. Consequently, the applications using both `pulsar-client` and `pulsar-client-admin` have redundant shaded classes. It would be troublesome if you introduce new dependencies but forget to update shading rules. <br /> In this case, you can use `pulsar-client-all`, which shades dependencies only one time and reduces the size of dependencies.  | [org.apache.pulsar:pulsar-client-all:@pulsar:version:lts@](http://search.maven.org/#artifactdetails%7Corg.apache.pulsar%7Cpulsar-client-all%7C@pulsar:version:lts@%7Cjar)

#### More reference

- [Java client configurations](/reference/#/@pulsar:version_reference@/client/)
- [Release notes](/release-notes/client-java)
- [Client feature matrix](/docs/client-libraries/feature-matrix)
