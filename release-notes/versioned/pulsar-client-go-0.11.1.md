---
id: pulsar-client-go-0.11.1
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

- Close consumer resources if the creation fails by @michaeljmarshall in [#1070](https://github.com/apache/pulsar-client-go/pull/1070)
- Fix the transaction acknowledgement and send logic for chunked message by @liangyepianzhou in [#1069](https://github.com/apache/pulsar-client-go/pull/1069)
- Correct the `SendAsync()` description by @Gleiphir2769 in [#1066](https://github.com/apache/pulsar-client-go/pull/1066)
- Fix the panic when try to flush in `DisableBatching=true` by @Gleiphir2769 in [#1065](https://github.com/apache/pulsar-client-go/pull/1065)
- Fix client reconnected every authenticationRefreshCheckSeconds when using tls authentication by @jffp113 in [#1062](https://github.com/apache/pulsar-client-go/pull/1062)
- Send Close Command on Producer/Consumer create timeout by @michaeljmarshall in [#1061](https://github.com/apache/pulsar-client-go/pull/1061)
- Fail all messages that are pending requests when closing by @graysonzeng in [#1059](https://github.com/apache/pulsar-client-go/pull/1059)
- Fix the producer flush opertion is not guarantee to flush all messages by @Gleiphir2769 in [#1058](https://github.com/apache/pulsar-client-go/pull/1058)
- Fix inaccurate producer mem limit in chunking and schema by @Gleiphir2769 in [#1055](https://github.com/apache/pulsar-client-go/pull/1055)
- Fix ctx in `partitionProducer.Send()` is not performing as expected by @Gleiphir2769 in [#1053](https://github.com/apache/pulsar-client-go/pull/1053)
- Stop block request even if Value and Payload are both set by @gunli in [#1052](https://github.com/apache/pulsar-client-go/pull/1052)
- Simplify the flush logic by @gunli in [#1049](https://github.com/apache/pulsar-client-go/pull/1049)
- Check if message is nil by @gunli in [#1047](https://github.com/apache/pulsar-client-go/pull/1047)
- Return when registerSendOrAckOp() failed by @gunli in [#1045](https://github.com/apache/pulsar-client-go/pull/1045)