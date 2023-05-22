---
id: client-libraries-node-setup
title: Set up Pulsar Node.js client
sidebar_label: "Set up"
---

## Install Node.js client library

Install the [`pulsar-client`](https://www.npmjs.com/package/pulsar-client) library via [npm](https://www.npmjs.com/):

```shell
npm install pulsar-client
```

For more information, see [README](https://github.com/apache/pulsar-client-node/blob/master/README.md).

:::note

This library only works in Node.js 10.x or later versions because it uses the [`node-addon-api`](https://github.com/nodejs/node-addon-api) module.

:::

## Connect to Pulsar cluster

To connect to Pulsar using client libraries, you need to specify a [Pulsar protocol](developing-binary-protocol.md) URL.

You can assign Pulsar protocol URLs to specific clusters and use the `pulsar` scheme. The following is an example of `localhost` with the default port `6650`:

```http
pulsar://localhost:6650
```

If you have multiple brokers, separate `IP:port` by commas:

```http
pulsar://localhost:6550,localhost:6651,localhost:6652
```

If you use [mTLS](security-tls-authentication.md) authentication, add `+ssl` in the scheme:

```http
pulsar+ssl://pulsar.us-west.example.com:6651
```