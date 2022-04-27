---
id: pulsar-2.6.4
title: Apache Pulsar 2.6.4 
sidebar_label: Apache Pulsar 2.6.4 
---

#### 2021-06-02

#### Broker
- Disallow parsing of token with none signature in authenticateToken [#9172](https://github.com/apache/pulsar/pull/9172)
- Fix marking individual deletes as dirty [#9732](https://github.com/apache/pulsar/pull/9732)
- Issue 9082: Broker expires messages one at a time after topic unload [#9083](https://github.com/apache/pulsar/pull/9083)
- [logging] Upgrade Log4j2 version to 2.14.0, replace legacy log4j dependency with log4j-1.2-api [#8880](https://github.com/apache/pulsar/pull/8880)
- Upgrade Bouncy castle to newest version [#8047](https://github.com/apache/pulsar/pull/8047)
- Fixed logic for forceful topic deletion [#7356](https://github.com/apache/pulsar/pull/7356)
- Perform periodic flush of ManagedCursor mark-delete posistions [#8634](https://github.com/apache/pulsar/pull/8634)
- Fix the batch index ack persistent issue. [#9504](https://github.com/apache/pulsar/pull/9504)
- Fix the partition number not equals expected error [#9446](https://github.com/apache/pulsar/pull/9446)
- Fix the closed ledger did not delete after expired [#9136](https://github.com/apache/pulsar/pull/9136)
- Fix testBrokerSelectionForAntiAffinityGroup by increasing OverloadedThreshold [#9393](https://github.com/apache/pulsar/pull/9393)

### Tiered storage
- [tiered-storage] Allow AWS credentials to be refreshed [#9387](https://github.com/apache/pulsar/pull/9387)



