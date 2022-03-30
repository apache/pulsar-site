---
id: pulsar-2.9.1
title: Apache Pulsar 2.9.1 
sidebar_label: Apache Pulsar 2.9.1 
---

## security
Bump log4j to 2.16.0 [#13277](https://github.com/apache/pulsar/pull/13277)  
Bump log4j to 2.15.0 [#13226](https://github.com/apache/pulsar/pull/13226)  
[Authorization] Revert new AuthorizationProvider method [#13133](https://github.com/apache/pulsar/pull/13133)  
[Security] Upgrade OkHttp3 to address CVE-2021-0341 [#13065](https://github.com/apache/pulsar/pull/13065)  
[Authorization] Support CLEAR_BACKLOG namespace op after enable auth [#12963](https://github.com/apache/pulsar/pull/12963)  

## broker
Close old compacted ledger when open new. [#13210](https://github.com/apache/pulsar/pull/13210)  
[Broker] Remove tenant permission verification when list partitioned-topic [#13138](https://github.com/apache/pulsar/pull/13138)  
[Broker] Fix and improve topic ownership assignment [#13069](https://github.com/apache/pulsar/pull/13069)  
[Broker] Fix LeaderElectionService.getCurrentLeader and add support for empheralOwner in MockZooKeeper [#13066](https://github.com/apache/pulsar/pull/13066)  
Do not reuse the Failed OpAddEntry object which lead bundle unloading timeout. [#12993](https://github.com/apache/pulsar/pull/12993)  
[Authorization] Support UNSUBSCRIBE namespace op after enable auth [#12742](https://github.com/apache/pulsar/pull/12742)  
[Managed Ledger] Fix the incorrect total size when BrokerEntryMetadata is enabled [#12714](https://github.com/apache/pulsar/pull/12714)  
[ML] Avoid passing OpAddEntry across a thread boundary in asyncAddEntry [#12606](https://github.com/apache/pulsar/pull/12606)  
[ML] Add OpAddEntry to pendingAddEntries after the state check [#12570](https://github.com/apache/pulsar/pull/12570)  
[broker] Cancel scheduled tasks when deleting ManagedLedgerImpl [#12565](https://github.com/apache/pulsar/pull/12565)  
[Broker] Fix messageDedup delete inactive producer name [#12493](https://github.com/apache/pulsar/pull/12493)  
[managedledger] NPE on OpAddEntry while ManagedLedger is closing [#12364](https://github.com/apache/pulsar/pull/12364)  

## key-shared
[Issue 12885]Fix unordered consuming case in Key_Shared subscription. [#12890](https://github.com/apache/pulsar/pull/12890)  

## compaction
Fix the reader skips compacted data which original ledger been removed [#12522](https://github.com/apache/pulsar/pull/12522)  
Fix compactor skips data from last compacted Ledger [#12429](https://github.com/apache/pulsar/pull/12429)  

## function
Fix k8s pulsar functions containers not exposing metrics port for scraping [#12065](https://github.com/apache/pulsar/pull/12065)  

