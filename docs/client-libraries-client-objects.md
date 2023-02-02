---
id: client-libraries-client-objects
title: Work with client object
sidebar_label: "Work with client object"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

After setting up your client library and creating a client object, you can explore more to start working with your client.

## Create a client with multiple advertised listeners

To ensure clients in both internal and external networks can connect to a Pulsar cluster, Pulsar introduces [advertisedListeners](concepts-multiple-advertised-listeners.md).

The following example creates a Python client using multiple advertised listeners:

```python
import pulsar

client = pulsar.Client('pulsar://localhost:6650', listener_name='external')
```