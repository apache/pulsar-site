---
id: reference-cli-tools
title: Pulsar command-line tools
sidebar_label: "Pulsar CLI tools"
description: Learn how to use Pulsar command-line tools.
---

Pulsar offers several command-line tools that you can use for managing Pulsar installations, performance testing, using command-line producers and consumers, and more.

* `pulsar-admin`
* `pulsar`
* `pulsar-client`
* `pulsar-daemon`
* `pulsar-perf`
* `pulsar-shell`
* `bookkeeper`

:::tip

For the latest and complete information about command-line tools, including commands, flags, descriptions, and more information, see the [reference doc](/reference/#/@pulsar:version_reference@/).

:::

All Pulsar command-line tools can be run from the `bin` directory of your [installed Pulsar package](getting-started-standalone.md).

You can get help for any CLI tool, command, or subcommand using the `--help` flag, or `-h` for short. Here's an example:

```shell
bin/pulsar broker --help
```

## Produce, consume, and read with pulsar-client

`pulsar-client produce`, `consume`, and `read` select the v5 API for `topic://` scalable topics and the v4 client API for persistent, non-persistent, and unprefixed topic names. For example:

```shell
bin/pulsar-client produce topic://public/default/orders -m 'order placed'
bin/pulsar-client consume topic://public/default/orders -s workers -p Earliest -n 1
bin/pulsar-client read topic://public/default/orders -m earliest -n 1
```

Use `--client-api V5` to access a regular persistent topic with v5, or `--client-api V4` to select the v4 client API explicitly. The option belongs to the subcommand:

```shell
bin/pulsar-client produce persistent://public/default/orders --client-api V5 -m 'order placed'
```

The v5 client requires brokers with `scalableTopicsEnabled=true`, including for regular persistent topics, and a binary `pulsar://` or `pulsar+ssl://` service URL. The v4 client cannot access scalable topics; the v5 client cannot access non-persistent topics. Address a scalable topic by its `topic://` name, rather than an internal `segment://` name. The WebSocket path serves regular topics and cannot access scalable topics. Select the client API with `--client-api`.

The selected API also affects command behavior:

| Command or option | v5 behavior |
|---|---|
| `consume` | Uses a durable Queue consumer with individual acknowledgment and shared work distribution. Selecting `Exclusive` or `Failover` does not preserve the v4 client's subscription semantics; selecting `NonDurable` still creates a durable subscription. |
| `consume --regex` | Extracts `tenant/namespace` from the pattern and follows **all scalable topics** there; it does not apply the topic-name regex. |
| `read --start-message-id` | Uses a Checkpoint consumer and accepts `earliest` or `latest`. A `ledgerId:entryId` position requires v4. |
| `produce` schemas | Supports bytes, string, and explicit Avro or JSON schemas. KeyValue producer options require v4. |
| `consume` / `read` schemas | Accepts `bytes` or `auto_consume`. |
| `--encryption-key-value` | Accepts a `file:` URI to a PEM key, including `file:///absolute/path` and `file:relative/path`. Other key URI schemes require v4. |

Command help groups options by the API they support. Explicitly supplying an option from the other API's group is an error. Use regular topics with v4 when you need v4 subscription behavior, topic-name regex filtering, timestamp-based consumption, or v4 reader positions. For ordered scalable consumption, use the [Java v5 Stream consumer](pathname:///docs/client-libraries/java-v5#stream-consumer) or the [Pulsar Perf Stream benchmark](performance-pulsar-perf.md#select-the-client-api).
