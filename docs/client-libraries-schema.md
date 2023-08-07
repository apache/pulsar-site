---
id: client-libraries-schema
title: Work with schema
sidebar_label: "Work with schema"
---
````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

## Get started with schema

For an overview of Pulsar schema and language-specific code examples, see [Schema - Overview](schema-overview.md) and [Schema - Get Started](schema-get-started.md).


## Work with Python schema

Working with Python schema has slight differences from using other languages. This section introduces the specific reference and examples for using Python clients to work with schema.

### Supported schema types

You can use different built-in schema types in Pulsar. All the definitions are in the `pulsar.schema` package.

| Schema | Notes |
| ------ | ----- |
| `BytesSchema` | Get the raw payload as a `bytes` object. No serialization/deserialization are performed. This is the default schema mode |
| `StringSchema` | Encode/decode payload as a UTF-8 string. Uses `str` objects |
| `JsonSchema` | Require record definition. Serializes the record into standard JSON payload |
| `AvroSchema` | Require record definition. Serializes in AVRO format |

### Schema definition reference

The schema definition is done through a class that inherits from `pulsar.schema.Record`.

This class has a number of fields that can be of either `pulsar.schema.Field` type or another nested `Record`. All the fields are specified in the `pulsar.schema` package. The fields are matching the AVRO field types.

| Field Type | Python Type | Notes |
| ---------- | ----------- | ----- |
| `Boolean`  | `bool`      |       |
| `Integer`  | `int`       |       |
| `Long`     | `int`       |       |
| `Float`    | `float`     |       |
| `Double`   | `float`     |       |
| `Bytes`    | `bytes`     |       |
| `String`   | `str`       |       |
| `Array`    | `list`      | Need to specify record type for items. |
| `Map`      | `dict`      | Key is always `String`. Need to specify value type. |

Additionally, any Python `Enum` type can be used as a valid field type.

#### Fields parameters

When adding a field, you can use these parameters in the constructor.

| Argument   | Default | Notes |
| ---------- | --------| ----- |
| `default`  | `None`  | Set a default value for the field, such as `a = Integer(default=5)`. |
| `required` | `False` | Mark the field as "required". It is set in the schema accordingly. |

#### Schema definition examples

##### Simple definition

```python
class Example(Record):
    a = String()
    b = Integer()
    c = Array(String())
    i = Map(String())
```

##### Using enums

```python
from enum import Enum

class Color(Enum):
    red = 1
    green = 2
    blue = 3

class Example(Record):
    name = String()
    color = Color
```

##### Complex types

```python
class MySubRecord(Record):
    x = Integer()
    y = Long()
    z = String()

class Example(Record):
    a = String()
    sub = MySubRecord()
```

##### Set namespace for Avro schema

Set the namespace for the Avro Record schema using the special field `_avro_namespace`.

```python
class NamespaceDemo(Record):
   _avro_namespace = 'xxx.xxx.xxx'
   x = String()
   y = Integer()
```

The schema definition is like this.

```json
{
  "name": "NamespaceDemo", "namespace": "xxx.xxx.xxx", "type": "record", "fields": [
    {"name": "x", "type": ["null", "string"]},
    {"name": "y", "type": ["null", "int"]}
  ]
}
```

### Declare and validate schema

Before the producer is created, the Pulsar broker validates that the existing topic schema is the correct type and that the format is compatible with the schema definition of a class. If the format of the topic schema is incompatible with the schema definition, an exception occurs in the producer creation.

Once a producer is created with a certain schema definition, it only accepts objects that are instances of the declared schema class.

Similarly, for a consumer or reader, the consumer returns an object (which is an instance of the schema record class) rather than raw bytes.

**Example**

```python
consumer = client.subscribe(
                  topic='my-topic',
                  subscription_name='my-subscription',
                  schema=AvroSchema(Example) )

while True:
    msg = consumer.receive()
    ex = msg.value()
    try:
        print("Received message a={} b={} c={}".format(ex.a, ex.b, ex.c))
        # Acknowledge successful processing of the message
        consumer.acknowledge(msg)
    except Exception:
        # Message failed to be processed
        consumer.negative_acknowledge(msg)
```

## Work with the Go schema
Working with Go schema has slight differences from Java schema.
This part will introduce the schema compatibility between Go client and Java client.

### Avro/JSON Schema
AVRO and JSON schema in Go and Java are compatible, but there are some differences in how the schemas are defined.
````mdx-code-block
<Tabs
  defaultValue="AVRO"
  values={[{"label":"AVRO","value":"AVRO"},{"label":"JSON","value":"JSON"}]}>

<TabItem value="AVRO">
Go typically uses schema definitions, a string JSON, to create schemas. However, Java often uses class types for schema creation. As a result, Java allows non-primitive fields to be nullable by default, while in Go's schema definition, the nullability of fields needs to be explicitly stated.

