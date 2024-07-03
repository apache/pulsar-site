---
id: client-cpp-3.2.0
title: Client CPP 3.2.0
sidebar_label: Client CPP 3.2.0
---

## What's Changed
* Fix segmentation fault during the destruction of ConsumerImpl by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/121
* [improve] Exclude debug artifact in the release and tar the windows artifacts by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/124
* [fix] Fix NamedEntity::checkName regression by @erobot in https://github.com/apache/pulsar-client-cpp/pull/127
* [fix] Fix PartitionedProducerImpl::closeAsync to close sub-producers properly by @erobot in https://github.com/apache/pulsar-client-cpp/pull/125
* [fix] Fix acknowledge MessageId list does not work when ackGroupingTimeMs is 0 by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/128
* Fix the broken master by the upgrade of GTest by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/133
* [fix] Close broker producer created after producer close by @erobot in https://github.com/apache/pulsar-client-cpp/pull/131
* [fix] Fix a crash when closing a connection while connecting by @erobot in https://github.com/apache/pulsar-client-cpp/pull/136
* Boost optional by @fregate in https://github.com/apache/pulsar-client-cpp/pull/138
* Add BatchedMessageIdImpl to acknowledge batched messages by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/132
* Bumped version to 3.2.0-pre by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/141
* [fix] Use sudo when executing `apt-get install` by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/143
* [fix][doc] CMake is added to the Homebrew Mac Installation list by @erichare in https://github.com/apache/pulsar-client-cpp/pull/145
* [fix] Use authoritative argument correctly in BinaryProtoLookupService::findBroker by @erobot in https://github.com/apache/pulsar-client-cpp/pull/146
* [feat] PIP 107: Introduce chunk message ID by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/148
* [fix] Fix `auxv` detection by @AtkinsChang in https://github.com/apache/pulsar-client-cpp/pull/152
* [fix][build] Hide non-exported symbols from the dependencies by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/155
* Format .c suffix file. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/159
* [fix] Fix MessageId serialization when it's a batched message by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/153
* [fix] Fix log for connection disconnected expectedly by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/156
* The C API supports setting the log level. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/158
* [feat] Add pulsar_logger_t as the configurable C logger by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/162
* [feat] Support messages with generic types by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/149
* Fix segfault caused by socket I/O on a closed io_service by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/168
* [fix] Fix missing schema related function definitions by @romainbrancourt in https://github.com/apache/pulsar-client-cpp/pull/171
* [feat] Support batch index acknowledgment by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/151
* [fix] Fix hostname verification by @izumo27 in https://github.com/apache/pulsar-client-cpp/pull/126
* Fix broken main branch caused by wrong getBitSet method by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/177
* [feat] Reader support readeNextAsync interface. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/176
* [feat] Support Dead Letter Topic. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/139
* [feat] Support auto download schema when create producer. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/157
* Fix Wireshark build by @Demogorgon314 in https://github.com/apache/pulsar-client-cpp/pull/182
* Support the Wireshark plugin for more Wireshark distributions by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/183
* [feat] Support partitioned topic reader. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/154
* [fix] Avoid resource leakage of AckGroupingTracker by @erobot in https://github.com/apache/pulsar-client-cpp/pull/185
* [fix] Use ClientConfiguration::getTlsTrustCertsFilePath for the OAuth2 flow by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/190
* [fix] Fix deadlock when closing the partitioned producer by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/187
* [Fix] NegativeAcksTracker need close when consumer closed. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/188
* [TableView-1] Add table view API by @shibd in https://github.com/apache/pulsar-client-cpp/pull/189
* [improve] Add configuration to limit times of client's lookup redirection. by @tongsucn in https://github.com/apache/pulsar-client-cpp/pull/129
* Fix broken main branch that failed to build the wireshark dissector on macOS by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/199
* [feat] Add producer interceptor by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/169
* [refactor] Handle responses in methods instead of switch cases by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/197
* [fix] Redeliver messages that can't be decrypted. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/160
* [improve] Refactor client version format by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/206
* [fix] Handle exceptions when creating timers when fd limit is reached by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/203
* [TableView-2] Implement all interfaces. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/196
* Fix Client::close might hang forever for a multi-topics consumer by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/211
* Fix testPublishEmptyValue flaky test. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/216
* Fix flaky testAcknowledgeCumulativeWithPartition  by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/214
* Fix event loop thread might exit unexpectedly by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/217
* Use shared_ptr for topic name in message ids by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/218
* [feat] Add consumer interceptor  by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/210
* Make stats timers thread safe to use by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/223
* Fix TableViewTest.testCreateTableView flaky test. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/222
* [feat] Support ExclusiveWithFencing producer access mode. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/201
* Fix possible crash caused by MessageId::getTopicName by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/225
* [feat] Add `onNegativeAcksSend` to the consumer interceptor by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/220
* [fix] Use unique topic name in ConsumerInterceptorsTest by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/231
* Fix flaky test ProducerTest.testWaitForExclusiveProducer by @shibd in https://github.com/apache/pulsar-client-cpp/pull/233
* Support waiting for the ACK response by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/232
* [fix][flaky] Remove zero queue case in ConsumerInterceptorTest to reduce flaky by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/239
* Fix ack non-persistent topic will be blocked. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/240
* [feat] Support pattern subscribe non-persistent topic. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/207
* [fix] Consumer batch receive will cause data loss. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/228
* Fix typo in comment by @izumo27 in https://github.com/apache/pulsar-client-cpp/pull/243
* [feat] Support set producer access mode for C client. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/245
* [fix] Fix compilation error that occurs when USE_LOG4CXX is ON by @massakam in https://github.com/apache/pulsar-client-cpp/pull/244
* Speed up the process to start standalone for tests by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/236
* [feat] Support set batch index ack for C client. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/246
* [cleanup] Remove useless variable `interceptors_` in `ProducerImplBase` by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/250
* Fix the static library might failed to link on Windows by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/251
* [feat] Support set consumer regex subscription mode for C client. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/247
* Support the base64 encoded credentials for OAuth2 authentication by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/249
* [C API] Support synchronous consumer batch receive by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/252
* PIP-254: Support configuring client version with a description suffix by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/253
* Complete batch receive other feature of C client  by @shibd in https://github.com/apache/pulsar-client-cpp/pull/254
* [Bug Fix][KeySharedPolicy] Fixed bug where KeySharedPolicy::setStickyRanges duplicated ranges. by @hyperevo in https://github.com/apache/pulsar-client-cpp/pull/242
* Improve the C APIs for batch receive policy and fix the wrong documents by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/256
* [feat] Support dead letter topic for C client. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/237
* Fix broken debian package build process by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/258
* Support get the SchemaInfo from a topic and the schema version by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/257
* Fix broken debian package build process by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/258
* [feat] Support end-to-end encryption in C Reader API by @rbarbey in https://github.com/apache/pulsar-client-cpp/pull/262
* [doc] Fix compile perf on MacOS and Ubuntu. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/263
* [Doc] Add links to client docs and feature matrix in README.md by @momo-jun in https://github.com/apache/pulsar-client-cpp/pull/264
* Fix deadlock for negative acknowledgment by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/266

## New Contributors
* @erobot made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/127
* @erichare made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/145
* @AtkinsChang made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/152
* @romainbrancourt made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/171
* @izumo27 made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/126
* @tongsucn made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/129
* @massakam made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/244
* @hyperevo made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/242

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v3.1.0...v3.2.0
