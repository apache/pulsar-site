---
id: pulsar-2.6.3
title: Apache Pulsar 2.6.3 
sidebar_label: Apache Pulsar 2.6.3 
---

## security
[Authentication] Support chained authentication with same auth method name #9094  
[docs] Add config info in security jwt #8482  

## proxy
Fix Proxy Config bindAddress does not working for servicePort  #9068  
Support enable WebSocket on Pulsar Proxy. #8613  
[Pulsar Proxy] Add error log for pulsar proxy starter #8451  
[Pulsar-Proxy] Fix request.getContentLength() to return 0 if it is less than 0 #8448  

## connector
[connector]fix debezium-connector error log #9063  
Pulsar IO: Make Source topic Schema information available to downstream Sinks #8854  

## storm
[ISSUE] DOCS-8994 fix the links of examples #9062  

## build
[docs] Generate the whole doc set for 2.6.3 release #9027  

## broker
Improve error handling when broker doesn't trust client certificates #8998  
Intercept beforeSendMessage calls #8932  
[pulsar-broker] capture stats with precise backlog #8928  
[Issue 8783][pulsar-broker] Execute removing non-persistent subscription of topic from different thread to avoid deadlock when removing inactive subscriptions #8820  
[broker] Close topics that remain fenced forcefully #8561  
[pulsar-broker] Refresh ZooKeeper-data cache in background to avoid d… #8304  
[pulsar-broker] fix: use correct configuration for zk-cache expire time #8302  

## stats
remove duplicated broker prometheus metrics type #8995  
Monitor if a cursor moves its mark-delete position #8930  
Export Prometheus metric for messageTTL #8871  

## go
Fix single-quotes added to user-conf #8780  
[Issue #8268][Pulsar Function] k8s runtime with go functions support #8352  
[component/functions|component/go] Propagate user-config parameter into instances of Golang pulsar functions #8132  

## tieredstorage
[Tiered Storage] Offload manager initialization once #8739  

## admin
Issue 8677: Cannot get lastMessageId for an empty topic due to message retention #8725  

