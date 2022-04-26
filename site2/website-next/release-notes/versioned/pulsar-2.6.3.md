---
id: pulsar-2.6.3
title: Apache Pulsar 2.6.3 
sidebar_label: Apache Pulsar 2.6.3 
---

#### 2021-01-26

#### Broker

- Update the BookKeeper to version 4.11.1 [#8604](https://github.com/apache/pulsar/pull/8604)
- Use the correct configuration for the expiration time of the ZooKeeper cache [#8302](https://github.com/apache/pulsar/pull/8302)
- Refresh ZooKeeper-data cache in background to avoid deadlock and blocking IO on the ZooKeeper thread [#8304](https://github.com/apache/pulsar/pull/8304)
- Add `elapsedMs` in the creation of the ledger log [#8473](https://github.com/apache/pulsar/pull/8473)
- Fix the race condition when calling `acknowledgementWasProcessed()` [#8499](https://github.com/apache/pulsar/pull/8499)
- Fix the way to handle errors for client requests [#8518](https://github.com/apache/pulsar/pull/8518)
- Expose consumer names after the mark delete position for the Key_Shared subscription [#8545](https://github.com/apache/pulsar/pull/8545)
- Close topics that remain fenced forcefully [#8561](https://github.com/apache/pulsar/pull/8561)
- Expose the last disconnected timestamp for producers and consumers [#8605](https://github.com/apache/pulsar/pull/8605)
- Support the HAProxy proxy protocol for Pulsar broker and Pulsar Proxy [#8686](https://github.com/apache/pulsar/pull/8686)
- Clear delayed messages when clearing the backlog [#8691](https://github.com/apache/pulsar/pull/8691)
- Fix the Jclouds Azure credential error [#8693](https://github.com/apache/pulsar/pull/8693)
- Improve environment configiguration handling [#8709](https://github.com/apache/pulsar/pull/8709)
- Fix the issue with failing to get `lastMessageId` for an empty topic due to message retention [#8725](https://github.com/apache/pulsar/pull/8725)
- Ensure that the Offload manager is initialized once [#8739](https://github.com/apache/pulsar/pull/8739)
- Fix the issue with getting partition metadata for a non-existed topic [#8818](https://github.com/apache/pulsar/pull/8818)
- Fix the exception cast error [#8828](https://github.com/apache/pulsar/pull/8828)
- Export Prometheus metric for messageTTL [#8871](https://github.com/apache/pulsar/pull/8871)
- Fix the issue that GenericJsonReader converts the null value to string "null" [#8883](https://github.com/apache/pulsar/pull/8883)
- Capture stats with precise backlog [#8928](https://github.com/apache/pulsar/pull/8928)
- Monitor if a cursor moves its mark-delete position [#8930](https://github.com/apache/pulsar/pull/8930)
- Intercept `beforeSendMessage` calls [#8932](https://github.com/apache/pulsar/pull/8932)
- Expose non-contiguous deleted messages ranges stats [#8936](https://github.com/apache/pulsar/pull/8936)
- Fix NPE in `PersistentStickyKeyDispatcherMultipleConsumers` [#8969](https://github.com/apache/pulsar/pull/8969)
- Fix the issue that an exception is thrown when peeking at compressed messages (Readonly buffers are not supported by Airlift) [#8990](https://github.com/apache/pulsar/pull/8990)
- Remove the duplicated broker Prometheus metrics type [#8995](https://github.com/apache/pulsar/pull/8995)
- Improve the way to handle errors when the broker does not trust client certificates [#8998](https://github.com/apache/pulsar/pull/8998)
- Add the raw Prometheus metrics provider [#9021](https://github.com/apache/pulsar/pull/9021)
- Support chained authentication with same authentication method name [#9094](https://github.com/apache/pulsar/pull/9094)
- Fix regression in apply-config-from-env.py [#9097](https://github.com/apache/pulsar/pull/9097)

#### Proxy

- Fix the `request.getContentLength()` to return 0 if it is less than 0 [#8448](https://github.com/apache/pulsar/pull/8448)
- Add the error log for the Pulsar Proxy starter [#8451](https://github.com/apache/pulsar/pull/8451)
- Support enabling WebSocket on Pulsar Proxy [#8613](https://github.com/apache/pulsar/pull/8613)
- Fix the issue that the Proxy `bindAddress` configuration does not work for the `servicePort` [#9068](https://github.com/apache/pulsar/pull/9068)
#### Pulsar Perf

- Support WebSocket Producer for V2 topics [#8535](https://github.com/apache/pulsar/pull/8535)

#### Pulsar IO

- Make Schema information of Source topic available to downstream Sinks [#8854](https://github.com/apache/pulsar/pull/8854)
- Fix the error log of the Debezium connector [#9063](https://github.com/apache/pulsar/pull/9063)

#### Functions

- Propagate user-defined parameter into instances of Golang Pulsar Functions [#8132](https://github.com/apache/pulsar/pull/8132)
- Go functions supports Kubernetes runtime [#8352](https://github.com/apache/pulsar/pull/8352)

