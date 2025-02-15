# Pulsar proxy

## Required
## Optional
### brokerClientAuthenticationParameters
The authentication parameters used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Client Authorization

### brokerClientAuthenticationPlugin
The authentication plugin used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Client Authorization

### brokerClientCertificateFilePath
The path to the TLS certificate used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Client Authorization

### brokerClientKeyFilePath
The path to TLS private key used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Client Authorization

### brokerClientTrustCertsFilePath
The path to trusted certificates used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Client Authorization

### tlsEnabledWithBroker
Whether TLS is enabled when communicating with Pulsar brokers

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Broker Client Authorization

### brokerServiceURL
If does not set metadataStoreUrl or configurationMetadataStoreUrl, this url should point to the discovery service provider. URL must have the pulsar:// prefix. And does not support multi url yet.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Discovery

### brokerServiceURLTLS
If does not set metadataStoreUrl or configurationMetadataStoreUrl, this url should point to the discovery service provider. URL must have the pulsar+ssl:// prefix. And does not support multi url yet.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Discovery

### brokerWebServiceURL
The web service url points to the discovery service provider of the broker cluster, and does not support multi url yet.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Discovery

### brokerWebServiceURLTLS
The tls web service url points to the discovery service provider of the broker cluster, and does not support multi url yet.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Discovery

### configurationMetadataStoreUrl
The metadata store URL for the configuration data. If empty, we fall back to use metadataStoreUrl

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Discovery

### functionWorkerWebServiceURL
The web service url points to the discovery service provider of the function worker cluster, and does not support multi url yet. Only configure it when you setup function workers in a separate cluster

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Discovery

### functionWorkerWebServiceURLTLS
The tls web service url points to the discovery service provider of the function worker cluster, and does not support multi url yet. Only configure it when you setup function workers in a separate cluster

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Discovery

### metadataStoreUrl
The metadata store URL. 
 Examples: 
  * zk:my-zk-1:2181,my-zk-2:2181,my-zk-3:2181
  * my-zk-1:2181,my-zk-2:2181,my-zk-3:2181 (will default to ZooKeeper when the schema is not specified)
  * zk:my-zk-1:2181,my-zk-2:2181,my-zk-3:2181/my-chroot-path (to add a ZK chroot path)


**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Discovery

### brokerProxyAllowedHostNames
Allowed broker target host names. Supports multiple comma separated entries and a wildcard.

**Type**: `java.lang.String`

**Default**: `*`

**Dynamic**: `false`

**Category**: Broker Proxy

### brokerProxyAllowedIPAddresses
Allowed broker target ip addresses or ip networks / netmasks. Supports multiple comma separated entries.

**Type**: `java.lang.String`

**Default**: `*`

**Dynamic**: `false`

**Category**: Broker Proxy

### brokerProxyAllowedTargetPorts
Allowed broker target ports

**Type**: `java.lang.String`

**Default**: `6650,6651`

**Dynamic**: `false`

**Category**: Broker Proxy

### brokerProxyConnectTimeoutMs
Broker proxy connect timeout.
The timeout value for Broker proxy connect timeout is in millisecond. Set to 0 to disable.

**Type**: `int`

**Default**: `10000`

**Dynamic**: `false`

**Category**: Broker Proxy

### brokerProxyReadTimeoutMs
Broker proxy read timeout.
The timeout value for Broker proxy read timeout is in millisecond. Set to 0 to disable.

**Type**: `int`

**Default**: `75000`

**Dynamic**: `false`

**Category**: Broker Proxy

### checkActiveBrokers
When enabled, checks that the target broker is active before connecting. zookeeperServers and configurationStoreServers must be configured in proxy configuration for retrieving the active brokers.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Broker Proxy

### enableProxyStatsEndpoints
Whether to enable the proxy's /metrics and /proxy-stats http endpoints

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: HTTP

### httpInputMaxReplayBufferSize
Http input buffer max size.

The maximum amount of data that will be buffered for incoming http requests so that the request body can be replayed when the backend broker issues a redirect response.

**Type**: `int`

**Default**: `5242880`

**Dynamic**: `false`

**Category**: HTTP

