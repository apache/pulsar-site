---
id: pulsar-client-go-0.13.1
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

- [fix] Avoid a data race when flushing with load by Gaylor Bosson in [#1261](https://github.com/apache/pulsar-client-go/pull/1261)
- [fix] Prevent panic when calling Flush on closed producer by Gaylor Bosson in [#1260](https://github.com/apache/pulsar-client-go/pull/1260)
- [fix] Producer close was blocked by Zixuan Liu in [#1249](https://github.com/apache/pulsar-client-go/pull/1249)
- [ci] Validate multiple version builds and use golangci-lint-action by Zixuan Liu in [#1250](https://github.com/apache/pulsar-client-go/pull/1250)
- [fix] Fix pulsar admin revoke subscription permission endpoint by 码斯克 in [#1251](https://github.com/apache/pulsar-client-go/pull/1251)
- [fix] failTimeoutMessages cannot delete outdated messages by Zixuan Liu in [#1247](https://github.com/apache/pulsar-client-go/pull/1247)
- [fix] Oauth2 Client credentials flow use scopes from the keyfile as well by Nikolaj Lund Sørensen in [#1244](https://github.com/apache/pulsar-client-go/pull/1244)
- [fix] Fix the key-based batch can't guarantee the ordering when flushing by Zike Yang in [#1252](https://github.com/apache/pulsar-client-go/pull/1252)