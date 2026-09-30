---
id: security-bouncy-castle
title: Bouncy Castle Providers
sidebar_label: "Bouncy Castle Providers"
description: Configure Bouncy Castle cryptographic providers and TLS provider selection in Pulsar.
---

[Bouncy Castle](https://www.bouncycastle.org/documentation/documentation-java/) supplies Java cryptographic providers and utilities for keys, certificates, and message encryption. Pulsar supports the general-purpose provider (`BC`) and the FIPS provider (`BCFIPS`). These are separate dependency families; do not put both on the same JVM classpath, because they define overlapping classes with different signatures.

## Packaging

Pulsar uses the provider's ordinary signed JARs rather than the former `bouncy-castle-bc` / `bouncy-castle-bcfips` jar-in-jar modules. The server distribution includes the non-FIPS `bcprov-jdk18on` and `bcpkix-jdk18on` dependency family and excludes `bc-fips`. Those older Pulsar packaging modules and their `pkg` classifier are no longer the way to select a provider.

Java client dependencies also use ordinary Bouncy Castle dependencies. Shaded Pulsar clients keep `org.bouncycastle` classes outside the shaded JAR and expose their provider dependencies separately, preserving the original signatures. Do not merge signed provider classes into an application JAR or remove signatures as a workaround for packaging errors. See [Java client libraries](/docs/client-libraries/java).

For a FIPS-provider deployment, assemble a compatible classpath with:

- `org.bouncycastle:bc-fips` for the crypto provider;
- the matching `bcpkix-fips` and `bcutil-fips` dependencies for the required key/certificate utilities;
- the matching FIPS TLS/JSSE library when using `BCJSSE` for TLS.

Exclude the non-FIPS `bcprov-jdk18on`, `bcprov-ext-jdk18on`, `bcpkix-jdk18on`, `bcutil-jdk18on`, and any non-FIPS TLS provider dependencies from the complete runtime classpath, including transitive client and plugin dependencies. Add the selected FIPS family consistently to each component that needs it. The [Pulsar FIPS-provider integration-test configuration](https://github.com/apache/pulsar/blob/master/tests/pulsar-client-test-bcfips/build.gradle.kts) shows the dependency exclusions and replacement used for interoperability testing.

## Select TLS providers

Pulsar distinguishes the provider that creates the TLS context from the provider that loads keys and certificates:

| Configuration | Purpose |
| --- | --- |
| `jsseProvider` | JSSE provider that supplies `SSLContext` for server connections. |
| `jcaProvider` | JCA provider that loads server key, certificate, and store material. |
| `brokerClientJsseProvider` | JSSE provider for the component's outbound client connections. |
| `brokerClientJcaProvider` | JCA provider for outbound key, certificate, and store loading. |

For example, once a compatible FIPS crypto and JSSE provider family is installed, a broker or proxy can select it with:

```properties
jsseProvider=BCJSSE
jcaProvider=BCFIPS
brokerClientJsseProvider=BCJSSE
brokerClientJcaProvider=BCFIPS
```

Explicit JSSE selection uses the JDK engine with that provider. Provider names must resolve to installed or discoverable Java security providers; initialization fails if an explicitly configured provider is unavailable. Pulsar can register the Bouncy Castle providers available on its classpath, but an already registered provider's configuration takes precedence. Configure that provider's approved-mode and cryptographic policies according to its own documentation.

Store format is independent of provider selection. A provider pinned with `jcaProvider=BCFIPS` must support the configured store type. Use an appropriate format such as `BCFKS` when required by your provider configuration, or supported PEM material; do not assume a `JKS` file can be loaded by every provider. The v4 Java client and admin builders accept the `jsseProvider` and `jcaProvider` keys through `loadConf(...)`; the v5 client's `TlsPolicy` carries the same selections. See [TLS providers and custom factories](security-tls-transport.md#tls-providers-and-custom-factories).

## v4 Java message-encryption providers

`MessageCryptoBc` resolves the Bouncy Castle provider lazily for asymmetric key operations instead of registering non-FIPS `BC` unconditionally. Functions producer and consumer setup also no longer force that registration. Keep the chosen provider family consistent across the client and Functions classpath.

Randomness is selected when `MessageCryptoBc` initializes. If `BCFIPS` is already registered, the implementation obtains its `DEFAULT` DRBG for data-key and IV generation; failure to obtain it aborts initialization instead of falling back to another random source. Register the configured FIPS provider before loading message crypto. Adding its JAR or registering it after initialization does not change the already selected random source.

This random-source selection does not pin every encryption operation to BCFIPS. The built-in AES-GCM implementation prefers `SunJCE` when available, then the JVM's provider selection, with Bouncy Castle as a fallback. TLS `jsseProvider` / `jcaProvider` settings do not select the message-encryption implementation. Validate every required operation and provider against your cryptographic policy; selecting a FIPS random source alone does not establish an approved-mode message-encryption deployment.

## Validation and FIPS requirements

Selecting a FIPS provider does **not** make Pulsar FIPS 140-3 certified. Interoperability tests and a newer provider library version do not establish that a deployment satisfies a specific validation. Use the exact cryptographic module version, operating environment, approved algorithms, and configuration identified by your applicable validation and security policy. The supporting PKIX, utility, and TLS libraries have their own compatibility requirements.

Read the provider's [FIPS security policies and user guides](https://www.bouncycastle.org/documentation/documentation-java/) when choosing the module and configuration. Verify the final runtime dependency graph and test TLS handshakes, hostname verification, certificate rotation, client authentication, geo-replication, and message encryption with the chosen provider. For HSM-backed keys or material sources beyond supported files, implement a [custom TLS factory](security-extending.md#custom-tls-factories).
