---
id: admin-api-tools
title: Pulsar admin interfaces - Tools
sidebar_label: "Tools"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

You can manage Pulsar entities through the Pulsar admin layer via one of the following tools:

- Pulsar admin APIs

  - [Java admin API](/api/admin/): It’s a programmable interface written in Java.

  - Go admin API (coming soon)

  - [REST API](pathname:///admin-rest-api/?version=@pulsar:version_number@): HTTP calls, which are made against the admin APIs provided by brokers. In addition, both the Java admin API and pulsar-admin CLI use the REST API.

- [pulsar-admin CLI](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/): It’s a command-line tool and is available in the bin folder of your Pulsar installation.

![Pulsar admin APIs - tools](/assets/admin-api-tools.svg)

Here are the explanations and comparisons of these tools.

Category|Tools|When to use|Considerations
|---|---|---|---
Pulsar admin APIs|[Java admin API](/api/admin/)| - If you want to implement your own admin interface client using Java and manage clusters. <br/><br/> - If you want to manage resources programmatically rather than relying on external tools inside of unit tests.<br/><br/> - If you want to use admin APIs in Java applications.| <br/><br/> - This method is only available in Java. <br/><br/> - It needs more development work if you want to use it to build applications.
Pulsar admin APIs | [REST API](pathname:///admin-rest-api/?version=@pulsar:version_number@)|- If you want to implement your own admin interface client using other languages and manage clusters using scripts.| - This method is the most complicated. <br/><br/> - It needs more development work if you want to use it to build applications.
Pulsar admin CLI| [pulsar-admin CLI](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/) | - If you want to get started with Pulsar admin APIs with minimal effort (e.g., no need to prepare an extra environment). <br/><br/> - If you want to perform common administrative tasks.| - This method is the most easy-to-use. <br/><br/> - It’s challenging to use this method to build applications.<br/><br/> - It takes a little more time because JVM starts slowly.

### Related topics

- To understand the basics, see [Pulsar admin API - Overview](admin-api-overview.md)

- To learn usage scenarios, see [Pulsar admin API - Use cases](admin-api-use-cases.md).

- To learn common administrative tasks, see [Pulsar admin API - Features](admin-api-features.md).

- To get up quickly, see [Pulsar admin API - Get started](admin-get-started.md).

- To check the detailed usage, see the API references below.

  - [Java admin API](/api/admin/)

  - [REST API](reference-rest-api-overview.md)
