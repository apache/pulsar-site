---
id: client-java-2.10.5
title: Client Java 2.10.5
sidebar_label: Client Java 2.10.5
---

* [fix] [client] Messages lost when consumer reconnect (#20695)
* [fix][client] Make the whole grabCnx() progress atomic (#20595)
* [fix][client] Fix race condition that leads to caching failed CompletableFutures in ConnectionPool (#19661)
* [fix][client] Fix deadlock issue of consumer while using multiple IO threads (#20669)
* [fix][client] Cache empty schema version in ProducerImpl schemaCache. (#19929)
* [fix][fn] Reset idle timer correctly (#20450)
* [fix][client] Release the orphan producers after the primary consumer is closed (#19858)
* [fix][client] Fix DeadLetterProducer creation callback blocking client io thread. (#19930)

