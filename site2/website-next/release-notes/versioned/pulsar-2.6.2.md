---
id: pulsar-2.6.2
title: Apache Pulsar 2.6.2 
sidebar_label: Apache Pulsar 2.6.2 
---

## security
[docs] Add config info in security jwt [#8482](https://github.com/apache/pulsar/pull/8482)  
Upgrade jetty to 9.4.33.v20201020 [#8413](https://github.com/apache/pulsar/pull/8413)  
Upgrade solr version to 8.6.3 [#8328](https://github.com/apache/pulsar/pull/8328)  
Upgrade jetty-util version to 9.4.31 [#8035](https://github.com/apache/pulsar/pull/8035)  
Fix the null exception when starting the proxy service [#8019](https://github.com/apache/pulsar/pull/8019)  
The token endpoint should get from the well-known configuration [#8006](https://github.com/apache/pulsar/pull/8006)  
Exclude vertx from bookkeeper-http package [#7997](https://github.com/apache/pulsar/pull/7997)  
Fix the wrong issuer url concatenate [#7980](https://github.com/apache/pulsar/pull/7980)  

## broker
[pulsar-broker]Fix zk cache expiration check [#8458](https://github.com/apache/pulsar/pull/8458)  
[broker] Fix deadlock that occurred during topic ownership check [#8406](https://github.com/apache/pulsar/pull/8406)  
[pulsar-broker] Refresh ZooKeeper-data cache in background to avoid d… [#8304](https://github.com/apache/pulsar/pull/8304)  
[broker] Add command to delete a cluster's metadata from ZK [#8169](https://github.com/apache/pulsar/pull/8169)  
[broker] Fix error code returned to client when service unit is not ready [#8147](https://github.com/apache/pulsar/pull/8147)  
[pulsar-broker] Support Disable Replicated Subscriptions [#8144](https://github.com/apache/pulsar/pull/8144)  
Always use SNI for TLS enabled Pulsar Java broker client. [#8117](https://github.com/apache/pulsar/pull/8117)  
[broker] Add replicated check to checkInactiveSubscriptions. [#8066](https://github.com/apache/pulsar/pull/8066)  
[pulsar-broker] add configuration to set number of channels per bookie [#7910](https://github.com/apache/pulsar/pull/7910)  
[Issue 7554][broker] Split message ranges by ledger ID and store them in individualDeletedMessages [#7861](https://github.com/apache/pulsar/pull/7861)  
[broker] Fix deadlock when adding consumer [#7841](https://github.com/apache/pulsar/pull/7841)  
Redirect Get message by id request when broker not serve for the topic [#7786](https://github.com/apache/pulsar/pull/7786)  
[Issue 7517][pulsar-broker] Reestablish namespace bundle ownership from false negative releasing and false positive acquiring [#7773](https://github.com/apache/pulsar/pull/7773)  
[broker] Make resetting cursor in REST API asynchronous [#7744](https://github.com/apache/pulsar/pull/7744)  
[broker] Fix bug where producer for geo-replication is not closed when topic is unloaded [#7735](https://github.com/apache/pulsar/pull/7735)  
[pulsar-broker] Stop to dispatch when skip message temporally since Key_Shared consumer stuck on delivery [#7553](https://github.com/apache/pulsar/pull/7553)  
Check for null arguments in Namespaces Rest API [#7247](https://github.com/apache/pulsar/pull/7247)  

## k8s
[docs] Update helm deploy content [#8404](https://github.com/apache/pulsar/pull/8404)  
[docs] Sync K8S Helm content from 2.6.0 docs into 2.6.1 and 2.6.2 [#8398](https://github.com/apache/pulsar/pull/8398)  

## key-shared
Fix typo in PersistentStickyKeyDispatcherMultipleConsumers.java [#8389](https://github.com/apache/pulsar/pull/8389)  
Fix message TTL on Key_Shared subscription and Fix ordering issue when replay messages. [#8292](https://github.com/apache/pulsar/pull/8292)  

## bookkeeper
[Issue 8364][docs] Update decommission content in different releases [#8368](https://github.com/apache/pulsar/pull/8368)  

## function
Update docs for Java Functions develop [#8350](https://github.com/apache/pulsar/pull/8350)  
#7994 Missed dryRun on maintenance of secrets. [#8286](https://github.com/apache/pulsar/pull/8286)  
Allow disabling forwarding source message properties [#8158](https://github.com/apache/pulsar/pull/8158)  
Set dryrun of KubernetesRuntime is null [#8064](https://github.com/apache/pulsar/pull/8064)  
[Security] Upgrade the snakeyaml verion to 1.26 [#7994](https://github.com/apache/pulsar/pull/7994)  
[Issue 7742][functions] Allow kubernetes runtime to customize function instance class path [#7844](https://github.com/apache/pulsar/pull/7844)  
Fix functions-worker typos [#7746](https://github.com/apache/pulsar/pull/7746)  
[Issue 5520][Function Doc] Add window function context docs for repo [#7741](https://github.com/apache/pulsar/pull/7741)  
Have metadata tailer use its own thread for processing [#7211](https://github.com/apache/pulsar/pull/7211)  
During Function update, cleanup should only happen for temp files that were generated [#7201](https://github.com/apache/pulsar/pull/7201)  

## build
Fix branch-2.6 build issue [#8330](https://github.com/apache/pulsar/pull/8330)  
[python] Made the script for building Docker images for Python work [#8153](https://github.com/apache/pulsar/pull/8153)  
[build] Add python-dev to pulsar docker image [#7857](https://github.com/apache/pulsar/pull/7857)  
Update Jersey to 2.31 [#7515](https://github.com/apache/pulsar/pull/7515)  
[Issue 5736] Add test checks in branches [#7465](https://github.com/apache/pulsar/pull/7465)  
Protobuf-shaded package can not update version [#7228](https://github.com/apache/pulsar/pull/7228)  

## go
[Issue 8311][pulsar-client-go] Fix memory leak in cgo golang client [#8325](https://github.com/apache/pulsar/pull/8325)  
[go] Fix argument type of pulsarProducerSendCallbackProxy [#8186](https://github.com/apache/pulsar/pull/8186)  

## connector
Upgrade hdfs2 version to 2.8.5 [#8319](https://github.com/apache/pulsar/pull/8319)  
SinkRecord adds an overridden method [#8038](https://github.com/apache/pulsar/pull/8038)  

## cli
Delete associated ledgers before deleting cluster metadata [#8244](https://github.com/apache/pulsar/pull/8244)  
[pulsar-admin-tools] Support delete all data associated with a cluster [#8133](https://github.com/apache/pulsar/pull/8133)  

## deploy
Close ZK connections at end of metadata setup [#8228](https://github.com/apache/pulsar/pull/8228)  
update aws deployment for 2.6.0 [#7668](https://github.com/apache/pulsar/pull/7668)  

## dashboard
Issue 8187 pulsar-dashboard django migration fix [#8188](https://github.com/apache/pulsar/pull/8188)  

## admin
fix peek messages failed with subscriptionName not exist [#8182](https://github.com/apache/pulsar/pull/8182)  
[pulsar-admin] Support delete schema ledgers when delete topics [#8167](https://github.com/apache/pulsar/pull/8167)  
[pulsar-admin-tool] add cli command to get last message Id [#8082](https://github.com/apache/pulsar/pull/8082)  
[pulsar-broker] Add get-last-message-id admin for v1 api [#8081](https://github.com/apache/pulsar/pull/8081)  

## schemaregistry
fix possible NPE [#8172](https://github.com/apache/pulsar/pull/8172)  
fix json deserialize byte to string bug [#8140](https://github.com/apache/pulsar/pull/8140)  

## config
remove sensitive client configuration info from log [#8110](https://github.com/apache/pulsar/pull/8110)  
make zk cache executor thread pool size configurable [#7794](https://github.com/apache/pulsar/pull/7794)  
[pulsar-server] minor: fix typo in service-config [#7248](https://github.com/apache/pulsar/pull/7248)  

## sql
Replace com.ning.asynchttpclient with org.asynchttpclient [#8099](https://github.com/apache/pulsar/pull/8099)  
[Pulsar SQL] Fix Pulsar SQL CI test [#7898](https://github.com/apache/pulsar/pull/7898)  
Upgrade Presto version to 332 [#7194](https://github.com/apache/pulsar/pull/7194)  

## metrics
fix pulsar metrics providing wrong information [#7905](https://github.com/apache/pulsar/pull/7905)  

## proxy
[pulsar-proxy] Handle NPE while updating proxy stats [#7766](https://github.com/apache/pulsar/pull/7766)  
[proxy] Fix deadlock in pulsar proxy [#7690](https://github.com/apache/pulsar/pull/7690)  
Add advertisedAddress config field to ProxyConfiguration [#7542](https://github.com/apache/pulsar/pull/7542)  

## topic-policy
[Issue 2689] Support set backlog quota on topic level. [#7646](https://github.com/apache/pulsar/pull/7646)  

## tieredstorage
Refactored JCloud Tiered Storage [#6335](https://github.com/apache/pulsar/pull/6335)  

