---
id: pulsar-client-go-0.12.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## What's Changed
* Improved the performance of schema and schema cache by @gunli in https://github.com/apache/pulsar-client-go/pull/1033
* Fixed return when registerSendOrAckOp() failed by @gunli in https://github.com/apache/pulsar-client-go/pull/1045
* Fixed the incorrect link in the release process by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1050
* Fixed Producer by checking if message is nil by @gunli in https://github.com/apache/pulsar-client-go/pull/1047
* Added 0.11.0 change log by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1048
* Fixed 0.11.0 change log by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1054
* Fixed issue 877 where ctx in partitionProducer.Send() was not performing as expected by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/1053
* Fixed Producer by stopping block request even if Value and Payload are both set by @gunli in https://github.com/apache/pulsar-client-go/pull/1052
* Improved Producer by simplifying the flush logic by @gunli in https://github.com/apache/pulsar-client-go/pull/1049
* Fixed issue 1051: inaccurate producer memory limit in chunking and schema by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/1055
* Fixed issue by sending Close Command on Producer/Consumer create timeout by @michaeljmarshall in https://github.com/apache/pulsar-client-go/pull/1061
* Fixed issue 1057: producer flush operation is not guaranteed to flush all messages by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/1058
* Fixed issue 1064: panic when trying to flush in DisableBatching=true by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/1065
* Fixed transaction acknowledgement and send logic for chunk message by @liangyepianzhou in https://github.com/apache/pulsar-client-go/pull/1069
* Fixed issue by closing consumer resources if creation fails by @michaeljmarshall in https://github.com/apache/pulsar-client-go/pull/1070
* Fixed issue where client reconnected every authenticationRefreshCheckSeconds when using TLS authentication by @jffp113 in https://github.com/apache/pulsar-client-go/pull/1062
* Corrected the SendAsync() description by @Gleiphir2769 in https://github.com/apache/pulsar-client-go/pull/1066
* CI: replaced license header checker and formatter by @tisonkun in https://github.com/apache/pulsar-client-go/pull/1077
* Chore: allowed rebase and merge by @tisonkun in https://github.com/apache/pulsar-client-go/pull/1080
* Adopted pulsar-admin-go sources by @tisonkun in https://github.com/apache/pulsar-client-go/pull/1079
* Reverted: allowed rebase and merge by @tisonkun in https://github.com/apache/pulsar-client-go/pull/1081
* Fixed producer by failing all messages that are pending requests when closing like Java by @graysonzeng in https://github.com/apache/pulsar-client-go/pull/1059
* Supported load config from env by @tuteng in https://github.com/apache/pulsar-client-go/pull/1089
* Fixed issue where multiple calls to client.Close causes panic by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1046
* Improved client by implementing GetLastMSgID for Reader by @liangyepianzhou in https://github.com/apache/pulsar-client-go/pull/1087
* Fixed comment for ConnectionMaxIdleTime by @massakam in https://github.com/apache/pulsar-client-go/pull/1091
* Issue 1094: connectionTimeout respects net.Dialer default timeout by @zzzming in https://github.com/apache/pulsar-client-go/pull/1095
* Supported OAuth2 with scope field by @labuladong in https://github.com/apache/pulsar-client-go/pull/1097
* Fixed issue where DisableReplication flag does not work by @massakam in https://github.com/apache/pulsar-client-go/pull/1100
* Double-checked before consumer reconnect by @zccold in https://github.com/apache/pulsar-client-go/pull/1084
* Fixed schema error by @leizhiyuan in https://github.com/apache/pulsar-client-go/pull/823
* PR-1071-1: renamed pendingItem.Complete() to pendingItem.done() by @gunli in https://github.com/apache/pulsar-client-go/pull/1109
* PR-1071-2: added sendRequest.done() to release resource together by @gunli in https://github.com/apache/pulsar-client-go/pull/1110
* Refactor: factored out validateMsg by @tisonkun in https://github.com/apache/pulsar-client-go/pull/1117
* Refactor: factored out prepareTransaction by @tisonkun in https://github.com/apache/pulsar-client-go/pull/1118
* Completed comment on ProducerInterceptor interface BeforeSend method by @ojcm in https://github.com/apache/pulsar-client-go/pull/1119
* Refactor: prepared sendrequest and moved to internalSendAsync by @tisonkun in https://github.com/apache/pulsar-client-go/pull/1120
* Fix: normalized all send request resource release into sr.done by @tisonkun in https://github.com/apache/pulsar-client-go/pull/1121
* Improvement: added func blockIfQueueFull() to encapsulate DisableBlockIfQue… by @gunli in https://github.com/apache/pulsar-client-go/pull/1122
* Improved debug log clarity in ReceivedSendReceipt() by @gunli in https://github.com/apache/pulsar-client-go/pull/1123
* Fixed issue 1098 by checking batchBuilder in case batch is disabled by @zzzming in https://github.com/apache/pulsar-client-go/pull/1099
* Fixed Producer by fixing reconnection backoff logic by @gunli in https://github.com/apache/pulsar-client-go/pull/1125
* Added 0.11.1 change log by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1092
* Fixed dead link to the KEYS file in the release process by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1127
* Improved performance by pooling sendRequest by @gunli in https://github.com/apache/pulsar-client-go/pull/1126
* Fixed argument order to Errorf in TableView message handling by @ojcm in https://github.com/apache/pulsar-client-go/pull/1130
* Fixed Producer by double-checking before reconnect by @gunli in https://github.com/apache/pulsar-client-go/pull/1131
* Fixed issue where client must not retry connecting to broker when topic is terminated by @pkumar-singh in https://github.com/apache/pulsar-client-go/pull/1128
* Issue 1132: Fixed JSONSchema unmarshalling in TableView by @ojcm in https://github.com/apache/pulsar-client-go/pull/1133
* Improved by setting dlq producerName by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1137
* Fixed channel deadlock in regexp consumer by @goncalo-rodrigues in https://github.com/apache/pulsar-client-go/pull/1141
* Fixed Producer: handled TopicNotFound/TopicTerminated/ProducerBlockedQuotaExceededException/ProducerFenced when reconnecting by @gunli in https://github.com/apache/pulsar-client-go/pull/1134
* Transaction: Avoided a panic when using transaction by @Gilthoniel in https://github.com/apache/pulsar-client-go/pull/1144
* Improved by updating connection.lastDataReceivedTime when connection is ready by @gunli in https://github.com/apache/pulsar-client-go/pull/1145
* Improved Producer by normalizing and exporting the errors by @gunli in https://github.com/apache/pulsar-client-go/pull/1143
* Updated Unsubscribe() interface comment by @geniusjoe in https://github.com/apache/pulsar-client-go/pull/1146
* Issue 1105: Fixed AutoTopicCreation for type non-partitioned by @tomjo in https://github.com/apache/pulsar-client-go/pull/1107
* Added test for admin topic creation by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1152
* Implemented GetTopicAutoCreation by @jiangpengcheng in https://github.com/apache/pulsar-client-go/pull/1151
* Bumped github.com/dvsekhvalnov/jose2go from 1.5.0 to 1.6.0 by @dependabot in https://github.com/apache/pulsar-client-go/pull/1150
* Bump golang.org/x/net from 0.0.0-20220225172249-27dd8689420f to 0.17.0 by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/1155
* Fix DLQ producer name conflicts when multiples consumers send messages to DLQ by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1156

## New Contributors
* @jffp113 made their first contribution in https://github.com/apache/pulsar-client-go/pull/1062
* @tuteng made their first contribution in https://github.com/apache/pulsar-client-go/pull/1089
* @zccold made their first contribution in https://github.com/apache/pulsar-client-go/pull/1084
* @ojcm made their first contribution in https://github.com/apache/pulsar-client-go/pull/1119
* @pkumar-singh made their first contribution in https://github.com/apache/pulsar-client-go/pull/1128
* @goncalo-rodrigues made their first contribution in https://github.com/apache/pulsar-client-go/pull/1141
* @Gilthoniel made their first contribution in https://github.com/apache/pulsar-client-go/pull/1144
* @geniusjoe made their first contribution in https://github.com/apache/pulsar-client-go/pull/1146
* @tomjo made their first contribution in https://github.com/apache/pulsar-client-go/pull/1107
* @jiangpengcheng made their first contribution in https://github.com/apache/pulsar-client-go/pull/1151
* @dependabot made their first contribution in https://github.com/apache/pulsar-client-go/pull/1150