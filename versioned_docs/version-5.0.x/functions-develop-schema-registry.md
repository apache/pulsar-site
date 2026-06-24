---
id: functions-develop-schema-registry
title: Use schema registry
sidebar_label: "Use schema registry"
description: Learn to develop functions using schema registry in Pulsar.
---

Pulsar has a built-in [schema registry](schema-overview.md) and is bundled with popular [schema types](schema-understand.md#schema-type). Pulsar Functions can leverage the existing schema information from input topics and derive the input type. The schema registry applies to output topics as well.

The following table outlines the supportability of schema types in Pulsar Functions.

| Schema Type    | Java Function | Python Function | Go Function |
|----------------|---------------|-----------------|-------------|
| String         | ✅             | ✅               |             |
| Avro           | ✅             | ✅               |             |
| JSON           | ✅             | ✅               |             |
| Protobuf       | ✅             |                 |             |
| ProtobufNative | ✅             |                 |             |
| Key/Value      | ✅             |                 |             |
| AUTO_PRODUCE   | ✅             |                 |             |
| AUTO_CONSUME   | ✅             |                 |             |

For more code examples, see [Java Functions](https://github.com/apache/pulsar/blob/master/pulsar-functions/java-examples/src/main/java/org/apache/pulsar/functions/api/examples/AutoSchemaFunction.java) and [Python Functions]( https://github.com/apache/pulsar/blob/master/pulsar-functions/python-examples/).