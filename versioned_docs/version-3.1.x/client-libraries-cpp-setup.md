---
id: client-libraries-cpp-setup
title: Set up Pulsar C++ client
sidebar_label: "Set up"
---

## Install C++ client library

Use one of the following methods to install a Pulsar C++ client.

### Brew

Use [Homebrew](http://brew.sh/) to install the latest tagged version with the library and headers:

```bash
brew install libpulsar
```

### Deb

1. Download any one of the Deb packages:

   <Tabs>
   <TabItem value="client">

   ```bash
   wget @pulsar:deb:client@
   ```

   This package contains shared libraries `libpulsar.so` and `libpulsarnossl.so`.

   </TabItem>
   <TabItem value="client-devel">

   ```bash
   wget @pulsar:deb:client-devel@
   ```

   This package contains static libraries: `libpulsar.a`, `libpulsarwithdeps.a`, and C/C++ headers.

   </TabItem>
   </Tabs>

2. Install the package using the following command:

   ```bash
   apt install ./apache-pulsar-client*.deb
   ```

Now, you can see Pulsar C++ client libraries installed under the `/usr/lib` directory.

### RPM

1. Download any one of the RPM packages:

   <Tabs>
   <TabItem value="client">

   ```bash
   wget @pulsar:dist_rpm:client@
   ```

   This package contains shared libraries: `libpulsar.so` and `libpulsarnossl.so`.

   </TabItem>
   <TabItem value="client-debuginfo">

   ```bash
   wget @pulsar:dist_rpm:client-debuginfo@
   ```

   This package contains debug symbols for `libpulsar.so`.

   </TabItem>
   <TabItem value="client-devel">

   ```bash
   wget @pulsar:dist_rpm:client-devel@
   ```

   This package contains static libraries: `libpulsar.a`, `libpulsarwithdeps.a` and C/C++ headers.

   </TabItem>
   </Tabs>

2. Install the package using the following command:

   ```bash
   rpm -ivh apache-pulsar-client*.rpm
   ```

Now, you can see Pulsar C++ client libraries installed under the `/usr/lib` directory.

:::note

If you get an error like "libpulsar.so: cannot open shared object file: No such file or directory" when starting a Pulsar client, you need to run `ldconfig` first.

:::

### APK

```bash
apk add --allow-untrusted ./apache-pulsar-client-*.apk
```

## Connect to Pulsar cluster

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