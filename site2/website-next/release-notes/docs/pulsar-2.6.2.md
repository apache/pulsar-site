---
id: pulsar-2.6.2
title: Apache Pulsar 2.6.2 
sidebar_label: Apache Pulsar 2.6.2 
---

## security
[docs] Add config info in security jwt #8482  
Upgrade jetty to 9.4.33.v20201020 #8413  
Upgrade solr version to 8.6.3 #8328  
Upgrade jetty-util version to 9.4.31 #8035  
Fix the null exception when starting the proxy service #8019  
The token endpoint should get from the well-known configuration #8006  
Exclude vertx from bookkeeper-http package #7997  
[Security] Upgrade the snakeyaml verion to 1.26 #7994  
Fix the wrong issuer url concatenate #7980  

## broker
[pulsar-broker]Fix zk cache expiration check #8458  
[broker] Fix deadlock that occurred during topic ownership check #8406  
[pulsar-broker] Refresh ZooKeeper-data cache in background to avoid d… #8304  
[broker] Add command to delete a cluster's metadata from ZK #8169  
[broker] Fix error code returned to client when service unit is not ready #8147  
[pulsar-broker] Support Disable Replicated Subscriptions #8144  
Always use SNI for TLS enabled Pulsar Java broker client. #8117  
[broker] Add replicated check to checkInactiveSubscriptions. #8066  
[pulsar-broker] add configuration to set number of channels per bookie #7910  
[Issue 7554][broker] Split message ranges by ledger ID and store them in individualDeletedMessages #7861  
[broker] Fix deadlock when adding consumer #7841  
Redirect Get message by id request when broker not serve for the topic #7786  
[Issue 7517][pulsar-broker] Reestablish namespace bundle ownership from false negative releasing and false positive acquiring #7773  
[broker] Make resetting cursor in REST API asynchronous #7744  
[broker] Fix bug where producer for geo-replication is not closed when topic is unloaded #7735  
[pulsar-broker] Stop to dispatch when skip message temporally since Key_Shared consumer stuck on delivery #7553  
Check for null arguments in Namespaces Rest API #7247  

## k8s
[docs] Update helm deploy content #8404  
[docs] Sync K8S Helm content from 2.6.0 docs into 2.6.1 and 2.6.2 #8398  
#7994 Missed dryRun on maintenance of secrets. #8286  
Set dryrun of KubernetesRuntime is null #8064  

## key-shared
Fix typo in PersistentStickyKeyDispatcherMultipleConsumers.java #8389  
Fix message TTL on Key_Shared subscription and Fix ordering issue when replay messages. #8292  

## bookkeeper
[Issue 8364][docs] Update decommission content in different releases #8368  

## build
Fix branch-2.6 build issue #8330  
[python] Made the script for building Docker images for Python work #8153  
[build] Add python-dev to pulsar docker image #7857  
Update Jersey to 2.31 #7515  
[Issue 5736] Add test checks in branches #7465  
Protobuf-shaded package can not update version #7228  

## go
[Issue 8311][pulsar-client-go] Fix memory leak in cgo golang client #8325  
[go] Fix argument type of pulsarProducerSendCallbackProxy #8186  

## connector
Upgrade hdfs2 version to 2.8.5 #8319  
SinkRecord adds an overridden method #8038  

## cli
Delete associated ledgers before deleting cluster metadata #8244  
[pulsar-admin-tools] Support delete all data associated with a cluster #8133  

## deploy
Close ZK connections at end of metadata setup #8228  
update aws deployment for 2.6.0 #7668  

## dashboard
Issue 8187 pulsar-dashboard django migration fix #8188  

## admin
fix peek messages failed with subscriptionName not exist #8182  
[pulsar-admin] Support delete schema ledgers when delete topics #8167  
[pulsar-admin-tool] add cli command to get last message Id #8082  
[pulsar-broker] Add get-last-message-id admin for v1 api #8081  

## schemaregistry
fix possible NPE #8172  
fix json deserialize byte to string bug #8140  

## config
remove sensitive client configuration info from log #8110  
make zk cache executor thread pool size configurable #7794  
[pulsar-server] minor: fix typo in service-config #7248  

## sql
Replace com.ning.asynchttpclient with org.asynchttpclient #8099  
[Pulsar SQL] Fix Pulsar SQL CI test #7898  
Upgrade Presto version to 332 #7194  

## metrics
fix pulsar metrics providing wrong information #7905  

## proxy
[pulsar-proxy] Handle NPE while updating proxy stats #7766  
[proxy] Fix deadlock in pulsar proxy #7690  
Add advertisedAddress config field to ProxyConfiguration #7542  

## topic-policy
[Issue 2689] Support set backlog quota on topic level. #7646  

## tieredstorage
Refactored JCloud Tiered Storage #6335  

