---
id: pulsar-2.9.0
title: Apache Pulsar 2.9.0 
sidebar_label: Apache Pulsar 2.9.0 
---

## schema
[Schema] Fix pulsar use json or avro primitive schema. #12886  

## transaction
[Transaction] Fix transaction system topic create in loop. #12749  
[Transaction] add method to clear up transaction buffer snapshot #11934  

## broker
[#12423] allow `GetTopicsOfNamespace` op with `consume` permission #12600  
Allow to configure schema compatibility policy for system topics #12598  
[pulsar-broker] Cleanup already deleted namespace topics. #12597  
Disable stats recorder for built-in PulsarClient #12217  
[pulsar-broker] support remove-ttl api for V1 namespace #12121  
[pulsar-broker] Broker auto refresh bk-client certs to avoid cnx failure after cert refresh #12107  
Optimize the memory usage of Cache Eviction #12045  
Avoid adding duplicated BrokerEntryMetadata #12018  
[PIP-82] [pulsar-broker] Misc fixes: #11918  
[Broker] Refine topic level backlog quota policies warning log #11863  

## proxy
Fix the batch message ack for WebSocket proxy. #12530  
PIP-99 - Pulsar Proxy Estensions #11838  

## connector
Allow Pulsar Functions localrun to exit on error #12278  

## compaction
Fix incorrect returned last message ID while the `lastConfirmedEntry` with negative entry ID #12277  
Fix typo of the returned last message ID when the last message ID is from compacted ledger #12237  
Return the last position of the compacted data while the original data been deleted #12161  

## security
[security] Upgrade netty to 4.1.68.Final #12218  
Forbid to read other topic's data in managedLedger layer #11912  

## key-shared
Fix returned wrong hash ranges for the consumer with same consumer name #12212  

## test
[unit test] use correct line separator instead of \n #12143  
Force Python CI to use earlier version of Protobuf which supports Python2 #12058  
[Test] Fix managed cursor metrics test #11879  

## cli
[pulsar-client] Make it possible to disable poolMessages #12108  
[testclient] Add total messages when periodic printing throughput #12084  
[cli] Fix issue where pulsar-client command cannot consume v2 topics through WebSocket #12000  

## connect
Remove the deprecated api usage in hdfs #12080  

## zookeeper
[Zookeeper Client] Fix String formatting conversion in toString method #12006  

## go
[pulsar-functions-go] support set subscription position #11990  
[pulsar-functions-go] sync to the latest function proto #11853  

## tool
[testclient] Printing aggregated data when client exit #11985  
[standalone] remove noisy log on pulsar standalone startup #11970  

## topic-policy
Fix messages in TopicPolicies will never be cleaned up #11928  

## build
Fixed merge conflict on MetadataStoreTest #11921  
Source tarball: apply executable file permissions to shell scripts (fixes #10917)  #11858  

## dependency
Upgrade Netty to 4.1.67.Final #11875  

## admin
[Issue 11814] fix pulsar admin method:getMessageById. #11852  
[pulsar-admin] add option to get precise backlog on v1 topic #8927  

## stats
[stats] Add Key_Shared metadata to topic stats #11839  

