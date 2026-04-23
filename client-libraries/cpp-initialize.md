---
id: cpp-initialize
title: Initialize a C++ client object
sidebar_label: "Initialize"
description: Learn how to Initialize C++ client in Pulsar.
---

You can instantiate a Client object using just a URL for the target Pulsar [cluster](pathname:///docs/reference-terminology#cluster) like this:

```cpp
Client client("pulsar://localhost:6650");
```

:::note

If you run a cluster in [standalone mode](pathname:///docs/getting-started-standalone), the broker is available at the `pulsar://localhost:6650` URL by default.

:::
