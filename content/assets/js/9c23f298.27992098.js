"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[14841],{92007:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>d,default:()=>h,frontMatter:()=>l,metadata:()=>i,toc:()=>a});const i=JSON.parse('{"id":"develop-semantic-title","title":"Semantic pull request","description":"This guide explains why you need good PR titles and how you do write PR titles in Conventional Commits spec.","source":"@site/contribute/develop-semantic-title.md","sourceDirName":".","slug":"/develop-semantic-title","permalink":"/contribute/develop-semantic-title","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/contribute/develop-semantic-title.md","tags":[],"version":"current","lastUpdatedBy":"github-actions[bot]","lastUpdatedAt":1734745052000,"frontMatter":{"id":"develop-semantic-title","title":"Semantic pull request"},"sidebar":"sidebarDevelopment","previous":{"title":"Label strategy","permalink":"/contribute/develop-labels"},"next":{"title":"License header","permalink":"/contribute/testing-licenses"}}');var n=t(74848),r=t(28453);const l={id:"develop-semantic-title",title:"Semantic pull request"},d=void 0,c={},a=[{value:"Why do commit messages matter?",id:"why-do-commit-messages-matter",level:2},{value:"How to write good PR titles?",id:"how-to-write-good-pr-titles",level:2},{value:"Quick Examples",id:"quick-examples",level:3},{value:"Type",id:"type",level:3},{value:"Scope",id:"scope",level:3},{value:"Summary",id:"summary",level:3},{value:"Full examples",id:"full-examples",level:3}];function o(e){const s={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.p,{children:"This guide explains why you need good PR titles and how you do write PR titles in Conventional Commits spec."}),"\n",(0,n.jsx)(s.h2,{id:"why-do-commit-messages-matter",children:"Why do commit messages matter?"}),"\n",(0,n.jsx)(s.p,{children:'Since the Pulsar community uses "Squash and Merge", the commit message is effectively the same as the PR title.'}),"\n",(0,n.jsx)(s.p,{children:"Engineers and writers submit or review PRs almost every day."}),"\n",(0,n.jsx)(s.p,{children:"A PR title is a summary of your changes."}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Vague, boring, and unclear PR titles decrease team efficiency and productivity."}),"\n",(0,n.jsx)(s.li,{children:"PR titles should be engaging, easy to understand, and readable."}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"Good titles often bring many benefits, including but not limited to the following:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Speed up the review process.","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"You can tell from the title what changes the PR introduces."}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["Facilitate understanding of PR changes.","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"PR titles are shown on Pulsar release notes as items. Concise PR titles make your changes easier to understand."}),"\n",(0,n.jsx)(s.li,{children:"Especially when you read commit logs in command-line tools, clear commit messages show PR changes quickly."}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["Increase search efficiency.","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"You can skim through hundreds of commits and locate desired information quickly."}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["Remind you to think about your PR.","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["If you can not write a PR title in a simple way (for example, ",(0,n.jsx)(s.a,{href:"#type",children:"[type]"}),", ",(0,n.jsx)(s.a,{href:"#scope",children:"[scope]"}),", or ",(0,n.jsx)(s.a,{href:"#summary",children:"[summary]"}),"), or you need to use several types/scopes, consider whether your PR contains ",(0,n.jsx)(s.strong,{children:"too many"})," changes across various scopes. If so, consider splitting this big PR into several small PRs. In this way, you might get your PRs reviewed faster."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"how-to-write-good-pr-titles",children:"How to write good PR titles?"}),"\n",(0,n.jsx)(s.p,{children:"A PR title should be structured as follows:"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"Semantic Pull Request Title",src:t(48290).A+"",width:"1166",height:"660"})}),"\n",(0,n.jsxs)(s.p,{children:["The rule can be interpreted as: A good title = clear format (",(0,n.jsx)(s.a,{href:"#type",children:"type"})," and ",(0,n.jsx)(s.a,{href:"#scope",children:"scope"}),") + self-explanatory ",(0,n.jsx)(s.a,{href:"#summary",children:"summary"}),"."]}),"\n",(0,n.jsx)(s.h3,{id:"quick-examples",children:"Quick Examples"}),"\n",(0,n.jsx)(s.p,{children:"Here are some examples of unclear and good PR titles for your quick reference. Good PR titles are concise and self-explanatory since they tell you the changes in a clear and direct way."}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Vague (Bad)"}),(0,n.jsx)(s.th,{children:"Clear (Good)"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Producer getting producer busy is removing existing producer from list"}),(0,n.jsx)(s.td,{children:"[fix][broker] Active producers with the same name are no longer removed from the topic map"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Forbid to read other topic's data in managedLedger layer"}),(0,n.jsx)(s.td,{children:"[improve][broker] Consumers are not allowed to read data on topics to which they are not subscribed"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Fix kinesis sink backoff class not found"}),(0,n.jsx)(s.td,{children:"[improve][connector] xx connectors can now use the Kinesis Backoff class"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"K8s Function Name Length Check Allows Invalid StatefulSet"}),(0,n.jsx)(s.td,{children:"[improve][function] Function name length cannot exceed 52 characters when using Kubernetes runtime"})]})]})]}),"\n",(0,n.jsx)(s.p,{children:"Here are steps to self-review whether the PR title is good:"}),"\n",(0,n.jsxs)(s.ol,{children:["\n",(0,n.jsxs)(s.li,{children:["Select a ",(0,n.jsx)(s.a,{href:"#type",children:"type"}),"."]}),"\n",(0,n.jsxs)(s.li,{children:["Select a ",(0,n.jsx)(s.a,{href:"#scope",children:"scope"}),"."]}),"\n",(0,n.jsxs)(s.li,{children:["Write a ",(0,n.jsx)(s.a,{href:"#summary",children:"summary"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["For more examples with correct formats, see ",(0,n.jsx)(s.a,{href:"#full-examples",children:"Full examples"}),"."]}),"\n",(0,n.jsx)(s.h3,{id:"type",children:"Type"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"type"}),' is "what actions do you take".']}),"\n",(0,n.jsx)(s.p,{children:"It must be one of the following."}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Type"}),(0,n.jsx)(s.th,{children:"Label"}),(0,n.jsx)(s.th,{children:"What actions do you take?"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"cleanup"}),(0,n.jsx)(s.td,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar/labels/type%2Fcleanup",children:"type/cleanup"})}),(0,n.jsx)(s.td,{children:"Remove unused code or doc."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"improve"}),(0,n.jsx)(s.td,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar/labels/type%2Fimprovement",children:"type/improvement"})}),(0,n.jsx)(s.td,{children:"Submit enhancements that are neither new features nor bug fixes."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"feat"}),(0,n.jsx)(s.td,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar/labels/type%2Ffeature",children:"type/feature"})}),(0,n.jsx)(s.td,{children:"Submit new features."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fix"}),(0,n.jsx)(s.td,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar/labels/type%2Ffix",children:"type/fix"})}),(0,n.jsx)(s.td,{children:"Submit bug fixes."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"refactor"}),(0,n.jsx)(s.td,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar/labels/type%2Frefactor",children:"type/refactor"})}),(0,n.jsx)(s.td,{children:"Restructure existing code while preserving its external behavior."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"revert"}),(0,n.jsx)(s.td,{children:"N/A"}),(0,n.jsx)(s.td,{children:"Revert changes"})]})]})]}),"\n",(0,n.jsx)(s.admonition,{type:"note",children:(0,n.jsx)(s.p,{children:"Choose correct labels for your PR so that your PR will automatically go to the correct chapter in release notes. If you do not specify a type label, the PR might go to the wrong place or not be included in the release notes at all."})}),"\n",(0,n.jsx)(s.h3,{id:"scope",children:"Scope"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"scope"}),' is "where do you make changes".']}),"\n",(0,n.jsxs)(s.p,{children:["Scopes evolves along with development. You can check the latest valid scopes at the ",(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar/blob/master/.github/workflows/ci-semantic-pull-request.yml",children:"workflow file"}),"."]}),"\n",(0,n.jsx)(s.h3,{id:"summary",children:"Summary"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"Summary"})," is a single line that best sums up the changes made in the commit."]}),"\n",(0,n.jsx)(s.p,{children:"Follow the best practice below:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Keep the summary concise and descriptive."}),"\n",(0,n.jsx)(s.li,{children:"Use the second person and present tense."}),"\n",(0,n.jsxs)(s.li,{children:["Write ",(0,n.jsx)(s.a,{href:"https://www.grammarly.com/blog/sentence-fragment",children:"complete sentences"})," rather than fragments."]}),"\n",(0,n.jsx)(s.li,{children:"Capitalize the first letter."}),"\n",(0,n.jsx)(s.li,{children:"Limit the length to 50 characters."}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"Avoid some common bad cases:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Do not include back quotes (``)."}),"\n",(0,n.jsx)(s.li,{children:"Do not append period at the end."}),"\n",(0,n.jsxs)(s.li,{children:["Do not use ",(0,n.jsx)(s.a,{href:"https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword",children:"GitHub keywords"})," followed by an issue number. This information should be provided in PR descriptions or commit messages rather than in PR titles."]}),"\n"]}),"\n",(0,n.jsx)(s.admonition,{type:"note",children:(0,n.jsx)(s.p,{children:"If you cherry-pick changes to branches, name your PR title the same as the original PR title and label your PR with cherry-pick related labels."})}),"\n",(0,n.jsx)(s.h3,{id:"full-examples",children:"Full examples"}),"\n",(0,n.jsxs)(s.p,{children:["As explained in the ",(0,n.jsx)(s.a,{href:"#how-to-write-good-pr-titles",children:"How to write good PR titles"})," chapter: A good title = clear format (",(0,n.jsx)(s.a,{href:"#type",children:"type"})," and ",(0,n.jsx)(s.a,{href:"#scope",children:"scope"}),") + self-explanatory ",(0,n.jsx)(s.a,{href:"#summary",children:"summary"}),"."]}),"\n",(0,n.jsxs)(s.p,{children:["Here are some format examples. For self-explanatory summary examples, see ",(0,n.jsx)(s.a,{href:"#quick-examples",children:"Quick examples"}),"."]}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Changes"}),(0,n.jsx)(s.th,{children:"Unclear format (Bad)"}),(0,n.jsx)(s.th,{children:"Clear format (Good)"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Submit breaking changes"}),(0,n.jsx)(s.td,{children:"[Breaking change] xxx"}),(0,n.jsx)(s.td,{children:"[feat][broker]! Support xx"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Submit PIP changes"}),(0,n.jsx)(s.td,{children:"[PIP-198] Support xx"}),(0,n.jsx)(s.td,{children:"[feat][broker] PIP-198: Support xx"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Cherry pick changes"}),(0,n.jsx)(s.td,{children:"[Branch-2.9] Fix xxx issue."}),(0,n.jsx)(s.td,{children:"[fix][broker][branch-2.9] Fix xxx issue"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Revert changes"}),(0,n.jsx)(s.td,{children:"Revert xxx"}),(0,n.jsx)(s.td,{children:"[revert][broker] Revert changes about xxx"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Add features"}),(0,n.jsxs)(s.td,{children:[(0,n.jsx)("li",{children:"Adding xx feature"}),(0,n.jsx)("li",{children:"Support delete schema forcefully"})]}),(0,n.jsxs)(s.td,{children:[(0,n.jsx)("li",{children:"[feat][java client] Add xx feature"}),(0,n.jsx)("li",{children:"[feat][schema] Support xx"})]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Fix bugs"}),(0,n.jsx)(s.td,{children:"[Issue 14633][pulsar-broker] Fixed xxx"}),(0,n.jsx)(s.td,{children:"[fix][broker] Fix xxx"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Submit improvements"}),(0,n.jsxs)(s.td,{children:[(0,n.jsx)("li",{children:"Enhances xx"}),(0,n.jsx)("li",{children:"Bump netty version to 4.1.75"})]}),(0,n.jsxs)(s.td,{children:[(0,n.jsx)("li",{children:"[improve][sql] Improve xx performance"}),(0,n.jsx)("li",{children:"[improve][build] Bump Netty version to 4.1.75"})]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Update tests"}),(0,n.jsx)(s.td,{children:"reduce xx test flakiness"}),(0,n.jsx)(s.td,{children:"[improve][test] Reduce xxx flaky tests"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Update docs"}),(0,n.jsxs)(s.td,{children:[(0,n.jsx)("li",{children:"[Doc] add explanations for xxx"}),(0,n.jsx)("li",{children:"2.8.3 Release Notes"}),(0,n.jsx)("li",{children:"Fix typos in xx"})]}),(0,n.jsxs)(s.td,{children:[(0,n.jsx)("li",{children:"[feat][doc] Add explanations for xxx"}),(0,n.jsx)("li",{children:"[feat][doc] Add 2.8.3 release note"}),(0,n.jsx)("li",{children:"[fix][doc] Fix typos in xx"})]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Update website"}),(0,n.jsx)(s.td,{children:"[Website] adjust xxx"}),(0,n.jsx)(s.td,{children:"[improve][site] Adjust xxx"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Update instructions/guidelines"}),(0,n.jsx)(s.td,{children:"Update xxx guideline"}),(0,n.jsx)(s.td,{children:"[improve][doc] Update xx guidelines"})]})]})]})]})}function h(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}},48290:(e,s,t)=>{t.d(s,{A:()=>i});const i=t.p+"assets/images/semantic-pull-request-title-f097356caaf15d1d2a44af6515de8251.png"},28453:(e,s,t)=>{t.d(s,{R:()=>l,x:()=>d});var i=t(96540);const n={},r=i.createContext(n);function l(e){const s=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:l(e.components),i.createElement(r.Provider,{value:s},e.children)}}}]);