```go
// Compatible with defining a schema in Java
exampleSchemaDefCompatible := NewAvroSchema(`{"fields":
    [
        {"name":"id","type":"int"},{"default":null,"name":"name","type":["null","string"]}
    ],
    "name":"MyAvro","namespace":"schemaNotFoundTestCase","type":"record"}`, nil)
// Not compatible with defining a schema in Java
exampleSchemaDefIncompatible := NewAvroSchema(`{"fields":
    [
        {"name":"id","type":"int"},{"default":null,"name":"name","type":["string"]}
    ],
    "name":"MyAvro","namespace":"schemaNotFoundTestCase","type":"record"}`, nil)
Producer := NewAvroSchema(exampleSchemaDef, nil)

```
```java
@AllArgsConstructor
@NoArgsConstructor
public static class Example {
    public String name;
    public int id;
}

Producer<Example> producer = pulsarClient.newProducer(Schema.AVRO(Example.class))
                .topic(topic).create();
```
And another way to keep compatible is use schema definition to create schema in the JAVA client too.
```java
    SchemaDefinition<Example> schemaDefinition =
                     SchemaDefinition.builder().withPojo(Example.class).withAlwaysAllowNull(false).build();
    Schema schema = Schema.AVRO(schemaDefinition);

    Producer<Example> producer = pulsarClient.newProducer(schema)
                .topic(topic).create();
```
</TabItem>
<TabItem value="JSON">
Go typically uses schema definitions, a string JSON, to create schemas. However, Java often uses class types for schema creation. As a result, Java allows non-primitive fields to be nullable by default, while in Go's schema definition, the nullability of fields needs to be explicitly stated.

```go
// Compatible with defining a schema in Java
exampleSchemaDefCompatible := "{\"type\":\"record\",\"name\":\"Example\",\"namespace\":\"test\"," +
	"\"fields\":[{\"name\":\"ID\",\"type\":\"int\"},{\"name\":\"Name\",\"type\":[\"null\", \"string\"]}]}"

consumerJSCompatible := NewJSONSchema(exampleSchemaDefCompatible, nil)
// Not compatible with defining a schema in Java
exampleSchemaDefIncompatible := "{\"type\":\"record\",\"name\":\"Example\",\"namespace\":\"test\"," +
	"\"fields\":[{\"name\":\"ID\",\"type\":\"int\"},{\"name\":\"Name\",\"type\":\"string\"}]}"

consumerJSIncompatible := NewJSONSchema(exampleSchemaDefIncompatible, nil)
```

```java
@AllArgsConstructor
@NoArgsConstructor
public static class Example {
    public String name;
    public int id;
}

Producer<Example> producer = pulsarClient.newProducer(Schema.AVRO(Example.class))
                .topic(topic).create();
```

And another way to keep compatible is use schema definition to create schema in the JAVA client too.
```java
    SchemaDefinition<Example> schemaDefinition =
                     SchemaDefinition.builder().withPojo(Example.class).withAlwaysAllowNull(false).build();
    Schema schema = Schema.AVRO(schemaDefinition);

    Producer<Example> producer = pulsarClient.newProducer(schema)
                .topic(topic).create();
```

</TabItem>
</Tabs>
````

### Proto Schema
Proto and ProtoNative schemas exhibit some incompatibility between Go and Java clients. This is because Avro Proto currently does not provide full compatibility between Java and Go.

```proto
message TestMessage {
    string stringField = 1;
    int32 intField = 2;
}
```

Defining a schema in Java can be parsed by a class.
```json
protoSchemaDef = "{\"type\":\"record\",\"name\":\"TestMessage\",\"namespace\":\"org.apache.pulsar.client.api.schema.proto.Test\",\"fields\":[{\"name\":\"stringField\",\"type\":{\"type\":\"string\",\"avro.java.string\":\"String\"},\"default\":\"\"},{\"name\":\"intField\",\"type\":\"int\",\"default\":0}]}"

```

Defining a schema in Go needs to write manually.
```json
protoSchemaDef = "{\"type\":\"record\",\"name\":\"Example\",\"namespace\":\"test\"," +
		"\"fields\":[{\"name\":\"num\",\"type\":\"int\"},{\"name\":\"msf\",\"type\":\"string\"}]}"
```
To address the incompatibility between Proto and ProtoNative types, you can follow this approach:
1. In the Java client, parse the message using the Avro Proto library to obtain the schema definition.
2. Use this obtained schema definition in the Go client to ensure both clients use the same schema definition.
```json
protoSchemaDef = "{\"type\":\"record\",\"name\":\"TestMessage\",\"namespace\":\"org.apache.pulsar.client.api.schema.proto.Test\",\"fields\":[{\"name\":\"stringField\",\"type\":{\"type\":\"string\",\"avro.java.string\":\"String\"},\"default\":\"\"},{\"name\":\"intField\",\"type\":\"int\",\"default\":0}]}"

```
3. Modify the Go Proto Message by adding compatibility extensions. For example, add `[(avro_java_string) = "String"]` extension to string type fields.
```proto
message TestMessage {
    string stringField = 1 [(avro_java_string) = "String"];
    int32 intField = 2;
}
```

### ProtoNative Schema
Similar to the Proto schema, ProtoNative schemas are also incompatible between Java and Go clients. To address this, you can use a unified schema define and add `[(avro_java_string) = "String"]` extension to the Go client's Proto message.
