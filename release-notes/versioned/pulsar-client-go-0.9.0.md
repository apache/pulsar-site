---
id: pulsar-client-go-0.9.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## What's Changed

- add 0.8.0 changelog for repo by @wolfstudy in
https://github.com/apache/pulsar-client-go/pull/727
- [Issue 729]stop ticker when create producer failed by @NaraLuwan in
https://github.com/apache/pulsar-client-go/pull/730
- Update version file to 0.8.0 by @wolfstudy in
https://github.com/apache/pulsar-client-go/pull/728
- [Issue 725][Dependencies] Upgrade beefsack/go-rate by @shubham1172 in
https://github.com/apache/pulsar-client-go/pull/735
- Upgrade klauspost/compress to v1.14.4 by @dferstay in
https://github.com/apache/pulsar-client-go/pull/740
- Upgrade prometheus client to 1.11.1 by @nicoloboschi in
https://github.com/apache/pulsar-client-go/pull/738
- add 0.8.1 changelog by @freeznet in https://github.com/apache/pulsar-
client-go/pull/742
- Temporarily point ci to pulsar 2.8.2 by @Shoothzj in
https://github.com/apache/pulsar-client-go/pull/747
- [build] make go version consistent by @Shoothzj in
https://github.com/apache/pulsar-client-go/pull/751
- Exposing broker metadata by @Shoothzj in https://github.com/apache/pulsar-
client-go/pull/745
- Add schema support to Reader by @ZiyaoWei in
https://github.com/apache/pulsar-client-go/pull/741
- allow config reader subscription name by @Shoothzj in
https://github.com/apache/pulsar-client-go/pull/754
- Cleanup topics after unit tests by @ZiyaoWei in
https://github.com/apache/pulsar-client-go/pull/755
- Add TableView support by @ZiyaoWei in https://github.com/apache/pulsar-
client-go/pull/743
- Fix ack timeout cause reconnect by @wolfstudy in
https://github.com/apache/pulsar-client-go/pull/756
- fix: add service not ready check by @nodece in
https://github.com/apache/pulsar-client-go/pull/757
- Dlq producer on topic with schema by @GPrabhudas in
https://github.com/apache/pulsar-client-go/pull/723
- fix annotation typo in consumer.go by @Shoothzj in
https://github.com/apache/pulsar-client-go/pull/758
- Fix producer unable register when cnx closed by @wolfstudy in
https://github.com/apache/pulsar-client-go/pull/761
- Add -c/--max-connections parameter to pulsar-perf-go and set it to 1 by default
by @lhotari in https://github.com/apache/pulsar-client-go/pull/765
- [Issue 763][producer] Fix deadlock in Producer Send when message fails to
encode. by @samuelhewitt in https://github.com/apache/pulsar-client-
go/pull/762
- [Issue 749]Fix panic caused by flushing current batch with an incorrect
internal function. by @shileiyu in https://github.com/apache/pulsar-client-
go/pull/750
- Add consumer state check when request commands by @wolfstudy in
https://github.com/apache/pulsar-client-go/pull/772
- Fix sequenceID is not equal to cause the connection to be closed
incorrectly by @wolfstudy in https://github.com/apache/pulsar-client-
go/pull/774
- Add error response for Ack func by @wolfstudy in
https://github.com/apache/pulsar-client-go/pull/775
- Revert "Fix stuck when reconnect broker (#703)" by @lhotari in
https://github.com/apache/pulsar-client-go/pull/767
- [Issue 718] Fix nil pointer dereference in TopicNameWithoutPartitionPart
by @hantmac in https://github.com/apache/pulsar-client-go/pull/734
- Support ack response for Go SDK by @wolfstudy in
https://github.com/apache/pulsar-client-go/pull/776
- [Issue 779]Fix ack request not set requestId when enable AckWithResponse
option by @liushengzhong0927 in https://github.com/apache/pulsar-client-
go/pull/780
- [issue 791] allow to add at least one message on batch builder by
@zzzming in https://github.com/apache/pulsar-client-go/pull/792
- schema creation and validation functions without panicing by @zzzming in
https://github.com/apache/pulsar-client-go/pull/794
- [github ci] add go 1.18 to the test matrix by @pgier in
https://github.com/apache/pulsar-client-go/pull/790
- Fix using closed connection in consumer by @hrsakai in
https://github.com/apache/pulsar-client-go/pull/785
- feat: add basic authentication by @nodece in
https://github.com/apache/pulsar-client-go/pull/778
- [Issue 781][add consumer seek by time on partitioned topic]  by
@GPrabhudas in https://github.com/apache/pulsar-client-go/pull/782
- [ci] update and simplify GitHub workflow by @pgier in
https://github.com/apache/pulsar-client-go/pull/796
- feat: support multiple schema version for producer and consumer by @oryx2
in https://github.com/apache/pulsar-client-go/pull/611
- [issue #752] replace go-rate rate limiter with a buffered channel
implementation by @zzzming in https://github.com/apache/pulsar-client-
go/pull/799
- [issue 814] consumer and producer reconnect failure metrics counter by
@zzzming in https://github.com/apache/pulsar-client-go/pull/815
- [cleanup] Fix to follow lint error (File is not  goimports -ed
(goimports)) by @equanz in https://github.com/apache/pulsar-client-go/pull/824
- [oauth2] Remove oauth2 go.mod and go.sum by @pgier in
https://github.com/apache/pulsar-client-go/pull/802
- [client] Rename  test_helper.go  to follow the test code naming
convention by @equanz in https://github.com/apache/pulsar-client-go/pull/822
- [security] Bump github.com/stretchr/testify to update gopkg.in/yaml.v3 by
@massakam in https://github.com/apache/pulsar-client-go/pull/813
- [client] Add MetricsRegisterer to ClientOptions by @pragkent in
https://github.com/apache/pulsar-client-go/pull/826
- NackBackoffPolicy.Next return time.Duration by @h-hy in
https://github.com/apache/pulsar-client-go/pull/825
- Add golang 1.19 in test matrix by @Shoothzj in
https://github.com/apache/pulsar-client-go/pull/832
- ci: add makefile by @pgier in https://github.com/apache/pulsar-client-
go/pull/800
- Make keepalive interval configurable by @nodece in
https://github.com/apache/pulsar-client-go/pull/838
- [issue #807] dlq topic producer options by @zzzming in
https://github.com/apache/pulsar-client-go/pull/809
- [log-format] remove redundant "[]" pair in the head and tail of log
content by @shenqianjin in https://github.com/apache/pulsar-client-go/pull/831
- Update proto file latest by @liangyuanpeng in
https://github.com/apache/pulsar-client-go/pull/841
- [bugfix] Fix wrong check eventime by default by @liangyuanpeng in
https://github.com/apache/pulsar-client-go/pull/843
- Fixs : NackBackoffPolicy.Next return time.Duration by @h-hy in
https://github.com/apache/pulsar-client-go/pull/834
- Introduce doneCh for ack error by @wolfstudy in
https://github.com/apache/pulsar-client-go/pull/777
- Parameterize the reconnection option by @wolfstudy in
https://github.com/apache/pulsar-client-go/pull/853
- add 0.9.0 release changelog by @freeznet in
https://github.com/apache/pulsar-client-go/pull/804
- Embed Go SDK version to 0.9.0 by @wolfstudy in
https://github.com/apache/pulsar-client-go/pull/854

## New Contributors

- @NaraLuwan made their first contribution in
https://github.com/apache/pulsar-client-go/pull/730
- @shubham1172 made their first contribution in
https://github.com/apache/pulsar-client-go/pull/735
- @nicoloboschi made their first contribution in
https://github.com/apache/pulsar-client-go/pull/738
- @ZiyaoWei made their first contribution in
https://github.com/apache/pulsar-client-go/pull/741
- @lhotari made their first contribution in
https://github.com/apache/pulsar-client-go/pull/765
- @samuelhewitt made their first contribution in
https://github.com/apache/pulsar-client-go/pull/762
- @shileiyu made their first contribution in
https://github.com/apache/pulsar-client-go/pull/750
- @hantmac made their first contribution in
https://github.com/apache/pulsar-client-go/pull/734
- @liushengzhong0927 made their first contribution in
https://github.com/apache/pulsar-client-go/pull/780
- @oryx2 made their first contribution in https://github.com/apache/pulsar-
client-go/pull/611
- @massakam made their first contribution in
https://github.com/apache/pulsar-client-go/pull/813
- @pragkent made their first contribution in
https://github.com/apache/pulsar-client-go/pull/826
- @h-hy made their first contribution in https://github.com/apache/pulsar-
client-go/pull/825
- @shenqianjin made their first contribution in
  https://github.com/apache/pulsar-client-go/pull/831

Full Changelog: https://github.com/apache/pulsar-client-go/compare/v0.8.0...v0.9.0
