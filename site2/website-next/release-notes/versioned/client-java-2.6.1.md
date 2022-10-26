---
id: client-java-2.6.1
title: Client Java 2.6.1 
sidebar_label: Client Java 2.6.1 
---

- [Java Client] Fix the issue that the HTTP header used in Athenz authentication can not be renamed [#7311](https://github.com/apache/pulsar/pull/7311)
- [Java Client] Add more detail information of retry errors [#7341](https://github.com/apache/pulsar/pull/7341)
- [Java Client] Check NPE when a tombstone (null value) is produced. [#7408](https://github.com/apache/pulsar/pull/7408)
- [Java Client] Fix batch ackset recycled multiple times. [#7409](https://github.com/apache/pulsar/pull/7409)
- [Java Client] Support Oauth2 authentication [#7420](https://github.com/apache/pulsar/pull/7420)
- [Java Client] Ensure the create subscription can be completed when the operation timeout happens [#7522](https://github.com/apache/pulsar/pull/7522)
- [Java Client] Fix race condition on the close consumer while reconnecting to the broker. [#7589](https://github.com/apache/pulsar/pull/7589)
- [Java Client] Fix validation never return false [#7593](https://github.com/apache/pulsar/pull/7593)
- [Java Client] Make OAuth2 auth plugin to use AsyncHttpClient [#7615](https://github.com/apache/pulsar/pull/7615)
- [Java Client] Support to set listener name for client CLI [#7621](https://github.com/apache/pulsar/pull/7621)
- [Java Client] Fix batch index filter issue in Consumer [#7654](https://github.com/apache/pulsar/pull/7654)
- [Java Client] Fix the backward compatibility issues with batch index acknowledgment. [#7655](https://github.com/apache/pulsar/pull/7655)
- [Java Client] Fix the issue that batchReceiveAsync is not completed exceptionally when closing consumer [#7661](https://github.com/apache/pulsar/pull/7661)
- [Java Client] Fix producer stats recorder time unit error [#7670](https://github.com/apache/pulsar/pull/7670)
- [Java Client] Fix shutdown AsyncHttpConnector.delayer [#7687](https://github.com/apache/pulsar/pull/7687)
