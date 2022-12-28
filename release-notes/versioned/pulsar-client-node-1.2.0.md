---
id: pulsar-client-node-1.2.0
title: Pulsar Client Node
sidebar_label: Pulsar Client Node
---

### 1.2.0 &mdash; 2020-08-12 <a id="1.2.0"></a>

This is the third release of the Pulsar Node.js client.
https://www.npmjs.com/package/pulsar-client/v/1.2.0

#### Features

* Added Key_Shared subscription type [#71](https://github.com/apache/pulsar-client-node/pull/71)
* Added read compacted option to consumer options [#73](https://github.com/apache/pulsar-client-node/pull/73)
* Enabled passing function for logging when creating client [#82](https://github.com/apache/pulsar-client-node/pull/82)
* Enabled getting redelivery count of message [#101](https://github.com/apache/pulsar-client-node/pull/101)

#### Fixes

* Fixed issue where consumer with message listener dies [#83](https://github.com/apache/pulsar-client-node/pull/83)
* Fixed issue where client instance could be garbage collected [#85](https://github.com/apache/pulsar-client-node/pull/85)

For a complete list of issues fixed, see
https://github.com/apache/pulsar-client-node/milestone/4?closed=1