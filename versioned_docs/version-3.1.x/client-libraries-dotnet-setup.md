---
id: client-libraries-dotnet-setup
title: Set up C# client
sidebar_label: "Set up"
---

## Install C# client library

This section describes how to install the Pulsar C# client library through the dotnet CLI.

Alternatively, you can install the Pulsar C# client library through Visual Studio. Note that starting from Visual Studio 2017, the dotnet CLI is automatically installed with any .NET Core related workloads. For more information, see [Microsoft documentation](https://docs.microsoft.com/en-us/visualstudio/mac/nuget-walkthrough?view=vsmac-2019).

To install the Pulsar C# client library using the dotnet CLI, follow these steps:

1. Install the [.NET Core SDK](https://dotnet.microsoft.com/download/), which provides the dotnet CLI.

2. Create a project.

   1. Create a folder for the project.

   2. Open a terminal window and switch to the new folder.

   3. Create the project using the following command.

       ```
       dotnet new console
       ```

   4. Use `dotnet run` to test that the app has been created properly.

3. Add the DotPulsar NuGet package.

   1. Use the following command to install the `DotPulsar` package.

       ```
       dotnet add package DotPulsar
       ```

   2. After the command completes, open the `.csproj` file to see the added reference.

       ```xml
       <ItemGroup>
         <PackageReference Include="DotPulsar" Version="2.0.1" />
       </ItemGroup>
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