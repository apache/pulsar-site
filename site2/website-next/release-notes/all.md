---
id: all
title: All Releases
sidebar_label: All Releases
slug: /
---

````mdx-code-block
import PulsarReleaseTable from "../src/components/PulsarReleaseTable";
import ClientReleaseTable from "../src/components/ClientReleaseTable";
const pulsar = require(`../data/release-pulsar.js`);
const java = require(`../data/release-java.js`);
const python = require(`../data/release-python.js`);
const cpp = require(`../data/release-cpp.js`);
const ws = require(`../data/release-ws.js`);
const golang = require(`../data/release-go.js`);
const node = require(`../data/release-node.js`);
const cs = require(`../data/release-cs.js`);
````

## Pulsar Release Notes

````mdx-code-block
<PulsarReleaseTable data={pulsar} />
````

### Previous versions

All release notes of previous versions are available [here](/release-notes/legacy).

## Client Release Notes

> **Tip**
>
> - The code repos of **Java and WebSocket** clients are hosted in the [Pulsar main repo](https://github.com/apache/pulsar). These clients are released with Pulsar. 
>
> - The code repos of **[C++](https://github.com/apache/pulsar-client-cpp), [Python](https://github.com/apache/pulsar-client-python), [Go](https://github.com/apache/pulsar-client-go), [Node.js](https://github.com/apache/pulsar-client-node), and [C#](https://github.com/apache/pulsar-dotpulsar)** clients are hosted outside of the Pulsar main repo. These clients are not released with Pulsar.
>
> - All clients have [independent release notes](release-notes/versioned) and they are automatically synced to this page.

### Java

````mdx-code-block
<ClientReleaseTable data={java} />
````

### Python

````mdx-code-block
<ClientReleaseTable data={python} />
````

### C++

````mdx-code-block
<ClientReleaseTable data={cpp} />
````

### WebSocket

````mdx-code-block
<ClientReleaseTable data={ws} />
````

### Go

````mdx-code-block
<ClientReleaseTable data={golang} />
````

### NodeJs

````mdx-code-block
<ClientReleaseTable data={node} />
````

### C#

````mdx-code-block
<ClientReleaseTable data={cs} />
````
