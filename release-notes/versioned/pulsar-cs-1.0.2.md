---
id: pulsar-cs-1.0.2
title: Pulsar DotPulsar
sidebar_label: Pulsar DotPulsar
---
 

## Fixed

- Closing a consumer or reader while the broker is streaming messages could take down the connection causing other consumers, readers, and producers of the connection to reconnect
- In some circumstances, the protocol bytes could be misread leading to wrong message parsing


