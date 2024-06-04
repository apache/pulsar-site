---
id: setup-mergetool
title: Setting up Git mergetool
---

## Merge conflict resolution tooling

For Apache Pulsar core developers, handling git merge conflict resolution is necessary. 
To efficiently resolve merge conflicts, setting up tools that assist in visualizing these conflicts and resolving them is essential. 

For developers starting to use automated tools to resolve merge conflicts during cherry-picking, IntelliJ is a recommended option. It offers excellent tooling, but its integration with a command-line workflow is not seamless. It performs well when you initiate the cherry-picking process in IntelliJ and handle the merge conflict resolution within the same environment. However, resolving a merge conflict often involves multiple steps, including reverting and amending changes until a satisfactory resolution is achieved. In many cases, using a combination of tools may be more effective than relying solely on IntelliJ for all required operations.

For more advanced users who use `git` on the command line, setting up the `git mergetool` is recommended. 
Here's an example of how to set up `kdiff3` as a mergetool.

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
git config --global mergetool.kdiff3.trustExitCode false
git config --global merge.tool kdiff3
git config --global difftool.kdiff3.path /Applications/kdiff3.app/Contents/MacOS/kdiff3
git config --global difftool.kdiff3.args '$base $local $other -o $output'
git config --global difftool.kdiff3.trustExitCode false
git config --global diff.guitool kdiff3
```

`kdiff3` version 1.11.1 contains [bug #487338](https://bugs.kde.org/show_bug.cgi?id=487338). You might want to install kdiff3 1.10.7 from https://download.kde.org/stable/kdiff3/ until the issue is resolved.


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
git config --global diff.guitool kdiff3
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

Tips for Using `kdiff3`
- When the merge conflict resolution process begins, a view with three panes and a split pane at the bottom of the window will appear.
    - The left pane displays the diff from the common version of the file. This can be confusing and is often not very useful. You can hide it by deselecting "Window -> Show Window A".
    - The middle pane shows the local version.
    - The right pane shows the remote version.
    - The bottom pane is the output, which is the result of the merge. You can also make manual edits in this pane to resolve conflicts manually.
- It's beneficial to learn how to navigate to the next and previous merge conflict and how to choose the resolution using keyboard shortcuts.
    - On MacOS, you may need to remap some of the keyboard shortcuts to improve usability. This is especially necessary when using an external keyboard.

### Git revert and commit amending tooling

Resolving merge conflicts can sometimes be more complex with merge tools than simply reverting some changes and modifying the original source code in an IDE. This process may involve multiple steps, including reverting and amending changes to the merge commit. The merge commit should also incorporate the necessary changes for backporting.
In many cases, it is also necessary to fix the import statements in an IDE and amending those changes to the merge commit.

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

### Using IntelliJ for cherry-picking and merge conflict resolution.

- [Cherry-pick separate commits](https://www.jetbrains.com/help/idea/apply-changes-from-one-branch-to-another.html#cherry-pick)
- [Resolving Git Merge Conflicts: The Easy Way](https://www.youtube.com/watch?v=mSfq1SoMocg)

### Useful links

- [Comparison of git mergetools](https://www.eseth.org/2020/mergetools.html)
- [Comparison of file comparison tools](https://en.wikipedia.org/wiki/Comparison_of_file_comparison_tools#General)
- [Git GUI Clients](https://git-scm.com/downloads/guis)