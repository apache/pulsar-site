---
id: client-java-2.8.3
title: Client Java 2.8.3 
sidebar_label: Client Java 2.8.3 
---

- Fix adding message to list potential issue [14377](https://github.com/apache/pulsar/pull/14377)
- Fix send to deadLetterTopic not working when reach maxRedeliverCount [14317](https://github.com/apache/pulsar/pull/14317)
- Fix time unit mismatch in errMsg when producer send fails. [14299](https://github.com/apache/pulsar/pull/14299)
- Fix PersistentAcknowledgmentsGroupingTracker set BitSet issue. [14260](https://github.com/apache/pulsar/pull/14260)
- Check ``getTlsTrustStorePath`` NPE when user forget to set it. [14253](https://github.com/apache/pulsar/pull/14253)
- [Issue 12262] Fix consume failure when BatchReceivePolicy#maxNumBytes < message size [14139](https://github.com/apache/pulsar/pull/14139)
- Use `scheduleWithFixedDelay` instead of `scheduleAtFixedRate` for java producer batch timer [14125](https://github.com/apache/pulsar/pull/14125)
- Add a default timeout for OAuth2 Metadata Resolver [14056](https://github.com/apache/pulsar/pull/14056)
- Fix send chunking message failed when ordering key is set. [13699](https://github.com/apache/pulsar/pull/13699)
- Fixed Producer semaphore permit release issue [13682](https://github.com/apache/pulsar/pull/13682)
- Fix the wrong multi-topic has message available behavior [13634](https://github.com/apache/pulsar/pull/13634)
- Use PulsarByteBufAllocator to allocate buffer for chunks [13536](https://github.com/apache/pulsar/pull/13536)
- Fix resources leak when create producer failed [13505](https://github.com/apache/pulsar/pull/13505)
- Fix semaphore and memory leak when chunks failed to enqueue [13454](https://github.com/apache/pulsar/pull/13454)
- Fix invalid setting of enabled ciphers to fix warning from BoringSSL [13435](https://github.com/apache/pulsar/pull/13435)
- [Producer] Change the time units from ns to ms [13057](https://github.com/apache/pulsar/pull/13057)
- Fix consume message order issue when use listener. [13023](https://github.com/apache/pulsar/pull/13023)
- Use sendAsync instead of send when produce message to retry topic. [12946](https://github.com/apache/pulsar/pull/12946)
- [Java Client] Avoid IllegalStateException in ClientCnx debug logs [12899](https://github.com/apache/pulsar/pull/12899)
- [pulsar-client] Add conf backoff values [12520](https://github.com/apache/pulsar/pull/12520)
- Add log error tracking for semaphore count leak [12410](https://github.com/apache/pulsar/pull/12410)

