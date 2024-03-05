---
id: setup-mergetool
title: Setting up Git mergetool
---

## Merge conflict resolution tooling

For Apache Pulsar core developers, handling git merge conflict resolution is necessary. 
To efficiently resolve merge conflicts, setting up tools that assist in visualizing these conflicts and resolving them is essential. 
A great comparison of various mergetools can be found [in this blog post](https://www.eseth.org/2020/mergetools.html).

Here's an example of how to set up kdiff3 as a mergetool.

### kdiff3 configuration on MacOS

Install `kdiff3`'s cask version with `brew`:
```shell
# important! install the cask version of kdiff3
brew install --cask kdiff3
```

Configure `kdiff3` as the mergetool and difftool of git
```shell
git config --global mergetool.kdiff3.path /Applications/kdiff3.app/Contents/MacOS/kdiff3
git config --global mergetool.kdiff3.args '$base $local $other -o $output'
git config --global mergetool.kdiff3.trustExistCode false
git config --global merge.tool kdiff3
git config --global difftool.kdiff3.path /Applications/kdiff3.app/Contents/MacOS/kdiff3
git config --global difftool.kdiff3.args '$base $local $other -o $output'
git config --global difftool.kdiff3.trustExistCode false
git config --global diff.guitool=kdiff3
```

### kdiff3 configuration on Linux

Install `kdiff3` from your package manager. For example, on Ubuntu:
```shell
sudo apt install kdiff3
```

Configure `kdiff3` as the mergetool and difftool of git
```shell
git config --global mergetool.kdiff3.path /usr/bin/kdiff3
git config --global merge.tool kdiff3
git config --global difftool.kdiff3.path /usr/bin/kdiff3
git config --global diff.guitool=kdiff3
```

### Using the mergetool kdiff3

If any merge conflicts arise after a cherry-pick, merge, or rebase, you should run `git mergetool` to resolve them.
You can run `git mergetool` anytime, as the command will return when there are no conflicts to resolve.

The `kdiff3` tool isn't the most user-friendly tool, and it takes time to get accustomed to its workings.
There's commentary on mergetools [in this blog post](https://www.eseth.org/2020/mergetools.html) that could help
you understand what the tools do and how merges are visualized in different tools.
One of the advantages of `kdiff3` is that it contains a custom merge algorithm which can resolve some conflicts 
without requiring a choice. In some cases, there may be chances for mistakes, but these are rare and could also occur when
manually choosing the resolution. The resolution will need to be verified in any case.

### Git revert and commit amending tooling

When resolving merge conflicts, using merge tooling might be more tedious than reverting some changes and making modifications to the original source code in an IDE.

For this purpose, the `git gui` tool is excellent. It allows for partial reverts to previous commits and makes it easy to amend additional changes to the latest commit, all with clear visualization.

Installing the `git gui` tool:

```shell
# on MacOS
brew install git-gui
```

```shell
# on Linux install "git-gui" from your package manager, example of Ubuntu
sudo apt install git-gui
```

There are many tools available for this purpose, but `git gui` is one of the simplest and most effective.

### Useful links

- [Comparison of file comparison tools](https://en.wikipedia.org/wiki/Comparison_of_file_comparison_tools#General)
- [Git GUI Clients](https://git-scm.com/downloads/guis)


