---
id: client-java-2.9.1
title: Client Java 2.9.1 
sidebar_label: Client Java 2.9.1 
---

- Fixed a data race on the Producer to get a Connection [#13176](https://github.com/apache/pulsar/pull/13176)
- Fixed Producer: Send CloseProducer on timeout [#13161](https://github.com/apache/pulsar/pull/13161)
- Fixed Producer: Use epoch to version Producer's cnx to prevent early delivery of messages [#12779](https://github.com/apache/pulsar/pull/12779)
- Removed a data race in MultiTopicsConsumerImpl to ensure correct message order [#12456](https://github.com/apache/pulsar/pull/12456)
- Fixed message order in Consumer issue when use listener [#13023](https://github.com/apache/pulsar/pull/13023)
- Audience Field Optional is now optional in OAuth2 Client Credentials [#11988](https://github.com/apache/pulsar/pull/11988)

