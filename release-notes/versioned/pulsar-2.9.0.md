---
id: pulsar-2.9.0
title: Apache Pulsar 2.9.0 
sidebar_label: Apache Pulsar 2.9.0 
---

#### 2021-11-25

**IMPORTANT NOTICE**

**IT IS NOT RECOMMENDED TO USE PULSAR 2.9.0 ON PRODUCTION ENVIRONMENT** since it does not include the fixes for [Log4j2 vulnerability (CVE-2021-44228)](https://pulsar.apache.org/blog/2021/12/11/Log4j-CVE/) and the [bundle unloading timeout issue](https://github.com/apache/pulsar/pull/12993).

### News and noteworthy

- PIP-45 Pluggable metadata interface introduced many changes about ZooKeeper metadata management: consistency, resilience, stability, tech debt reduction (less code duplication)
- Pulsar IO: Oracle Debezium connector, new Schema aware Elasticsearch sink connector
- Many improvements to the Pulsar clients, with PIP-83, PIP-91, PIP-96 (see below)
- Geo-replication improvements: PIP-88 replicate schemas across clusters
- Apache Kafka connect sinks can be run as Pulsar sinks [#9927](https://github.com/apache/pulsar/pull/9927)

### Breaking changes

- Now Pulsar requires ZooKeeper 3.6.x because it uses the Persistent Recursive Watches feature (see PIP-45)
- The Discovery Service has been removed. [12119](https://github.com/apache/pulsar/pull/12119)
- The Pulsar Standalone docker image has been removed. [11657](https://github.com/apache/pulsar/pull/11657)
- The Pulsar Dashboard docker image has been removed. [11284](https://github.com/apache/pulsar/pull/11284)

### PIPs

- [PIP 96] Add message payload processor for Pulsar client [#12088](https://github.com/apache/pulsar/pull/12088)
- [PIP 99] Pulsar Proxy Extensions [#11838](https://github.com/apache/pulsar/pull/11838)
- [PIP 89] Timed log events [#11944](https://github.com/apache/pulsar/pull/11944)
- [PIP 82] Tenant and namespace level rate limiting [#11918](https://github.com/apache/pulsar/pull/11918)
- [PIP 91] Separate lookup timeout from operation timeout [#11627](https://github.com/apache/pulsar/pull/11627)
- [PIP 88] Replicate schemas across clusters [#11441](https://github.com/apache/pulsar/pull/11441)
- [PIP 83] Pulsar Reader: Message consumption with pooled buffer [#11725](https://github.com/apache/pulsar/pull/11725)
- [PIP 64] Rest API Produce message [PIP 64](https://github.com/apache/pulsar/pull/8125)
- [PIP 45] Pluggable metadata interface [PIP 45](https://github.com/apache/pulsar/wiki/PIP-45%3A-Pluggable-metadata-interface)

### Pulsar IO and Pulsar Functions

- Added Debezium source for Microsoft SQL Server. [12256](https://github.com/apache/pulsar/pull/12256)
- Upgrading Debezium to 1.7. [12295](https://github.com/apache/pulsar/pull/12295)
- Allow Pulsar Functions localrun to exit on error. [12278](https://github.com/apache/pulsar/pull/12278)
- Function: Support for draining workers. [12178](https://github.com/apache/pulsar/pull/12178)
- Go Functions: support set subscription position. [11990](https://github.com/apache/pulsar/pull/11990)
- Support protobuf-native schema for functions. [11868](https://github.com/apache/pulsar/pull/11868)
- Support protobuf schema for pulsar function. [11709](https://github.com/apache/pulsar/pull/11709)
- Support KEY_BASED batch builder for Java based functions and sources. [11706](https://github.com/apache/pulsar/pull/11706)
- Upgrade Go client version to 0.6.0. [11477](https://github.com/apache/pulsar/pull/11477)
- Stop calling the deprecated method Thread.stop() when stopping the function thread in ThreadRuntime. [11401](https://github.com/apache/pulsar/pull/11401)

### Proxy
- Set default httpProxyTimeout to 5 minutes. [12299](https://github.com/apache/pulsar/pull/12299)
- Fixed NPE in ProxyConnection with no auth data. [12111](https://github.com/apache/pulsar/pull/12111)
- Set default http proxy request timeout. [11971](https://github.com/apache/pulsar/pull/11971)
- Fixed Proxy leaking outbound connections. [11848](https://github.com/apache/pulsar/pull/11848)

### Metrics
- Add support for splitting topic and partition label in Prometheus. [12225](https://github.com/apache/pulsar/pull/12225)

### Library updates
- Upgrade netty to 4.1.68.Final. [12218](https://github.com/apache/pulsar/pull/12218)
- Added JLine 2.x for ZK CLI tool. [12102](https://github.com/apache/pulsar/pull/12102)
- Upgrade aircompressor to 0.20. [11790](https://github.com/apache/pulsar/pull/11790)
- Upgrade Jetty to 9.4.43.v20210629. [11660](https://github.com/apache/pulsar/pull/11660)
- Upgrade commons-compress to 1.21. [11345](https://github.com/apache/pulsar/pull/11345)
- Bump Netty version to 4.1.66.Final. [11344](https://github.com/apache/pulsar/pull/11344)
- Exclude grpc-okhttp dependency and set okhttp3 & okio version. [11025](https://github.com/apache/pulsar/pull/11025)
- Use ubuntu:20.04 base image for Pulsar docker images. [11026](https://github.com/apache/pulsar/pull/11026)

### Tiered Storage
- Fix the potential race condition in the BlobStore readhandler. [12123](https://github.com/apache/pulsar/pull/12123)

### Broker
- AuthorizationService should use provider's canLookupAsync method. [11777](https://github.com/apache/pulsar/pull/11777)
- Broker auto refresh bk-client certs to avoid cnx failure after cert refresh. [12107](https://github.com/apache/pulsar/pull/12107)
- Add multi roles support for authorization. [11341](https://github.com/apache/pulsar/pull/11341)
