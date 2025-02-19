"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[57034],{14043:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>t,toc:()=>h});const t=JSON.parse('{"id":"release-note-guide","title":"Writing release notes","description":"Pulsar release notes consist of the following parts:","source":"@site/contribute/release-note-guide.md","sourceDirName":".","slug":"/release-note-guide","permalink":"/contribute/release-note-guide","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/contribute/release-note-guide.md","tags":[],"version":"current","lastUpdatedBy":"Dhanush","lastUpdatedAt":1740000687000,"frontMatter":{"id":"release-note-guide","title":"Writing release notes"},"sidebar":"sidebarDevelopment","previous":{"title":"Creating GPG keys","permalink":"/contribute/create-gpg-keys"},"next":{"title":"Cherry-picking","permalink":"/contribute/maintenance-process"}}');var r=n(74848),a=n(28453);const l={id:"release-note-guide",title:"Writing release notes"},i=void 0,o={},h=[{value:"Prerequisite",id:"prerequisite",level:2},{value:"Register the new released version to releases.json, data/release-pulsar.js and data/release-java.js files",id:"register-the-new-released-version-to-releasesjson-datarelease-pulsarjs-and-datarelease-javajs-files",level:2},{value:"Generate release notes",id:"generate-release-notes",level:2},{value:"Update the release note page",id:"update-the-release-note-page",level:2},{value:"Submit the release note",id:"submit-the-release-note",level:2}];function c(e){const s={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.p,{children:"Pulsar release notes consist of the following parts:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"pathname:///release-notes/",children:"Core"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"pathname:///release-notes/client-java",children:"Java client"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"pathname:///release-notes/client-ws",children:"WebSocket client"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"pathname:///release-notes/client-cpp",children:"C++ client"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"pathname:///release-notes/client-python",children:"Python client"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"pathname:///release-notes/client-go",children:"Go client"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"pathname:///release-notes/client-node",children:"Node.js client"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"pathname:///release-notes/client-cs",children:"C# client"})}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"prerequisite",children:"Prerequisite"}),"\n",(0,r.jsxs)(s.p,{children:["To generate release notes, you are suggested to install the ",(0,r.jsx)(s.a,{href:"https://cli.github.com/",children:"GitHub CLI"})," and authenticate first:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:"brew install gh\ngh auth login\n"})}),"\n",(0,r.jsx)(s.h2,{id:"register-the-new-released-version-to-releasesjson-datarelease-pulsarjs-and-datarelease-javajs-files",children:"Register the new released version to releases.json, data/release-pulsar.js and data/release-java.js files"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:'# Replace 3.0.6 with the target version tag\nVERSION_WITHOUT_RC=3.0.6\nPREVIOUS_VERSION=3.0.5\n# Replace apache/pulsar with the component repo\n./scripts/register_new_version.py $VERSION_WITHOUT_RC $PREVIOUS_VERSION $(gh release view "v$VERSION_WITHOUT_RC" -R apache/pulsar --json author,publishedAt | jq -r \'[.author.login, .publishedAt] | join(" ")\')\n'})}),"\n",(0,r.jsx)(s.p,{children:"Alternatively, for a tag instead of a release:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:'# For a tag instead of a release\n./scripts/register_new_version.py $VERSION_WITHOUT_RC $PREVIOUS_VERSION $(cd $PULSAR_PATH && git show -s --format="%ae %aI" "v$VERSION_RC" | tail -n 1 | sed \'s/@.* / /\')\n'})}),"\n",(0,r.jsx)(s.h2,{id:"generate-release-notes",children:"Generate release notes"}),"\n",(0,r.jsx)(s.p,{children:"There isn't a definite way yet. You will need to categorize the PRs into different sections manually and edit the release note file. These commands are used to generate the release note entries."}),"\n",(0,r.jsx)(s.p,{children:"Here are 2 approaches:"}),"\n",(0,r.jsx)(s.p,{children:'Using "git log" (copies output to clipboard using pbcopy)'}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:"PREVIOUS_VERSION=3.0.3\nVERSION_WITHOUT_RC=3.0.4\n"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:"cd $PULSAR_PATH\ngit log --reverse  --oneline v$PREVIOUS_VERSION..v$VERSION_WITHOUT_RC | colrm 1 12 | sed 's/\\] \\[/][/' | perl -p -e 's/^\\s+//' | awk -F ']' '{\n    if ($1 ~ /^\\[/) {\n        print $1 \"]\" $2, $0\n    } else {\n        print \"[zzz]\", $0\n    }\n}' | sort | cut -d ' ' -f2- | sed 's/\\(#\\([0-9]\\+\\)\\)/[#\\2](https:\\/\\/github.com\\/apache\\/pulsar\\/pull\\/\\2)/g' | sed 's/^/- /' | sed 's/</\\&lt;/g' | sed 's/>/\\&gt;/g' \\\n| pbcopy\n"})}),"\n",(0,r.jsx)(s.p,{children:'Alternatively using "gh pr list"'}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:'gh pr list -L 1000 --search "is:pr is:merged label:release/2.10.6 label:cherry-picked/branch-2.10" --json title,number,url | jq -r \'.[] | "- \\(.title) ([#\\(.number)](\\(.url)))"\' | sort | pbcopy\n'})}),"\n",(0,r.jsx)(s.p,{children:"For feature releases, using the milestone:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:'gh pr list -L 1000 --search "is:pr is:merged milestone:4.0.0" --json title,number,url | jq -r \'.[] | "- \\(.title) ([#\\(.number)](\\(.url)))"\' | sort | pbcopy\n'})}),"\n",(0,r.jsx)(s.h2,{id:"update-the-release-note-page",children:"Update the release note page"}),"\n",(0,r.jsxs)(s.p,{children:["The following steps are handled by the script ",(0,r.jsx)(s.code,{children:"./scripts/generate_release_notes.py"}),"."]}),"\n",(0,r.jsxs)(s.ol,{children:["\n",(0,r.jsxs)(s.li,{children:["Copy the related release notes entries and add a ",(0,r.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/tree/main/release-notes/versioned",children:"versioned release note file"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:["Update the ",(0,r.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/tree/main/data",children:"version metadata files"})," (",(0,r.jsx)(s.code,{children:"release-*.js"}),"). For apache/pulsar releases, this means updating ",(0,r.jsx)(s.code,{children:"release-java.js"})," (Java client) and ",(0,r.jsx)(s.code,{children:"release-pulsar.js"})," (Pulsar)."]}),"\n",(0,r.jsxs)(s.li,{children:["For every apache/pulsar release, you should add a ",(0,r.jsx)(s.code,{children:"<release-version>"})," entry to the corresponding place in the ",(0,r.jsx)(s.code,{children:"releases.json"})," file."]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Update swagger files. ref: ",(0,r.jsx)(s.a,{href:"https://pulsar.apache.org/contribute/release-process/#swagger-files",children:"swagger files"})]}),"\n",(0,r.jsxs)(s.p,{children:["To preview the result, follow the instructions for ",(0,r.jsx)(s.a,{href:"/contribute/document-preview#preview-changes",children:"previewing content"}),"."]}),"\n",(0,r.jsx)(s.h2,{id:"submit-the-release-note",children:"Submit the release note"}),"\n",(0,r.jsxs)(s.p,{children:["Submit a PR against ",(0,r.jsx)(s.a,{href:"https://github.com/apache/pulsar-site",children:"the site repo"})," with the added version release note file and updated version metadata files."]}),"\n",(0,r.jsx)(s.p,{children:"Here are some examples:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/pull/326",children:"Add the release note for C++ client 3.1.0"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/pull/343",children:"Add the release note for Python client 3.0.0"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"https://github.com/apache/pulsar-site/pull/834",children:"Add the release note for Pulsar 3.0.3"})}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Check whether the release information is shown on the ",(0,r.jsx)(s.a,{href:"pathname:///release-notes/",children:"Pulsar Release Note page"})," after the website is updated and built successfully."]})]})}function d(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>l,x:()=>i});var t=n(96540);const r={},a=t.createContext(r);function l(e){const s=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(a.Provider,{value:s},e.children)}}}]);