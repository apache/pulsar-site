---
id: release-process-maven
title: Maven build steps for releases
---

This page contains the **Maven build related steps** of the [release process](release-process.md) for Pulsar **maintenance branches** (`branch-4.2` and earlier), which continue to use the Maven build. The Pulsar `master` branch has migrated to Gradle ([PIP-463](https://github.com/apache/pulsar/blob/master/pip/pip-463.md)), and releases cut from `master` follow the Gradle-based steps in the main document.

Only the build related steps differ between the Maven and Gradle based processes. All other steps — preparation, creating the release branch and tags, signing and staging to SVN, voting, promoting the release, updating the documentation, and announcing the release — are shared and described in the [release process](release-process.md) document. Follow the main document, and when releasing from a Maven-based maintenance branch, substitute the build related steps with the corresponding sections below.

## Prerequisites

In addition to the prerequisites in the [release process](release-process.md), make sure you have installed this software:

* Amazon Corretto OpenJDK
  * JDK 21 for Pulsar version >= 3.3
    * code will be compiled for Java 17 with Java 21
    * Pulsar docker images are running Java 21 since 3.3.0
  * JDK 17 for Pulsar version >= 2.11
  * JDK 11 for earlier versions
* Maven 3.9.12 (most recent stable Maven 3.9.x version)
  * Install using `sdk i maven 3.9.12`

Please refer to ["Setting up JDKs using SDKMAN"](setup-buildtools.md) for details on how to install JDKs and Maven using SDKMAN.

Follow the [environment variables set in the release process](release-process.md#env-vars) for required environment variables and initial steps that are shared for &lt;5.x and &ge;5.x releases.

## Specify MAVEN_OPTS

Set `MAVEN_OPTS` to avoid issues in the build process.

```shell
export MAVEN_OPTS="-Xss1500k -Xmx3072m -XX:+UnlockDiagnosticVMOptions -XX:GCLockerRetryAllocationCount=100"
```

## Cleaning up locally compiled BookKeeper artifacts

It is necessary to make sure that BookKeeper artifacts are fetched from the Maven repository instead of using locally compiled BookKeeper artifacts ([reference](https://lists.apache.org/thread/gsbh95b2d9xtcg5fmtxpm9k9q6w68gd2)).

Cleaning up the local Maven repository Bookkeeper artifacts for the version used by Pulsar:

```shell
cd $PULSAR_PATH
sdk u java $SDKMAN_JAVA_VERSION
BOOKKEEPER_VERSION=$(command mvn initialize help:evaluate -Dexpression=bookkeeper.version -pl . -q -DforceStdout)
echo "BookKeeper version is $BOOKKEEPER_VERSION"
[ -n "$BOOKKEEPER_VERSION" ] && ls -G -d ~/.m2/repository/org/apache/bookkeeper/**/"${BOOKKEEPER_VERSION}" 2> /dev/null | xargs -r rm -rf
```

## Build release artifacts

Run the following command to build the artifacts:

```shell
cd $PULSAR_PATH
# ensure the correct JDK version is used for building
sdk u java $SDKMAN_JAVA_VERSION
# build the binaries
command mvn clean install -DskipTests
```

After the build, you should find the following tarballs, zip files, and the connectors directory with all the Pulsar IO nar files:

* `distribution/server/target/apache-pulsar-3.X.Y-bin.tar.gz`
* `distribution/offloaders/target/apache-pulsar-offloaders-3.X.Y-bin.tar.gz`
* `distribution/shell/target/apache-pulsar-shell-3.X.Y-bin.tar.gz`
* `distribution/shell/target/apache-pulsar-shell-3.X.Y-bin.zip`
* directory `distribution/io/target/apache-pulsar-io-connectors-3.X.Y-bin`

## Check licenses

First, check that the `LICENSE` and `NOTICE` files cover all included jars for the bin package. You can use script to cross-validate `LICENSE` file with included jars:

```shell
cd $PULSAR_PATH
src/check-binary-license.sh distribution/server/target/apache-pulsar-*-bin.tar.gz
src/check-binary-license.sh distribution/shell/target/apache-pulsar-*-bin.tar.gz
```

In some older branches, the script is called `src/check-binary-license` instead of `src/check-binary-license.sh`.

## Sign, stage, validate and upload files

First [sign and stage the artifacts](release-process.md#sign-and-stage-the-artifacts-to-local-svn-directory).

When [validating the release files](release-process.md#validate-the-release-files), run Apache RAT with Maven to verify the license headers in the src package:

```shell
cd /tmp
tar -xvzf ~/pulsar-svn-release-${VERSION_RC}/pulsar-$VERSION_RC/apache-pulsar-*-src.tar.gz
cd apache-pulsar-$VERSION_WITHOUT_RC-src
command mvn apache-rat:check
```

After validation, [upload the files to svn server](release-process.md#commit-and-upload-the-staged-files-in-the-local-svn-directory-to-asf-svn-server).

## Stage Maven modules

:::caution
Make sure to run only one release at a time when working on multiple releases in parallel. Running multiple builds simultaneously will result in all releases being placed into a single staging repository. Close [the staging repository](https://repository.apache.org/#stagingRepositories) before performing another release.
:::

Set your ASF password in the following line. Add a space as the first character on the command line so that your password doesn't get recorded in shell history.

```shell
 export APACHE_PASSWORD=""
```

Upload the artifacts to [ASF Nexus](https://repository.apache.org)

```shell
cd $PULSAR_PATH
# ensure the correct JDK version is used for building
sdk u java $SDKMAN_JAVA_VERSION
# Confirm if there are no other new dirs or files in the $PULSAR_PATH because all files in $PULSAR_PATH will be compressed and uploaded to ASF Nexus.
git status

# src/settings.xml from branch-4.2 to /tmp/mvn-apache-settings.xml since it's missing in some branches
curl -s -o /tmp/mvn-apache-settings.xml https://raw.githubusercontent.com/apache/pulsar/branch-4.2/src/settings.xml

# publish artifacts
# and publish org.apache.pulsar.tests:integration and it's parent pom org.apache.pulsar.tests:tests-parent
command mvn deploy -Daether.connector.basic.parallelPut=false -DskipTests -Papache-release --settings /tmp/mvn-apache-settings.xml && command mvn deploy -Daether.connector.basic.parallelPut=false -DskipTests -Papache-release --settings /tmp/mvn-apache-settings.xml -f tests/pom.xml -pl org.apache.pulsar.tests:tests-parent,org.apache.pulsar.tests:integration || echo 'ERROR: Publishing Failed!'
```

:::note

The `GPG_TTY` environment variable must be set for all the following steps. Otherwise, some operations might fail by "gpg failed to sign the data".

:::

This will ask for the GPG key passphrase and then upload it to the staging repository.

After the upload, continue with closing the staging repository as described in the [release process](release-process.md#stage-artifacts-in-the-asf-nexus-repository).

## Stage Docker images

After that, the following images will be built and pushed to your own DockerHub account:

* pulsar
* pulsar-all

### Release before Pulsar 3.0

This is supported only on Intel platforms. On Mac Apple Silicon, you can run Linux amd64 in a virtual machine or a physical machine outside the Apple laptop and use `export DOCKER_HOST=tcp://x.x.x.x:port` to use use the remote docker engine for building the docker image. Don't forward the TCP/IP connection over an unencrypted channel.
You can start a socket proxy with `socat TCP-LISTEN:2375,bind=0.0.0.0,reuseaddr,fork UNIX-CLIENT:/var/run/docker.sock` inside the Linux Intel machine.
For running the Linux Intel VM on Mac Apple Silicon, you could use `limactl create --name=linux_amd64 --rosetta --arch x86_64` to create a VM using https://lima-vm.io/.
However, it is simpler to do the release on a Linux arm64 / x86_64 VM directly.

Run the following commands on a Linux machine (or with Mac where DOCKER_HOST points to a Linux amd64/Intel machine):

```shell
cd $PULSAR_PATH/docker
# ensure the correct JDK version is used for building
sdk u java $SDKMAN_JAVA_VERSION
./build.sh
DOCKER_USER=<your-username> DOCKER_PASSWORD=<your-password> DOCKER_ORG=<your-organization> ./publish.sh
```

### Release Pulsar 3.0 and later

Before building docker images, clean up build history so that you don't run out of diskspace in the middle of the build.
Docker buildx in Docker Desktop limits the build history size to 20GB by default.

```shell
# check total docker disk usage
docker system df
# check total size of build cache
docker buildx du
# cleanup disk space
# this is mandatory, if usage shown in previous step is over 10GB
docker buildx prune
```

For creating and publishing the docker images, run the following commands:

```shell
# set your dockerhub username
DOCKER_USER=<your-dockerhub-username>
```

```shell
# login to dockerhub
docker login -u $DOCKER_USER
```

```shell
# ensure that you have the most recent base image locally
docker pull ubuntu:22.04 # for 3.0.x
docker pull alpine:3.21 # for 3.3.x+

cd $PULSAR_PATH
# ensure the correct JDK version is used for building
sdk u java $SDKMAN_JAVA_VERSION

command mvn install -pl docker/pulsar,docker/pulsar-all \
    -DskipTests \
    -Pmain,docker,docker-push \
    -Ddocker.platforms=linux/amd64,linux/arm64 \
    -Ddocker.organization=$DOCKER_USER \
    -Ddocker.noCache=true \
    -Ddocker.skip.tag=false
```

## Build swagger files

When [updating the documentation](release-process.md#swagger-files) for a release from a Maven-based maintenance branch, build the swagger files from the apache/pulsar repo at the released tag with:

```shell
# ensure the correct JDK version is used for building
sdk u java $SDKMAN_JAVA_VERSION
git checkout v$VERSION_WITHOUT_RC
command mvn -ntp install -Pcore-modules,swagger,-main -DskipTests -DskipSourceReleaseAssembly=true -Dspotbugs.skip=true -Dlicense.skip=true
PULSAR_PATH=$(pwd)
```

Then continue with the rest-apidoc generation steps in the [release process](release-process.md#swagger-files).
