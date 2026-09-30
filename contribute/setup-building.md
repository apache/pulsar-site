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
| JDK        | The source code of Pulsar is primarily written in Java. Building the `master` branch requires **JDK 21, 25, or 26** (server bytecode targets Java 21; client and public API bytecode targets Java 17). It is recommended to use SDKMAN to install Corretto OpenJDK, see ["Setting up JDKs using SDKMAN"](setup-buildtools.md) for details. |
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

Development builds omit Git and build metadata by default, so runtime version details can contain placeholder values. Use `-PpulsarIncludeBuildInfo=true` to capture that metadata when assembling a diagnostic build. For release builds, follow the [release process](release-process.md), which also uses a `pulsarBuildInfoFile` snapshot to keep metadata stable across separate Gradle invocations.

Check license headers and Java style without compiling sources or building shaded JARs:

```bash
./gradlew quickCheck
./gradlew spotlessApply            # auto-fix license headers
```

Use `./gradlew sanityCheck` to also compile main and test sources. It skips compilation of modules that depend on shaded artifacts so that the check does not build shaded JARs; their sources still receive the style and license checks. Neither command runs tests. Run the relevant tests and assemble affected artifacts separately.

For the Gradle build infrastructure and how to change build files (convention plugins, version catalog, configuration-cache rules), see [`ARCHITECTURE.md` → Build infrastructure](https://github.com/apache/pulsar/blob/master/ARCHITECTURE.md#build-infrastructure) in the apache/pulsar repository.

For local artifact publication, custom Maven repositories, or publishing the client and extension API/SPI dependency set with `-PpublishApiAndSpiOnly=true`, follow the source repository's [Publishing Maven artifacts](https://github.com/apache/pulsar/blob/master/build-logic/PUBLISHING.md) guide. API/SPI mode validates the selected artifacts' published dependency graph before uploading and narrows the BOM to that selection. Ordinary release publication keeps the full publication set.

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

### Detect Netty buffer leaks

Tests enable `paranoid` Netty leak detection by default. `NETTY_LEAK_DETECTION=report` reports leaks without failing tests, while `NETTY_LEAK_DETECTION=off` disables detection. Set `NETTY_LEAK_DUMP_DIR` to choose where `netty_leak_*.txt` reports are written; otherwise they use the test JVM's temporary directory.

To fail a local test JVM when a leak is detected:

```bash
NETTY_LEAK_DUMP_DIR=/tmp/pulsar-netty-leaks ./gradlew :pulsar-client-original:test \
  --tests "ConsumerBuilderImplTest" -PtestExitJvmOnLeak=true -PtestRetryCount=0
```

In CI, setting `NETTY_LEAK_DETECTION=fail_on_leak` makes its reporting step fail when dumps are found, including dumps from test containers. Test profiling disables leak detection to avoid distorting measurements. See [Netty buffer leak detection](https://github.com/apache/pulsar/blob/master/CONTRIBUTING.md#netty-buffer-leak-detection) for detection-level and exit-delay overrides.

### Profile a test run

Add `-PtestAsyncProfiler` to a scoped test command:

```bash
./gradlew :pulsar-broker:test --tests "<SomeTest>" -PtestAsyncProfiler
```

The build uses `-Ptest.asyncprofiler.libpath`, then `LIBASYNCPROFILER_PATH`, then a profiler library bundled with the test JDK. Recordings and logs go to `build/test-profiles/` by default. Profiling disables retries and test-result caching, uses one test JVM, and enables otherwise skipped manual tests. Keep the `--tests` filter narrow. See [Profiling tests with async-profiler](https://github.com/apache/pulsar/blob/master/CONTRIBUTING.md#profiling-tests-with-async-profiler) for integration-cluster profiling, recording options, and analysis.

For profiling components inside a Docker integration-test cluster, use the separate `profilingIntegrationTest` task described in [Profiling an integration test](https://github.com/apache/pulsar/blob/master/tests/README.md#profiling-an-integration-test). For repeatable workload scenarios and comparisons between revisions, follow the [performance testing guide](https://github.com/apache/pulsar/blob/master/tests/performance/README.md), which covers scenario files, recordings, reports, and analysis.

### Python Functions instance tests

Run the Python instance test helper inside a virtual environment. It installs the required test dependencies into the selected interpreter unless `SKIP_PYTHON_DEPS=true`:

```bash
python3 -m venv .venv-functions
source .venv-functions/bin/activate
./pulsar-functions/instance/src/scripts/run_python_instance_tests.sh
```

Use `PYTHON_BIN` to select a different interpreter. The helper runs test modules in separate processes and returns failure if any module fails.

## Client runtime compatibility

Server implementations and ordinary tests target Java 21. Published client libraries (including the v5 client), client CLI tools, and public Functions/IO interfaces target Java 17. A Function compiled for Java 17 can run in a Java 21 or later Functions instance.

The build checks client/API bytecode and compile/runtime dependencies with `verifyClientJavaCompatibility` during `assemble`. When changing client dependencies, keep the complete dependency graph compatible with Java 17; do not add a dependency on a server implementation merely because both modules compile with the same build JDK. The `tests:client-java-compatibility` module exercises published client artifacts on Java 17.

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

Build the `apachepulsar/pulsar` Docker image (the `pulsar-all` image is no longer built):

```bash
./gradlew docker
```
