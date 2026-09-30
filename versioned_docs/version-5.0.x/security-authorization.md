---
id: security-authorization
title: Authentication and authorization in Pulsar
sidebar_label: "Authorization and ACLs"
description: Get a comprehensive understanding of authentication and authorization in Pulsar.
---


In Pulsar, the [authentication provider](security-overview.md#authentication) is responsible for properly identifying clients and associating the clients with role tokens. If you only enable authentication, an authenticated role token can access all resources in the cluster. *Authorization* is the process that determines _what_ clients can do.

The role tokens with the most privileges are the *superusers*. The *superusers* can create and destroy tenants, along with having full access to all tenant resources.

When a superuser creates a [tenant](reference-terminology.md#tenant), that tenant is assigned an admin role. A client with the admin role token can then create, modify and destroy namespaces, and grant and revoke permissions to *other role tokens* on those namespaces.

## Broker and Proxy Setup

### Enable authorization and assign superusers
You can enable the authorization and assign the superusers in the broker ([`conf/broker.conf`](reference-configuration.md#broker) or `conf/standalone.conf`) configuration files.

```conf
authorizationEnabled=true
superUserRoles=broker_client,admin,proxy,<custom-super-user-1>,<custom-super-user-2>
```

> A full list of parameters is available in the `conf/broker.conf` or `conf/standalone.conf` file.
> You can also find the default values for those parameters in [Broker Configuration](reference-configuration.md).

Typically, you use superuser roles for administrators, clients as well as broker-to-broker authorization. When you use [geo-replication](concepts-replication.md), every broker needs to be able to publish to all the other topics of clusters.

You can also enable the authorization for the proxy in the proxy configuration file (`conf/proxy.conf`). Once you enable the authorization on the proxy, the proxy does an additional authorization check before forwarding the request to a broker.
If you enable authorization on the broker, the broker checks the authorization of the request when the broker receives the forwarded request.

### Proxy Roles

The proxy authenticates the client, then authenticates its own connection to the broker using the credentials configured in `proxy.conf`. These identities are separate: the authenticated proxy role identifies the gateway, while the *original principal* identifies the client whose operation it forwards.

Pulsar uses *Proxy roles* to enable the authentication. Proxy roles are specified in the broker configuration file, [`conf/broker.conf`](reference-configuration.md). If a client that is authenticated with a broker is one of its `proxyRoles`, all requests from that client must also carry information about the role of the client that is authenticated with the proxy. This information is called the *original principal*. If the *original principal* is absent, the client is not able to access anything.

Note that if a Proxy is not correctly configured to use a role that is in the `proxyRoles`, the connection will get rejected.

You must authorize both the *proxy role* and the *original principal* to access a resource to ensure that the resource is accessible via the proxy. Administrators can take two approaches to authorize the *proxy role* and the *original principal*.

The more secure approach is to grant access to the proxy roles each time you grant access to a resource. For example, if you have a proxy role named `proxy1`, when the superuser creates a tenant, you should specify `proxy1` as one of the admin roles. When a role is granted permission to produce or consume from a namespace, if that client wants to produce or consume through a proxy, you should also grant `proxy1` the same permissions.

Another approach is to make the proxy role a superuser. This allows the proxy to access all resources. The client still needs to authenticate with the proxy, and all requests made through the proxy have their role downgraded to the *original principal* of the authenticated client. However, if the proxy is compromised, a bad actor could get full access to your cluster.

You can specify the roles as proxy roles in [`conf/broker.conf`](reference-configuration.md#broker).

```properties
proxyRoles=proxy,<my-proxy-role>
```

Brokers default to `authenticateOriginalAuthData=true`: they also authenticate the client's forwarded credentials. For authentication methods with replayable credentials, such as tokens, set `forwardAuthorizationCredentials=true` in `proxy.conf` so the broker receives that data.

For **TLS client-certificate authentication or SASL through a proxy**, explicitly set `authenticateOriginalAuthData=false` in `broker.conf`. The broker's TLS connection presents the proxy's certificate, and a SASL handshake cannot be replayed as a separate client-to-broker exchange. In this mode, the broker trusts the proxy's authenticated original principal and still authorizes the proxy role and original principal. Restrict `proxyRoles` to trusted proxies. See [Proxy authentication limitations](security-overview.md#authentication-data-limitations-on-the-proxies).

The same separation applies to proxied HTTP administration. Tenant administration requires **both** the proxy role and original principal to be a superuser or an administrator of the tenant. A tenant-admin proxy role alone does not authorize a client that lacks tenant-admin permission. Custom authorization providers receive the original principal's forwarded authentication data separately from the proxy's authentication data; do not use the proxy's credentials to establish the original client's permissions.

## Administer tenants

Pulsar [instance](reference-terminology.md#instance) administrators or some kind of self-service portal typically provisions a Pulsar [tenant](reference-terminology.md#tenant).

You can manage tenants using the [`pulsar-admin`](/reference/#/@pulsar:version_reference@/pulsar-admin/) tool.

### Create a new tenant

You can create a new tenant using the following command.

```shell
bin/pulsar-admin tenants create my-tenant \
    --admin-roles my-admin-role \
    --allowed-clusters us-west,us-east
```

This command creates a new tenant `my-tenant` that is allowed to use the clusters `us-west` and `us-east`.

A client that successfully identifies itself as having the role `my-admin-role` is allowed to perform all administrative tasks on this tenant.

The structure of topic names in Pulsar reflects the hierarchy between tenants, clusters, and namespaces:

```shell
persistent://tenant/namespace/topic
```

### Manage permissions

You can use [Pulsar Admin Tools](admin-api-permissions.md) for managing permission in Pulsar.

### Schema and transaction requests over the binary protocol

With authorization enabled, Pulsar checks topic permissions for binary schema requests. Fetching a schema requires the `LOOKUP` topic operation; registering a schema through `GetOrCreateSchema` requires `PRODUCE`. The standard `PulsarAuthorizationProvider` grants lookup through produce or consume access; there is no separate `LOOKUP` permission to grant. Custom authorization providers must handle these operations for schema requests as well as ordinary topic access. Proxied requests check both the proxy role and original principal, supplying the original authentication data to the provider when available.

With authorization enabled, registering a produced partition with the v4 transaction coordinator requires produce permission on that topic. Registering an acknowledged subscription with that coordinator requires consume permission for the topic and subscription. Owning the transaction does not by itself grant access to its participants. Test transactional applications with their actual roles, including any subscription-role or subscription-name restrictions.

### Subscription permissions for administrative operations

Pulsar applies namespace subscription-role grants and the `Prefix` subscription authorization mode to administrative subscription operations, including namespace unsubscribe and backlog clearing. A non-admin caller needs consume permission and must satisfy the restrictions for the named subscription. With `Prefix`, the subscription name must start with the authorized role. The checks also apply to anonymous roles and the original principal of a proxied request.

For non-admin callers, clearing backlog across a namespace or expiring messages across all subscriptions of a topic processes only the subscriptions that the caller may access; unauthorized subscriptions are skipped. A successful bulk request therefore does not mean every subscription was changed. Clearing replication-cursor backlog requires superuser or tenant-admin privileges. Review automation that previously relied on namespace consume permission alone, and verify the affected subscriptions after bulk operations.

### Pulsar admin authentication

```java
PulsarAdmin admin = PulsarAdmin.builder()
                    .serviceHttpUrl("http://broker:8080")
                    .authentication("com.org.MyAuthPluginClass", "param1:value1")
                    .build();
```

To use TLS:

```java
PulsarAdmin admin = PulsarAdmin.builder()
                    .serviceHttpUrl("https://broker:8080")
                    .authentication("com.org.MyAuthPluginClass", "param1:value1")
                    .tlsTrustCertsFilePath("/path/to/trust/cert")
                    .build();
```

## Authorize an authenticated client with multiple roles

When a token contains multiple roles, Pulsar can authorize an operation if any of those roles has the required permission. `MultiRolesTokenAuthorizationProvider` obtains the roles from the initialized authentication provider's validated token. Signature, time, and audience/issuer checks configured on that provider apply before additional roles are used.

:::note

This authorization method supports [JWT authentication](security-jwt.md) and [OpenID Connect authentication](security-openid-connect.md#authorize-multiple-roles). Authentication and authorization must both be enabled, with an initialized token or OpenID authentication provider.

:::

To enable this authorization method, configure the authorization provider as `MultiRolesTokenAuthorizationProvider` in the `conf/broker.conf` file.

```properties
authenticationEnabled=true
authorizationEnabled=true
authorizationProvider=org.apache.pulsar.broker.authorization.MultiRolesTokenAuthorizationProvider
# The claim used by the authorization provider. Its default is roles.
tokenAuthClaim=roles
```

Configure the corresponding authentication provider as well, including its verification keys or OIDC issuer/audience settings. The claim can contain a string or an array of strings. `AuthenticationProviderToken` normally uses `sub` for its single principal, while the multi-role provider defaults to `roles` when `tokenAuthClaim` is unset; configure the intended claim explicitly. For OIDC, use `openIDRoleClaim` for the authentication principal and `tokenAuthClaim` for multi-role authorization, typically naming the same claim.

For token/OIDC clients through a proxy, set `forwardAuthorizationCredentials=true` in `proxy.conf` and retain `authenticateOriginalAuthData=true` on the brokers so they can validate the original token and expand its roles. If only a forwarded principal is available, the broker authorizes that principal rather than inferring additional roles from the proxy's credentials. A token in a proxied HTTP request is used for additional original-client roles only when it authenticates as that original principal.
