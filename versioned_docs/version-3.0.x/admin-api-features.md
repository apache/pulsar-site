---
id: admin-api-features
title: Pulsar admin interfaces - Features
sidebar_label: "Features"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

Below are the most common tasks you may want to do. For the exhaustive lists of tasks and the method to perform these tasks, see [Tools](admin-api-tools.md).

![Pulsar admin APIs - features](/assets/admin-api-features.svg)

These administrative tasks are categorized based on Pulsar components.

Category |Components|What do you want to do?
|---|---|---
Server|Broker|Operations on brokers.<br/><br/>For example, <br/>- Set dynamic configurations on brokers<br/> - Run health checks against brokers<br/> - Shutdown brokers<br/> - Get broker-level stats metrics
Storage|Bookie|Operations on bookie placement policy. <br/><br/>For example, <br/> - Get or set bookie replacement policy
Entities|- Topic <br/><br/> - Schema <br/><br/> - Namespace  <br/><br/> - Tenant <br/><br/> - Cluster|Operations on topics, schemas, namespaces, tenants, or clusters.<br/><br/> For example, <br/> - Create, update or delete topics, tenants, namespaces, or clusters <br/> - Set isolation policies, configure offload thresholds, or set permissions for namespaces <br/> - Upload, extract, or delete schemas
Stream processing|<br/><br/> - Function <br/><br/> - Connector <br/><br/> - Transaction <br/><br/> - Package | Operations on functions, function workers, or connectors. <br/> For example, <br/> - Create, update, and delete functions or connectors <br/> - Get stats of function workers, trigger rebalance of functions to workers <br/><br/> Operations on transactions. <br/> For example, <br/> - Get stats of transactions <br/> - Update the scale of transaction coordinators <br/><br/> Operations on packages. <br/> For example, <br/> - Upload, download, and delete packages
Others| - Proxy <br/><br/> - Resource groups <br/><br/> - Resource quotas | Operations on proxy stats. <br/> For example, <br/> - Get various monitoring metrics for proxy stats <br/><br/> Operations on resource groups.<br/>For example, <br/> - Create, update, and delete resource groups <br/><br/>Operations on resource quotas.<br/>For example, <br/> - Set resource quota for namespace bundles

### Related topics

- To understand the basics, see [Pulsar admin API - Overview](admin-api-overview.md)

- To learn usage scenarios, see [Pulsar admin API - Use cases](admin-api-use-cases.md).

- To perform administrative operations, see [Pulsar admin API - Tools](admin-api-tools.md).

- To get up quickly, see [Pulsar admin API - Get started](admin-get-started.md).

- To check the detailed usage, see the API references below.

  - [Java admin API](/api/admin/)

  - [REST API](reference-rest-api-overview.md)
