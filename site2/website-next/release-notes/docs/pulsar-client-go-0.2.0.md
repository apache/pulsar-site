---
id: pulsar-client-go-0.2.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## Feature

* Expose BatchingMaxSize from ProducerOptions, see [PR-280](https://github.com/apache/pulsar-client-go/pull/280).
* Allow applications to configure the compression level, see [PR-290](https://github.com/apache/pulsar-client-go/pull/290).
* Support producer name for Message, see [PR-299](https://github.com/apache/pulsar-client-go/pull/299).
* Support oauth2 authentication for pulsar-client-go, see [PR-313](https://github.com/apache/pulsar-client-go/pull/313).
* Add interceptor feature for Go client, see [PR-314](https://github.com/apache/pulsar-client-go/pull/314).
* Export client metrics to Prometheus, see [PR-317](https://github.com/apache/pulsar-client-go/pull/317).
* Add Name method to Consumer interface, see [PR-321](https://github.com/apache/pulsar-client-go/pull/321).
* Add oauth2 to the provider, see [PR-338](https://github.com/apache/pulsar-client-go/pull/338).
* Support specified the oauth2 private key with prefix `file://` and `data://`, see [PR-343](https://github.com/apache/pulsar-client-go/pull/343).
* Fix the keyfile unmarshal error, see [PR-339](https://github.com/apache/pulsar-client-go/pull/339).
* Add a new method to create auth provider from tls cert supplier, see [PR-347](https://github.com/apache/pulsar-client-go/pull/347).
* Add seek logic for reader, see [PR-356](https://github.com/apache/pulsar-client-go/pull/356).

## Improve

* Use .asf.yaml to configure github repo, see [PR-216](https://github.com/apache/pulsar-client-go/pull/216).
* Auto update the client to handle changes in number of partitions, see [PR-221](https://github.com/apache/pulsar-client-go/pull/221).
* Clean callbacks of connection after run loop stopped, see [PR-248](https://github.com/apache/pulsar-client-go/pull/248).
* Fix unable to close consumer after unsubscribe in Shared Subscription, see [PR-283](https://github.com/apache/pulsar-client-go/pull/283).
* Introduced lifecycle for compression providers, see [PR-284](https://github.com/apache/pulsar-client-go/pull/284).
* Use maxPendingMessages for sizing producer eventsChan, see [PR-285](https://github.com/apache/pulsar-client-go/pull/285).
* Avoid contention on producer mutex on critical path, see [PR-286](https://github.com/apache/pulsar-client-go/pull/286).
* Switched to DataDog zstd wrapper, reusing the compression ctx, see [PR-287](https://github.com/apache/pulsar-client-go/pull/287).
* Fix panic when creating consumer with ReceiverQueueSize set to -1, see [PR-289](https://github.com/apache/pulsar-client-go/pull/289).
* Used pooled buffering for compression and batch serialization, see [PR-292](https://github.com/apache/pulsar-client-go/pull/292).
* Use gogofast to have in-place protobuf serialization, see [PR-294](https://github.com/apache/pulsar-client-go/pull/294).
* Added semaphore implementation with lower contention, see [PR-298](https://github.com/apache/pulsar-client-go/pull/298).
* Fixed pooled buffer lifecycle, see [PR-300](https://github.com/apache/pulsar-client-go/pull/300).
* Removed blocking queue iterator, see [PR-301](https://github.com/apache/pulsar-client-go/pull/301).
* Fix panic in CreateReader API using custom MessageID for ReaderOptions, see [PR-305](https://github.com/apache/pulsar-client-go/pull/305).
* Change connection failed warn log to error and print error message, see [PR-309](https://github.com/apache/pulsar-client-go/pull/309).
* Share buffer pool across all partitions, see [PR-310](https://github.com/apache/pulsar-client-go/pull/310).
* Add rerun feature test command to repo, see [PR-311](https://github.com/apache/pulsar-client-go/pull/311).
* Fix CompressMaxSize() for ZLib provider, see [PR-312](https://github.com/apache/pulsar-client-go/pull/312).
* Reduce the size of the MessageID structs by one word on 64-bit arch, see [PR-316](https://github.com/apache/pulsar-client-go/pull/316).
* Do not allocate MessageIDs on the heap, see [PR-319](https://github.com/apache/pulsar-client-go/pull/319).
* Different MessageID implementations for message Production and Consumption, see [PR-324](https://github.com/apache/pulsar-client-go/pull/324).
* Fix producer block when the producer with the same id, see [PR-326](https://github.com/apache/pulsar-client-go/pull/326).
* Get the last message when LatestMessageID and inclusive, see [PR-329](https://github.com/apache/pulsar-client-go/pull/329).
* Fix go.mod issue with invalid version, see [PR-330](https://github.com/apache/pulsar-client-go/pull/330).
* Fix producer goroutine leak, see [PR-331](https://github.com/apache/pulsar-client-go/pull/331).
* Fix producer state by reconnecting when receiving unexpected receipts, see [PR-336](https://github.com/apache/pulsar-client-go/pull/336).
* Avoid producer deadlock on connection closing, see [PR-337](https://github.com/apache/pulsar-client-go/pull/337).
