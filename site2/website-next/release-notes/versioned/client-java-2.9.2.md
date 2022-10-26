---
id: client-java-2.9.2
title: Client Java 2.9.2 
sidebar_label: Client Java 2.9.2 
---

- [Java] Fix ConsumerBuilderImpl#subscribeAsync blocks calling thread. [#14433](https://github.com/apache/pulsar/pull/14433)
- [Java] Fix adding message to list potential issue [#14377](https://github.com/apache/pulsar/pull/14377)
- [Java] Fix send to deadLetterTopic not working when reach maxRedeliverCount [#14317](https://github.com/apache/pulsar/pull/14317)
- [Java] Fix time unit mismatch in errMsg when producer send fails. [#14299](https://github.com/apache/pulsar/pull/14299)
- [Java] Fix PersistentAcknowledgmentsGroupingTracker set BitSet issue. [#14260](https://github.com/apache/pulsar/pull/14260)
- [Java] Check ``getTlsTrustStorePath`` NPE when user forget to set it. [#14253](https://github.com/apache/pulsar/pull/14253)
- [Java] Fix consume failure when BatchReceivePolicy#maxNumBytes < message size [#14139](https://github.com/apache/pulsar/pull/14139)
- [Java] Use `scheduleWithFixedDelay` instead of `scheduleAtFixedRate` for java producer batch timer [#14125](https://github.com/apache/pulsar/pull/14125)
- [Java] Add a default timeout for OAuth2 Metadata Resolver [#14056](https://github.com/apache/pulsar/pull/14056)
- [Java] Fix send chunking message failed when ordering key is set. [#13699](https://github.com/apache/pulsar/pull/13699)
- [Java] Fix send chunking message failed when encryption enabled [#13689](https://github.com/apache/pulsar/pull/13689)
- [Java] Fix Producer semaphore permit release issue [#13682](https://github.com/apache/pulsar/pull/13682)
- [Java] Fix the wrong multi-topic has message available behavior [#13634](https://github.com/apache/pulsar/pull/13634)
- [Java] Use PulsarByteBufAllocator to allocate buffer for chunks [#13536](https://github.com/apache/pulsar/pull/13536)
- [Java] Fix resources leak when create producer failed [#13505](https://github.com/apache/pulsar/pull/13505)
- [Java] Fix semaphore and memory leak when chunks failed to enqueue [#13454](https://github.com/apache/pulsar/pull/13454)
- [Java] Fix invalid setting of enabled ciphers to fix warning from BoringSSL [#13435](https://github.com/apache/pulsar/pull/13435)
- [Java] Fix multi topic reader has message available behavior [#13332](https://github.com/apache/pulsar/pull/13332)
- [Java] Improve consumer listener logic [#13273](https://github.com/apache/pulsar/pull/13273)
- [Java] Fix memory leak when message payload processor is configured [#13233](https://github.com/apache/pulsar/pull/13233)
- [Java] Change the time units from ns to ms [#13057](https://github.com/apache/pulsar/pull/13057)
- [Java] Use sendAsync instead of send when produce message to retry topic. [#12946](https://github.com/apache/pulsar/pull/12946)
- [Java] Avoid IllegalStateException in ClientCnx debug logs [#12899](https://github.com/apache/pulsar/pull/12899)
- [Java] Fix pending queue-size stats for batch messages [#12704](https://github.com/apache/pulsar/pull/12704)
- [Java] Fix invalid firstSentAt in log message when timeout first time [#12588](https://github.com/apache/pulsar/pull/12588)
- [Java] Add conf backoff values [#12520](https://github.com/apache/pulsar/pull/12520)
- [Java] Update producer stats when producer close [#12500](https://github.com/apache/pulsar/pull/12500)
- [Java] Fix a typo in UnAckedMessageTracker [#12467](https://github.com/apache/pulsar/pull/12467)
- [Java] Fix the retry topic's `REAL_TOPIC` & `ORIGIN_MESSAGE_ID` property [#12451](https://github.com/apache/pulsar/pull/12451)
- [Java] Change the producer fence error log to debug level [#12447](https://github.com/apache/pulsar/pull/12447)
- [Java] Add log error tracking for semaphore count leak [#12410](https://github.com/apache/pulsar/pull/12410)
- [Java] Fix race condition of OpSendMsgQueue when publishing messages [#14231](https://github.com/apache/pulsar/pull/14231)

