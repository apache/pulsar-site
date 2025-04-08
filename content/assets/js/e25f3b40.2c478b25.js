"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[59508],{4402:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>l,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"document-preview","title":"Previewing content","description":"This guide explains why and how to preview Pulsar content locally with detailed steps and various examples.","source":"@site/contribute/document-preview.md","sourceDirName":".","slug":"/document-preview","permalink":"/contribute/document-preview","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/contribute/document-preview.md","tags":[],"version":"current","lastUpdatedBy":"Lari Hotari","lastUpdatedAt":1744107382000,"frontMatter":{},"sidebar":"sidebarDevelopment","previous":{"title":"Introduction","permalink":"/contribute/site-intro"},"next":{"title":"Writing syntax","permalink":"/contribute/document-syntax"}}');var t=s(74848),o=s(28453);const l={},r="Previewing content",a={},c=[{value:"Why preview changes locally?",id:"why-preview-changes-locally",level:2},{value:"How to preview changes locally?",id:"how-to-preview-changes-locally",level:2},{value:"Prerequisites",id:"prerequisites",level:3},{value:"Troubleshooting Corepack installation - Homebrew installations on macOS or Linux",id:"troubleshooting-corepack-installation---homebrew-installations-on-macos-or-linux",level:4},{value:"Preview changes",id:"preview-changes",level:3},{value:"Stop preview",id:"stop-preview",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"previewing-content",children:"Previewing content"})}),"\n",(0,t.jsx)(n.p,{children:"This guide explains why and how to preview Pulsar content locally with detailed steps and various examples."}),"\n",(0,t.jsx)(n.h2,{id:"why-preview-changes-locally",children:"Why preview changes locally?"}),"\n",(0,t.jsxs)(n.p,{children:["It is ",(0,t.jsx)(n.strong,{children:"required"})," to preview your changes locally and attach the preview screenshots in your PR description. It brings many benefits, including but not limited to:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["You can test your writings. It's a way to check whether you use the correct ",(0,t.jsx)(n.a,{href:"/contribute/document-syntax",children:"syntax"}),". You ",(0,t.jsx)(n.strong,{children:"must ensure"})," docs can be compiled and published correctly."]}),"\n",(0,t.jsx)(n.li,{children:"You can get your PR merged more quickly. Reviewers know your changes clearly and can speed up the review process."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"how-to-preview-changes-locally",children:"How to preview changes locally?"}),"\n",(0,t.jsxs)(n.p,{children:["Pulsar documentation is built using ",(0,t.jsx)(n.a,{href:"https://docusaurus.io/",children:"Docusaurus"}),". To preview your changes as you edit the files, you can run a local development server that serves your website and reflect the latest changes."]}),"\n",(0,t.jsx)(n.h3,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsx)(n.p,{children:"To verify docs are built correctly before submitting a contribution, you should set up your local environment to build and display the docs locally."}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Node v20 LTS (there are compatibility issues with Node v23)"}),"\n",(0,t.jsxs)(n.li,{children:["Corepack available and enabled (",(0,t.jsx)(n.code,{children:"corepack enable"}),")"]}),"\n",(0,t.jsx)(n.li,{children:"Although you can use Linux, macOS, or Windows to build locally the Pulsar documentation, macOS is the preferred build environment as it offers the most complete support for documentation building."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Installing prerequisites with ",(0,t.jsx)(n.a,{href:"https://brew.sh/",children:"Homebrew"})," on macOS or Linux:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"# uninstall any existing node installation\nbrew uninstall node\n# install node v20 LTS\nbrew install node@20\n# link node v20\nbrew link node@20\n# enable corepack\ncorepack enable\n"})}),"\n",(0,t.jsx)(n.h4,{id:"troubleshooting-corepack-installation---homebrew-installations-on-macos-or-linux",children:"Troubleshooting Corepack installation - Homebrew installations on macOS or Linux"}),"\n",(0,t.jsx)(n.p,{children:"Docusaurus supports Node v18 LTS and v20 LTS so ensure you have one of these versions installed.\nSometimes Homebrew has Corepack installed, but it's not available."}),"\n",(0,t.jsxs)(n.p,{children:["Some commands to fix the ",(0,t.jsx)(n.code,{children:"corepack"})," installation:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"# delete node symlinks if they exist\nbrew unlink node\n# uninstall default node version\nbrew uninstall node\n# uninstall yarn\nbrew uninstall yarn\n# upgrade packages\nbrew upgrade\n# delete node@20 symlinks\nbrew unlink node@20\n# install node v20 LTS if not already installed\nbrew install node@20\n# recreate symlinks\nbrew link node@20\n# delete broken symlinks in /opt/homebrew/bin\nfind /opt/homebrew/bin -type l ! -exec test -e {} \\; -delete\n# enable corepack, if the command fails, remove the conflicting files from `/opt/homebrew/bin` and try again\ncorepack enable\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Please also ensure that you have upgraded Homebrew packages to the latest versions. Run ",(0,t.jsx)(n.code,{children:"brew upgrade"})," to upgrade all installed packages."]}),"\n",(0,t.jsxs)(n.p,{children:["Don't install ",(0,t.jsx)(n.code,{children:"yarn"})," separately from a package manager since it's included with ",(0,t.jsx)(n.code,{children:"corepack"}),", which is bundled with ",(0,t.jsx)(n.code,{children:"node@20"}),". If you're using Homebrew, uninstall any existing ",(0,t.jsx)(n.code,{children:"yarn"})," installation with ",(0,t.jsx)(n.code,{children:"brew uninstall yarn"})," to avoid conflicts."]}),"\n",(0,t.jsxs)(n.p,{children:["If ",(0,t.jsx)(n.code,{children:"corepack enable"})," fails due to file conflicts, verify that no legacy ",(0,t.jsx)(n.code,{children:"corepack"})," or ",(0,t.jsx)(n.code,{children:"yarn"})," package is already installed. If found, remove them. Removing ",(0,t.jsx)(n.code,{children:"corepack"})," on updated Homebrew installations is not recommended since it uninstalls the ",(0,t.jsx)(n.code,{children:"node@20"})," package.\nIf ",(0,t.jsx)(n.code,{children:"corepack enable"})," continues to fail due to conflicting files, manually remove the conflicting files from ",(0,t.jsx)(n.code,{children:"/opt/homebrew/bin"})," and try again."]}),"\n",(0,t.jsx)(n.h3,{id:"preview-changes",children:"Preview changes"}),"\n",(0,t.jsx)(n.p,{children:"Pulsar website changes refer to all the changes made to the Pulsar website, including but not limited to the following pages:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"pathname:///docs",children:"User documents"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"/contribute/",children:"Contribution guide"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"pathname:///release-notes/",children:"Release notes"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"pathname:///ecosystem",children:"Ecosystem page"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"pathname:///case-studies",children:"Case studies"})}),"\n",(0,t.jsx)(n.li,{children:"..."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Follow these steps to preview the website changes."}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Change to the working directory:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cd pulsar-site/\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Run the following command to preview changes:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Preview changes on master (next version documentation)\n./preview.sh\n\n# preview changes on a specific version\n./preview.sh 4.0.x\n\n# preview changes on multiple versions\n./preview.sh 4.0.x 3.0.x current\n"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["If you have content staleness issues, you can pass the ",(0,t.jsx)(n.code,{children:"--clean"})," (or ",(0,t.jsx)(n.code,{children:"-c"}),") flag to the ",(0,t.jsx)(n.code,{children:"preview.sh"})," script to clean Docusaurus cache and start a fresh build.\nThis runs ",(0,t.jsx)(n.code,{children:"yarn run docusaurus clear"})," before starting the preview server."]}),"\n",(0,t.jsxs)(n.p,{children:["By default, a browser window will open at ",(0,t.jsx)(n.a,{href:"http://localhost:3000",children:"http://localhost:3000"})," to show the changes:"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"alt_text",src:s(59655).A+"",width:"936",height:"678"})}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsxs)(n.p,{children:["When you click on ",(0,t.jsx)(n.code,{children:"Docs"}),", you are taken to the latest stable version (e.g., ",(0,t.jsx)(n.code,{children:"http://localhost:3000/docs/2.10.x/"}),"). If you want to preview changes on ",(0,t.jsx)(n.code,{children:"master"}),", change the URL to ",(0,t.jsx)(n.code,{children:"http://localhost:3000/docs/next"})]})}),"\n",(0,t.jsx)(n.h3,{id:"stop-preview",children:"Stop preview"}),"\n",(0,t.jsxs)(n.p,{children:["Switch to your command-line interface and press ",(0,t.jsx)(n.strong,{children:"Control+C"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},59655:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/website-preview-3e284d8b7c2292bcb606955218a65a23.png"},28453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>r});var i=s(96540);const t={},o=i.createContext(t);function l(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);