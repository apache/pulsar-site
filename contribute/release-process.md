---
id: release-process
title: Release process
---

This page contains instructions for Pulsar committers on how to perform a release.

The term feature/patch releases used throughout this document is defined as follows:

* Feature releases contain 4.1.0, 4.2.0, 5.0.0, and so on.
* Patch releases refer to bug-fix releases, such as 4.2.1, 4.2.2, and so on.
* Milestone releases, such as 5.0.0-M1, 5.0.0-M2, and so on, are made before an upcoming LTS release from a temporary release branch (such as `branch-5.0-M1`) that is cut from the master branch.

:::note

The Pulsar `master` branch has migrated from Maven to Gradle ([PIP-463](https://github.com/apache/pulsar/blob/master/pip/pip-463.md)). Releases cut from `master` — and from release branches created from it in the future — use the Gradle build steps in this document. Maintenance branches (`branch-4.2` and earlier) continue to use the Maven build: when releasing from those branches, substitute the build related steps with the ones in [Maven build steps for releases](release-process-maven.md). All other steps are shared between the two build systems.

:::

:::caution Draft

The Gradle build steps in this document are a draft. They will be refined and verified when the first release is performed with the Gradle build.

:::

## Preparation

Open a discussion on dev@pulsar.apache.org to notify others that you volunteer to be the release manager of a specific release. If there are no disagreements, you can start the release process.

For LTS and feature releases, you should create a new branch named `branch-X.Y` once all PRs with the X.Y.0 milestone are merged. If some PRs with the X.Y.0 milestone are still working in progress and might take much time to complete, you can move them to the next milestone if they are not important. In this case, you'd better notify the author in the PR.

For milestone releases of an upcoming LTS release, each milestone release uses its own release branch `branch-X.Y-MN` (for example `branch-5.0-M1`, `branch-5.0-M2`, …) cut from the master branch. The branch holds the commit that changes the version to the milestone version, and the milestone release is tagged in this branch. Using a release branch allows fixing possible release related issues in the branch without a PR going into the master branch directly. There shouldn't be a need to perform cherry-picking unless an important fix lands in the master branch after the milestone release branch has been cut.

The milestone release branches should be considered temporary: since milestone releases aren't maintained, the branch is dropped after the next milestone release or the final LTS release has been published.

For patch releases, if there are no disagreements, you should cherry-pick all merged PRs labeled with `release/X.Y.Z` into `branch-X.Y`. After these PRs are cherry-picked, you should add the `cherry-picked/branch-X.Y` labels.

Sometimes some PRs cannot be cherry-picked cleanly, you might need to create a separate PR and move the `release/X.Y.Z` label from the original PR to it. In this case, you can ask the author to help create the new PR.

For PRs that are still open, you can choose to delay them to the next release or ping others to review so that they can be merged.


If you haven't already done it, [create and publish the GPG key](create-gpg-keys.md). You will use the key to sign the release artifacts.

Before you start the next release steps, make sure you have installed these software:

* Amazon Corretto OpenJDK
  * JDK 21 or 25 for building releases with the Gradle build (`master` branch and release branches created from it)
  * for Maven-based maintenance branches, see the [Maven build steps prerequisites](release-process-maven.md#prerequisites)
* Zip

There is no separate build tool to install for the Gradle build: the repository includes the Gradle Wrapper (`./gradlew`). Please refer to ["Setting up JDKs using SDKMAN"](setup-buildtools.md) for details on how to install JDKs using SDKMAN.

## Prepare the release branch

Before starting a release, besides handling the PRs, it's necessary to check that there aren't open critical security vulnerabilities in the dependencies. This can be checked from GitHub Security Alerts and the [OWASP Dependency Check workflow run logs](https://github.com/apache/pulsar/actions/workflows/ci-owasp-dependency-check.yaml).

In addition, it's useful to check whether there's [a new release of Netty available](https://netty.io/news/index.html) with important fixes.

To verify the release branch is not broken, you should trigger a Pulsar CI builds for the [pulsar-ci.yaml](https://github.com/apache/pulsar/actions/workflows/pulsar-ci.yaml) and [pulsar-ci-flaky.yaml](https://github.com/apache/pulsar/actions/workflows/pulsar-ci-flaky.yaml) workflows. The builds must pass before a release is performed.

## Set environment variables to be used across the commands {#env-vars}

*For &ge;5.x releases*

```shell
export VERSION_RC=5.0.0-M1-candidate-1
export VERSION_WITHOUT_RC=${VERSION_RC%-candidate-*}
export NEXT_VERSION_WITHOUT_RC=5.0.0-M2
export VERSION_BRANCH=branch-5.0-M1
# for milestone releases, set the upcoming LTS release version (used in the release announcement)
export LTS_RELEASE=5.0
export UPSTREAM_REMOTE=origin
export SDKMAN_JAVA_VERSION=21
# set the pulsarIncludeBuildInfo project property for all Gradle invocations in this shell session
# so that release binaries include the real git commit / build metadata
export ORG_GRADLE_PROJECT_pulsarIncludeBuildInfo=true
# capture the build info (commit id, build time, …) into a snapshot file on the first Gradle
# invocation and reuse it from the file in all later invocations, so that the metadata stays
# identical across the separate build steps of the release
export ORG_GRADLE_PROJECT_pulsarBuildInfoFile=$HOME/pulsar-build-info-$VERSION_RC.properties
```

Release builds must include the real git commit / build metadata in the binaries, which is enabled with the `pulsarIncludeBuildInfo=true` project property (the default is `false` so that local development and CI builds don't regenerate the metadata on every change). Gradle picks up project properties from environment variables with the `ORG_GRADLE_PROJECT_` prefix, so the exports above set the properties for every Gradle invocation in the shell session.

The properties must be set consistently for every Gradle invocation of the release process — if the metadata changes between invocations, it invalidates the build outputs and the binaries get recompiled and change. The `pulsarBuildInfoFile` snapshot file guarantees this: if the file doesn't exist, the build captures the metadata and writes it to the file; if it exists, the build uses the metadata from the file. Keep the file outside the release working directory (the `$HOME` location above) so that it doesn't make the git working tree dirty or end up in the source tarball. If you restart the release candidate with new commits, delete the snapshot file so that the new commit id gets captured.

*For &lt;5.x releases*

```shell
export VERSION_RC=4.2.3-candidate-1
export VERSION_WITHOUT_RC=${VERSION_RC%-candidate-*}
export NEXT_VERSION_WITHOUT_RC=4.2.4
export VERSION_BRANCH=branch-4.2
export UPSTREAM_REMOTE=origin
export SDKMAN_JAVA_VERSION=21
```

```shell
# for 3.x releases, use Java 17 instead of Java 21
export SDKMAN_JAVA_VERSION=17
```

Set your ASF user id

```shell
export APACHE_USER=<your ASF userid>
```

Set the GPG key id of your release signing key. Using the key id instead of the `$APACHE_USER@apache.org` e-mail address selects the key unambiguously when several GPG keys match the same e-mail address.

```shell
export APACHE_USER_GPGID=$(gpg --list-secret-keys --with-colons $APACHE_USER@apache.org | awk -F: '/^sec/ && $2 !~ /[eird]/ {print $5}')
echo "APACHE_USER_GPGID=$APACHE_USER_GPGID"
```

The command skips expired, revoked, invalid and disabled keys. If there are multiple valid secret keys for the e-mail address, the command above lists all of their key ids and it's necessary to pick the correct one and set `APACHE_USER_GPGID` to that single key id. All secret keys can be checked with `gpg --list-secret-keys --keyid-format=long`.

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

The branch needs only to be created for feature releases, and not for patch releases like `4.2.2`. For patch releases, go to the next step.

For example, when working on `4.2.0` release, the branch `branch-4.2` will be created; but for `4.2.1`, the existing `branch-4.2` will be used.

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

In this process, the project version will always be the final one.

```shell
# Bump to the release version
cd $PULSAR_PATH
./src/set-project-version.sh $VERSION_WITHOUT_RC

# Commit
git commit -m "Release $VERSION_WITHOUT_RC" -a
```

```shell
# Create a "candidate" tag
git tag -u $APACHE_USER_GPGID v$VERSION_RC -m "Release $VERSION_RC"

# Verify that you signed your tag before pushing it:
git tag -v v$VERSION_RC

# Push both the branch and the tag to Github repo
git push $UPSTREAM_REMOTE $VERSION_BRANCH
git push $UPSTREAM_REMOTE v$VERSION_RC
```

If there's a need to restart the release with more commits, you can delete the tag.
In this case, after deleting the previous tag, run the steps above again.

```shell
# only if you restart the release before it has been published for voting. Don't run this after that!
# delete local tag
git tag -d v$VERSION_RC
# delete tag in remote
git push $UPSTREAM_REMOTE :v$VERSION_RC
# delete the build info file if it has already been created
[ -f "$ORG_GRADLE_PROJECT_pulsarBuildInfoFile" ] && rm "$ORG_GRADLE_PROJECT_pulsarBuildInfoFile" || true
```

## Build the release artifacts and run checks

These instructions are for &ge;5.0 releases. For &lt;5.0 releases with, follow [Maven build steps for releases](release-process-maven.md).

With the Gradle build, building the binary distributions, checking that the `LICENSE` and `NOTICE` files cover all bundled jars, and running the Apache RAT license header check can be performed in one shot:

```shell
cd $PULSAR_PATH
# ensure the correct JDK version is used for building
sdk u java $SDKMAN_JAVA_VERSION
./gradlew assemble checkBinaryLicense rat
```

Make sure the `ORG_GRADLE_PROJECT_pulsarIncludeBuildInfo` and `ORG_GRADLE_PROJECT_pulsarBuildInfoFile` environment variables are set as described in the [environment variables step](#env-vars), so that the release binaries include the real git commit / build metadata and the metadata stays identical across the release build steps.

Since Gradle builds are incremental and don't rebuild up-to-date artifacts, the later steps — staging the artifacts to SVN, publishing to the ASF Nexus repository, and building the docker images — reuse the artifacts produced by this build, whether they are run as separate Gradle invocations or combined into a single one.

After the build, you should find the following tarballs and zip files:

* `distribution/server/build/distributions/apache-pulsar-X.Y.Z-bin.tar.gz`
* `distribution/offloaders/build/distributions/apache-pulsar-offloaders-X.Y.Z-bin.tar.gz`
* `distribution/shell/build/distributions/apache-pulsar-shell-X.Y.Z-bin.tar.gz`
* `distribution/shell/build/distributions/apache-pulsar-shell-X.Y.Z-bin.zip`

The Pulsar IO connectors are no longer part of the main Pulsar release: most built-in connectors were moved to a separate `pulsar-connectors` repository ([PIP-465](https://github.com/apache/pulsar/blob/master/pip/pip-465.md)) with its own release process.

### Create and publish the GPG key if you haven't already done this

If you haven't already done it, [create and publish the GPG key](create-gpg-keys.md). You will use the key to sign the release artifacts.

Before running the script below, make sure that the `<yourname>@apache.org` code signing key is the default gpg signing key.

One way to ensure this is to create/edit file `~/.gnupg/gpg.conf` and add a line:

```
default-key <key fingerprint>
```

... where `<key fingerprint>` should be replaced with the private key fingerprint for the `<yourname>@apache.org` key. The key fingerprint can be found in `gpg -K` output.

This can be automated with this command, using the `APACHE_USER_GPGID` key id set earlier:

```shell
echo "default-key $APACHE_USER_GPGID" >> ~/.gnupg/gpg.conf
```

A few other settings make signing the release artifacts less painful. These are **gpg-agent** options, so add them to `~/.gnupg/gpg-agent.conf` — putting them in `gpg.conf` makes `gpg` fail with an "invalid option" error:

```conf
# The agent caches your passphrase so you aren't prompted for every signature.
# default-cache-ttl is an idle timeout: the cache expires this many seconds
# after the passphrase was last used, and each use resets the timer
# (default 600 s = 10 min).
# max-cache-ttl is the absolute lifetime since the passphrase was entered,
# regardless of use.
# Below: forget after 1h idle, but never cache longer than 4h total.
default-cache-ttl 3600
max-cache-ttl 14400

# Avoids "gpg: signing failed: Cannot allocate memory" errors while signing.
auto-expand-secmem 100
```

Reload the agent after editing the file so the new settings take effect:

```shell
gpgconf --reload gpg-agent
```

### Sign and stage the artifacts to local SVN directory

The src and bin artifacts need to be signed and finally uploaded to the dist SVN repository for staging. This step should not run inside the $PULSAR_PATH.

:::caution Draft

With the Gradle build, the binary distributions are produced under `distribution/*/build/distributions` instead of `distribution/*/target`, and there is no Pulsar IO connectors directory. The `src/stage-release.sh` script will be updated for the Gradle build layout; verify the staged files after running it.

:::

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

# Please check the size of the files in the `pulsar-X.Y.Z-candidate-1`.
# If you build the artifacts without a clean workspace, the `apache-pulsar-X.Y.Z-src.tar.gz` files
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
./gradlew rat
```

### Commit and upload the staged files in the local SVN directory to ASF SVN server

```shell
cd  ~/pulsar-svn-release-$VERSION_RC/pulsar-$VERSION_RC
svn add *
svn ci -m "Staging artifacts and signature for Pulsar release $VERSION_RC"
```

### Stage artifacts in the ASF Nexus repository

:::caution
Make sure to run only one release at a time when working on multiple releases in parallel. Running multiple builds simultaneously will result in all releases being placed into a single staging repository. Close [the staging repository](https://repository.apache.org/#stagingRepositories) before performing another release.
:::

Publish the artifacts to the [ASF Nexus](https://repository.apache.org) staging repository. Gradle
resolves the credentials for the `apacheReleases` repository from the `apacheReleasesUsername` and
`apacheReleasesPassword` Gradle properties, which are passed as environment variables with the
`ORG_GRADLE_PROJECT_` prefix on the command line so that the password doesn't have to be stored in
`~/.gradle/gradle.properties`. Set your ASF password in the publish command below. Add a space as
the first character on the command line so that your password doesn't get recorded in shell
history.

Trigger gpg key unlocking before building

```shell
echo test | gpg --clearsign -u $APACHE_USER_GPGID > /dev/null
```

Publish artifacts

:::note
The publish command below begins with a leading space so that the line, which contains your ASF password, isn't saved to shell history. This relies on the shell's "ignore commands starting with a space" history setting (`HISTCONTROL=ignorespace` or `ignoreboth` in Bash, `setopt HIST_IGNORE_SPACE` in Zsh), which is enabled by many default shell configurations but isn't guaranteed.
:::

```shell
 cd $PULSAR_PATH
# ensure the correct JDK version is used for building
sdk u java $SDKMAN_JAVA_VERSION
# publish the artifacts
 ORG_GRADLE_PROJECT_apacheReleasesUsername=$APACHE_USER \
 ORG_GRADLE_PROJECT_apacheReleasesPassword="<your ASF password>" \
 ./gradlew publishAllPublicationsToApacheReleasesRepository \
 -PuseGpgCmd=true -Psigning.gnupg.keyName=$APACHE_USER_GPGID
```

:::note

The build validates the version against the target repository: only non-`SNAPSHOT` versions can be
published to the `apacheReleases` repository (`-SNAPSHOT` versions go to the `apacheSnapshots`
repository with `./gradlew publishAllPublicationsToApacheSnapshotsRepository`). The publications can
be verified locally beforehand with `./gradlew publishAllPublicationsToLocalDeployRepository`, which
publishes to the `build/local-deploy-repo` directories instead of a remote repository.

:::

:::note

The `GPG_TTY` environment variable must be set for all the following steps. Otherwise, some operations might fail by "gpg failed to sign the data".

:::

This will ask for the GPG key passphrase and then upload it to the staging repository.

Log in to the ASF Nexus repository at https://repository.apache.org

Click on "Staging Repositories" on the left sidebar and then select the current Pulsar staging repo. This should be called something like `orgapachepulsar-XYZ`.

Add a version string such as "Apache Pulsar 5.0.0-M1-candidate-1" to the clipboard with this command:

```shell
printf "Apache Pulsar $VERSION_RC" |pbcopy
```

Use the "Close" button to close the repository.

Enter the version string in the description field before clicking "Confirm".

This operation will take few minutes. Once complete click "Refresh" and now a link to the staging repository should be available, something like https://repository.apache.org/content/repositories/orgapachepulsar-XYZ

### Stage Docker images

In this step, the `pulsar` docker image is built and pushed to your own DockerHub account. With the Gradle build, the `pulsar-all` image is no longer built: most Pulsar IO connectors were moved to a separate `pulsar-connectors` repository ([PIP-465](https://github.com/apache/pulsar/blob/master/pip/pip-465.md)).

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

For creating and publishing the docker image, run the following commands:

```shell
# set your dockerhub username
DOCKER_USER=$APACHE_USER # your dockerhub username
```

```shell
# login to dockerhub
docker login -u $DOCKER_USER
```

```shell
cd $PULSAR_PATH
# ensure the correct JDK version is used for building
sdk u java $SDKMAN_JAVA_VERSION

./gradlew :docker:pulsar-docker-image:dockerBuild \
    -Pdocker.organization=$DOCKER_USER \
    -Pdocker.platforms=linux/amd64,linux/arm64 \
    -Pdocker.tag=$VERSION_WITHOUT_RC-$(git rev-parse --short=7 v$VERSION_RC^{commit}) \
    -Pdocker.push
```

## Call for the vote to release a version based on the release candidate

Start a voting thread on the dev mailing list. 

Here is a way to render the template for the voting email.

Set these shell variables

```shell
DOCKER_USER=<your-dockerhub-username>
STAGING_REPO="<enter staging repo from https://repository.apache.org/#stagingRepositories>"
MY_NAME="Firstname Lastname"
```

Set the `INCLUDED_CHANGES` variable that lists the included changes in the voting email.

For a regular release, link the changes since the previous release:

```shell
PREVIOUS_VERSION_WITHOUT_RC="4.2.2"
INCLUDED_CHANGES="Included changes since the previous release:
https://github.com/apache/pulsar/compare/v$PREVIOUS_VERSION_WITHOUT_RC...v$VERSION_RC"
```

For a milestone release, there is no previous release that would make sense for the comparison. Instead, link the merged PRs of the release's GitHub milestone:

```shell
INCLUDED_CHANGES="Included changes, the merged PRs of the $VERSION_WITHOUT_RC milestone:
https://github.com/apache/pulsar/pulls?q=is%3Apr+is%3Amerged+milestone%3A$VERSION_WITHOUT_RC"
```

For the second and later milestone releases (`-M2` onwards), additionally link the changes since the previous milestone release:

```shell
PREVIOUS_MILESTONE="5.0.0-M1"
INCLUDED_CHANGES="$INCLUDED_CHANGES

Changes since the previous milestone release:
https://github.com/apache/pulsar/compare/v$PREVIOUS_MILESTONE...v$VERSION_RC"
```

```shell
echo "Go to https://hub.docker.com/r/$DOCKER_USER/pulsar/tags to find the layer URL for the pulsar image"
```

Set these additional shell variable after looking up the URLs

```shell
PULSAR_IMAGE_URL="<looked up in previous step>"
```

```shell
PULSAR_IMAGE_NAME="$DOCKER_USER/pulsar:$VERSION_WITHOUT_RC-$(git rev-parse --short=7 v$VERSION_RC^{commit})"
```

```shell
DOCKER_IMAGES_TEXT="docker pull $PULSAR_IMAGE_NAME
$PULSAR_IMAGE_URL"
```

For Pulsar &lt;5.0

```shell
echo "Go to https://hub.docker.com/r/$DOCKER_USER/pulsar-all/tags to find the layer URL for the pulsar-all image"
```

```shell
PULSAR_ALL_IMAGE_URL="<looked up in previous step>"
```

```shell
PULSAR_ALL_IMAGE_NAME="$DOCKER_USER/pulsar-all:$VERSION_WITHOUT_RC-$(git rev-parse --short=7 v$VERSION_RC^{commit})"
```

```shell
DOCKER_IMAGES_TEXT="docker pull $PULSAR_IMAGE_NAME
$PULSAR_IMAGE_URL
docker pull $PULSAR_ALL_IMAGE_NAME
$PULSAR_ALL_IMAGE_URL"
```

For both:

```shell
# check that Pulsar standalone starts (use CTRL-C to terminate) for both architectures
docker run --platform linux/arm64 --rm $PULSAR_IMAGE_NAME /pulsar/bin/pulsar standalone
docker run --platform linux/amd64 --rm $PULSAR_IMAGE_NAME /pulsar/bin/pulsar standalone
```

For Pulsar &lt;5.0

```shell
# check that Pulsar standalone starts (use CTRL-C to terminate) for both architectures
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

$INCLUDED_CHANGES

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
$DOCKER_IMAGES_TEXT

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

## Milestone release steps (this only applies to milestone releases such as 5.0.0-M1)

Milestone releases (5.0.0-M1, 5.0.0-M2, …) are official Apache releases made before an upcoming LTS release to gather user feedback early. They follow the same release process as other releases, including the release candidates, voting, and promoting the release. Each milestone release is made from its own temporary release branch (`branch-5.0-M1`, `branch-5.0-M2`, …) cut from the master branch, which is dropped after the next milestone release or the final LTS release has been published since milestone releases aren't maintained (see [Preparation](#preparation)).

Milestone releases are not meant for production use cases, since breaking changes can be introduced between the milestone releases and the final LTS release. The main difference in the process is the [release announcement](#announce-the-release), which includes a disclaimer about this. Make sure the `LTS_RELEASE` environment variable is set as described in the [environment variables step](#env-vars) so that the announcement template renders the disclaimer.

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

For commands below, you need to set the environment variables `VERSION_RC`, `VERSION_WITHOUT_RC`, `UPSTREAM_REMOTE`, `APACHE_USER` and `APACHE_USER_GPGID`.
Please check the [environment variables step](#env-vars) for doing that.

### Publish the final tag

Create and push the final Git tag:

```shell
git tag -u $APACHE_USER_GPGID v$VERSION_WITHOUT_RC $(git rev-parse v$VERSION_RC^{}) -m "Release v$VERSION_WITHOUT_RC"
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
5. Since changes are cherry-picked, you will have to include a link such as [Cherry-picked changes](https://github.com/apache/pulsar/pulls?q=is%3Apr+is%3Amerged+label%3Arelease%2F4.2.2+label%3Acherry-picked%2Fbranch-4.2+sort%3Acreated-asc). There's a [separate guide for generating automated release notes](release-note-guide.md).
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
RELEASE_MANAGER_DOCKER_USER=$APACHE_USER # the release manager's docker hub username
```

```shell
CANDIDATE_TAG=${VERSION_WITHOUT_RC}-$(git rev-parse --short=7 v$VERSION_RC^{})
regctl image copy ${RELEASE_MANAGER_DOCKER_USER}/pulsar:${CANDIDATE_TAG} apachepulsar/pulsar:$VERSION_WITHOUT_RC
```

Go to check the result:

* https://hub.docker.com/r/apachepulsar/pulsar/tags

for Pulsar &tl;5.0

```shell
CANDIDATE_TAG=${VERSION_WITHOUT_RC}-$(git rev-parse --short=7 v$VERSION_RC^{})
regctl image copy ${RELEASE_MANAGER_DOCKER_USER}/pulsar-all:${CANDIDATE_TAG} apachepulsar/pulsar-all:$VERSION_WITHOUT_RC
```

Go to check the result:

* https://hub.docker.com/r/apachepulsar/pulsar-all/tags

:::caution

This step is for the latest release only.

:::

```shell
regctl image copy apachepulsar/pulsar:$VERSION_WITHOUT_RC apachepulsar/pulsar:latest
```

for Pulsar &tl;5.0

```shell
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
./gradlew :pulsar-broker:generateOpenApiSpecs
PULSAR_PATH=$(pwd)
```

:::caution Draft

The Gradle build generates the OpenAPI specs into a different location (`pulsar-broker/build/`) than the Maven build. The `rest-apidoc-generator.py` tooling below may need updating for the Gradle build layout.

:::

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
# build Pulsar distributions under /path/to/pulsar-X.Y.Z
cd tools/pytools
poetry install
# ensure that defaults using Runtime.getRuntime().availableProcessors() will be based on 1 as the number of CPUs
_JAVA_OPTIONS=-XX:ActiveProcessorCount=1 poetry run bin/reference-doc-generator.py --master-path=$PULSAR_PATH --version=$VERSION_WITHOUT_RC
```

For new feature releases, you will need to manually edit `src/static/reference/index.html` and add a new entry for the feature release (for example `4.1.x`) in 2 locations:

```patch
+          '<option value="4.1.x">4.1.x</value>' +
-            values: ["2.6.x", "2.7.x", "2.8.x", "2.9.x", "2.10.x", "2.11.x", "3.0.x", "3.1.x", "3.2.x", "3.3.x", "4.0.x", "next"],
+            values: ["2.6.x", "2.7.x", "2.8.x", "2.9.x", "2.10.x", "2.11.x", "3.0.x", "3.1.x", "3.2.x", "3.3.x", "4.0.x", "4.1.x", "next"],
```

Commit the changes:

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
# for milestone releases (version contains -M), a disclaimer is included in the announcement
MILESTONE_NOTICE=""
if [[ "$VERSION_WITHOUT_RC" == *-M* ]]; then
  MILESTONE_NOTICE="
$VERSION_WITHOUT_RC is a milestone release for the upcoming Pulsar $LTS_RELEASE
LTS release, made to gather user feedback early. It is not meant for production
use cases, since breaking changes can be introduced between the milestone
releases and the final Pulsar $LTS_RELEASE LTS release.
"
fi
tee >(pbcopy) <<EOF
To: dev@pulsar.apache.org, users@pulsar.apache.org, announce@apache.org
Subject: [ANNOUNCE] Apache Pulsar $VERSION_WITHOUT_RC released

The Apache Pulsar team is proud to announce Apache Pulsar version $VERSION_WITHOUT_RC.
$MILESTONE_NOTICE
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
svn rm https://dist.apache.org/repos/dist/release/pulsar/pulsar-X.Y.Z
```

## Move to the next snapshot version

The `./src/set-project-version.sh` script updates the project version on both Gradle- and Maven-based branches.

### Feature releases (master branch)

You need to move the master version to the next iteration `Y` (`X + 1`).

```shell
git checkout master
./src/set-project-version.sh X.Y.0-SNAPSHOT
git commit -a -s -m "[cleanup][build] Bumped version to X.Y.0-SNAPSHOT'
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
