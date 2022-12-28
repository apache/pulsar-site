---
id: pulsar-2.6.0
title: Apache Pulsar 2.6.0 
sidebar_label: Apache Pulsar 2.6.0 
---

#### 2020-06-17

#### Features

##### PIPs

* [PIP-37] Large message size support [#4400](https://github.com/apache/pulsar/pull/4400)
* [PIP-39] Namespace change events (System Topic) [#4955](https://github.com/apache/pulsar/pull/4955)
* [PIP-45] Switch ManagedLedger to use MetadataStore interface [#5358](https://github.com/apache/pulsar/pull/5358)
* [PIP 53] Contribute [DotPulsar](https://github.com/apache/pulsar-dotpulsar) to Apache Pulsar
* [PIP-54] Support acknowledgment at batch index level [#6052](https://github.com/apache/pulsar/pull/6052)
* [PIP-58] Support consumers set custom message retry delay [#6449](https://github.com/apache/pulsar/pull/6449)
* [PIP-60] Support SNI routing to support various proxy-server [#6566](https://github.com/apache/pulsar/pull/6566)
* [PIP-61] Advertise multiple addresses [#6903](https://github.com/apache/pulsar/pull/6903)
* [PIP-65] Adapting Pulsar IO Sources to support Batch Sources [#7090](https://github.com/apache/pulsar/pull/7090)

##### Broker 

* [Broker] Add threshold shedder strategy and metrics exporter for loadbalancer [#6772](https://github.com/apache/pulsar/pull/6772)
* [Broker] Add consistent hashing in the Key_Shared distribution [#6791](https://github.com/apache/pulsar/pull/6791)
* [Broker] Fixed ordering issue in KeyShared subscription dispatcher when adding consumer [#7106](https://github.com/apache/pulsar/pull/7106) [#7108](https://github.com/apache/pulsar/pull/7108) [#7188](https://github.com/apache/pulsar/pull/7188)
* [Broker] Add support for key hash range reading in Key_Shared subscription [#5928](https://github.com/apache/pulsar/pull/5928)
* [Broker] Allow for schema reader and writer registration on SchemaDefinition [#6905](https://github.com/apache/pulsar/pull/6905)
* [Broker] Support use null key and null value in KeyValue Schema [#7139](https://github.com/apache/pulsar/pull/7139)
* [Broker] Support multiple pulsar clusters to use the same bk cluster [#5985](https://github.com/apache/pulsar/pull/5985)
* [Broker] Add a flag to skip broker shutdown on transient OOM [#6634](https://github.com/apache/pulsar/pull/6634)
* [Broker] Make zookeeper cache expiry time configurable [#6668](https://github.com/apache/pulsar/pull/6668)
* [Broker] Check replicator periodically to avoid issue due to zookeeper missing watch [#6674](https://github.com/apache/pulsar/pull/6674)
* [Broker] Expose managedLedgerCache, managedLedger, loadBalance metrics to Prometheus [#6705](https://github.com/apache/pulsar/pull/6705)
* [Broker] Optimize consumer fetch messages in case of batch message [#6719](https://github.com/apache/pulsar/pull/6719)
* [Broker] Add configuration to limit max partitions for a partitioned topic [#6794](https://github.com/apache/pulsar/pull/6794)
* [Broker] Change default FlushEntryLogBytes to 256MB to improve bookie io throughput [#6915](https://github.com/apache/pulsar/pull/6915)
* [Broker] Introduce precise topic publish rate limiting [#7078](https://github.com/apache/pulsar/pull/7078)
* [Broker] Expose new entries check delay in the broker.conf [7154](https://github.com/apache/pulsar/pull/7154)
* [Broker] Add broker interceptor for intercepting all Pulsar command and REST API requests [#7143](https://github.com/apache/pulsar/pull/7143)
* [Broker] Only close active consumer for Failover subscription when seek() [#7141](https://github.com/apache/pulsar/pull/7141)
* [Broker] Allow to delete topics that are failing to recover [#7131](https://github.com/apache/pulsar/pull/7131)
* [Broker] Support set netty max frame size in bookkeeper.conf [#7116](https://github.com/apache/pulsar/pull/7116)
* [Broker] Trigger rollover when meeting maxLedgerRolloverTimeMinutes [#7111](https://github.com/apache/pulsar/pull/7111)
* [Broker] Cap the dispatcher batch size in bytes to fixed max [#7097](https://github.com/apache/pulsar/pull/7097)
* [Broker] Support specify managedLedgerMaxSizePerLedgerMbytes in broker.conf [#7085](https://github.com/apache/pulsar/pull/7085)
* [Broker] Allow to grant permissions when the authorization is disabled [#7074](https://github.com/apache/pulsar/pull/7074)
* [Broker] Add messages and bytes counter stats to broker-stats/topics [#7045](https://github.com/apache/pulsar/pull/7045)
* [Broker] Expose new entries check delay in the broker.conf [#7154](https://github.com/apache/pulsar/pull/7154)

##### Function

* [Function] Built-in functions support [#6895](https://github.com/apache/pulsar/pull/6895)
* [Function] Add Go Function heartbeat (and gRPC service) for production usage [#6031](https://github.com/apache/pulsar/pull/6031)
* [Function] Add custom property option to functions [#6348](https://github.com/apache/pulsar/pull/6348)
* [Function] Separate TLS configuration of function worker and broker [#6602](https://github.com/apache/pulsar/pull/6602)
* [Function] Added ability to build consumers in functions and sources [#6954](https://github.com/apache/pulsar/pull/6954)
* [Function] Support DLQ on sources and sinks [#7032](https://github.com/apache/pulsar/pull/7032)

##### Pulsar SQL

* [SQL] KeyValue schema support [#6325](https://github.com/apache/pulsar/pull/6325)
* [SQL] Multiple version schema support [#4847](https://github.com/apache/pulsar/pull/4847)
* [SQL] Fix presto SQL does not start metrics service before queue execute [#7030](https://github.com/apache/pulsar/pull/7030)

##### Pulsar IO

* Added ability for sources to publish messages on their own [#6941](https://github.com/apache/pulsar/pull/6941)
* [RabbitMQ] Allow routing key per message to RabbitMQ sink connector [#5890](https://github.com/apache/pulsar/pull/5890)
* [RabbitMQ] Add passive config options [#6679](https://github.com/apache/pulsar/pull/6679)
* [debezium] Upgrade from v0.10.0-Final to v1.0.0-Final [#5972](https://github.com/apache/pulsar/pull/5972)
* [debezium] Support avro schema for debezium connector [#6034](https://github.com/apache/pulsar/pull/6034)
* [influxdb2]  Add support for influxdb2 in pulsar-influxdb-sink [#6601](https://github.com/apache/pulsar/pull/6601)
* [jdbc] Add jdbc sinks: postgres, mariadb, clickhouse [#6835](https://github.com/apache/pulsar/pull/6835)

##### Pulsar Proxy

* [Proxy] Add REST API to get connection and topic stats [#6473](https://github.com/apache/pulsar/pull/6473)
* [Proxy] Add advertised address option [#6942](https://github.com/apache/pulsar/pull/6942)
* [Proxy] Add proxyLogLevel into config [#6948](https://github.com/apache/pulsar/pull/6948)


##### Admin

* [Admin] Support delete inactive topic when subscriptions caught up [#6077](https://github.com/apache/pulsar/pull/6077)
* [Admin] Add configuration to disable auto-creation of subscriptions [#6456](https://github.com/apache/pulsar/pull/6456)
* [Admin] Add maxUnackedMessagesPerSubscription and maxUnackedMessagesPerConsumer on namespaces policies [#5936](https://github.com/apache/pulsar/pull/5936)
* [Admin] Support get a message by message ID in pulsar-admin [#6331](https://github.com/apache/pulsar/pull/6331)
* [Admin] Support delete subscription forcefully [#6383](https://github.com/apache/pulsar/pull/6383)
* [Admin] Add subscribe initial position for consumer CLI [#6442](https://github.com/apache/pulsar/pull/6442)
* [Admin] Support to get managed ledger info of a partitioned topic [#6532](https://github.com/apache/pulsar/pull/6532)
* [Admin] Support compact all partitions of a partitioned topic [#6537](https://github.com/apache/pulsar/pull/6537)
* [Admin] Support multi-hosts in PulsarAdmin [#6547](https://github.com/apache/pulsar/pull/6547)
* [Admin] Support to get internal stats for a partitioned topic [#6624](https://github.com/apache/pulsar/pull/6624)
* [Admin] Support enable or disable subscription auto-creation at namespace level [#6637](https://github.com/apache/pulsar/pull/6637)
* [Admin] Enable to set the subscription expiration time for each namespace [#6851](https://github.com/apache/pulsar/pull/6851)

#### Fixes

* [Broker] Fixed increasing number of partitions with attached readers [#7077](https://github.com/apache/pulsar/pull/7077)
* [Broker] Make ZkBookieRackAffinityMapping work as expected [#6917](https://github.com/apache/pulsar/pull/6917)
* [Broker] Fix backlog and backlog size stats keeps growing [#7082](https://github.com/apache/pulsar/pull/7082)
* [Java Client] Fix connection leak [#6524](https://github.com/apache/pulsar/pull/6524)
* [Java Client] Fix message id compare between MessageId and BatchMessageId [#6621](https://github.com/apache/pulsar/pull/6621)
* [Java Client] Fix memory leak when create producer with not exsits topic [#7120](https://github.com/apache/pulsar/pull/7120) [#7124](https://github.com/apache/pulsar/pull/7124)
* [Java Client] Fix duplicated messages sent to dead letter topic [#7021](https://github.com/apache/pulsar/pull/7021)
* [CPP Client] Fix deadlock of consumer for topics auto discovery [#7206](https://github.com/apache/pulsar/pull/7206)
* [Managed Ledger] Fix NPE on opening non-durable cursors on an empty managed ledger [#7133](https://github.com/apache/pulsar/pull/7133)
* [Websocket] Fix incorrect topic URL parse [#6630](https://github.com/apache/pulsar/pull/6630)
* [Pulsar SQL] Fix problem with multiple zookeeper address [#6947](https://github.com/apache/pulsar/pull/6947)
* [Docker] Do not apply env values to pulsar_env.sh and bkenv.sh implicitly [6579](https://github.com/apache/pulsar/pull/6579)
