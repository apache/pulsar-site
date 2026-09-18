---
id: reference-rest-api-overview
title: Pulsar REST APIs and OpenAPI specifications
sidebar_label: "REST API / OpenAPI clients"
description: The Pulsar REST APIs, their OpenAPI specifications per release, and how to generate client bindings for other languages.
---

````mdx-code-block
import RestApiSpecTable from "@site/src/components/RestApiSpecTable";
````

A REST API (also known as RESTful API, REpresentational State Transfer Application Programming Interface) is a set of definitions and protocols for building and integrating application software, using HTTP requests to GET, PUT, POST, and DELETE data following the REST standards. In essence, REST API is a set of remote calls using standard methods to request and return data in a specific format between two systems.

Pulsar provides a variety of REST APIs that enable you to interact with Pulsar to retrieve information or perform an action.

| REST API category | Description |
| --- | --- |
| [Admin](/admin-rest-api/?version=@pulsar:rest_api_version@) | REST APIs for administrative operations.|
| [Functions](/functions-rest-api/?version=@pulsar:rest_api_version@) | REST APIs for function-specific operations.|
| [Sources](/source-rest-api/?version=@pulsar:rest_api_version@) | REST APIs for source-specific operations.|
| [Sinks](/sink-rest-api/?version=@pulsar:rest_api_version@) | REST APIs for sink-specific operations.|
| [Packages](/packages-rest-api/?version=@pulsar:rest_api_version@) | REST APIs for package-specific operations. A package can be a group of functions, sources, and sinks.|
| [Transactions](/transactions-rest-api/?version=@pulsar:rest_api_version@) | REST APIs for transaction-specific operations.|
| [Lookup](/lookup-rest-api/?version=@pulsar:rest_api_version@) | REST APIs for lookup-specific operations, such as getting the owner broker of a topic, getting the namespace bundle that a topic belongs to, and so on.|

## Automate with the REST API

The `pulsar-admin` CLI and the Java admin client are both clients of the REST API: everything they do is an HTTP request to a broker (or to a proxy in front of the brokers), so any tool that speaks HTTP can drive a Pulsar cluster without starting a JVM. This is the way to go for automation written in other languages, for operators and controllers, and for scripts that run inside a Kubernetes cluster, where a `curl` against the broker's web service port is cheaper than a `pulsar-admin` invocation.

