---
id: personal-ci
title: Personal CI
---

Pulsar CI is currently hosted on Apache Infra resources. Since we cannot add more resources to Pulsar CI, we need to find other ways to reduce the load on Pulsar CI.

After [PR-17693](https://github.com/apache/pulsar/pull/17693) merged, any pull request directly sent to `apache/pulsar` won't be triggered anymore.

That said, pull requests should be first tested in your own fork. GitHub Actions provides separate quota for pull requests that are executed in a forked repository.

## Run CI in fork

Here are instructions to use your personal CI on GitHub:

1. Push your intended pull request changes to a new branch in your fork (the usual way you do it).
2. Open a pull request to your own fork.

These are the instructions for command-line interface:

Install [GitHub CLI](https://cli.github.com/) and configure it. With GitHub CLI, there's an easy way to open the PR to your own fork with a single command:

```bash
gh pr create --repo=<your-github-id>/pulsar --base master --head <your-pr-branch> -f
```

Alternatively, you can also create a PR to your own fork in the GitHub UI when opening a new PR. To do so, first click on "compare across forks" and then choose your own fork as both the forked repository and head repository.

## Stay in-sync with upstream

It's worth keeping your master branch in sync with apache/pulsar's master so that the PR diff will be reasonable in your own fork.

Here's one way to sync your fork's master branch with apache/pulsar's master branch: Let's say you have git remotes called "upstream" for apache/pulsar and "forked" for your fork, with these commands, you synchronize your fork's remote master branch with apache/pulsar's master branch:

* replace "upstream" with the name of the git remote for apache/pulsar
* replace "forked" with the name of the git remote for your fork of pulsar

```bash
git fetch upstream
git push -f forked upstream/master:master
```

When you finally want to create a PR to apache/pulsar, it can be started from the command line (this will open a browser for filling in the PR details):

```bash
gh pr create --repo=apache/pulsar --base master --head <your-pr-branch> --web
```

## SSH to CI jobs

The additional benefit of the "Personal CI" is that you get SSH access to the build VMs when the build is running. That is handled by this logic in the [pulsar-ci.yaml](https://github.com/apache/pulsar/blob/master/.github/workflows/pulsar-ci.yaml) GitHub Actions workflow file:

```yaml
- name: Setup ssh access to build runner VM
  # ssh access is enabled for builds in own forks
  if: ${{ github.repository != 'apache/pulsar' && needs.changed_files_job.outputs.docs_only != 'true' }}
  uses: ./.github/actions/ssh-access
  with:
  limit-access-to-actor: true
```

... and [the inline composite action implementation](https://github.com/apache/pulsar/blob/master/.github/actions/ssh-access/action.yml). The SSH access is secured with the SSH key registered in GitHub. For example, your public keys are https://github.com/horizonzy.keys. You will first have to register an SSH public key in GitHub for that to work.
