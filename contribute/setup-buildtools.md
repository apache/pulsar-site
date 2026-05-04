---
id: setup-buildtools
title: Setting up JDKs and Maven using SDKMAN
---

## Setting up JDKs and Maven using SDKMAN

### Install SDKMAN

See https://sdkman.io/install for detailed instructions.

### Install JDK versions 21 and 17

In Pulsar development, we use [Amazon Corretto OpenJDK](https://docs.aws.amazon.com/corretto/) to build Pulsar.

- JDK 21 for Pulsar version >= 3.3
  - code will be compiled for Java 17 with Java 21
  - Pulsar docker images are running Java 21 since 3.3.0
- JDK 17 for Pulsar version >= 2.11
- JDK 8 or 11 for Pulsar version < 2.11

#### Installing Amazon Corretto OpenJDK versions 21 and 17 using SDKMAN.

```shell
# find out most recent Amazon Corretto release
sdk l java |grep amzn
# install
sdk i java 21.0.9-amzn
sdk i java 17.0.17-amzn
# switching between versions
sdk u java 17.0.17-amzn
sdk u java 21.0.9-amzn
# adding / updating aliases
cd ~/.sdkman/candidates/java
rm -f 17 && ln -s 17.0.17-amzn 17
rm -f 21 && ln -s 21.0.9-amzn 21
# switching between versions using aliases
sdk u java 17
sdk u java 21
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

### Install Maven

```shell
sdk i maven 3.9.9
```