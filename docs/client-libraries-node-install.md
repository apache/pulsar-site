---
id: client-libraries-node-install
title: Set up Pulsar Node.js client
sidebar_label: "Set up"
---

## Install Node.js client

:::tip

Pulsar Node.js client library is based on the C++ client library. 
* You must install the Pulsar C++ client library before installing a Node.js client. For more details, see [instructions](client-libraries-cpp.md).
* If an incompatible version of the C++ client is installed, you may fail to build or run the Node.js library. For the compatibility between each version of the Node.js client and the C++ client, see [README](https://github.com/apache/pulsar-client-node/blob/master/README.md).

:::

Install the [`pulsar-client`](https://www.npmjs.com/package/pulsar-client) library via [npm](https://www.npmjs.com/):

```shell
npm install pulsar-client
```

:::note

This library only works in Node.js 10.x or later versions because it uses the [`node-addon-api`](https://github.com/nodejs/node-addon-api) module to wrap the C++ library.

:::

## Connect Pulsar cluster

To connect to Pulsar using client libraries, you need to specify a [Pulsar protocol](developing-binary-protocol.md) URL.

You can assign Pulsar protocol URLs to specific clusters and use the `pulsar` scheme. The following is an example of `localhost` with the default port `6650`:

```http
pulsar://localhost:6650
```

If you have multiple brokers, separate `IP:port` by commas:

```http
pulsar://localhost:6550,localhost:6651,localhost:6652
```

If you use [TLS](security-tls-authentication.md) authentication, add `+ssl` in the scheme:

```http
pulsar+ssl://pulsar.us-west.example.com:6651
```