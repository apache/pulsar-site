## What's Changed
* Fix: client reconnected every authenticationRefreshCheckSeconds when using tls authentication by @jffp113 in https://github.com/apache/pulsar-client-cpp/pull/304
* Bumped version to 3.4.0-pre by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/305
* Avoid copying OpSendMsg when sending messages by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/308
* Avoid calling serializeSingleMessageInBatchWithPayload each time a message is added by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/309
* Avoid double attempt at reconnecting by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/310
* Fix the visibility compilation error for GCC &lt;= 7 by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/312
* [fix] Add the curl wrapper to avoid inconsistent curl options by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/313
* Fix broken cpp-build-windows workflow by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/316
* Fix broken wireshark build workflow on macOS by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/318
* Avoid accessing a null ClientConnection instance by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/317
* Fix the handler instance is expired when the connection is established by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/323
* Fix pending requests failed with ResultConnectError when disconnecting by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/322
* [fix] Fix consumer doesn't acknowledge all chunk message Ids by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/321
* Fix segmentation fault when sending messages after receiving an error by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/326
* Fix topic not shown correctly in the consumer string by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/329
* Delay the timing of setting reconnectionPending to false to avoid double attempt at reconnecting by @shustsud in https://github.com/apache/pulsar-client-cpp/pull/328
* Fix segmentation fault caused by async_receive by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/330
* Fix topic name is shown as a pointer rather than string by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/331
* Avoid blocking the message listener threads by @erobot in https://github.com/apache/pulsar-client-cpp/pull/332
* Upgrade libcurl to 8.4.0 to fix CVEs by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/335
* Fix possible deadlock of Future when adding a listener after completed by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/334
* Added support for multiple connections to each broker by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/336
* Fix ProducerBusy or ConsumerBusy error when configuring multiple brokers per connection by @BewareMyPower https://github.com/apache/pulsar-client-cpp/pull/337

## New Contributors
* @jffp113 made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/304

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v3.3.0...v3.4.0
