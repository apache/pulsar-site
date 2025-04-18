"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[38502],{78743:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>r,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"setup-buildtools","title":"Setting up JDKs and Maven using SDKMAN","description":"Setting up JDKs and Maven using SDKMAN","source":"@site/contribute/setup-buildtools.md","sourceDirName":".","slug":"/setup-buildtools","permalink":"/contribute/setup-buildtools","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/contribute/setup-buildtools.md","tags":[],"version":"current","lastUpdatedBy":"danish-rehman","lastUpdatedAt":1744900871000,"frontMatter":{"id":"setup-buildtools","title":"Setting up JDKs and Maven using SDKMAN"},"sidebar":"sidebarDevelopment","previous":{"title":"Setup and building","permalink":"/contribute/setup-building"},"next":{"title":"Setting up an IDE","permalink":"/contribute/setup-ide"}}');var t=s(74848),a=s(28453);const l={id:"setup-buildtools",title:"Setting up JDKs and Maven using SDKMAN"},o=void 0,r={},d=[{value:"Setting up JDKs and Maven using SDKMAN",id:"setting-up-jdks-and-maven-using-sdkman",level:2},{value:"Install SDKMAN",id:"install-sdkman",level:3},{value:"Install JDK versions 21 and 17",id:"install-jdk-versions-21-and-17",level:3},{value:"Installing Amazon Corretto OpenJDK versions 21 and 17 using SDKMAN.",id:"installing-amazon-corretto-openjdk-versions-21-and-17-using-sdkman",level:4},{value:"Setting up Java version auto-switching with SDKMAN (optional)",id:"setting-up-java-version-auto-switching-with-sdkman-optional",level:4},{value:"Install Maven",id:"install-maven",level:3}];function u(n){const e={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{id:"setting-up-jdks-and-maven-using-sdkman",children:"Setting up JDKs and Maven using SDKMAN"}),"\n",(0,t.jsx)(e.h3,{id:"install-sdkman",children:"Install SDKMAN"}),"\n",(0,t.jsxs)(e.p,{children:["See ",(0,t.jsx)(e.a,{href:"https://sdkman.io/install",children:"https://sdkman.io/install"})," for detailed instructions."]}),"\n",(0,t.jsx)(e.h3,{id:"install-jdk-versions-21-and-17",children:"Install JDK versions 21 and 17"}),"\n",(0,t.jsxs)(e.p,{children:["In Pulsar development, we use ",(0,t.jsx)(e.a,{href:"https://docs.aws.amazon.com/corretto/",children:"Amazon Corretto OpenJDK"})," to build Pulsar."]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["JDK 21 for Pulsar version >= 3.3","\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"code will be compiled for Java 17 with Java 21"}),"\n",(0,t.jsx)(e.li,{children:"Pulsar docker images are running Java 21 since 3.3.0"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"JDK 17 for Pulsar version >= 2.11"}),"\n",(0,t.jsx)(e.li,{children:"JDK 8 or 11 for Pulsar version < 2.11"}),"\n"]}),"\n",(0,t.jsx)(e.h4,{id:"installing-amazon-corretto-openjdk-versions-21-and-17-using-sdkman",children:"Installing Amazon Corretto OpenJDK versions 21 and 17 using SDKMAN."}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-shell",children:"# find out most recent Amazon Corretto release\nsdk l java |grep amzn\n# install\nsdk i java 21.0.4-amzn\nsdk i java 17.0.12-amzn\n# switching between versions\nsdk u java 17.0.12-amzn\nsdk u java 21.0.4-amzn\n# adding aliases\ncd ~/.sdkman/candidates/java\nln -s 17.0.12-amzn 17\nln -s 21.0.4-amzn 21\n# switching between versions using aliases\nsdk u java 17\nsdk u java 21\n"})}),"\n",(0,t.jsx)(e.h4,{id:"setting-up-java-version-auto-switching-with-sdkman-optional",children:"Setting up Java version auto-switching with SDKMAN (optional)"}),"\n",(0,t.jsxs)(e.p,{children:["With auto-switching, when there's a ",(0,t.jsx)(e.code,{children:".sdkmanrc"})," file in a directory, SDKMAN will switch to the defined Java version.\nThis is convenient for developers to switch between different versions of Java."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-shell",children:"# enable sdkman_auto_env\necho sdkman_auto_env=true >> ~/.sdkman/etc/config\n# ignore .sdkmanrc files by default\necho .sdkmanrc >> ~/.gitignore_global\n# enable the global ~/.gitignore_global file\ngit config --global core.excludesfile $HOME/.gitignore_global\n\n# now you can add .sdkmanrc files to repository directories for automatically switching the JDK version\necho java=21 > .sdkmanrc && cd $PWD\n"})}),"\n",(0,t.jsx)(e.h3,{id:"install-maven",children:"Install Maven"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-shell",children:"sdk i maven 3.9.9\n"})})]})}function c(n={}){const{wrapper:e}={...(0,a.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(u,{...n})}):u(n)}},28453:(n,e,s)=>{s.d(e,{R:()=>l,x:()=>o});var i=s(96540);const t={},a=i.createContext(t);function l(n){const e=i.useContext(a);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:l(n.components),i.createElement(a.Provider,{value:e},n.children)}}}]);