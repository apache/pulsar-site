---
id: client-libraries-python-setup
title: Set up Python client
sidebar_label: "Set up"
description: Learn how to set up Python client library in Pulsar.
---

To set up Python client library in Pulsar, complete the following steps.

## Step 1: Install Python client library

Use [pip](https://pip.pypa.io/) to install the latest version:

```bash
pip install 'pulsar-client==@pulsar:version:python@'
```

You can install optional components alongside the client library:

```bash
# avro serialization
pip install 'pulsar-client[avro]==@pulsar:version:python@'

# functions runtime
pip install 'pulsar-client[functions]==@pulsar:version:python@'

# all optional components
pip install 'pulsar-client[all]==@pulsar:version:python@'
```

Installation via PyPi is available for the following Python versions:

| Platform                       | Supported Python versions |
|:-------------------------------|:--------------------------|
| macOS (&gt;= 11.0)                | 3.7, 3.8, 3.9 and 3.10    |
| Linux (including Alpine Linux) | 3.7, 3.8, 3.9 and 3.10    |

## Step 2: Connect to Pulsar cluster

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
