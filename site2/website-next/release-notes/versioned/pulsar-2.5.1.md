---
id: pulsar-2.5.1
title: Apache Pulsar 2.5.1 
sidebar_label: Apache Pulsar 2.5.1 
---

#### 2020-04-20

#### Features

* PIP-55: Refresh Authentication Credentials [#6074](https://github.com/apache/pulsar/pull/6074)
* Namespace level support offloader [#6183](https://github.com/apache/pulsar/pull/6183)  
* Upgrade Avro to 1.9.1 [#5938](https://github.com/apache/pulsar/pull/5938)  
  * *Avro 1.9.1 enables the JSR310 datetimes by default, which might introduce some regression problems if users use generated source code by Avro compiler 1.8.x and contains datetimes fields. It's better to use Avro 1.9.x compiler to recompile.*
* Support `unload` all partitions of a partitioned topic [#6187](https://github.com/apache/pulsar/pull/6187)  
* Supports evenly distribute topics count when splits bundle [#6241](https://github.com/apache/pulsar/pull/6241)  
* KeyValue schema support for pulsar sql [#6325](https://github.com/apache/pulsar/pull/6325)  
* Bump netty version to 4.1.45.Final [#6424](https://github.com/apache/pulsar/pull/6424)  
* Support BouncyCastle FIPS provider [#6588](https://github.com/apache/pulsar/pull/6588)  
* Improve Key_Shared subscription message dispatching performance. [#6647](https://github.com/apache/pulsar/pull/6647)  
* Add JSR310 logical type conversion. [#6704](https://github.com/apache/pulsar/pull/6704)  
* Introduce maxMessagePublishBufferSizeInMB configuration to avoid broker OOM [#6178](https://github.com/apache/pulsar/pull/6178)  


#### Fixes

##### Broker
* [Broker] Fixed NPE occurs when getting partitioned topic stats [#6060](https://github.com/apache/pulsar/pull/6060)
* [Broker] Fixed zero queue consumer message redelivery [#6076](https://github.com/apache/pulsar/pull/6076)
* [Broker] Fixed message redelivery for zero queue consumer while using async api to receive messages [#6090](https://github.com/apache/pulsar/pull/6090)
* [broker] Fixed bug that backlog message that has not yet expired could be deleted due to TTL [#6211](https://github.com/apache/pulsar/pull/6211)
* [Broker] Remove problematic semicolon from conf [#6303](https://github.com/apache/pulsar/pull/6303)
* [Broker] Fixed broker to specify a list of bookie groups [#6349](https://github.com/apache/pulsar/pull/6349)
* [Broker] Fixed create consumer on partitioned topic while disable topic auto creation [#5572](https://github.com/apache/pulsar/pull/5572)
* [Broker] Fix maven broken link [#6068](https://github.com/apache/pulsar/pull/6068)
* [Broker] Fixed java code errors reported by lgtm. [#6398](https://github.com/apache/pulsar/pull/6398)
* [Broker] Fixed memory leak when running topic compaction. [#6485](https://github.com/apache/pulsar/pull/6485)
* [Broker] Fixed admin getLastMessageId return batchIndex [#6511](https://github.com/apache/pulsar/pull/6511)
* [Broker] Fixed topic with one partition cannot be updated [#6560](https://github.com/apache/pulsar/pull/6560)
* [Broker] Fixed negative un-ack messages in consumer stats [#5929](https://github.com/apache/pulsar/pull/5929)
* [broker] Fixed bug that tenants whose allowed clusters include global cannot be created/updated [#6275](https://github.com/apache/pulsar/pull/6275)
* [Broker] Fixed log compaction for flow control/empty topic/last deletion [#6237](https://github.com/apache/pulsar/pull/6237)
* [Broker] Fixed restore clusterDispatchRate policy for compatibility [#6176](https://github.com/apache/pulsar/pull/6176) 
* [Broker] Fix some async method problems at PersistentTopicsBase. [#6483](https://github.com/apache/pulsar/pull/6483) 
* [Broker] This "earlier" message should be avoided to emit when reset cursor.[#6393](https://github.com/apache/pulsar/pull/6393)
* [Broker] Change the permission level of managing subscription from super-user to tenant admin [#6122](https://github.com/apache/pulsar/pull/6122)

##### Managed Ledger
* [Managed Ledger] Fixed consumer received duplicated delayed messages upon restart [#6404](https://github.com/apache/pulsar/pull/6404)


##### Pulsar Proxy

* [Proxy] Fixed correct name for proxy thread executor name [#6460](https://github.com/apache/pulsar/pull/6460)
* [Proxy] Fixed logging for published messages [#6474](https://github.com/apache/pulsar/pull/6474)
* [Proxy] Fixed proxy routing to functions worker [#6486](https://github.com/apache/pulsar/pull/6486)


##### Zookeeper

* [Zookeeper] Fixed casting in ZooKeeperCache.getDataIfPresent() [#6313](https://github.com/apache/pulsar/pull/6313)

##### Pulsar Functions
* [Function] remove future.join() from PulsarSinkEffectivelyOnceProcessor [#6361](https://github.com/apache/pulsar/pull/6361)


##### Pulsar SQL
* [SQL] Fixed integration Pulsar SQL test failed [#6279](https://github.com/apache/pulsar/pull/6279)

##### Security
* Fixed publish buffer limit does not take effect [#6431](https://github.com/apache/pulsar/pull/6431)
* Fixed the bug of authenticationData is't initialized. [#6440](https://github.com/apache/pulsar/pull/6440)

##### Pulsar Schema

* [Schema] Fixed get schema version in HttpLookupService. [#6193](https://github.com/apache/pulsar/pull/6193) 
* [Schema] Fixed avro schema decode error `ClassCastException` in Pulsar Function [#6662](https://github.com/apache/pulsar/pull/6662)
* [Schema] Fixed channel write error handling for send get raw schema request [#6650](https://github.com/apache/pulsar/pull/6650)

##### Java client
* [Client] Fixed available permits may be greater than 1 even though queue size is 0. [#6106](https://github.com/apache/pulsar/pull/6106)
* [Client] Fixed broker client tls settings error [#6128](https://github.com/apache/pulsar/pull/6128)
* [Client]Fixed hasMessageAvailable() [#6362](https://github.com/apache/pulsar/pull/6362)
* [Client] Fixed duplicate key to send propertys [#6390](https://github.com/apache/pulsar/pull/6390)
* [Client] fixed deadlock on send failure [#6488](https://github.com/apache/pulsar/pull/6488)
* [Client] Fixed NPE while call getLastMessageId [#6562](https://github.com/apache/pulsar/pull/6562) 
* [Client] Fixed the max backoff configuration for lookups [#6444](https://github.com/apache/pulsar/pull/6444)


##### C++ client
* [C++] Fixed static linking on C++ lib on MacOS [#5581](https://github.com/apache/pulsar/pull/5581)
* [C++] Fixed memory corruption on ExecutorService destructor [#6270](https://github.com/apache/pulsar/pull/6270)
* [C++] Fixed handling of canceled timer events on NegativeAcksTracker [#6272](https://github.com/apache/pulsar/pull/6272)
* [C++] Fixed for possible deadlock when closing Pulsar client [#6277](https://github.com/apache/pulsar/pull/6277)
* [C++] Fixed Unacked Message Tracker by Using Time Partition on C++ [#6391](https://github.com/apache/pulsar/pull/6391)
* [C++] Fixed Redelivery of Messages on UnackedMessageTracker When Ack Messages . [#6498](https://github.com/apache/pulsar/pull/6498)

##### Python Client
* [Python Client]Fixed the enum34 package not found [#6401](https://github.com/apache/pulsar/pull/6401)

##### Pulsar Websocket
* [Websocket] Fixed Websocket doesn't set the correct cluster data [#6102](https://github.com/apache/pulsar/pull/6102)

##### Deployments
* [Helm] Autorecovery - Fixed could not find or load main class [#6373](https://github.com/apache/pulsar/pull/6373)
* [Helm]: Start proxy pods when at least one broker pod is running [#6158](https://github.com/apache/pulsar/pull/6158)

#### Enhancements

##### Pulsar Broker
* [Broker] close managed-ledgers before giving up bundle ownership to avoid bad zk-version [#5599](https://github.com/apache/pulsar/pull/5599)
* [Broker] Add timeout to search for web service URLs to avoid web threads getting stuck [#6124](https://github.com/apache/pulsar/pull/6124)
* [Broker] Flush the potential duplicated message when add messages to a batch. [#6326](https://github.com/apache/pulsar/pull/6326)
* [Broker] Avoid getting partition metadata while the topic name is a partition name. [#6339](https://github.com/apache/pulsar/pull/6339)
* [Broker] Fixed create partitioned topic with a substring of an existing topic name. [#6478](https://github.com/apache/pulsar/pull/6478)
* [Broker] Do not retry on authorization failure [#6577](https://github.com/apache/pulsar/pull/6577)
* [Broker]Handle BadVersionException thrown by updateSchemaLocator() [#6683](https://github.com/apache/pulsar/pull/6683)
* [Broker] Expose bookkeeper expose explicit lac configuration in broker.conf [#5822](https://github.com/apache/pulsar/pull/5822)
* [Broker] Allow to enable/disable delayed delivery for messages on namespace [#5915](https://github.com/apache/pulsar/pull/5915)
* [Broker] Prevent creation of regular topic with the same name as existing partitioned topic [#5943](https://github.com/apache/pulsar/pull/5943)
* [Broker] Reset cursor with a non-exists position [#6120](https://github.com/apache/pulsar/pull/6120)
* [Broker] Use fully qualified hostname as default to advertise brokers [#6235](https://github.com/apache/pulsar/pull/6235)
* [broker] Timeout API calls in BrokerService [#6489](https://github.com/apache/pulsar/pull/6489)
* [Broker] Start namespace service and schema registry service before start broker. [#6499](https://github.com/apache/pulsar/pull/6499)
* [Broker] Disable channel auto read when publish rate or publish buffer exceeded [#6550](https://github.com/apache/pulsar/pull/6550)
* [Broker] Resume some servercnx method to public [#6581](https://github.com/apache/pulsar/pull/6581)
* [Broker] Enable get precise backlog and backlog without delayed messages. [#6310](https://github.com/apache/pulsar/pull/6310)
* [Broker] Avoid using same OpAddEntry between different ledger handles [#5942](https://github.com/apache/pulsar/pull/5942)
* [Broker] Clean up closed producer to avoid publish-time for producer [#5988](https://github.com/apache/pulsar/pull/5988)
* [Broker] Support delete inactive topic when subscriptions caught up [#6077](https://github.com/apache/pulsar/pull/6077)
* [Broker] Add a message on how to make log refresh immediately when starting a component [#6078](https://github.com/apache/pulsar/pull/6078)
* [Pulsar Admin] allow tenant admin to manage subscription permission [#6122](https://github.com/apache/pulsar/pull/6122)
* [Broker] Output resource usage rate to log on broker [#6152](https://github.com/apache/pulsar/pull/6152)
* [Broker] Creating a topic does not wait for creating cursor of replicators [#6364](https://github.com/apache/pulsar/pull/6364)
* [Broker] Stop increase unacked messages for the consumer with Exclusive/Failover subscription mode. [#6558](https://github.com/apache/pulsar/pull/6558)
* [Broker] Not allow sub auto create by admin when disable topic auto create [#6685](https://github.com/apache/pulsar/pull/6685)


##### Zookeeper
* [Zookeeper] Close ZK before canceling future with exception [#6399](https://github.com/apache/pulsar/pull/6399)
* [ZooKeeper] Upgrade ZooKeeper to 3.5.7 [#6329](https://github.com/apache/pulsar/pull/6329)

##### Pulsar IO
* [IO] Adds integration test for RabbitMQ [#6033](https://github.com/apache/pulsar/pull/6033)

##### Pulsar Functions
* [Function] remove future.join() from PulsarSinkEffectivelyOnceProcessor [#6361](https://github.com/apache/pulsar/pull/6361)

##### Stats & Monitoring 
* [Broker] Add backlogSize in topicStats [#5914](https://github.com/apache/pulsar/pull/5914)
* [Broker] Expose lastConsumedTimestamp and lastAckedTimestamp to consumer stats [#6051](https://github.com/apache/pulsar/pull/6051)
* Improve backlogSize stats in the topic. [#6700](https://github.com/apache/pulsar/pull/6700)

##### Security
* Validate tokens for binary connections [#6233](https://github.com/apache/pulsar/pull/6233)
* Create namespace failed when TLS is enabled in PulsarStandalone [#6457](https://github.com/apache/pulsar/pull/6457) 
* Use more granular permissions for topics [#6504](https://github.com/apache/pulsar/pull/6504)


##### Pulsar Schema

* [Schema] Independent schema is set for each consumer generated by topic [#6356](https://github.com/apache/pulsar/pull/6356)
* [Schema] Extract an original avro schema from the "$SCHEMA" field using reflection. If it doesn't work, the process falls back generation of the schema from POJO.[#6406](https://github.com/apache/pulsar/pull/6406)
* [Schema] Add verification for SchemaDefinitionBuilderImpl.java [#6405](https://github.com/apache/pulsar/pull/6405)

##### Deployments
* [Helm] Explicit statement env-var 'BOOKIE_MEM' and 'BOOKIE_GC' for values-mini.yaml [#6340](https://github.com/apache/pulsar/pull/6340)
* [Helm] Add missing check to dashboard-ingress [#6160](https://github.com/apache/pulsar/pull/6160)
* Make kubernetes yamls for aws operational [#6192](https://github.com/apache/pulsar/pull/6192)
* Ensure JVM memory and GC options are set for bookie [#6201](https://github.com/apache/pulsar/pull/6201)
* Default functionAuthProvider when running in k8s [#6203](https://github.com/apache/pulsar/pull/6203)

##### Adaptors
* [Adaptor] Skip javadoc task for pulsar-client-kafka-compact modules [#5836](https://github.com/apache/pulsar/pull/5836)
* [Flink-Connector] Get PulsarClient from cache should always return an open instance [#6436](https://github.com/apache/pulsar/pull/6436) 

