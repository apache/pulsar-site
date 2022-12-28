---
id: personal-ci
title: Personal CI
---

Pulsar CI is currently hosted on Apache Infra resources. Since we cannot add more resources to Pulsar CI, we need to find other ways to reduce the load on Pulsar CI.

After [PR-17693](https://github.com/apache/pulsar/pull/17693) merged, any pull request directly sent to `apache/pulsar` won't be triggered anymore.

That said, pull requests should be first tested in your own fork. GitHub Actions provides separate quota for pull requests that are executed in a forked repository.

## CI workflows in a fork

Here are instructions to use your personal CI on GitHub:

1. Push your intended pull request changes to a new branch in your fork (the usual way you do it).
2. Open a pull request to your own fork.

Below are the instructions for command-line interface.

Firstly, install [GitHub CLI](https://cli.github.com/) and configure it. With GitHub CLI, there's an easy way to open the PR to your own fork with a single command:

```bash
gh pr create --repo=<your-github-id>/pulsar --base master --head <your-pr-branch> -f
```

Alternatively, you can also create a PR to your own fork in the GitHub UI when opening a new PR. To do so, first click on "compare across forks" and then choose your own fork as both the forked repository and head repository.

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

The SSH access is secured with the SSH key registered in GitHub. For example, your public keys are https://github.com/horizonzy.keys. You will first have to register an SSH public key in GitHub for that to work.
