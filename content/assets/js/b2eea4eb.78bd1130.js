"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[25847],{82073:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"sql-deployment-configurations","title":"Pulsar SQL configuration and deployment","description":"You can configure the Pulsar Trino plugin and deploy a cluster with the following instruction.","source":"@site/versioned_docs/version-3.0.x/sql-deployment-configurations.md","sourceDirName":".","slug":"/sql-deployment-configurations","permalink":"/docs/3.0.x/sql-deployment-configurations","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/versioned_docs/version-3.0.x/sql-deployment-configurations.md","tags":[],"version":"3.0.x","frontMatter":{"id":"sql-deployment-configurations","title":"Pulsar SQL configuration and deployment","sidebar_label":"Configuration and deployment"},"sidebar":"docsSidebar","previous":{"title":"Query data","permalink":"/docs/3.0.x/sql-getting-started"},"next":{"title":"REST APIs","permalink":"/docs/3.0.x/sql-rest-api"}}');var o=r(74848),s=r(28453);const a={id:"sql-deployment-configurations",title:"Pulsar SQL configuration and deployment",sidebar_label:"Configuration and deployment"},i=void 0,l={},d=[{value:"Configure Pulsar Trino plugin",id:"configure-pulsar-trino-plugin",level:2},{value:"Enable authentication and authorization between Pulsar and Pulsar SQL",id:"enable-authentication-and-authorization-between-pulsar-and-pulsar-sql",level:3},{value:"Connect Trino to Pulsar with multiple hosts",id:"connect-trino-to-pulsar-with-multiple-hosts",level:3},{value:"Get the last message in a topic",id:"get-the-last-message-in-a-topic",level:3},{value:"Query data from existing Trino clusters",id:"query-data-from-existing-trino-clusters",level:2},{value:"Deploy a new cluster",id:"deploy-a-new-cluster",level:2},{value:"Deploy a cluster on multiple nodes",id:"deploy-a-cluster-on-multiple-nodes",level:3}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"You can configure the Pulsar Trino plugin and deploy a cluster with the following instruction."}),"\n",(0,o.jsx)(n.h2,{id:"configure-pulsar-trino-plugin",children:"Configure Pulsar Trino plugin"}),"\n",(0,o.jsxs)(n.p,{children:["You can configure the Pulsar Trino plugin in the ",(0,o.jsx)(n.code,{children:"${project.root}/trino/conf/catalog/pulsar.properties"})," properties file. The configuration for the connector and the default values are as follows."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-properties",children:'# name of the connector to be displayed in the catalog\nconnector.name=pulsar\n\n# the URL of Pulsar broker service\npulsar.web-service-url=http://localhost:8080\n\n# the URL of Pulsar broker binary service\npulsar.broker-binary-service-url=pulsar://localhost:6650\n\n# the URL of Zookeeper cluster\npulsar.zookeeper-uri=localhost:2181\n\n# minimum number of entries to read at a single time\npulsar.entry-read-batch-size=100\n\n# default number of splits to use per query\npulsar.target-num-splits=4\n\n# max size of one batch message (default value is 5MB)\npulsar.max-message-size=5242880\n\n# number of split used when querying data from Pulsar\npulsar.target-num-splits=2\n\n# size of queue to buffer entry read from Pulsar\npulsar.max-split-entry-queue-size=1000\n\n# size of queue to buffer message extract from entries\npulsar.max-split-message-queue-size=10000\n\n# status provider to record connector metrics\npulsar.stats-provider=org.apache.bookkeeper.stats.NullStatsProvider\n\n# config in map format for stats provider e.g. {"key1":"val1","key2":"val2"}\npulsar.stats-provider-configs={}\n\n# whether to rewrite Pulsar\'s default topic delimiter \'/\'\npulsar.namespace-delimiter-rewrite-enable=false\n\n# delimiter used to rewrite Pulsar\'s default delimiter \'/\', use if default is causing incompatibility with other system like Superset\npulsar.rewrite-namespace-delimiter="/"\n\n# maximum number of thread pool size for ledger offloader.\npulsar.managed-ledger-offload-max-threads=2\n\n# driver used to offload or read cold data to or from long-term storage\npulsar.managed-ledger-offload-driver=null\n\n# directory to load offloaders nar file.\npulsar.offloaders-directory="./offloaders"\n\n# properties and configurations related to specific offloader implementation as map e.g. {"key1":"val1","key2":"val2"}\npulsar.offloader-properties={}\n\n# authentication plugin used to authenticate to Pulsar cluster\npulsar.auth-plugin=null\n\n# authentication parameter used to authenticate to the Pulsar cluster as a string e.g. "key1:val1,key2:val2".\npulsar.auth-params=null\n\n# whether the Pulsar client accept an untrusted TLS certificate from broker\npulsar.tls-allow-insecure-connection=null\n\n# whether to allow hostname verification when a client connects to broker over TLS.\npulsar.tls-hostname-verification-enable=null\n\n# path for the trusted TLS certificate file of Pulsar broker\npulsar.tls-trust-cert-file-path=null\n\n## whether to enable Pulsar authorization\npulsar.authorization-enabled=false\n\n# set the threshold for BookKeeper request throttle, default is disabled\npulsar.bookkeeper-throttle-value=0\n\n# set the number of IO thread\npulsar.bookkeeper-num-io-threads=2 * Runtime.getRuntime().availableProcessors()\n\n# set the number of worker thread\npulsar.bookkeeper-num-worker-threads=Runtime.getRuntime().availableProcessors()\n\n# whether to use BookKeeper V2 wire protocol\npulsar.bookkeeper-use-v2-protocol=true\n\n# interval to check the need for sending an explicit LAC, default is disabled\npulsar.bookkeeper-explicit-interval=0\n\n# size for managed ledger entry cache (in MB).\npulsar.managed-ledger-cache-size-MB=0\n\n# number of threads to be used for managed ledger tasks dispatching\npulsar.managed-ledger-num-worker-threads=Runtime.getRuntime().availableProcessors()\n\n# number of threads to be used for managed ledger scheduled tasks\npulsar.managed-ledger-num-scheduler-threads=Runtime.getRuntime().availableProcessors()\n\n# directory used to store extraction NAR file\npulsar.nar-extraction-directory=System.getProperty("java.io.tmpdir")\n'})}),"\n",(0,o.jsx)(n.h3,{id:"enable-authentication-and-authorization-between-pulsar-and-pulsar-sql",children:"Enable authentication and authorization between Pulsar and Pulsar SQL"}),"\n",(0,o.jsx)(n.p,{children:"By default, the authentication and authorization between Pulsar and Pulsar SQL are disabled."}),"\n",(0,o.jsxs)(n.p,{children:["To enable it, set the following configurations in the ",(0,o.jsx)(n.code,{children:"${project.root}/trino/conf/catalog/pulsar.properties"})," properties file:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-properties",children:"pulsar.authorization-enabled=true\npulsar.broker-binary-service-url=pulsar://localhost:6650\n"})}),"\n",(0,o.jsx)(n.h3,{id:"connect-trino-to-pulsar-with-multiple-hosts",children:"Connect Trino to Pulsar with multiple hosts"}),"\n",(0,o.jsx)(n.p,{children:"You can connect Trino to a Pulsar cluster with multiple hosts."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["To configure multiple hosts for brokers, add multiple URLs to ",(0,o.jsx)(n.code,{children:"pulsar.web-service-url"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["To configure multiple hosts for ZooKeeper, add multiple URIs to ",(0,o.jsx)(n.code,{children:"pulsar.zookeeper-uri"}),"."]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"The following is an example."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-properties",children:"pulsar.web-service-url=http://localhost:8080,localhost:8081,localhost:8082\npulsar.zookeeper-uri=localhost1,localhost2:2181\n"})}),"\n",(0,o.jsx)(n.h3,{id:"get-the-last-message-in-a-topic",children:"Get the last message in a topic"}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["By default, Pulsar SQL ",(0,o.jsx)(n.strong,{children:"does not get the last message in a topic"}),". It is by design and controlled by settings. By default, BookKeeper LAC only advances when subsequent entries are added. If there is no subsequent entry added, the last written entry is not visible to readers until the ledger is closed. This is not a problem for Pulsar which uses managed ledger, but Pulsar SQL directly reads from BookKeeper ledger."]})}),"\n",(0,o.jsx)(n.p,{children:"If you want to get the last message in a topic, set the following configurations:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["For the broker configuration, set ",(0,o.jsx)(n.code,{children:"bookkeeperExplicitLacIntervalInMills"})," > 0 in ",(0,o.jsx)(n.code,{children:"broker.conf"})," or ",(0,o.jsx)(n.code,{children:"standalone.conf"}),"."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["For the Trino configuration, set ",(0,o.jsx)(n.code,{children:"pulsar.bookkeeper-explicit-interval"})," > 0 and ",(0,o.jsx)(n.code,{children:"pulsar.bookkeeper-use-v2-protocol=false"}),"."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"However, using BookKeeper V3 protocol introduces additional GC overhead to BK as it uses Protobuf."}),"\n",(0,o.jsx)(n.h2,{id:"query-data-from-existing-trino-clusters",children:"Query data from existing Trino clusters"}),"\n",(0,o.jsx)(n.p,{children:"If you already have a Trino cluster compatible to version 363, you can copy the Pulsar Trino plugin to your existing cluster. Download the archived plugin package with the following command."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"wget https://archive.apache.org/dist/pulsar/pulsar-3.0.9/apache-pulsar-3.0.9-bin.tar.gz\n"})}),"\n",(0,o.jsx)(n.h2,{id:"deploy-a-new-cluster",children:"Deploy a new cluster"}),"\n",(0,o.jsx)(n.p,{children:"Since Pulsar SQL is powered by Trino, the configuration for deployment is the same for the Pulsar SQL worker."}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["For how to set up a standalone single node environment, refer to ",(0,o.jsx)(n.a,{href:"/docs/3.0.x/sql-getting-started",children:"Query data"}),"."]})}),"\n",(0,o.jsx)(n.p,{children:"You can use the same CLI args as the Trino launcher."}),"\n",(0,o.jsxs)(n.p,{children:["The default configuration for the cluster is located in ",(0,o.jsx)(n.code,{children:"${project.root}/trino/conf"}),". You can customize your deployment by modifying the default configuration."]}),"\n",(0,o.jsx)(n.p,{children:"You can set the worker to read from a different configuration directory, or set a different directory to write data."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"./bin/pulsar sql-worker run --etc-dir /tmp/pulsar/trino/conf --data-dir /tmp/trino-1\n"})}),"\n",(0,o.jsx)(n.p,{children:"You can start the worker as daemon process."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"./bin/pulsar sql-worker start\n"})}),"\n",(0,o.jsx)(n.h3,{id:"deploy-a-cluster-on-multiple-nodes",children:"Deploy a cluster on multiple nodes"}),"\n",(0,o.jsx)(n.p,{children:"You can deploy a Pulsar SQL cluster or Trino cluster on multiple nodes. The following example shows how to deploy a cluster on three-node cluster."}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Copy the Pulsar binary distribution to three nodes."}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["The first node runs as Trino coordinator. The minimal configuration required in the ",(0,o.jsx)(n.code,{children:"${project.root}/trino/conf/config.properties"})," file is as follows."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-properties",children:"coordinator=true\nnode-scheduler.include-coordinator=true\nhttp-server.http.port=8080\nquery.max-memory=50GB\nquery.max-memory-per-node=1GB\ndiscovery-server.enabled=true\ndiscovery.uri=<coordinator-url>\n"})}),"\n",(0,o.jsx)(n.p,{children:"The other two nodes serve as worker nodes, you can use the following configuration for worker nodes."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-properties",children:"coordinator=false\nhttp-server.http.port=8080\nquery.max-memory=50GB\nquery.max-memory-per-node=1GB\ndiscovery.uri=<coordinator-url>\n"})}),"\n",(0,o.jsxs)(n.ol,{start:"2",children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Modify ",(0,o.jsx)(n.code,{children:"pulsar.web-service-url"})," and  ",(0,o.jsx)(n.code,{children:"pulsar.zookeeper-uri"})," configuration in the ",(0,o.jsx)(n.code,{children:"${project.root}/trino/conf/catalog/pulsar.properties"})," file accordingly for the three nodes."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Start the coordinator node:"}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"./bin/pulsar sql-worker run\n"})}),"\n",(0,o.jsxs)(n.ol,{start:"4",children:["\n",(0,o.jsx)(n.li,{children:"Start worker nodes:"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"./bin/pulsar sql-worker run\n"})}),"\n",(0,o.jsxs)(n.ol,{start:"5",children:["\n",(0,o.jsx)(n.li,{children:"Start the SQL CLI and check the status of your cluster:"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"./bin/pulsar sql --server <coordinate_url>\n"})}),"\n",(0,o.jsxs)(n.ol,{start:"6",children:["\n",(0,o.jsx)(n.li,{children:"Check the status of your nodes:"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"trino> SELECT * FROM system.runtime.nodes;\n node_id |        http_uri         | node_version | coordinator | state\n---------+-------------------------+--------------+-------------+--------\n 1       | http://192.168.2.1:8081 | testversion  | true        | active\n 3       | http://192.168.2.2:8081 | testversion  | false       | active\n 2       | http://192.168.2.3:8081 | testversion  | false       | active\n"})}),"\n",(0,o.jsxs)(n.p,{children:["For more information about the deployment in Trino, refer to ",(0,o.jsx)(n.a,{href:"https://trino.io/docs/363/installation/deployment.html",children:"Trino deployment"}),"."]}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:['The broker does not advance LAC, so when Pulsar SQL bypasses brokers to query data, it can only read entries up to the LAC that all the bookies learned. You can enable periodically write LAC on the broker by setting "bookkeeperExplicitLacIntervalInMills" in the ',(0,o.jsx)(n.code,{children:"broker.conf"})," file."]})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>a,x:()=>i});var t=r(96540);const o={},s=t.createContext(o);function a(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);