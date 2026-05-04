---
id: client-java-3.3.3
title: Client Java 3.3.3
sidebar_label: Client Java 3.3.3
---

- [fix][sec] Upgrade to Netty 4.1.115.Final to address CVE-2024-47535 ([#23596](https://github.com/apache/pulsar/pull/23596))
- [improve] Upgrade OpenTelemetry library to 1.44.1 version ([#23656](https://github.com/apache/pulsar/pull/23656))
- [fix][admin] Fix lookup get a null result if uses proxy ([#23556](https://github.com/apache/pulsar/pull/23556))
- [fix][client] Fix DLQ producer name conflicts when there are same name consumers ([#23577](https://github.com/apache/pulsar/pull/23577))
- [fix][client] Fix Reader.hasMessageAvailable return wrong value after seeking by timestamp with startMessageIdInclusive ([#23502](https://github.com/apache/pulsar/pull/23502))
- [fix][client] Fix ReaderBuilder doest not give illegalArgument on connection failure retry ([#22639](https://github.com/apache/pulsar/pull/22639))
- [fix][client] Fix deadlock of NegativeAcksTracker ([#23651](https://github.com/apache/pulsar/pull/23651))
- [fix][client] Fix producer/consumer stop to reconnect or Pub/Sub due to IO thread race-condition  ([#23499](https://github.com/apache/pulsar/pull/23499))
- [fix][client] Fix race-condition causing doReconsumeLater to hang when creating retryLetterProducer has failed ([#23560](https://github.com/apache/pulsar/pull/23560))
- [fix][client] Fix the javadoc for ConsumerBuilder.isAckReceiptEnabled ([#23452](https://github.com/apache/pulsar/pull/23452))
- [fix][client] Fixed an issue where a cert chain could not be used in TLS authentication ([#23644](https://github.com/apache/pulsar/pull/23644))
- [fix][client] Initializing client-authentication using configured auth params ([#23610](https://github.com/apache/pulsar/pull/23610))
- [fix][client] Make protobuf-java dependency optional in java client libraries ([#23632](https://github.com/apache/pulsar/pull/23632))
- [fix][client] Prevent embedding protobuf-java class files in pulsar-client-admin and pulsar-client-all ([#23468](https://github.com/apache/pulsar/pull/23468))
- [fix][client] The partitionedProducer maxPendingMessages always is 0 ([#23593](https://github.com/apache/pulsar/pull/23593))
- [fix][client] Use dedicated executor for requests in BinaryProtoLookupService ([#23378](https://github.com/apache/pulsar/pull/23378))
- [fix][client] fix incomingMessageSize and client memory usage is negative ([#23624](https://github.com/apache/pulsar/pull/23624))
- [fix][client] fix the beforeConsume() method earlier hit with message listener ([#23578](https://github.com/apache/pulsar/pull/23578))
- [improve][admin] Print error log if handle http response fails ([#23563](https://github.com/apache/pulsar/pull/23563))
- [improve][client] Enhance error handling for non-exist subscription in consumer creation ([#23254](https://github.com/apache/pulsar/pull/23254))
- [improve][client] Increase default Java client connectionMaxIdleSeconds to 60 seconds ([#23430](https://github.com/apache/pulsar/pull/23430))
- [improve][client] Reduce unshaded dependencies and shading warnings in shaded Java client modules ([#23647](https://github.com/apache/pulsar/pull/23647))
- [improve][client] Replace NameUtil#generateRandomName with RandomStringUtils#randomAlphanumeric ([#23645](https://github.com/apache/pulsar/pull/23645))
- Enabling DNS retryOnTimeout with TCP in DnsNameResolver ([#23590](https://github.com/apache/pulsar/pull/23590))