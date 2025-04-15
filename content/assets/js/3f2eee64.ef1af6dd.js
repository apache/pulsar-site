"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[87295],{35247:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>l,default:()=>o,frontMatter:()=>a,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"site-intro","title":"Introduction","description":"The Pulsar site is built with Docusaurus framework. You can find all the technical details on its docs.","source":"@site/contribute/site-intro.md","sourceDirName":".","slug":"/site-intro","permalink":"/contribute/site-intro","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/contribute/site-intro.md","tags":[],"version":"current","lastUpdatedBy":"Jeremy","lastUpdatedAt":1744615130000,"frontMatter":{},"sidebar":"sidebarDevelopment","previous":{"title":"Personal CI","permalink":"/contribute/personal-ci"},"next":{"title":"Previewing content","permalink":"/contribute/document-preview"}}');var n=t(74848),r=t(28453);const a={},l="Introduction",c={},d=[{value:"Source",id:"source",level:2},{value:"Pages",id:"pages",level:2},{value:"Tools",id:"tools",level:2},{value:"preview.sh",id:"previewsh",level:3},{value:"docker-compose.yaml",id:"docker-composeyaml",level:3},{value:"Pytools",id:"pytools",level:3},{value:"How-tos",id:"how-tos",level:2},{value:"How to fix search index mismatches?",id:"how-to-fix-search-index-mismatches",level:3},{value:"How to preview changes locally?",id:"how-to-preview-changes-locally",level:3},{value:"How to update reference pages?",id:"how-to-update-reference-pages",level:3},{value:"How to update data-driven pages?",id:"how-to-update-data-driven-pages",level:3}];function h(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"introduction",children:"Introduction"})}),"\n",(0,n.jsxs)(s.p,{children:["The Pulsar site is built with ",(0,n.jsx)(s.a,{href:"http://docusaurus.io/",children:"Docusaurus"})," framework. You can find all the technical details on ",(0,n.jsx)(s.a,{href:"https://docusaurus.io/docs",children:"its docs"}),"."]}),"\n",(0,n.jsxs)(s.p,{children:["Specifically, this chapter provides a ",(0,n.jsx)(s.a,{href:"/contribute/document-syntax",children:"writing syntax"})," guide selecting knowledge for writing content of the site."]}),"\n",(0,n.jsx)(s.h2,{id:"source",children:"Source"}),"\n",(0,n.jsxs)(s.p,{children:["Currently, the source of the site is located at the ",(0,n.jsx)(s.a,{href:"http://github.com/apache/pulsar-site",children:"apache/pulsar-site"})," repo."]}),"\n",(0,n.jsx)(s.h2,{id:"pages",children:"Pages"}),"\n",(0,n.jsxs)(s.p,{children:["Docusaurus provides three kinds of pages out-of-the-box: ",(0,n.jsx)(s.a,{href:"https://docusaurus.io/docs/docs-introduction",children:"docs"}),", ",(0,n.jsx)(s.a,{href:"https://docusaurus.io/docs/blog",children:"blogs"}),", and ",(0,n.jsx)(s.a,{href:"https://docusaurus.io/docs/creating-pages",children:"JSX pages"}),"."]}),"\n",(0,n.jsx)(s.p,{children:"The Pulsar site pages are of:"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Page"}),(0,n.jsx)(s.th,{children:"Type"}),(0,n.jsx)(s.th,{children:"Source"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:(0,n.jsx)(s.a,{href:"pathname:///docs",children:"User docs"})}),(0,n.jsx)(s.td,{children:"docs"}),(0,n.jsx)(s.td,{children:(0,n.jsxs)("ul",{children:[(0,n.jsx)("li",{children:"docs/"}),(0,n.jsx)("li",{children:"versioned_docs/"}),(0,n.jsx)("li",{children:"versioned_sidebars/"}),(0,n.jsx)("li",{children:"sidebars.json"})]})})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:(0,n.jsx)(s.a,{href:"/contribute/",children:"Contribution guides"})}),(0,n.jsx)(s.td,{children:"docs"}),(0,n.jsx)(s.td,{children:(0,n.jsxs)("ul",{children:[(0,n.jsx)("li",{children:"contribute/"}),(0,n.jsx)("li",{children:"sidebarsDevelopment.js"})]})})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:(0,n.jsx)(s.a,{href:"pathname:///release-notes",children:"Release notes"})}),(0,n.jsx)(s.td,{children:"docs"}),(0,n.jsx)(s.td,{children:(0,n.jsxs)("ul",{children:[(0,n.jsx)("li",{children:"release-notes/"}),(0,n.jsx)("li",{children:"sidebarsReleaseNotes.js"})]})})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:(0,n.jsx)(s.a,{href:"pathname:///security",children:"Security"})}),(0,n.jsx)(s.td,{children:"docs"}),(0,n.jsx)(s.td,{children:(0,n.jsx)("ul",{children:(0,n.jsx)("li",{children:"security/"})})})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:(0,n.jsx)(s.a,{href:"pathname:///blog",children:"Blogs"})}),(0,n.jsx)(s.td,{children:"blog"}),(0,n.jsx)(s.td,{children:(0,n.jsx)("ul",{children:(0,n.jsx)("li",{children:"blog/"})})})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:(0,n.jsx)(s.a,{href:"pathname:///client-feature-matrix",children:"Client feature matrix"})}),(0,n.jsx)(s.td,{children:"docs"}),(0,n.jsx)(s.td,{children:(0,n.jsxs)("ul",{children:[(0,n.jsx)("li",{children:"client-feature-matrix/"}),(0,n.jsx)("li",{children:"data/matrix.js"})]})})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Other pages"}),(0,n.jsx)(s.td,{children:"JSX pages"}),(0,n.jsx)(s.td,{children:(0,n.jsx)("ul",{children:(0,n.jsx)("li",{children:"src/pages/"})})})]})]})]}),"\n",(0,n.jsxs)(s.p,{children:["Besides, the site serves multiple static pages generated outside the framework, including API docs, reference docs, and swagger files. You can find them under the ",(0,n.jsx)(s.code,{children:"static"})," folder."]}),"\n",(0,n.jsx)(s.h2,{id:"tools",children:"Tools"}),"\n",(0,n.jsx)(s.h3,{id:"previewsh",children:"preview.sh"}),"\n",(0,n.jsxs)(s.p,{children:["The most commonly used tool is ",(0,n.jsx)(s.code,{children:"preview.sh"}),". You can preview your local changes by:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-shell",children:"./preview.sh\n"})}),"\n",(0,n.jsx)(s.p,{children:"If you'd like to preview the site for a specific versions, you can pass the versions as an argument:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-shell",children:"./preview.sh 4.0.x\n"})}),"\n",(0,n.jsxs)(s.p,{children:["See the ",(0,n.jsx)(s.a,{href:"/contribute/document-preview",children:"previewing content"})," guide for more details."]}),"\n",(0,n.jsx)(s.h3,{id:"docker-composeyaml",children:"docker-compose.yaml"}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"preview.sh"})," script uses the Docusaurus dev server for testing, which is different from the real Apache Web Server based env that serves the site online."]}),"\n",(0,n.jsxs)(s.p,{children:["To emulate the server-side logics, like ",(0,n.jsx)(s.code,{children:".htaccess"})," rewrite rules, you can run:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-shell",children:"yarn build\ndocker-compose up\n"})}),"\n",(0,n.jsx)(s.h3,{id:"pytools",children:"Pytools"}),"\n",(0,n.jsx)(s.p,{children:"The site repo has a set of Python scripts for generating content and syncing/updating/publishing the site."}),"\n",(0,n.jsxs)(s.p,{children:["You can read the ",(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/tree/main/tools/pytools/README.md",children:"README"})," file of pytools for details."]}),"\n",(0,n.jsx)(s.h2,{id:"how-tos",children:"How-tos"}),"\n",(0,n.jsx)(s.p,{children:"This section holds common how-tos about website maintenance and troubleshooting."}),"\n",(0,n.jsx)(s.h3,{id:"how-to-fix-search-index-mismatches",children:"How to fix search index mismatches?"}),"\n",(0,n.jsxs)(s.p,{children:["First of all, you should get permission to access ",(0,n.jsx)(s.code,{children:"apache_pulsar"})," crawler on ",(0,n.jsx)(s.a,{href:"https://crawler.algolia.com/",children:"Algolia Crawler console"}),". You can email ",(0,n.jsx)(s.a,{href:"mailto:dev@pulsar.apache.org",children:"dev@pulsar.apache.org"})," to ask for permission."]}),"\n",(0,n.jsxs)(s.p,{children:['The most common fix for search index mismatches is to re-index the pages. You can do so by clicking "Restart crawling" button on the ',(0,n.jsx)(s.a,{href:"https://crawler.algolia.com/admin/crawlers/7a3458ba-2373-47d5-9520-90cc9cc10736/overview",children:"crawler page"}),". Typically, it takes about 1 or 2 hours to complete."]}),"\n",(0,n.jsx)(s.h3,{id:"how-to-preview-changes-locally",children:"How to preview changes locally?"}),"\n",(0,n.jsxs)(s.p,{children:["If you make any changes to the site, before submitting a pull request, you're supposed to preview the changes locally. Read the ",(0,n.jsx)(s.a,{href:"/contribute/document-preview",children:"previewing content"})," guide about instructions."]}),"\n",(0,n.jsx)(s.h3,{id:"how-to-update-reference-pages",children:"How to update reference pages?"}),"\n",(0,n.jsxs)(s.p,{children:["If you're gonna to update the content, read the ",(0,n.jsx)(s.a,{href:"/contribute/document-contribution#update-reference-docs",children:"update reference docs"})," guide about the sources of reference pages."]}),"\n",(0,n.jsxs)(s.p,{children:["If you're gonna to debug the reference generation process, read the ",(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/tree/main/tools/pytools#reference-doc-generator",children:"reference-doc-generator"})," usage section and its source code."]}),"\n",(0,n.jsx)(s.h3,{id:"how-to-update-data-driven-pages",children:"How to update data-driven pages?"}),"\n",(0,n.jsxs)(s.p,{children:["You can update it by clicking on one of the ",(0,n.jsx)(s.strong,{children:"\u270d\ufe0f Edit <file_name>"})," links below and submitting a Pull Request."]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Case Studies"})," ",(0,n.jsx)(s.a,{href:"pathname:///case-studies",children:"/case-studies"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/data/case-studies.ts",children:"\u270d\ufe0f Edit case-studies.ts"})}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Powered by"})," ",(0,n.jsx)(s.a,{href:"pathname:///powered-by",children:"/powered-by"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/data/powered-by.ts",children:"\u270d\ufe0f Edit powered-by.ts"})}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Ecosystem"})," ",(0,n.jsx)(s.a,{href:"pathname:///ecosystem",children:"/ecosystem"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/data/ecosystem.ts",children:"\u270d\ufe0f Edit ecosystem.ts"})}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Events"})," ",(0,n.jsx)(s.a,{href:"pathname:///events",children:"/events"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/data/events.ts",children:"\u270d\ufe0f Edit events.ts"})}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Resources"})," ",(0,n.jsx)(s.a,{href:"pathname:///resources",children:"/resources"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/data/resources.ts",children:"\u270d\ufe0f Edit resources.ts"})}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Team"})," ",(0,n.jsx)(s.a,{href:"pathname:///team",children:"/team"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/data/team.js",children:"\u270d\ufe0f Edit team.js"})}),"\n",(0,n.jsxs)(s.p,{children:["PMC members can generate the ",(0,n.jsx)(s.code,{children:"team.js"})," file as ",(0,n.jsx)(s.a,{href:"https://github.com/lhotari",children:"lhotari"})," did in ",(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/pull/387",children:"https://github.com/apache/pulsar-site/pull/387"}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Downloads"})," ",(0,n.jsx)(s.a,{href:"pathname:///download",children:"/downloads"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/releases.json",children:"\u270d\ufe0f Edit releases.json"})}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/data/connectors.js",children:"\u270d\ufe0f Edit connectors.js"})}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/data/release-cpp.js",children:"\u270d\ufe0f Edit release-cpp.js"})}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/data/release-pulsar-manager.js",children:"\u270d\ufe0f Edit release-pulsar-manager.js"})}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/data/release-pulsar-adapters.js",children:"\u270d\ufe0f Edit release-pulsar-adapters.js"})}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/src/components/download.tsx",children:"\u270d\ufe0f Edit download.tsx"})}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/src/pages/download.mdx",children:"\u270d\ufe0f Edit download.mdx"})}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Release notes"})," ",(0,n.jsx)(s.a,{href:"pathname:///release-notes",children:"/release-notes"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"data/release-*.js"}),"\n",(0,n.jsx)(s.li,{children:"release-notes/"}),"\n",(0,n.jsx)(s.li,{children:"src/components/ClientReleaseTable.js"}),"\n",(0,n.jsx)(s.li,{children:"src/components/PulsarReleaseTable.js"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Client feature matrix"})," ",(0,n.jsx)(s.a,{href:"pathname:///client-feature-matrix",children:"/client-feature-matrix"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/data/matrix.js",children:"\u270d\ufe0f Edit matrix.js"})}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/edit/main/client-feature-matrix/index.mdx",children:"\u270d\ufe0f Edit client-feature-matrix/index.mdx"})}),"\n"]}),"\n"]}),"\n"]})]})}function o(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},28453:(e,s,t)=>{t.d(s,{R:()=>a,x:()=>l});var i=t(96540);const n={},r=i.createContext(n);function a(e){const s=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),i.createElement(r.Provider,{value:s},e.children)}}}]);