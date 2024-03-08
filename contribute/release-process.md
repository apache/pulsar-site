---
id: release-process
title: Release process
---

This page contains instructions for Pulsar committers on how to perform a release.

The term feature/patch releases used throughout this document is defined as follows:

* Feature releases contain 2.10.0, 2.11.0, 3.0.0, and so on.
* Patch releases refer to bug-fix releases, such as 2.10.1, 2.10.2, and so on.

## Preparation

Open a discussion on dev@pulsar.apache.org to notify others that you volunteer to be the release manager of a specific release. If there are no disagreements, you can start the release process.

For feature releases, you should create a new branch named `branch-X.Y` once all PRs with the X.Y.0 milestone are merged. If some PRs with the X.Y.0 milestone are still working in progress and might take much time to complete, you can move them to the next milestone if they are not important. In this case, you'd better notify the author in the PR.

For patch releases, if there are no disagreements, you should cherry-pick all merged PRs labeled with `release/X.Y.Z` into `branch-X.Y`. After these PRs are cherry-picked, you should add the `cherry-picked/branch-X.Y` labels.

Sometimes some PRs cannot be cherry-picked cleanly, you might need to create a separate PR and move the `release/X.Y.Z` label from the original PR to it. In this case, you can ask the author to help create the new PR.

For PRs that are still open, you can choose to delay them to the next release or ping others to review so that they can be merged.

To verify the release branch is not broken, you can synchronize the branch in your personal repo and open a PR to trigger the CI.

You can use the following command to catch basic compilation, checkstyle or spotbugs errors in your local env before cherry-picking.

```bash
mvn clean install -DskipTests
```

If you haven't already done it, [create and publish the GPG key](create-gpg-keys.md). You will use the key to sign the release artifacts.

Before you start the next release steps, make sure you have installed these software:

* JDK 17 (for Pulsar version >= 2.11) or JDK 11 (for earlier versions)
* Maven 3.8.6
* Zip

Also, you need to **clean up the bookkeeper's local compiled** to make sure the bookkeeper dependency is fetched from the Maven repository, details to see [this mailing list thread](https://lists.apache.org/thread/gsbh95b2d9xtcg5fmtxpm9k9q6w68gd2).

## Create a release candidate

### Create the release branch

We are going to create a branch from `master` to `branch-v2.X` where the tag will be generated and where new fixes will be applied as part of the maintenance for the release.

The branch needs only to be created for feature releases, and not for patch releases like `2.3.1`. For patch releases, go to the next step.

For example, when you create the `v2.3.0` release, the branch `branch-2.3` will be created; but for `v2.3.1`, we
keep using the old `branch-2.3`.

In these instructions, a fictitious release `2.X.0` is referred. Change the release version in the examples accordingly with the real version.

It is recommended to create a fresh clone of the repository to avoid any local files interfering in the process:

```shell
git clone git@github.com:apache/pulsar.git
cd pulsar
git checkout -b branch-2.X origin/master
```

Alternatively, you can use a git workspace to create a new, clean directory on your machine without needing to re-download the project.

```shell
git worktree add ../pulsar.branch-2.X branch-2.X
```

