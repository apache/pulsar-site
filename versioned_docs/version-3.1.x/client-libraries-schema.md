---
id: client-libraries-schema
title: Work with schema
sidebar_label: "Work with schema"
---


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