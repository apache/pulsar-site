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

### Finding an Issue You Can Help With

If you want to help with triaging, you might also want to search for issues in modules for which you have a working knowledge. Search for the name of a module in the issue tracker, filter by `component/*` label, or use the [advanced search](https://github.com/search/advanced) to find these issues.
