---
id: personal-ci
title: Personal CI
---

Apache Pulsar's CI infrastructure runs on limited Apache Infrastructure resources. To optimize these resources and reduce CI queue times, contributors are strongly encouraged to use "Personal CI" by testing pull requests in their own forks first.

When you create a pull request from your fork, GitHub Actions provides a separate quota specifically for forked repository builds. This means:

1. You get immediate CI feedback without waiting for maintainer approval
2. Your CI runs don't consume the main Pulsar repository's CI resources
3. You can iterate and fix issues faster in your own environment

The workflow is simple:
1. Test your changes thoroughly in your fork using Personal CI
2. Once tests pass consistently, notify maintainers for final PR review

Some important notes about testing:
- Pulsar has known [flaky tests](https://github.com/apache/pulsar/issues?q=is%3Aissue%20state%3Aopen%20flaky-test) that may require multiple CI runs
- Use the "Rerun failed jobs" button in GitHub Actions to retry failed workflows
- For test failures related to your changes, debug locally by running specific tests in your IDE

Critical requirement: Always create pull requests from a unique feature branch, not from your fork's `master` branch. The Personal CI process only works with feature branches.
For example:
- ✅ Create branch `feature-xyz` and open PR from it
- ❌ Opening a PR directly from your fork's `master` branch will not work

## CI workflows in a fork

Before using personal CI workflows, ensure GitHub Actions is enabled for your fork in the GitHub UI. You can check this under your fork's "Settings" > "Actions" > "General" tab.
Choose the "Allow all actions and reusable workflows" option.

Here are the steps to use your personal CI on GitHub:

1. Push your intended pull request changes to a new branch in your fork (following the standard process).
2. Create a pull request targeting your own fork instead of the main repository.

You can create the pull request in two ways:

### Using GitHub CLI

First, install and configure the [GitHub CLI](https://cli.github.com/). Then use this single command to create a PR to your fork:

```bash
gh pr create --repo=<your-github-id>/pulsar --base master --head <your-pr-branch> -f
```

### Using GitHub Web Interface

Alternatively, you can create a PR to your own fork through the GitHub web interface:

1. When creating a new PR, select your fork as both the "base repository" and "head repository" in the dropdown menus.
2. Choose "master" as the "base" branch and your PR branch as the "compare" branch (should be the default)
3. Complete the PR creation process as normal

## Stay in-sync with upstream

It's worth keeping your master branch in sync with apache/pulsar's master (the upstream) so that the diff of PR will be reasonable in your own fork.

Read more about the instructions to sync a fork from the WebUI, from the GitHub CI, or from the command line at [Syncing a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

## SSH to CI jobs

The additional benefit of the "Personal CI" is that you get SSH access to the build VMs when the build is running. That is handled by this logic in the [pulsar-ci.yaml](https://github.com/apache/pulsar/blob/master/.github/workflows/pulsar-ci.yaml) GitHub Actions workflow file:

```yaml
- name: Setup ssh access to build runner VM
  # ssh access is enabled for builds in own forks
  if: ${{ github.repository != 'apache/pulsar' && github.event_name == 'pull_request' }}
  uses: ./.github/actions/ssh-access
  with:
    limit-access-to-actor: true
```

Here is [the inline `ssh-access` composite action implementation](https://github.com/apache/pulsar/blob/master/.github/actions/ssh-access/action.yml).

The SSH access is secured with the SSH key registered in GitHub. For example, your public keys are https://github.com/YOUR_GITHUB_ID.keys. You will first have to register an SSH public key in GitHub for that to work.
