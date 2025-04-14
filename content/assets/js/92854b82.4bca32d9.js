"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[68327],{52747:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"setup-git","title":"Setting up Git for maintenance of Pulsar","description":"Git configuration","source":"@site/contribute/setup-git.md","sourceDirName":".","slug":"/setup-git","permalink":"/contribute/setup-git","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/contribute/setup-git.md","tags":[],"version":"current","lastUpdatedBy":"dependabot[bot]","lastUpdatedAt":1744615114000,"frontMatter":{"id":"setup-git","title":"Setting up Git for maintenance of Pulsar"},"sidebar":"sidebarDevelopment","previous":{"title":"Setting up an IDE","permalink":"/contribute/setup-ide"},"next":{"title":"Debugging","permalink":"/contribute/setup-debugging"}}');var o=i(74848),l=i(28453);const s={id:"setup-git",title:"Setting up Git for maintenance of Pulsar"},r=void 0,a={},c=[{value:"Git configuration",id:"git-configuration",level:2},{value:"Tooling",id:"tooling",level:3},{value:"Install <code>gh</code> command line tool for GitHub",id:"install-gh-command-line-tool-for-github",level:4},{value:"Optional: Install <code>tig</code> command line UI for git",id:"optional-install-tig-command-line-ui-for-git",level:4},{value:"Git configuration tuning",id:"git-configuration-tuning",level:3},{value:"Checking out each Pulsar maintenance branch in a separate working directory",id:"checking-out-each-pulsar-maintenance-branch-in-a-separate-working-directory",level:3},{value:"Merge conflict resolution tooling",id:"mergetool",level:2},{value:"kdiff3 configuration on MacOS",id:"kdiff3-configuration-on-macos",level:3},{value:"kdiff3 configuration on Linux",id:"kdiff3-configuration-on-linux",level:3},{value:"Using the mergetool kdiff3",id:"using-the-mergetool-kdiff3",level:3},{value:"Git revert and commit amending tooling",id:"git-revert-and-commit-amending-tooling",level:3},{value:"Using IntelliJ for cherry-picking and merge conflict resolution.",id:"using-intellij-for-cherry-picking-and-merge-conflict-resolution",level:3},{value:"Useful links",id:"useful-links",level:3}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{id:"git-configuration",children:"Git configuration"}),"\n",(0,o.jsx)(n.h3,{id:"tooling",children:"Tooling"}),"\n",(0,o.jsxs)(n.h4,{id:"install-gh-command-line-tool-for-github",children:["Install ",(0,o.jsx)(n.code,{children:"gh"})," command line tool for GitHub"]}),"\n",(0,o.jsxs)(n.p,{children:["Installing with ",(0,o.jsx)(n.code,{children:"brew"}),", for other package managers, follow instructions at ",(0,o.jsx)(n.a,{href:"https://cli.github.com/",children:"https://cli.github.com/"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"brew install gh\n"})}),"\n",(0,o.jsx)(n.p,{children:"After installing authenticate to GitHub"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"gh auth login\n"})}),"\n",(0,o.jsxs)(n.h4,{id:"optional-install-tig-command-line-ui-for-git",children:["Optional: Install ",(0,o.jsx)(n.code,{children:"tig"})," command line UI for git"]}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"tig"})," is handy for viewing the git log and it can also be used for staging files and assisting with ",(0,o.jsx)(n.code,{children:"git"})," command line usage."]}),"\n",(0,o.jsx)(n.p,{children:"MacOS"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"brew install tig\n"})}),"\n",(0,o.jsx)(n.p,{children:"Ubuntu Linux"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"sudo apt install tig\n"})}),"\n",(0,o.jsxs)(n.p,{children:["There are also other more feature rich alternatives such as ",(0,o.jsx)(n.a,{href:"https://github.com/extrawurst/gitui",children:(0,o.jsx)(n.code,{children:"gitui"})})," or ",(0,o.jsx)(n.a,{href:"https://github.com/jesseduffield/lazygit",children:(0,o.jsx)(n.code,{children:"lazygit"})}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"git-configuration-tuning",children:"Git configuration tuning"}),"\n",(0,o.jsx)(n.p,{children:"Increase default renamed file detection limit with mergetool and difftool"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"git config --global merge.renameLimit 2048\ngit config --global diff.renameLimit 2048\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Enable ",(0,o.jsx)(n.a,{href:"https://git-scm.com/book/en/v2/Git-Tools-Rerere",children:"rerere"}),', "reuse recorded resolution" for Git.']}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"git config --global rerere.enabled true\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Notice! In some cases, it might be useful to disable rerere after an invalid merge resolution. In that case you will need to use ",(0,o.jsx)(n.code,{children:"git rerere forget file"})," to forget the merge result."]}),"\n",(0,o.jsx)(n.h3,{id:"checking-out-each-pulsar-maintenance-branch-in-a-separate-working-directory",children:"Checking out each Pulsar maintenance branch in a separate working directory"}),"\n",(0,o.jsx)(n.p,{children:"For maintaining Pulsar, it is handy to have all maintenance branches checked out in separate working directories"}),"\n",(0,o.jsx)(n.p,{children:"Check out Pulsar repository"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:'# assuming that GitHub autentication has been configured with "gh auth login"\ngit checkout https://github.com/apache/pulsar\ncd pulsar\n# add your forked repository as a remote, you can have your own preferences how to name the remotes\ngit remote add forked https://github.com/your_github_id/pulsar\n'})}),"\n",(0,o.jsx)(n.p,{children:"Add separate working directories that share the local git repository"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"for branch in branch-3.3 branch-3.2 branch-3.1 branch-3.0; do \n   git worktree add ../pulsar-$branch $branch\ndone\n"})}),"\n",(0,o.jsxs)(n.p,{children:["After this you would have these directories in the same level as the original checked out ",(0,o.jsx)(n.code,{children:"pulsar"})," directory:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"pulsar-branch-3.3\npulsar-branch-3.2\npulsar-branch-3.1\npulsar-branch-3.0\n"})}),"\n",(0,o.jsxs)(n.p,{children:["There a limitation that each branch can only be checked out in one working directory at a time. If that becomes a problem you could temporarily detach the current branch in the working directory with ",(0,o.jsx)(n.code,{children:"git commit --detach HEAD"})," command."]}),"\n",(0,o.jsx)(n.h2,{id:"mergetool",children:"Merge conflict resolution tooling"}),"\n",(0,o.jsx)(n.p,{children:"For Apache Pulsar core developers, handling git merge conflict resolution is necessary.\nTo efficiently resolve merge conflicts, setting up tools that assist in visualizing these conflicts and resolving them is essential."}),"\n",(0,o.jsx)(n.p,{children:"For developers starting to use automated tools to resolve merge conflicts during cherry-picking, IntelliJ is a recommended option. It offers excellent tooling, but its integration with a command-line workflow is not seamless. It performs well when you initiate the cherry-picking process in IntelliJ and handle the merge conflict resolution within the same environment. However, resolving a merge conflict often involves multiple steps, including reverting and amending changes until a satisfactory resolution is achieved. In many cases, using a combination of tools may be more effective than relying solely on IntelliJ for all required operations."}),"\n",(0,o.jsxs)(n.p,{children:["For more advanced users who use ",(0,o.jsx)(n.code,{children:"git"})," on the command line, setting up the ",(0,o.jsx)(n.code,{children:"git mergetool"})," is recommended.\nHere's an example of how to set up ",(0,o.jsx)(n.code,{children:"kdiff3"})," as a mergetool."]}),"\n",(0,o.jsx)(n.h3,{id:"kdiff3-configuration-on-macos",children:"kdiff3 configuration on MacOS"}),"\n",(0,o.jsxs)(n.p,{children:["Install ",(0,o.jsx)(n.code,{children:"kdiff3"}),"'s cask version with ",(0,o.jsx)(n.code,{children:"brew"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"# important! install the cask version of kdiff3\nbrew install --cask kdiff3\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Configure ",(0,o.jsx)(n.code,{children:"kdiff3"})," as the mergetool and difftool of git"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"git config --global mergetool.kdiff3.path /Applications/kdiff3.app/Contents/MacOS/kdiff3\ngit config --global mergetool.kdiff3.args '$base $local $other -o $output'\ngit config --global mergetool.kdiff3.trustExitCode false\ngit config --global merge.tool kdiff3\ngit config --global difftool.kdiff3.path /Applications/kdiff3.app/Contents/MacOS/kdiff3\ngit config --global difftool.kdiff3.args '$base $local $other -o $output'\ngit config --global difftool.kdiff3.trustExitCode false\ngit config --global diff.guitool kdiff3\n"})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"kdiff3"})," version 1.11.1 contains ",(0,o.jsx)(n.a,{href:"https://bugs.kde.org/show_bug.cgi?id=487338",children:"bug #487338"}),". You might want to install kdiff3 1.10.7 from ",(0,o.jsx)(n.a,{href:"https://download.kde.org/stable/kdiff3/",children:"https://download.kde.org/stable/kdiff3/"})," until the issue is resolved."]}),"\n",(0,o.jsx)(n.h3,{id:"kdiff3-configuration-on-linux",children:"kdiff3 configuration on Linux"}),"\n",(0,o.jsxs)(n.p,{children:["Install ",(0,o.jsx)(n.code,{children:"kdiff3"})," from your package manager. For example, on Ubuntu:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"sudo apt install kdiff3\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Configure ",(0,o.jsx)(n.code,{children:"kdiff3"})," as the mergetool and difftool of git"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"git config --global mergetool.kdiff3.path /usr/bin/kdiff3\ngit config --global merge.tool kdiff3\ngit config --global difftool.kdiff3.path /usr/bin/kdiff3\ngit config --global diff.guitool kdiff3\n"})}),"\n",(0,o.jsx)(n.h3,{id:"using-the-mergetool-kdiff3",children:"Using the mergetool kdiff3"}),"\n",(0,o.jsxs)(n.p,{children:["If any merge conflicts arise after a cherry-pick, merge, or rebase, you should run ",(0,o.jsx)(n.code,{children:"git mergetool"})," to resolve them.\nYou can run ",(0,o.jsx)(n.code,{children:"git mergetool"})," anytime, as the command will return when there are no conflicts to resolve."]}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"kdiff3"})," tool isn't the most user-friendly tool, and it takes time to get accustomed to its workings.\nThere's commentary on mergetools ",(0,o.jsx)(n.a,{href:"https://www.eseth.org/2020/mergetools.html",children:"in this blog post"})," that could help\nyou understand what the tools do and how merges are visualized in different tools.\nOne of the advantages of ",(0,o.jsx)(n.code,{children:"kdiff3"})," is that it contains a custom merge algorithm which can resolve some conflicts\nwithout requiring a choice. In some cases, there may be chances for mistakes, but these are rare and could also occur when\nmanually choosing the resolution. The resolution will need to be verified in any case."]}),"\n",(0,o.jsxs)(n.p,{children:["Tips for Using ",(0,o.jsx)(n.code,{children:"kdiff3"})]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["When the merge conflict resolution process begins, a view with three panes and a split pane at the bottom of the window will appear.","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:'The left pane displays the diff from the common version of the file. This can be confusing and is often not very useful. You can hide it by deselecting "Window -> Show Window A".'}),"\n",(0,o.jsx)(n.li,{children:"The middle pane shows the local version."}),"\n",(0,o.jsx)(n.li,{children:"The right pane shows the remote version."}),"\n",(0,o.jsx)(n.li,{children:"The bottom pane is the output, which is the result of the merge. You can also make manual edits in this pane to resolve conflicts manually."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["It's beneficial to learn how to navigate to the next and previous merge conflict and how to choose the resolution using keyboard shortcuts.","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"On MacOS, you may need to remap some of the keyboard shortcuts to improve usability. This is especially necessary when using an external keyboard."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"git-revert-and-commit-amending-tooling",children:"Git revert and commit amending tooling"}),"\n",(0,o.jsx)(n.p,{children:"Resolving merge conflicts can sometimes be more complex with merge tools than simply reverting some changes and modifying the original source code in an IDE. This process may involve multiple steps, including reverting and amending changes to the merge commit. The merge commit should also incorporate the necessary changes for backporting.\nIn many cases, it is also necessary to fix the import statements in an IDE and amending those changes to the merge commit."}),"\n",(0,o.jsxs)(n.p,{children:["For this purpose, the ",(0,o.jsx)(n.code,{children:"git gui"})," tool is excellent. It allows for partial reverts to previous commits and makes it easy to amend additional changes to the latest commit, all with clear visualization."]}),"\n",(0,o.jsxs)(n.p,{children:["Installing the ",(0,o.jsx)(n.code,{children:"git gui"})," tool:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"# on MacOS\nbrew install git-gui\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:'# on Linux install "git-gui" from your package manager, example of Ubuntu\nsudo apt install git-gui\n'})}),"\n",(0,o.jsxs)(n.p,{children:["There are many tools available for this purpose, but ",(0,o.jsx)(n.code,{children:"git gui"})," is one of the simplest and most effective."]}),"\n",(0,o.jsx)(n.h3,{id:"using-intellij-for-cherry-picking-and-merge-conflict-resolution",children:"Using IntelliJ for cherry-picking and merge conflict resolution."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://www.jetbrains.com/help/idea/apply-changes-from-one-branch-to-another.html#cherry-pick",children:"Cherry-pick separate commits"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://www.youtube.com/watch?v=mSfq1SoMocg",children:"Resolving Git Merge Conflicts: The Easy Way"})}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"useful-links",children:"Useful links"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://www.eseth.org/2020/mergetools.html",children:"Comparison of git mergetools"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Comparison_of_file_comparison_tools#General",children:"Comparison of file comparison tools"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://git-scm.com/downloads/guis",children:"Git GUI Clients"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>s,x:()=>r});var t=i(96540);const o={},l=t.createContext(o);function s(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);