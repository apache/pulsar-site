---
id: release-policy
title: Release policy
---

## Supported Versions

Please plan your Pulsar deployment updates according to the dates provided below. However, note that the Apache Pulsar project may provide ad hoc releases for some older patch versions, depending on resource availability, time constraints, or the severity of an issue, such as a significant CVE. These releases would be provided on a 'best-effort' basis. For supported versions, the Apache Pulsar project follows the [Security policy](/security).

````mdx-code-block
import SupportedVersionsTable from "@site/src/components/SupportedVersionsTable";

<SupportedVersionsTable />
````

## Release semantics

The Pulsar project follows a variant of Semantic Versioning (semver), which replacing `major.minor.patch` with `LTS.feature.patch`.

Concretely, existing releases can expect patches for bugs and security vulnerabilities. New features will target to feature releases. A "major" version bump will not carry any special meaning in terms of "big features" included in the release or breaking API changes. Instead, it would simply signal a new long-term support (LTS) release.

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

When upgrading an existing cluster, it is important to upgrade components linearly.

Before 3.0, upgrade should be done linearly through each feature version. For example, when upgrading from 2.8 to 2.10, it is important to upgrade to 2.9 before going to 2.10.

Starting from 3.0, additionally, live upgrade/downgrade between one LTS and the next one is guaranteed. For example,

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

Generally, one committer shall volunteer as the release manager (RM) for a specific release.

For feature releases and LTS releases, the last 3 weeks of the release cycle will be marked as a code-freeze period. The RM will branch off from master, and the RM is also responsible for selecting the changes that will be cherry-picked in the release branch.

From the code-freeze point, to minimize the risk of delaying the release, only bug fixes involving a regression of behavior compared to a previous release should be allowed. Occasional exceptions will be possible after higher scrutiny of the change.

1. At the moment of the code freeze, the RM will start preparing a release candidate (RC) following the [release process](release-process.md). Committers, contributors, and users will [test this RC](validate-release-candidate.md) to detect issues as early as possible. (A formal vote by the PMC will not be required at this stage, though any disagreement should be sent out ASAP).
2. After 1 week, if there are any changes, the RM will provide a new RC release that the community will test again.
3. After 1 more week, if there are any changes, a third RC will be prepared, and this will be submitted to vote to the PMC. Otherwise, the vote will be held on an earlier RC if no issues are found.
4. The last 1 week will be used for the voting process and for updating Pulsar website and the blog post announcing the release, which should (hopefully) happen on the scheduled day.

For patch releases, the process is the same while there is no code-freeze period and strict timeline. Basically, patch release is out "when it is ready".

:::note

For example, the next release of Pulsar is 3.0.0, and it has the planned timeline as:

* 2023-04-11 - RC-1
* 2023-04-18 - RC-2
* 2023-04-25 - RC-3
* 2023-05-02 - Announce 3.0 Release

:::

## Related PIPs

* [PIP-47: A Time-Based Release Plan](https://github.com/apache/pulsar/wiki/PIP-47%3A-Time-Based-Release-Plan)
* [PIP-175: Extend time based release process](https://github.com/apache/pulsar/issues/15966)
