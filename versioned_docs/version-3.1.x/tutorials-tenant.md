---
Id: tutorials-tenant
title: How to set up a tenant
sidebar_label: "Set up a tenant"
---


Pulsar is a powerful messaging system you can use to process and route high volumes of data. Each tenant provides a distinct unit of isolation with its own set of roles, permissions, configuration settings, and bookmarks. 

In this tutorial, you will create a new tenant, named "apache" in your Pulsar cluster, hosted in K8s helm. 

To create a tenant:

1. Enter the toolset container.

   ```bash
   kubectl exec -it -n pulsar pulsar-mini-toolset-0 -- /bin/bash
   ```

2. In the toolset container, create a tenant named apache.

   ```bash
   bin/pulsar-admin tenants create apache
   ```

3. List the tenants to see if the tenant is created successfully.

   ```bash
   bin/pulsar-admin tenants list
   ```

   You should see a similar output as below. 

   ```
   The tenant apache has been successfully created.
   "apache"
   "public"
   "pulsar"
   ```

#### Related Topics

- [Create a namespace](tutorials-namespace.md)
- [Create a topic](tutorials-topic.md)
- [Run a standalone cluster in Kubernetes](getting-started-helm.md)









