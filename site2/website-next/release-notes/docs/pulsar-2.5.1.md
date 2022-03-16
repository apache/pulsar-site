---
id: pulsar-2.5.1
title: Apache Pulsar 2.5.1 
sidebar_label: Apache Pulsar 2.5.1 
---

## schemaregistry
ISSUE 7415 fix sidebar v2.5.0 #7590  
Add Joda time logical type conversion. #6704  

## admin
Not allow sub auto create by admin when disable topic auto create #6685  
[Issue 6343] Fix broker to specify a list of bookie groups #6349  
Create managed ledger path on local zookeeper when create partitions #6189  
[Issue 5904]Support `unload` all partitions of a partitioned topic #6187  
[pulsar-admin] allow tenant admin to manage subscription permission #6122  
[Broker]Reset cursor with a non-exists position #6120  

## broker
[broker]Handle BadVersionException thrown by updateSchemaLocator() #6683  
Improve Key_Shared subscription message dispatching performance. #6647  
[broker] Timeout API calls in BrokerService #6489  
Creating a topic does not wait for creating cursor of replicators #6364  
[broker] Fix bug that tenants whose allowed clusters include global cannot be created/updated #6275  
Supports evenly distribute topics count when splits bundle #6241  
[Issue 5579][broker] Fix bug that backlog message that has not yet expired could be deleted due to TTL #6211  
[broker] Restore clusterDispatchRate policy for compatibility #6176  
[broker] Output resource usage rate to log on broker #6152  
[Issue 4756] Add timeout to search for web service URLs to avoid web threads getting stuck #6124  
Add a message on how to make log refresh immediately when starting a component #6078  
Support delete inactive topic when subscriptions caught up #6077  
[Issue 5505] fix NPE #6060  
[pulsar-broker] Clean up closed producer to avoid publish-time  for producer #5988  
[pulsar-broker] Prevent creation of regular topic with the same name as existing partitioned topic #5943  
Avoid using same OpAddEntry between different ledger handles #5942  
Fix negative un-ack messages in consumer stats #5929  
[pulsar-broker] close managed-ledgers before giving up bundle ownership to avoid bad zk-version #5599  

## test
[Maven Cleanup] Remove managed-ledger and zk-utils test-jar dependencies when possible #6513  
[Issue 6274][Test] Fixed integration Pulsar SQL test failed #6279  
Make tests more stable by using JSONAssert equals #6247  
Fix maven broken link #6068  
[Issue 5920][pulsar-io] Adds integration test for RabbitMQ. #6033  
Fix unit test issue in BrokerServiceTest.java #6006  

## proxy
[proxy] Fix proxy routing to functions worker #6486  
[pulsar-proxy] fix logging for published messages #6474  
pulsar-proxy: fix correct name for proxy thread executor name #6460  

## security
[Broker] Create namespace failed when TLS is enabled in PulsarStandalone #6457  
[authentication] Validate tokens for binary connections #6233  
Fix broker client tls settings error #6128  

## flink
[Flink-Connector]Get PulsarClient from cache should always return an open instance #6436  

## build
[Issue 6400][Python Test]Fixed the enum34 package not found #6401  
Windows CMake corrections #6336  
Upgrade ZooKeeper to 3.5.7 #6329  
Pin the netty-transport-native-epoll to avoid conflicts #6194  
Upgrade Avro to 1.9.1 #5938  
[build] Skip javadoc task for pulsar-client-kafka-compact modules #5836  
Fixed static linking on C++ lib on MacOS #5581  

## config
[conf] Amend the default value of `supportedNamespaceBundleSplitAlgorithms` #6374  
Expose bookkeeper expose explicit lac configuration in broker.conf #5822  

## helm
[Issue 6355][HELM] autorecovery - could not find or load main class #6373  
[Issue 6338][Helm]explicit statement env-var 'BOOKIE_MEM' and 'BOOKIE_GC' for values-mini.yaml #6340  
[helm-chart] add missing check to dashboard-ingress #6160  
[Issue-5994][helm]: Start proxy pods when at least one broker pod is running #6158  

## sql
KeyValue schema support for pulsar sql #6325  

## compaction
[Issue 6173][compaction] Fix log compaction for flow control/empty topic/last deletion #6237  

## deploy
[ISSUE-6131]: Ensure JVM memory and GC options are set for bookie #6201  
[deployement] make kubernetes yamls for aws operational #6192  

## tieredstorage
Namespace level offloader #6183  

## stats
Expose lastConsumedTimestamp and lastAckedTimestamp to consumer stats #6051  
Add backlogSize in topicStats #5914  

