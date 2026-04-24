---
id: overview
slug: /
title: Pulsar client libraries
sidebar_label: "Overview"
description: Get a comprehensive understanding of Pulsar client libraries.  
---

## Language-specific client libraries

Pulsar supports the following language-specific client libraries:

| Language     | User doc              | API doc                                                                 | Release notes                                          | Code repo                                                                                                        |
|--------------|-----------------------|-------------------------------------------------------------------------|-------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| Java         | [User doc](java.md)   | [API doc](/api/client/)                                                 | [Notes](pathname:///release-notes/client-java)   | [github.com/apache/pulsar/tree/master/pulsar-client](https://github.com/apache/pulsar/tree/master/pulsar-client) |
| C++          | [User doc](cpp.md)    | [API doc](@pulsar:apidoc:cpp@)                                          | [Notes](pathname:///release-notes/client-cpp)    | [github.com/apache/pulsar-client-cpp](https://github.com/apache/pulsar-client-cpp)                               |
| Python       | [User doc](python.md) | [API doc](@pulsar:apidoc:python@)                                       | [Notes](pathname:///release-notes/client-python) | [github.com/apache/pulsar-client-python](https://github.com/apache/pulsar-client-python)                         |
| Go client    | [User doc](go.md)     | [API doc](https://pkg.go.dev/github.com/apache/pulsar-client-go/pulsar) | [Notes](pathname:///release-notes/client-go)     | [github.com/apache/pulsar-client-go](https://github.com/apache/pulsar-client-go)                                 |
| Node.js      | [User doc](node.md)   | —                                                                       | [Notes](pathname:///release-notes/client-node)   | [github.com/apache/pulsar-client-node](https://github.com/apache/pulsar-client-node)                             |
| C#/DotPulsar | [User doc](dotnet.md) | —                                                                       | [Notes](pathname:///release-notes/client-cs)     | [github.com/apache/pulsar-dotpulsar](https://github.com/apache/pulsar-dotpulsar)                                 |

:::tip

If you want to create your own client library, read the [binary protocol documentation](pathname:///docs/developing-binary-protocol).

:::

## Language-agnostic client libraries

Pulsar supports the following language-agnostic client libraries:

| Interface | Documentation                             | Release note                                      | Code repo                                                                |
|-----------|-------------------------------------------|---------------------------------------------------|--------------------------------------------------------------------------|
| REST      | [User doc](rest.md)      | [Notes](pathname:///release-notes/)             | [github.com/apache/pulsar/tree/master/pulsar-broker](https://github.com/apache/pulsar/tree/master/pulsar-broker)    |
| WebSocket | [User doc](websocket.md) | [Notes](pathname:///release-notes/client-ws) | [github.com/apache/pulsar/tree/master/pulsar-websocket](https://github.com/apache/pulsar/tree/master/pulsar-websocket) |

:::note

**Client / Broker compatibility**

A design goal of Pulsar is to ensure full compatibility between all versions of the client and the broker. When a client connects to a broker they agree upon a version of the protocol to use. As a result, new features that rely on an updates to the protocol are only available when using both newer clients and newer brokers.

:::

## Feature matrix

The [Client Feature Matrix](/docs/client-libraries/feature-matrix) page provides an overview of the latest feature supportability on language-specific clients.

## Third-party clients

Besides the officially released clients, multiple projects on developing Pulsar clients are available in different languages.

:::tip

Want your repository listed here? Click the "Edit this page" button at the bottom of this page.

:::

#### Alternative .NET (C#/F#/VB) client

This is an alternative for Apache Pulsar project's [dotPulsar client](dotnet.md).

| Project                                                                    | Description                                     | License                                    | Badges                                                                                                                                                                                                                                                   |
|----------------------------------------------------------------------------|-------------------------------------------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [pulsar-client-dotnet](https://github.com/fsprojects/pulsar-client-dotnet) | An alternative Apache Pulsar native client for .NET (C#/F#/VB) | [MIT](https://opensource.org/licenses/MIT) | ![GitHub Repo Stars](https://img.shields.io/github/stars/fsprojects/pulsar-client-dotnet?color=FEEA00&style=flat-square) ![GitHub Last Commit](https://img.shields.io/github/last-commit/fsprojects/pulsar-client-dotnet?color=7FD8BE&style=flat-square) |

#### Alternative Go client

This is an alternative Apache Pulsar project's [Go client](go.md)

| Project                                                         | Description                           | License                                                   | Badges                                                                                                                                                                                                                                   |
|-----------------------------------------------------------------|---------------------------------------|-----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [pulsar-client-go](https://github.com/Comcast/pulsar-client-go) | An alternative Go client library for Apache Pulsar | [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) | ![GitHub Repo Stars](https://img.shields.io/github/stars/apache/pulsar-client-go?color=FEEA00&style=flat-square) ![GitHub Last Commit](https://img.shields.io/github/last-commit/apache/pulsar-client-go?color=7FD8BE&style=flat-square) |

#### Haskell

| Project                                          | Description                      | License                                                   | Badges                                                                                                                                                                                                                     |
|--------------------------------------------------|----------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [supernova](https://github.com/cr-org/supernova) | Apache Pulsar client for Haskell | [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) | ![GitHub Repo Stars](https://img.shields.io/github/stars/cr-org/supernova?color=FEEA00&style=flat-square) ![GitHub Last Commit](https://img.shields.io/github/last-commit/cr-org/supernova?color=7FD8BE&style=flat-square) |

#### Node.js

| Project                                                     | Description                                                                                   | License                                    | Badges                                                                                                                                                                                                                                       |
|-------------------------------------------------------------|-----------------------------------------------------------------------------------------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [pulsar-flex](https://github.com/ayeo-flex-org/pulsar-flex) | Pulsar Flex is a modern Apache Pulsar client for Node.js, developed to be independent of C++. | [MIT](https://opensource.org/licenses/MIT) | ![GitHub Repo Stars](https://img.shields.io/github/stars/ayeo-flex-org/pulsar-flex?color=FEEA00&style=flat-square) ![GitHub Last Commit](https://img.shields.io/github/last-commit/ayeo-flex-org/pulsar-flex?color=7FD8BE&style=flat-square) |

#### PHP

| Project                                                             | Description                                 | License                                    | Badges                                                                                                                                                                                                                                           |
|---------------------------------------------------------------------|---------------------------------------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [pulsar-client-php](https://github.com/ikilobyte/pulsar-client-php) | PHP Native Client library for Apache Pulsar | [MIT](https://opensource.org/licenses/MIT) | ![GitHub Repo Stars](https://img.shields.io/github/stars/ikilobyte/pulsar-client-php?color=FEEA00&style=flat-square) ![GitHub Last Commit](https://img.shields.io/github/last-commit/ikilobyte/pulsar-client-php?color=7FD8BE&style=flat-square) |

#### Rust

| Project                                                | Description                           | License                                                   | Badges                                                                                                                                                                                                                                 |
|--------------------------------------------------------|---------------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [pulsar-rs](https://github.com/streamnative/pulsar-rs) | Rust Client library for Apache Pulsar | [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) | ![GitHub Repo Stars](https://img.shields.io/github/stars/streamnative/pulsar-rs?color=FEEA00&style=flat-square) ![GitHub Last Commit](https://img.shields.io/github/last-commit/streamnative/pulsar-rs?color=7FD8BE&style=flat-square) |

#### Scala

| Project                                                       | Description                                                          | License                                                   | Badges                                                                                                                                                                                                                             |
|---------------------------------------------------------------|----------------------------------------------------------------------|-----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [pulsar4s](https://github.com/CleverCloud/pulsar4s)           | Idiomatic, typesafe, and reactive Scala client for Apache Pulsar     | [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) | ![GitHub Repo Stars](https://img.shields.io/github/stars/CleverCloud/pulsar4s?color=FEEA00&style=flat-square) ![GitHub Last Commit](https://img.shields.io/github/last-commit/CleverCloud/pulsar4s?color=7FD8BE&style=flat-square) |
| [neutron](https://github.com/cr-org/neutron)                  | Purely functional Apache Pulsar client for Scala built on top of Fs2 | [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) | ![GitHub Repo Stars](https://img.shields.io/github/stars/cr-org/neutron?color=FEEA00&style=flat-square) ![GitHub Last Commit](https://img.shields.io/github/last-commit/cr-org/neutron?color=7FD8BE&style=flat-square)             |
| [neutron (profunktor's fork)](https://neutron.profunktor.dev) | Fs2-powered Apache Pulsar client with support for Scala 2 and 3      | [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) | ![GitHub Repo Stars](https://img.shields.io/github/stars/profunktor/neutron?color=FEEA00&style=flat-square) ![GitHub Last Commit](https://img.shields.io/github/last-commit/profunktor/neutron?color=7FD8BE&style=flat-square)     |


#### JMS

| Project                                                | Description                           | License                                                   | Badges                                                                                                                                                                                                                                 |
|--------------------------------------------------------|---------------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [pulsar-jms](https://github.com/datastax/pulsar-jms) | JMS Client library for Apache Pulsar | [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) | ![GitHub Repo Stars](https://img.shields.io/github/stars/datastax/pulsar-jms?color=FEEA00&style=flat-square) ![GitHub Last Commit](https://img.shields.io/github/last-commit/datastax/pulsar-jms?color=7FD8BE&style=flat-square) |