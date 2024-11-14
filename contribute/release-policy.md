---
id: release-policy
title: Release policy
---

## Supported Versions

Please plan your Pulsar deployment updates according to the dates provided below. The Apache Pulsar project doesn't make separate announcements for end-of-support or end-of-life. However, note that the Apache Pulsar project may provide ad hoc releases for some older patch versions, depending on resource availability, time constraints, or the severity of an issue, such as a significant CVE. These releases would be provided on a 'best-effort' basis. For supported versions, the Apache Pulsar project follows the [Security policy](/security).

The Apache Pulsar project accepts [issue reports](https://github.com/apache/pulsar/issues) for supported versions. Issue reporters are requested to upgrade to a supported version for both Pulsar clients and Pulsar clusters before filing issue reports. Commercial vendors around Apache Pulsar may offer paid options for users requiring security and bug fix support for previous release versions.

````mdx-code-block
import SupportedVersionsTable from "@site/src/components/SupportedVersionsTable";

<SupportedVersionsTable />
````

## Release semantics

The Pulsar project follows a variant of Semantic Versioning (semver), replacing `major.minor.patch` with `LTS.feature.patch`.

Concretely, existing releases can expect patches for bugs and security vulnerabilities. New features will target feature releases. A "major" version bump will not carry any special meaning in terms of "big features" included in the release or breaking API changes. Instead, it will simply signal a new long-term support (LTS) release.

For example,

* 2.10.0 is a feature release;
* 2.10.1 is a patch release;
* 2.11.0 is a feature release;
* 3.0.0 is the first LTS release;
* 3.0.1 is a patch release of the LTS release;
* 3.1.0 is a feature release;
* 3.2.0 is a feature release;
* 3.2.1 is a patch release;
* 4.0.0 is an LTS release.

## Compatibility between releases

When upgrading an existing cluster, it is important to upgrade components linearly. The reason for this is that changes in releases are designed in a way that allows upgrading an existing Pulsar cluster to a newer release and then rolling back to the original release version. This is considered when changes are made in Pulsar and the default BookKeeper configuration for Pulsar. Since Apache Pulsar is an open-source project, there is no guarantee. Each Pulsar user is responsible for operating their cluster, and Pulsar cluster upgrades should be tested in testing and staging environments to ensure that a specific configuration can be upgraded and downgraded. When something is supported in the Apache Project, it means that the project is committed to addressing reported issues. This also applies to release upgrade compatibility.

Before version 3.0, the upgrade should be done linearly through each feature version. For example, when upgrading from 2.8 to 2.10, it is important to upgrade to 2.9 before going to 2.10.

Starting from version 3.0, live upgrade/downgrade between one LTS and the next one is supported. For example,

* 3.0 -> 4.0 -> 3.0 is OK;
* 3.2 -> 4.0 -> 3.2 is OK;
* 3.2 -> 4.4 -> 3.2 is OK;
* 3.0 -> 3.1 -> 3.0 is OK;
* 3.0 -> 3.2 -> 3.0 is OK;
* 3.2 -> 5.0 is _not_ OK.

## Release frequency and support expectation

|                 | Release frequency | Active Support | Security Support |
|-----------------|-------------------|----------------|------------------|
| LTS release     | Every 18 months   | 24 months      | 36 months        |
| Feature release | Every 3 months    | 6 months       | 6 months         |
| Patch release   | When it is ready  | N/A            | N/A              |

This can be translated into:

* The last 2 LTS releases and the last 2 feature releases are supported.
* Security patches are provided for the past 3 LTS releases and 2 feature releases

Therefore, users can choose between stay in an LTS release until they are ready to jump into the next LTS, or try the latest releases which contains required features.

## Release cycles

Generally, one committer shall volunteer as the release manager for a specific release. A release is initiated with a discussion thread on the Pulsar mailing list.

As part of the release discussion thread, a timeline is decided upon for the release. The release manager will drive this discussion, and decisions will be made in the Apache way.

For feature releases and LTS releases, the last three weeks of the release cycle will be marked as a releasing period to finish the pending changes and decide on what features (PIP implementations) go into the release version.

As part of this period for an LTS or feature release, there could be multiple preview releases and multiple release candidates. A preview release is one that is not intended to be released. The purpose of the preview release is to allow users to start testing the new release functionality by making the release binaries available. The preview release will contain a suffix `-pre.1`, `-pre.2`. Preview releases don't apply to patch releases.

Here's an example of the 4.0.0 LTS release timeline:

* 2024-09-26 - Target publishing date for 4.0 preview 1 (4.0.0-pre.1)
* 2024-10-03 - Target publishing date for 4.0 preview 2 (4.0.0-pre.2)
* 2024-10-07 - Code freeze for 4.0 by branching branch-4.0 from the master branch
* 2024-10-10 - Target publishing date for 4.0 release candidate 1
* 2024-10-15 - Reserved for 4.0 release candidate 2 if needed
* 2024-10-17 - Announcement date for 4.0.0

The LTS or feature release timeline will also note the target date for branching the release branch off the master branch. After that point in time, the release manager will coordinate the changes that will be included in the release branch. The intention is to minimize the risk of delaying the release and only include bug fixes involving a regression of behavior compared to a previous release or critical improvements to the new features (PIP implementations) that are part of the release.

For patch releases, the process is similar, but there is no branching off the master branch since the release branch already exists. The patch release doesn't contain preview releases.

The preparation of releases is handled according to the [release process](release-process.md). The release manager is responsible for updating the process documentation when there's a need to adapt the process. There's also a guide for [release validation](validate-release-candidate.md) which is used by Pulsar contributors before voting on releases. Before releases are announced, the release will be voted upon on the [Pulsar dev mailing list](https://lists.apache.org/list.html?dev@pulsar.apache.org). The [ASF voting process](https://www.apache.org/foundation/voting.html) applies. A release candidate will become an official release after it passes the release vote and has been announced. This is why the release version in the binaries of a release candidate doesn't include a `-rc` suffix.

## Related PIPs

* [PIP-47: A Time-Based Release Plan](https://github.com/apache/pulsar/wiki/PIP-47%3A-Time-Based-Release-Plan)
* [PIP-175: Extend time based release process](https://github.com/apache/pulsar/issues/15966)