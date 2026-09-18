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

The tasks are grouped by the Pulsar component they act on. Each link leads to the section that shows the task with the Admin CLI, the REST API and the Java API; tasks that are only documented in the CLI reference link there.

Category | Component | Tasks
|---|---|---
Server | Broker | [List active brokers](admin-api-brokers.md#list-active-broker) <br/> [List the namespaces a broker owns](admin-api-brokers.md#list-namespace-owned-by-broker) <br/> [Update the broker configuration dynamically](admin-api-brokers.md#update-broker-conf-dynamically) <br/> [Get the leader broker](admin-api-brokers.md#get-info-of-leader-broker) <br/> [Run a health check](/reference/#/@pulsar:version_reference@/pulsar-admin/brokers?id=healthcheck) <br/> [Shut down a broker gracefully](administration-rolling-upgrade.md#drain-a-broker-at-a-controlled-rate) <br/> [Broker statistics](/reference/#/@pulsar:version_reference@/pulsar-admin/broker-stats)
Storage | Bookie | [Rack placement of bookies](/reference/#/@pulsar:version_reference@/pulsar-admin/bookies) <br/> [Bookie isolation](administration-isolation-bookie.md)
Entities | Cluster | [Provision a cluster](admin-api-clusters.md#provision-cluster) <br/> [Get the configuration](admin-api-clusters.md#get-cluster-configuration) <br/> [Update a cluster](admin-api-clusters.md#update-cluster) <br/> [List clusters](admin-api-clusters.md#list-cluster) <br/> [Delete a cluster](admin-api-clusters.md#delete-cluster) <br/> [Namespace isolation policies](administration-isolation-broker.md)
Entities | Tenant | [List](admin-api-tenants.md#list) <br/> [Create](admin-api-tenants.md#create) <br/> [Get the configuration](admin-api-tenants.md#get-configuration) <br/> [Update](admin-api-tenants.md#update) <br/> [Delete](admin-api-tenants.md#delete)
Entities | Namespace | [Create](admin-api-namespaces.md#create-namespaces) <br/> [List](admin-api-namespaces.md#list-namespaces) <br/> [Get policies](admin-api-namespaces.md#get-policies) <br/> [Delete](admin-api-namespaces.md#delete-namespaces) <br/> [Configure replication clusters](admin-api-namespaces.md#configure-replication-clusters) <br/> [Configure backlog quotas](admin-api-namespaces.md#configure-backlog-quota-policies) <br/> [Configure persistence](admin-api-namespaces.md#configure-persistence-policies) <br/> [Configure bundles](admin-api-namespaces.md#configure-namespace-bundles) <br/> [Configure message TTL](admin-api-namespaces.md#configure-message-ttl) <br/> [Configure retention](admin-api-namespaces.md#configure-retention) <br/> [Configure dispatch throttling](admin-api-namespaces.md#configure-dispatch-throttling-for-topics) <br/> [Clear backlog](admin-api-namespaces.md#clear-backlog) <br/> [Namespace isolation](admin-api-namespaces.md#namespace-isolation) <br/> [Unload a namespace](admin-api-namespaces.md#unload-namespaces-from-a-broker) <br/> [Permissions](admin-api-permissions.md) <br/> [Anti-affinity namespaces](administration-anti-affinity-namespaces.md)
Entities | Topic | [Manage topic resources](admin-api-topics.md#manage-topic-resources): [list](admin-api-topics.md#list-of-topics), [permissions](admin-api-topics.md#grant-permission), [delete](admin-api-topics.md#delete-topic), [unload](admin-api-topics.md#unload-topic), [truncate](admin-api-topics.md#truncate-topic), [stats](admin-api-topics.md#get-stats), [internal stats](admin-api-topics.md#get-internal-stats), [peek](admin-api-topics.md#peek-messages), [skip](admin-api-topics.md#skip-messages) and [examine](admin-api-topics.md#examine-messages) messages, [reset a cursor](admin-api-topics.md#reset-cursor), [look up the owner broker](admin-api-topics.md#look-up-topics-owner-broker), [get the bundle](admin-api-topics.md#get-bundle), [subscriptions](admin-api-topics.md#get-subscriptions), [backlog size](admin-api-topics.md#get-backlog-size), [inactive topic policies](admin-api-topics.md#configure-inactive-topic-policies), [offload policies](admin-api-topics.md#configure-offload-policies) <br/> [Non-partitioned topics](admin-api-topics.md#manage-non-partitioned-topics) <br/> [Partitioned topics](admin-api-topics.md#manage-partitioned-topics) <br/> [Subscriptions](admin-api-topics.md#manage-subscriptions) <br/> [Scalable topics](admin-api-scalable-topics.md)
Entities | Schema | [Upload](admin-api-schemas.md#upload-a-schema) <br/> [Get the latest](admin-api-schemas.md#get-the-latest-schema) or [a specific](admin-api-schemas.md#get-a-specific-schema) schema <br/> [Extract](admin-api-schemas.md#extract-a-schema) <br/> [Delete](admin-api-schemas.md#delete-a-schema) <br/> [AutoUpdate](admin-api-schemas.md#manage-schema-autoupdate) <br/> [Validation enforcement](admin-api-schemas.md#manage-schema-validation-enforcement) <br/> [Compatibility strategy](admin-api-schemas.md#manage-schema-compatibility-strategy)
Stream processing | Function | [Create](admin-api-functions.md#create-a-function) <br/> [Update](admin-api-functions.md#update-a-function) <br/> [Start](admin-api-functions.md#start-a-function), [stop](admin-api-functions.md#stop-a-function) and [restart](admin-api-functions.md#restart-a-function) <br/> [List](admin-api-functions.md#list-all-functions) <br/> [Delete](admin-api-functions.md#delete-a-function) <br/> [Get info](admin-api-functions.md#get-info-about-a-function), [status](admin-api-functions.md#get-status-of-a-function) and [stats](admin-api-functions.md#get-stats-of-a-function) <br/> [Trigger](admin-api-functions.md#trigger-a-function) <br/> [Put](admin-api-functions.md#put-state-associated-with-a-function) and [fetch](admin-api-functions.md#fetch-state-associated-with-a-function) state
Stream processing | Function worker | [Function worker stats, cluster membership, function assignments and rebalancing](/reference/#/@pulsar:version_reference@/pulsar-admin/functions-worker)
Stream processing | Connector | [Create](io-use.md#run-a-connector) <br/> [Update](io-use.md#update-a-connector) <br/> [Stop](io-use.md#stop-a-connector) and [restart](io-use.md#restart-a-connector) <br/> [Delete](io-use.md#delete-a-connector) <br/> [Monitor](io-use.md#monitor-a-connector)
Stream processing | Package | [Upload](admin-api-packages.md#upload-a-package) <br/> [Download](admin-api-packages.md#download-a-package) <br/> [Delete](admin-api-packages.md#delete-a-package) <br/> [Get](admin-api-packages.md#get-the-metadata-of-a-package) and [update](admin-api-packages.md#update-the-metadata-of-a-package) the metadata <br/> [List versions](admin-api-packages.md#list-all-versions-of-a-package) <br/> [List packages](admin-api-packages.md#list-all-packages-of-a-specific-type-under-a-namespace)
Stream processing | Transaction | [Get slow transactions](admin-api-transactions.md#getslowtransactions) <br/> [Scale the transaction coordinators](admin-api-transactions.md#scaletransactioncoordinators) <br/> [Transaction stats](admin-api-transactions.md#transaction-stats) <br/> [Coordinator stats](admin-api-transactions.md#transaction-coordinator-stats) <br/> [Pending ack stats](admin-api-transactions.md#transaction-pending-ack-stats) <br/> [Transaction buffer stats](admin-api-transactions.md#transaction-buffer-stats)
Others | Proxy | [Proxy statistics](/reference/#/@pulsar:version_reference@/pulsar-admin/proxy-stats)
Others | Resource group | [Create, update, get, list and delete resource groups](/reference/#/@pulsar:version_reference@/pulsar-admin/resourcegroups)
Others | Resource quota | [Get, set and reset the resource quota of namespace bundles](/reference/#/@pulsar:version_reference@/pulsar-admin/resource-quotas)

### Related topics

- To get up quickly, see [Pulsar admin API - Get started](admin-get-started.md).

- To check the detailed usage, see the API references below.

  - [Java admin API](@pulsar:javadoc:admin@/)

  - [REST API, OpenAPI specifications and generated clients](reference-rest-api-overview.md)
