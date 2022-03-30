---
id: client-java-2.8.1
title: Client Java 2.8.1 
sidebar_label: Client Java 2.8.1 
---

Handle receiveAsync() failures in MultiTopicsConsumer #11843  
Fixed accessing MessageImpl after it was enqueued on user queue #11824  
Forget to update memory usage on message send timeout #11761  
[pulsar-client] remove consumer reference from PulsarClient on subscription failure #11758  
[pulsar-client] clean up MultiTopicsConsumerImpl reference on consumer creation failure #11754  
Fix null MessageId may be passed to its compareTo() method #11607  
Use sendRequestWithId to add timeout to hasMessageAvailable #11600  
[C++/Python] Fix bugs that were not exposed by broken C++ CI before #11557  
[Issue 11493] Fix #11493. Simple implementation of getting number of references from C++ client #11535  
Fix Consumer listener does not respect receiver queue size #11455  
Avoid infinite waiting for consumer close #11347  
[C++] Use same regex code at ZTSClient #11323  

