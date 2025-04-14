"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[49672],{84520:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>x,frontMatter:()=>l,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"document-syntax","title":"Writing syntax","description":"This guide explains how to write Pulsar documentation using the MDX-compatible Markdown syntax.","source":"@site/contribute/document-syntax.md","sourceDirName":".","slug":"/document-syntax","permalink":"/contribute/document-syntax","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/contribute/document-syntax.md","tags":[],"version":"current","lastUpdatedBy":"dependabot[bot]","lastUpdatedAt":1744615114000,"frontMatter":{"id":"document-syntax","title":"Writing syntax"},"sidebar":"sidebarDevelopment","previous":{"title":"Previewing content","permalink":"/contribute/document-preview"},"next":{"title":"Introduction","permalink":"/contribute/document-intro"}}');var i=t(74848),r=t(28453),a=t(11470),o=t(19365);const l={id:"document-syntax",title:"Writing syntax"},d=void 0,c={},h=[{value:"Background",id:"background",level:2},{value:"Why use new Markdown syntax?",id:"why-use-new-markdown-syntax",level:3},{value:"How to test doc changes?",id:"how-to-test-doc-changes",level:3},{value:"Syntax",id:"syntax",level:2},{value:"Markdown",id:"markdown",level:3},{value:"Example 1",id:"example-1",level:4},{value:"Example 2",id:"example-2",level:4},{value:"Tab",id:"tab",level:3},{value:"Code blocks",id:"code-blocks",level:3},{value:"Admonitions",id:"admonitions",level:3},{value:"Assets",id:"assets",level:3},{value:"Indentation and space",id:"indentation-and-space",level:3},{value:"Metadata",id:"metadata",level:3},{value:"Tables",id:"tables",level:3},{value:"Links",id:"links",level:3},{value:"Anchor links",id:"anchor-links",level:4},{value:"Links to internal documentation",id:"links-to-internal-documentation",level:4},{value:"Links to external documentation",id:"links-to-external-documentation",level:4},{value:"Link to a specific line of code",id:"link-to-a-specific-line-of-code",level:4},{value:"Authoritative sources",id:"authoritative-sources",level:3},{value:"Escape",id:"escape",level:3},{value:"Headings",id:"headings",level:3}];function u(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"This guide explains how to write Pulsar documentation using the MDX-compatible Markdown syntax."}),"\n",(0,i.jsx)(n.h2,{id:"background",children:"Background"}),"\n",(0,i.jsxs)(n.p,{children:["The Pulsar documentation uses ",(0,i.jsx)(n.a,{href:"https://www.markdownguide.org/basic-syntax/",children:"Markdown"})," as its markup language and ",(0,i.jsx)(n.a,{href:"https://docusaurus.io/",children:"Docusaurus"})," for generating the documentation and website, with ",(0,i.jsx)(n.a,{href:"https://mdxjs.com/",children:"MDX"})," enhancement."]}),"\n",(0,i.jsx)(n.h3,{id:"why-use-new-markdown-syntax",children:"Why use new Markdown syntax?"}),"\n",(0,i.jsx)(n.p,{children:"The new Pulsar website is upgraded to Docusaurus V2, which uses MDX as the parsing engine. MDX can do much more than just parsing standard Markdown syntax, like rendering React components inside your documents as well."}),"\n",(0,i.jsx)(n.h3,{id:"how-to-test-doc-changes",children:"How to test doc changes?"}),"\n",(0,i.jsxs)(n.p,{children:["You can play with the MDX format in the ",(0,i.jsx)(n.a,{href:"https://mdxjs.com/playground/",children:"MDX Playground"}),". Write some MDX to find out what it turns into. You can see the rendered result, the generated code, and the intermediary ASTs. This can be helpful for debugging or exploring."]}),"\n",(0,i.jsxs)(n.p,{children:["For how to test doc changes locally, read the ",(0,i.jsx)(n.a,{href:"/contribute/document-preview",children:"Content Preview Guide"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"syntax",children:"Syntax"}),"\n",(0,i.jsxs)(n.p,{children:["This guide just highlights a few selected important rules and frequently used syntax. For the complete syntax guide, read the ",(0,i.jsx)(n.a,{href:"https://docusaurus.io/docs/markdown-features",children:"Markdown Features"})," document from Docusaurus and ",(0,i.jsx)(n.a,{href:"https://mdxjs.com/docs/what-is-mdx/#markdown",children:"Markdown"})," document from MDX."]}),"\n",(0,i.jsx)(n.h3,{id:"markdown",children:"Markdown"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Use Markdown rather than HTML as much as possible, or else MDX may not recognize it. For example, when constructing complex tables, do not use ",(0,i.jsx)(n.code,{children:"<table>"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Use closing tags. ",(0,i.jsx)(n.code,{children:"<li><li/>"})," and ",(0,i.jsx)(n.code,{children:"<br/>"})," are especially useful for constructing complex tables, such as creating a list and adding a blank line."]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"example-1",children:"Example 1"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-markdown",children:"| Directory | Contains                            |\n|:----------|:------------------------------------|\n| **Hello** | <li>a</li><li>b</li><br/><li>c</li> |\n"})}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Directory"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Contains"})]})}),(0,i.jsx)(n.tbody,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.strong,{children:"Hello"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)("li",{children:"a"}),(0,i.jsx)("li",{children:"b"}),(0,i.jsx)("br",{}),(0,i.jsx)("li",{children:"c"})]})]})})]}),"\n",(0,i.jsx)(n.h4,{id:"example-2",children:"Example 2"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-markdown",children:"| a   | b   | c                        |\n|-----|-----|--------------------------|\n| aa  | bb  | cc1<br/>cc2<br/><br/>cc3 |\n"})}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"a"}),(0,i.jsx)(n.th,{children:"b"}),(0,i.jsx)(n.th,{children:"c"})]})}),(0,i.jsx)(n.tbody,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"aa"}),(0,i.jsx)(n.td,{children:"bb"}),(0,i.jsxs)(n.td,{children:["cc1",(0,i.jsx)("br",{}),"cc2",(0,i.jsx)("br",{}),(0,i.jsx)("br",{}),"cc3"]})]})})]}),"\n",(0,i.jsx)(n.h3,{id:"tab",children:"Tab"}),"\n",(0,i.jsx)(n.p,{children:"Before using multiple tabs, add these imports at the beginning of the file:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-markdown",children:"import Tabs from '@theme/Tabs';\nimport TabItem from '@theme/TabItem'; \n"})}),"\n",(0,i.jsx)(n.p,{children:"Then, you can write tabs as:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-markdown",children:'<Tabs>\n  <TabItem value="apple" label="Apple" default>\n    This is an apple \ud83c\udf4e\n  </TabItem>\n  <TabItem value="orange" label="Orange">\n    This is an orange \ud83c\udf4a\n  </TabItem>\n  <TabItem value="banana" label="Banana">\n    This is a banana \ud83c\udf4c\n  </TabItem>\n</Tabs>\n'})}),"\n",(0,i.jsxs)(a.A,{children:[(0,i.jsx)(o.A,{value:"apple",label:"Apple",default:!0,children:(0,i.jsx)(n.p,{children:"This is an apple \ud83c\udf4e"})}),(0,i.jsx)(o.A,{value:"orange",label:"Orange",children:(0,i.jsx)(n.p,{children:"This is an orange \ud83c\udf4a"})}),(0,i.jsx)(o.A,{value:"banana",label:"Banana",children:(0,i.jsx)(n.p,{children:"This is a banana \ud83c\udf4c"})})]}),"\n",(0,i.jsxs)(n.p,{children:["Read more about how to write multiple tabs at ",(0,i.jsx)(n.a,{href:"https://docusaurus.io/docs/markdown-features/tabs",children:"Tabs"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"code-blocks",children:"Code blocks"}),"\n",(0,i.jsxs)(n.p,{children:["Read more about how to use syntax highlighting and supported languages at ",(0,i.jsx)(n.a,{href:"https://docusaurus.io/docs/markdown-features/code-blocks#syntax-highlighting",children:"Syntax highlighting"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"admonitions",children:"Admonitions"}),"\n",(0,i.jsx)(n.p,{children:"Docusaurus supports these admonitions:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-markdown",children:":::note\n\nSome **content** with _Markdown_ `syntax`.\n\n:::\n\n:::tip\n\nSome **content** with _Markdown_ `syntax`.\n\n:::\n\n:::info\n\nSome **content** with _Markdown_ `syntax`.\n\n:::\n\n:::caution\n\nSome **content** with _Markdown_ `syntax`.\n\n:::\n\n:::danger\n\nSome **content** with _Markdown_ `syntax`.\n\n:::\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["Some ",(0,i.jsx)(n.strong,{children:"content"})," with ",(0,i.jsx)(n.em,{children:"Markdown"})," ",(0,i.jsx)(n.code,{children:"syntax"}),"."]})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["Some ",(0,i.jsx)(n.strong,{children:"content"})," with ",(0,i.jsx)(n.em,{children:"Markdown"})," ",(0,i.jsx)(n.code,{children:"syntax"}),"."]})}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["Some ",(0,i.jsx)(n.strong,{children:"content"})," with ",(0,i.jsx)(n.em,{children:"Markdown"})," ",(0,i.jsx)(n.code,{children:"syntax"}),"."]})}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["Some ",(0,i.jsx)(n.strong,{children:"content"})," with ",(0,i.jsx)(n.em,{children:"Markdown"})," ",(0,i.jsx)(n.code,{children:"syntax"}),"."]})}),"\n",(0,i.jsx)(n.admonition,{type:"danger",children:(0,i.jsxs)(n.p,{children:["Some ",(0,i.jsx)(n.strong,{children:"content"})," with ",(0,i.jsx)(n.em,{children:"Markdown"})," ",(0,i.jsx)(n.code,{children:"syntax"}),"."]})}),"\n",(0,i.jsxs)(n.p,{children:["Read more about how to write admonitions at ",(0,i.jsx)(n.a,{href:"https://docusaurus.io/docs/markdown-features/admonitions",children:"Admonitions"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"assets",children:"Assets"}),"\n",(0,i.jsxs)(n.p,{children:["Static assets are hosted under ",(0,i.jsx)(n.code,{children:"/assets"})," for all documentations:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-markdown",children:"![Page Linking](/assets/page-linking.png)\n"})}),"\n",(0,i.jsx)(n.h3,{id:"indentation-and-space",children:"Indentation and space"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Use the same indentation for running texts and code blocks."}),"\n",(0,i.jsxs)(n.li,{children:["For the content block after an ",(0,i.jsx)(n.strong,{children:"ordered list"}),", indent the content block by only 3 spaces (not 4 spaces)."]}),"\n",(0,i.jsxs)(n.li,{children:["For the content block after an ",(0,i.jsx)(n.strong,{children:"unordered list"}),", indent the content block by only 2 spaces."]}),"\n",(0,i.jsxs)(n.li,{children:["Insert ",(0,i.jsx)(n.strong,{children:"exact one"})," empty line (not two empty lines or more) between code blocks and running texts."]}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["If you don't insert the empty line, the text cannot be rendered properly. You should encounter an error by ",(0,i.jsx)(n.a,{href:"/contribute/document-preview",children:"preview"}),"."]})}),"\n",(0,i.jsx)(n.h3,{id:"metadata",children:"Metadata"}),"\n",(0,i.jsxs)(n.p,{children:["If you create a new ",(0,i.jsx)(n.code,{children:".md"})," file, add quotes for the value of ",(0,i.jsx)(n.code,{children:"sidebar_label"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'---\nid: admin-api-partitioned-topics\ntitle: Managing partitioned topic\nsidebar_label: "Partitioned topics"\n---\n'})}),"\n",(0,i.jsxs)(n.p,{children:["If you don't set the ",(0,i.jsx)(n.code,{children:"sidebar_label"})," property, the label is default to ",(0,i.jsx)(n.code,{children:"title"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"tables",children:"Tables"}),"\n",(0,i.jsx)(n.p,{children:"To help tables be easier to maintain, consider adding additional spaces to the column widths to make them consistent. For examples:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"| App name | Description         | Requirements   |\n| :------- | :------------------ | :------------- |\n| App 1    | Description text 1. | Requirements 1 |\n| App 2    | Description text 2. | None           |\n"})}),"\n",(0,i.jsx)(n.p,{children:"To format tables easily, you can install a plugin or extension in your editor as below:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Visual Studio Code: ",(0,i.jsx)(n.a,{href:"https://marketplace.visualstudio.com/items?itemName=darkriszty.markdown-table-prettify",children:"Markdown Table Prettifier"})]}),"\n",(0,i.jsxs)(n.li,{children:["Sublime Text: ",(0,i.jsx)(n.a,{href:"https://packagecontrol.io/packages/Markdown%20Table%20Formatter",children:"Markdown Table Formatter"})]}),"\n",(0,i.jsxs)(n.li,{children:["Atom: ",(0,i.jsx)(n.a,{href:"https://atom.io/packages/markdown-table-formatter",children:"Markdown Table Formatter"})]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"links",children:"Links"}),"\n",(0,i.jsx)(n.p,{children:"Use links instead of summarizing to help preserve a single source of truth in Pulsar documentation."}),"\n",(0,i.jsx)(n.h4,{id:"anchor-links",children:"Anchor links"}),"\n",(0,i.jsx)(n.p,{children:"Headings generate anchor links when rendered. For example:"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"## This is an example"})," generates the anchor ",(0,i.jsx)(n.code,{children:"#this-is-an-example"}),"."]}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Avoid cross-reference docs to headings unless you need to link to a specific section of the document. This avoids breaking anchors in the future in case the heading is changed."}),"\n",(0,i.jsx)(n.li,{children:"If possible, avoid changing headings, because they're not only linked internally. There are various links to Pulsar documentation on the Internet, such as tutorials, presentations, StackOverflow posts, and other sources."}),"\n"]})}),"\n",(0,i.jsx)(n.h4,{id:"links-to-internal-documentation",children:"Links to internal documentation"}),"\n",(0,i.jsx)(n.p,{children:"Internal refers to documentation in the same Pulsar project."}),"\n",(0,i.jsx)(n.p,{children:"General rules:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Use relative links rather than absolute URLs."}),"\n",(0,i.jsxs)(n.li,{children:["Do not prepend ",(0,i.jsx)(n.code,{children:"./"})," or ",(0,i.jsx)(n.code,{children:"../../"})," to links to files or directories."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Examples:"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Scenario"}),(0,i.jsx)(n.th,{children:"Good"}),(0,i.jsx)(n.th,{children:"Bad"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Cross-reference to other markdown file (/path/xx/ is not needed)"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"[Function overview](function-overview.md)"})}),(0,i.jsxs)(n.td,{children:[(0,i.jsx)("li",{children:(0,i.jsx)(n.code,{children:"[Function overview](functions-overview)"})}),(0,i.jsx)("li",{children:(0,i.jsx)(n.code,{children:"[Function overview](https://pulsar.apache.org/docs/next/functions-overview/)"})}),(0,i.jsx)("li",{children:(0,i.jsx)(n.code,{children:"[Function overview](../../function-overview.md)"})})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Cross-reference to other chapters in the same markdown file (# and - are needed)"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"[Install builtin connectors (optional)](#install-builtin-connectors-optional)"})}),(0,i.jsx)(n.td,{children:"N/A"})]})]})]}),"\n",(0,i.jsxs)(n.p,{children:["Read more about how to write Markdown links at ",(0,i.jsx)(n.a,{href:"https://docusaurus.io/docs/markdown-features/links",children:"Markdown links"}),"."]}),"\n",(0,i.jsx)(n.h4,{id:"links-to-external-documentation",children:"Links to external documentation"}),"\n",(0,i.jsxs)(n.p,{children:["When describing interactions with external software, it's often helpful to include links to external documentation. When possible, make sure that you're linking to an ",(0,i.jsx)(n.a,{href:"#authoritative-sources",children:"authoritative source"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"For example, if you're describing a feature in Microsoft's Active Directory, include a link to the official Microsoft documentation."}),"\n",(0,i.jsx)(n.h4,{id:"link-to-a-specific-line-of-code",children:"Link to a specific line of code"}),"\n",(0,i.jsxs)(n.p,{children:["Use a ",(0,i.jsx)(n.strong,{children:"permalink"})," when linking to a specific line in a file to ensure users land on the line you're referring to though lines of code change over time."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"alt_text",src:t(11818).A+"",width:"348",height:"290"})}),"\n",(0,i.jsx)(n.h3,{id:"authoritative-sources",children:"Authoritative sources"}),"\n",(0,i.jsx)(n.p,{children:"When citing external information, use sources that are written by the people who created the item or product in question. These sources are the most likely to be accurate and remain up to date."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"\u2705 Authoritative sources include the following:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Official documentation for a product."}),"\n",(0,i.jsx)(n.p,{children:"For example, if you're setting up an interface with the Google OAuth 2 authorization server, include a link to Google's documentation."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Official documentation for a project."}),"\n",(0,i.jsxs)(n.p,{children:["For example, if you're citing NodeJS functionality, refer directly to ",(0,i.jsx)(n.a,{href:"https://nodejs.org/en/docs/",children:"NodeJS documentation"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Books from an authoritative publisher."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"\u274c Authoritative sources do not include the following:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Personal blog posts."}),"\n",(0,i.jsx)(n.li,{children:"Documentation from a company that describes another company's product."}),"\n",(0,i.jsx)(n.li,{children:"Non-trustworthy articles."}),"\n",(0,i.jsx)(n.li,{children:"Discussions on forums such as Stack Overflow."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"While many of these sources to avoid can help you learn skills and or features, they can become obsolete quickly. Nobody is obliged to maintain any of these sites. Therefore, you should avoid using them as reference literature."}),"\n",(0,i.jsx)(n.p,{children:"Non-authoritative sources are acceptable only if there is no equivalent authoritative source. Even then, focus on non-authoritative sources that are extensively cited or peer-reviewed."}),"\n",(0,i.jsx)(n.h3,{id:"escape",children:"Escape"}),"\n",(0,i.jsxs)(n.p,{children:["Escape ",(0,i.jsx)(n.code,{children:"<"})," and ",(0,i.jsx)(n.code,{children:">"})," with back-quote or HTML escape characters."]}),"\n",(0,i.jsx)(n.h3,{id:"headings",children:"Headings"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Each documentation page begins with a ",(0,i.jsx)(n.strong,{children:"level 2"})," heading (",(0,i.jsx)(n.code,{children:"##"}),"). This becomes the ",(0,i.jsx)(n.code,{children:"<h1>"})," element when the page is rendered to HTML."]}),"\n",(0,i.jsx)(n.li,{children:"Do not skip a level."}),"\n",(0,i.jsx)(n.li,{children:"Leave one blank line before and after the heading."}),"\n",(0,i.jsx)(n.li,{children:"Do not use links as part of heading text."}),"\n",(0,i.jsxs)(n.li,{children:["When you change the heading text, the anchor link changes. To avoid broken links:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Do not use step numbers in headings."}),"\n",(0,i.jsx)(n.li,{children:"When possible, do not use words that might change in the future."}),"\n"]}),"\n"]}),"\n"]})]})}function x(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},19365:(e,n,t)=>{t.d(n,{A:()=>a});t(96540);var s=t(34164);const i={tabItem:"tabItem_Ymn6"};var r=t(74848);function a(e){let{children:n,hidden:t,className:a}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,s.A)(i.tabItem,a),hidden:t,children:n})}},11470:(e,n,t)=>{t.d(n,{A:()=>k});var s=t(96540),i=t(34164),r=t(23104),a=t(56347),o=t(205),l=t(57485),d=t(31682),c=t(70679);function h(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:n,children:t}=e;return(0,s.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:t,attributes:s,default:i}}=e;return{value:n,label:t,attributes:s,default:i}}))}(t);return function(e){const n=(0,d.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function x(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:t}=e;const i=(0,a.W6)(),r=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l.aZ)(r),(0,s.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(i.location.search);n.set(r,e),i.replace({...i.location,search:n.toString()})}),[r,i])]}function m(e){const{defaultValue:n,queryString:t=!1,groupId:i}=e,r=u(e),[a,l]=(0,s.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!x({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const s=t.find((e=>e.default))??t[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:n,tabValues:r}))),[d,h]=p({queryString:t,groupId:i}),[m,j]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,r]=(0,c.Dv)(t);return[i,(0,s.useCallback)((e=>{t&&r.set(e)}),[t,r])]}({groupId:i}),b=(()=>{const e=d??m;return x({value:e,tabValues:r})?e:null})();(0,o.A)((()=>{b&&l(b)}),[b]);return{selectedValue:a,selectValue:(0,s.useCallback)((e=>{if(!x({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);l(e),h(e),j(e)}),[h,j,r]),tabValues:r}}var j=t(92303);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=t(74848);function g(e){let{className:n,block:t,selectedValue:s,selectValue:a,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:d}=(0,r.a_)(),c=e=>{const n=e.currentTarget,t=l.indexOf(n),i=o[t].value;i!==s&&(d(n),a(i))},h=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":t},n),children:o.map((e=>{let{value:n,label:t,attributes:r}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:s===n?0:-1,"aria-selected":s===n,ref:e=>l.push(e),onKeyDown:h,onClick:c,...r,className:(0,i.A)("tabs__item",b.tabItem,r?.className,{"tabs__item--active":s===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:r}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===r));return e?(0,s.cloneElement)(e,{className:(0,i.A)("margin-top--md",e.props.className)}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function w(e){const n=m(e);return(0,f.jsxs)("div",{className:(0,i.A)("tabs-container",b.tabList),children:[(0,f.jsx)(g,{...n,...e}),(0,f.jsx)(v,{...n,...e})]})}function k(e){const n=(0,j.A)();return(0,f.jsx)(w,{...e,children:h(e.children)},String(n))}},11818:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/obtain-github-permalink-d6b28ee0883705a2adf8cc3993d6b19d.png"},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var s=t(96540);const i={},r=s.createContext(i);function a(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);