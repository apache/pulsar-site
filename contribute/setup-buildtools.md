---
id: setup-buildtools
title: Setting up JDKs using SDKMAN
---

## Build tool requirements for Pulsar master branch

Building the Pulsar `master` branch requires **JDK 21 or JDK 25** (the bytecode targets Java 17). There is no separate build tool to install: Pulsar uses a [Gradle](https://gradle.org/) build (migrated from Maven via [PIP-463](https://github.com/apache/pulsar/blob/master/pip/pip-463.md)), and the repository includes the [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html) — use `./gradlew`. On Windows, developing inside WSL2 is strongly recommended (see [Setup and building](setup-building.md)), where the Linux instructions apply as-is.

The instructions below cover installing and managing JDK versions with [SDKMAN](https://sdkman.io/).

:::note

Maintenance branches (`branch-4.2` and earlier) and the [release process](release-process.md) continue to use the Maven build. When needed for those, install Maven with SDKMAN (`sdk i maven 3.9.9`) and additional JDK versions the same way as below (e.g. `sdk i java 17.0.19-amzn` for branches that build with JDK 17).

:::

## Setting up JDKs using SDKMAN

### Install SDKMAN

See https://sdkman.io/install for detailed instructions.

### Install a JDK

In Pulsar development, we use [Amazon Corretto OpenJDK](https://docs.aws.amazon.com/corretto/) to build Pulsar.

- JDK 21 or 25 is required for building the Pulsar `master` branch
  - code is compiled for Java 17 bytecode
  - Pulsar docker images run Java 21

#### Installing Amazon Corretto OpenJDK using SDKMAN

```shell
# find out most recent Amazon Corretto release
sdk l java |grep amzn
# install Java 21
sdk i java 21.0.11-amzn
# install Java 25
sdk i java 25.0.3-amzn
# install Java 17, optional step, not needed for master branch development
sdk i java 17.0.19-amzn
# adding / updating aliases
cd ~/.sdkman/candidates/java
rm -f 17 && ln -s 17.0.19-amzn 17 # optional step, not needed for master branch development
rm -f 21 && ln -s 21.0.11-amzn 21
rm -f 25 && ln -s 25.0.3-amzn 25
# switching between versions using aliases
sdk u java 17
sdk u java 21
sdk u java 25
```

#### Setting up Java version auto-switching with SDKMAN (optional)

With auto-switching, when there's a `.sdkmanrc` file in a directory, SDKMAN will switch to the defined Java version.
This is convenient for developers to switch between different versions of Java.

```shell
# enable sdkman_auto_env
echo sdkman_auto_env=true >> ~/.sdkman/etc/config
# ignore .sdkmanrc files by default
echo .sdkmanrc >> ~/.gitignore_global
# enable the global ~/.gitignore_global file
git config --global core.excludesfile $HOME/.gitignore_global

# now you can add .sdkmanrc files to repository directories for automatically switching the JDK version
echo java=21 > .sdkmanrc && cd $PWD
```

## Gradle command-line completion (optional)

For a better developer experience, install [Gradle command-line completion](https://docs.gradle.org/current/userguide/command_line_interface.html#sec:command_line_completion) ([gradle-completion installation instructions](https://github.com/gradle/gradle-completion?tab=readme-ov-file#gradle-completion)) for bash and zsh shells.
