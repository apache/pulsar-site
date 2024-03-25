---
id: security-openid-connect
title: Authentication using OpenID Connect
sidebar_label: "Authentication using OpenID Connect"
---

Apache Pulsar supports authenticating clients using [OpenID Connect](https://openid.net/connect), which is an implementation of the OAuth 2.0 Protocol. Using an access token obtained from an OpenID Connect compliant Identity Provider service acting as the token issuer, you can identify a Pulsar client and associate it with a "principal" (or "role") that is permitted to do some actions, such as publishing messages to a topic or performing some admin operation.

The source code for the OpenID Connect implementation is in the [pulsar-broker-auth-oidc](https://github.com/apache/pulsar/blob/master/pulsar-broker-auth-oidc/) submodule in the Apache Pulsar git repo.

:::note
Pulsar's OpenID Connect integration was introduced in Pulsar 3.0.0. As always, if you encounter any issues, please ask questions on Pulsar channels and open issues in GitHub.
:::

## OpenID Connect Authentication Flow

After authenticating with the Identity Provider, the Pulsar client gets an access token from the server and passes this access token to Pulsar Server (Broker, Proxy, WebSocket Proxy, or Function Worker) for authentication. When using the `AuthenticationProviderOpenID` class, the Pulsar Server performs the following validations in order:

1. Validate that the token's issuer claim (`iss`) is one of the allowed token issuers (`openIDAllowedTokenIssuers`).
2. Retrieve and cache the OpenID Connect discovery document from the issuer following the [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html) specification.
3. Verify the resulting JSON document's `issuer` field matches the token's issuer claim.
4. Retrieve and cache the public key set from the `jwks_uri` provided by the discovery document obtained in step 2.
5. Verify the signature of the token using the public key set obtained in step 4.
6. Validate the token's claims, like `aud`, `exp`, `iat`, and `nbf`.
7. When token validation is successful, the Pulsar Server extracts the `sub` claim from the token (or the configured `openIDRoleClaim`) and uses it as the principal for authorization.
8. When the token expires, the Pulsar Server challenges the client to re-authenticate with the Identity Provider and provide a new access token. If the client fails to re-authenticate, the Pulsar Server closes the connection.

## Enable OpenID Connect Authentication in the Broker and Proxy

To configure Pulsar Servers to authenticate clients using OpenID Connect, add the following parameters to the `conf/broker.conf` and the `conf/proxy.conf`. If you use a standalone Pulsar, you need to add these parameters to the `conf/standalone.conf` file:

```properties
# Configuration to enable authentication
authenticationEnabled=true
authenticationProviders=org.apache.pulsar.broker.authentication.oidc.AuthenticationProviderOpenID

# Required settings for AuthenticationProviderOpenID
# A comma separated list of allowed, or trusted, token issuers. The token issuer is the URL of the token issuer.
PULSAR_PREFIX_openIDAllowedTokenIssuers=https://my-issuer-1.com,https://my-issuer-2.com
# The list of allowed audiences for the token. The audience is the intended recipient of the token. A token with
# at least one of these audience claims will pass the audience validation check.
PULSAR_PREFIX_openIDAllowedAudiences=audience-1,audience-2

# Optional settings (values shown are the defaults)
# The path to the file containing the trusted certificate(s) of the token issuer(s). If not set, uses the default
# trust store of the JVM. Note: in version 3.0.0, the default only applies when this setting is not an environment
# variable and is not in the configuration file.
PULSAR_PREFIX_openIDTokenIssuerTrustCertsFilePath=
# The JWT's claim to use for the role/principal during authorization.
PULSAR_PREFIX_openIDRoleClaim=sub
# The leeway, in seconds, to use when validating the token's expiration time.
PULSAR_PREFIX_openIDAcceptedTimeLeewaySeconds=0

# Cache settings
PULSAR_PREFIX_openIDCacheSize=5
PULSAR_PREFIX_openIDCacheRefreshAfterWriteSeconds=64800
PULSAR_PREFIX_openIDCacheExpirationSeconds=86400
PULSAR_PREFIX_openIDHttpConnectionTimeoutMillis=10000
PULSAR_PREFIX_openIDHttpReadTimeoutMillis=10000

# The number of seconds to wait before refreshing the JWKS when a token presents a key ID (kid claim) that is not
# in the cache. This setting is available from Pulsar 3.0.1 and is documented below.
PULSAR_PREFIX_openIDKeyIdCacheMissRefreshSeconds=300

# Whether to require that issuers use HTTPS. It is part of the OIDC spec to use HTTPS, so the default is true.
# This setting is for testing purposes and is not recommended for any production environment.
PULSAR_PREFIX_openIDRequireIssuersUseHttps=true

# A setting describing how to handle discovery of the OpenID Connect configuration document when the issuer is not
# in the list of allowed issuers. This setting is documented below.
PULSAR_PREFIX_openIDFallbackDiscoveryMode=DISABLED
```

:::note

When using OIDC for a client connecting through the proxy to the broker, it is necessary to set the broker's `openIDAcceptedTimeLeewaySeconds` to double the proxy's `authenticationRefreshCheckSeconds` configuration because the proxy caches the client's token and only refreshes it when it is expired. As such, in certain cases, when the proxy initiates a new connection to the broker, the token may not yet be expired in the proxy, but may be expired when it reaches the broker. You can mitigate this edge case by setting the broker's `openIDAcceptedTimeLeewaySeconds` correctly.

:::

:::note
The Pulsar WebSocket Proxy does not yet support OpenID Connect authentication. Here is an issue tracking this feature: [#20236](https://github.com/apache/pulsar/issues/20236).
:::

### Signing Key Rotation

:::note

This feature is available from Pulsar 3.0.1.

:::

The [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html) spec gives the `AuthenticationProviderOpenID` a way to discover trusted public keys. The public keys are formatted as a [JSON Web Key (JWK)](https://www.rfc-editor.org/rfc/rfc7517) set, also known as a JWKS. When the Identity Provider rotates signing keys, there is a chance that the Identity Provider will start signing tokens with the new key before the JWKS cache has been refreshed. To avoid rejecting tokens signed with the new key, the OIDC Authentication Provider will attempt to refresh the JWKS when a token has a trusted issuer claim but the key ID (kid claim) is not in the issuer's cached JWKS. The `openIDKeyIdCacheMissRefreshSeconds` setting determines how long the OIDC Authentication Provider will wait before attempting to refresh the JWKS. The default value is 300 seconds. It means that a JWKS must have been in the cache for at least 300 seconds before a missing key ID triggers cache invalidation. The `openIDKeyIdCacheMissRefreshSeconds` setting protects the OIDC Authentication Provider from a malicious client that presents a token with a new key ID every time it connects.

## Enable OpenID Connect Authentication in the Function Worker

To configure the Pulsar Function Worker to authenticate clients using OpenID Connect, add the following parameters to the `conf/functions_worker.yml` file. The documentation for these settings is [above](#enable-openid-connect-authentication-in-the-brokers-proxies-and-websocket-proxies).

```yaml
# Configuration to enable authentication
authenticationEnabled: true
authenticationProviders: ["org.apache.pulsar.broker.authentication.oidc.AuthenticationProviderOpenID"]
properties:
  openIDAllowedTokenIssuers: "https://my-issuer-1.com,https://my-issuer-2.com"
  openIDAllowedAudiences: "audience-1,audience-2"
  # Note: for 3.0.0, only include when using a custom trust store
  openIDTokenIssuerTrustCertsFilePath: "/my/custom/trust/store"
  openIDRoleClaim: "sub"
  openIDAcceptedTimeLeewaySeconds: 0
  openIDCacheSize: 5
  openIDCacheRefreshAfterWriteSeconds: 64800
  openIDCacheExpirationSeconds: 86400
  openIDHttpConnectionTimeoutMillis: 10000
  openIDHttpReadTimeoutMillis: 10000
  openIDRequireIssuersUseHttps: true
  openIDFallbackDiscoveryMode: "DISABLED"
```

## Enable Custom OpenID Connect Integration with Kubernetes

Kubernetes has a built-in OpenID Connect integration where [Service Account Token Volume Projections](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#serviceaccount-token-volume-projection) can easily be mounted into pods as signed JWTs that can be used as OpenID Connect access tokens. The only drawback is that the [Kubernetes token issuer discovery](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#service-account-issuer-discovery) feature is not completely compliant with the OpenID Spec (as their documentation explicitly mentions). To account for these discrepancies, Pulsar uses the `openIDFallbackDiscoveryMode` setting to integrate with Kubernetes while technically breaking the spec in documented ways.

The modes configure how the Open ID Connect Authentication Provider should handle a JWT that has an issuer claim that is not explicitly in the allowed issuers set configured by `openIDAllowedTokenIssuers`. The current implementations rely on using the Kubernetes API Server's Open ID Connect features to discover an additional issuer or additional public keys to trust.

The available values for `openIDFallbackDiscoveryMode` are: `DISABLED`, `KUBERNETES_DISCOVER_TRUSTED_ISSUER`, and `KUBERNETES_DISCOVER_PUBLIC_KEYS`. The quick summary is that EKS requires `KUBERNETES_DISCOVER_TRUSTED_ISSUER` right now, but GKE and AKS require `KUBERNETES_DISCOVER_PUBLIC_KEYS`. The implementation details follow.

1. `DISABLED`: There will be no discovery of additional trusted issuers or public keys. This setting requires that operators explicitly allow all issuers that will be trusted. For the Kubernetes Service Account Token Projections to work, the operator must explicitly trust the issuer on the token's `iss` claim. This is the default setting because it is the only mode that explicitly follows the OIDC spec for verification of discovered provider configuration.
2. `KUBERNETES_DISCOVER_TRUSTED_ISSUER`: The Kubernetes API Server will be used to discover an additional trusted issuer by getting the issuer at the API Server's `/.well-known/openid-configuration` endpoint, verifying that issuer matches the `iss` claim on the supplied token, then treating that issuer as a trusted issuer by discovering the `jwks_uri` via that issuer's `/.well-known/openid-configuration` endpoint. This mode can be helpful in EKS environments where the API Server's public keys served at the `/openid/v1/jwks` endpoint are not the same as the public keys served at the issuer's `jwks_uri`. It fails to be OIDC compliant because the URL used to discover the provider configuration is not the same as the issuer claim on the token.
3. `KUBERNETES_DISCOVER_PUBLIC_KEYS`: The Kubernetes API Server will be used to discover an additional set of valid public keys by getting the issuer at the API Server's `/.well-known/openid-configuration` endpoint, verifying that issuer matches the `iss` claim on the supplied token, then calling the API Server endpoint to get the public keys using a Kubernetes client. This mode is currently useful for getting the public keys from the API Server because the API Server requires custom TLS and authentication, and the Kubernetes client automatically handles those. It fails to be OIDC compliant because the URL used to discover the provider configuration is not the same as the issuer claim on the token.

:::note

When deploying with either `KUBERNETES_DISCOVER_TRUSTED_ISSUER` or `KUBERNETES_DISCOVER_PUBLIC_KEYS`, you will likely encounter an error like the following `forbidden: User \"system:serviceaccount:pulsar:superuser\" cannot get path \"/.well-known/openid-configuration/\"`. That error is a result of https://github.com/kubernetes/kubernetes/issues/117455, which happens because the `AuthenticationProviderOpenID` plugin uses the Java Kubernetes client to connect to the Kubernetes API Server. The solution, which is minimally invasive, is to run the following command against your target Kubernetes cluster:

```bash
kubectl patch clusterrole system:service-account-issuer-discovery --patch '{"rules":[{"nonResourceURLs":["/.well-known/openid-configuration/","/.well-known/openid-configuration","/openid/v1/jwks/","/openid/v1/jwks"],"verbs":["get"]}]}'
```

:::

## Configuring Pulsar Components and Applications to use Projected Service Account Tokens to Authenticate with other Pulsar Components

To leverage [Service Account Token Volume Projections](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#serviceaccount-token-volume-projection) in your pulsar components, follow the Kubernetes documentation on mounting service account tokens and then configure the pulsar components to use the token with the following config:

```properties
brokerClientAuthenticationPlugin=org.apache.pulsar.client.impl.auth.AuthenticationToken
brokerClientAuthenticationParameters=file:///path/to/mounted/token
```

We use the `AuthenticationToken` client plugin because Kubernetes automatically retrieves and refreshes the token for us. The `AuthenticationToken` works because it always reads the token from the filesystem, which ensures that it will always read the latest token.

## Enabling AuthenticationProviderOpenID Connect and AuthenticationProviderToken Simultaneously

In order to simplify migration from Static JWTs to OIDC Authentication, it is possible to configure both the `AuthenticationProviderOpenID` and `AuthenticationProviderToken` simultaneously. This allows for a seamless transition from static JWTs to OIDC tokens. The `AuthenticationProviderToken` will be used to authenticate clients that do not provide an OIDC token, and the `AuthenticationProviderOpenID` will be used to authenticate clients that do provide an OIDC token.


## Configure OIDC authentication in Pulsar Clients and CLI Tools

The Pulsar OAuth2 client plugin can be used for clients that rely on the Client Credentials Flow for OIDC. See the [OAuth2 Client](security-oauth2.md#configure-oauth2-authentication-in-pulsar-clients) documentation for configuring clients to integrate with Pulsar Servers running with the OIDC Authentication Provider.
