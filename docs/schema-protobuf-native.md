---
id: schema-protobuf-native
title: Protobuf native schema compatibility
sidebar_label: "Protobuf native compatibility"
---

Pulsar offers two compatibility checkers for `PROTOBUF_NATIVE` schemas. The default checker compares the resolved root message name. The advanced checker compares Protobuf descriptors and checks whether a reader can safely read messages written with another schema.

:::note Version availability

On the Pulsar 5.0 release line, the advanced checker requires 5.0.1 or later. It is not available in 5.0.0 or 4.x.

:::

## Choose a checker

| Checker | Behavior |
| --- | --- |
| `ProtobufNativeSchemaCompatibilityCheck` (default) | Requires the same root message name. It does not validate field-level evolution. |
| `ProtobufNativeSchemaAdvancedCompatibilityCheck` (opt-in) | Requires the same root message name and applies directional checks to fields, defaults, maps, oneofs, enums, and supported Protobuf features. |

The advanced checker applies to native schemas used directly or as the key or value of a `KEY_VALUE` schema, with either INLINE or SEPARATED encoding. It does not change the legacy `PROTOBUF` schema type.

Checker selection and the [schema compatibility strategy](admin-api-schemas.md#manage-schema-compatibility-strategy) are separate settings. The checker determines the rules; the strategy determines the comparison direction and historical versions. Selecting the advanced checker does not enable evolution for a topic using `ALWAYS_INCOMPATIBLE`.

## Enable the advanced checker

1. Upgrade all brokers that can own the affected topics to a version containing the advanced checker before enabling it.
2. In staging, exercise representative retained schemas, producer registrations, and consumer reconnections with the intended strategy. Include historical versions and large or recursive schemas, not just the latest schema. Enabling the checker does not scan or rewrite existing history.
3. In `conf/broker.conf` (or `conf/standalone.conf`), replace the following entry in `schemaRegistryCompatibilityCheckers`:

   ```text
   org.apache.pulsar.broker.service.schema.ProtobufNativeSchemaCompatibilityCheck
   ```

   with:

   ```text
   org.apache.pulsar.broker.service.schema.ProtobufNativeSchemaAdvancedCompatibilityCheck
   ```

   For the standard checker list, the complete setting is:

   ```properties
   schemaRegistryCompatibilityCheckers=org.apache.pulsar.broker.service.schema.JsonSchemaCompatibilityCheck,org.apache.pulsar.broker.service.schema.AvroSchemaCompatibilityCheck,org.apache.pulsar.broker.service.schema.ProtobufNativeSchemaAdvancedCompatibilityCheck,org.apache.pulsar.broker.service.schema.ExternalSchemaCompatibilityCheck
   ```

   Preserve any deployment-specific checker entries for other schema types. Configure exactly one checker for `PROTOBUF_NATIVE`; do not add the advanced checker alongside the default or a custom native checker.

4. Apply the same selection to every broker that can own the topics and coordinate broker restarts. The setting is not dynamic. Avoid topic ownership moving between brokers using different checkers during activation.

:::warning Consumer reconnections

Broker restarts disconnect clients. Schema-bearing consumers other than `AUTO_CONSUME` are checked again on reconnection. An unchanged consumer schema can be rejected if another selected historical version is incompatible or contains unsupported features. Review the [consumer checks](#strategies-and-consumer-checks) before activation.

:::

A configured checker class that cannot be instantiated causes broker startup to fail, even when the advanced checker is not selected. With the advanced checker selected, startup also fails if multiple native checkers are configured, schema storage is unavailable, or schema registry initialization fails. Check the class names and the [broker configuration reference](/reference/#/@pulsar:version_reference@/config/reference-configuration-broker?id=schemaregistrycompatibilitycheckers) when troubleshooting startup.

For geo-replicated topics, validate schemas against each destination cluster's retained history and compatibility policy. Coordinate checker selection and rollout across those clusters; a successful local registration does not establish compatibility at a destination.

## Supported schemas

The advanced checker supports `proto2`, `proto3`, and Editions 2023 and 2024. It follows reachable message and enum references from the declared root, including nested roots, imported types, maps, and recursive messages. For a non-identical pair, both reachable graphs must be supported, including fields without a counterpart in the other schema.

The following constructs produce `UNSUPPORTED_FEATURE` when a comparison is required:

- Reachable messages with extension ranges or MessageSet encoding.
- Editions other than 2023 or 2024, and unknown feature fields or values, including Java feature options.
- Enum fields whose Java legacy closed-enum behavior differs from the enum's declared openness.

The checker treats `google.protobuf.Any` as its declared wrapper fields. It does not inspect embedded messages or application data stored in `bytes` or `string`, or infer application rules from custom options.

## Compatibility rules

Rules apply to a writer/reader pair. Fields are matched by number within their containing messages. Whether a proposed change passes depends on the directions required by the strategy.

| Change | Result for the compared direction |
| --- | --- |
| Add or remove a field | Allowed if every required reader field is guaranteed by the writer and the other rules pass. A new optional reader field does not need an explicit default. |
| Rename a field while keeping its number | Allowed if the other rules pass. Keeping a name but changing its number is rejected. |
| Change a scalar type, such as `int32` to `int64` or `string` to `bytes` | Rejected, even when the types share a wire encoding. |
| Change between singular and repeated, or between scalar, enum, and message fields | Rejected. |
| Change between packed and unpacked encoding for the same repeated scalar type | Allowed. |
| Change the effective default of a matched singular scalar or enum field | Rejected. This includes changing the first value of a proto2 enum when it supplies an implicit default. |
| Combine independently writable fields into one reader `oneof` | Rejected because the reader could discard a value. A synthetic `oneof` for proto3 `optional` does not create this restriction. |
| Change a map's key type, or change a map into a repeated entry message | Rejected. Map values follow the scalar, enum, or message rules. |
| Add UTF-8 validation that the writer does not guarantee | Rejected. Removing that requirement does not itself reject the direction. |

For enum fields, existing value names must keep their numbers. A closed reader enum must represent every number the writer can emit; an open writer enum cannot be read by a closed reader enum. Renaming referenced message or enum types is allowed when their contents remain compatible, but the root message's full name must stay the same.

For example, adding `optional string note = 2` to a proto2 message can pass `BACKWARD`. Changing an existing `int32 id = 1` to `int64 id = 1` is rejected. These conservative rules avoid relying on application-specific value ranges or deployment order.

## Strategies and consumer checks

For schema registration, `BACKWARD` checks whether the proposed schema can read data written with the existing schema. `FORWARD` checks the reverse, and `FULL` checks both directions. The transitive variants repeat the required checks for every historical version selected by the registry.

Consumer checks use the registry's existing strategy mapping:

| Configured strategy | Consumer check |
| --- | --- |
| `BACKWARD`, `FORWARD`, `FULL`, `FORWARD_TRANSITIVE` | The consumer schema must read the latest active schema. |
| `BACKWARD_TRANSITIVE` | The consumer schema must read every selected historical schema. |
| `FULL_TRANSITIVE` | Both directions must pass against every selected historical schema. This also asks whether each historical schema could read messages written with the consumer schema. |

For these directional checks, a pair with byte-identical native schema data is reused before descriptor validation. Other historical pairs are still checked. Matching one stored version does not exempt the consumer from those checks, and equivalent descriptors encoded with different bytes do not use this shortcut.

`ALWAYS_COMPATIBLE` bypasses evolution checks, but schema registration still validates the schema data. `ALWAYS_INCOMPATIBLE` rejects evolution when a comparison is required. Existing first-registration and schema-reuse shortcuts remain; successfully registering or reusing a schema does not certify its entire history.

## Comparison work limits

Each historical schema pair has a separate budget for each direction. The limit is `min(100000, 16 × G)` work units, where `G` is the work charged while scanning the two reachable descriptor graphs for supported features. The scan counts toward the total. Smaller graphs have a lower limit, and the maximum is 100,000 units. This limit is not configurable.

Exceeding the budget returns `COMPARISON_LIMIT_EXCEEDED`, even if the change would otherwise be compatible. For example, a compatible optional-field addition under `BACKWARD` can exceed the limit for a flat message around 14,500 fields or a referenced enum around 16,700 values. These are examples, not universal size thresholds: graph structure and comparison direction also affect the work.

Check representative large and recursive schemas in staging before activation. Investigate descriptor complexity when the budget is exceeded; the error does not establish that the schemas have incompatible wire formats.

## Troubleshoot rejected schemas

Producer registration and consumer subscription failures report the first incompatibility. For example:

```text
TYPE_CHANGED: existingSchemaVersion=3, strategy=BACKWARD, direction=BACKWARD,
existingSchemaSha256=<64 hex digits>, path=example.Order.id, field=1,
writer=INT32, reader=STRING
```

Use `existingSchemaVersion` to locate the conflicting stored schema and `path` and `field` to locate the definition. For `KEY_VALUE`, the version identifies the stored outer schema and the fingerprint identifies the compared native component. `direction` identifies the actual writer/reader comparison, which can differ from the configured consumer strategy shown above.

| Diagnostic | What to check |
| --- | --- |
| `ROOT_MESSAGE_CHANGED`, `FIELD_NUMBER_CHANGED`, `TYPE_CHANGED`, `CARDINALITY_CHANGED`, `MAP_CHANGED` | Compare the root identity and the field definitions in the two schemas. |
| `REQUIRED_FIELD_NOT_GUARANTEED`, `DEFAULT_CHANGED`, `ONEOF_CONFLICT`, `ENUM_VALUE_NOT_READABLE`, `UTF8_VALIDATION_ADDED` | Check the directional rules for the reported field or message. |
| `UNSUPPORTED_FEATURE` | Check the supported-feature boundary. `schema=existing` or `schema=proposed` identifies the affected input; `side=writer` or `side=reader` is relative to the comparison direction. `detail` identifies the unsupported construct. |
| `COMPARISON_LIMIT_EXCEEDED` | Inspect `work` and `limit` and evaluate the schema's graph complexity. |
| `SCHEMA_RECONSTRUCTION_FAILED` | Check the native descriptor envelope, root file and message names, and missing or cyclic file imports. Recursive message references are supported. |
| `ALWAYS_INCOMPATIBLE`, `UNKNOWN_STRATEGY` | Check the effective compatibility policy. |

Failures before descriptor comparison may omit the direction, path, or fingerprint. Diagnostics are bounded human-readable messages, not a separate machine-readable API.

## Roll back the checker

1. Replace the advanced checker entry with `org.apache.pulsar.broker.service.schema.ProtobufNativeSchemaCompatibilityCheck`, preserving the other entries.
2. Apply the configuration consistently and restart brokers while they still run binaries that contain the advanced checker. Verify producer registration, consumer reconnections, and replication.
3. If a binary downgrade is needed, perform it only after restoring the default checker. Older binaries cannot load the advanced class and may fall back to an empty schema registry.

Returning to the default checker relaxes future compatibility checks. It does not rewrite retained schemas or repair messages that applications have already written.

For the complete design, see [PIP-246](https://github.com/apache/pulsar/blob/master/pip/pip-246.md).
