---
id: administration-upgrade-to-5.0.x-applications
title: Application, Functions, and plugin upgrades to Pulsar 5.0.x
sidebar_label: Applications, Functions, and plugins
description: Prepare client applications, Pulsar Functions implementations, and broker and authentication plugins for Pulsar 5.0.
---

This guide covers application and extension changes when upgrading from Pulsar 4.x to 5.0.x. Use it alongside the [Pulsar 5.0.x upgrade checklist](administration-upgrade-to-5.0.x.md#before-upgrading-to-pulsar-50) and [Configuration default changes](administration-upgrade-to-5.0.x-configuration.md).

Existing v4 applications do not need to change their client dependency or API merely to upgrade brokers. Review the checks relevant to your applications and complete server-side plugin, authentication, and TLS changes before rolling the affected components.

## Java requirements

Pulsar 5.0 Java client libraries, including v4 and v5, client CLI tools, and the public Functions/IO interfaces remain compatible with Java 17. The server-side Functions implementation requires Java 21 or later; Functions compiled for Java 17 can run in a Java 21 or later Functions instance. Building broker plugins against broker-side libraries requires JDK 21 or later.

## Choose Java client dependencies separately

**One dependency for the v4, v5, and admin clients.** For new applications or client dependency updates, use `org.apache.pulsar:pulsar-client-v5-all`. This unshaded dependency resolves all three clients and their libraries transitively. Applications can keep using the v4 API; separate client dependencies are unnecessary.

Follow the complete [Maven](pathname:///docs/client-libraries/java-dependency-configuration#maven) or [Gradle](pathname:///docs/client-libraries/java-dependency-configuration#gradle) example to configure **both the Pulsar and Netty BOMs, exclude conflicting client libraries, and verify the runtime dependency graph**. The [dependency configuration guide](pathname:///docs/client-libraries/java-dependency-configuration) also covers Spring Boot and the shaded fallback for unresolved classpath conflicts.

Changing dependencies does not require adopting the v5 API. The v4 API works without scalable-topic services; the v5 API requires those services even for regular topics. See the [API migration guide](pathname:///docs/client-libraries/java-migrate-to-v5) when adopting v5.

## Align application Netty dependencies

The unshaded client requires **Netty 4.2.x**; Netty 4.1.x and 4.2.x cannot coexist on the same classpath. Align application and framework dependencies using the [BOM guidance](pathname:///docs/client-libraries/java-dependency-configuration#pulsar-bom). This applies when updating client dependencies, not merely upgrading brokers while retaining an existing v4 client dependency.

## Check schema dependencies

When upgrading Java client dependencies, review [Avro class trust](schema-get-started.md#java-avro-class-trust) if your clients resolve application classes from externally supplied Avro schemas. Pulsar 5.0 also uses Protobuf 4 by default; check application dependency overrides against the resolved runtime.

## Check authentication, TLS, and extensions

- **TLS hostname verification is enabled by default** for the Java client and outbound TLS connections from brokers, proxies, WebSocket services, and Functions workers. Check the hostnames used by client service URLs, advertised broker addresses, proxy-to-broker connections, and geo-replication. Reissue server certificates with matching subject alternative names before the rollout so both existing and upgraded components can connect. See [Hostname verification](security-tls-transport.md#hostname-verification).
- **Custom TLS factories must be migrated.** [PIP-478](https://github.com/apache/pulsar/blob/master/pip/pip-478.md) replaces the PIP-337 `PulsarSslFactory` SPI with `PulsarTlsFactory`. Replace `sslFactoryPlugin` / `sslFactoryPluginParams` with `tlsFactoryClassName` / `tlsFactoryConfig`, and replace `brokerClientSslFactoryPlugin` / `brokerClientSslFactoryPluginParams` with `brokerClientTlsFactoryClassName` / `brokerClientTlsFactoryConfig`. Non-default values for the removed keys in broker/proxy configuration or client `loadConf` maps are rejected. When upgrading Java client/admin dependencies to 5.0, applications using the removed builder methods must be recompiled against the replacement methods. Also audit per-cluster TLS factory settings used by geo-replication: the old `ClusterData` fields are retained but ignored by 5.0 brokers. Set their replacement fields with `pulsar-admin clusters` using `--tls-factory-class-name` and `--tls-factory-config`.
- **Proxy authentication:** brokers now default to `authenticateOriginalAuthData=true`. For deployments using TLS client-certificate or SASL authentication through a proxy, explicitly set `authenticateOriginalAuthData=false` in the broker configuration before rolling the brokers. The proxy's certificate does not authenticate the original client, and a SASL handshake cannot be replayed on the proxy-to-broker connection. Retain the appropriate trusted `proxyRoles` and authorization settings. Test both binary client connections and proxied HTTP admin requests with your real client identities. Proxied tenant administration requires both the proxy role and original principal to be authorized as a superuser or tenant administrator; granting that permission only to the proxy is insufficient. See [Proxy configuration](administration-proxy.md) and [Authorization](security-authorization.md).
- **Pulsar Broker plugins and extensions:** use JDK 21 or later to build against broker-side libraries, which now target Java 21. Update plugin build environments and CI jobs, then rebuild and test against the target Pulsar release. Update extensions that use the affected Java EE APIs from `javax.*` to `jakarta.*` at the Jakarta EE 10 level. The change does not rename every `javax` package. Legacy `javax.servlet` `AdditionalServlet` plugins are adapted for the new servlet environment; test their behavior along with other extensions. Adapt custom metadata-store implementations to the new overloads and `Set<Option>` hooks, including `MetadataCache<T>.put(String path, T value, Set<Option> opts)`; see [Custom metadata-store implementations](administration-metadata-store.md#custom-metadata-store-implementations). Custom topic-policy listeners that rely on the initial namespace-wide notification may need `topicPolicyListenerReplayEnabled=true`; it is disabled by default. See [PIP-472](https://github.com/apache/pulsar/blob/master/pip/pip-472.md) and [Plugin development](develop-plugin.md).
- **Custom managed-ledger integrations:** remove calls to the unused `ManagedLedgerConfig` accessors for `metadataEnsembleSize`, `metadataWriteQuorumSize`, and `metadataAckQuorumSize`; those Java fields and methods have been removed. The broker settings `managedLedgerDefaultEnsembleSize`, `managedLedgerDefaultWriteQuorum`, and `managedLedgerDefaultAckQuorum` continue to supply default quorums, subject to persistence-policy overrides.
- **Broker interceptor ordering:** hooks now run in the order listed in `brokerInterceptors`. Check that order when one extension depends on work performed by an earlier hook.
- **Custom diagnostics libraries:** replace calls to the removed `org.apache.pulsar:structured-event-log` artifact and `org.apache.pulsar.structuredeventlog` classes. Code using the `LatencyTracer` API introduced in 4.2.4 must adapt: construct it with a `NanoTimeSupplier` without supplying a `Queue<Timepoint>`, and use `getTracePoints()` and `getSnapshot()`. `Timepoint`, `getLatency()`, and the previous three-argument `Snapshot` constructor have been replaced. See [Logging](administration-logging.md).

Before rolling brokers or upgrading clients, also exercise schema lookup, schema registration, and transactions with their production roles. When authorization is enabled, binary schema reads now require topic lookup authorization, schema registration requires produce authorization, and v4 transaction participant registration checks produce or subscription-specific consume authorization. Custom authorization providers must support these checks. See [Schema and transaction authorization](security-authorization.md#schema-and-transaction-requests-over-the-binary-protocol).

## Check Functions behavior and extensions

- **Python output message properties:** the Python runtime now honors `forwardSourceMessageProperty`. With the default worker settings, an omitted function setting enables copying input properties to the output. If downstream consumers rely on output properties without that forwarding, set `forwardSourceMessageProperty: false` in the Function configuration and verify output properties before upgrading the runtime. This change concerns Python; Java already applied the setting, and this change does not add it to Go. See [Python and Go runtime settings](functions-concepts.md#python-and-go-runtime-settings).
- **Custom worker extensions:** rebuild and adapt plugins that use generated `org.apache.pulsar.functions.proto` Java types to the LightProto API, including the top-level `FunctionDetails` type used by `FunctionAuthProvider`. See [Custom worker extensions](functions-worker.md#custom-worker-extensions).
- **Java record implementations:** `KVRecord<K, V>` now extends `Record<V>`. When rebuilding a custom implementation, ensure that `getValue()` returns `V`; an implementation that previously returned `Object` may need adaptation.
