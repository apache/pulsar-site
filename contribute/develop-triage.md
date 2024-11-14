---
id: develop-triage
title: Triaging an Issue
---

This guide documents the [issue tracker](https://github.com/apache/pulsar/issues) for users and developers.

## Checklist for Triaging

* [ ] Read the initial message and the comments.
* [ ] Check that the title is reasonably concise, while including enough specifics so that those scanning the list of issues can quickly identify its topic.
* [ ] Leave a brief comment about the proposed next action needed. If there is a long message list, a summary can be very helpful.
* [ ] (Committers-only) Set all the relevant [labels](develop-labels).
* [ ] (Committers-only) Where appropriate, set the Assignees, Reviewers, Milestone fields, and possibly @mention relevant people.
* [ ] (Committers-only) If the issue is clearly invalid (unrelated to Pulsar, duplicate, spam, etc), you can close it as ["not planned"](https://github.blog/changelog/2022-05-19-the-new-github-issues-may-19th-update/).

## Assignees

This field indicates who is expected to take the next step in resolving the issue.

Since the Pulsar community follows [Community of Peers](https://www.apache.org/theapacheway/) pattern, a contributor is assigned to an issue only if they ask for or self-assign. GitHub only allows team members or participants to be assigned, and asking for an assignment simplifies this restriction.

## Helping Triage Issues

Once you know your way around how Pulsar's source files are structured and you are comfortable with the workflow, a great way to contribute is to help triage issues. Do realize, though, that experience working on Pulsar is needed in order to effectively help triage.

Around the clock, new issues are being opened on the [issue tracker](https://github.com/apache/pulsar/issues) and existing issues are being updated. Every issue needs to be triaged to make sure everything runs smoothly.

### Classifying Reports

Pulsar provides five issue templates and they define what is desired in each category. Issue tracker holds only actionable items, including bug reports and enhancements. Questions and suggestions are recommended to be posted at:

1. [User Mail List](mailto:users@pulsar.apache.org) ([subscribe](mailto:users-subscribe@pulsar.apache.org)), or
2. [Github Discussion](https://github.com/apache/pulsar/discussions).

For [bug reports](https://github.com/apache/pulsar/blob/master/.github/ISSUE_TEMPLATE/bug-report.yml), an issue needs to:

* provide the OS and Pulsar version in use
* give reproducing steps to facilitate quick location of the problem
* clearly explain what is expected and what happens actually

For [enhancements](https://github.com/apache/pulsar/blob/master/.github/ISSUE_TEMPLATE/enhancement.yml), an issue needs to:

* describe the motivations (why does Pulsar need it)
* describe the proposed solution and add related materials like links if any
* describe other alternative solutions or features considered, but rejected

Frequent raised issues have their own templates: [flaky tests](https://github.com/apache/pulsar/blob/master/.github/ISSUE_TEMPLATE/flaky-test.yml) and [document issues](https://github.com/apache/pulsar/blob/master/.github/ISSUE_TEMPLATE/doc.yml).

Pulsar improvement proposal (PIP) has its own [workflow](https://github.com/apache/pulsar/blob/master/wiki/proposals/PIP.md).

### Closing Issues

Stale issues coming from years ago are hardly handled today. Also, a huge issue backlog decreases the passion a contributor spends time on issue triaging.

Here are several common reasons to close issues especially stale ones that you can use to judge:

* If a bug report is associated with [unmaintained versions](release-policy.md#Supported-Versions), and it can hardly or cannot be reproduced on maintained versions, you can close the issue with comment "Closing as stale. If it's still relevant to maintained versions, feel free to open a new issue."
* If an enhancement ticket gets stale for over a year and no one seems working on it, you can close the issue with comment "Closing as stale and no one worked on it. Please open a new issue if you volunteer to do it."
* If a user question is answered in the thread, you can close the issue with comment "Closing as answered"; otherwise, you can [convert the issue to a discussion](https://docs.github.com/en/discussions/managing-discussions-for-your-community/managing-discussions#transferring-a-discussion) under the Q&A category.
* If an open issue is already resolved on master or is duplicate to another issue, you can directly close the issue with those resolutions.
* Due to historical reasons, some issues are about multilingual clients (C++, Go, Python) or other components moved out to their separate repositories. You can [transfer the issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/transferring-an-issue-to-another-repository) to the corresponding repository, or close it with comment "Closing as stale. The development of \{the specific module\} is permantly moved to \{the separate repository\}. Please open a new issue there if it's still relevent."

### Re-Evaluating Closed Issues

You can concern that some stale issues are still relevant but get closed eagerly.

Do worry! Anyone is expected to search before asking. And once they find a closed issue is relevant, they can pick it up or open a new one and refer to the previous one. This is always viable and here are some examples:

* [DB2 Connector for Pulsar](https://github.com/apache/pulsar/issues/7837) was picked up with a new volunteer working on it;
* [Support basic-authentication in function url](https://github.com/apache/pulsar/issues/19910) refers to a closed issue and supersedes it.

### Finding an Issue You Can Help With

If you want to help with triaging, you might also want to search for issues in modules for which you have a working knowledge. Search for the name of a module in the issue tracker, filter by `component/*` label, or use the [advanced search](https://github.com/search/advanced) to find these issues.
