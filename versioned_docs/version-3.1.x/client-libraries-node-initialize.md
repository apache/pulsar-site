---
id: client-libraries-node-initialize
title: Initialize Node.js client
sidebar_label: "Initialize"
---


To interact with Pulsar, you first need a client object. You can create a client instance using a `new` operator and the `Client` method, passing in a client options object.

Here is an example:

```javascript
const Pulsar = require('pulsar-client');

(async () => {
  const client = new Pulsar.Client({
    serviceUrl: 'pulsar://localhost:6650',
  });

  await client.close();
})();
```

For a complete list of client configurations, see [here](client-libraries-node-configs.md#client-configuration).