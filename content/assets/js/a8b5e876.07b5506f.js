"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[70619],{1180:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>c});const l=JSON.parse('{"id":"client-libraries-python-setup","title":"Set up Python client","description":"Install Python client library","source":"@site/versioned_docs/version-3.0.x/client-libraries-python-setup.md","sourceDirName":".","slug":"/client-libraries-python-setup","permalink":"/docs/3.0.x/client-libraries-python-setup","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/versioned_docs/version-3.0.x/client-libraries-python-setup.md","tags":[],"version":"3.0.x","frontMatter":{"id":"client-libraries-python-setup","title":"Set up Python client","sidebar_label":"Set up"},"sidebar":"docsSidebar","previous":{"title":"Python client","permalink":"/docs/3.0.x/client-libraries-python"},"next":{"title":"Initialize","permalink":"/docs/3.0.x/client-libraries-python-initialize"}}');var s=n(74848),i=n(28453);const r={id:"client-libraries-python-setup",title:"Set up Python client",sidebar_label:"Set up"},o=void 0,a={},c=[{value:"Install Python client library",id:"install-python-client-library",level:2},{value:"Connect to Pulsar cluster",id:"connect-to-pulsar-cluster",level:2}];function d(e){const t={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{id:"install-python-client-library",children:"Install Python client library"}),"\n",(0,s.jsxs)(t.p,{children:["Use ",(0,s.jsx)(t.a,{href:"https://pip.pypa.io/",children:"pip"})," to install the latest version:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"pip install 'pulsar-client==3.6.1'\n"})}),"\n",(0,s.jsx)(t.p,{children:"You can install optional components alongside the client library:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"# avro serialization\npip install 'pulsar-client[avro]==3.6.1'\n\n# functions runtime\npip install 'pulsar-client[functions]==3.6.1'\n\n# all optional components\npip install 'pulsar-client[all]==3.6.1'\n"})}),"\n",(0,s.jsx)(t.p,{children:"Installation via PyPi is available for the following Python versions:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Platform"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Supported Python versions"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"macOS (>= 11.0)"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"3.7, 3.8, 3.9 and 3.10"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Linux (including Alpine Linux)"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"3.7, 3.8, 3.9 and 3.10"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"connect-to-pulsar-cluster",children:"Connect to Pulsar cluster"}),"\n",(0,s.jsxs)(t.p,{children:["To connect to Pulsar using client libraries, you need to specify a ",(0,s.jsx)(t.a,{href:"/docs/3.0.x/developing-binary-protocol",children:"Pulsar protocol"})," URL."]}),"\n",(0,s.jsxs)(t.p,{children:["You can assign Pulsar protocol URLs to specific clusters and use the ",(0,s.jsx)(t.code,{children:"pulsar"})," scheme. The following is an example of ",(0,s.jsx)(t.code,{children:"localhost"})," with the default port ",(0,s.jsx)(t.code,{children:"6650"}),":"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-http",children:"pulsar://localhost:6650\n"})}),"\n",(0,s.jsxs)(t.p,{children:["If you have multiple brokers, separate ",(0,s.jsx)(t.code,{children:"IP:port"})," by commas:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-http",children:"pulsar://localhost:6550,localhost:6651,localhost:6652\n"})}),"\n",(0,s.jsxs)(t.p,{children:["If you use ",(0,s.jsx)(t.a,{href:"/docs/3.0.x/security-tls-authentication",children:"mTLS"})," authentication, add ",(0,s.jsx)(t.code,{children:"+ssl"})," in the scheme:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-http",children:"pulsar+ssl://pulsar.us-west.example.com:6651\n"})})]})}function p(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>o});var l=n(96540);const s={},i=l.createContext(s);function r(e){const t=l.useContext(i);return l.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),l.createElement(i.Provider,{value:t},e.children)}}}]);