### httpMaxRequestHeaderSize
  The maximum size in bytes of the request header.
  Larger headers will allow for more and/or larger cookies plus larger form content encoded in a URL.
  However, larger headers consume more memory and can make a server more vulnerable to denial of service
  attacks.


**Type**: `int`

**Default**: `8192`

**Dynamic**: `false`

**Category**: HTTP

### httpNumThreads
Number of threads to use for HTTP requests processing

**Type**: `int`

**Default**: `8`

**Dynamic**: `false`

**Category**: HTTP

### httpOutputBufferSize
Http output buffer size.

The amount of data that will be buffered for http requests before it is flushed to the channel. A larger buffer size may result in higher http throughput though it may take longer for the client to see data. If using HTTP streaming via the reverse proxy, this should be set to the minimum value, 1, so that clients see the data as soon as possible.

**Type**: `int`

**Default**: `32768`

**Dynamic**: `false`

**Category**: HTTP

### httpProxyTimeout
Http proxy timeout.

The timeout value for HTTP proxy is in millisecond.

**Type**: `int`

**Default**: `300000`

**Dynamic**: `false`

**Category**: HTTP

### httpRequestsLimitEnabled
Enable the enforcement of limits on the incoming HTTP requests

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: HTTP

### httpRequestsMaxPerSecond
Max HTTP requests per seconds allowed. The excess of requests will be rejected with HTTP code 429 (Too many requests)

**Type**: `double`

**Default**: `100.0`

**Dynamic**: `false`

**Category**: HTTP

### httpReverseProxyConfigs
Http directs to redirect to non-pulsar services

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: HTTP

### metricsServletTimeoutMs
Time in milliseconds that metrics endpoint would time out. Default is 30s.
 Set it to 0 to disable timeout.

**Type**: `long`

**Default**: `30000`

**Dynamic**: `false`

**Category**: HTTP

### brokerClientSslProvider
The TLS Provider used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsCiphers
Specify the tls cipher the proxy will use to negotiate during TLS Handshake (a comma-separated list of ciphers).

Examples:- [TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256].
 used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsEnabledWithKeyStore
Whether the Pulsar proxy use KeyStore type to authenticate with Pulsar brokers

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsKeyStore
TLS KeyStore path for internal client,  used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsKeyStorePassword
TLS KeyStore password for proxy,  used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsKeyStoreType
TLS KeyStore type configuration for proxy: JKS, PKCS12  used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `JKS`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsProtocols
Specify the tls protocols the broker will use to negotiate during TLS handshake (a comma-separated list of protocol names).

Examples:- [TLSv1.3, TLSv1.2] 
 used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsTrustStore
TLS TrustStore path for proxy,  used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsTrustStorePassword
TLS TrustStore password for proxy,  used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsTrustStoreType
TLS TrustStore type configuration for proxy: JKS, PKCS12  used by the Pulsar proxy to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `JKS`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsEnabledWithKeyStore
Enable TLS with KeyStore type configuration for proxy

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsKeyStore
TLS KeyStore path for proxy

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsKeyStorePassword
TLS KeyStore password for proxy

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsKeyStoreType
TLS KeyStore type configuration for proxy: JKS, PKCS12

**Type**: `java.lang.String`

**Default**: `JKS`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsProvider
Specify the TLS provider for the broker service: 
When using TLS authentication with CACert, the valid value is either OPENSSL or JDK.
When using TLS authentication with KeyStore, available values can be SunJSSE, Conscrypt and etc.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsTrustStore
TLS TrustStore path for proxy

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsTrustStorePassword
TLS TrustStore password for proxy, null means empty password.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsTrustStoreType
TLS TrustStore type configuration for proxy: JKS, PKCS12

**Type**: `java.lang.String`

**Default**: `JKS`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### webServiceTlsProvider
Specify the TLS provider for the web service, available values can be SunJSSE, Conscrypt and etc.

**Type**: `java.lang.String`

**Default**: `Conscrypt`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### authenticateMetricsEndpoint
Whether the '/metrics' endpoint requires authentication. Defaults to true.'authenticationEnabled' must also be set for this to take effect.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Proxy Authentication

### authenticationEnabled
Whether authentication is enabled for the Pulsar proxy

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Proxy Authentication

