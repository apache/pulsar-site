"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[6295],{50470:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"getting-started-docker","title":"Run a standalone Pulsar cluster in Docker","description":"For local development and testing, you can run Pulsar in standalone mode on your own machine within a Docker container.","source":"@site/versioned_docs/version-3.0.x/getting-started-docker.md","sourceDirName":".","slug":"/getting-started-docker","permalink":"/docs/3.0.x/getting-started-docker","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/versioned_docs/version-3.0.x/getting-started-docker.md","tags":[],"version":"3.0.x","frontMatter":{"id":"getting-started-docker","title":"Run a standalone Pulsar cluster in Docker","sidebar_label":"Run Pulsar in Docker"},"sidebar":"docsSidebar","previous":{"title":"Run Pulsar locally","permalink":"/docs/3.0.x/getting-started-standalone"},"next":{"title":"Run Pulsar in Kubernetes","permalink":"/docs/3.0.x/getting-started-helm"}}');var a=s(74848),r=s(28453);const o={id:"getting-started-docker",title:"Run a standalone Pulsar cluster in Docker",sidebar_label:"Run Pulsar in Docker"},i=void 0,l={},c=[{value:"Start Pulsar in Docker",id:"start-pulsar-in-docker",level:2},{value:"Use Pulsar in Docker",id:"use-pulsar-in-docker",level:2},{value:"Consume a message",id:"consume-a-message",level:3},{value:"Produce a message",id:"produce-a-message",level:3},{value:"Get the topic statistics",id:"get-the-topic-statistics",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"For local development and testing, you can run Pulsar in standalone mode on your own machine within a Docker container."}),"\n",(0,a.jsxs)(n.p,{children:["If you have not installed Docker, download it following ",(0,a.jsx)(n.a,{href:"https://docs.docker.com/get-docker/",children:"the instructions"})," for your OS."]}),"\n",(0,a.jsx)(n.h2,{id:"start-pulsar-in-docker",children:"Start Pulsar in Docker"}),"\n",(0,a.jsx)(n.p,{children:"For macOS, Linux, and Windows, run the following command to start Pulsar within a Docker container."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"docker run -it -p 6650:6650 -p 8080:8080 --mount source=pulsardata,target=/pulsar/data --mount source=pulsarconf,target=/pulsar/conf apachepulsar/pulsar:3.0.9 bin/pulsar standalone\n"})}),"\n",(0,a.jsxs)(n.admonition,{type:"tip",children:[(0,a.jsx)(n.p,{children:"You may encounter issues with the default RocksDB metadata store."}),(0,a.jsx)(n.p,{children:"We recommend you consider using the following environment variable to use ZooKeeper as the metadata store:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"...\n-e PULSAR_STANDALONE_USE_ZOOKEEPER=1 \\\n...\n"})}),(0,a.jsx)(n.p,{children:"Don't apply this fix for existing Pulsar standalone instances if you don't want to loose your data."})]}),"\n",(0,a.jsxs)(n.p,{children:["If you want to change Pulsar configurations and start Pulsar, run the following command by passing environment variables with the ",(0,a.jsx)(n.code,{children:"PULSAR_PREFIX_"})," prefix. See ",(0,a.jsx)(n.a,{href:"https://github.com/apache/pulsar/blob/e6b12c64b043903eb5ff2dc5186fe8030f157cfc/conf/standalone.conf",children:"default configuration file"})," for more details."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:'docker run -it -e PULSAR_PREFIX_xxx=yyy -p 6650:6650  -p 8080:8080 --mount source=pulsardata,target=/pulsar/data --mount source=pulsarconf,target=/pulsar/conf apachepulsar/pulsar:3.0.9 sh -c "bin/apply-config-from-env.py conf/standalone.conf && bin/pulsar standalone"\n'})}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"The docker container runs as UID 10000 and GID 0 by default. You need to ensure the mounted volumes give write permission to either UID 10000 or GID 0. Note that UID 10000 is arbitrary, so it is recommended to make these mounts writable for the root group (GID 0)."}),"\n",(0,a.jsxs)(n.li,{children:['The data, metadata, and configuration are persisted on Docker volumes to not start "fresh" every time the container is restarted. For details on the volumes, you can use ',(0,a.jsx)(n.code,{children:"docker volume inspect <sourcename>"}),"."]}),"\n",(0,a.jsx)(n.li,{children:"For Docker on Windows, make sure to configure it to use Linux containers."}),"\n"]})}),"\n",(0,a.jsxs)(n.p,{children:["After starting Pulsar successfully, you can see ",(0,a.jsx)(n.code,{children:"INFO"}),"-level log messages like this:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"08:18:30.970 [main] INFO  org.apache.pulsar.broker.web.WebService - HTTP Service started at http://0.0.0.0:8080\n...\n07:53:37.322 [main] INFO  org.apache.pulsar.broker.PulsarService - messaging service is ready, bootstrap service port = 8080, broker url= pulsar://localhost:6650, cluster=standalone, configs=org.apache.pulsar.broker.ServiceConfiguration@98b63c1\n...\n"})}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["To perform a health check, you can use the ",(0,a.jsx)(n.code,{children:"bin/pulsar-admin brokers healthcheck"})," command. For more information, see ",(0,a.jsx)(n.a,{href:"pathname:///reference/#/3.0.x/pulsar-admin/",children:"Pulsar admin docs"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:["When you start a local standalone cluster, a ",(0,a.jsx)(n.code,{children:"public/default"})," namespace is created automatically. The namespace is used for development purposes. All Pulsar topics are managed within namespaces. For more information, see ",(0,a.jsx)(n.a,{href:"/docs/3.0.x/concepts-messaging#topics",children:"Topics"}),"."]}),"\n"]})}),"\n",(0,a.jsx)(n.h2,{id:"use-pulsar-in-docker",children:"Use Pulsar in Docker"}),"\n",(0,a.jsxs)(n.p,{children:["Pulsar offers a variety of ",(0,a.jsx)(n.a,{href:"/docs/3.0.x/client-libraries",children:"client libraries"}),", such as ",(0,a.jsx)(n.a,{href:"/docs/3.0.x/client-libraries-java",children:"Java"}),", ",(0,a.jsx)(n.a,{href:"/docs/3.0.x/client-libraries-go",children:"Go"}),", ",(0,a.jsx)(n.a,{href:"/docs/3.0.x/client-libraries-python",children:"Python"}),", ",(0,a.jsx)(n.a,{href:"/docs/3.0.x/client-libraries-cpp",children:"C++"}),"."]}),"\n",(0,a.jsx)(n.p,{children:"If you're running a local standalone cluster, you can use one of these root URLs to interact with your cluster:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"pulsar://localhost:6650"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"http://localhost:8080"})}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["The following example guides you to get started with Pulsar by using the ",(0,a.jsx)(n.a,{href:"https://pulsar.apache.org/api/python/3.6.x",children:"Python client API"}),"."]}),"\n",(0,a.jsxs)(n.p,{children:["Install the Pulsar Python client library directly from ",(0,a.jsx)(n.a,{href:"https://pypi.org/project/pulsar-client/",children:"PyPI"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"pip install pulsar-client\n"})}),"\n",(0,a.jsx)(n.h3,{id:"consume-a-message",children:"Consume a message"}),"\n",(0,a.jsx)(n.p,{children:"Create a consumer and subscribe to the topic:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",children:"import pulsar\n\nclient = pulsar.Client('pulsar://localhost:6650')\nconsumer = client.subscribe('my-topic', subscription_name='my-sub')\n\nwhile True:\n    msg = consumer.receive()\n    print(\"Received message: '%s'\" % msg.data())\n    consumer.acknowledge(msg)\n\nclient.close()\n"})}),"\n",(0,a.jsx)(n.h3,{id:"produce-a-message",children:"Produce a message"}),"\n",(0,a.jsx)(n.p,{children:"Start a producer to send some test messages:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",children:"import pulsar\n\nclient = pulsar.Client('pulsar://localhost:6650')\nproducer = client.create_producer('my-topic')\n\nfor i in range(10):\n    producer.send(('hello-pulsar-%d' % i).encode('utf-8'))\n\nclient.close()\n"})}),"\n",(0,a.jsx)(n.h2,{id:"get-the-topic-statistics",children:"Get the topic statistics"}),"\n",(0,a.jsxs)(n.p,{children:["In Pulsar, you can use REST API, Java, or command-line tools to control every aspect of the system. For details on APIs, refer to ",(0,a.jsx)(n.a,{href:"/docs/3.0.x/admin-api-overview",children:"Admin API Overview"}),"."]}),"\n",(0,a.jsx)(n.p,{children:"In the simplest example, you can use curl to probe the stats for a particular topic:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"curl http://localhost:8080/admin/v2/persistent/public/default/my-topic/stats | python -m json.tool\n"})}),"\n",(0,a.jsx)(n.p,{children:"The output is something like this:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-json",children:'{\n    "msgRateIn": 0.0,\n    "msgThroughputIn": 0.0,\n    "msgRateOut": 1.8332950480217471,\n    "msgThroughputOut": 91.33142602871978,\n    "bytesInCounter": 7097,\n    "msgInCounter": 143,\n    "bytesOutCounter": 6607,\n    "msgOutCounter": 133,\n    "averageMsgSize": 0.0,\n    "msgChunkPublished": false,\n    "storageSize": 7097,\n    "backlogSize": 0,\n    "offloadedStorageSize": 0,\n    "publishers": [\n        {\n            "accessMode": "Shared",\n            "msgRateIn": 0.0,\n            "msgThroughputIn": 0.0,\n            "averageMsgSize": 0.0,\n            "chunkedMessageRate": 0.0,\n            "producerId": 0,\n            "metadata": {},\n            "address": "/127.0.0.1:35604",\n            "connectedSince": "2021-07-04T09:05:43.04788Z",\n            "clientVersion": "2.8.0",\n            "producerName": "standalone-2-5"\n        }\n    ],\n    "waitingPublishers": 0,\n    "subscriptions": {\n        "my-sub": {\n            "msgRateOut": 1.8332950480217471,\n            "msgThroughputOut": 91.33142602871978,\n            "bytesOutCounter": 6607,\n            "msgOutCounter": 133,\n            "msgRateRedeliver": 0.0,\n            "chunkedMessageRate": 0,\n            "msgBacklog": 0,\n            "backlogSize": 0,\n            "msgBacklogNoDelayed": 0,\n            "blockedSubscriptionOnUnackedMsgs": false,\n            "msgDelayed": 0,\n            "unackedMessages": 0,\n            "type": "Exclusive",\n            "activeConsumerName": "3c544f1daa",\n            "msgRateExpired": 0.0,\n            "totalMsgExpired": 0,\n            "lastExpireTimestamp": 0,\n            "lastConsumedFlowTimestamp": 1625389101290,\n            "lastConsumedTimestamp": 1625389546070,\n            "lastAckedTimestamp": 1625389546162,\n            "lastMarkDeleteAdvancedTimestamp": 1625389546163,\n            "consumers": [\n                {\n                    "msgRateOut": 1.8332950480217471,\n                    "msgThroughputOut": 91.33142602871978,\n                    "bytesOutCounter": 6607,\n                    "msgOutCounter": 133,\n                    "msgRateRedeliver": 0.0,\n                    "chunkedMessageRate": 0.0,\n                    "consumerName": "3c544f1daa",\n                    "availablePermits": 867,\n                    "unackedMessages": 0,\n                    "avgMessagesPerEntry": 6,\n                    "blockedConsumerOnUnackedMsgs": false,\n                    "lastAckedTimestamp": 1625389546162,\n                    "lastConsumedTimestamp": 1625389546070,\n                    "metadata": {},\n                    "address": "/127.0.0.1:35472",\n                    "connectedSince": "2021-07-04T08:58:21.287682Z",\n                    "clientVersion": "2.8.0"\n                }\n            ],\n            "isDurable": true,\n            "isReplicated": false,\n            "allowOutOfOrderDelivery": false,\n            "consumersAfterMarkDeletePosition": {},\n            "nonContiguousDeletedMessagesRanges": 0,\n            "nonContiguousDeletedMessagesRangesSerializedSize": 0,\n            "durable": true,\n            "replicated": false\n        }\n    },\n    "replication": {},\n    "deduplicationStatus": "Disabled",\n    "nonContiguousDeletedMessagesRanges": 0,\n    "nonContiguousDeletedMessagesRangesSerializedSize": 0\n}\n'})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>i});var t=s(96540);const a={},r=t.createContext(a);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);