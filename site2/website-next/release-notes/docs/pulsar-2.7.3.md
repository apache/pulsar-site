---
id: pulsar-2.7.3
title: Apache Pulsar 2.7.3 
sidebar_label: Apache Pulsar 2.7.3 
---

## metrics
Fix missing replicator metrics #11264  

## tieredstorage
Remove unused listener to reduce creating executor pool #11215  

## topic-policy
fix replay topic policy message not work #11136  
Fix race condition of the SystemTopicBasedTopicPoliciesService #11097  
Fix potential data lost on the system topic when topic compaction have not triggered yet #11003  

## broker
[Ledger] Fix ledger rollover scheduled task #11116  
[broker] Fix issue where Key_Shared consumers could get stuck #10920  
[pulsar-broker] Handle multiple topic creation for same topic-name in broker #10847  
[broker] Fix issue that message ordering could be broken when redelivering messages on Key_Shared subscription #10762  
[broker] Fix issue where StackOverflowError occurs when trying to redeliver a large number of already acked messages #10696  
[Performance] Use single instance of parser #10664  
[pulsar-broker] Fix: Topic loading fails without any error when replicator init fails #10432  
Fix the inconsistency of AdvertisedAddress #10312  

## tool
Print message metadata when getting message by id #11092  

## proxy
Upgrade Jetty to 9.4.42.v20210604 #10907  
[Issue 7903][proxy]Enable AutoTopicCreationType partitioned through proxy #8048  

## connector
[Kinesis] Fix kinesis sink connector does not ack messages #10769  

## connect
Fix kinesis sink backoff class not found #10744  

## test
Added more unit tests to the JavaInstanceTest class #10369  

