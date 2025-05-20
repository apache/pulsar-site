---
id: release-process
title: Release process
---

This page contains instructions for Pulsar committers on how to perform a release.

The term feature/patch releases used throughout this document is defined as follows:

* Feature releases contain 2.10.0, 2.11.0, 3.0.0, and so on.
* Patch releases refer to bug-fix releases, such as 2.10.1, 2.10.2, and so on.
* Preview release refer to LTS release preview releases that happen in the releasing of a LTS version. 

## Preparation

Open a discussion on dev@pulsar.apache.org to notify others that you volunteer to be the release manager of a specific release. If there are no disagreements, you can start the release process.

For LTS and feature releases, you should create a new branch named `branch-X.Y` once all PRs with the X.Y.0 milestone are merged. If some PRs with the X.Y.0 milestone are still working in progress and might take much time to complete, you can move them to the next milestone if they are not important. In this case, you'd better notify the author in the PR.

For preview releases of a LTS release, a branch `branch-X.0-preview` is created. This branch will is used to hold the commit to change the version to the preview version. Preview releases will be tagged in this branch.

For patch releases, if there are no disagreements, you should cherry-pick all merged PRs labeled with `release/X.Y.Z` into `branch-X.Y`. After these PRs are cherry-picked, you should add the `cherry-picked/branch-X.Y` labels.

Sometimes some PRs cannot be cherry-picked cleanly, you might need to create a separate PR and move the `release/X.Y.Z` label from the original PR to it. In this case, you can ask the author to help create the new PR.

For PRs that are still open, you can choose to delay them to the next release or ping others to review so that they can be merged.


If you haven't already done it, [create and publish the GPG key](create-gpg-keys.md). You will use the key to sign the release artifacts.

Before you start the next release steps, make sure you have installed these software:

* Amazon Corretto OpenJDK
  * JDK 21 for Pulsar version >= 3.3
    * code will be compiled for Java 17 with Java 21
    * Pulsar docker images are running Java 21 since 3.3.0
  * JDK 17 for Pulsar version >= 2.11
  * JDK 11 for earlier versions
* Maven 3.9.9 (most recent stable Maven 3.9.x version)
  * Install using `sdkman i maven 3.9.9`
* Zip

Please refer to ["Setting up JDKs and Maven using SDKMAN"](setup-buildtools.md) for details on how to install JDKs and Maven using SDKMAN.

## Prepare the release branch

