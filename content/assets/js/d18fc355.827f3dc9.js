"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[18688],{81039:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>t,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"io-redis-sink","title":"Redis sink connector","description":"You can download all the Pulsar connectors on download page.","source":"@site/versioned_docs/version-3.0.x/io-redis-sink.md","sourceDirName":".","slug":"/io-redis-sink","permalink":"/docs/3.0.x/io-redis-sink","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/versioned_docs/version-3.0.x/io-redis-sink.md","tags":[],"version":"3.0.x","frontMatter":{"id":"io-redis-sink","title":"Redis sink connector","sidebar_label":"Redis sink connector"}}');var d=s(74848),r=s(28453);const t={id:"io-redis-sink",title:"Redis sink connector",sidebar_label:"Redis sink connector"},l=void 0,c={},o=[{value:"Configuration",id:"configuration",level:2},{value:"Property",id:"property",level:3},{value:"Example",id:"example",level:3},{value:"Usage",id:"usage",level:3}];function a(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.admonition,{type:"note",children:(0,d.jsxs)(n.p,{children:["You can download all the Pulsar connectors on ",(0,d.jsx)(n.a,{href:"pathname:///download",children:"download page"}),"."]})}),"\n",(0,d.jsx)(n.p,{children:"The  Redis sink connector pulls messages from Pulsar topics and persists the messages to a Redis database."}),"\n",(0,d.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,d.jsx)(n.p,{children:"The configuration of the Redis sink connector has the following properties."}),"\n",(0,d.jsx)(n.h3,{id:"property",children:"Property"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Name"}),(0,d.jsx)(n.th,{children:"Type"}),(0,d.jsx)(n.th,{children:"Required"}),(0,d.jsx)(n.th,{children:"Default"}),(0,d.jsx)(n.th,{children:"Description"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"redisHosts"})}),(0,d.jsx)(n.td,{children:"String"}),(0,d.jsx)(n.td,{children:"true"}),(0,d.jsx)(n.td,{children:'" " (empty string)'}),(0,d.jsx)(n.td,{children:"A comma-separated list of Redis hosts to connect to."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"redisPassword"})}),(0,d.jsx)(n.td,{children:"String"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:'" " (empty string)'}),(0,d.jsx)(n.td,{children:"The password used to connect to Redis."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"redisDatabase"})}),(0,d.jsx)(n.td,{children:"int"}),(0,d.jsx)(n.td,{children:"true"}),(0,d.jsx)(n.td,{children:"0"}),(0,d.jsx)(n.td,{children:"The Redis database to connect to."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"clientMode"})}),(0,d.jsx)(n.td,{children:"String"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:"Standalone"}),(0,d.jsxs)(n.td,{children:["The client mode when interacting with Redis cluster. ",(0,d.jsx)("br",{}),(0,d.jsx)("br",{}),"Below are the available options: ",(0,d.jsx)("br",{}),(0,d.jsxs)("li",{children:["Standalone",(0,d.jsx)("br",{})]}),(0,d.jsx)("li",{children:"Cluster "})]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"autoReconnect"})}),(0,d.jsx)(n.td,{children:"boolean"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:"true"}),(0,d.jsx)(n.td,{children:"Whether the Redis client automatically reconnect or not."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"requestQueue"})}),(0,d.jsx)(n.td,{children:"int"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:"2147483647"}),(0,d.jsx)(n.td,{children:"The maximum number of queued requests to Redis."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"tcpNoDelay"})}),(0,d.jsx)(n.td,{children:"boolean"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:"Whether to enable TCP with no delay or not."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"keepAlive"})}),(0,d.jsx)(n.td,{children:"boolean"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:"Whether to enable a keepalive to Redis or not."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"connectTimeout"})}),(0,d.jsx)(n.td,{children:"long"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:"10000"}),(0,d.jsx)(n.td,{children:"The time to wait before timing out when connecting in milliseconds."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"operationTimeout"})}),(0,d.jsx)(n.td,{children:"long"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:"10000"}),(0,d.jsx)(n.td,{children:"The time before an operation is marked as timed out in milliseconds ."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"batchTimeMs"})}),(0,d.jsx)(n.td,{children:"int"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:"1000"}),(0,d.jsx)(n.td,{children:"The Redis operation time in milliseconds."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"batchSize"})}),(0,d.jsx)(n.td,{children:"int"}),(0,d.jsx)(n.td,{children:"false"}),(0,d.jsx)(n.td,{children:"200"}),(0,d.jsx)(n.td,{children:"The batch size of writing to Redis database."})]})]})]}),"\n",(0,d.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,d.jsxs)(n.p,{children:["Before using the Redis sink connector, you need to create a configuration file in the path you will start the Pulsar service (",(0,d.jsx)(n.code,{children:"PULSAR_HOME"}),") through one of the following methods."]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"JSON"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-json",children:'{\n   "configs": {\n      "redisHosts": "localhost:6379",\n      "redisPassword": "mypassword",\n      "redisDatabase": "0",\n      "clientMode": "Standalone",\n      "operationTimeout": "2000",\n      "batchSize": "1",\n      "batchTimeMs": "1000",\n      "connectTimeout": "3000"\n   }\n}\n'})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"YAML"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:'configs:\n    redisHosts: "localhost:6379"\n    redisPassword: "mypassword"\n    redisDatabase: 0\n    clientMode: "Standalone"\n    operationTimeout: 2000\n    batchSize: 1\n    batchTimeMs: 1000\n    connectTimeout: 3000\n'})}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"usage",children:"Usage"}),"\n",(0,d.jsx)(n.p,{children:"This example shows how to write records to a Redis database using the Pulsar Redis connector."}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Start a Redis server."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:'docker pull redis:5.0.5\ndocker run -d -p 6379:6379 --name my-redis redis:5.0.5 --requirepass "mypassword"\n'})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Start a Pulsar service locally in standalone mode."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"bin/pulsar standalone\n"})}),"\n",(0,d.jsxs)(n.p,{children:["Make sure the NAR file is available at ",(0,d.jsx)(n.code,{children:"connectors/pulsar-io-redis-3.0.10.nar"}),"."]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Start the Pulsar Redis connector in local run mode using one of the following methods."}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["Use the ",(0,d.jsx)(n.strong,{children:"JSON"})," configuration file as shown previously."]}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:'bin/pulsar-admin sinks localrun \\\n    --archive $PWD/connectors/pulsar-io-redis-3.0.10.nar \\\n    --tenant public \\\n    --namespace default \\\n    --name my-redis-sink \\\n    --sink-config \'{"redisHosts": "localhost:6379","redisPassword": "mypassword","redisDatabase": "0","clientMode": "Standalone","operationTimeout": "3000","batchSize": "1"}\' \\\n    --inputs my-redis-topic\n'})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["Use the ",(0,d.jsx)(n.strong,{children:"YAML"})," configuration file as shown previously."]}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"bin/pulsar-admin sinks localrun \\\n    --archive $PWD/connectors/pulsar-io-redis-3.0.10.nar \\\n    --tenant public \\\n    --namespace default \\\n    --name my-redis-sink \\\n    --sink-config-file $PWD/redis-sink-config.yaml \\\n    --inputs my-redis-topic\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Publish records to the topic."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:'bin/pulsar-client produce \\\n    persistent://public/default/my-redis-topic \\\n    -k "streaming" \\\n    -m "Pulsar"\n'})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Start a Redis client in Docker."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:'docker exec -it my-redis redis-cli -a "mypassword"\n'})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Check the key/value in Redis."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:'127.0.0.1:6379> keys *\n1) "streaming"\n127.0.0.1:6379> get "streaming"\n"Pulsar"\n'})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(a,{...e})}):a(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>l});var i=s(96540);const d={},r=i.createContext(d);function t(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:t(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);