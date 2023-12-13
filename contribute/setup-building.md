---
id: setup-building
title: Setup and building
---

## Prerequisites

| Dependency | Description                                                                                                                                                                                                         |
|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Git        | The source code of Pulsar is hosted on GitHub as a git repository. To work with the git repository, please [install git](https://git-scm.com/downloads).                                                            |
| JDK        | The source code of Pulsar is primarily written in Java. Therefore, you need a working Java Development Kit (JDK) to build it. Pulsar requires [JDK 17](https://adoptium.net/temurin/releases/?version=17) to build. |
| Maven      | The source code of Pulsar is managed by [Apache Maven](https://maven.apache.org/) The required Maven version is 3.6.1+.                                                                                             |
| Zip        | The build process requires Zip as a utility tool.                                                                                                                                                                   |

:::note

This project includes a [Maven Wrapper](https://maven.apache.org/wrapper/) that can be used instead of a system installed Maven. Use it by replacing `mvn` with `./mvnw` on Linux and `mvnw.cmd` on Windows in the commands below.

:::

## Clone

Clone the source code to your development machine:

```bash
git clone https://github.com/apache/pulsar
```

The following commands are assumed to be executed from the project root directory:

```bash
cd pulsar
```

## Build

Compile and install to local Maven repository:

```bash
./mvnw clean install -DskipTests
```

## Run

```bash
bin/pulsar standalone
```

## Connect

```bash
bin/pulsar-shell
```