Before starting a release, besides handling the PRs, it's necessary to check that there aren't open critical security vulnerabilities in the dependencies. This can be checked from GitHub Security Alerts and the [OWASP Dependency Check workflow run logs](https://github.com/apache/pulsar/actions/workflows/ci-owasp-dependency-check.yaml).

In addition, it's useful to check whether there's [a new release of Netty available](https://netty.io/news/index.html) with important fixes.

To verify the release branch is not broken, you should trigger a Pulsar CI builds for the [pulsar-ci.yaml](https://github.com/apache/pulsar/actions/workflows/pulsar-ci.yaml) and [pulsar-ci-flaky.yaml](https://github.com/apache/pulsar/actions/workflows/pulsar-ci-flaky.yaml) workflows. The builds must pass before a release is performed.

## Set environment variables to be used across the commands {#env-vars}

```shell
export VERSION_RC=3.0.4-candidate-1
export VERSION_WITHOUT_RC=${VERSION_RC%-candidate-*}
export NEXT_VERSION_WITHOUT_RC=3.0.5
export VERSION_BRANCH=branch-3.0
export UPSTREAM_REMOTE=origin
export SDKMAN_JAVA_VERSION=17
```

Example for preview releases:

```shell
export VERSION_RC=4.0.0-preview.1
export VERSION_WITHOUT_RC=${VERSION_RC%-candidate-*}
export VERSION_BRANCH=branch-4.0-preview
export UPSTREAM_REMOTE=origin
export SDKMAN_JAVA_VERSION=21
```

Set your ASF user id

```shell
export APACHE_USER=<your ASF userid>
```

In addition, you will need to set `PULSAR_PATH` to point to the cleanly checked out working directory for the release branch.

If you run into problems with GPG signing set this

```shell
export GPG_TTY=$(tty)
```

For some commands, a template is copied to the clipboard using `pbcopy`.
This is already available on MacOS. For Linux, create a shell alias:

```shell
# Linux only
# install xsel if it is missing
sudo apt install xsel
# create alias pbcopy for copying stdin to clipboard
alias pbcopy="xsel --clipboard --input"
```

## Create a release candidate

### Create the release branch

We are going to create a release branch where the tag will be generated and where new fixes will be applied as part of the maintenance for the release.

The branch needs only to be created for feature releases, and not for patch releases like `3.3.2`. For patch releases, go to the next step.

For example, when working on `3.3.0` release, the branch `branch-3.3` will be created; but for `3.3.1`, the existing `branch-3.3` will be used.

It is recommended to create a fresh clone of the repository to avoid any local files interfering in the process:

```shell
git clone https://github.com/apache/pulsar
cd pulsar
export PULSAR_PATH=$(pwd)
git checkout -b $VERSION_BRANCH origin/master
```

Alternatively, you can use a git workspace to create a new, clean directory on your machine without needing to re-download the project.

```shell
git worktree add ../pulsar-release-$VERSION_BRANCH $VERSION_BRANCH
cd ../pulsar-release-$VERSION_BRANCH
export PULSAR_PATH=$(pwd)
```

if you get an error that the branch is already checked out, go to that directory detach it from the branch. After this the above command should succeed
```shell 
git checkout --detach HEAD
```

After the release, you can cleanup the worktree in the main repository directory
```shell
git worktree remove ../pulsar-release-$VERSION_BRANCH
```

If you created a new branch, update the [CI - OWASP Dependency Check](https://github.com/apache/pulsar/blob/master/.github/workflows/ci-owasp-dependency-check.yaml) workflow so that it will run on the new branch. Note that you should also remove the branches for previous Pulsar versions that are no longer [supported for security updates](https://pulsar.apache.org/contribute/release-policy/#supported-versions).

### Cherry-picking changes scheduled for the release

Please read the [separate guide about maintenance tasks and cherry-picking](maintenance-process.md).

### Create a GitHub label for the next release and move PRs labeled with the current release to the new label

In the previous cherry-picking step, all PRs labeled with the current release were cherry-picked to the release branch.

Now, we need to create a new label for the next release. From now on, PRs should be labeled with the new release label instead of the current release label.

```shell
gh label create "release/$NEXT_VERSION_WITHOUT_RC" --color "#1D76DB"
```

If there are any PRs that are still labeled with the current release label, you need to move them to the new release label. Please check the [cherry-picking guide](maintenance-process.md) to find out how to search for them.

### Update project version and tag

During the release process, you are going to initially create "candidate" tags, that after verification and approval will get promoted to the "real" final tag.

In this process, the maven version of the project will always be the final one.

```shell
# Bump to the release version
cd $PULSAR_PATH
./src/set-project-version.sh $VERSION_WITHOUT_RC

# Commit
git commit -m "Release $VERSION_WITHOUT_RC" -a
```

```shell
# Create a "candidate" tag
git tag -u $APACHE_USER@apache.org v$VERSION_RC -m "Release $VERSION_RC"

# Verify that you signed your tag before pushing it:
git tag -v v$VERSION_RC

# Push both the branch and the tag to Github repo
git push $UPSTREAM_REMOTE $VERSION_BRANCH
git push $UPSTREAM_REMOTE v$VERSION_RC
```

If there's a need to restart the release with more commits, you can delete the tag.

```shell
# only if you restart the release before it has been published for voting. Don't run this after that!
# delete local tag
git tag -d v$VERSION_RC
# delete tag in remote
git push $UPSTREAM_REMOTE :v$VERSION_RC
```

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

### Build release artifacts

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

### Check licenses

First, check that the `LICENSE` and `NOTICE` files cover all included jars for the bin package. You can use script to cross-validate `LICENSE` file with included jars:

```shell
cd $PULSAR_PATH
src/check-binary-license.sh distribution/server/target/apache-pulsar-*-bin.tar.gz
src/check-binary-license.sh distribution/shell/target/apache-pulsar-*-bin.tar.gz
```

In some older branches, the script is called `src/check-binary-license` instead of `src/check-binary-license.sh`.

### Create and publish the GPG key if you haven't already done this

If you haven't already done it, [create and publish the GPG key](create-gpg-keys.md). You will use the key to sign the release artifacts.

Before running the script below, make sure that the `<yourname>@apache.org` code signing key is the default gpg signing key.

One way to ensure this is to create/edit file `~/.gnupg/gpg.conf` and add a line:

```
default-key <key fingerprint>
```

... where `<key fingerprint>` should be replaced with the private key fingerprint for the `<yourname>@apache.org` key. The key fingerprint can be found in `gpg -K` output.

This can be automated with this command:

```shell
# KEY_ID is in short format, subset key id visible in gpg -K
KEY_ID=$(gpg --list-keys --with-colons $APACHE_USER@apache.org | egrep "^pub" | awk -F: '{print $5}')
echo "default-key $KEY_ID" >> ~/.gnupg/gpg.conf
```

### Sign and stage the artifacts to local SVN directory

The src and bin artifacts need to be signed and finally uploaded to the dist SVN repository for staging. This step should not run inside the $PULSAR_PATH.

```shell
# make sure to run svn mkdir commmand in a different dir(NOT IN $PULSAR_PATH).
mkdir ~/pulsar-svn-release-$VERSION_RC
cd ~/pulsar-svn-release-$VERSION_RC

# create an empty directory in the SVN server
svn mkdir --username $APACHE_USER -m "Add directory for pulsar $VERSION_RC release" https://dist.apache.org/repos/dist/dev/pulsar/pulsar-$VERSION_RC
# checkout the empty directory
svn co https://dist.apache.org/repos/dist/dev/pulsar/pulsar-$VERSION_RC

# cd into the directory
cd pulsar-$VERSION_RC

# stage the release artifacts
$PULSAR_PATH/src/stage-release.sh .

# Please check the size of the files in the `pulsar-3.X.Y-candidate-1`.
# If you build the artifacts without a clean workspace, the `apache-pulsar-3.X.Y-src.tar.gz` files
# may be too large to be unable to upload.
ls -ltra
du -ms *

# Verify the artifacts are correctly signed have correct checksums:
( for i in **/*.(tar.gz|zip|nar); do echo $i; gpg --verify $i.asc $i || exit 1 ; done )
( for i in **/*.(tar.gz|zip|nar); do echo $i; shasum -a 512 -c $i.sha512 || exit 1 ; done )

# don't commit and upload yet, there's a separate step for handling that
```

### Validate the release files

Then use instructions in [verifying release candidates](validate-release-candidate.md) page to do some sanity checks on the produced binary distributions.

 Make sure to run Apache RAT to verify the license headers in the src package:

```shell
cd /tmp
tar -xvzf ~/pulsar-svn-release-${VERSION_RC}/pulsar-$VERSION_RC/apache-pulsar-*-src.tar.gz
cd apache-pulsar-$VERSION_WITHOUT_RC-src
command mvn apache-rat:check
```

### Commit and upload the staged files in the local SVN directory to ASF SVN server

```shell
cd  ~/pulsar-svn-release-$VERSION_RC/pulsar-$VERSION_RC
svn add *
svn ci -m "Staging artifacts and signature for Pulsar release $VERSION_RC"
```

### Stage Maven modules

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

# src/settings.xml from master branch to /tmp/mvn-apache-settings.xml since it's missing in some branches
curl -s -o /tmp/mvn-apache-settings.xml https://raw.githubusercontent.com/apache/pulsar/master/src/settings.xml

# publish artifacts
command mvn deploy -DskipTests -Papache-release --settings /tmp/mvn-apache-settings.xml
# publish org.apache.pulsar.tests:integration and it's parent pom org.apache.pulsar.tests:tests-parent
command mvn deploy -DskipTests -Papache-release --settings /tmp/mvn-apache-settings.xml -f tests/pom.xml -pl org.apache.pulsar.tests:tests-parent,org.apache.pulsar.tests:integration
```

:::note

The `GPG_TTY` environment variable must be set for all the following steps. Otherwise, some operations might fail by "gpg failed to sign the data".

:::

This will ask for the GPG key passphrase and then upload it to the staging repository.

Log in to the ASF Nexus repository at https://repository.apache.org

Click on "Staging Repositories" on the left sidebar and then select the current Pulsar staging repo. This should be called something like `orgapachepulsar-XYZ`.

Add a version string such as "Apache Pulsar 3.0.4-candidate-1" to the clipboard with this command:

```shell
printf "Apache Pulsar $VERSION_RC" |pbcopy
```

Use the "Close" button to close the repository.

Enter the version string in the description field before clicking "Confirm".

This operation will take few minutes. Once complete click "Refresh" and now a link to the staging repository should be available, something like https://repository.apache.org/content/repositories/orgapachepulsar-XYZ

### Stage Docker images

After that, the following images will be built and pushed to your own DockerHub account:

* pulsar
* pulsar-all

#### Release before Pulsar 3.0

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
    -Ddocker.noCache=true
```

## Call for the vote to release a version based on the release candidate

Start a voting thread on the dev mailing list. 

Here is a way to render the template for the voting email.

Set these shell variables

```shell
DOCKER_USER=<your-dockerhub-username>
STAGING_REPO="<enter staging repo from https://repository.apache.org/#stagingRepositories>"
MY_NAME="Firstname Lastname"
PREVIOUS_VERSION_WITHOUT_RC="3.0.3"
```

```shell
echo "Go to https://hub.docker.com/r/$DOCKER_USER/pulsar/tags to find the layer URL for the pulsar image"
echo "Go to https://hub.docker.com/r/$DOCKER_USER/pulsar-all/tags to find the layer URL for the pulsar image"
```

Set these additional shell variable after looking up the URLs

```shell
PULSAR_IMAGE_URL="<looked up in previous step>"
PULSAR_ALL_IMAGE_URL="<looked up in previous step>"
```

Set also these

```shell
PULSAR_IMAGE_NAME="$DOCKER_USER/pulsar:$VERSION_WITHOUT_RC-$(git rev-parse --short=7 v$VERSION_RC^{commit})"
PULSAR_ALL_IMAGE_NAME="$DOCKER_USER/pulsar-all:$VERSION_WITHOUT_RC-$(git rev-parse --short=7 v$VERSION_RC^{commit})"
```

```shell
# check that Pulsar standalone starts (use CTRL-C to terminate) for both architectures
docker run --platform linux/arm64 --rm $PULSAR_IMAGE_NAME /pulsar/bin/pulsar standalone
docker run --platform linux/amd64 --rm $PULSAR_IMAGE_NAME /pulsar/bin/pulsar standalone
docker run --platform linux/arm64 --rm $PULSAR_ALL_IMAGE_NAME /pulsar/bin/pulsar standalone
docker run --platform linux/amd64 --rm $PULSAR_ALL_IMAGE_NAME /pulsar/bin/pulsar standalone
```

Now you can render the template to the clipboard

```shell
VOTE_DURATION=72
tee >(pbcopy) <<EOF
To: dev@pulsar.apache.org
Subject: [VOTE] Release Apache Pulsar $VERSION_WITHOUT_RC based on $VERSION_RC

Hello Apache Pulsar Community,

This is a call for the vote to release the Apache Pulsar version $VERSION_WITHOUT_RC based on $VERSION_RC.

Included changes since the previous release:
https://github.com/apache/pulsar/compare/v$PREVIOUS_VERSION_WITHOUT_RC...v$VERSION_RC

*** Please download, test and vote on this release. This vote will stay open
for at least $VOTE_DURATION hours ***

Only votes from PMC members are binding, but members of the community are
encouraged to test the release and vote with "(non-binding)".

Note that we are voting upon the source (tag), binaries are provided for
convenience.

The release candidate is available at:
https://dist.apache.org/repos/dist/dev/pulsar/pulsar-$VERSION_RC/

SHA-512 checksums:
$(cat $HOME/pulsar-svn-release-$VERSION_RC/pulsar-$VERSION_RC/apache-pulsar-$VERSION_WITHOUT_RC-src.tar.gz.sha512 | sed 's|\./||g')
$(cat $HOME/pulsar-svn-release-$VERSION_RC/pulsar-$VERSION_RC/apache-pulsar-$VERSION_WITHOUT_RC-bin.tar.gz.sha512 | sed 's|\./||g')

Maven staging repo:
$STAGING_REPO

The tag to be voted upon:
v$VERSION_RC (commit $(git rev-parse v$VERSION_RC^{commit}))
https://github.com/apache/pulsar/releases/tag/v$VERSION_RC

Pulsar's KEYS file containing PGP keys you use to sign the release:
https://downloads.apache.org/pulsar/KEYS

Docker images:
docker pull $PULSAR_IMAGE_NAME
$PULSAR_IMAGE_URL
docker pull $PULSAR_ALL_IMAGE_NAME
$PULSAR_ALL_IMAGE_URL

Please download the source package, and follow the README to build
and run the Pulsar standalone service.

More advanced release validation instructions can be found at
https://pulsar.apache.org/contribute/validate-release-candidate/

Thanks,

$MY_NAME
EOF
```

The vote should be open for at least 72 hours (3 days). Votes from Pulsar PMC members will be considered binding, while anyone else is encouraged to verify the release and vote as well.

If the release is approved here with 3 +1 binding votes, you can then proceed to the next step. Otherwise, you should repeat the previous steps and prepare another release candidate to vote.

## LTS Preview release steps (this only applies to preview releases such as 4.0.0-preview.1)

For preview releases there is no release voting. The preview release is directly announced on Pulsar user and dev mailing lists to get release feedback before the official LTS release.

A preview release is not an official Apache release and it's comparable to a nightly build of a project.
The preview release artifacts will be made available on Maven central and Docker Hub so that users can practically use the artifacts in their existing build pipelines and provide feedback to the project. Binaries are complementary in Apache projects and don't state an official ASF release.

Before continuing, perform a local [release validation](validate-release-candidate.md) for the artifacts.
After this, follow the steps "Release Maven modules" and "Release Docker images" to publish the preview release in Maven central and DockerHub. The preview release isn't an official release and therefore the sources should NOT be released on SVN.

Set the environment variables:

```shell
PULSAR_IMAGE_NAME=apachepulsar/pulsar:$VERSION_WITHOUT_RC
PULSAR_ALL_IMAGE_NAME=apachepulsar/pulsar-all:$VERSION_WITHOUT_RC
LTS_RELEASE=4.0
```

To announce a LTS preview release, you can use this template:

```shell
tee >(pbcopy) <<EOF
To: dev@pulsar.apache.org, users@pulsar.apache.org
Subject: Apache Pulsar $VERSION_WITHOUT_RC available for testing - Feedback requested

Dear Apache Pulsar Community,

We're excited to announce the availability of Apache Pulsar $VERSION_WITHOUT_RC, a preview release aimed at gathering user feedback for the upcoming Pulsar $LTS_RELEASE LTS release. This preview is not an official Apache release but provides an early look at the new features and changes.

Preview artifacts are now available on Maven Central and Docker Hub, enabling users to integrate and test them in their build pipelines and environments. You can find downloadable artifacts at https://dist.apache.org/repos/dist/dev/pulsar/pulsar-$VERSION_RC/.

Repository tag: v$VERSION_RC (commit $(git rev-parse v$VERSION_RC^{commit}))
https://github.com/apache/pulsar/releases/tag/v$VERSION_RC

Changes since $PREVIOUS_VERSION_WITHOUT_RC:
https://github.com/apache/pulsar/compare/v$PREVIOUS_VERSION_WITHOUT_RC...v$VERSION_RC

Docker images: $PULSAR_IMAGE_NAME and $PULSAR_ALL_IMAGE_NAME.
Docker image tag is "$VERSION_WITHOUT_RC".

For Java client testing, we recommend using the Pulsar BOM in Maven or Gradle builds with version "$VERSION_WITHOUT_RC".
Pulsar BOM usage is explained at https://pulsar.apache.org/docs/next/client-libraries-java-setup/#pulsar-bom.

We urge you to test this preview in your environments and provide feedback. Please report any issues on our GitHub issue tracker at https://github.com/apache/pulsar/issues, checking for existing reports first.
Known blockers are tracked with the "release/blocker" label at https://github.com/apache/pulsar/labels/release%2Fblocker.

Pulsar $LTS_RELEASE timeline:
$(date -I): $LTS_RELEASE preview 1
$(date --date="10 days" -I): Target for $LTS_RELEASE preview 2
$(date --date="10 days" -I): Code freeze for $LTS_RELEASE by branching branch-$LTS_RELEASE from the master branch
$(date --date="13 days" -I): Target for $LTS_RELEASE release candidate 1
$(date --date="18 days" -I): Reserved for $LTS_RELEASE release candidate 2 if needed
$(date --date="20 days" -I): Planned $LTS_RELEASE.0 announcement (if release candidate 1 passes)

Your participation is crucial in shaping the quality of Pulsar $LTS_RELEASE. We appreciate your support and feedback.

Best regards,

$MY_NAME
EOF
```

## Summarize the voting for the release

Once the vote has been passed, you will need to send a result vote to [dev@pulsar.apache.org](mailto:dev@pulsar.apache.org) on the voting thread.

Message:

```shell
tee >(pbcopy) <<EOF
Hello all,

The vote to release Apache Pulsar version ${VERSION_WITHOUT_RC} based on ${VERSION_RC} is now closed.

The vote PASSED with X binding "+1", Y non-binding "+1" and 0 "-1" votes:

"+1" Binding votes:

  - <name>

"+1" Non-Binding votes:

  - <name>

I'll continue with the release process and the release announcement will follow shortly.

Thanks,
<your name>
EOF
```


## Promote the release

For commands below, you need to set the environment variables `VERSION_RC`, `VERSION_WITHOUT_RC`, `UPSTREAM_REMOTE` and `APACHE_USER`.
Please check the [environment variables step](#env-vars) for doing that.

### Publish the final tag

Create and push the final Git tag:

```shell
git tag -u $APACHE_USER@apache.org v$VERSION_WITHOUT_RC $(git rev-parse v$VERSION_RC^{}) -m "Release v$VERSION_WITHOUT_RC"
git push $UPSTREAM_REMOTE v$VERSION_WITHOUT_RC
```

### Create release notes in GitHub

Then, you can [create a GitHub release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release) based on the tag.

```shell
# open this URL and create release notes by clicking "Create release from tag"
echo https://github.com/apache/pulsar/releases/tag/v${VERSION_WITHOUT_RC}

# cherry-picked changes template
echo "[""Cherry-picked changes](https://github.com/apache/pulsar/pulls?q=is%3Apr+is%3Amerged+label%3Arelease%2F${VERSION_WITHOUT_RC}+label%3Acherry-picked%2F${VERSION_BRANCH}+sort%3Acreated-asc)"|pbcopy
```

1. Open the above URL in a browser and create release notes by clicking "Create release from tag".
2. Find "Previous tag: auto" in the UI above the text box and choose the previous release there.
3. Click "Generate release notes".
4. Review the generated release notes.
5. Since changes are cherry-picked, you will have to include a link such as [Cherry-picked changes](https://github.com/apache/pulsar/pulls?q=is%3Apr+is%3Amerged+label%3Arelease%2F2.11.4+label%3Acherry-picked%2Fbranch-2.11+sort%3Acreated-asc). There's a [separate guide for generating automated release notes](release-note-guide.md).
6. Unselect "Set as the latest release" (that should be only selected for the actual latest release of Pulsar)
7. Click "Publish release".

The [Writing release notes](release-note-guide.md) guide should be followed to generate a proper release notes. That is covered in the "Update the document" section.

### Release the artifacts on SVN

Promote the artifacts on the release SVN repo https://dist.apache.org/repos/dist/release. Note that this repo is limited to PMC members, You may need a PMC member's help if you are not one:

```shell
svn move -m "Release Apache Pulsar $VERSION_WITHOUT_RC" \
  https://dist.apache.org/repos/dist/dev/pulsar/pulsar-$VERSION_RC \
  https://dist.apache.org/repos/dist/release/pulsar/pulsar-$VERSION_WITHOUT_RC
```

### Release Maven modules

Promote the Maven staging repository for release. Login to https://repository.apache.org and select the staging repository associated with the RC candidate that was approved.
Double check the staging repository name from the release vote email.
Select the repository and click on "Release". Artifacts will now be made available on Maven central.

### Release Docker images

This step is performed by a Apache Pulsar PMC member. Please request help from a PMC member for completing this step.

`regctl` from [regclient](https://github.com/regclient/regclient) is needed for copying multi-arch images. Install with `brew install regclient` or with [other installation options](https://github.com/regclient/regclient/blob/main/docs/install.md) of regclient. The benefit of `regctl` over using `docker pull/tag/push` is that it will handle copying both `amd64` and the `arm64` image.

```shell
RELEASE_MANAGER_DOCKER_USER=otheruser
```

```shell
CANDIDATE_TAG=${VERSION_WITHOUT_RC}-$(git rev-parse --short=7 v$VERSION_RC^{})
regctl image copy ${RELEASE_MANAGER_DOCKER_USER}/pulsar:${CANDIDATE_TAG} apachepulsar/pulsar:$VERSION_WITHOUT_RC
regctl image copy ${RELEASE_MANAGER_DOCKER_USER}/pulsar-all:${CANDIDATE_TAG} apachepulsar/pulsar-all:$VERSION_WITHOUT_RC
```

Go to check the result:

* https://hub.docker.com/r/apachepulsar/pulsar/tags
* https://hub.docker.com/r/apachepulsar/pulsar-all/tags

Ensure that newer than 3.x images support both amd64 and arm64. Older 2.x images should be amd64 only.

:::caution

This step is for the latest release only.

:::

```shell
regctl image copy apachepulsar/pulsar:$VERSION_WITHOUT_RC apachepulsar/pulsar:latest
regctl image copy apachepulsar/pulsar-all:$VERSION_WITHOUT_RC apachepulsar/pulsar-all:latest
```

### Release Helm Chart

:::caution

This step is for the latest *LTS* release only

:::

1. Bump the image version in the Helm Chart: [charts/pulsar/values.yaml](https://github.com/apache/pulsar-helm-chart/blob/master/charts/pulsar/values.yaml)
2. Bump the chart version and `appVersion` in the Helm Chart to the released version: [charts/pulsar/Chart.yaml](https://github.com/apache/pulsar-helm-chart/blob/master/charts/pulsar/Chart.yaml)
3. Send a pull request for reviews and get it merged.
4. Once it is merged, the chart will be automatically released to GitHub releases at https://github.com/apache/pulsar-helm-chart and updated to https://pulsar.apache.org/charts/index.yaml.

### Release Homebrew libpulsar package

For 2.8, 2.9 and 2.10 releases, you should release the libpulsar package on Homebrew.

:::caution

The C++ client is now developing in a [separated repo](https://github.com/apache/pulsar-client-cpp). You should check its own release guide if you're releasing version >= 3.0.0.

:::

Release a new version of libpulsar for Homebrew, You can follow the example [here](https://github.com/Homebrew/homebrew-core/pull/53514).

### Release Python client

For 2.8, 2.9 and 2.10 releases, you should release the Python client.

:::note

1. You need to create an account on PyPI: https://pypi.org/account/register/
2. Ask anyone that has been a release manager before to add you as a maintainer for pulsar-docker on PyPI
3. Once you have completed the following steps in this section, you can check if the wheels are uploaded successfully in [Download files](https://pypi.org/project/pulsar-client/#files). Remember to switch to the correct version in [Release history](https://pypi.org/project/pulsar-client/#history).

:::

:::caution

Make sure you run following command at the release tag!

:::

:::caution

The Python client is now developing in a [separated repo](https://github.com/apache/pulsar-client-python). You should check its own release guide if you're releasing version >= 3.0.0.

:::

#### Linux

There is a script that builds and packages the Python client inside Docker images:

```shell
pulsar-client-cpp/docker/build-wheels.sh
```

The wheel files will be left under `pulsar-client-cpp/python/wheelhouse`. Make sure all the files have `manylinux` in the filenames. Otherwise, those files will not be able to upload to PyPI.

Run the following command to push the built wheel files:

```shell
cd pulsar-client-cpp/python/wheelhouse
pip install twine
twine upload pulsar_client-*.whl
```

#### macOS

There is a script that builds and packages the Python client inside Docker images:

```shell
pulsar-client-cpp/python/build-mac-wheels.sh
```

The wheel files will be generated at each platform directory under `pulsar-client-cpp/python/pkg/osx/`. Then you can run `twin upload` to upload those wheel files.

## Update the document

### Release notes

This step is for every release. Read the specific guide for [writing release notes](release-note-guide.md).

### Swagger files

This step is for every release.

First, build swagger files from apache/pulsar repo at the released tag:

```shell
# ensure the correct JDK version is used for building
sdk u java $SDKMAN_JAVA_VERSION
git checkout v$VERSION_WITHOUT_RC
command mvn -ntp install -Pcore-modules,swagger,-main -DskipTests -DskipSourceReleaseAssembly=true -Dspotbugs.skip=true -Dlicense.skip=true
PULSAR_PATH=$(pwd)
```

Now, run the following script from the main branch of apache/pulsar-site repo:

```shell
cd tools/pytools
poetry install
poetry run bin/rest-apidoc-generator.py --master-path=$PULSAR_PATH --version=$VERSION_WITHOUT_RC
```

```shell
# commit files
# move to pulsar-site root
cd ../..
git add -u
git add static/swagger/$VERSION_WITHOUT_RC
git commit -m "update rest-apidoc for $VERSION_WITHOUT_RC"
```

Read more on the manual of [pytools](https://github.com/apache/pulsar-site/tree/main/tools/pytools/README.md).

### Javadoc

:::caution

This step is for feature releases only, unless you're sure that significant Javadoc fixes are made against the patch release.

:::

After publish Java libraries, run the following script from the main branch of apache/pulsar-site repo:

```shell
cd tools/pytools
poetry install
poetry run bin/java-apidoc-generator.py $PULSAR_PATH
```

Once the docs are generated, you can add them and submit them in a PR. The expected doc output is:

* `static/api/admin`
* `static/api/client`
* `static/api/pulsar-functions`

```shell
cd ../..
git add static/api/*
git commit -m "update java-apidoc for $VERSION_WITHOUT_RC"
```

Read more on the manual of [pytools](https://github.com/apache/pulsar-site/tree/main/tools/pytools/README.md).

### Reference

:::caution

This step is for feature releases only, unless you're sure that significant reference fixes are made against the patch release.

:::

You can generate references of config and command-line tool by running the following script from the main branch of apache/pulsar-site repo:

```shell
# build Pulsar distributions under /path/to/pulsar-3.X.Y
cd tools/pytools
poetry install
# ensure that defaults using Runtime.getRuntime().availableProcessors() will be based on 1 as the number of CPUs
_JAVA_OPTIONS=-XX:ActiveProcessorCount=1 poetry run bin/reference-doc-generator.py --master-path=$PULSAR_PATH --version=$VERSION_WITHOUT_RC
```

```shell
cd ../..
git add static/reference/*
git commit -m "update reference for $VERSION_WITHOUT_RC"
```

Once the docs are generated, you can add them and submit them in a PR. The expected doc output is `static/reference/2.X.x`

Read more on the manual of [pytools](https://github.com/apache/pulsar-site/tree/main/tools/pytools/README.md).

## Update `/docs` redirect

https://pulsar.apache.org/docs should redirect to the latest feature release documentation.

If you're working on a patch release for an older feature version of Pulsar, you can skip this step.

Otherwise, you should update the version in this file: `static/.htaccess`

## Update `/docs` version list dropdown

The dropdown should have the following items:

* Next
* Active versions [still in support](/contribute/release-policy/#supported-versions)
* Others

LTS versions should be labeled this way: `<version> LTS`.

<img alt="docs version dropdown" src="/img/version-dropdown.png" width="320px" />

If you're working on a patch release for an older feature version of Pulsar, you can skip this step.

Otherwise, you should update the dropdown version list in this file: `src/theme/DocsVersionDropdownNavbarItem.js`

## Announce the release

Once the release artifacts are available in the Apache Mirrors and the website is updated, you need to announce the release. You should email to dev@pulsar.apache.org, users@pulsar.apache.org, and announce@apache.org. Here is a sample content:

```shell
tee >(pbcopy) <<EOF
To: dev@pulsar.apache.org, users@pulsar.apache.org, announce@apache.org
Subject: [ANNOUNCE] Apache Pulsar $VERSION_WITHOUT_RC released

The Apache Pulsar team is proud to announce Apache Pulsar version $VERSION_WITHOUT_RC.

Pulsar is a highly scalable, low latency messaging platform running on
commodity hardware. It provides simple pub-sub semantics over topics,
guaranteed at-least-once delivery of messages, automatic cursor management for
subscribers, and cross-datacenter replication.

For Pulsar release details and downloads, visit:

https://pulsar.apache.org/download

Release Notes are at:
https://pulsar.apache.org/release-notes/versioned/pulsar-$VERSION_WITHOUT_RC/

We would like to thank the contributors that made the release possible.

Regards,

The Pulsar Team
EOF
```

Send the email in plain text mode since the announce@apache.org mailing list will reject messages with text/html content.

In Gmail, there's an option to set "Plain text mode" in the "⋮" menu.

## Write a blog post (optional)

It is encouraged to write a blog post to summarize the features introduced in this release, especially for feature releases.

You can follow the example [here](https://github.com/apache/pulsar/pull/2308). Be aware that the source of blog is moved to [here](https://github.com/apache/pulsar-site/tree/main/blog).

## Remove old releases

Remove the old releases (if any). You only need the latest release there, and older releases are available through the Apache archive:

```shell
# Get the list of releases
svn ls https://dist.apache.org/repos/dist/release/pulsar

# Delete each release (except for the last one)
svn rm https://dist.apache.org/repos/dist/release/pulsar/pulsar-3.X.X
```

## Move to next version in pom.xml

### Feature releases (master branch)

You need to move the master version to the next iteration `Y` (`X + 1`).

```shell
git checkout master
./src/set-project-version.sh 3.Y.0-SNAPSHOT
git commit -a -s -m "[cleanup][build] Bumped version to 3.Y.0-SNAPSHOT'
```

Since this needs to be merged into `master`, you need to follow the regular process and create a Pull Request on GitHub.

For feature releases, since a new branch is created for the release, the new branch needs to be protected against force pushes to prevent corrupting the commit history. This is done by adding a rule to the branch protection settings for the new branch in `.asf.yaml`.

```yaml
export RELEASE_BRANCH="branch-X.Y"
# use yq to add the new branch to the .asf.yaml file
yq -i '.github.protected_branches[strenv(RELEASE_BRANCH)]={}' .asf.yaml
# commit the change to .asf.yaml
git add .asf.yaml
git commit -m "[improve][ci] Protect $RELEASE_BRANCH from force pushes'
```

This will prevent force pushing to the release branch, which is important to maintain the integrity of the commit history.

### For maintenance branches

After the release process, you should bump the project version and append it with `-SNAPSHOT`.

```shell
./src/set-project-version.sh x.x.x-SNAPSHOT
git add -u
git commit -m "Bump version to next snapshot version"
```
