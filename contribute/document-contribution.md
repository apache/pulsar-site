---
id: document-contribution
title: Updating document
---

This guide explains the organization of Pulsar documentation and website repos and the workflow of updating various Pulsar documents.

## Source repositories

Currently, the source of documents and website (where the docs are finally published) are located at the [apache/pulsar-site](https://github.com/apache/pulsar-site) repo.

## Update versioned docs

Documentation should be up to date for all [actively supported versions](https://pulsar.apache.org/contribute/release-policy/#supported-versions).

```shell
# List all supported major.minor.x versions
./scripts/docs-tool.sh supported_versions
```

No need to update documentation for versions that are not actively maintained unless the documentation is incorrect.

To update versioned docs, go to [versioned_docs folder](https://github.com/apache/pulsar-site/tree/main/versioned_docs).

After committing the changes for the `docs` directory, you can use the `docs-tool` to apply the changes to the versioned docs. This tool is a wrapper around `git diff` and `patch`. If the patch is not applied correctly, you will have to manually apply the changes to the versioned docs.

```shell
./scripts/docs-tool.sh apply_changes_to_versioned_docs
```

For example, if you want to add docs for an improvement introduced in 4.0.1, you can add the following instructions:

```
:::note

This <fix / improvment> is available for 4.0.1 and later versions.

:::
```

## Update reference docs

If you want to update [Pulsar reference docs](pathname:///reference/), you should update the corresponding source files.

- Some reference docs are generated from code **automatically**. If you want to update the docs, you need to update the source code files.
- Some configuration docs are updated **manually** using markdown files.

### Update configuration docs

Docs for configs of bundled components are generated from command-line tools **automatically**:

| Components | Update where ...                                                                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Broker     | [org.apache.pulsar.broker.ServiceConfiguration](https://github.com/apache/pulsar/blob/master/pulsar-broker-common/src/main/java/org/apache/pulsar/broker/ServiceConfiguration.java)                                 |
| WebSocket  | [org.apache.pulsar.websocket.service.WebSocketProxyConfiguration](https://github.com/apache/pulsar/blob/master/pulsar-websocket/src/main/java/org/apache/pulsar/websocket/service/WebSocketProxyConfiguration.java) |
| Proxy      | [org.apache.pulsar.proxy.server.ProxyConfiguration](https://github.com/apache/pulsar/blob/master/pulsar-proxy/src/main/java/org/apache/pulsar/proxy/server/ProxyConfiguration.java)                                 |
| Standalone | [org.apache.pulsar.broker.ServiceConfiguration](https://github.com/apache/pulsar/blob/master/pulsar-broker-common/src/main/java/org/apache/pulsar/broker/ServiceConfiguration.java)                                 |
| Client     | [org.apache.pulsar.client.impl.conf.ClientConfigurationData](https://github.com/apache/pulsar/blob/master/pulsar-client/src/main/java/org/apache/pulsar/client/impl/conf/ClientConfigurationData.java)              |
| Producer   | [org.apache.pulsar.client.impl.conf.ProducerConfigurationData](https://github.com/apache/pulsar/blob/master/pulsar-client/src/main/java/org/apache/pulsar/client/impl/conf/ProducerConfigurationData.java)          |
| Consumer   | [org.apache.pulsar.client.impl.conf.ConsumerConfigurationData](https://github.com/apache/pulsar/blob/master/pulsar-client/src/main/java/org/apache/pulsar/client/impl/conf/ConsumerConfigurationData.java)          |
| Reader     | [org.apache.pulsar.client.impl.conf.ReaderConfigurationData](https://github.com/apache/pulsar/blob/master/pulsar-client/src/main/java/org/apache/pulsar/client/impl/conf/ReaderConfigurationData.java)              |

Docs for configs of external components (whose source code is hosted outside the Pulsar repositories) are updated **manually**:

| Components  | Update where ...                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BookKeeper  | [reference-configuration-bookkeeper.md](https://github.com/apache/pulsar-site/blob/main/static/reference/next/config/reference-configuration-bookkeeper.md)   |
| Log4j       | [reference-configuration-log4j.md](https://github.com/apache/pulsar-site/blob/main/static/reference/next/config/reference-configuration-log4j.md)             |
| Log4j shell | [reference-configuration-log4j-shell.md](https://github.com/apache/pulsar-site/blob/main/static/reference/next/config/reference-configuration-log4j-shell.md) |
| ZooKeeper   | [reference-configuration-zookeeper.md](https://github.com/apache/pulsar-site/blob/main/static/reference/next/config/reference-configuration-zookeeper.md)     |

### Update command-line tool docs

Docs for bundled Java-based command-line tools are generated **automatically**:

| Components    | Update where…                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pulsar        | Different subcommands of [bin/pulsar](https://github.com/apache/pulsar/blob/master/bin/pulsar) are updated in different code files                                                                                                                                                                        |
| pulsar-admin  | [Classes under the admin command-line folder](https://github.com/apache/pulsar/tree/master/pulsar-client-tools/src/main/java/org/apache/pulsar/admin/cli)                                                                                                                                                 |
| pulsar-client | [Classes under the client command-line folder](https://github.com/apache/pulsar/tree/master/pulsar-client-tools/src/main/java/org/apache/pulsar/client/cli)                                                                                                                                               |
| pulsar-perf   | <li>[The `websocket-producer` subcommand](https://github.com/apache/pulsar/tree/master/pulsar-testclient/src/main/java/org/apache/pulsar/proxy/socket/client)</li><li>[Other subcommands](https://github.com/apache/pulsar/tree/master/pulsar-testclient/src/main/java/org/apache/pulsar/testclient)</li> |

Docs for external command-line tools or bare scripts are updated **manually**:

| Components    | Update where…                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| pulsar-shell  | [pulsar-shell.md](https://github.com/apache/pulsar-site/blob/main/static/reference/next/pulsar-shell/pulsar-shell.md)    |
| pulsar-daemon | [pulsar-daemon.md](https://github.com/apache/pulsar-site/blob/main/static/reference/next/pulsar-daemon/pulsar-daemon.md) |
| bookkeeper    | [bookkeeper.md](https://github.com/apache/pulsar-site/blob/main/static/reference/next/bookkeeper/bookkeeper.md)          |

## Update feature matrix

Pulsar feature matrix introduces the features supported by language-specific clients and functions. It includes:

- [Client Feature Matrix](pathname:///client-feature-matrix)
- [Function Feature Matrix](https://docs.google.com/spreadsheets/d/1YHYTkIXR8-Ql103u-IMI18TXLlGStK8uJjDsOOA0T20/edit#gid=328808194)

You need to update the feature matrix as soon as your related commits get merged. The workflow is illustrated as follows.

![Client Feature Matrix Workflow](media/client-matrix-workflow.png)

1. Submit your code and doc PRs.
2. Get your PRs reviewed and merged.
3. Update the feature matrix to flag your contribution.

:::note

- For how to update the [Client Feature Matrix](pathname:///client-feature-matrix), see [How to update data-driven pages](site-intro.md#how-to-update-data-driven-pages).
- If you have problems in editing the spreadsheet of [Function Feature Matrix](https://docs.google.com/spreadsheets/d/1YHYTkIXR8-Ql103u-IMI18TXLlGStK8uJjDsOOA0T20/edit#gid=328808194), you can reach out to `dev@pulsar.apache.org`.

:::
