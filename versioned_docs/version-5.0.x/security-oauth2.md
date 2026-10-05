---
id: security-oauth2
title: Authentication using OAuth 2.0 access tokens
sidebar_label: "Authentication using OAuth 2.0 access tokens"
description: Get a comprehensive understanding of concepts and configuration methods of OAuth authentication in Pulsar.
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

Pulsar supports authenticating clients using OAuth 2.0 access tokens. Using an access token obtained from an OAuth 2.0 authorization service (acts as a token issuer), you can identify a Pulsar client and associate it with a "principal" (or "role") that is permitted to do some actions, such as publishing messages to a topic or consuming messages from a topic.

After communicating with the OAuth 2.0 server, the Pulsar client gets an access token from the server and passes this access token to brokers for authentication. By default, brokers can use the `org.apache.pulsar.broker.authentication.AuthenticationProviderToken`. Alternatively, you can customize the value of `AuthenticationProvider`.

## Enable OAuth2 authentication on brokers/proxies

To configure brokers/proxies to authenticate clients using OAuth2, add the following parameters to the `conf/broker.conf` and the `conf/proxy.conf` file. If you use a standalone Pulsar, you need to add these parameters to the `conf/standalone.conf` file:

```properties
# Configuration to enable authentication
authenticationEnabled=true
authenticationProviders=org.apache.pulsar.broker.authentication.AuthenticationProviderToken

# Authentication settings of the broker itself. Used when the broker connects to other brokers, or when the proxy connects to brokers, either in same or other clusters
brokerClientAuthenticationPlugin=org.apache.pulsar.client.impl.auth.oauth2.AuthenticationOAuth2
brokerClientAuthenticationParameters={"privateKey":"file:///path/to/privateKey","audience":"https://broker.example.com","issuerUrl":"https://issuer.example.com"}
# brokerClientAuthenticationParameters={"privateKey":"data:application/json;base64,privateKey-body-to-base64","audience":"https://broker.example.com","issuerUrl":"https://issuer.example.com"}

# If using secret key (Note: key files must be DER-encoded)
tokenSecretKey=file:///path/to/secret.key
# The key can also be passed inline:
# tokenSecretKey=data:;base64,FLFyW0oLJ2Fi22KKCm21J18mbAdztfSHN/lAT5ucEKU=

# If using public/private (Note: key files must be DER-encoded)
# tokenPublicKey=file:///path/to/public.key
```

## Configure OAuth2 authentication in Pulsar clients

You can use the OAuth2 authentication provider with the following Pulsar clients.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"},{"label":"C++","value":"C++"},{"label":"Node.js","value":"Node.js"},{"label":"Go","value":"Go"}]}>
<TabItem value="Java">

```java
import org.apache.pulsar.client.impl.auth.oauth2.AuthenticationFactoryOAuth2;

URL issuerUrl = new URL("https://issuer.example.com");
URL credentialsUrl = new URL("file:///path/to/KeyFile.json");
String audience = "https://broker.example.com";

PulsarClient client = PulsarClient.builder()
    .serviceUrl("pulsar://broker.example.com:6650/")
    .authentication(
        AuthenticationFactoryOAuth2.clientCredentialsBuilder().issuerUrl(issuerUrl)
          .credentialsUrl(credentialsUrl).audience(audience).build())
    .build();
```

In addition, you can also use the encoded parameters to configure authentication for Pulsar Java client.

```java
Authentication auth = AuthenticationFactory
    .create(AuthenticationOAuth2.class.getName(), """
        {"type":"client_credentials","privateKey":"file:///path/to/KeyFile.json",
         "issuerUrl":"https://issuer.example.com","audience":"pulsar"}
        """);
PulsarClient client = PulsarClient.builder()
    .serviceUrl("pulsar://broker.example.com:6650/")
    .authentication(auth)
    .build();
```

### Mutual TLS at the token endpoint

The Java client supports `tls_client_auth` for the OAuth2 token endpoint. Register the client's certificate with an authorization server that supports this method, then configure its certificate and private key:

```java
import org.apache.pulsar.client.api.Authentication;
import org.apache.pulsar.client.impl.auth.oauth2.protocol.TokenEndpointAuthMethod;

Authentication auth = AuthenticationFactoryOAuth2.clientCredentialsBuilder()
    .issuerUrl(new URL("https://issuer.example.com"))
    .tokenEndpointAuthMethod(TokenEndpointAuthMethod.TLS_CLIENT_AUTH)
    .clientId("pulsar-application")
    .tlsCertFile("/path/to/client-cert.pem")
    .tlsKeyFile("/path/to/client-key.pem")
    .trustCertsFilePath("/path/to/issuer-ca.pem")
    .audience("pulsar")
    .build();
```

