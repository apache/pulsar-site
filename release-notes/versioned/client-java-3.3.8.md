---
id: client-java-3.3.8
title: Client Java 3.3.8
sidebar_label: Client Java 3.3.8
---

- [improve][misc] Upgrade Netty to 4.1.122.Final and tcnative to 2.0.72.Final ([#24397](https://github.com/apache/pulsar/pull/24397))
- [improve][build] replace org.apache.commons.lang to org.apache.commons.lang3 ([#24473](https://github.com/apache/pulsar/pull/24473))
- [improve][misc] Upgrade RE2/J to 1.8 ([#24530](https://github.com/apache/pulsar/pull/24530))
- [fix][client] Close orphan producer or consumer when the creation is interrupted ([#24539](https://github.com/apache/pulsar/pull/24539))
- [fix][client] Fix ClientCnx handleSendError NPE ([#24517](https://github.com/apache/pulsar/pull/24517))
- [fix][client] Fix issue in auto releasing of idle connection with topics pattern consumer ([#24528](https://github.com/apache/pulsar/pull/24528))
- [fix][client] Fix some potential resource leak ([#24402](https://github.com/apache/pulsar/pull/24402))
- [fix][client] NPE in MultiTopicsConsumerImpl.negativeAcknowledge ([#24476](https://github.com/apache/pulsar/pull/24476))
- [fix][client] Prevent NPE when seeking with null topic in TopicMessageId ([#24404](https://github.com/apache/pulsar/pull/24404))
- [fix][client][branch-4.0] Partitioned topics are unexpectedly created by client after deletion ([#24554](https://github.com/apache/pulsar/pull/24554)) ([#24571](https://github.com/apache/pulsar/pull/24571))
- [fix][txn] Fix negative unacknowledged messages in transactions by ensuring that the batch size is added into CommandAck ([#24443](https://github.com/apache/pulsar/pull/24443))
- [improve][client] Terminate consumer.receive() when consumer is closed ([#24550](https://github.com/apache/pulsar/pull/24550))
- [fix][client] Fix RawReader interface compatibility
- [improve][misc] Optimize topic list hashing so that potentially large String allocation is avoided ([#24525](https://github.com/apache/pulsar/pull/24525))
