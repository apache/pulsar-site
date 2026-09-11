# WebSocket

## Required
### clusterName
Name of the cluster to which this broker belongs to

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

## Optional
### anonymousUserRole
When this parameter is not empty, unauthenticated users perform as anonymousUserRole

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### authenticationEnabled
Enable authentication

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: 

### authenticationProviders
Authentication provider name list, which is a list of class names

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: 

### authorizationAllowWildcardsMatching
Allow wildcard matching in authorization (wildcard matching only applicable if wildcard-char: presents at first or last position. For example: *.pulsar.service,pulsar.service.*)

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: 

### authorizationEnabled
Enforce authorization

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: 

### authorizationProvider
Authorization provider fully qualified class name

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.broker.authorization.PulsarAuthorizationProvider`

**Dynamic**: `false`

**Category**: 

### bindAddress
Hostname or IP address the service binds on, default is 0.0.0.0.

**Type**: `java.lang.String`

**Default**: `0.0.0.0`

**Dynamic**: `false`

**Category**: 

### brokerClientAuthenticationParameters
Proxy authentication parameters used to connect to brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### brokerClientAuthenticationPlugin
Proxy authentication settings used to connect to brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### brokerClientJcaProvider
PIP-478: the JCA (material) provider for the WebSocket proxy's own outbound (proxy-to-broker) client connections — the outbound counterpart of jcaProvider.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### brokerClientJsseProvider
PIP-478: the name of a JSSE (SSLContext) provider used for the WebSocket proxy's own outbound (proxy-to-broker) client connections (e.g. BCJSSE for FIPS). The listener-side jsseProvider governs the proxy's web server only; this is the outbound counterpart, matching the broker's brokerClientJsseProvider. Applied independently of brokerClientTlsFactoryClassName. Leave unset to use the JVM provider search order.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### brokerClientSslProvider
PIP-478: the Netty SSL engine provider for the WebSocket proxy's own outbound (proxy-to-broker) client connections — JDK, OPENSSL or OPENSSL_REFCNT. The listener-side tlsProvider governs the proxy's web server only; this is the outbound counterpart, matching the broker's brokerClientSslProvider. Leave unset to keep the JVM default.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### brokerClientTlsEnabled
Enable TLS of broker client

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: 

### brokerClientTlsFactoryClassName
PIP-478 TLS factory (PulsarTlsFactory) class name for the WebSocket proxy's own outbound (websocket-to-broker) client connections (purpose BROKER_CLIENT). An empty value or the literal 'default' selects the built-in default factory composed from the broker-client tls* settings, otherwise the named class is instantiated via its public no-arg constructor. This is the only outbound-client TLS-factory path for the WebSocket proxy.

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: 

### brokerClientTlsFactoryConfig
PIP-478 configuration parameters for brokerClientTlsFactoryClassName. Accepts a JSON object or a comma-separated key=value list.

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: 

### brokerClientTrustCertsFilePath
Path for the trusted TLS certificate file for outgoing connection to a server (broker)

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: 

### brokerServiceUrl
The broker binary service URL (for produce and consume operations)

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### brokerServiceUrlTls
The secured broker binary service URL (for produce and consume operations)

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### configurationMetadataStoreUrl
Connection string of configuration metadata store servers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### cryptoKeyReaderFactoryClassName
CryptoKeyReader factory classname to support encryption at websocket.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### httpServerAcceptQueueSize
Capacity for accept queue in the HTTP server Default is set to 8192.

**Type**: `int`

**Default**: `8192`

**Dynamic**: `false`

**Category**: 

### httpServerThreadPoolQueueSize
Capacity for thread pool queue in the HTTP server Default is set to 8192.

**Type**: `int`

**Default**: `8192`

**Dynamic**: `false`

**Category**: 

### jcaProvider
PIP-478: the name of a JCA (material) provider — a java.security.Provider supplying the KeyStore, CertificateFactory and KeyFactory engines that parse the TLS material (e.g. BCFIPS for FIPS, alongside jsseProvider=BCJSSE). A distinct axis from jsseProvider, which supplies the SSLContext. Unset uses the JVM provider search order. Applies to the WebSocket proxy's web listener.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### jsseProvider
PIP-478: the name of a JSSE (SSLContext) provider — a java.security.Provider that supplies an SSLContext (TLS) implementation (e.g. the BouncyCastle JSSE provider BCJSSE for FIPS, with BCFIPS registered separately as the crypto provider it uses) — used to build the WebSocket service's web-listener TLS SSLContext. When set, the default factory builds the JDK engine with this provider as the SSLContext provider. Resolved by preferring a provider already registered in the JVM (Security.getProvider), falling back to the ServiceLoader mechanism, and failing loudly when unresolvable.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### maxConcurrentHttpRequests
Max concurrent web requests

**Type**: `int`

**Default**: `1024`

**Dynamic**: `false`

**Category**: 

### maxHttpServerConnections
Maximum number of inbound http connections. (0 to disable limiting)

**Type**: `int`

**Default**: `2048`

**Dynamic**: `false`

**Category**: 

### metadataStoreAllowReadOnlyOperations
Is metadata store read-only operations.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: 

### metadataStoreCacheExpirySeconds
Metadata store cache expiry time in seconds.

**Type**: `int`

**Default**: `300`

**Dynamic**: `false`

**Category**: 

### metadataStoreSessionTimeoutMillis
Metadata store session timeout in milliseconds.

**Type**: `long`

**Default**: `30000`

**Dynamic**: `false`

**Category**: 

### numHttpServerThreads
Number of threads to used in HTTP server

**Type**: `int`

**Default**: `6`

**Dynamic**: `false`

**Category**: 

### properties
Key-value properties. Types are all String

**Type**: `java.util.Properties`

**Default**: `{}`

**Dynamic**: `false`

**Category**: 

### serviceUrl
The HTTPS REST service URL to connect to broker

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### serviceUrlTls
The HTTPS REST service TLS URL

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### statusFilePath
Path for the file used to determine the rotation status for the broker when responding to service discovery health checks

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### superUserRoles
Role names that are treated as "super-user", which means they can do all admin operations and publish to or consume from all topics

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: 

### tlsAllowInsecureConnection
Accept untrusted TLS certificate from client and broker

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: 

### tlsCertRefreshCheckDurationSec
TLS cert refresh duration (in seconds). Set 0 to disable the background rotation check, so the TLS material loaded at startup is kept until restart.

**Type**: `long`

**Default**: `300`

**Dynamic**: `false`

**Category**: 

### tlsCertificateFilePath
Path for the TLS certificate file

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### tlsEnabledWithKeyStore
Enable TLS with KeyStore type configuration for WebSocket

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: 

### tlsFactoryClassName
PIP-478 TLS factory (PulsarTlsFactory) class name for the WebSocket proxy's web server TLS (purpose WEB). When set, the new PIP-478 TLS SPI is used instead of the built-in file-based TLS loading: an empty value or the literal 'default' selects the built-in default factory composed from these tls* settings, otherwise the named class is instantiated via its public no-arg constructor. This is the WebSocket proxy's first TLS-factory pluggability.

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: 

### tlsFactoryConfig
PIP-478 configuration parameters for tlsFactoryClassName. Accepts a JSON object or a comma-separated key=value list.

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: 

### tlsHostnameVerificationEnabled
Enable TLS hostname verification when connecting to broker. Enabled by default since Pulsar 5.0 (PIP-478): a broker whose certificate does not match its hostname/SAN is rejected.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: 

### tlsKeyFilePath
Path for the TLS private key file

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### tlsKeyStore
TLS KeyStore path in WebSocket

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### tlsKeyStorePassword
TLS KeyStore password for WebSocket

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### tlsKeyStoreType
TLS KeyStore type configuration in WebSocket: JKS, PKCS12

**Type**: `java.lang.String`

**Default**: `JKS`

**Dynamic**: `false`

**Category**: 

### tlsProvider
Specify the TLS provider for the WebSocket service: SunJSSE, Conscrypt and etc.
Leave unset (the default) to use Conscrypt when it is available on this platform, else
the JVM's default provider; a configured name is pinned and startup fails if it cannot be
resolved. Conscrypt ships native libraries for x86_64 and, since 2.6.1, aarch64 — but not
for every platform, which is why the default falls back instead of failing where it cannot
load; pinning it explicitly there does fail.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### tlsRequireTrustedClientCertOnConnect
Specify whether client certificates are required for TLS rejecting the connection if the client certificate is not trusted

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: 

### tlsTrustCertsFilePath
Path for the trusted TLS certificate file

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: 

### tlsTrustStore
TLS TrustStore path in WebSocket

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### tlsTrustStorePassword
TLS TrustStore password for WebSocket, null means empty password.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### tlsTrustStoreType
TLS TrustStore type configuration in WebSocket: JKS, PKCS12

**Type**: `java.lang.String`

**Default**: `JKS`

**Dynamic**: `false`

**Category**: 

### webServiceHaProxyProtocolEnabled
Enable or disable the use of HA proxy protocol for resolving the client IP for http/https requests. Default is false.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: 

### webServiceLogDetailedAddresses
Add detailed client/remote and server/local addresses and ports to http/https request logging.
Defaults to true when either webServiceHaProxyProtocolEnabled or webServiceTrustXForwardedFor is enabled.

**Type**: `java.lang.Boolean`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### webServicePort
Port to use to server HTTP request

**Type**: `java.util.Optional`

**Default**: `Optional[8080]`

**Dynamic**: `false`

**Category**: 

### webServicePortTls
Port to use to server HTTPS request

**Type**: `java.util.Optional`

**Default**: `Optional.empty`

**Dynamic**: `false`

**Category**: 

### webServiceTlsCiphers
Specify the tls cipher the proxy's web service will use to negotiate during TLS Handshake.

Example:- [TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256]

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: 

### webServiceTlsProtocols
Specify the tls protocols the proxy's web service will use to negotiate during TLS Handshake.

Example:- [TLSv1.3, TLSv1.2]

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: 

### webServiceTrustXForwardedFor
Trust X-Forwarded-For header for resolving the client IP for http/https requests.
Default is false.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: 

### webSocketConnectionsPerBroker
Number of connections per broker in Pulsar client used in WebSocket proxy

**Type**: `int`

**Default**: `4`

**Dynamic**: `false`

**Category**: 

### webSocketMaxTextFrameSize
Maximum size of a text message during parsing in WebSocket proxy

**Type**: `int`

**Default**: `1048576`

**Dynamic**: `false`

**Category**: 

### webSocketNumIoThreads
Number of IO threads in Pulsar client used in WebSocket proxy

**Type**: `int`

**Default**: `4`

**Dynamic**: `false`

**Category**: 

### webSocketNumServiceThreads
Number of threads used by Websocket service

**Type**: `int`

**Default**: `20`

**Dynamic**: `false`

**Category**: 

### webSocketPingDurationSeconds
Interval of time to sending the ping to keep alive. This value greater than 0 means enabled

**Type**: `int`

**Default**: `-1`

**Dynamic**: `false`

**Category**: 

### webSocketPulsarClientMemoryLimitInMB
Memory limit in MBs for direct memory in Pulsar Client used in WebSocket proxy

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: 

### webSocketSessionIdleTimeoutMillis
Timeout of idling WebSocket session (in milliseconds)

**Type**: `int`

**Default**: `300000`

**Dynamic**: `false`

**Category**: 

## Deprecated
### configurationStoreServers
Configuration store connection string (as a comma-separated list). Deprecated in favor of `configurationMetadataStoreUrl`

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### globalZookeeperServers
Configuration Store connection string

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: 

### zooKeeperCacheExpirySeconds
ZooKeeper cache expiry time in seconds. @deprecated - Use metadataStoreCacheExpirySeconds instead.

**Type**: `int`

**Default**: `-1`

**Dynamic**: `false`

**Category**: 

### zooKeeperSessionTimeoutMillis
ZooKeeper session timeout in milliseconds. @deprecated - Use metadataStoreSessionTimeoutMillis instead.

**Type**: `long`

**Default**: `-1`

**Dynamic**: `false`

**Category**: 