### authenticationProviders
Authentication provider name list (a comma-separated list of class names

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: Proxy Authentication

### authenticationRefreshCheckSeconds
Interval of time for checking for expired authentication credentials. Disable by setting to 0.

**Type**: `int`

**Default**: `60`

**Dynamic**: `false`

**Category**: Proxy Authentication

### anonymousUserRole
When this parameter is not empty, unauthenticated users perform as anonymousUserRole

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Proxy Authorization

### authorizationEnabled
Whether authorization is enforced by the Pulsar proxy

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Proxy Authorization

### authorizationProvider
Authorization provider as a fully qualified class name

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.broker.authorization.PulsarAuthorizationProvider`

**Dynamic**: `false`

**Category**: Proxy Authorization

### forwardAuthorizationCredentials
Whether client authorization credentials are forwarded to the broker for re-authorization.Authentication must be enabled via configuring `authenticationEnabled` to be true for thisto take effect

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Proxy Authorization

### superUserRoles
A list of role names (a comma-separated list of strings) that are treated as `super-user`, meaning they will be able to do all admin operations and publish & consume from all topics

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: Proxy Authorization

### maxConcurrentInboundConnections
Max concurrent inbound connections. The proxy will reject requests beyond that

**Type**: `int`

**Default**: `10000`

**Dynamic**: `false`

**Category**: RateLimiting

### maxConcurrentInboundConnectionsPerIp
The maximum number of connections per IP. If it exceeds, new connections are rejected.

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: RateLimiting

### maxConcurrentLookupRequests
Max concurrent lookup requests. The proxy will reject requests beyond that

**Type**: `int`

**Default**: `50000`

**Dynamic**: `false`

**Category**: RateLimiting

### kinitCommand
kerberos kinit command.

**Type**: `java.lang.String`

**Default**: `/usr/bin/kinit`

**Dynamic**: `false`

**Category**: SASL Authentication Provider

### saslJaasClientAllowedIds
This is a regexp, which limits the range of possible ids which can connect to the Broker using SASL.
 Default value is: ".*pulsar.*", so only clients whose id contains 'pulsar' are allowed to connect.

**Type**: `java.lang.String`

**Default**: `.*pulsar.*`

**Dynamic**: `false`

**Category**: SASL Authentication Provider

### saslJaasServerRoleTokenSignerSecretPath
Path to file containing the secret to be used to SaslRoleTokenSigner
The secret can be specified like:
saslJaasServerRoleTokenSignerSecretPath=file:///my/saslRoleTokenSignerSecret.key.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: SASL Authentication Provider

### saslJaasServerSectionName
Service Principal, for login context name. Default value is "PulsarProxy".

**Type**: `java.lang.String`

**Default**: `PulsarProxy`

**Dynamic**: `false`

**Category**: SASL Authentication Provider

### advertisedAddress
Hostname or IP address the service advertises to the outside world. If not set, the value of `InetAddress.getLocalHost().getCanonicalHostName()` is used.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### bindAddress
Hostname or IP address the service binds on

**Type**: `java.lang.String`

**Default**: `0.0.0.0`

**Dynamic**: `false`

**Category**: Server

### haProxyProtocolEnabled
Enable or disable the proxy protocol.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### httpServerAcceptQueueSize
Capacity for accept queue in the HTTP server Default is set to 8192.

**Type**: `int`

**Default**: `8192`

**Dynamic**: `false`

**Category**: Server

### httpServerThreadPoolQueueSize
Capacity for thread pool queue in the HTTP server Default is set to 8192.

**Type**: `int`

**Default**: `8192`

**Dynamic**: `false`

**Category**: Server

### keepAliveIntervalSeconds
Specifies the interval (in seconds) for sending ping messages to the client. Set to 0 to disable ping messages. This setting applies to client connections used for topic lookups and partition metadata requests. When a client establishes a broker connection via the proxy, the client and broker will communicate directly without the proxy intercepting the messages. In that case, the broker's keepAliveIntervalSeconds configuration becomes relevant.

**Type**: `int`

**Default**: `30`

**Dynamic**: `false`

**Category**: Server

### maxConcurrentHttpRequests
Max concurrent web requests

**Type**: `int`

**Default**: `1024`

**Dynamic**: `false`

**Category**: Server

### maxHttpServerConnections
Maximum number of inbound http connections. (0 to disable limiting)

**Type**: `int`

**Default**: `2048`

**Dynamic**: `false`

**Category**: Server

### maxMessageSize
Max size of messages.

**Type**: `int`

**Default**: `5242880`

**Dynamic**: `false`

**Category**: Server

### metadataStoreAllowReadOnlyOperations
Is metadata store read-only operations.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### metadataStoreCacheExpirySeconds
Metadata store cache expiry time in seconds.

**Type**: `int`

**Default**: `300`

**Dynamic**: `false`

**Category**: Server

### metadataStoreSessionTimeoutMillis
Metadata store session timeout in milliseconds.

**Type**: `int`

**Default**: `30000`

**Dynamic**: `false`

**Category**: Server

### narExtractionDirectory
The directory where nar Extraction happens

**Type**: `java.lang.String`

**Default**: `/tmp`

**Dynamic**: `false`

**Category**: Server

### numAcceptorThreads
Number of threads used for Netty Acceptor. Default is set to `1`

**Type**: `int`

**Default**: `1`

**Dynamic**: `false`

**Category**: Server

### numIOThreads
Number of threads used for Netty IO. Default is set to `2 * Runtime.getRuntime().availableProcessors()`

**Type**: `int`

**Default**: `8`

**Dynamic**: `false`

**Category**: Server

### proxyLogLevel
Proxy log level, default is 0. 0: Do not log any tcp channel info 1: Parse and log any tcp channel info and command info without message body 2: Parse and log channel info, command info and message body

**Type**: `java.util.Optional`

**Default**: `Optional[0]`

**Dynamic**: `false`

**Category**: Server

### proxyZeroCopyModeEnabled
Enables zero-copy transport of data across network interfaces using the spice. Zero copy mode cannot be used when TLS is enabled or when proxyLogLevel is \> 0.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Server

### servicePort
The port for serving binary protobuf request

**Type**: `java.util.Optional`

**Default**: `Optional[6650]`

**Dynamic**: `false`

**Category**: Server

### servicePortTls
The port for serving tls secured binary protobuf request

**Type**: `java.util.Optional`

**Default**: `Optional.empty`

**Dynamic**: `false`

**Category**: Server

### statusFilePath
Path for the file used to determine the rotation status for the proxy instance when responding to service discovery health checks

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### webServiceHaProxyProtocolEnabled
Enable or disable the use of HA proxy protocol for resolving the client IP for http/https requests. Default is false.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### webServiceLogDetailedAddresses
Add detailed client/remote and server/local addresses and ports to http/https request logging.
Defaults to true when either webServiceHaProxyProtocolEnabled or webServiceTrustXForwardedFor is enabled.

**Type**: `java.lang.Boolean`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### webServicePort
The port for serving http requests

**Type**: `java.util.Optional`

**Default**: `Optional[8080]`

**Dynamic**: `false`

**Category**: Server

### webServicePortTls
The port for serving https requests

**Type**: `java.util.Optional`

**Default**: `Optional.empty`

**Dynamic**: `false`

**Category**: Server

### webServiceTrustXForwardedFor
Trust X-Forwarded-For header for resolving the client IP for http/https requests.
Default is false.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### brokerClientSslFactoryPlugin
SSL Factory Plugin class used by internal client to provide SSLEngine and SSLContext objects. The default class used is DefaultSslFactory.

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.common.util.DefaultPulsarSslFactory`

**Dynamic**: `false`

**Category**: TLS

### brokerClientSslFactoryPluginParams
SSL Factory plugin configuration parameters used by internal client.

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: TLS

### sslFactoryPlugin
SSL Factory Plugin class to provide SSLEngine and SSLContext objects. The default  class used is DefaultSslFactory.

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.common.util.DefaultPulsarSslFactory`

**Dynamic**: `false`

**Category**: TLS

### sslFactoryPluginParams
SSL Factory plugin configuration parameters.

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: TLS

### tlsAllowInsecureConnection
Accept untrusted TLS certificate from client.

If true, a client with a cert which cannot be verified with the `tlsTrustCertsFilePath` cert will be allowed to connect to the server, though the cert will not be used for client authentication

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: TLS

### tlsCertRefreshCheckDurationSec
Tls cert refresh duration in seconds (set 0 to check on every new connection)

**Type**: `long`

**Default**: `300`

**Dynamic**: `false`

**Category**: TLS

### tlsCertificateFilePath
Path for the TLS certificate file

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: TLS

### tlsCiphers
Specify the tls cipher the proxy will use to negotiate during TLS Handshake (a comma-separated list of ciphers).

Examples:- [TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256]

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: TLS

### tlsHostnameVerificationEnabled
Whether the hostname is validated when the proxy creates a TLS connection with brokers

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: TLS

### tlsKeyFilePath
Path for the TLS private key file

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: TLS

### tlsProtocols
Specify the tls protocols the broker will use to negotiate during TLS handshake (a comma-separated list of protocol names).

Examples:- [TLSv1.3, TLSv1.2]

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: TLS

### tlsRequireTrustedClientCertOnConnect
Whether client certificates are required for TLS.

 Connections are rejected if the client certificate isn't trusted

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: TLS

### tlsTrustCertsFilePath
Path for the trusted TLS certificate file.

This cert is used to verify that any certs presented by connecting clients are signed by a certificate authority. If this verification fails, then the certs are untrusted and the connections are dropped

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: TLS

### webServiceTlsCiphers
Specify the tls cipher the proxy's web service will use to negotiate during TLS Handshake.

Example:- [TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256]

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: TLS

### webServiceTlsProtocols
Specify the tls protocols the proxy's web service will use to negotiate during TLS Handshake.

Example:- [TLSv1.3, TLSv1.2]

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: TLS

### clusterName
Name of the cluster to which this broker belongs to

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: WebSocket

### webSocketPingDurationSeconds
Interval of time to sending the ping to keep alive in WebSocket proxy. This value greater than 0 means enabled

**Type**: `int`

**Default**: `-1`

**Dynamic**: `false`

**Category**: WebSocket

### webSocketServiceEnabled
Enable or disable the WebSocket servlet

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: WebSocket

### additionalServletDirectory
The directory to locate proxy additional servlet

**Type**: `java.lang.String`

**Default**: `./proxyAdditionalServlet`

**Dynamic**: `false`

**Category**: proxy plugin

### additionalServlets
List of proxy additional servlet to load, which is a list of proxy additional servlet names

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: proxy plugin

### proxyAdditionalServletDirectory
The directory to locate proxy additional servlet

**Type**: `java.lang.String`

**Default**: `./proxyAdditionalServlet`

**Dynamic**: `false`

**Category**: proxy plugin

### proxyAdditionalServlets
List of proxy additional servlet to load, which is a list of proxy additional servlet names

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: proxy plugin

### proxyExtensions
List of messaging protocols to load, which is a list of extension names

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: proxy plugin

### proxyExtensionsDirectory
The directory to locate proxy extensions

**Type**: `java.lang.String`

**Default**: `./proxyextensions`

**Dynamic**: `false`

**Category**: proxy plugin

### proxyHttpResponseHeadersJson
Default http header map to add into http-proxy for the any security requirements eg: { "header1": "val1", "header2": "val2" }

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: proxy plugin

### useSeparateThreadPoolForProxyExtensions
Use a separate ThreadPool for each Proxy Extension

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: proxy plugin

## Deprecated
### configurationStoreServers
Configuration store connection string (as a comma-separated list). Deprecated in favor of `configurationMetadataStoreUrl`

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Discovery

### globalZookeeperServers
Global ZooKeeper quorum connection string (as a comma-separated list)

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Discovery

### zooKeeperCacheExpirySeconds
ZooKeeper cache expiry time in seconds. @deprecated - Use metadataStoreCacheExpirySeconds instead.

**Type**: `int`

**Default**: `-1`

**Dynamic**: `false`

**Category**: Broker Discovery

### zookeeperServers
The ZooKeeper quorum connection string (as a comma-separated list)

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Broker Discovery

### zookeeperSessionTimeoutMs
ZooKeeper session timeout in milliseconds. @deprecated - Use metadataStoreSessionTimeoutMillis instead.

**Type**: `int`

**Default**: `-1`

**Dynamic**: `false`

**Category**: Broker Discovery

### zooKeeperAllowReadOnlyOperations
Is zooKeeper allow read-only operations.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server


