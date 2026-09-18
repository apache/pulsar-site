---
id: admin-api-features
title: Pulsar admin interfaces - Features
sidebar_label: "Features"
description: Get a comprehensive understanding of features of Pulsar admin APIs.
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

The admin interfaces cover three kinds of work:

- **Administering** a Pulsar instance: creating, updating and deleting clusters, tenants, namespaces, topics, schemas, functions, connectors and packages, and setting their policies, with a single command or call.
- **Monitoring and troubleshooting**: reading the status, statistics and internal state of brokers, bookies, topics, subscriptions, functions and transactions.
- **Automating** all of the above from your own tooling, in any language, through the REST API and clients generated from its OpenAPI specification.

Below are the most common tasks you may want to do. For the interfaces you can use to perform them, see [Get started](admin-get-started.md).

![Features of Pulsar admin APIs](/assets/admin-api-features.svg)

These administrative tasks are categorized based on Pulsar components.

Category |Components|What do you want to do?
|---|---|---
Server|Broker|Operations on brokers.<br/><br/>For example, <br/>- Set dynamic configurations on brokers<br/> - Run health checks against brokers<br/> - Shutdown brokers<br/> - Get broker-level stats metrics
Storage|Bookie|Operations on bookie placement policy. <br/><br/>For example, <br/> - Get or set bookie replacement policy
Entities|- Topic <br/><br/> - Schema <br/><br/> - Namespace  <br/><br/> - Tenant <br/><br/> - Cluster|Operations on topics, schemas, namespaces, tenants, or clusters.<br/><br/> For example, <br/> - Create, update or delete topics, tenants, namespaces, or clusters <br/> - Set isolation policies, configure offload thresholds, or set permissions for namespaces <br/> - Upload, extract, or delete schemas
Stream processing|<br/><br/> - Function <br/><br/> - Connector <br/><br/> - Transaction <br/><br/> - Package | Operations on functions, function workers, or connectors. <br/> For example, <br/> - Create, update, and delete functions or connectors <br/> - Get stats of function workers, trigger rebalance of functions to workers <br/><br/> Operations on transactions. <br/> For example, <br/> - Get stats of transactions <br/> - Update the scale of transaction coordinators <br/><br/> Operations on packages. <br/> For example, <br/> - Upload, download, and delete packages
Others| - Proxy <br/><br/> - Resource groups <br/><br/> - Resource quotas | Operations on proxy stats. <br/> For example, <br/> - Get various monitoring metrics for proxy stats <br/><br/> Operations on resource groups.<br/>For example, <br/> - Create, update, and delete resource groups <br/><br/>Operations on resource quotas.<br/>For example, <br/> - Set resource quota for namespace bundles

### Related topics

- To get up quickly, see [Pulsar admin API - Get started](admin-get-started.md).

- To check the detailed usage, see the API references below.

  - [Java admin API](@pulsar:javadoc:admin@/)

  - [REST API, OpenAPI specifications and generated clients](reference-rest-api-overview.md)
