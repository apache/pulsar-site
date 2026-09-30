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
1. Keep your local `master` up-to-date with `apache/pulsar` and rebase your feature branch on it.
2. Push the feature branch to your fork to trigger CI runs there. CI runs against the PR opened in your own fork (it is normal to have a PR open in the fork *and* a PR for the same branch open in `apache/pulsar` at the same time).
3. Monitor CI status on the fork and fix failures.
4. Open the PR to `apache/pulsar` only after the fork's CI is green.

Once the PR to `apache/pulsar` has been opened, stop rebasing as part of this loop: bring in upstream changes by merging `apache/pulsar` `master` into the PR branch instead. Rebasing a PR branch once the PR is open rewrites history and disrupts reviewers. See [`CONTRIBUTING.md` → Pull requests](https://github.com/apache/pulsar/blob/master/CONTRIBUTING.md#pull-requests).

Some important notes about testing:
- Pulsar has known [flaky tests](https://github.com/apache/pulsar/issues?q=is%3Aissue%20state%3Aopen%20flaky-test) that may require multiple CI runs
- In your own fork, use the "Rerun failed jobs" button in GitHub Actions to retry failed workflows. On a PR in `apache/pulsar`, comment `/pulsarbot rerun` to re-run the failed jobs once the workflow run has completed — don't push empty "trigger CI" commits.
- For test failures related to your changes, debug locally by running specific tests in your IDE or with a scoped `./gradlew :<module>:test --tests "..."` run (see [Setup and building](setup-building.md))

Critical requirement: Always create pull requests from a unique feature branch, not from your fork's `master` branch. The Personal CI process only works with feature branches.
For example:
- ✅ Create branch `feature-xyz` and open PR from it
- ❌ Opening a PR directly from your fork's `master` branch will not work

## CI workflows in a fork

Before using personal CI workflows, ensure GitHub Actions is enabled for your fork in the GitHub UI. You can check this under your fork's "Settings" > "Actions" > "General" tab.
Choose the "Allow all actions and reusable workflows" option. 
Note that some workflows, such as the required "Pulsar CI" and "Pulsar CI Flaky", may still be disabled by default and must be enabled explicitly. After enabling Actions for your forked repository, you can find these workflows in the "Actions" tab. To enable a workflow, select it from the left-hand sidebar and then click the "Enable workflow" button.

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

## Runner memory and restricted repositories

The readiness check in `apache/pulsar` stops CI for draft PRs and PRs above the bottom of a stack. These changes can still run in your fork. See the [`ready-to-test` label](develop-labels.md#ready-to-test) for overrides and restarting a stopped run. The PR-title check also runs only in `apache/pulsar`; a successful fork run does not validate the upstream PR title.

On Linux runners with up to 8 GiB of physical RAM, Pulsar's `setup-gradle` action automatically selects a smaller memory profile: a 2 GiB Gradle heap, two workers across projects, up to two test forks per task, and worker recycling after 50 detected test classes. Task-specific limits still apply. The action's `memory-profile` input accepts `auto`, `low-memory`, or `standard`; `standard` leaves memory settings unchanged.

Develocity injection and build-scan publishing are disabled when the workflow repository is private or its visibility is unavailable. A public repository can disable them with `build-scan-publish: 'false'` on the action. Private repositories with GitHub Code Security enabled can opt in to CodeQL with the repository variable `CI_ENABLE_CODEQL=true`.

The workflows declare their required token permissions. Organization policies and restrictions on fork pull-request tokens still apply. For local test memory limits and worker recycling options, see [Running tests](https://github.com/apache/pulsar/blob/master/CONTRIBUTING.md#running-tests).

## Inspect failed test reports

Download the failed job's `*-test-reports` artifact and extract the whole archive, preserving its directories. XML results are collected under `test-reports/`, and Gradle HTML reports retain their module paths under `build/reports/tests/`. When standard module test reports are present, `test-reports/index.html` links to them. The separate `*-dumps` artifact can include JVM thread dumps under `build/threaddumps/`, heap dumps, and crash files.

## Stay in-sync with upstream

It's worth keeping your master branch in sync with apache/pulsar's master (the upstream) so that the diff of PR will be reasonable in your own fork.

Read more about the instructions to sync a fork from the WebUI, from the GitHub CI, or from the command line at [Syncing a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

## SSH to CI jobs

Personal CI can provide SSH access to the build VM while a job is running.

SSH is enabled by default for public workflow repositories and disabled for private, internal, or unknown visibility. Set the repository variable `CI_ENABLE_SSH` to `true` or `false` to override that default; `false` also disables the SSH wait step. The workflow's event conditions and SSH-key restrictions still apply.

The [pulsar-ci.yaml](https://github.com/apache/pulsar/blob/master/.github/workflows/pulsar-ci.yaml) workflow enables the action for fork pull requests and restricts access to the actor's keys:

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
