---
id: maintenance-process
title: Cherry-picking
---

The following maintenance tasks are performed by Apache Pulsar committers since they have access to these tasks.

## Labeling PRs for Release Branches

Before merging a PR, please ensure you label the releases where the PR should also be applied. Our current process involves adding release labels for the next pending releases so that we also cherry-pick fixes to maintenance branches.

Always label non-breaking fixes to the supported maintenance version branches. Check the [supported Pulsar versions page](https://pulsar.apache.org/contribute/release-policy/#supported-versions) to find out the currently supported branches and current versions. Pick the label for the next release. If the label is missing in GitHub, you should first add it.

For example, when the last release is `3.0.7` for `branch-3.0`, the respective PR label for the next release is `release/3.0.8`.

These labels are crucial for searching PRs that need to be cherry-picked during the release process. Picking an outdated release label could cause the PR to be missed.

A bug fix PR should always be included in all maintenance branches of the [supported Pulsar versions](https://pulsar.apache.org/contribute/release-policy/#supported-versions). For example, it should be avoided to cherry-pick a fix to `branch-3.0` but skip it for `branch-3.3`.

New features (typically PIP implementations) should only be cherry-picked to a maintenance branch after opening a discussion on the [Pulsar dev mailing list](https://pulsar.apache.org/contact/#mailing-lists) and waiting for at least a lazy consensus decision. The [Pulsar Improvement Process (PIP)](https://github.com/apache/pulsar/tree/master/pip#pulsar-improvement-proposal-pip) mentions 48 hours as the voting time. The same minimum time should be held for lazy consensus decisions for adding PIPs to maintenance branches. There should be a clear reason why a feature needs to be added to a maintenance branch.

## Cherry-picking Process

### Current Process and Responsibilities

It's sufficient to add the labels while merging PRs. This is the expectation for the Apache Pulsar committer who merges a PR. A PR shouldn't be merged without checking that it contains the necessary labels.

Committers actively working as release managers will handle cherry-picking and backporting.
Release managers will request specific backports when a PR cannot be easily backported due to merge conflicts.

### Cherry-picking

Cherry-picks should be performed in the same order as the PRs were merged into the master branch.
This is necessary to reduce unnecessary merge conflicts in maintenance branches.
Cherry-picking should retain a reference to the original commit. This can be achieved by passing the `-x` argument so that cherry-picks are performed with the `git cherry-pick -x <commit hash>` command.

#### Handling Merge Conflicts

Merge conflicts are common, and it's necessary to understand the tooling and process to handle conflict resolution. Please refer to suggestions in [setting up git with proper merge & diff tools for maintaining Pulsar](setup-git.md).

In cases where a PR cannot be applied without substantial backporting effort or risk of breaking changes, a separate PR to the maintenance branch is requested from the original PR author. If the author is not willing to do this work, the release manager attempts to find a volunteer to handle this.

In some cases, a large number of merge conflicts signal that there's a dependent PR that is also needed in the maintenance branch which hasn't been cherry-picked. It is useful to review the dependency and consider cherry-picking it. Only non-breaking bug fixes or minor improvements (excluding PIP-related changes) can be cherry-picked without discussion on the dev mailing list. Backporting is necessary when a fix depends on newer PIP-related changes.

#### Cherry-picking Changes Scheduled for the Release

Before proceeding, ensure that you have [set up a Git mergetool](setup-git.md#mergetool). This tool is essential for resolving merge conflicts that may arise during the cherry-picking process.

Use a search such as `is:merged is:pr label:release/3.0.8 -label:cherry-picked/branch-3.0` to search for merged PRs that are scheduled for the release but haven't yet been cherry-picked.
It is necessary to handle cherry-picks in the same order as they have been merged into the master branch. Otherwise, there will be unnecessary merge conflicts to resolve.

#### Cherry-picking CLI tooling

Here's a shell script where the output that will ease cherry-picking from master branch:
assumes `gawk` is gnu awk. install `brew install gawk` or `alias gawk=awk` on Linux.

```shell
UPSTREAM=origin
git fetch $UPSTREAM
RELEASE_NUMBER=3.0.8
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

```shell
0fa9572f8af [fix][broker] Fix AvgShedder strategy check (#23156) https://github.com/apache/pulsar/pull/23156
** Not cherry-picked from origin/master **
806fdf86866 [improve][misc] Upgrade Jetty to 9.4.56.v20240826 (#23405) https://github.com/apache/pulsar/pull/23405
Check https://github.com/apache/pulsar/pulls?q=is:pr+is:merged+label:release/3.0.8+-label:cherry-picked/branch-3.0
```

It will speed up cherry-picking since you commit ids are there and there's also links to the PRs.
A cherry-pick should be done in this order with `git cherry-pick -x COMMIT_ID`.
It's possible that some dependent commits are necessary to be cherry-picked when you encounter a lot of merge conflicts in a case where they aren't expected.

There are more advanced versions of the cherry-picking CLI tooling in [lhotari's `pulsar-contributor-toolbox-functions.sh` shell script function library](https://github.com/lhotari/pulsar-contributor-toolbox/blob/0272419e70a9fc5f14945717bac964bda355520b/functions/pulsar-contributor-toolbox-functions.sh#L1393-L1455).