If you created a new branch, update the [CI - OWASP Dependency Check](https://github.com/apache/pulsar/blob/master/.github/workflows/ci-owasp-dependency-check.yaml) workflow so that it will run on the new branch.

Note that you should also stop the workflow for previous Pulsar versions that are EOL.

### Cherry-picking changes scheduled for the release

Before proceeding, ensure that you have [set up a Git mergetool](setup-mergetool.md). This tool is essential for resolving merge conflicts that may arise during the cherry-picking process.

Use a search such as `is:merged is:pr label:release/3.0.3 -label:cherry-picked/branch-3.0` to search for merged PRs that are scheduled for the release, but haven't yet been cherry-picked.
It is necessary to handle cherry-picks in the same order as they have been merged in the master branch. Otherwise there will be unnecessary merge conflicts to resolve.

Here's a shell script where the output that will ease cherry-picking from master branch:
assumes `gawk` is gnu awk. install `brew install gawk` or `alias gawk=awk` on Linux.
```
UPSTREAM=origin
git fetch $UPSTREAM
RELEASE_NUMBER=3.0.3
RELEASE_BRANCH=branch-3.0
PR_QUERY="is:merged label:release/$RELEASE_NUMBER -label:cherry-picked/$RELEASE_BRANCH"
PR_NUMBERS=$(gh pr list -L 100 --search "$PR_QUERY" --json number --jq '["#"+(.[].number|tostring)] | join("|")')
ALREADY_PICKED=$(git log --oneline -P --grep="$PR_NUMBERS" --reverse $RELEASE_BRANCH | gawk 'match($0, /\(#([0-9]+)\)/, a) {print substr(a[0], 2, length(a[0])-2)}' | tr '\n' '|' | sed 's/|$//')
if [[ -n "$ALREADY_PICKED" ]]; then
  echo "** Already picked but not tagged as cherry-picked **"
  git log --color --oneline -P --grep="$PR_NUMBERS" --reverse $RELEASE_BRANCH | gawk 'match($0, /\(#([0-9]+)\)/, a) {print $0 " https://github.com/apache/pulsar/pull/" substr(a[0], 3, length(a[0])-3)}'
fi
echo "** Not cherry-picked from $UPSTREAM/master **"
git log --color --oneline -P --grep="$PR_NUMBERS" --reverse $UPSTREAM/master | { [ -n "$ALREADY_PICKED" ] && grep --color -v -E "$ALREADY_PICKED" || cat; } | gawk 'match($0, /\(#([0-9]+)\)/, a) {print $0 " https://github.com/apache/pulsar/pull/" substr(a[0], 3, length(a[0])-3)}'
echo "Check https://github.com/apache/pulsar/pulls?q=is:pr+$(echo "$PR_QUERY" | tr ' ' '+')"
```

this produces an output such as:
```
** Already picked but not tagged as cherry-picked **
744b7af5fc4 [improve][broker] Support not retaining null-key message during topic compaction (#21578) (#21662) https://github.com/apache/pulsar/pull/21578
b41013ba45c [improve][broker] defer the ownership checks if the owner is inactive (ExtensibleLoadManager) (#21857) https://github.com/apache/pulsar/pull/21857
a6fd517ee39 [improve][build] Add a default username in the image (#21695) https://github.com/apache/pulsar/pull/21695
bbf6ddf9244 [fix] [client] Do no retrying for error subscription not found when disabled allowAutoSubscriptionCreation (#22078) https://github.com/apache/pulsar/pull/22078
** Not cherry-picked from origin/master **
ecd16d68e29 [fix][client] fix negative message re-delivery twice issue (#20750) https://github.com/apache/pulsar/pull/20750
50007c343ad [fix][txn] Fix getting last message ID when there are ongoing transactions (#21466) https://github.com/apache/pulsar/pull/21466
e81a20d667a [fix][broker] Avoid consumers receiving acknowledged messages from compacted topic after reconnection (#21187) https://github.com/apache/pulsar/pull/21187
09559c5e661 [fix] [broker] Fix reader stuck when read from compacted topic with read compact mode disable (#21969) https://github.com/apache/pulsar/pull/21969
48b4481969c [improve] [broker] Do not print an Error log when responding to `HTTP-404` when calling `Admin API` and the topic does not exist. (#21995) https://github.com/apache/pulsar/pull/21995
861618a8120 [fix] [broker] Expire messages according to ledger close time to avoid client clock skew (#21940) https://github.com/apache/pulsar/pull/21940
48c7e322fec [improve][admin] Expose the offload threshold in seconds to the amdin (#22101) https://github.com/apache/pulsar/pull/22101
1c652f5519e [improve] [broker] Do not try to open ML when the topic meta does not exist and do not expect to create a new one. #21995 (#22004) https://github.com/apache/pulsar/pull/22004
86079059890 [improve][broker] Cache the internal writer when sent to system topic. (#22099) https://github.com/apache/pulsar/pull/22099
1b1cfb58f4e [fix] [broker] Enabling batch causes negative unackedMessages due to ack and delivery concurrency (#22090) https://github.com/apache/pulsar/pull/22090
0c49cac105e [fix] [client] fix huge permits if acked a half batched message (#22091) https://github.com/apache/pulsar/pull/22091
31ed115d0b5 [fix][sec] Add a check for the input time value (#22023) https://github.com/apache/pulsar/pull/22023
30134966a18 [fix][test] fix test testSyncNormalPositionWhenTBRecover (#22120) https://github.com/apache/pulsar/pull/22120
91de98ad456 [fix][test] Fix test testAsyncFunctionMaxPending (#22121) https://github.com/apache/pulsar/pull/22121
```

It will speed up cherry-picking since you commit ids are there and there's also links to the PRs.
A cherry-pick should be done in this order with `git cherry-pick -x COMMIT_ID`. 
It's possible that some dependent commits are necessary to be cherry-picked when you encounter a lot of merge conflicts in a case where they aren't expected.

### Update project version and tag

During the release process, you are going to initially create "candidate" tags, that after verification and approval will get promoted to the "real" final tag.

In this process, the maven version of the project will always be the final one.

```shell
# Bump to the release version
./src/set-project-version.sh 2.X.0

# Some version may not update the right parent version of `protobuf-shaded/pom.xml`, please double check it.

# Commit
git commit -m 'Release 2.X.0' -a

# Create a "candidate" tag
# If you don't sign your commits already, use the following
export GPG_TTY=$(tty)
git tag -u $USER@apache.org v2.X.0-candidate-1 -m 'Release v2.X.0-candidate-1'
# If you already sign your commits using your apache.org email, use the following
git tag -s v2.X.0-candidate-1 -m 'Release v2.X.0-candidate-1'

# Verify that you signed your tag before pushing it:
git tag -v v2.X.0-candidate-1

# Push both the branch and the tag to Github repo
git push origin branch-2.X
git push origin v2.X.0-candidate-1
```

For patch releases, the tag is like `2.3.1`.

### Build release artifacts

Run the following command to build the artifacts:

```shell
mvn clean install -DskipTests
```

After the build, you should find the following tarballs, zip files, and the connectors directory with all the Pulsar IO nar files:

* `distribution/server/target/apache-pulsar-2.X.0-bin.tar.gz`
* `distribution/offloaders/target/apache-pulsar-offloaders-2.X.0-bin.tar.gz`
* `distribution/shell/target/apache-pulsar-shell-2.X.0-bin.tar.gz`
* `distribution/shell/target/apache-pulsar-shell-2.X.0-bin.zip`
* directory `distribution/io/target/apache-pulsar-io-connectors-2.X.0-bin`

:::note

The _apache-pulsar-shell_ artifacts are distributed beginning with release 2.11.0.

:::

### Inspect the artifacts

First, check that the `LICENSE` and `NOTICE` files cover all included jars for the bin package. You can use script to cross-validate `LICENSE` file with included jars:

```shell
src/check-binary-license.sh distribution/server/target/apache-pulsar-2.X.0-bin.tar.gz
```

Then, run Apache RAT to verify the license headers in the src package:

```shell
tar -xvzf target/apache-pulsar-2.X.0-src.tar.gz
cd apache-pulsar-2.X.0-src
mvn apache-rat:check
```

Finally, use instructions in [verifying release candidates](validate-release-candidate.md) page to do some sanity checks on the produced binary distributions.

### Sign and stage the artifacts on SVN

The src and bin artifacts need to be signed and uploaded to the dist SVN repository for staging.

Before running the script, make sure that the `<yourname>@apache.org` code signing key is the default gpg signing key.

One way to ensure this is to create/edit file `~/.gnupg/gpg.conf` and add a line:

```
default-key <key fingerprint>
```

... where `<key fingerprint>` should be replaced with the private key fingerprint for the `<yourname>@apache.org` key. The key fingerprint can be found in `gpg -K` output.

```shell
cd $PULSAR_PATH
# '-candidate-1' needs to be incremented in case of multiple iteration in getting
#    to the final release)
RCVERSION=2.11.4-candidate-1
APACHEID=your_apache_id

svn mkdir --username $APACHEID -m "Add directory for pulsar $RCVERSION release" https://dist.apache.org/repos/dist/dev/pulsar/pulsar-$RCVERSION
svn co https://dist.apache.org/repos/dist/dev/pulsar/pulsar-$RCVERSION
cd pulsar-$RCVERSION

$PULSAR_PATH/src/stage-release.sh .

# Verify the artifacts are correctly signed have correct checksums:
( for i in **/*.(tar.gz|zip|nar); do echo $i; gpg --verify $i.asc $i || exit 1 ; done )
( for i in **/*.(tar.gz|zip|nar); do echo $i; shasum -a 512 -c $i.sha512 || exit 1 ; done )

# Please check the size of the files in the `pulsar-2.X.0-candidate-1`.
# If you build the artifacts without a clean workspace, the `apache-pulsar-2.X.0-src.tar.gz` files
# may be too large to be unable to upload.
svn add *
svn ci -m 'Staging artifacts and signature for Pulsar release $RCVERSION'
```

### Stage Maven modules

Upload the artifacts to ASF Nexus:

```shell
cd $PULSAR_PATH
rm -rf apache-pulsar-2.X.0-src

export APACHE_USER=$USER
export APACHE_PASSWORD=$MY_PASSWORD
export GPG_TTY=$(tty)
# src/settings.xml from master branch to /tmp/mvn-apache-settings.xml since it's missing in some branches
curl -s -o /tmp/mvn-apache-settings.xml https://raw.githubusercontent.com/apache/pulsar/master/src/settings.xml
# publish artifacts
mvn deploy -DskipTests -Papache-release --settings /tmp/mvn-apache-settings.xml
# publish org.apache.pulsar.tests:integration and it's parent pom org.apache.pulsar.tests:tests-parent
mvn deploy -DskipTests -Papache-release --settings /tmp/mvn-apache-settings.xml -f tests/pom.xml -pl org.apache.pulsar.tests:tests-parent,org.apache.pulsar.tests:integration
```

:::note

The `GPG_TTY` environment variable must be set for all the following steps. Otherwise, some operations might fail by "gpg failed to sign the data".

:::

This will ask for the GPG key passphrase and then upload it to the staging repository.

Log in to the ASF Nexus repository at https://repository.apache.org

Click on "Staging Repositories" on the left sidebar and then select the current Pulsar staging repo. This should be called something like `orgapachepulsar-XYZ`.

Use the "Close" button to close the repository. This operation will take few minutes. Once complete click "Refresh" and now a link to the staging repository should be available, something like https://repository.apache.org/content/repositories/orgapachepulsar-XYZ

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
cd $PULSAR_HOME/docker
./build.sh
DOCKER_USER=<your-username> DOCKER_PASSWORD=<your-password> DOCKER_ORG=<your-organization> ./publish.sh
```

### Release Pulsar 3.0 and later

Run the following commands:

```
DOCKER_USER=<your-username>
DOCKER_ORG=<docker-organization>
docker login $DOCKER_ORG -u $DOCKER_USER -p <your-password>
mvn install -DUBUNTU_MIRROR=http://azure.archive.ubuntu.com/ubuntu/ \
    -DskipTests \
    -Pmain,docker -Pdocker-push \
    -Ddocker.platforms=linux/amd64,linux/arm64 \
    -Ddocker.organization=$DOCKER_ORG \
    -pl docker/pulsar,docker/pulsar-all
```


## Vote for the release candidate

Start a voting thread on the dev mailing list. Here is a sample content:

```
To: dev@pulsar.apache.org
Subject: [VOTE] Pulsar Release 2.X.0 Candidate 1

This is the first release candidate for Apache Pulsar, version 2.X.0.

It fixes the following issues:
https://github.com/apache/pulsar/milestone/8?closed=1

*** Please download, test and vote on this release. This vote will stay open
for at least 72 hours ***

Note that we are voting upon the source (tag), binaries are provided for
convenience.

Source and binary files:
https://dist.apache.org/repos/dist/dev/pulsar/pulsar-2.X.0-candidate-1/

SHA-512 checksums:
028313cbbb24c5647e85a6df58a48d3c560aacc9  apache-pulsar-2.X.0-SNAPSHOT-bin.tar.gz
f7cc55137281d5257e3c8127e1bc7016408834b1  apache-pulsar-2.x.0-SNAPSHOT-src.tar.gz

Maven staging repo:
https://repository.apache.org/content/repositories/orgapachepulsar-169/

The tag to be voted upon:
v2.X.0-candidate-1 (21f4a4cffefaa9391b79d79a7849da9c539af834)
https://github.com/apache/pulsar/releases/tag/v2.X.0-candidate-1

Pulsar's KEYS file containing PGP keys you use to sign the release:
https://downloads.apache.org/pulsar/KEYS

Docker images:

<link of the pulsar images>

<link of the pulsar-all image>

Please download the source package, and follow the README to build
and run the Pulsar standalone service.
```

The vote should be open for at least 72 hours (3 days). Votes from Pulsar PMC members will be considered binding, while anyone else is encouraged to verify the release and vote as well.

If the release is approved here with 3 +1 binding votes, you can then proceed to the next step. Otherwise, you should repeat the previous steps and prepare another release candidate to vote.

## Promote the release

For commands below, you need to set these to the environment
```
# Set Version
export VERSION_RC=2.11.4-candidate-1
export VERSION_WITHOUT_RC=${VERSION_RC%-candidate-*}
# set your ASF user id
export APACHE_USER=<your ASF userid>
```

### Publish the final tag

Create and push the final Git tag:

```shell
git tag -u $APACHE_USER@apache.org v$VERSION_WITHOUT_RC -m "Release v$VERSION_WITHOUT_RC"
git push origin v$VERSION_WITHOUT_RC
```

### Create release notes in GitHub

Then, you can [create a GitHub release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release) based on the tag.

```shell 
# open this URL and create release notes by clicking "Create release from tag"
echo https://github.com/apache/pulsar/releases/tag/v${VERSION_WITHOUT_RC}
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

```bash
RELEASE_MANAGER_DOCKER_USER=otheruser
CANDIDATE_TAG=$VERSION_WITHOUT_RC

regctl image copy ${RELEASE_MANAGER_DOCKER_USER}/pulsar:${CANDIDATE_TAG} apachepulsar/pulsar:$VERSION_WITHOUT_RC
regctl image copy ${RELEASE_MANAGER_DOCKER_USER}/pulsar-all:${CANDIDATE_TAG} apachepulsar/pulsar-all:$VERSION_WITHOUT_RC
```

Go to check the result:
- https://hub.docker.com/r/apachepulsar/pulsar/tags
- https://hub.docker.com/r/apachepulsar/pulsar-all/tags

Ensure that newer than 3.x images support both amd64 and arm64. Older 2.x images should be amd64 only. 

:::caution

This step is for the latest release only.

:::

```
regctl image copy apachepulsar/pulsar:$VERSION_WITHOUT_RC apachepulsar/pulsar:latest
regctl image copy apachepulsar/pulsar-all:$VERSION_WITHOUT_RC apachepulsar/pulsar-all:latest
```

### Update project version
After the release process, you should bump the project version and append it with `-SNAPSHOT`.
```
./src/set-project-version.sh x.x.x-SNAPSHOT
git add -u
git commit -m "Bump version to next snapshot version"
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
mvn -ntp install -Pcore-modules,swagger,-main -DskipTests -DskipSourceReleaseAssembly=true -Dspotbugs.skip=true -Dlicense.skip=true
```

Now, run the following script from the main branch of apache/pulsar-site repo:

```shell
cd tools/pytools
poetry install
poetry run bin/rest-apidoc-generator.py --master-path=/path/to/pulsar-2.X.Y --version=2.X.Y
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
poetry run bin/java-apidoc-generator.py 2.X.0
```

Once the docs are generated, you can add them and submit them in a PR. The expected doc output is:

* `static/api/admin`
* `static/api/client`
* `static/api/pulsar-functions`

Read more on the manual of [pytools](https://github.com/apache/pulsar-site/tree/main/tools/pytools/README.md).

### Reference

:::caution

This step is for feature releases only, unless you're sure that significant reference fixes are made against the patch release.

:::

You can generate references of config and command-line tool by running the following script from the main branch of apache/pulsar-site repo:

```shell
# build Pulsar distributions under /path/to/pulsar-2.X.0
cd tools/pytools
poetry install
poetry run bin/reference-doc-generator.py --master-path=/path/to/pulsar-2.X.0 --version=2.X.0
```

Once the docs are generated, you can add them and submit them in a PR. The expected doc output is `static/reference/2.X.x`

Read more on the manual of [pytools](https://github.com/apache/pulsar-site/tree/main/tools/pytools/README.md).

## Announce the release

Once the release artifacts are available in the Apache Mirrors and the website is updated, you need to announce the release. You should email to dev@pulsar.apache.org, users@pulsar.apache.org, and announce@apache.org. Here is a sample content:

```
To: dev@pulsar.apache.org, users@pulsar.apache.org, announce@apache.org
Subject: [ANNOUNCE] Apache Pulsar 2.X.0 released

The Apache Pulsar team is proud to announce Apache Pulsar version 2.X.0.

Pulsar is a highly scalable, low latency messaging platform running on
commodity hardware. It provides simple pub-sub semantics over topics,
guaranteed at-least-once delivery of messages, automatic cursor management for
subscribers, and cross-datacenter replication.

For Pulsar release details and downloads, visit:

https://pulsar.apache.org/download

Release Notes are at:
https://pulsar.apache.org/release-notes

We would like to thank the contributors that made the release possible.

Regards,

The Pulsar Team
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
svn rm https://dist.apache.org/repos/dist/release/pulsar/pulsar-2.Y.0
```

## Move master branch to next version

:::caution

This step is for feature releases only.

:::

You need to move the master version to the next iteration `Y` (`X + 1`).

```shell
git checkout master
./src/set-project-version.sh 2.Y.0-SNAPSHOT
git commit -a -s -m "[cleanup][build] Bumped version to 2.Y.0-SNAPSHOT'
```

Since this needs to be merged into `master`, you need to follow the regular process and create a Pull Request on GitHub.
