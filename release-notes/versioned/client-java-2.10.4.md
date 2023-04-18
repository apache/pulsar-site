---
id: client-java-2.10.4
title: Client Java 2.10.4
sidebar_label: Client Java 2.10.4
---

* [fix][client] Fix reader listener can't auto ack with pooled message. (#19354)
* [fix][client] Prevent DNS reverse lookup when physical address is an IP address (#19028)
* [fix][client] Set fields earlier for correct ClientCnx initialization (#19327)
* [improve][client] Change the get lastMessageId to debug level (#18421)
* [fix][client] Fix async completion in ConsumerImpl#processPossibleToDLQ (#19392)
* [fix][client] Broker address resolution wrong if connect through a multi-dns names proxy (#19597)
* [fix][client] Fix authentication not update after changing the serviceUrl (#19510)
* [fix][client] Set authentication when using loadConf in client and admin client (#18358)
* [fix] [client] fix memory leak if enabled pooled messages (#19585)
* [fix][client][branch-2.10]Return local thread for the newThread (#19779)
