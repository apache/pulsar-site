---
id: getting-started-standalone
title: Run a standalone Pulsar cluster locally
sidebar_label: "Run Pulsar locally"
description: Get started with Apache Pulsar on your local machine.
---

:::warning Network perimeter security required

A Pulsar cluster is not intended to be exposed on the public internet. The security considerations in the current design expect network perimeter security. This requirement can be met by deploying Pulsar in private networks and restricting access to trusted clients and services.

:::

For local development and testing, you can run Pulsar in standalone mode on your machine. The standalone mode runs all components of a Pulsar [cluster](concepts-architecture-overview.md#clusters) inside a single Java Virtual Machine (JVM) process.

:::tip

If you're looking to run a full production Pulsar installation, see the [Deploying a Pulsar instance](deploy-bare-metal.md) guide.

:::

To run Pulsar in standalone mode on your machine, follow the steps below.

## Step 0: Prerequisites

Currently, Pulsar is available for 64-bit **macOS** and **Linux**. See [Run Pulsar In Docker](getting-started-docker.md) if you want to run Pulsar on **Windows**.

Pulsar servers, including standalone, require a 64-bit **Java 21 or later** runtime. **Java 25** is recommended and is included in the Pulsar Docker image. Use a maintained Java release with current security and bug fixes.

The Java client libraries have a separate minimum of **Java 17**; this does not mean that the broker or standalone server can run on Java 17.

For installation instructions, see [Setting up JDKs using SDKMAN](pathname:///contribute/setup-buildtools). For an older Pulsar release, use that release's version of this guide.

## Step 1: Download Pulsar distribution

Download the official Apache Pulsar distribution:

```bash
curl -LO "https://www.apache.org/dyn/closer.lua/pulsar/pulsar-@pulsar:version@/apache-pulsar-@pulsar:version@-bin.tar.gz?action=download"
```

You can also download the binary package on the [download page](pathname:///download).

Once downloaded, unpack the tar file:

```bash
tar xvfz apache-pulsar-@pulsar:version@-bin.tar.gz
```

For the rest of this quickstart all commands are run from the root of the distribution folder, so switch to it:

```bash
cd apache-pulsar-@pulsar:version@
```

List the contents by executing:

```bash
ls -1F
```

The following directories are created:

| Directory     | Description                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------- |
| **bin**       | The [`pulsar`](reference-cli-tools.md) entry point script, and many other command-line tools |
| **conf**      | Configuration files, including `broker.conf`                                                        |
| **lib**       | JARs used by Pulsar                                                                                 |
| **examples**  | [Pulsar Functions](functions-overview.md) examples                                                  |
| **instances** | Artifacts for [Pulsar Functions](functions-overview.md)                                             |

## Step 2: Start a Pulsar standalone cluster

Run this command to start a standalone Pulsar [cluster](concepts-architecture-overview.md#clusters):

```bash
bin/pulsar standalone
```

By default, standalone advertises `localhost` when no advertised address or listeners are configured. To connect from another machine, set `--advertised-address` to an address reachable by that machine. Local BookKeeper bookies use kernel-assigned ports by default (`--bookkeeper-port 0`). To use fixed ports, set `--bookkeeper-port 3181`: bookie 0 uses port 3181, bookie 1 uses 3182, and so on. For existing data with legacy hostname-and-port bookie identities, the ports recorded in those identities take precedence over this option.

When the Pulsar cluster starts, the following directories are created:

| Directory | Description                                |
| --------- | ------------------------------------------ |
| **data**  | All data created by [BookKeeper](concepts-architecture-overview.md#apache-bookkeeper) and RocksDB |
| **logs**  | All server-side logs                       |

### Reuse standalone data

`pulsar standalone` uses RocksDB for metadata by default and runs embedded BookKeeper storage. It can also use embedded ZooKeeper, selected with `PULSAR_STANDALONE_USE_ZOOKEEPER=1`.

Before reusing standalone data with a different release, stop the old instance and back up its data, metadata, and configuration together. Retain its binaries or container image for your rollback plan. Restart with the same metadata store and configured storage paths, including mount paths inside a container. See the [standalone upgrade guide](administration-upgrade-to-5.0.x-standalone.md#prepare-persisted-standalone-data).

Existing bookie identities are preserved automatically. New instances using RocksDB or an explicit metadata-store URL use index-based identities (`bk-0`, `bk-1`, and so on), independent of the hostname, port, and data-directory path.

:::tip

* To run the service as a background process, you can use the `bin/pulsar-daemon start standalone` command. For more information, see [pulsar-daemon](reference-cli-tools.md).
* The `public/default` namespace is created when you start a Pulsar cluster. This namespace is for development purposes. All Pulsar topics are managed within namespaces. For more information, see [Namespaces](concepts-messaging.md#namespaces) and [Topics](concepts-messaging.md#topics).

:::

## Step 3: Create a topic

Pulsar stores messages in [topics](concepts-messaging.md#topics). It's a good practice to explicitly create topics before using them, even if Pulsar can automatically create topics when they are referenced.

To create a new topic, run this command:

```bash
bin/pulsar-admin topics create persistent://public/default/my-topic
```

## Step 4: Write messages to the topic

You can use the `pulsar-client` command line tool to write messages to a topic. This is useful for experimentation, but in practice you'll use the [Producer](concepts-clients.md#producer) API in your application code, or [Pulsar IO](io-overview.md) connectors for pulling data in from other systems to Pulsar.

Run this command to produce a message:

```bash
bin/pulsar-client produce my-topic --messages 'Hello Pulsar!'
```

## Step 5: Read messages from the topic

Now that some messages have been written to the topic, run this command to launch the [consumer](concepts-clients.md#consumer) and read those messages back:

```bash
bin/pulsar-client consume my-topic -s 'my-subscription' -p Earliest -n 0
```

`-p Earliest` starts a newly created subscription at the earliest retained message. An existing subscription resumes from its saved position. `-n` configures the number of messages to consume; `0` means to consume forever.

As before, this is useful for experimenting with messages, but in practice you'll use the [Consumer](concepts-clients.md#consumer) API in your application code, or [Pulsar IO](io-overview.md) connectors for reading data from Pulsar to push to other systems.

You'll see the messages you produce in the previous step:

```text
----- got message -----
key:[null], properties:[], content:Hello Pulsar!
```

## Step 6: Write some more messages

Leave the consume command from the previous step running. If you've already closed it, just re-run it.

Now open a new terminal window and produce more messages. The default message separator is `,`:

```bash
bin/pulsar-client produce my-topic --messages "$(seq -s, -f 'Message NO.%g' 1 10)"
```

Note how they are displayed almost instantaneously in the consumer terminal.

## Step 7: Stop the Pulsar cluster

Once you've finished you can shut down the Pulsar cluster. Press **Ctrl-C** in the terminal window in which you started the cluster.

## Use the CLI with schemas and scalable topics

The `consume` and `read` commands use the `bytes` schema by default. To decode messages using their registered schema, select `auto_consume`:

```shell
bin/pulsar-client consume persistent://public/default/my-schema-topic \
  --subscription-name schema-inspection --subscription-position Earliest \
  --schema-type auto_consume --num-messages 1
```

`produce`, `consume`, and `read` automatically use the v5 client for `topic://` scalable topics and the v4 client for regular topic names, including `persistent://`, `non-persistent://`, and unprefixed names. To use the v5 client explicitly with a regular persistent topic, add `--client-api V5`. All v5 client connections require `scalableTopicsEnabled=true` on the broker, including connections to regular topics; see the [upgrade guidance](administration-upgrade.md) before enabling it during a rolling upgrade.

Use each command's `--help` output to check which options apply to the selected client API. For example, v5 `consume --regex` selects the pattern's entire namespace; it does not filter individual topic names using the regular expression. See [scalable topics](concepts-scalable-topics.md) for their subscription and ordering model.

## Related Topics

- [Pulsar Concepts and Architecture](concepts-architecture-overview.md)
- [Pulsar Client Libraries](/docs/client-libraries/)
- [Pulsar Connectors](io-overview.md)
- [Pulsar Functions](functions-overview.md)