The [Get started](admin-get-started.md) page shows how to call the endpoints with `curl`, including authentication. Most endpoints take JSON or nothing at all; the ones that upload a package (creating or updating functions, sources and sinks) take a `multipart/form-data` request whose configuration part must carry the `application/json` content type, see [Create a function](admin-api-functions.md#create-a-function) for a worked `curl` example. For example, the following requests unload a bundle to a chosen broker and pause automatic load shedding, two of the operations used in a [rolling upgrade of brokers](administration-rolling-upgrade.md):

```shell
# equivalent to: pulsar-admin namespaces unload my-tenant/my-namespace --bundle 0x00000000_0x08000000 --destinationBroker broker-2.example.com:8080
curl -X PUT "http://broker.example.com:8080/admin/v2/namespaces/my-tenant/my-namespace/0x00000000_0x08000000/unload?destinationBroker=broker-2.example.com:8080"

# equivalent to: pulsar-admin brokers update-dynamic-config --config loadBalancerSheddingEnabled --value false
curl -X POST "http://broker.example.com:8080/admin/v2/brokers/configuration/loadBalancerSheddingEnabled/false"
```

### OpenAPI specifications

Since Pulsar 5.0, the REST API is described by [OpenAPI 3](https://spec.openapis.org/oas/v3.0.1) documents that are generated from the broker source code for every release and published together with this site. Each Pulsar version has its own directory, `https://pulsar.apache.org/openapi/<version>/` (for the version this page documents: [`@pulsar:rest_api_spec_dir@`](pathname://@pulsar:rest_api_spec_dir@); the `master` directory follows the development branch), with one document per REST API category:

| Document | REST API | Base path |
| --- | --- | --- |
| [`openapi.json`](pathname://@pulsar:rest_api_spec_dir@openapi.json) | Admin | `/admin/v2` |
| [`openapilookup.json`](pathname://@pulsar:rest_api_spec_dir@openapilookup.json) | Lookup | `/lookup/v2` |
| [`openapifunctions.json`](pathname://@pulsar:rest_api_spec_dir@openapifunctions.json) | Functions | `/admin/v3` |
| [`openapisource.json`](pathname://@pulsar:rest_api_spec_dir@openapisource.json) | Sources | `/admin/v3` |
| [`openapisink.json`](pathname://@pulsar:rest_api_spec_dir@openapisink.json) | Sinks | `/admin/v3` |
| [`openapipackages.json`](pathname://@pulsar:rest_api_spec_dir@openapipackages.json) | Packages | `/admin/v3` |
| [`openapitransactions.json`](pathname://@pulsar:rest_api_spec_dir@openapitransactions.json) | Transactions | `/admin/v3` |

For example, the admin API of Pulsar @pulsar:version:latest-v5plus@ is [`https://pulsar.apache.org/openapi/@pulsar:version:latest-v5plus@/openapi.json`](https://pulsar.apache.org/openapi/@pulsar:version:latest-v5plus@/openapi.json). This document at the root of the version directory describes the current `/admin/v2` admin API; there is no separate v1 document, as the v1 admin API no longer exists. The functions, sources, sinks, packages and transactions APIs are described only by their own `/admin/v3` documents, not by the admin document, so a client that manages them needs those documents in addition to `openapi.json`. The `v2/` and `v3/` subdirectories contain byte-identical copies of the same documents, grouped by the REST API base path (`/admin/v2` and `/lookup/v2` in `v2/`, `/admin/v3` in `v3/`); they are neither older API versions nor different OpenAPI versions, so use whichever path is more convenient. Releases before 5.0 publish Swagger 2.0 documents under `https://pulsar.apache.org/swagger/<version>/` instead.

The specifications are the same documents that render the REST API reference pages listed above, so you can also download the spec for a version from the reference page. Tools such as Postman or Insomnia can import them directly to explore and test the API.

### Download the specifications

The development branch and the newest release of every [maintained release line](https://pulsar.apache.org/contribute/release-policy/#supported-versions). Older releases keep their documents under the same directory layout.

<RestApiSpecTable />

### Generate a client from the specification

With an OpenAPI 3 document, a client library for the admin API can be generated for most languages instead of being written by hand. [OpenAPI Generator](https://openapi-generator.tech/) supports [more than fifty client generators](https://openapi-generator.tech/docs/generators#client-generators), including Go, Python, TypeScript, Rust, C#, Kotlin and Java. For example, to generate a Python client for the admin API of the version this page documents:

```shell
openapi-generator-cli generate \
    -i https://pulsar.apache.org@pulsar:rest_api_spec_dir@openapi.json \
    -g python \
    -o ./pulsar-admin-python
```

The generated client takes the broker's web service URL as its base path and lets you add the authentication header of your [authentication provider](security-overview.md), for example a bearer token. Regenerate it when you upgrade Pulsar, so that new endpoints and parameters become available; the REST API keeps backward compatibility across versions, so a client generated from an older specification keeps working against newer brokers.

## Related REST endpoints

### Create functions, sources and sinks

Creating or updating a function, source or sink is the one part of the admin API that is not a plain JSON request: the endpoint takes a `multipart/form-data` request with the configuration as a JSON part (which must carry the `application/json` content type) and the package as a file part or a package URL, or `builtin://<name>` in the configuration for a built-in function or connector. See [Create a function](admin-api-functions.md#create-a-function) for a worked `curl` example and the details; sources and sinks use the same shape with a `sourceConfig` or `sinkConfig` part.

### Produce messages over HTTP

The brokers also accept messages over HTTP on the same web service port: `POST /topics/persistent/{tenant}/{namespace}/{topic}` (or `/partitions/{n}` for one partition of a partitioned topic) with a JSON body that carries the messages and, optionally, the schema to encode them with. This is a data-path endpoint for applications that cannot use a client library, not part of the admin API, and it is not included in the OpenAPI documents above. It is documented in [Pulsar REST](/docs/client-libraries/rest) under the client libraries.