Pass this authentication object to the Pulsar client builder. This certificate authenticates the client to the OAuth2 server; the Pulsar connection uses the resulting access token. Configure TLS for the Pulsar connection separately.

For encoded authentication parameters or CLI tools, set `tokenEndpointAuthMethod` to `tls_client_auth`, with `tlsCertFile`, `tlsKeyFile`, and the authorization server's `clientId`. The `privateKey` JSON credentials URL is used by the default `client_secret_post` method and is not required for `tls_client_auth`. If omitted, `clientId` defaults to `pulsar-client`.

### Refresh tokens before expiry

The Java client can refresh access tokens in the background. Set `.earlyTokenRefreshPercent(0.8)` on the authentication builder, or `"earlyTokenRefreshPercent":"0.8"` in encoded parameters, to begin refreshing after 80% of the token's lifetime. Failed refresh attempts retry with backoff while the current token remains valid. This does not extend token validity during an authorization-server outage.

The default is `1`, which disables early refresh; values must be greater than zero, and values greater than or equal to `1` disable it. The client supplies a shared background scheduler when early refresh is enabled. If you provide your own scheduler with `.scheduler(...)`, your application owns its shutdown.

</TabItem>
<TabItem value="Python">

```python
from pulsar import Client, AuthenticationOauth2

params = '''
{
    "issuer_url": "https://issuer.example.com",
    "private_key": "/path/to/privateKey",
    "audience": "https://broker.example.com"
}
'''

client = Client("pulsar://my-cluster:6650", authentication=AuthenticationOauth2(params))
```

</TabItem>
<TabItem value="C++">

```cpp
#include <pulsar/Client.h>

pulsar::ClientConfiguration config;
std::string params = R"({
    "issuer_url": "https://issuer.example.com",
    "private_key": "../../pulsar-broker/src/test/resources/authentication/token/cpp_credentials_file.json",
    "audience": "https://broker.example.com"})";

config.setAuth(pulsar::AuthOauth2::create(params));

pulsar::Client client("pulsar://broker.example.com:6650/", config);
```

</TabItem>
<TabItem value="Node.js">

```javascript
    const Pulsar = require('pulsar-client');
    const issuer_url = process.env.ISSUER_URL;
    const private_key = process.env.PRIVATE_KEY;
    const audience = process.env.AUDIENCE;
    const scope = process.env.SCOPE;
    const service_url = process.env.SERVICE_URL;
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    (async () => {
      const params = {
        issuer_url: issuer_url
      }
      if (private_key.length > 0) {
        params['private_key'] = private_key
      } else {
        params['client_id'] = client_id
        params['client_secret'] = client_secret
      }
      if (audience.length > 0) {
        params['audience'] = audience
      }
      if (scope.length > 0) {
        params['scope'] = scope
      }
      const auth = new Pulsar.AuthenticationOauth2(params);
      // Create a client
      const client = new Pulsar.Client({
        serviceUrl: service_url,
        tlsAllowInsecureConnection: true,
        authentication: auth,
      });
      await client.close();
    })();
```

:::note

The support for OAuth2 authentication is only available in Node.js client 1.6.2 and later versions.

:::

</TabItem>
<TabItem value="Go">

```go
oauth := pulsar.NewAuthenticationOAuth2(map[string]string{
		"type":       "client_credentials",
		"issuerUrl":  "https://issuer.example.com",
		"audience":   "https://broker.example.com",
		"privateKey": "/path/to/privateKey",
		"clientId":   "0Xx...Yyxeny",
	})
client, err := pulsar.NewClient(pulsar.ClientOptions{
		URL:              "pulsar://my-cluster:6650",
		Authentication:   oauth,
})
```

</TabItem>
</Tabs>
````

## Configure OAuth2 authentication in CLI tools

This section describes how to use Pulsar CLI tools to connect a cluster through OAuth2 authentication plugin.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"pulsar-client","value":"pulsar-client"},{"label":"pulsar-perf","value":"pulsar-perf"}]}>
<TabItem value="pulsar-admin">

```shell
bin/pulsar-admin --admin-url https://streamnative.cloud:443 \
    --auth-plugin org.apache.pulsar.client.impl.auth.oauth2.AuthenticationOAuth2 \
    --auth-params '{"privateKey":"file:///path/to/key/file.json",
        "issuerUrl":"https://issuer.example.com",
        "audience":"https://broker.example.com"}' \
    tenants list
```

</TabItem>
<TabItem value="pulsar-client">

