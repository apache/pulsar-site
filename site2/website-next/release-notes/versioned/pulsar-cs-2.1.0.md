---
id: pulsar-cs-2.1.0
title: Pulsar DotPulsar
sidebar_label: Pulsar DotPulsar
---
 

## Added

- Support for on the fly authentication (AuthChallenge)
- The IAuthentication interface for implementing custom authentication
- IPulsarClientBuilder.Authentication(IAuthentication authentication) for using custom authentication
- The AuthenticationFactory with support for:
    - Token(string token)
    - Token(Func\<CancellationToken, ValueTask\<string\>\> tokenSupplier)

## Deprecated

- IPulsarClientBuilder.AuthenticateUsingToken(string token) is marked as obsolete. Use Authentication(AuthenticationFactory.Token(...)) instead


