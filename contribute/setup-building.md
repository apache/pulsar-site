---
id: setup-building
title: Setup and building
---

This page describes building the Pulsar `master` branch, which uses a **Gradle** build (migrated from Maven via [PIP-463](https://github.com/apache/pulsar/blob/master/pip/pip-463.md)).

:::note

Maintenance branches (`branch-4.2` and earlier) continue to use the Maven build (`./mvnw`). When working on a maintenance branch, follow the build instructions in that branch's `README.md`.

:::

## Prerequisites

| Dependency | Description                                                                                                                                                                                                         |
|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Git        | The source code of Pulsar is hosted on GitHub as a git repository. To work with the git repository, please [install git](https://git-scm.com/downloads). We highly recommend that you also [set up a Git mergetool](setup-git.md#mergetool) for resolving merge conflicts. |
| JDK        | The source code of Pulsar is primarily written in Java. Building the `master` branch requires **JDK 21 or 25** (the bytecode targets Java 17). It is recommended to use SDKMAN to install Corretto OpenJDK, see ["Setting up JDKs using SDKMAN"](setup-buildtools.md) for details. |
| Zip        | The build process requires Zip as a utility tool. |
| Docker     | Required only for building docker images and running the container-based integration tests. |

There is no separate build tool to install: the repository includes the [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html), so a Gradle installation is not needed.

:::note Windows

Pulsar does not officially support Windows. To run Pulsar on Windows, run it in Docker — see [Run Pulsar in Docker](https://pulsar.apache.org/docs/4.0.x/getting-started-docker/).

For developing Pulsar on Windows, using [WSL2 (Windows Subsystem for Linux)](https://learn.microsoft.com/en-us/windows/wsl/install) is strongly recommended. Use the most recent WSL2 version; legacy WSL (WSL 1) is not supported. Inside WSL2, follow the Linux instructions on this page as-is (`./gradlew`). IntelliJ IDEA supports [developing in a WSL2 environment](https://www.jetbrains.com/help/idea/how-to-use-wsl-development-environment-in-product.html).

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

Compile and assemble everything, or a single module:

```bash
./gradlew assemble
./gradlew :pulsar-broker:assemble
```

Lint / verify (license headers, formatting, checkstyle) — run before pushing:

```bash
./gradlew rat spotlessCheck checkstyleMain checkstyleTest
./gradlew spotlessApply            # auto-fix license headers/formatting
```

For the Gradle build infrastructure and how to change build files (convention plugins, version catalog, configuration-cache rules), see [`ARCHITECTURE.md` → Build infrastructure](https://github.com/apache/pulsar/blob/master/ARCHITECTURE.md#build-infrastructure) in the apache/pulsar repository.

## Run tests

Always scope test runs with `--tests` — running a whole module's test task is slow:

```bash
# Run a single test class
./gradlew :pulsar-client-original:test --tests "ConsumerBuilderImplTest"
# Run a single test method
./gradlew :pulsar-client-original:test --tests "ConsumerBuilderImplTest.<methodName>"
# Run all tests in a specific package
./gradlew :pulsar-broker:test --tests "org.apache.pulsar.broker.admin.*"
```

:::note

Several Gradle project paths do not match their directory name because the Maven artifactId is preserved — for example, directory `pulsar-client/` is the Gradle project `:pulsar-client-original`. Check `settings.gradle.kts` when a path is ambiguous. See [`ARCHITECTURE.md` → Module name vs. directory name gotcha](https://github.com/apache/pulsar/blob/master/ARCHITECTURE.md#module-name-vs-directory-name-gotcha).

:::

For test groups, test-related build properties, container-based integration tests, and running the full CI pipeline, see [`CONTRIBUTING.md` → Running tests](https://github.com/apache/pulsar/blob/master/CONTRIBUTING.md#running-tests) in the apache/pulsar repository and the [Personal CI guide](personal-ci.md).

## Run

Start a standalone Pulsar service (broker + bookie + metadata in one JVM):

```bash
bin/pulsar standalone
```

## Connect

```bash
bin/pulsar-shell
```

## Build docker images

Build the `apachepulsar/pulsar:latest` and `apachepulsar/pulsar-all:latest` docker images:

```bash
./gradlew docker        # or docker-all
```
