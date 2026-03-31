---
id: client-libraries-python-initialize
title: Initialize Python client
sidebar_label: "Initialize"
description: Learn how to initialize Python client in Pulsar.
---

You can instantiate a Client object using just a URL for the target Pulsar [cluster](reference-terminology.md#cluster) like this:

```python
import pulsar

client = pulsar.Client('pulsar://localhost:6650')
```

:::note

If you run a cluster in [standalone mode](getting-started-standalone.md), the broker is available at the `pulsar://localhost:6650` URL by default.

:::