```shell
bin/pulsar-client \
    --url SERVICE_URL \
    --auth-plugin org.apache.pulsar.client.impl.auth.oauth2.AuthenticationOAuth2 \
    --auth-params '{"privateKey":"file:///path/to/key/file.json",
        "issuerUrl":"https://issuer.example.com",
        "audience":"https://broker.example.com"}' \
    produce test-topic -m "test-message" -n 10
```

</TabItem>
<TabItem value="pulsar-perf">

```shell
bin/pulsar-perf produce --service-url pulsar+ssl://streamnative.cloud:6651 \
    --auth-plugin org.apache.pulsar.client.impl.auth.oauth2.AuthenticationOAuth2 \
    --auth-params '{"privateKey":"file:///path/to/key/file.json",
        "issuerUrl":"https://issuer.example.com",
        "audience":"https://broker.example.com"}' \
    -r 1000 -s 1024 test-topic
```

</TabItem>
</Tabs>
````

* Set the `admin-url` parameter to the Web service URL. A Web service URL is a combination of the protocol, hostname and port ID, such as `pulsar://localhost:6650`.
* Set the `privateKey`, `issuerUrl`, and `audience` parameters to the values based on the configuration in the key file. For details, see [authentication types](#authentication-types).

## Authentication types

Currently, Pulsar clients only support the `client_credentials` authentication type. The authentication type determines how to obtain an access token through an OAuth 2.0 authorization service.

The following table outlines the parameters of the `client_credentials` authentication type.

| Parameter | Description | Example | Required or not |
| --- | --- | --- | --- |
| `type` | OAuth 2.0 authentication type. |  `client_credentials` (default) | Optional |
| `issuerUrl` | The URL of the authentication provider which allows the Pulsar client to obtain an access token. | `https://accounts.google.com` | Required |
| `privateKey` | The URL to the JSON credentials file.  | Support the following pattern formats: <br /> <li> `file:///path/to/file` </li><li>`file:/path/to/file` </li><li> `data:application/json;base64,<base64-encoded value>` </li>| Required for `client_secret_post` |
| `audience`  | The OAuth 2.0 "resource server" identifier for a Pulsar cluster. | `https://broker.example.com` | Optional |
| `scope` |  The scope of an access request. <br />For more information, see [access token scope](https://datatracker.ietf.org/doc/html/rfc6749#section-3.3). | api://pulsar-cluster-1/.default | Optional |
| `connectTimeout` | The HTTP connection timeout with [java.time.Duration](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Duration.html#parse(java.lang.CharSequence)) format. Default value: `PT10S`. Only implemented in java client. | PT10S | Optional |
| `readTimeout` | The HTTP read timeout with [java.time.Duration](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Duration.html#parse(java.lang.CharSequence)) format. Default value: `PT30S`. Only implemented in java client. | PT30S | Optional |
| `trustCertsFilePath` | The path to the file containing the trusted certificate(s) of the token issuer. If not set, uses the default trust store of the JVM. Only implemented in java client. | /path/to/file | Optional |
| `wellKnownMetadataPath` | The path to the authorization server metadata. If not set, uses the well-known URI suffix of OIDC. If you use `/.well-known/oauth-authorization-server`, the preconfigured `AuthenticationOAuth2StandardAuthzServer` class and `clientCredentialsWithStandardAuthzServerBuilder` builder is useful. Only implemented in java client.| /.well-known/path | Optional |

For `client_secret_post`, the credentials file `credentials_file.json` contains the service account credentials. The following is an example of the credentials file. The authentication type is set to `client_credentials` by default. And the fields "client_id" and "client_secret" are required.

```json
{
  "type": "client_credentials",
  "client_id": "d9ZyX97q1ef8Cr81WHVC4hFQ64vSlDK3",
  "client_secret": "on1uJ...k6F6R",
  "client_email": "1234567890-abcdefghijklmnopqrstuvwxyz@developer.gserviceaccount.com",
  "issuer_url": "https://accounts.google.com"
}
```

The following is an example of a typical original OAuth2 request, which is used to obtain an access token from the OAuth2 server.

```bash
curl --request POST \
  --url https://issuer.example.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{
  "client_id":"YOUR_CLIENT_ID",
  "client_secret":"YOUR_CLIENT_SECRET",
  "audience":"https://broker.example.com",
  "grant_type":"client_credentials"}'
```

In the above example, the mapping relationship is shown below.
- The `issuerUrl` parameter is mapped to `--url https://issuer.example.com`.
- The `privateKey` parameter should contain the `client_id` and `client_secret` fields at least.
- The `audience` parameter is mapped to  `"audience":"https://broker.example.com"`. This field is only used by some identity providers.
