---
id: pulsar-2.9.1
title: Apache Pulsar 2.9.1 
sidebar_label: Apache Pulsar 2.9.1 
---

#### 2021-12-20

Apache Pulsar 2.9.1 is a bugfix release, that includes library upgrades for important security issues (like Apache Log4j2).
It also includes fixes for some breaking changes introduced in 2.9.0.

### Library updates

- Bump log4j to 2.16.0 [#13277](https://github.com/apache/pulsar/pull/13277)
- Upgrade OkHttp3 to address CVE-2021-0341 [#13065](https://github.com/apache/pulsar/pull/13065)
- Upgrade Netty to 4.1.72 - CVE-2021-43797 [#13328](https://github.com/apache/pulsar/pull/13328)
#### Broker
- Fixed LeaderElectionService.getCurrentLeader and added support for ephemeralOwner in MockZooKeeper [#13066](https://github.com/apache/pulsar/pull/13066)
- Removed tenant permission verification when list partitioned-topic [#13138](https://github.com/apache/pulsar/pull/13138)
- Fixed and improve topic ownership assignment [#13069](https://github.com/apache/pulsar/pull/13069)
- Fixed consume message order issue when use listener.[#13023](https://github.com/apache/pulsar/pull/13023)
- Fixed ManagedLedger: Do not reuse the Failed OpAddEntry object which lead bundle unloading timeout.[#12993](https://github.com/apache/pulsar/pull/12993)
- Fixed incompatibility of BacklogQuota in the REST API [#13291](https://github.com/apache/pulsar/pull/13291)
- Fixed unordered consuming case in Key_Shared subscription.[#12890](https://github.com/apache/pulsar/pull/12890)
- Fixed the incorrect total size when BrokerEntryMetadata is enabled[#12714](https://github.com/apache/pulsar/pull/12714)
- Reverted new AuthorizationProvider method [#13133](https://github.com/apache/pulsar/pull/13133)

#### Pulsar Functions
- Fixed classloader leaks [#12973](https://github.com/apache/pulsar/pull/12973)
- Fixed Kubernetes Pulsar Functions containers not exposing metrics port for scraping [#12065](https://github.com/apache/pulsar/pull/12065)

