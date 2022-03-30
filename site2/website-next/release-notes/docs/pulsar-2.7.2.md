---
id: pulsar-2.7.2
title: Apache Pulsar 2.7.2 
sidebar_label: Apache Pulsar 2.7.2 
---

## schemaregistry
Fix primitive schema upload for ALWAYS_COMPATIBLE strategy. [#10386](https://github.com/apache/pulsar/pull/10386)  
Fix schema ledger deletion when deleting topic with delete schema. [#10383](https://github.com/apache/pulsar/pull/10383)  
Fix error OutOfMemoryError while using KeyValue<GenericRecord, GenericRecord> [#9981](https://github.com/apache/pulsar/pull/9981)  
Fix schema not added when subscribe an empty topic without schema [#9853](https://github.com/apache/pulsar/pull/9853)  
[Issue 9602] Add schema type validation [#9797](https://github.com/apache/pulsar/pull/9797)  

## build
fix docker standalone image error [#10359](https://github.com/apache/pulsar/pull/10359)  
Fix possible name mismatch bugs when build wheel files within docker [#10051](https://github.com/apache/pulsar/pull/10051)  
Pass envirnoment variables to the docker container when building whee… [#10043](https://github.com/apache/pulsar/pull/10043)  
[Build] Python-client build script use wrong path for root dir [#9961](https://github.com/apache/pulsar/pull/9961)  
[Build] RPM build script use wrong path for root dir [#9890](https://github.com/apache/pulsar/pull/9890)  
Allow DockerImage to be built from source tarball [#9846](https://github.com/apache/pulsar/pull/9846)  

## security
[Security] Upgrade commons-io to address CVE-2021-29425 [#10287](https://github.com/apache/pulsar/pull/10287)  
Upgrade Jetty libraries to 9.4.39.v20210325 [#10177](https://github.com/apache/pulsar/pull/10177)  
Upgrade Netty version to 4.1.60.final [#10073](https://github.com/apache/pulsar/pull/10073)  
Upgrade Bouncy Castle to 1.68 [#9199](https://github.com/apache/pulsar/pull/9199)  

## broker
[Broker] Suppress printing of "skip Processing" lines in startup scripts [#10275](https://github.com/apache/pulsar/pull/10275)  
[broker] Continue graceful shutdown even if web service closing fails [#9835](https://github.com/apache/pulsar/pull/9835)  
Add NPE check for PulsarService#getAdminClient [#9782](https://github.com/apache/pulsar/pull/9782)  

## storage
[Cursor] add return statement to exit asyncMarkDelete early on failure [#10272](https://github.com/apache/pulsar/pull/10272)  
[BUG]fix zkBookieRackAffinityMapping bug to support for bookkeeper dnsResolver  [#9894](https://github.com/apache/pulsar/pull/9894)  

## function
[ISSUE 10153]fix time unit ns -> ms [#10160](https://github.com/apache/pulsar/pull/10160)  

## deploy
[Issue 10058]:apply-config-from-env.py to commented default values [#10060](https://github.com/apache/pulsar/pull/10060)  
[Bookie] Fallback to PULSAR_GC if BOOKIE_GC is not defined [#9621](https://github.com/apache/pulsar/pull/9621)  

## admin
Add underReplicate state in the topic internal stats [#10013](https://github.com/apache/pulsar/pull/10013)  

## connector
[Issue-9926][Pulsar Functions] Pass through record properties from Pulsar Sources [#9943](https://github.com/apache/pulsar/pull/9943)  

## sql
[Pulsar-sql]Using pulsar SQL query messages will appear `NoSuchLedger… [#9910](https://github.com/apache/pulsar/pull/9910)  

## tieredstorage
[Tiered Storage] Prevent Class Loader Leak; Restore Offloader Directory Override [#9878](https://github.com/apache/pulsar/pull/9878)  
[Tiered Storage] Add logs for cleanup offloaded data operation [#9852](https://github.com/apache/pulsar/pull/9852)  

