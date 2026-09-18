---
id: pulsar-api-overview
title: Pulsar APIs
sidebar_label: "Pulsar APIs"
description: Get a comprehensive understanding of concepts, functionalities, and distinctions of Pulsar APIs.
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````


Pulsar is a messaging and streaming platform that scales across organizations of all sizes. 

As the core building blocks of Pulsar, Pulsar APIs allow you to:
- build applications with Pulsar using client APIs
- administer Pulsar clusters using admin APIs

![Definition of Pulsar APIs](/assets/pulsar-api-definition.svg)

## Pulsar client APIs

Pulsar client APIs encapsulate and optimize Pulsar's client-broker communication protocols and add additional features using Pulsar primitives. 

With Pulsar client APIs, you can:
- create and configure producers, consumers, and readers
- produce and consume messages
- perform authentication and authorization tasks 

![Client APIs - Definition](/assets/client-api-definition.svg)

Pulsar exposes client APIs with language bindings. For more details about Pulsar clients, including language-specific client libraries, feature matrix, third-party clients, see [Pulsar client - Overview](/docs/client-libraries/).

## Pulsar admin APIs

See [Pulsar admin API - Get started](admin-get-started.md).

## Comparison

Here is a simple comparison between Pulsar client APIs and Pulsar admin APIs.

Category|Pulsar client APIs|Pulsar admin APIs
---|---|---|
Audiences|Developers|DevOps
Goals|Build applications with Pulsar|Administer Pulsar clusters
Use cases|Pulsar client APIs help you create applications that rely on real-time data. <br/><br/> For example, you can build a financial application to handle fraud alerts or an eCommerce application that creates recommendations based on user activities.| Pulsar administration APIs let you administer the entire Pulsar instance, including clusters, tenants, namespaces, and topics, from a single endpoint. <br/><br/> For example, you can configure security and compliance, or get information about brokers, check for any issues, and then troubleshoot solutions.
Key features|- Process data with producers, consumers, readers, and TableView <br/><br/> - Secure data with authentication and authorization <br/><br/> - Protect data with transactions and schema <br/><br/> - Stabilize data with cluster-level auto failover | - Configure authentication and authorization <br/><br/> - Set data retention and resource isolation policies <br/><br/> - Facilitate workflow of application development<br/><br/> - Troubleshoot Pulsar
Interfaces | - [Java client](/docs/client-libraries/java) <br/><br/> - [C++ client](/docs/client-libraries/cpp) <br/><br/> - [Python client](/docs/client-libraries/python) <br/><br/> - [Go client](/docs/client-libraries/go) <br/><br/> - [Node.js client](/docs/client-libraries/node) <br/><br/> - [C# client](/docs/client-libraries/dotnet) <br/><br/> - [WebSocket API](/docs/client-libraries/websocket) <br/><br/> - [REST, for producing messages](/docs/client-libraries/rest) <br/><br/> Each page links the API reference of its client; see also the [client libraries overview](/docs/client-libraries/) and the [feature matrix](/docs/client-libraries/feature-matrix). | - [pulsar-admin CLI, Java and Go admin libraries](admin-get-started.md) <br/><br/> - [REST API](reference-rest-api-overview.md), with [OpenAPI specifications](reference-rest-api-overview.md#openapi-specifications) for generating clients in other languages

