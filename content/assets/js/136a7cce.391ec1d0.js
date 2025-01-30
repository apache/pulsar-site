"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[96838],{95373:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>a,frontMatter:()=>c,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"develop-labels","title":"Label strategy","description":"This guide explains the labels used in the apache/pulsar repository (the main repo).","source":"@site/contribute/develop-labels.md","sourceDirName":".","slug":"/develop-labels","permalink":"/contribute/develop-labels","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/contribute/develop-labels.md","tags":[],"version":"current","lastUpdatedBy":"Yunze Xu","lastUpdatedAt":1737978039000,"frontMatter":{"id":"develop-labels","title":"Label strategy"},"sidebar":"sidebarDevelopment","previous":{"title":"Triaging an Issue","permalink":"/contribute/develop-triage"},"next":{"title":"Semantic pull request","permalink":"/contribute/develop-semantic-title"}}');var r=n(74848),d=n(28453);const c={id:"develop-labels",title:"Label strategy"},i=void 0,o={},l=[{value:"type/*",id:"type",level:2},{value:"component/*",id:"component",level:2},{value:"category/*",id:"category",level:2},{value:"ready-to-test",id:"ready-to-test",level:2},{value:"doc-*",id:"doc-",level:2},{value:"release/*",id:"release",level:2},{value:"cherry-picked/*",id:"cherry-picked",level:2}];function h(e){const t={a:"a",code:"code",h2:"h2",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,d.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["This guide explains the labels used in the ",(0,r.jsx)(t.a,{href:"http://github.com/apache/pulsar",children:"apache/pulsar"})," repository (the main repo)."]}),"\n",(0,r.jsx)(t.h2,{id:"type",children:"type/*"}),"\n",(0,r.jsx)(t.p,{children:"The type/* labels are mainly distinguish the issues and PRs are for bug reporting, bug fix, feature requests, feature support."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Label"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"type/cleanup"})}),(0,r.jsx)(t.td,{children:"Code or doc cleanups e.g. remove the outdated documentation or remove the code no longer in use"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"type/feature"})}),(0,r.jsx)(t.td,{children:"The PR added a new feature or issue requested a new feature"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"type/bug"})}),(0,r.jsx)(t.td,{children:"Your PR fixed a bug or issue reported a bug"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"type/refactor"})}),(0,r.jsx)(t.td,{children:"Code or doc refactors. e.g. refactor code structure or methods to improve code readability"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"type/enhancement"})}),(0,r.jsx)(t.td,{children:"The enhancements for the existing features or docs. e.g. reduce memory usage of the delayed messages"})]})]})]}),"\n",(0,r.jsx)(t.h2,{id:"component",children:"component/*"}),"\n",(0,r.jsx)(t.p,{children:"The component/* labels are indicating which component the issues or PRs have happened"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Label"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/function"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/broker"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/cli"})}),(0,r.jsx)(t.td,{children:"pulsar-admin, pulsar-client, pulsar-perf ..."})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/client"})}),(0,r.jsx)(t.td,{children:"Java client"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/proxy"})}),(0,r.jsx)(t.td,{children:"Pulsar proxy"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/tieredstorage"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/sql"})}),(0,r.jsx)(t.td,{children:"Pulsar SQL based on trino"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/transaction"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/schema"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/security"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/config"})}),(0,r.jsx)(t.td,{children:"Pulsar configurations"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/authentication"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/build"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/geo-replication"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/metrics"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/metadata"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/tool"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/admin"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/test"})}),(0,r.jsx)(t.td,{children:"Improve test coverage or enhance the test"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/ci"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/compaction"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/connector"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/websocket"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/ML"})}),(0,r.jsx)(t.td,{children:"Managed Ledger"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/authorization"})}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"component/dependency"})}),(0,r.jsx)(t.td,{})]})]})]}),"\n",(0,r.jsx)(t.h2,{id:"category",children:"category/*"}),"\n",(0,r.jsx)(t.p,{children:"In addition to being able to identify which component that the issue, PR is fixed or enhanced. The category labels will provide more information about the fix or enhancement for functionality, reliability, or performance. For most cases, the category labels only work with type/bug and type/enhancement."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Label"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"category/functionality"})}),(0,r.jsx)(t.td,{children:"some functions are not working such as get errors."})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"category/reliability"})}),(0,r.jsx)(t.td,{children:"the function is working for most cases. It does not work properly in certain specific environments or failures. e.g. data lost, consumption stuck"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"category/performance"})}),(0,r.jsx)(t.td,{children:"performance issues fix or improvements."})]})]})]}),"\n",(0,r.jsx)(t.h2,{id:"ready-to-test",children:"ready-to-test"}),"\n",(0,r.jsxs)(t.p,{children:["After ",(0,r.jsx)(t.a,{href:"https://github.com/apache/pulsar/pull/17693",children:"PR-17693"})," merged, pull requests ",(0,r.jsxs)(t.strong,{children:["except ",(0,r.jsx)(t.a,{href:"https://github.com/apache/pulsar/blob/master/.github/changes-filter.yaml#L5",children:"docs only changes"})]})," should be first tested in your own fork since the pulsar CI based on GitHub Actions has constrained resources and quota. GitHub Actions provides separate quota for pull requests that are executed in a forked repository."]}),"\n",(0,r.jsxs)(t.p,{children:["When a committer believe the PR is ready to test, they will label ",(0,r.jsx)(t.code,{children:"ready-to-test"})," to the PR, and then you can rerun the CI tasks by commenting ",(0,r.jsx)(t.code,{children:"/pulsarbot run-failure-checks"})," and trigger the full CI validation."]}),"\n",(0,r.jsxs)(t.p,{children:["See also ",(0,r.jsx)(t.a,{href:"/contribute/personal-ci",children:"CI Testing in Fork"}),"."]}),"\n",(0,r.jsx)(t.h2,{id:"doc-",children:"doc-*"}),"\n",(0,r.jsxs)(t.p,{children:["When submitting an issue or PR, you must ",(0,r.jsx)(t.a,{href:"https://github.com/apache/pulsar/blob/master/.github/PULL_REQUEST_TEMPLATE.md#documentation",children:"choose one of the documentation checkboxes"}),", so the automation can label the PR correctly."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Label"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"doc-not-needed"})}),(0,r.jsx)(t.td,{children:"Your PR changes do not impact docs"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"doc"})}),(0,r.jsx)(t.td,{children:"Your PR contains doc changes, no matter whether the changes are in markdown or code files."})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"doc-required"})}),(0,r.jsx)(t.td,{children:"Your PR changes impact docs and you will update later."})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"doc-complete"})}),(0,r.jsx)(t.td,{children:"Your PR changes impact docs and the related docs have been already added."})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"doc-label-missing"})}),(0,r.jsxs)(t.td,{children:["The Bot applies this label when there is no doc label information in the PR if one of the following conditions is met: ",(0,r.jsx)("br",{}),(0,r.jsx)("li",{children:"You do not provide a doc label."}),(0,r.jsx)("li",{children:"You provide multiple doc labels."}),(0,r.jsx)("li",{children:"You delete backticks (``) in doc labels."}),(0,r.jsx)("li",{children:"You add blanks in square brackets."})]})]})]})]}),"\n",(0,r.jsx)(t.h2,{id:"release",children:"release/*"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Label"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"release/important-notice"})}),(0,r.jsx)(t.td,{children:"The changes which are important should be mentioned in the release note"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"release/blocker"})}),(0,r.jsx)(t.td,{children:"Indicate the PR or issue that should block the release until it gets resolved"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"release/<version>"})}),(0,r.jsx)(t.td,{children:"The labels are indicating which version the issue/PR has been fixed or will be fixed depending on if the version is released or not"})]})]})]}),"\n",(0,r.jsx)(t.h2,{id:"cherry-picked",children:"cherry-picked/*"}),"\n",(0,r.jsx)(t.p,{children:"The cherry-picked/* labels are more mainly for Pulsar committers to ensure the fixes are cherry-picked to the release branches. The label only can be added after the cherry-picking is done for a corresponding branch. So that the release manager can have a list of PRs that should to be cherry-picked."})]})}function a(e={}){const{wrapper:t}={...(0,d.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>i});var s=n(96540);const r={},d=s.createContext(r);function c(e){const t=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),s.createElement(d.Provider,{value:t},e.children)}}}]);