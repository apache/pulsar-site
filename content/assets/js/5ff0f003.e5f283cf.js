"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[47533],{25852:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"setup-debugging","title":"Debugging Pulsar source code in IDE","description":"Getting started to debugging Pulsar in IDE.","source":"@site/contribute/setup-debugging.md","sourceDirName":".","slug":"/setup-debugging","permalink":"/contribute/setup-debugging","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/contribute/setup-debugging.md","tags":[],"version":"current","lastUpdatedBy":"Lari Hotari","lastUpdatedAt":1744107382000,"frontMatter":{"id":"setup-debugging","title":"Debugging Pulsar source code in IDE","sidebar_label":"Debugging","description":"Getting started to debugging Pulsar in IDE."},"sidebar":"sidebarDevelopment","previous":{"title":"Setting up Git for maintenance of Pulsar","permalink":"/contribute/setup-git"},"next":{"title":"Coding conventions","permalink":"/contribute/develop-coding-conventions"}}');var i=s(74848),r=s(28453);const o={id:"setup-debugging",title:"Debugging Pulsar source code in IDE",sidebar_label:"Debugging",description:"Getting started to debugging Pulsar in IDE."},a=void 0,l={},d=[{value:"Debugging Pulsar in Standalone Mode",id:"debugging-pulsar-in-standalone-mode",level:2},{value:"Download and Extract Pulsar Binary Distribution",id:"download-and-extract-pulsar-binary-distribution",level:3},{value:"Run Pulsar in Standalone Mode with Debugger Options",id:"run-pulsar-in-standalone-mode-with-debugger-options",level:3},{value:"Configure IntelliJ IDEA for Remote Debugging",id:"configure-intellij-idea-for-remote-debugging",level:2},{value:"Debugging the source version of Pulsar",id:"debugging-the-source-version-of-pulsar",level:2},{value:"Debugging pulsar-shell and pulsar-client",id:"debugging-pulsar-shell-and-pulsar-client",level:2},{value:"Enabling debug logging for specific classes when running unit tests in IDE or locally",id:"enabling-debug-logging-for-specific-classes-when-running-unit-tests-in-ide-or-locally",level:2}];function g(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"Debugging the Pulsar with its source code can be essential for identifying and resolving issues during development. This page provides step-by-step instructions on debugging Pulsar in standalone mode and debugging the source version of Apache Pulsar."}),"\n",(0,i.jsx)(n.h2,{id:"debugging-pulsar-in-standalone-mode",children:"Debugging Pulsar in Standalone Mode"}),"\n",(0,i.jsx)(n.h3,{id:"download-and-extract-pulsar-binary-distribution",children:"Download and Extract Pulsar Binary Distribution"}),"\n",(0,i.jsx)(n.p,{children:"Download the binary distribution of the desired Pulsar release and extract it to a directory of your choice."}),"\n",(0,i.jsx)(n.h3,{id:"run-pulsar-in-standalone-mode-with-debugger-options",children:"Run Pulsar in Standalone Mode with Debugger Options"}),"\n",(0,i.jsx)(n.p,{children:"Navigate to the Pulsar directory and run the following command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar standalone -nss -nfw\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"suspend=n"})," allows the process to start without waiting for the debugger to connect immediately. You can change ",(0,i.jsx)(n.code,{children:"suspend=n"})," to ",(0,i.jsx)(n.code,{children:"suspend=y"})," if you want the process to wait for the debugger to connect."]})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["In your IDE, follow the instructions at ",(0,i.jsx)(n.a,{href:"/contribute/setup-ide",children:"Setting up an IDE"})," to configure your IDE for Pulsar development."]})}),"\n",(0,i.jsx)(n.h2,{id:"configure-intellij-idea-for-remote-debugging",children:"Configure IntelliJ IDEA for Remote Debugging"}),"\n",(0,i.jsx)(n.p,{children:"First, Open Your Pulsar Project in IntelliJ IDEA:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Open IntelliJ IDEA."}),"\n",(0,i.jsxs)(n.li,{children:["Go to ",(0,i.jsx)(n.code,{children:"File > Open"})," and navigate to your Pulsar project."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Then, create a Remote Debugger Configuration:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Open the ",(0,i.jsx)(n.code,{children:"Run/Debug Configurations"})," dialog by clicking on the dropdown near the top-right corner (next to the ",(0,i.jsx)(n.code,{children:"Run/Debug"})," button) and selecting ",(0,i.jsx)(n.code,{children:"Edit Configurations"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Click the ",(0,i.jsx)(n.code,{children:"+"})," button to add a new configuration and choose ",(0,i.jsx)(n.code,{children:"Remote"})," from the list."]}),"\n",(0,i.jsx)(n.li,{children:'Provide a name for your configuration (e.g., "Pulsar Remote Debugger").'}),"\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"Debugger mode"})," to ",(0,i.jsx)(n.code,{children:"Attach to remote JVM"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"Host"})," to localhost or the IP address of the machine running Pulsar."]}),"\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"Port"})," to the same port number used in your Pulsar startup command (e.g., 5005)."]}),"\n",(0,i.jsxs)(n.li,{children:["Click ",(0,i.jsx)(n.code,{children:"Ok"})," to save the configuration."]}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["To reset the persistent state, you can remove data under the ",(0,i.jsx)(n.code,{children:"data"})," folder before starting, with: ",(0,i.jsx)(n.code,{children:"rm -rf data"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"debugging-the-source-version-of-pulsar",children:"Debugging the source version of Pulsar"}),"\n",(0,i.jsx)(n.p,{children:"Clone and compile Pulsar from source code and run Pulsar in standalone mode with debugger options:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'git clone https://github.com/apache/pulsar\ncd pulsar\nmvn -Pcore-modules,-main -T 1C install -DskipTests -Dspotbugs.skip=true\nOPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar standalone -nss -nfw\n'})}),"\n",(0,i.jsx)(n.h2,{id:"debugging-pulsar-shell-and-pulsar-client",children:"Debugging pulsar-shell and pulsar-client"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'# For Pulsar-Shell\nOPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar-shell\n# For Pulsar-Client\n# Consumer\nOPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar-client consume -s sub apache/pulsar/test-topic -n 0  \n# Producer\nOPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar-client produce apache/pulsar/test-topic  -m "---------hello apache pulsar-------" -n 10\n'})}),"\n",(0,i.jsx)(n.p,{children:"Ensure that the debugger is configured in your IDE to connect to the specified port."}),"\n",(0,i.jsx)(n.p,{children:"By following these steps, you can effectively debug both the standalone mode and the source version of Apache Pulsar, including pulsar-shell and pulsar-client processes."}),"\n",(0,i.jsx)(n.h2,{id:"enabling-debug-logging-for-specific-classes-when-running-unit-tests-in-ide-or-locally",children:"Enabling debug logging for specific classes when running unit tests in IDE or locally"}),"\n",(0,i.jsx)(n.p,{children:"When working on Pulsar unit tests, you sometimes want to enable debug logging for a specific class, a set of classes, or a certain package to observe what the code is doing while you're running it. Stepping through with a debugger isn't a feasible approach for different race conditions and when timings and timeouts are involved. In those cases, you could add debug log statements to the code if they don't already exist. This helps understand the behavior of a failing test case."}),"\n",(0,i.jsxs)(n.p,{children:["For tests in the pulsar-broker module, you need to edit the ",(0,i.jsxs)(n.a,{href:"https://github.com/apache/pulsar/blob/master/pulsar-broker/src/test/resources/log4j2.xml",children:[(0,i.jsx)(n.code,{children:"pulsar-broker/src/test/resources/log4j2.xml"})," file"]})," to enable logging. Adding a ",(0,i.jsx)(n.code,{children:"Logger"})," element in ",(0,i.jsx)(n.code,{children:"Loggers"})," can be used to enable debug logging for a complete package tree or specific classes."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-xml",children:'    <Logger name="<<package or classname>>" level="DEBUG" additivity="false">\n      <AppenderRef ref="CONSOLE"/>\n    </Logger>\n'})}),"\n",(0,i.jsx)(n.p,{children:"Here's an example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-xml",children:'<Configuration xmlns="http://logging.apache.org/log4j/2.0/config"\n               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n               xsi:schemaLocation="http://logging.apache.org/log4j/2.0/config https://logging.apache.org/log4j/2.0/log4j-core.xsd">\n  <Appenders>\n    \x3c!-- setting follow="true" is required for using ConsoleCaptor to validate log messages --\x3e\n    <Console name="CONSOLE" target="SYSTEM_OUT" follow="true">\n      <PatternLayout pattern="%d{ISO8601} - %-5p - [%t:%c{1}] - %m%n"/>\n    </Console>\n  </Appenders>\n  <Loggers>\n    <Root level="INFO">\n      <AppenderRef ref="CONSOLE"/>\n    </Root>\n    <Logger name="org.apache.pulsar.broker.service.persistent.PersistentStickyKeyDispatcherMultipleConsumers" level="DEBUG" additivity="false">\n      <AppenderRef ref="CONSOLE"/>\n    </Logger>\n    \x3c!-- loggers for debugging Key_Shared / PIP-379 --\x3e\n    <Logger name="org.apache.pulsar.broker.service.persistent.PersistentStickyKeyDispatcherMultipleConsumers" level="DEBUG" additivity="false">\n      <AppenderRef ref="CONSOLE"/>\n    </Logger>\n    <Logger name="org.apache.pulsar.broker.service.DrainingHashesTracker" level="DEBUG" additivity="false">\n      <AppenderRef ref="CONSOLE"/>\n    </Logger>\n    <Logger name="org.apache.pulsar.broker.service.persistent.RescheduleReadHandler" level="DEBUG" additivity="false">\n      <AppenderRef ref="CONSOLE"/>\n    </Logger>\n  </Loggers>\n</Configuration>\n'})}),"\n",(0,i.jsxs)(n.p,{children:["You can also set debugging at a package level to debug and exclude classes that are causing verbose logging. In those cases, you'd set the log level to ",(0,i.jsx)(n.code,{children:"WARN"})," for the classes that are too verbose for your debugging case."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-xml",children:'    <Logger name="org.apache.pulsar.client.impl.ClientCnx" level="WARN" additivity="false">\n      <AppenderRef ref="CONSOLE"/>\n    </Logger>\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The same approach can be used to modify Pulsar standalone's logging configuration available at ",(0,i.jsx)(n.code,{children:"conf/log4j2.yaml"})," when you are debugging Pulsar standalone instead of debugging a Pulsar unit test failure. The main difference is that the syntax is in YAML. The default config file contains examples for over logger-specific configuration."]})]})}function c(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(g,{...e})}):g(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var t=s(96540);const i={},r=t.createContext(i);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);