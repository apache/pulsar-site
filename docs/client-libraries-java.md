---
id: client-libraries-java
title: Pulsar Java client
sidebar_label: "Java"
---

You can use a Pulsar Java client to create Pulsar [producers](concepts-clients.md#producer), [consumers](concepts-clients.md#consumer), and [readers](concepts-clients.md#reader) in Java and perform [administrative tasks](admin-api-overview.md). All the methods in Java clients are thread-safe. The current Java client version is **@pulsar:version@**.

## Get started

1. [Set up Java client library](client-libraries-java-setup.md)
2. [Initialize a Java client](client-libraries-java-initialize.md)
3. [Use a Java client](client-libraries-java-use.md)

## What's next?

- [Work with clients](client-libraries-clients.md)
- [Work with producers](client-libraries-producers.md)
- [Work with consumers](client-libraries-consumers.md)
- [Work with readers](client-libraries-readers.md)
- [Work with TableView](client-libraries-tableviews.md)
- [Configure cluster-level failover](client-libraries-cluster-level-failover.md)

## Reference doc

#### API reference

The following table outlines the API packages and reference docs for Pulsar Java clients.

Package | Description | Maven Artifact
:-------|:------------|:--------------
[`org.apache.pulsar.client.api`](/api/client) | Java client API. <br/> See [Client API overview](pulsar-api-overview.md#pulsar-client-apis) for more reference. | [org.apache.pulsar:pulsar-client:@pulsar:version@](http://search.maven.org/#artifactdetails%7Corg.apache.pulsar%7Cpulsar-client%7C@pulsar:version@%7Cjar)
[`org.apache.pulsar.client.admin`](/api/admin) | Java admin API. <br/> See [Admin API overview](admin-api-overview.md) for more reference. | [org.apache.pulsar:pulsar-client-admin:@pulsar:version@](http://search.maven.org/#artifactdetails%7Corg.apache.pulsar%7Cpulsar-client-admin%7C@pulsar:version@%7Cjar)
`org.apache.pulsar.client.all` | Include both `pulsar-client` and `pulsar-client-admin`.<br /> Both `pulsar-client` and `pulsar-client-admin` are independently shaded packages. Consequently, the applications using both `pulsar-client` and `pulsar-client-admin` have redundant shaded classes. It would be troublesome if you introduce new dependencies but forget to update shading rules. <br /> In this case, you can use `pulsar-client-all`, which shades dependencies only one time and reduces the size of dependencies.  | [org.apache.pulsar:pulsar-client-all:@pulsar:version@](http://search.maven.org/#artifactdetails%7Corg.apache.pulsar%7Cpulsar-client-all%7C@pulsar:version@%7Cjar)

#### More reference

- [Java client configurations](pathname:///reference/#/@pulsar:version_reference@/client/)
- [Release notes](pathname:///release-notes/client-java)
- [Client feature matrix](https://docs.google.com/spreadsheets/d/1YHYTkIXR8-Ql103u-IMI18TXLlGStK8uJjDsOOA0T20/edit#gid=1784579914)