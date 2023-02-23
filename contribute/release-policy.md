---
id: release-policy
title: Release policy
---

## Release semantics

The Pulsar project follows a variant of [Semantic Versioning](http://semver.org/spec/v2.0.0.html). Existing releases can expect patches for bugs and security vulnerabilities. New features will target minor releases. The difference is that a major version bump will not carry any special meaning in terms of "big features" included in the release or breaking API changes. Instead, it would simply signal a new long-term support (LTS) release.

For example,

* 2.10.0 is a feature release;
* 2.10.1 is a patch release;
* 2.11.0 is a feature release;
* 3.0.0 is the first LTS release;
* 3.1.0 is a feature release;
* 3.2.0 is a feature release;
* 3.2.1 is a patch release;
* 4.0.0 is a LTS release.

## Compatibility between releases

When upgrading an existing cluster, it is important to upgrade components linearly.

Before 3.0, upgrade should be done linearly through each minor version. For example, when upgrading from 2.8 to 2.10, it is important to upgrade to 2.9 before going to 2.10.

Starting from 3.0, additionally, live upgrade/downgrade between one LTS and the next one is guaranteed. For example,

* 3.0 -> 4.0 -> 3.0 is OK;
* 3.2 -> 4.0 -> 3.2 is OK;
* 3.2 -> 4.4 -> 3.2 is OK;
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

## Supported Versions

````mdx-code-block
import SupportedVersionsTable from "@site/src/components/SupportedVersionsTable";

<SupportedVersionsTable />
````

| Version | Released      | Active Support  | Security Support | Latest |
|---------|---------------|-----------------|------------------|--------|
| 2.11    | January 2023  | January 2024    | January 2024     | 2.11.0 |
| 2.10    | April 2022    | April 2023      | April 2023       | 2.10.3 |
| 2.9     | November 2021 | November 2022   | November 2022    | 2.9.4  |
| 2.8     | June 2021     | June 2022       | June 2022        | 2.8.4  |
| 2.7     | November 2020 | November 2021   | November 2021    | 2.7.5  |
| 2.6     | June 2020     | June 2021       | June 2021        | 2.6.4  |
| 2.5     | January 2020  | January 2021    | January 2021     | 2.5.2  |
| 2.4     | July 2019     | July 2020       | July 2020        | 2.4.2  |

## Roadmap for release plans

The next release of Pulsar is 3.0.0, and it has the planned timeline as:

* 2023-04-11 - RC-1
* 2023-04-18 - RC-2
* 2023-04-25 - RC-3
* 2023-05-02 - Announce 3.0 Release

## Release cycles

Generally, one committer shall volunteer as the release manager (RM) for a specific release.

For feature releases and LTS releases, the last 3 weeks of the release cycle will be marked as a code-freeze period. The RN will branch off from master, and the RM is responsible for selecting the changes that will be cherry-picked in the release branch.

From the code-freeze point, to minimize the risk of delaying the release, only bug fixes involving a regression of behavior compared to a previous release should be allowed. Occasional exceptions will be possible after higher scrutiny of the change.

At the moment of the code freeze, the RM will also prepare a release candidate (RC) following the [release process](release-process.md). Committers, contributors, and users will [test this RC](validate-release-candidate.md) to detect issues as early as possible.

A formal vote by the PMC will not be required at this stage (though any disagreement should be sent out ASAP).

After 1 week, if there are any changes, the RM will provide a new RC release that the community will test again.

After 1 more week, if there are any changes, a third RC will be prepared, and this will be submitted to vote to the PMC. Otherwise, the vote will be held on an earlier RC if no issues are found.

The last 1 week will be used for the voting process and for updating Pulsar website and the blog post announcing the release, which should (hopefully) happen on the scheduled day.

For patch releases, the process is the same while there is no code-freeze period and strict timeline. Basically, patch release is out "when it is ready".

## Related PIPs

* [PIP-47: A Time-Based Release Plan](https://github.com/apache/pulsar/wiki/PIP-47%3A-Time-Based-Release-Plan)
* [PIP-175: Extend time based release process](https://github.com/apache/pulsar/issues/15966)
