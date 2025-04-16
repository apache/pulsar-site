"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[44610],{76243:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>o,contentTitle:()=>c,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"maintenance-process","title":"Cherry-picking","description":"The following maintenance tasks are performed by Apache Pulsar committers since they have access to these tasks.","source":"@site/contribute/maintenance-process.md","sourceDirName":".","slug":"/maintenance-process","permalink":"/contribute/maintenance-process","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/contribute/maintenance-process.md","tags":[],"version":"current","lastUpdatedBy":"github-actions[bot]","lastUpdatedAt":1744681002000,"frontMatter":{"id":"maintenance-process","title":"Cherry-picking"},"sidebar":"sidebarDevelopment","previous":{"title":"Writing release notes","permalink":"/contribute/release-note-guide"},"next":{"title":"Validating release candidates","permalink":"/contribute/validate-release-candidate"}}');var t=n(74848),i=n(28453);const a={id:"maintenance-process",title:"Cherry-picking"},c=void 0,o={},l=[{value:"Labeling PRs for Release Branches",id:"labeling-prs-for-release-branches",level:2},{value:"Cherry-picking Process",id:"cherry-picking-process",level:2},{value:"Current Process and Responsibilities",id:"current-process-and-responsibilities",level:3},{value:"Cherry-picking",id:"cherry-picking",level:3},{value:"Handling Merge Conflicts",id:"handling-merge-conflicts",level:4},{value:"Cherry-picking Changes Scheduled for the Release",id:"cherry-picking-changes-scheduled-for-the-release",level:4},{value:"Cherry-picking CLI tooling",id:"cherry-picking-cli-tooling",level:4}];function h(e){const r={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.p,{children:"The following maintenance tasks are performed by Apache Pulsar committers since they have access to these tasks."}),"\n",(0,t.jsx)(r.h2,{id:"labeling-prs-for-release-branches",children:"Labeling PRs for Release Branches"}),"\n",(0,t.jsx)(r.p,{children:"Before merging a PR, please ensure you label the releases where the PR should also be applied. Our current process involves adding release labels for the next pending releases so that we also cherry-pick fixes to maintenance branches."}),"\n",(0,t.jsxs)(r.p,{children:["Always label non-breaking fixes to the supported maintenance version branches. Check the ",(0,t.jsx)(r.a,{href:"https://pulsar.apache.org/contribute/release-policy/#supported-versions",children:"supported Pulsar versions page"})," to find out the currently supported branches and current versions. Pick the label for the next release. If the label is missing in GitHub, you should first add it."]}),"\n",(0,t.jsxs)(r.p,{children:["For example, when the last release is ",(0,t.jsx)(r.code,{children:"3.0.7"})," for ",(0,t.jsx)(r.code,{children:"branch-3.0"}),", the respective PR label for the next release is ",(0,t.jsx)(r.code,{children:"release/3.0.8"}),"."]}),"\n",(0,t.jsx)(r.p,{children:"These labels are crucial for searching PRs that need to be cherry-picked during the release process. Picking an outdated release label could cause the PR to be missed."}),"\n",(0,t.jsxs)(r.p,{children:["A bug fix PR should always be included in all maintenance branches of the ",(0,t.jsx)(r.a,{href:"https://pulsar.apache.org/contribute/release-policy/#supported-versions",children:"supported Pulsar versions"}),". For example, it should be avoided to cherry-pick a fix to ",(0,t.jsx)(r.code,{children:"branch-3.0"})," but skip it for ",(0,t.jsx)(r.code,{children:"branch-3.3"}),"."]}),"\n",(0,t.jsxs)(r.p,{children:["New features (typically PIP implementations) should only be cherry-picked to a maintenance branch after opening a discussion on the ",(0,t.jsx)(r.a,{href:"https://pulsar.apache.org/contact/#mailing-lists",children:"Pulsar dev mailing list"})," and waiting for at least a lazy consensus decision. The ",(0,t.jsx)(r.a,{href:"https://github.com/apache/pulsar/tree/master/pip#pulsar-improvement-proposal-pip",children:"Pulsar Improvement Process (PIP)"})," mentions 48 hours as the voting time. The same minimum time should be held for lazy consensus decisions for adding PIPs to maintenance branches. There should be a clear reason why a feature needs to be added to a maintenance branch."]}),"\n",(0,t.jsx)(r.h2,{id:"cherry-picking-process",children:"Cherry-picking Process"}),"\n",(0,t.jsx)(r.h3,{id:"current-process-and-responsibilities",children:"Current Process and Responsibilities"}),"\n",(0,t.jsx)(r.p,{children:"It's sufficient to add the labels while merging PRs. This is the expectation for the Apache Pulsar committer who merges a PR. A PR shouldn't be merged without checking that it contains the necessary labels."}),"\n",(0,t.jsx)(r.p,{children:"Committers actively working as release managers will handle cherry-picking and backporting.\nRelease managers will request specific backports when a PR cannot be easily backported due to merge conflicts."}),"\n",(0,t.jsx)(r.h3,{id:"cherry-picking",children:"Cherry-picking"}),"\n",(0,t.jsxs)(r.p,{children:["Cherry-picks should be performed in the same order as the PRs were merged into the master branch.\nThis is necessary to reduce unnecessary merge conflicts in maintenance branches.\nCherry-picking should retain a reference to the original commit. This can be achieved by passing the ",(0,t.jsx)(r.code,{children:"-x"})," argument so that cherry-picks are performed with the ",(0,t.jsx)(r.code,{children:"git cherry-pick -x <commit hash>"})," command."]}),"\n",(0,t.jsx)(r.h4,{id:"handling-merge-conflicts",children:"Handling Merge Conflicts"}),"\n",(0,t.jsxs)(r.p,{children:["Merge conflicts are common, and it's necessary to understand the tooling and process to handle conflict resolution. Please refer to suggestions in ",(0,t.jsx)(r.a,{href:"/contribute/setup-git",children:"setting up git with proper merge & diff tools for maintaining Pulsar"}),"."]}),"\n",(0,t.jsx)(r.p,{children:"In cases where a PR cannot be applied without substantial backporting effort or risk of breaking changes, a separate PR to the maintenance branch is requested from the original PR author. If the author is not willing to do this work, the release manager attempts to find a volunteer to handle this."}),"\n",(0,t.jsx)(r.p,{children:"In some cases, a large number of merge conflicts signal that there's a dependent PR that is also needed in the maintenance branch which hasn't been cherry-picked. It is useful to review the dependency and consider cherry-picking it. Only non-breaking bug fixes or minor improvements (excluding PIP-related changes) can be cherry-picked without discussion on the dev mailing list. Backporting is necessary when a fix depends on newer PIP-related changes."}),"\n",(0,t.jsx)(r.h4,{id:"cherry-picking-changes-scheduled-for-the-release",children:"Cherry-picking Changes Scheduled for the Release"}),"\n",(0,t.jsxs)(r.p,{children:["Before proceeding, ensure that you have ",(0,t.jsx)(r.a,{href:"/contribute/setup-git#mergetool",children:"set up a Git mergetool"}),". This tool is essential for resolving merge conflicts that may arise during the cherry-picking process."]}),"\n",(0,t.jsxs)(r.p,{children:["Use a search such as ",(0,t.jsx)(r.code,{children:"is:merged is:pr label:release/3.0.8 -label:cherry-picked/branch-3.0"})," to search for merged PRs that are scheduled for the release but haven't yet been cherry-picked.\nIt is necessary to handle cherry-picks in the same order as they have been merged into the master branch. Otherwise, there will be unnecessary merge conflicts to resolve."]}),"\n",(0,t.jsx)(r.h4,{id:"cherry-picking-cli-tooling",children:"Cherry-picking CLI tooling"}),"\n",(0,t.jsxs)(r.p,{children:["Here's a shell script where the output that will ease cherry-picking from master branch:\nassumes ",(0,t.jsx)(r.code,{children:"gawk"})," is gnu awk. install ",(0,t.jsx)(r.code,{children:"brew install gawk"})," or ",(0,t.jsx)(r.code,{children:"alias gawk=awk"})," on Linux."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-shell",children:'UPSTREAM=origin\ngit fetch $UPSTREAM\nRELEASE_NUMBER=3.0.8\nRELEASE_BRANCH=branch-3.0\nPR_QUERY="is:merged label:release/$RELEASE_NUMBER -label:cherry-picked/$RELEASE_BRANCH"\nPR_NUMBERS=$(gh pr list -L 100 --search "$PR_QUERY" --json number --jq \'["#"+(.[].number|tostring)] | join("|")\')\nALREADY_PICKED=$(git log --oneline -P --grep="$PR_NUMBERS" --reverse $RELEASE_BRANCH | gawk \'match($0, /\\(#([0-9]+)\\)/, a) {print substr(a[0], 2, length(a[0])-2)}\' | tr \'\\n\' \'|\' | sed \'s/|$//\')\nif [[ -n "$ALREADY_PICKED" ]]; then\n  echo "** Already picked but not tagged as cherry-picked **"\n  git log --color --oneline -P --grep="$PR_NUMBERS" --reverse $RELEASE_BRANCH | gawk \'match($0, /\\(#([0-9]+)\\)/, a) {print $0 " https://github.com/apache/pulsar/pull/" substr(a[0], 3, length(a[0])-3)}\'\nfi\necho "** Not cherry-picked from $UPSTREAM/master **"\ngit log --color --oneline -P --grep="$PR_NUMBERS" --reverse $UPSTREAM/master | { [ -n "$ALREADY_PICKED" ] && grep --color -v -E "$ALREADY_PICKED" || cat; } | gawk \'match($0, /\\(#([0-9]+)\\)/, a) {print $0 " https://github.com/apache/pulsar/pull/" substr(a[0], 3, length(a[0])-3)}\'\necho "Check https://github.com/apache/pulsar/pulls?q=is:pr+$(echo "$PR_QUERY" | tr \' \' \'+\')"\n'})}),"\n",(0,t.jsx)(r.p,{children:"this produces an output such as:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-shell",children:"0fa9572f8af [fix][broker] Fix AvgShedder strategy check (#23156) https://github.com/apache/pulsar/pull/23156\n** Not cherry-picked from origin/master **\n806fdf86866 [improve][misc] Upgrade Jetty to 9.4.56.v20240826 (#23405) https://github.com/apache/pulsar/pull/23405\nCheck https://github.com/apache/pulsar/pulls?q=is:pr+is:merged+label:release/3.0.8+-label:cherry-picked/branch-3.0\n"})}),"\n",(0,t.jsxs)(r.p,{children:["It will speed up cherry-picking since you commit ids are there and there's also links to the PRs.\nA cherry-pick should be done in this order with ",(0,t.jsx)(r.code,{children:"git cherry-pick -x COMMIT_ID"}),".\nIt's possible that some dependent commits are necessary to be cherry-picked when you encounter a lot of merge conflicts in a case where they aren't expected."]}),"\n",(0,t.jsxs)(r.p,{children:["There are more advanced versions of the cherry-picking CLI tooling in ",(0,t.jsxs)(r.a,{href:"https://github.com/lhotari/pulsar-contributor-toolbox/blob/0272419e70a9fc5f14945717bac964bda355520b/functions/pulsar-contributor-toolbox-functions.sh#L1393-L1455",children:["lhotari's ",(0,t.jsx)(r.code,{children:"pulsar-contributor-toolbox-functions.sh"})," shell script function library"]}),"."]})]})}function d(e={}){const{wrapper:r}={...(0,i.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},28453:(e,r,n)=>{n.d(r,{R:()=>a,x:()=>c});var s=n(96540);const t={},i=s.createContext(t);function a(e){const r=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(i.Provider,{value:r},e.children)}}}]);