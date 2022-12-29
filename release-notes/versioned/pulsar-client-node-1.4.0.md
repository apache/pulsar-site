---
id: pulsar-client-node-1.4.0
title: Pulsar Client Node
sidebar_label: Pulsar Client Node
---

### 1.4.0 &mdash; 2021-08-03 <a id="1.4.0"></a>
https://www.npmjs.com/package/pulsar-client/v/1.4.0

#### Features
* Add Connection Status Support to Producer/Consumer/Reader https://github.com/apache/pulsar-client-node/pull/162
* added functionality for orderingKey in Message.cc https://github.com/apache/pulsar-client-node/pull/155
* Support Reader Listener https://github.com/apache/pulsar-client-node/pull/153
* Support end to end encryption for node client https://github.com/apache/pulsar-client-node/pull/138
* Support Disable Replication https://github.com/apache/pulsar-client-node/pull/149

#### Fixes
* Use Buffer::Copy instead of Buffer::New https://github.com/apache/pulsar-client-node/pull/163
* Fix leak at MessageId::Serialize https://github.com/apache/pulsar-client-node/pull/160
* Fix Leak in MessageId::ToString  https://github.com/apache/pulsar-client-node/pull/159