---
id: pulsar-2.5.0
title: Apache Pulsar 2.5.0 
sidebar_label: Apache Pulsar 2.5.0 
---

#### 2019-12-06

#### PIPs

- [PIP-41] Introduce Protocol Handler API [#5130](https://github.com/apache/pulsar/pull/5130) [#5743](https://github.com/apache/pulsar/pull/5473) 
- [PIP-45] Pluggable metadata interface [#5330](https://github.com/apache/pulsar/pull/5330) 
- [PIP-44] Separate schema compatibility checker for producer and consumer [#5227](https://github.com/apache/pulsar/pull/5227)
- [PIP-43] Producer send messages with different schema [#5141](https://github.com/apache/pulsar/issues/5141) [#5517](https://github.com/apache/pulsar/pull/5517) 
- [PIP-51] Introduce sticky consumer [#5388](https://github.com/apache/pulsar/pull/5388)
- [PIP-38] Support batch receive in java client. [#4621](https://github.com/apache/pulsar/pull/4621)
- [PIP-52] PIP-52: [pulsar-sever] Add support of dispatch throttling relative to publish-rate [#5797](https://github.com/apache/pulsar/pull/5797)

#### Fixes

- [Broker] Avoid retrying deleting namespace when topic is already deleted/fenced [#4665](https://github.com/apache/pulsar/pull/4665)
- [Broker] Fix expiry monitor to continue on non-recoverable error [#4818](https://github.com/apache/pulsar/pull/4818) 
- [Broker] fix ns-isolation api to fetch policy for specific broker [#5314](https://github.com/apache/pulsar/pull/5314)
- [Broker] external protocols not set to local broker data [#5749](https://github.com/apache/pulsar/pull/5479)
- [Broker] Add handle exception KeeperException.BadVersionException  [#5563](https://github.com/apache/pulsar/pull/5563)
- [Broker] Fix message deduplicate issue while using external sequence id with batch produce [#5491](https://github.com/apache/pulsar/pull/5491)
- [Broker] Remove cursor while remove non-durable subscription [#5719](https://github.com/apache/pulsar/pull/5719) 
- [Broker] Fix potential read 0 entries cause dispatcher stop dispatch [#5894](https://github.com/apache/pulsar/pull/5894)
- [Proxy] Proxy doesn't use the right ca certicate to connect to brokers [#5971](https://github.com/apache/pulsar/pull/5971)
- [Client] Add SentConnectFrame state check when running `handleError` [#5913](https://github.com/apache/pulsar/pull/5913)

#### Enhancements

- [Zookeeper] Bump zookeeper to version 3.5.6 [#5043](https://github.com/apache/pulsar/pull/5043)
- [BookKeeper] Upgrade bk version to 4.10.0 [#5607](https://github.com/apache/pulsar/pull/5607)
- [Broker] Process requests asynchronously on some REST APIs [4765](https://github.com/apache/pulsar/pull/4765) [4778](https://github.com/apache/pulsar/pull/4778) [4795](https://github.com/apache/pulsar/pull/4795) 
- [Broker] Fixes not owned bundles got selected when broker overloading [#5002](https://github.com/apache/pulsar/pull/5002)
- [Broker] Support update partition for global topic  [#5306](https://github.com/apache/pulsar/pull/5306)
- [Broker] Ensure the handling of PartitionMetadataRequest is async end-to-end [#5307](https://github.com/apache/pulsar/pull/5307)
- [Broker] Allow to automatically assign TCP ports when starting a broker  [#3555](https://github.com/apache/pulsar/pull/3555) 
- [Broker] Introduce publish rate-limiting on topic [#3986](https://github.com/apache/pulsar/pull/3986)
- [Broker] Add publish rate limit for each broker to avoid OOM [#5710](https://github.com/apache/pulsar/pull/5710)
- [Broker] Allow for namespace default of offload threshold [#5872](https://github.com/apache/pulsar/pull/5872)
- [Broker] Avoid unsafe split when validate hostname which might be ipv6 address [#5713](https://github.com/apache/pulsar/pull/5713)
- [Broker] Support batch authorization of partitioned topic [#5767](https://github.com/apache/pulsar/pull/5767)
- [Client][Java] Introduce `batchingMaxBytes` setting in pulsar producer [#5045](https://github.com/apache/pulsar/pull/5045)
- [Client][Java] Add epoch for connection handler to handle create producer timeout [#5571](https://github.com/apache/pulsar/pull/5571)
- [Performance] Reduce char[] creation on jvm heap [#5055](https://github.com/apache/pulsar/pull/5055)
- [CLI] Add a broker tool for operations of a specific broker [#5768](https://github.com/apache/pulsar/pull/5768)
- [CLI] Validate topic name before creating partition/non partition topic via admin cli [#5148](https://github.com/apache/pulsar/pull/5148)
- [CLI] Make PulsarClusterMetadataSetup idempotent [#5879](https://github.com/apache/pulsar/pull/5879)
- [CLI] Allow for topic deletions with regex consumers [#5230](https://github.com/apache/pulsar/pull/5230)

#### Stats & Monitoring 

- [Broker] Added delayed messages in Prometheus when using namespace-level metrics aggregation [#4691](https://github.com/apache/pulsar/pull/4691)
- [Dashboard] Increasing Dashboard consumerName field to 256 varchar [4716](https://github.com/apache/pulsar/pull/4716)
- [Dashboard] integrate peek into messages page [#4966](https://github.com/apache/pulsar/pull/4966)
- [Dashboard] Support parse batch entry [#4992](https://github.com/apache/pulsar/pull/4992)

#### Security

- [Broker] Add broker-bookie mTLS support [#5042](https://github.com/apache/pulsar/pull/5042)

#### Tiered Storage

- HDFS Offloader [#4403](https://github.com/apache/pulsar/pull/4403)
- Fix the problem of repeated storage of offload driver metadata [#5834](https://github.com/apache/pulsar/pull/5834)

#### Pulsar Schema

- [Broker] Pulsar schema api should respect to namespace level compatibility [#4821](https://github.com/apache/pulsar/issues/4821)
- [Client][Java] NPE is thrown when a consumer consumes a partitioned topic with struct schema
 [#4960](https://github.com/apache/pulsar/pull/4960)
- [Broker] Add compatibility check for primitive schema types [#5051](https://github.com/apache/pulsar/pull/5051)
- [Broker] Support uploading key/value schema using Pulsar admin [#5000](https://github.com/apache/pulsar/pull/5000)
- [Client][Java] Schema support encoding & encoding ByteBuf [#5123](https://github.com/apache/pulsar/pull/5123)

#### Pulsar IO

- [Broker] Support reload Source and Sink for Pulsar IO [5008](https://github.com/apache/pulsar/pull/5008)
- [Connector] Added Kinesis Source Connector [#3784](https://github.com/apache/pulsar/pull/3784)
- [Connector] Add a source connector for MongoDB [#5316](https://github.com/apache/pulsar/pull/5316)
- [Connector] Support CDC Connector for MongoDB [#5590](https://github.com/apache/pulsar/pull/5590)
- [Connector] Improve hbase sink performance [#5705](https://github.com/apache/pulsar/pull/5705)

#### Pulsar Functions

- [Function Worker] Allow resource overcommitting when running functions in Kubernetes [4829](https://github.com/apache/pulsar/pull/4829)
- [Function Worker] Make Function Authentication Provider pluggable [#5404](https://github.com/apache/pulsar/pull/5404)
- [Function Worker] Added deletion of state for Functions [#5469](https://github.com/apache/pulsar/pull/5469) 
- [Function Worker] Distribute the CA for KubernetesSecretsTokenAuthProvider [#5398](https://github.com/apache/pulsar/pull/5398)
- [Function Runtime] Function runtime pluggable [#5463](https://github.com/apache/pulsar/pull/5463)
- [Function Runtime] Allow functions to pass runtime specific options [#5400](https://github.com/apache/pulsar/pull/5400)

#### Pulsar SQL

- Support for other schema name separators in pulsar SQL [4732](https://github.com/apache/pulsar/issues/4732)
- Reuse ManagedLedgerFactory instances across SQL queries [4813](https://github.com/apache/pulsar/pull/4813) 
- Using pulsar SQL query messages will appear `NoSuchLedger` when zk root directory changed [#5001](https://github.com/apache/pulsar/pull/5001)





#### Adaptors

- Add support of pulsar-kafka-adapter for kafka-0.9 API [#4886](https://github.com/apache/pulsar/pull/4886)
- Add support of pulsar-kafka-adapter for kafka-0.8 API [#4797](https://github.com/apache/pulsar/pull/4797) 
- Make client keepalive interval configurable on pulsar-client-kafka [#5131](https://github.com/apache/pulsar/pull/5131)

#### Transaction

> The development of Pulsar Transaction is still ongoing

- [Buffer] Add new marker to show which message belongs to transaction [#4776](https://github.com/apache/pulsar/pull/4776)
- [Buffer] Add data ledger position in txn commit marker [#4826](https://github.com/apache/pulsar/pull/4826)
- [Buffer] Add basic operation of transaction [#4738](https://github.com/apache/pulsar/pull/4738)
- [Buffer] Add new commands for the transaction [#4866](https://github.com/apache/pulsar/pull/4866)
- [Protocol] Add default handler to handle transaction related commands [#4891](https://github.com/apache/pulsar/pull/4891)
- [Client] Introduce Transaction Client API [#4952](https://github.com/apache/pulsar/pull/4952)
- [Client] Add transaction coordinator client [#4953](https://github.com/apache/pulsar/pull/4953)
- [Broker] Ownership change listeners [#5457](https://github.com/apache/pulsar/pull/5457)
- [Coordinator] Bootstrap pulsar system namespace and create TC assign topic [#5515](https://github.com/apache/pulsar/pull/5515)
- [Coordinator] Add transaction metadata store service [#5504](https://github.com/apache/pulsar/pull/5504) 

For a complete list of issues fixed, see

https://github.com/apache/pulsar/milestone/22?closed=1

https://github.com/apache/pulsar/releases/tag/v2.5.0 