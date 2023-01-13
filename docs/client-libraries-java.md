---
id: client-libraries-java
title: Pulsar Java client
sidebar_label: "Java"
---


You can use a Pulsar Java client to create the Java [producer](#producer), [consumer](#consumer), [reader](#reader) and [TableView](#tableview) of messages and to perform [administrative tasks](admin-api-overview.md). All the methods in a Java client are thread-safe. The current Java client version is **@pulsar:version@**.

## What's next?

1. [Set up Java client library](client-libraries-java-install.md)
2. [Create a Java client](client-libraries-java-create-client.md)
3. Work on advanced tasks:
   - [Configure Producers](client-libraries-producers.md)
   - [Configure Consumers](client-libraries-consumers.md)
   - [Configure Readers](client-libraries-readers.md)
   - [Configure TableViews](client-libraries-tableviews.md)

## API reference

The following table outlines the API packages and reference docs for Pulsar Java clients.

Package | Description | Maven Artifact
:-------|:------------|:--------------
[`org.apache.pulsar.client.api`](/api/client) | [Java client API](/api/client/) | [org.apache.pulsar:pulsar-client:@pulsar:version@](http://search.maven.org/#artifactdetails%7Corg.apache.pulsar%7Cpulsar-client%7C@pulsar:version@%7Cjar)
[`org.apache.pulsar.client.admin`](/api/admin) | [Java admin API](admin-api-overview.md) | [org.apache.pulsar:pulsar-client-admin:@pulsar:version@](http://search.maven.org/#artifactdetails%7Corg.apache.pulsar%7Cpulsar-client-admin%7C@pulsar:version@%7Cjar)
`org.apache.pulsar.client.all` | Include both `pulsar-client` and `pulsar-client-admin`.<br /> Both `pulsar-client` and `pulsar-client-admin` are independently shaded packages. Consequently, the applications using both `pulsar-client` and `pulsar-client-admin` have redundant shaded classes. It would be troublesome if you introduce new dependencies but forget to update shading rules. <br /> In this case, you can use `pulsar-client-all`, which shades dependencies only one time and reduces the size of dependencies.  | [org.apache.pulsar:pulsar-client-all:@pulsar:version@](http://search.maven.org/#artifactdetails%7Corg.apache.pulsar%7Cpulsar-client-all%7C@pulsar:version@%7Cjar)

**More reference**

- [Release notes](/release-notes/client-java)
- [Client eature matrix](https://docs.google.com/spreadsheets/d/1YHYTkIXR8-Ql103u-IMI18TXLlGStK8uJjDsOOA0T20/edit#gid=1784579914)
- [Get started with Schema](schema-get-started.md)
- Work with authentication:
  - [TLS](security-tls-authentication.md#configure-tls-authentication-in-pulsar-clients)
  - [JWT](security-jwt.md#configure-jwt-authentication-in-pulsar-clients)
  - [Athenz](security-athenz.md#configure-athenz-authentication-in-pulsar-clients)
  - [Kerberos](security-kerberos.md#configure-kerberos-authentication-in-pulsar-clients)
  - [OAuth2](security-oauth2.md#configure-oauth2-authentication-in-pulsar-clients)
  - [HTTP basic](security-basic-auth.md#configure-basic-authentication-in-pulsar-clients)