---
id: pulsar-client-go-0.8.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## What's Changed
* Update release docs with missing information by @cckellogg in https://github.com/apache/pulsar-client-go/pull/656
* Update change log for 0.7.0 release by @cckellogg in https://github.com/apache/pulsar-client-go/pull/655
* Update version to 0.7.0 by @cckellogg in https://github.com/apache/pulsar-client-go/pull/654
* fix issue 650,different handle sequence value by @baomingyu in https://github.com/apache/pulsar-client-go/pull/651
* Support nack backoff policy for SDK by @wolfstudy in https://github.com/apache/pulsar-client-go/pull/660
* Remove unused dependency in `oauth2` module by @reugn in https://github.com/apache/pulsar-client-go/pull/661
* [Issue 662] Fix race in connection.go waitUntilReady() by @bschofield in https://github.com/apache/pulsar-client-go/pull/663
* Update dependencies by @reugn in https://github.com/apache/pulsar-client-go/pull/665
* [Issue 652] Quick fixes to the documentation for the main building blocks of the library by @reugn in https://github.com/apache/pulsar-client-go/pull/667
* Add subscription properties for ConsumerOptions by @wolfstudy in https://github.com/apache/pulsar-client-go/pull/671
* Add new bug-resistant build constraints by @reugn in https://github.com/apache/pulsar-client-go/pull/670
* Handle the parameters parsing error in NewProvider by @reugn in https://github.com/apache/pulsar-client-go/pull/673
* Update email template of release docs by @izumo27 in https://github.com/apache/pulsar-client-go/pull/674
* Add properties filed for batch container by @wolfstudy in https://github.com/apache/pulsar-client-go/pull/683
* [Issue 513] Correct apparent logic error in batchContainer's hasSpace() method by @bschofield in https://github.com/apache/pulsar-client-go/pull/678
* Upgrade DataDog/zstd to v1.5.0 by @dferstay in https://github.com/apache/pulsar-client-go/pull/690
* fix:add order key to message by @leizhiyuan in https://github.com/apache/pulsar-client-go/pull/688
* Set default go version to 1.13 in CI related files by @reugn in https://github.com/apache/pulsar-client-go/pull/692
* [Partition Consumer] Provide lock-free access to compression providers by @dferstay in https://github.com/apache/pulsar-client-go/pull/689
* Use a separate gorutine to handle the logic of reconnect by @wolfstudy in https://github.com/apache/pulsar-client-go/pull/691
* [DefaultRouter] add a parallel bench test by @dferstay in https://github.com/apache/pulsar-client-go/pull/693
* Revert "Use a separate gorutine to handle the logic of reconnect" by @wolfstudy in https://github.com/apache/pulsar-client-go/pull/700
* Fix data race while accessing connection in partitionProducer by @wolfstudy in https://github.com/apache/pulsar-client-go/pull/701
* Fix stuck when reconnect broker by @wolfstudy in https://github.com/apache/pulsar-client-go/pull/703
* Fix slice bounds out of range for readSingleMessage by @wolfstudy in https://github.com/apache/pulsar-client-go/pull/709
* Encryption failure test case fix by @GPrabhudas in https://github.com/apache/pulsar-client-go/pull/708
* [DefaultRouter] fix unnecessary system clock reads due to races accessing router state by @dferstay in https://github.com/apache/pulsar-client-go/pull/694
* Fix negative WaitGroup counter issue by @wolfstudy in https://github.com/apache/pulsar-client-go/pull/712
* [issue 675] oauth2 use golang-jwt address CVE-2020-26160 by @zzzming in https://github.com/apache/pulsar-client-go/pull/713
* readme: add note about how to build and test by @pgier in https://github.com/apache/pulsar-client-go/pull/714
* Bump oauth2 package version to the latest in master by @iorvd in https://github.com/apache/pulsar-client-go/pull/715
* Fix closed connection leak by @billowqiu in https://github.com/apache/pulsar-client-go/pull/716
* [Bugfix] producer runEventsLoop for reconnect early exit by @billowqiu in https://github.com/apache/pulsar-client-go/pull/721
* [issue 679][oauth2] Fix macos compiler warnings by @pgier in https://github.com/apache/pulsar-client-go/pull/719
* [optimize] Stop batchFlushTicker when Disable batching by @Shoothzj in https://github.com/apache/pulsar-client-go/pull/720
* Markdown error fix by @Shoothzj in https://github.com/apache/pulsar-client-go/pull/722

## New Contributors
* @bschofield made their first contribution in https://github.com/apache/pulsar-client-go/pull/663
* @izumo27 made their first contribution in https://github.com/apache/pulsar-client-go/pull/674
* @pgier made their first contribution in https://github.com/apache/pulsar-client-go/pull/714
* @iorvd made their first contribution in https://github.com/apache/pulsar-client-go/pull/715
* @billowqiu made their first contribution in https://github.com/apache/pulsar-client-go/pull/716

**Full Changelog**: https://github.com/apache/pulsar-client-go/compare/v0.7.0...v0.8.0-candidate-1