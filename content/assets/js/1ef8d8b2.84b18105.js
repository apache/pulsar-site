"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[20267],{40545:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>t,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"client-libraries-cpp","title":"Pulsar C++ client","description":"You can use a Pulsar C++ client to create Pulsar producers, consumers, and readers in C++. All the methods in Pulsar C++ clients are thread-safe.","source":"@site/versioned_docs/version-4.0.x/client-libraries-cpp.md","sourceDirName":".","slug":"/client-libraries-cpp","permalink":"/docs/4.0.x/client-libraries-cpp","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/versioned_docs/version-4.0.x/client-libraries-cpp.md","tags":[],"version":"4.0.x","frontMatter":{"id":"client-libraries-cpp","title":"Pulsar C++ client","sidebar_label":"C++ client"},"sidebar":"docsSidebar","previous":{"title":"Use","permalink":"/docs/4.0.x/client-libraries-java-use"},"next":{"title":"Set up","permalink":"/docs/4.0.x/client-libraries-cpp-setup"}}');var i=s(74848),l=s(28453);const a={id:"client-libraries-cpp",title:"Pulsar C++ client",sidebar_label:"C++ client"},c=void 0,t={},d=[{value:"Get started",id:"get-started",level:2},{value:"What&#39;s next?",id:"whats-next",level:2},{value:"Reference doc",id:"reference-doc",level:2},{value:"Changes for 3.0.0 and later versions",id:"changes-for-300-and-later-versions",level:2}];function o(e){const r={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(r.p,{children:["You can use a Pulsar C++ client to create Pulsar ",(0,i.jsx)(r.a,{href:"/docs/4.0.x/concepts-clients#producer",children:"producers"}),", ",(0,i.jsx)(r.a,{href:"/docs/4.0.x/concepts-clients#consumer",children:"consumers"}),", and ",(0,i.jsx)(r.a,{href:"/docs/4.0.x/concepts-clients#reader",children:"readers"})," in C++. All the methods in Pulsar C++ clients are thread-safe."]}),"\n",(0,i.jsx)(r.h2,{id:"get-started",children:"Get started"}),"\n",(0,i.jsxs)(r.ol,{children:["\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"/docs/4.0.x/client-libraries-cpp-setup",children:"Set up C++ client library"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"/docs/4.0.x/client-libraries-cpp-initialize",children:"Initialize a C++ client"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"/docs/4.0.x/client-libraries-cpp-use",children:"Use a C++ client"})}),"\n"]}),"\n",(0,i.jsx)(r.h2,{id:"whats-next",children:"What's next?"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"/docs/4.0.x/client-libraries-clients",children:"Work with clients"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"/docs/4.0.x/client-libraries-producers",children:"Work with producers"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"/docs/4.0.x/client-libraries-consumers",children:"Work with consumers"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"/docs/4.0.x/client-libraries-readers",children:"Work with readers"})}),"\n"]}),"\n",(0,i.jsx)(r.h2,{id:"reference-doc",children:"Reference doc"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.a,{href:"https://pulsar.apache.org/api/cpp/3.7.x",children:"C++ client API docs"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"https://pulsar.apache.org/api/cpp/3.7.x/classpulsar_1_1_client_configuration.html",children:"Client configurations"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"https://pulsar.apache.org/api/cpp/3.7.x/classpulsar_1_1_producer_configuration.html",children:"Producer configurations"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"https://pulsar.apache.org/api/cpp/3.7.x/classpulsar_1_1_consumer_configuration.html",children:"Consumer configurations"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"https://pulsar.apache.org/api/cpp/3.7.x/classpulsar_1_1_reader_configuration.html",children:"Reader configurations"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"/release-notes/client-cpp",children:"Release notes"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"https://github.com/apache/pulsar-client-cpp/tree/main/examples",children:"Code examples"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"https://github.com/apache/pulsar-client-cpp/blob/main/include/pulsar/Schema.h",children:"Supported schema types"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"/client-feature-matrix/",children:"Client feature matrix"})}),"\n"]}),"\n",(0,i.jsx)(r.h2,{id:"changes-for-300-and-later-versions",children:"Changes for 3.0.0 and later versions"}),"\n",(0,i.jsxs)(r.p,{children:["The new version of the Pulsar C++ client starts from 3.0.0 and has been no longer consistent with Pulsar since 2.10.x. For the latest releases, see the ",(0,i.jsx)(r.a,{href:"/download/",children:"Download"})," page."]}),"\n",(0,i.jsxs)(r.p,{children:["Take the ",(0,i.jsx)(r.a,{href:"pathname:///download#pulsar-c-client",children:"3.0.0 release"})," for example, there are following subdirectories:"]}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"apk-arm64: the Alpine Linux packages for ARM64 architectures"}),"\n",(0,i.jsx)(r.li,{children:"apk-x86_64: the Alpine Linux packages for x64 architectures"}),"\n",(0,i.jsx)(r.li,{children:"deb-arm64: the Debian-based Linux packages for ARM64 architectures"}),"\n",(0,i.jsx)(r.li,{children:"deb-x86_64: the Debian-based Linux packages for x64 architectures"}),"\n",(0,i.jsx)(r.li,{children:"rpm-arm64: the RedHat-based Linux packages for ARM64 architectures"}),"\n",(0,i.jsx)(r.li,{children:"rpm-x86_64: the RedHat-based Linux packages for x64 architectures"}),"\n"]}),"\n",(0,i.jsxs)(r.p,{children:["These Linux packages above all contain the C++ headers installed under ",(0,i.jsx)(r.code,{children:"/usr/include"})," and the following libraries installed under ",(0,i.jsx)(r.code,{children:"/usr/lib"}),":"]}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"libpulsar.so: the shared library that links 3rd party dependencies statically"}),"\n",(0,i.jsx)(r.li,{children:"libpulsar.a: the static library"}),"\n",(0,i.jsx)(r.li,{children:"libpulsarwithdeps.a: the fat static library that includes all 3rd party dependencies"}),"\n"]}),"\n",(0,i.jsxs)(r.p,{children:["Here is an example to link these libraries for a C++ source file named ",(0,i.jsx)(r.code,{children:"main.cc"}),":"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-bash",children:"# Link to libpulsar.so\ng++ -std=c++11 main.cc -lpulsar\n# Link to libpulsarwithdeps.a\ng++ -std=c++11 main.cc /usr/lib/libpulsarwithdeps.a -lpthread -ldl\n# Link to libpulsar.a\ng++ -std=c++11 main.cc /usr/lib/libpulsar.a \\\n  -lprotobuf -lcurl -lssl -lcrypto -lz -lzstd -lsnappy -lpthread -ldl\n"})}),"\n",(0,i.jsx)(r.admonition,{type:"caution",children:(0,i.jsxs)(r.p,{children:["Linking to ",(0,i.jsx)(r.code,{children:"libpulsar.a"})," can be difficult for beginners because the 3rd party dependencies must be compatible. For example, the protobuf version must be 3.20.0 or higher for Pulsar C++ client 3.0.0. It's better to link to ",(0,i.jsx)(r.code,{children:"libpulsarwithdeps.a"})," instead."]})}),"\n",(0,i.jsx)(r.admonition,{type:"danger",children:(0,i.jsxs)(r.p,{children:["Before 3.0.0, there was a ",(0,i.jsx)(r.code,{children:"libpulsarnossl.so"}),", which is removed now."]})})]})}function h(e={}){const{wrapper:r}={...(0,l.R)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},28453:(e,r,s)=>{s.d(r,{R:()=>a,x:()=>c});var n=s(96540);const i={},l=n.createContext(i);function a(e){const r=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),n.createElement(l.Provider,{value:r},e.children)}}}]);