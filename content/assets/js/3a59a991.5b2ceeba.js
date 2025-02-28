"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[8705],{75979:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>d,contentTitle:()=>c,default:()=>p,frontMatter:()=>l,metadata:()=>n,toc:()=>h});const n=JSON.parse('{"id":"administration-zk-bk","title":"ZooKeeper and BookKeeper administration","description":"Get a comprehensive understanding of ZooKeeper and BookKeeper in Pulsar.","source":"@site/versioned_docs/version-3.3.x/administration-zk-bk.md","sourceDirName":".","slug":"/administration-zk-bk","permalink":"/docs/3.3.x/administration-zk-bk","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/versioned_docs/version-3.3.x/administration-zk-bk.md","tags":[],"version":"3.3.x","frontMatter":{"id":"administration-zk-bk","title":"ZooKeeper and BookKeeper administration","sidebar_label":"ZooKeeper and BookKeeper","description":"Get a comprehensive understanding of ZooKeeper and BookKeeper in Pulsar."},"sidebar":"docsSidebar","previous":{"title":"Docker","permalink":"/docs/3.3.x/deploy-docker"},"next":{"title":"Configure metadata store","permalink":"/docs/3.3.x/administration-metadata-store"}}');var o=s(74848),i=s(28453),t=s(89089),a=s(19365);const l={id:"administration-zk-bk",title:"ZooKeeper and BookKeeper administration",sidebar_label:"ZooKeeper and BookKeeper",description:"Get a comprehensive understanding of ZooKeeper and BookKeeper in Pulsar."},c=void 0,d={},h=[{value:"ZooKeeper",id:"zookeeper",level:2},{value:"Deploy local ZooKeeper",id:"deploy-local-zookeeper",level:3},{value:"Deploy configuration store",id:"deploy-configuration-store",level:3},{value:"Single-cluster Pulsar instance",id:"single-cluster-pulsar-instance",level:4},{value:"Multi-cluster Pulsar instance",id:"multi-cluster-pulsar-instance",level:4},{value:"Start the service",id:"start-the-service",level:5},{value:"ZooKeeper configuration",id:"zookeeper-configuration",level:3},{value:"Configure batching operations",id:"configure-batching-operations",level:4},{value:"BookKeeper",id:"bookkeeper",level:2},{value:"Hardware requirements",id:"hardware-requirements",level:3},{value:"Configure BookKeeper",id:"configure-bookkeeper",level:3},{value:"Deploy BookKeeper",id:"deploy-bookkeeper",level:3},{value:"Start bookies manually",id:"start-bookies-manually",level:3},{value:"Decommission bookies cleanly",id:"decommission-bookies-cleanly",level:3},{value:"BookKeeper persistence policies",id:"bookkeeper-persistence-policies",level:2},{value:"Set persistence policies",id:"set-persistence-policies",level:3},{value:"List persistence policies",id:"list-persistence-policies",level:3}];function u(e){const r={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.p,{children:"Pulsar relies on two external systems for essential tasks:"}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsxs)(r.li,{children:[(0,o.jsx)(r.a,{href:"https://zookeeper.apache.org/",children:"ZooKeeper"})," is responsible for a wide variety of configuration-related and coordination-related tasks."]}),"\n",(0,o.jsxs)(r.li,{children:[(0,o.jsx)(r.a,{href:"http://bookkeeper.apache.org/",children:"BookKeeper"})," is responsible for ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/concepts-architecture-overview#persistent-storage",children:"persistent storage"})," of message data."]}),"\n"]}),"\n",(0,o.jsxs)(r.p,{children:["ZooKeeper and BookKeeper are both open-source ",(0,o.jsx)(r.a,{href:"https://www.apache.org/",children:"Apache"})," projects.\nThis diagram illustrates the role of ZooKeeper and BookKeeper in a Pulsar cluster:"]}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.img,{alt:"Role of ZooKeeper and BookKeeper in Pulsar cluster",src:s(42702).A+"",width:"1181",height:"781"})}),"\n",(0,o.jsx)(r.p,{children:"Each Pulsar cluster consists of one or more message brokers. Each broker relies on an ensemble of bookies."}),"\n",(0,o.jsx)(r.h2,{id:"zookeeper",children:"ZooKeeper"}),"\n",(0,o.jsx)(r.p,{children:"Each Pulsar instance relies on two separate ZooKeeper quorums."}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsxs)(r.li,{children:[(0,o.jsx)(r.a,{href:"#deploy-local-zookeeper",children:"Local ZooKeeper"})," operates at the cluster level and provides cluster-specific configuration management and coordination. Each Pulsar cluster needs to have a dedicated ZooKeeper cluster."]}),"\n",(0,o.jsxs)(r.li,{children:[(0,o.jsx)(r.a,{href:"#deploy-configuration-store",children:"Configuration Store"})," operates at the instance level and provides configuration management for the entire system (and thus across clusters). An independent cluster of machines or the same machines that local ZooKeeper uses can provide the configuration store quorum."]}),"\n"]}),"\n",(0,o.jsx)(r.h3,{id:"deploy-local-zookeeper",children:"Deploy local ZooKeeper"}),"\n",(0,o.jsx)(r.p,{children:"ZooKeeper manages a variety of essential coordination-related and configuration-related tasks for Pulsar."}),"\n",(0,o.jsxs)(r.p,{children:["To deploy a Pulsar instance, you need to stand up one local ZooKeeper cluster ",(0,o.jsx)(r.em,{children:"per Pulsar cluster"}),"."]}),"\n",(0,o.jsxs)(r.p,{children:["To begin, add all ZooKeeper servers to the quorum configuration specified in the ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-configuration#zookeeper",children:(0,o.jsx)(r.code,{children:"conf/zookeeper.conf"})})," file. Add a ",(0,o.jsx)(r.code,{children:"server.N"})," line for each node in the cluster to the configuration, where ",(0,o.jsx)(r.code,{children:"N"})," is the number of the ZooKeeper node. The following is an example of a three-node cluster:"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-properties",children:"server.1=zk1.us-west.example.com:2888:3888\nserver.2=zk2.us-west.example.com:2888:3888\nserver.3=zk3.us-west.example.com:2888:3888\n"})}),"\n",(0,o.jsxs)(r.p,{children:["On each host, you need to specify the node ID in ",(0,o.jsx)(r.code,{children:"myid"})," file of each node, which is in ",(0,o.jsx)(r.code,{children:"data/zookeeper"})," folder of each server by default (you can change the file location via the ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-configuration#zookeeper-dataDir",children:(0,o.jsx)(r.code,{children:"dataDir"})})," parameter)."]}),"\n",(0,o.jsxs)(r.p,{children:["For detailed information on ",(0,o.jsx)(r.code,{children:"myid"})," and more, see the ",(0,o.jsx)(r.a,{href:"https://zookeeper.apache.org/doc/r3.4.10/zookeeperAdmin.html#sc_zkMulitServerSetup",children:"Multi-server setup guide"})," in the ZooKeeper documentation."]}),"\n",(0,o.jsxs)(r.p,{children:["On a ZooKeeper server at ",(0,o.jsx)(r.code,{children:"zk1.us-west.example.com"}),", for example, you can set the ",(0,o.jsx)(r.code,{children:"myid"})," value like this:"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-shell",children:"mkdir -p data/zookeeper\necho 1 > data/zookeeper/myid\n"})}),"\n",(0,o.jsxs)(r.p,{children:["On ",(0,o.jsx)(r.code,{children:"zk2.us-west.example.com"})," the command is ",(0,o.jsx)(r.code,{children:"echo 2 > data/zookeeper/myid"})," and so on."]}),"\n",(0,o.jsxs)(r.p,{children:["Once you add each server to the ",(0,o.jsx)(r.code,{children:"zookeeper.conf"})," configuration and each server has the appropriate ",(0,o.jsx)(r.code,{children:"myid"})," entry, you can start ZooKeeper on all hosts (in the background, using nohup) with the ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-cli-tools",children:(0,o.jsx)(r.code,{children:"pulsar-daemon"})})," CLI tool:"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-shell",children:"bin/pulsar-daemon start zookeeper\n"})}),"\n",(0,o.jsx)(r.h3,{id:"deploy-configuration-store",children:"Deploy configuration store"}),"\n",(0,o.jsxs)(r.p,{children:["The ZooKeeper cluster configured and started up in the section above is a ",(0,o.jsx)(r.em,{children:"local"})," ZooKeeper cluster that you can use to manage a single Pulsar cluster. In addition to a local cluster, however, a full Pulsar instance also requires a configuration store for handling some instance-level configuration and coordination tasks."]}),"\n",(0,o.jsxs)(r.p,{children:["If you deploy a ",(0,o.jsx)(r.a,{href:"#single-cluster-pulsar-instance",children:"single-cluster"})," instance, you do not need a separate cluster for the configuration store. If, however, you deploy a ",(0,o.jsx)(r.a,{href:"#multi-cluster-pulsar-instance",children:"multi-cluster"})," instance, you need to stand up a separate ZooKeeper cluster for configuration tasks."]}),"\n",(0,o.jsx)(r.h4,{id:"single-cluster-pulsar-instance",children:"Single-cluster Pulsar instance"}),"\n",(0,o.jsx)(r.p,{children:"If your Pulsar instance consists of just one cluster, then you can deploy a configuration store on the same machines as the local ZooKeeper quorum but run on different TCP ports."}),"\n",(0,o.jsxs)(r.p,{children:["To deploy a ZooKeeper configuration store in a single-cluster instance, add the same ZooKeeper servers that the local quorum uses to the configuration file in ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-configuration#configuration-store",children:(0,o.jsx)(r.code,{children:"conf/global_zookeeper.conf"})})," using the same method for ",(0,o.jsx)(r.a,{href:"#deploy-local-zookeeper",children:"local ZooKeeper"}),", but make sure to use a different port (2181 is the default for ZooKeeper). The following is an example that uses port 2184 for a three-node ZooKeeper cluster:"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-properties",children:"clientPort=2184\nserver.1=zk1.us-west.example.com:2185:2186\nserver.2=zk2.us-west.example.com:2185:2186\nserver.3=zk3.us-west.example.com:2185:2186\n"})}),"\n",(0,o.jsxs)(r.p,{children:["As before, create the ",(0,o.jsx)(r.code,{children:"myid"})," files for each server on ",(0,o.jsx)(r.code,{children:"data/global-zookeeper/myid"}),"."]}),"\n",(0,o.jsx)(r.h4,{id:"multi-cluster-pulsar-instance",children:"Multi-cluster Pulsar instance"}),"\n",(0,o.jsx)(r.p,{children:"When you deploy a global Pulsar instance, with clusters distributed across different geographical regions, the configuration store serves as a highly available and strongly consistent metadata store that can tolerate failures and partitions spanning whole regions."}),"\n",(0,o.jsx)(r.p,{children:"The key here is to make sure the ZK quorum members are spread across at least 3 regions and that other regions run as observers."}),"\n",(0,o.jsx)(r.p,{children:"Again, given the very low expected load on the configuration store servers, you can share the same hosts used for the local ZooKeeper quorum."}),"\n",(0,o.jsxs)(r.p,{children:["For example, you can assume a Pulsar instance with the following clusters ",(0,o.jsx)(r.code,{children:"us-west"}),", ",(0,o.jsx)(r.code,{children:"us-east"}),", ",(0,o.jsx)(r.code,{children:"us-central"}),", ",(0,o.jsx)(r.code,{children:"eu-central"}),", ",(0,o.jsx)(r.code,{children:"ap-south"}),". Also you can assume, each cluster has its own local ZK servers named such as ",(0,o.jsx)(r.code,{children:"zk[1-3].${CLUSTER}.example.com"}),"."]}),"\n",(0,o.jsxs)(r.p,{children:["In this scenario, you want to pick the quorum participants from a few clusters and let all the others be ZK observers. For example, to form a 7 servers quorum, you can pick 3 servers from ",(0,o.jsx)(r.code,{children:"us-west"}),", 2 from ",(0,o.jsx)(r.code,{children:"us-central"})," and 2 from ",(0,o.jsx)(r.code,{children:"us-east"}),"."]}),"\n",(0,o.jsx)(r.p,{children:"This guarantees writing to the configuration store is possible even if one of these regions is unreachable."}),"\n",(0,o.jsx)(r.p,{children:"The ZK configuration in all the servers looks like below:"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-properties",children:"clientPort=2184\nserver.1=zk1.us-west.example.com:2185:2186\nserver.2=zk2.us-west.example.com:2185:2186\nserver.3=zk3.us-west.example.com:2185:2186\nserver.4=zk1.us-central.example.com:2185:2186\nserver.5=zk2.us-central.example.com:2185:2186\nserver.6=zk3.us-central.example.com:2185:2186:observer\nserver.7=zk1.us-east.example.com:2185:2186\nserver.8=zk2.us-east.example.com:2185:2186\nserver.9=zk3.us-east.example.com:2185:2186:observer\nserver.10=zk1.eu-central.example.com:2185:2186:observer\nserver.11=zk2.eu-central.example.com:2185:2186:observer\nserver.12=zk3.eu-central.example.com:2185:2186:observer\nserver.13=zk1.ap-south.example.com:2185:2186:observer\nserver.14=zk2.ap-south.example.com:2185:2186:observer\nserver.15=zk3.ap-south.example.com:2185:2186:observer\n"})}),"\n",(0,o.jsx)(r.p,{children:"Additionally, ZK observers need to have:"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-properties",children:"peerType=observer\n"})}),"\n",(0,o.jsx)(r.h5,{id:"start-the-service",children:"Start the service"}),"\n",(0,o.jsxs)(r.p,{children:["Once your configuration store configuration is in place, you can start up the service using ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-cli-tools",children:(0,o.jsx)(r.code,{children:"pulsar-daemon"})})]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-shell",children:"bin/pulsar-daemon start configuration-store\n"})}),"\n",(0,o.jsx)(r.h3,{id:"zookeeper-configuration",children:"ZooKeeper configuration"}),"\n",(0,o.jsxs)(r.p,{children:["In Pulsar, ZooKeeper configuration is handled by two separate configuration files in the ",(0,o.jsx)(r.code,{children:"conf"})," directory of your Pulsar installation:"]}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsxs)(r.li,{children:["The ",(0,o.jsx)(r.code,{children:"conf/zookeeper.conf"})," file handles the configuration for local ZooKeeper."]}),"\n",(0,o.jsxs)(r.li,{children:["The ",(0,o.jsx)(r.code,{children:"conf/global-zookeeper.conf"})," file handles the configuration for the configuration store.\nSee ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-configuration#zookeeper",children:"parameters"})," for more details."]}),"\n"]}),"\n",(0,o.jsx)(r.h4,{id:"configure-batching-operations",children:"Configure batching operations"}),"\n",(0,o.jsx)(r.p,{children:"Using the batching operations reduces the remote procedure call (RPC) traffic between the ZooKeeper client and servers. It also reduces the number of write transactions, because each batching operation corresponds to a single ZooKeeper transaction, containing multiple read and write operations."}),"\n",(0,o.jsx)(r.p,{children:"The following figure demonstrates a basic benchmark of batching read/write operations that can be requested to ZooKeeper in one second:"}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.img,{alt:"Zookeeper batching benchmark",src:s(92680).A+"",width:"2364",height:"728"})}),"\n",(0,o.jsxs)(r.p,{children:["To enable batching operations, set the ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-configuration#broker",children:(0,o.jsx)(r.code,{children:"metadataStoreBatchingEnabled"})})," parameter to ",(0,o.jsx)(r.code,{children:"true"})," on the broker side."]}),"\n",(0,o.jsx)(r.h2,{id:"bookkeeper",children:"BookKeeper"}),"\n",(0,o.jsxs)(r.p,{children:["BookKeeper is a scalable, low-latency persistent log storage service that Pulsar uses to store all durable data. BookKeeper is a distributed ",(0,o.jsx)(r.a,{href:"https://en.wikipedia.org/wiki/Write-ahead_logging",children:"write-ahead log"})," WAL system that guarantees read consistency of independent message logs calls ledgers. Individual BookKeeper servers are also called ",(0,o.jsx)(r.em,{children:"bookies"}),"."]}),"\n",(0,o.jsxs)(r.blockquote,{children:["\n",(0,o.jsxs)(r.p,{children:["To manage message persistence, retention, and expiry in Pulsar, refer to ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/cookbooks-retention-expiry",children:"cookbook"}),"."]}),"\n"]}),"\n",(0,o.jsx)(r.h3,{id:"hardware-requirements",children:"Hardware requirements"}),"\n",(0,o.jsx)(r.p,{children:"Bookie hosts store message data on disk. To provide optimal performance, ensure that the bookies have a suitable hardware configuration. The following are two key dimensions of bookie hardware capacity:"}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsx)(r.li,{children:"Disk I/O capacity read/write"}),"\n",(0,o.jsx)(r.li,{children:"Storage capacity"}),"\n"]}),"\n",(0,o.jsx)(r.p,{children:"Message entries written to bookies are always synced to disk before returning an acknowledgment to the Pulsar broker by default. To ensure low write latency, BookKeeper is designed to use multiple devices:"}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsxs)(r.li,{children:["A ",(0,o.jsx)(r.strong,{children:"journal"})," to ensure durability. For sequential writes, it is critical to have fast ",(0,o.jsx)(r.a,{href:"https://linux.die.net/man/2/fsync",children:"fsync"})," operations on bookie hosts. Typically, small and fast ",(0,o.jsx)(r.a,{href:"https://en.wikipedia.org/wiki/Solid-state_drive",children:"solid-state drives"})," (SSDs) should suffice, or ",(0,o.jsx)(r.a,{href:"https://en.wikipedia.org/wiki/Hard_disk_drive",children:"hard disk drives"})," (HDDs) with a ",(0,o.jsx)(r.a,{href:"https://en.wikipedia.org/wiki/RAID",children:"RAID"})," controller and a battery-backed write cache. Both solutions can reach fsync latency of ~0.4 ms."]}),"\n",(0,o.jsxs)(r.li,{children:["A ",(0,o.jsx)(r.strong,{children:"ledger storage device"})," stores data. Writes happen in the background, so writing I/O is not a big concern. Reads happen sequentially most of the time and the backlog is drained only in case of consumer drain. To store large amounts of data, a typical configuration involves multiple HDDs with a RAID controller."]}),"\n"]}),"\n",(0,o.jsx)(r.h3,{id:"configure-bookkeeper",children:"Configure BookKeeper"}),"\n",(0,o.jsxs)(r.p,{children:["You can configure BookKeeper bookies using the ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-configuration#bookkeeper",children:(0,o.jsx)(r.code,{children:"conf/bookkeeper.conf"})})," configuration file. When you configure each bookie, ensure that the ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-configuration#bookkeeper-zkServers",children:(0,o.jsx)(r.code,{children:"zkServers"})})," parameter is set to the connection string for local ZooKeeper of the Pulsar cluster."]}),"\n",(0,o.jsxs)(r.p,{children:["The minimum configuration changes required in ",(0,o.jsx)(r.code,{children:"conf/bookkeeper.conf"})," are as follows:"]}),"\n",(0,o.jsx)(r.admonition,{type:"note",children:(0,o.jsxs)(r.p,{children:["Set ",(0,o.jsx)(r.code,{children:"journalDirectory"})," and ",(0,o.jsx)(r.code,{children:"ledgerDirectories"})," carefully. It is difficult to change them later."]})}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-properties",children:"# Change to point to journal disk mount point\njournalDirectory=data/bookkeeper/journal\n\n# Point to ledger storage disk mount point\nledgerDirectories=data/bookkeeper/ledgers\n\n# Point to local ZK quorum\nzkServers=zk1.example.com:2181,zk2.example.com:2181,zk3.example.com:2181\n\n#It is recommended to set this parameter. Otherwise, BookKeeper can't start normally in certain environments (for example, Huawei Cloud).\nadvertisedAddress=\n"})}),"\n",(0,o.jsxs)(r.p,{children:["To change the ZooKeeper root path that BookKeeper uses, use ",(0,o.jsx)(r.code,{children:"zkLedgersRootPath=/MY-PREFIX/ledgers"})," instead of ",(0,o.jsx)(r.code,{children:"zkServers=localhost:2181/MY-PREFIX"}),"."]}),"\n",(0,o.jsxs)(r.p,{children:["For more information about BookKeeper, refer to the official ",(0,o.jsx)(r.a,{href:"http://bookkeeper.apache.org",children:"BookKeeper docs"}),"."]}),"\n",(0,o.jsx)(r.h3,{id:"deploy-bookkeeper",children:"Deploy BookKeeper"}),"\n",(0,o.jsxs)(r.p,{children:["BookKeeper provides ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/concepts-architecture-overview#persistent-storage",children:"persistent message storage"})," for Pulsar. Each Pulsar broker has its own cluster of bookies. The BookKeeper cluster shares a local ZooKeeper quorum with the Pulsar cluster."]}),"\n",(0,o.jsx)(r.h3,{id:"start-bookies-manually",children:"Start bookies manually"}),"\n",(0,o.jsx)(r.p,{children:"You can start a bookie in the foreground or as a background daemon."}),"\n",(0,o.jsxs)(r.p,{children:["To start a bookie in the foreground, use the ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-cli-tools",children:(0,o.jsx)(r.code,{children:"bookkeeper"})})," CLI tool:"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-bash",children:"bin/bookkeeper bookie\n"})}),"\n",(0,o.jsxs)(r.p,{children:["To start a bookie in the background, use the ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-cli-tools",children:(0,o.jsx)(r.code,{children:"pulsar-daemon"})})," CLI tool:"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-bash",children:"bin/pulsar-daemon start bookie\n"})}),"\n",(0,o.jsxs)(r.p,{children:["You can verify whether the bookie works properly with the ",(0,o.jsx)(r.code,{children:"bookiesanity"})," command for the ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-cli-tools",children:"BookKeeper shell"}),":"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-shell",children:"bin/bookkeeper shell bookiesanity\n"})}),"\n",(0,o.jsx)(r.p,{children:"When you use this command, you create a new ledger on the local bookie, write a few entries, read them back and finally delete the ledger."}),"\n",(0,o.jsx)(r.h3,{id:"decommission-bookies-cleanly",children:"Decommission bookies cleanly"}),"\n",(0,o.jsx)(r.p,{children:"Before you decommission a bookie, you need to check your environment and meet the following requirements."}),"\n",(0,o.jsxs)(r.ol,{children:["\n",(0,o.jsxs)(r.li,{children:["\n",(0,o.jsxs)(r.p,{children:["Ensure the state of your cluster supports decommissioning the target bookie. Check if ",(0,o.jsx)(r.code,{children:"EnsembleSize &gt;= Write Quorum &gt;= Ack Quorum"})," is ",(0,o.jsx)(r.code,{children:"true"})," with one less bookie."]}),"\n"]}),"\n",(0,o.jsxs)(r.li,{children:["\n",(0,o.jsxs)(r.p,{children:["Ensure the target bookie is listed after using the ",(0,o.jsx)(r.code,{children:"listbookies"})," command."]}),"\n"]}),"\n",(0,o.jsxs)(r.li,{children:["\n",(0,o.jsx)(r.p,{children:"Ensure that no other process is ongoing (upgrade etc)."}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(r.p,{children:"And then you can decommission bookies safely. To decommission bookies, complete the following steps."}),"\n",(0,o.jsxs)(r.ol,{children:["\n",(0,o.jsxs)(r.li,{children:["\n",(0,o.jsxs)(r.p,{children:["Log in to the bookie node, and check if there are under-replicated ledgers. The decommission command force to replicate the underreplicated ledgers.\n",(0,o.jsx)(r.code,{children:"bin/bookkeeper shell listunderreplicated"})]}),"\n"]}),"\n",(0,o.jsxs)(r.li,{children:["\n",(0,o.jsx)(r.p,{children:"Stop the bookie by killing the bookie process. Make sure that no liveness/readiness probes setup for the bookies to spin them back up if you deploy it in a Kubernetes environment."}),"\n"]}),"\n",(0,o.jsxs)(r.li,{children:["\n",(0,o.jsx)(r.p,{children:"Run the decommission command."}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsxs)(r.li,{children:["If you have logged in to the node to be decommissioned, you do not need to provide ",(0,o.jsx)(r.code,{children:"-bookieid"}),"."]}),"\n",(0,o.jsxs)(r.li,{children:["If you are running the decommission command for the target bookie node from another bookie node, you should mention the target bookie ID in the arguments for ",(0,o.jsx)(r.code,{children:"-bookieid"}),"\n",(0,o.jsx)(r.code,{children:"bin/bookkeeper shell decommissionbookie"}),"\nor\n",(0,o.jsx)(r.code,{children:"bin/bookkeeper shell decommissionbookie -bookieid <target bookieid>"})]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(r.li,{children:["\n",(0,o.jsxs)(r.p,{children:["Validate that no ledgers are on the decommissioned bookie.\n",(0,o.jsx)(r.code,{children:"bin/bookkeeper shell listledgers -bookieid <target bookieid>"})]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(r.p,{children:"You can run the following command to check if the bookie you have decommissioned is listed:"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-bash",children:"bin/bookkeeper shell listbookies -rw -h\nbin/bookkeeper shell listbookies -ro -h\n"})}),"\n",(0,o.jsx)(r.h2,{id:"bookkeeper-persistence-policies",children:"BookKeeper persistence policies"}),"\n",(0,o.jsxs)(r.p,{children:["In Pulsar, you can set ",(0,o.jsx)(r.em,{children:"persistence policies"})," at the namespace level, which determines how BookKeeper handles persistent storage of messages. Policies determine four things:"]}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsxs)(r.li,{children:["Ensemble (E) size, Number of ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-terminology#bookie",children:"bookies"})," to use for storing entries in a ledger."]}),"\n",(0,o.jsxs)(r.li,{children:["Write quorum (Q",(0,o.jsx)("sub",{children:"w"}),") size, Replication factor for storing entries (messages) in a ledger."]}),"\n",(0,o.jsxs)(r.li,{children:["Ack quorum (Q",(0,o.jsx)("sub",{children:"a"}),") size, Number of guaranteed copies (acks to wait for before a write is considered completed)."]}),"\n",(0,o.jsx)(r.li,{children:"The throttling rate for mark-delete operations."}),"\n"]}),"\n",(0,o.jsx)(r.h3,{id:"set-persistence-policies",children:"Set persistence policies"}),"\n",(0,o.jsxs)(r.p,{children:["You can set persistence policies for BookKeeper at the ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-terminology#namespace",children:"namespace"})," level."]}),"\n",(0,o.jsxs)(t.A,{groupId:"policies",defaultValue:"Pulsar-admin",values:[{label:"Pulsar-admin",value:"Pulsar-admin"},{label:"REST API",value:"REST API"},{label:"Java",value:"Java"}],children:[(0,o.jsxs)(a.A,{value:"Pulsar-admin",children:[(0,o.jsxs)(r.p,{children:["Use the ",(0,o.jsx)(r.a,{href:"pathname:///reference/#/3.3.x/pulsar-admin/namespaces?id=set-persistence",children:(0,o.jsx)(r.code,{children:"set-persistence"})})," subcommand and specify a namespace as well as any policies that you want to apply. The available flags are:"]}),(0,o.jsxs)(r.table,{children:[(0,o.jsx)(r.thead,{children:(0,o.jsxs)(r.tr,{children:[(0,o.jsx)(r.th,{style:{textAlign:"left"},children:"Flag"}),(0,o.jsx)(r.th,{style:{textAlign:"left"},children:"Description"}),(0,o.jsx)(r.th,{style:{textAlign:"left"},children:"Default"})]})}),(0,o.jsxs)(r.tbody,{children:[(0,o.jsxs)(r.tr,{children:[(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:[(0,o.jsx)(r.code,{children:"-e"}),", ",(0,o.jsx)(r.code,{children:"--bookkeeper-ensemble"})]}),(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:["Ensemble (E) size, Number of ",(0,o.jsx)(r.a,{href:"/docs/3.3.x/reference-terminology#bookie",children:"bookies"})," to use for storing entries in a ledger."]}),(0,o.jsx)(r.td,{style:{textAlign:"left"},children:"0"})]}),(0,o.jsxs)(r.tr,{children:[(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:[(0,o.jsx)(r.code,{children:"-w"}),", ",(0,o.jsx)(r.code,{children:"--bookkeeper-write-quorum"})]}),(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:["Write quorum (Q",(0,o.jsx)("sub",{children:"w"}),") size, Replication factor for storing entries (messages) in a ledger."]}),(0,o.jsx)(r.td,{style:{textAlign:"left"},children:"0"})]}),(0,o.jsxs)(r.tr,{children:[(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:[(0,o.jsx)(r.code,{children:"-a"}),", ",(0,o.jsx)(r.code,{children:"--bookkeeper-ack-quorum"})]}),(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:["Ack quorum (Q",(0,o.jsx)("sub",{children:"a"}),") size, Number of guaranteed copies (acks to wait for before a write is considered completed)"]}),(0,o.jsx)(r.td,{style:{textAlign:"left"},children:"0"})]}),(0,o.jsxs)(r.tr,{children:[(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:[(0,o.jsx)(r.code,{children:"-r"}),", ",(0,o.jsx)(r.code,{children:"--ml-mark-delete-max-rate"})]}),(0,o.jsx)(r.td,{style:{textAlign:"left"},children:"Throttling rate for mark-delete operations (0 means no throttle)"}),(0,o.jsx)(r.td,{style:{textAlign:"left"},children:"0"})]})]})]}),(0,o.jsxs)(r.p,{children:["Please notice that sticky reads enabled by ",(0,o.jsx)(r.code,{children:"bookkeeperEnableStickyReads=true"})," are not used unless ensemble size (E) equals write quorum (Q",(0,o.jsx)("sub",{children:"w"}),") size. Sticky reads improve the efficiency of the Bookkeeper read ahead cache when all reads for a single ledger are sent to a single bookie."]}),(0,o.jsx)(r.p,{children:"Some rules for choosing the values:"}),(0,o.jsxs)(r.table,{children:[(0,o.jsx)(r.thead,{children:(0,o.jsxs)(r.tr,{children:[(0,o.jsx)(r.th,{style:{textAlign:"left"},children:"Rule"}),(0,o.jsx)(r.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,o.jsxs)(r.tbody,{children:[(0,o.jsxs)(r.tr,{children:[(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:["E >= Q",(0,o.jsx)("sub",{children:"w"})," >= Q",(0,o.jsx)("sub",{children:"a"})]}),(0,o.jsx)(r.td,{style:{textAlign:"left"},children:"Ensemble size must be larger or equal than write quorum size, write quorum size must be larger or equal than ack quorum size."})]}),(0,o.jsxs)(r.tr,{children:[(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:["Max bookie failures = Q",(0,o.jsx)("sub",{children:"a"}),"-1,"]}),(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:["This rule must be fulfilled if data durability is desired in case of bookie failures. To safely tolerate at least one bookie failure at a time in the ensemble, Q",(0,o.jsx)("sub",{children:"a"})," must be set to a value at least 2."]})]}),(0,o.jsxs)(r.tr,{children:[(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:["E == Q",(0,o.jsx)("sub",{children:"w"})]}),(0,o.jsxs)(r.td,{style:{textAlign:"left"},children:["Sticky reads enabled by ",(0,o.jsx)(r.code,{children:"bookkeeperEnableStickyReads=true"})," aren't used unless ensemble size (E) equals write quorum (Q",(0,o.jsx)("sub",{children:"w"}),") size."]})]})]})]}),(0,o.jsx)(r.p,{children:"The following is an example:"}),(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-shell",children:"pulsar-admin namespaces set-persistence my-tenant/my-ns \\\n--bookkeeper-ensemble 3 \\\n--bookkeeper-write-quorum 3 \\\n--bookkeeper-ack-quorum 3\n"})}),(0,o.jsx)(r.p,{children:"Short example:"}),(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-shell",children:"pulsar-admin namespaces set-persistence my-tenant/my-ns -e 3 -w 3 -a 3\n"})})]}),(0,o.jsx)(a.A,{value:"REST API",children:(0,o.jsx)(r.p,{children:(0,o.jsxs)(r.a,{href:"https://pulsar.apache.org/admin-rest-api?version=3.3.5&apiversion=v2#operation/setPersistence",children:["POST /admin/v2/namespaces/",":tenant","/",":namespace","/persistence/setPersistence"]})})}),(0,o.jsx)(a.A,{value:"Java",children:(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-java",children:"// The following must be true: bkEnsemble &gt;= bkWriteQuorum &gt;= bkAckQuorum\n// Please notice that sticky reads cannot be used unless bkEnsemble == bkWriteQuorum.\nint bkEnsemble = 3;\nint bkWriteQuorum = 3;\nint bkAckQuorum = 3;\ndouble markDeleteRate = 0.7;\nPersistencePolicies policies =\n  new PersistencePolicies(bkEnsemble, bkWriteQuorum, bkAckQuorum, markDeleteRate);\nadmin.namespaces().setPersistence(namespace, policies);\n"})})})]}),"\n",(0,o.jsx)(r.h3,{id:"list-persistence-policies",children:"List persistence policies"}),"\n",(0,o.jsx)(r.p,{children:"You can see which persistence policy currently applies to a namespace."}),"\n",(0,o.jsxs)(t.A,{groupId:"policies",defaultValue:"Pulsar-admin",values:[{label:"Pulsar-admin",value:"Pulsar-admin"},{label:"REST API",value:"REST API"},{label:"Java",value:"Java"}],children:[(0,o.jsxs)(a.A,{value:"Pulsar-admin",children:[(0,o.jsxs)(r.p,{children:["Use the ",(0,o.jsx)(r.a,{href:"pathname:///reference/#/3.3.x/pulsar-admin/namespaces?id=get-persistence",children:(0,o.jsx)(r.code,{children:"get-persistence"})})," subcommand and specify the namespace."]}),(0,o.jsx)(r.p,{children:"The following is an example:"}),(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-shell",children:'pulsar-admin namespaces get-persistence my-tenant/my-ns\n{\n  "bookkeeperEnsemble": 1,\n  "bookkeeperWriteQuorum": 1,\n  "bookkeeperAckQuorum", 1,\n  "managedLedgerMaxMarkDeleteRate": 0\n}\n'})})]}),(0,o.jsx)(a.A,{value:"REST API",children:(0,o.jsx)(r.p,{children:(0,o.jsxs)(r.a,{href:"https://pulsar.apache.org/admin-rest-api?version=3.3.5&apiversion=v2#operation/getPersistence",children:["GET /admin/v2/namespaces/",":tenant","/",":namespace","/persistence/getPersistence"]})})}),(0,o.jsx)(a.A,{value:"Java",children:(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-java",children:"PersistencePolicies policies = admin.namespaces().getPersistence(namespace);\n"})})})]})]})}function p(e={}){const{wrapper:r}={...(0,i.R)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},19365:(e,r,s)=>{s.d(r,{A:()=>t});s(96540);var n=s(34164);const o={tabItem:"tabItem_Ymn6"};var i=s(74848);function t(e){let{children:r,hidden:s,className:t}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,n.A)(o.tabItem,t),hidden:s,children:r})}},89089:(e,r,s)=>{s.d(r,{A:()=>y});var n=s(96540),o=s(34164),i=s(23104),t=s(56347),a=s(205),l=s(57485),c=s(31682),d=s(70679);function h(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:r}=e;return!!r&&"object"==typeof r&&"value"in r}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:r,children:s}=e;return(0,n.useMemo)((()=>{const e=r??function(e){return h(e).map((e=>{let{props:{value:r,label:s,attributes:n,default:o}}=e;return{value:r,label:s,attributes:n,default:o}}))}(s);return function(e){const r=(0,c.XI)(e,((e,r)=>e.value===r.value));if(r.length>0)throw new Error(`Docusaurus error: Duplicate values "${r.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[r,s])}function p(e){let{value:r,tabValues:s}=e;return s.some((e=>e.value===r))}function m(e){let{queryString:r=!1,groupId:s}=e;const o=(0,t.W6)(),i=function(e){let{queryString:r=!1,groupId:s}=e;if("string"==typeof r)return r;if(!1===r)return null;if(!0===r&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:r,groupId:s});return[(0,l.aZ)(i),(0,n.useCallback)((e=>{if(!i)return;const r=new URLSearchParams(o.location.search);r.set(i,e),o.replace({...o.location,search:r.toString()})}),[i,o])]}function x(e){const{defaultValue:r,queryString:s=!1,groupId:o}=e,i=u(e),[t,l]=(0,n.useState)((()=>function(e){let{defaultValue:r,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(r){if(!p({value:r,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${r}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return r}const n=s.find((e=>e.default))??s[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:r,tabValues:i}))),[c,h]=m({queryString:s,groupId:o}),[x,f]=function(e){let{groupId:r}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(r),[o,i]=(0,d.Dv)(s);return[o,(0,n.useCallback)((e=>{s&&i.set(e)}),[s,i])]}({groupId:o}),k=(()=>{const e=c??x;return p({value:e,tabValues:i})?e:null})();(0,a.A)((()=>{k&&l(k)}),[k]);return{selectedValue:t,selectValue:(0,n.useCallback)((e=>{if(!p({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);l(e),h(e),f(e)}),[h,f,i]),tabValues:i}}var f=s(92303);const k={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=s(74848);function b(e){let{className:r,block:s,selectedValue:n,selectValue:t,tabValues:a}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.a_)(),d=e=>{const r=e.currentTarget,s=l.indexOf(r),o=a[s].value;o!==n&&(c(r),t(o))},h=e=>{let r=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const s=l.indexOf(e.currentTarget)+1;r=l[s]??l[0];break}case"ArrowLeft":{const s=l.indexOf(e.currentTarget)-1;r=l[s]??l[l.length-1];break}}r?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":s},r),children:a.map((e=>{let{value:r,label:s,attributes:i}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:n===r?0:-1,"aria-selected":n===r,ref:e=>l.push(e),onKeyDown:h,onClick:d,...i,className:(0,o.A)("tabs__item",k.tabItem,i?.className,{"tabs__item--active":n===r}),children:s??r},r)}))})}function j(e){let{lazy:r,children:s,selectedValue:i}=e;const t=(Array.isArray(s)?s:[s]).filter(Boolean);if(r){const e=t.find((e=>e.props.value===i));return e?(0,n.cloneElement)(e,{className:(0,o.A)("margin-top--md",e.props.className)}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:t.map(((e,r)=>(0,n.cloneElement)(e,{key:r,hidden:e.props.value!==i})))})}function v(e){const r=x(e);return(0,g.jsxs)("div",{className:(0,o.A)("tabs-container",k.tabList),children:[(0,g.jsx)(b,{...r,...e}),(0,g.jsx)(j,{...r,...e})]})}function y(e){const r=(0,f.A)();return(0,g.jsx)(v,{...e,children:h(e.children)},String(r))}},42702:(e,r,s)=>{s.d(r,{A:()=>n});const n=s.p+"assets/images/pulsar-system-architecture-6890df6b0c59a065a56492659ba87933.png"},92680:(e,r,s)=>{s.d(r,{A:()=>n});const n=s.p+"assets/images/zookeeper-batching-de05ac49b05431155d275bd026b18c0a.png"},28453:(e,r,s)=>{s.d(r,{R:()=>t,x:()=>a});var n=s(96540);const o={},i=n.createContext(o);function t(e){const r=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),n.createElement(i.Provider,{value:r},e.children)}}}]);