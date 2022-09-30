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

All release notes of previous versions are available at [here](/release-notes/legacy).

## Client Release Notes

> **Tip**
> 
> The code repos of **Java, C++, Python, and WebSocket** clients are hosted in the [Pulsar main repo](https://github.com/apache/pulsar) and these clients are released with Pulsar. Their release notes of previous versions are parts of Pulsar release notes. You can check them out at [here](/release-notes/legacy).
> 
> The code repos of **Go, Node.js, and C#** clients are hosted outside of the Pulsar main repo and these clients are not released with Pulsar. They have independent release notes in their repos and all of them are synced to this page.

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
