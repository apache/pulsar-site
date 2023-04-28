---
id: client-java-2.9.5
title: Client Java 2.9.5
sidebar_label: Client Java 2.9.5
---

* [fix][client] Fix reader listener can't auto ack with pooled message. (#19354)
* [fix][client] Prevent DNS reverse lookup when physical address is an IP address (#19028)
* [fix][client] Set fields earlier for correct ClientCnx initialization (#19327)
* [improve][client] Change the get lastMessageId to debug level (#18421)
* [fix][client] For exclusive subscriptions, if two consumers are created repeatedly, the second consumer will block #18633
* [fix][client] Fix async completion in ConsumerImpl#processPossibleToDLQ (#19392)
* [fix][client] Broker address resolution wrong if connect through a multi-dns names proxy (#19597)
* [fix] [client] Fix memory leak if enabled pooled messages (#19585)
* [fix][client] Fix IllegalThreadStateException when using newThread in ExecutorProvider.ExtendedThreadFactory (#18268)
