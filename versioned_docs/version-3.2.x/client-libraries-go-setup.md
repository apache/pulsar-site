---
id: client-libraries-go-setup
title: Set up Pulsar Go client library
sidebar_label: "Set up"
description: Learn how to set up Go client library in Pulsar.
---

To set up Go client library in Pulsar, complete the following steps.

## Step 1: Install Go client library

You can install the `pulsar` library by using either `go get` or `go module`.

### Use `go get`

1. Download the library of Go client to your local environment:

   ```bash
   go get -u "github.com/apache/pulsar-client-go/pulsar"
   ```

2. Import it into your project:

   ```go
   import "github.com/apache/pulsar-client-go/pulsar"
   ```

### Use `go module`

1. Create a directory named `test_dir` and change your working directory to it.

   ```bash
   mkdir test_dir && cd test_dir
   ```

2. Write a sample script (such as `test_example.go`) in the `test_dir` directory and write `package main` at the beginning of the file.

   ```bash
   go mod init test_dir
   go mod tidy && go mod download
   go build test_example.go
   ./test_example
   ```

## Step 2: Connect to Pulsar cluster

To connect to Pulsar using client libraries, you need to specify a [Pulsar protocol](developing-binary-protocol.md) URL.

You can assign Pulsar protocol URLs to specific clusters and use the `pulsar` scheme. The following is an example of `localhost` with the default port `6650`:

```http
pulsar://localhost:6650
```

If you have multiple brokers, separate `IP:port` by commas:

```http
pulsar://localhost:6550,localhost:6651,localhost:6652
```

If you use [mTLS](security-tls-authentication.md) authentication, add `+ssl` in the scheme:

```http
pulsar+ssl://pulsar.us-west.example.com:6651
```