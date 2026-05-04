---
id: pulsar-client-go-0.10.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## Feature
* Support chunking for big messages by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/805
* Add BackoffPolicy to `reader` and improve test case by @labuladong in https://github.com/apache/pulsar-client-go/pull/889
* Support cumulative acknowledgment by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/903
* Support consumer event listener by @labuladong in https://github.com/apache/pulsar-client-go/pull/904
* Allow CustomProperties when sending messages for retry by @ngoyal16 in https://github.com/apache/pulsar-client-go/pull/916
* Support batch index ACK by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/938
* Support Exclusive Producer access mode by @shibd in https://github.com/apache/pulsar-client-go/pull/944
* Add transactionCoordinatorClient by @liangyepianzhou in https://github.com/apache/pulsar-client-go/pull/953
* Support memory limit for the producer by @shibd in https://github.com/apache/pulsar-client-go/pull/955
* Support grouping ACK requests by time and size by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/957
* Support WaitForExclusive producer access mode by @shibd in https://github.com/apache/pulsar-client-go/pull/958
* Support Copper Argos in the Athenz auth provider by @massakam in https://github.com/apache/pulsar-client-go/pull/960
* Support auto-release idle connections by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/963
* Support batch index ACK and  set max number of messages in batch for the perf tool by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/967
* Support auto-scaled consumer receiver queue by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/976
* Implement transactionImpl by @liangyepianzhou in https://github.com/apache/pulsar-client-go/pull/984
* Expose the chunk config of the consumer to the reader by @CrazyCollin in https://github.com/apache/pulsar-client-go/pull/987
* Support consumer client memory limit by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/991


## Improve
* Nack the message in dlqrouter when sending errors by @leizhiyuan in https://github.com/apache/pulsar-client-go/pull/592
* Fix TLS certificates that do not include IP SANS, save hostname before switching to a physical address by @dinghram in https://github.com/apache/pulsar-client-go/pull/812
* Fix the availablePermits leak that could cause the consumer stuck by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/835
* Read module version info from golang runtime by @pgier in https://github.com/apache/pulsar-client-go/pull/856
* Fix typo in `consumer.go` by @sekfung in https://github.com/apache/pulsar-client-go/pull/857
* Fix marshalling `time.Time{}` to `uint64` by @aymkhalil in https://github.com/apache/pulsar-client-go/pull/865
* Use the `DATA` constant as the prefix in OAuth2 KeyFileProvider by @Niennienzz in https://github.com/apache/pulsar-client-go/pull/866
* Fix bot cannot get the pr link by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/868
* Fix PR template by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/869
* Add go test flag '-v' for more clearly CI log by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/871
* Fix the dispatcher() stuck caused by availablePermitsCh by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/875
* Fix the Send() stuck caused by callback() not being called by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/880
* Fix the data race of ackReq.err by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/881
* Add data URL format to read the key file by @nodece in https://github.com/apache/pulsar-client-go/pull/883
* Prevent consumer panic on de-serializing message if schema not found by @GPrabhudas in https://github.com/apache/pulsar-client-go/pull/886
* Fix the conditions of loading TLS certificates by @nodece in https://github.com/apache/pulsar-client-go/pull/888
* Fix default retry and dlq topic name as per the doc by @ngoyal16 in https://github.com/apache/pulsar-client-go/pull/891
* Add NewMessageID() method by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/893
* Use protocolbuffers instead of gogo by @nodece in https://github.com/apache/pulsar-client-go/pull/895
* Fix the compression broken when batching is disabled by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/902
* Add messageId and topic as props of DLQ message by @GPrabhudas in https://github.com/apache/pulsar-client-go/pull/907
* Update go version to 1.18 by @pgier in https://github.com/apache/pulsar-client-go/pull/911
* Move out the auth package from internal by @nodece in https://github.com/apache/pulsar-client-go/pull/914
* Remove the `clearMessageQueuesCh` in `partitionConsumer.dispatcher()` by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/921
* Remove the outdated interface description of `SeekByTime` by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/924
* Handle nil value message correctly in table-view by @Demogorgon314 in https://github.com/apache/pulsar-client-go/pull/930
* Migrate from the deprecated io/ioutil package by @reugn in https://github.com/apache/pulsar-client-go/pull/942
* Update the Cobra library to significantly reduce the dependency tree by @reugn in https://github.com/apache/pulsar-client-go/pull/943
* Remove go1.11 code leftovers by @reugn in https://github.com/apache/pulsar-client-go/pull/946
* Use pkg.go.dev badge in the readme by @reugn in https://github.com/apache/pulsar-client-go/pull/947
* Improve test script by @nodece in https://github.com/apache/pulsar-client-go/pull/951
* Optimize the performance by passing MessageID implementations by pointers by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/968
* Fix flaky Key_Shared subscription-related tests by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/970
* Refactor the toTrackingMessageID() by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/972
* Prevent RPC client panic on RPC response if `ProducerReady` is nil by @sekfung in https://github.com/apache/pulsar-client-go/pull/973
* Fix nack backoff policy logic by @wolfstudy in https://github.com/apache/pulsar-client-go/pull/974
* Fix license information for go-rate by @tisonkun in https://github.com/apache/pulsar-client-go/pull/975
* Fix the data race in checkAndCleanIdleConnections by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/981
* Setup rate limiter for TestChunksEnqueueFailed to reduce flaky by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/982
* Fix the message is blocked on the AckGroupingTracker.isDuplicate method by @shibd in https://github.com/apache/pulsar-client-go/pull/986
* Optimize batch index ACK performance by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/988
* Add more precise producer rate limiter by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/989
* Fix batched messages not ACKed correctly when batch index ACK is disabled by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/994
* Fix panic caused by retryAssert() by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/996

## New Contributors
* @sekfung made their first contribution in https://github.com/apache/pulsar-client-go/pull/857
* @Gleiphir2769 made their first contribution in https://github.com/apache/pulsar-client-go/pull/835
* @michaeljmarshall made their first contribution in https://github.com/apache/pulsar-client-go/pull/861
* @aymkhalil made their first contribution in https://github.com/apache/pulsar-client-go/pull/865
* @RobertIndie made their first contribution in https://github.com/apache/pulsar-client-go/pull/868
* @dinghram made their first contribution in https://github.com/apache/pulsar-client-go/pull/812
* @labuladong made their first contribution in https://github.com/apache/pulsar-client-go/pull/889
* @Niennienzz made their first contribution in https://github.com/apache/pulsar-client-go/pull/866
* @crossoverJie made their first contribution in https://github.com/apache/pulsar-client-go/pull/893
* @ngoyal16 made their first contribution in https://github.com/apache/pulsar-client-go/pull/891
* @Demogorgon314 made their first contribution in https://github.com/apache/pulsar-client-go/pull/930
* @shibd made their first contribution in https://github.com/apache/pulsar-client-go/pull/944
* @liangyepianzhou made their first contribution in https://github.com/apache/pulsar-client-go/pull/953
* @tisonkun made their first contribution in https://github.com/apache/pulsar-client-go/pull/975
* @CrazyCollin made their first contribution in https://github.com/apache/pulsar-client-go/pull/987