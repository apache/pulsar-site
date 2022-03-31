---
id: pulsar-client-node-1.3.0
title: Pulsar Client Node
sidebar_label: Pulsar Client Node
---

### 1.3.0 &mdash; 2021-03-18 <a id="1.3.0"></a>

This is the fourth release of the Pulsar Node.js client.
https://www.npmjs.com/package/pulsar-client/v/1.3.0

#### Enhancements

* Added type definitions for TypeScript [#140](https://github.com/apache/pulsar-client-node/pull/140)
* Producer#send returns the message ID as a Promise [#137](https://github.com/apache/pulsar-client-node/pull/137)

#### Features

* Added unsubscribe method to Consumer [#120](https://github.com/apache/pulsar-client-node/pull/120)
* ZSTD and SNAPPY compression formats are supported [#121](https://github.com/apache/pulsar-client-node/pull/121)
* Producer#send supports deliverAt and deliverAfter [#123](https://github.com/apache/pulsar-client-node/pull/123)
* Added getProducerName and getTopic methods to Producer [#126](https://github.com/apache/pulsar-client-node/pull/126)
* Enabled specifying topics that Consumer subscribes to in a pattern [#125](https://github.com/apache/pulsar-client-node/pull/125)
* Enabled specifying an array of topics that Consumer subscribes to [#130](https://github.com/apache/pulsar-client-node/pull/130)

For a complete list of issues fixed, see
https://github.com/apache/pulsar-client-node/milestone/5?closed=1