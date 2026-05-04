---
id: client-java-4.0.6
title: Client Java 4.0.6
sidebar_label: Client Java 4.0.6
---

- [improve][misc] Upgrade Netty to 4.1.122.Final and tcnative to 2.0.72.Final ([#24397](https://github.com/apache/pulsar/pull/24397))
- [improve][build] replace org.apache.commons.lang to org.apache.commons.lang3 ([#24473](https://github.com/apache/pulsar/pull/24473))
- [improve][build] Bump org.apache.commons:commons-lang3 from 3.17.0 to 3.18.0 ([#24514](https://github.com/apache/pulsar/pull/24514))
- [improve][misc] Upgrade RE2/J to 1.8 ([#24530](https://github.com/apache/pulsar/pull/24530))
- [fix][misc] Fix topics pattern consumer backwards compatibility ([#24537](https://github.com/apache/pulsar/pull/24537))
- [improve][misc] Optimize topic list hashing so that potentially large String allocation is avoided ([#24525](https://github.com/apache/pulsar/pull/24525))
- [fix][client] Close orphan producer or consumer when the creation is interrupted ([#24539](https://github.com/apache/pulsar/pull/24539))
- [fix][client] Fix ClientCnx handleSendError NPE ([#24517](https://github.com/apache/pulsar/pull/24517))
- [fix][client] Fix issue in auto releasing of idle connection with topics pattern consumer ([#24528](https://github.com/apache/pulsar/pull/24528))
- [fix][client] Fix some potential resource leak ([#24402](https://github.com/apache/pulsar/pull/24402))
- [fix][client] NPE in MultiTopicsConsumerImpl.negativeAcknowledge ([#24476](https://github.com/apache/pulsar/pull/24476))
- [fix][client] Prevent NPE when seeking with null topic in TopicMessageId ([#24404](https://github.com/apache/pulsar/pull/24404))
- [fix][client][branch-4.0] Partitioned topics are unexpectedly created by client after deletion ([#24554](https://github.com/apache/pulsar/pull/24554)) ([#24571](https://github.com/apache/pulsar/pull/24571))
- [fix][txn] Fix negative unacknowledged messages in transactions by ensuring that the batch size is added into CommandAck ([#24443](https://github.com/apache/pulsar/pull/24443))
- [improve][client] Terminate consumer.receive() when consumer is closed ([#24550](https://github.com/apache/pulsar/pull/24550))
- [fix][client] Fix consumer not returning encrypted messages on decryption failure with compression enabled ([#24356](https://github.com/apache/pulsar/pull/24356))