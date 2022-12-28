---
id: client-java-2.8.1
title: Client Java 2.8.1 
sidebar_label: Client Java 2.8.1 
---

- Fixed accessing MessageImpl after it was enqueued on user queue [#11824](https://github.com/apache/pulsar/pull/11824)
- Remove consumer reference from PulsarClient on subscription failure [#11758](https://github.com/apache/pulsar/pull/11758)
- Clean up MultiTopicsConsumerImpl reference on consumer creation failure [#11754](https://github.com/apache/pulsar/pull/11754)
- Fix null MessageId may be passed to its compareTo() method [#11607](https://github.com/apache/pulsar/pull/11607)
- Fix Consumer listener does not respect receiver queue size [#11455](https://github.com/apache/pulsar/pull/11455)
- Avoid infinite waiting for consumer close [#11347](https://github.com/apache/pulsar/pull/11347)
- Fix non-persistent topic get partitioned metadata error on discovery [#10806](https://github.com/apache/pulsar/pull/10806)
- Add AvroSchema UUID support fix [#10428](https://github.com/apache/pulsar/pull/10428)
- Handle receiveAsync() failures in MultiTopicsConsumer [#11843](https://github.com/apache/pulsar/pull/11843)
- Fix bin/pulsar-client produce not supporting v2 topic name through websocket [#11069](https://github.com/apache/pulsar/pull/11069)
- Fixed race condition on multi-topic consumer [#11764](https://github.com/apache/pulsar/pull/11764)
- Forget to update memory usage on message send timeout [#11761](https://github.com/apache/pulsar/pull/11761)
- Fixed block forever bug in Consumer.batchReceive [#11691](https://github.com/apache/pulsar/pull/11691)
- Fix add listenerName for geo-replicator [#10779](https://github.com/apache/pulsar/pull/10779) 

