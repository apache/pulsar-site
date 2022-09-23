---
id: all
title: All Releases
sidebar_label: All Releases
slug: /
---

````mdx-code-block
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const rows = require(`../data/release-table.js`);
````

## Pulsar Release Notes

````mdx-code-block
<TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small">
    <TableHead>
      <TableRow>
        <TableCell>Release Note</TableCell>
        <TableCell>Release Blog</TableCell>
        <TableCell align="right">Documentation</TableCell>
        <TableCell align="right">Release Date</TableCell>
        <TableCell align="right">Release Manager</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.tagName}
        >
          <TableCell component="th" scope="row">
            <a href={row.releaseNotes}>{row.tagName}</a>
          </TableCell>
          <TableCell align="right">
            {row.releaseBlog == "N/A"
                ? "N/A"
                : <a href={row.releaseBlog}>What's New in Apache Pulsar {row.tagName}</a>
            }
          </TableCell>
          <TableCell align="right">
            <a href={row.doc}>{row.tagName} Documentation</a>
          </TableCell>
          <TableCell align="right">{new Date(row.publishedAt).toDateString().substr(4)}</TableCell>
          <TableCell align="right">
            <a href={`https://github.com/${row.author}`}>{row.author}</a>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
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
#### 2.10.x
[2.10.0](/release-notes/versioned/client-java-2.10.0)&ensp;&ensp;[2.10.1](/release-notes/versioned/client-java-2.10.1)&ensp;&ensp;
#### 2.9.x
[2.9.3](/release-notes/versioned/client-java-2.9.3)&ensp;&ensp;[2.9.0](/release-notes/versioned/client-java-2.9.0)&ensp;&ensp;  
#### 2.8.x
[2.8.4](/release-notes/versioned/client-java-2.8.4)&ensp;&ensp;[2.8.3](/release-notes/versioned/client-java-2.8.3)&ensp;&ensp;[2.8.2](/release-notes/versioned/client-java-2.8.2)&ensp;&ensp;[2.8.1](/release-notes/versioned/client-java-2.8.1)&ensp;&ensp;
#### 2.7.x
[2.7.5](/release-notes/versioned/client-java-2.7.5)&ensp;&ensp;[2.7.4](/release-notes/versioned/client-java-2.7.4)&ensp;&ensp;[2.7.3](/release-notes/versioned/client-java-2.7.3)&ensp;&ensp;[2.7.2](/release-notes/versioned/client-java-2.7.2)&ensp;&ensp;[2.7.1](/release-notes/versioned/client-java-2.7.1)&ensp;&ensp;  
#### 2.6.x
[2.6.4](/release-notes/versioned/client-java-2.6.4)&ensp;&ensp;[2.6.3](/release-notes/versioned/client-java-2.6.3)&ensp;&ensp;[2.6.2](/release-notes/versioned/client-java-2.6.2)&ensp;&ensp;[2.6.1](/release-notes/versioned/client-java-2.6.1)&ensp;&ensp;  
#### 2.5.x
[2.5.2](/release-notes/versioned/client-java-2.5.2)&ensp;&ensp;[2.5.1](/release-notes/versioned/client-java-2.5.1)&ensp;&ensp; [2.5.0](/release-notes/versioned/client-java-2.5.0)&ensp;&ensp;
### Python
#### 2.10.x
[2.10.0](/release-notes/versioned/client-python-2.10.0)&ensp;&ensp;[2.10.1](/release-notes/versioned/client-python-2.10.1)&ensp;&ensp;
#### 2.9.x
[2.9.3](/release-notes/versioned/client-python-2.9.3)&ensp;&ensp;[2.9.0](/release-notes/versioned/client-python-2.9.0)&ensp;&ensp;  
#### 2.8.x
[2.8.4](/release-notes/versioned/client-python-2.8.4)&ensp;&ensp;[2.8.3](/release-notes/versioned/client-python-2.8.3)&ensp;&ensp;[2.8.2](/release-notes/versioned/client-python-2.8.2)&ensp;&ensp;[2.8.1](/release-notes/versioned/client-python-2.8.1)&ensp;&ensp;
#### 2.7.x
[2.7.5](/release-notes/versioned/client-python-2.7.5)&ensp;&ensp;[2.7.4](/release-notes/versioned/client-python-2.7.4)&ensp;&ensp;[2.7.2](/release-notes/versioned/client-python-2.7.2)&ensp;&ensp;  
#### 2.6.x
[2.6.2](/release-notes/versioned/client-python-2.6.2)&ensp;&ensp;  
#### 2.5.x
[2.5.2](/release-notes/versioned/client-python-2.5.2)&ensp;&ensp;  
### C++
#### 2.10.x
[2.10.0](/release-notes/versioned/client-cpp-2.10.0)&ensp;&ensp;[2.10.1](/release-notes/versioned/client-cpp-2.10.1)&ensp;&ensp;
#### 2.9.x
[2.9.3](/release-notes/versioned/client-cpp-2.9.3)&ensp;&ensp;[2.9.0](/release-notes/versioned/client-cpp-2.9.0)&ensp;&ensp;  
#### 2.8.x
[2.8.4](/release-notes/versioned/client-cpp-2.8.4)&ensp;&ensp;[2.8.3](/release-notes/versioned/client-cpp-2.8.3)&ensp;&ensp;[2.8.2](/release-notes/versioned/client-cpp-2.8.2)&ensp;&ensp;[2.8.1](/release-notes/versioned/client-cpp-2.8.1)&ensp;&ensp;
#### 2.7.x
[2.7.5](/release-notes/versioned/client-cpp-2.7.5)&ensp;&ensp;[2.7.4](/release-notes/versioned/client-cpp-2.7.4)&ensp;&ensp;[2.7.3](/release-notes/versioned/client-cpp-2.7.3)&ensp;&ensp;[2.7.2](/release-notes/versioned/client-cpp-2.7.2)&ensp;&ensp;[2.7.1](/release-notes/versioned/client-cpp-2.7.1)&ensp;&ensp;  
#### 2.6.x
[2.6.2](/release-notes/versioned/client-cpp-2.6.2)&ensp;&ensp;[2.6.1](/release-notes/versioned/client-cpp-2.6.1)&ensp;&ensp;  
#### 2.5.x
[2.5.2](/release-notes/versioned/client-cpp-2.5.2)&ensp;&ensp;[2.5.1](/release-notes/versioned/client-cpp-2.5.1)&ensp;&ensp;  


### WebSocket
#### 2.10.x
[2.10.0](/release-notes/versioned/client-websocket-2.10.0)&ensp;&ensp;[2.10.1](/release-notes/versioned/client-websocket-2.10.1)&ensp;&ensp;
#### 2.9.x
[2.9.3](/release-notes/versioned/client-websocket-2.9.3)&ensp;&ensp;
#### 2.8.x
[2.8.4](/release-notes/versioned/client-websocket-2.8.4)&ensp;&ensp;[2.8.3](/release-notes/versioned/client-websocket-2.8.3)&ensp;&ensp;[2.8.2](/release-notes/versioned/client-websocket-2.8.2)&ensp;&ensp;[2.8.1](/release-notes/versioned/client-websocket-2.8.1)&ensp;&ensp;
#### 2.7.x
[2.7.3](/release-notes/versioned/client-websocket-2.7.3)&ensp;&ensp;[2.7.2](/release-notes/versioned/client-websocket-2.7.2)&ensp;&ensp;[2.7.1](/release-notes/versioned/client-websocket-2.7.1)&ensp;&ensp;  
#### 2.6.x
[2.6.3](/release-notes/versioned/client-websocket-2.6.3)&ensp;&ensp;[2.6.2](/release-notes/versioned/client-websocket-2.6.2)&ensp;&ensp;  
#### 2.5.x
[2.5.1](/release-notes/versioned/client-websocket-2.5.1)&ensp;&ensp;  

### Go
#### 0.8.x
[v0.8.1](/release-notes/versioned/pulsar-client-go-0.8.1)&ensp;&ensp;[v0.8.0](/release-notes/versioned/pulsar-client-go-0.8.0)&ensp;&ensp;  
#### 0.7.x
[v0.7.0](/release-notes/versioned/pulsar-client-go-0.7.0)&ensp;&ensp;  
#### 0.6.x
[v0.6.0](/release-notes/versioned/pulsar-client-go-0.6.0)&ensp;&ensp;  
#### 0.5.x
[v0.5.0](/release-notes/versioned/pulsar-client-go-0.5.0)&ensp;&ensp;  
#### 0.4.x
[v0.4.0](/release-notes/versioned/pulsar-client-go-0.4.0)&ensp;&ensp;  
#### 0.3.x
[v0.3.0](/release-notes/versioned/pulsar-client-go-0.3.0)&ensp;&ensp;  
#### 0.2.x
[v0.2.0](/release-notes/versioned/pulsar-client-go-0.2.0)&ensp;&ensp;  
#### 0.1.x
[v0.1.1](/release-notes/versioned/pulsar-client-go-0.1.1)&ensp;&ensp;[v0.1.0](/release-notes/versioned/pulsar-client-go-0.1.0)&ensp;&ensp;  

### NodeJs
#### 1.6.x
[v1.6.2](/release-notes/versioned/pulsar-client-node-1.6.2)&ensp;&ensp;  
#### 1.5.x
[v1.5.0](/release-notes/versioned/pulsar-client-node-1.5.0)&ensp;&ensp;  
#### 1.4.x
[v1.4.1](/release-notes/versioned/pulsar-client-node-1.4.1)&ensp;&ensp;[v1.4.0](/release-notes/versioned/pulsar-client-node-1.4.0)&ensp;&ensp;  
#### 1.3.x
[v1.3.2](/release-notes/versioned/pulsar-client-node-1.3.2)&ensp;&ensp;[v1.3.1](/release-notes/versioned/pulsar-client-node-1.3.1)&ensp;&ensp;[v1.3.0](/release-notes/versioned/pulsar-client-node-1.3.0)&ensp;&ensp;  
#### 1.2.x
[v1.2.0](/release-notes/versioned/pulsar-client-node-1.2.0)&ensp;&ensp;  
#### 1.1.x
[v1.1.0](/release-notes/versioned/pulsar-client-node-1.1.0)&ensp;&ensp;  
#### 1.0.x
[v1.0.0](/release-notes/versioned/pulsar-client-node-1.0.0)&ensp;&ensp;  
### C#

#### 2.3.x
[2.3.0](/release-notes/versioned/pulsar-cs-2.3.0)&ensp;&ensp;

#### 2.2.x
[2.2.0](/release-notes/versioned/pulsar-cs-2.2.0)&ensp;&ensp;

#### 2.1.x
[2.1.0](/release-notes/versioned/pulsar-cs-2.1.0)&ensp;&ensp;

#### 2.0.x
[2.0.1](/release-notes/versioned/pulsar-cs-2.0.1)&ensp;&ensp;
[2.0.0](/release-notes/versioned/pulsar-cs-2.0.0)&ensp;&ensp;

#### 1.1.x
[1.1.2](/release-notes/versioned/pulsar-cs-1.1.2)&ensp;&ensp;
[1.1.1](/release-notes/versioned/pulsar-cs-1.1.1)&ensp;&ensp;
[1.1.0](/release-notes/versioned/pulsar-cs-1.1.0)&ensp;&ensp;

#### 1.0.x
[1.0.2](/release-notes/versioned/pulsar-cs-1.0.2)&ensp;&ensp;
[1.0.1](/release-notes/versioned/pulsar-cs-1.0.1)&ensp;&ensp;
[1.0.0](/release-notes/versioned/pulsar-cs-1.0.0)&ensp;&ensp;

#### 0.11.x
[0.11.0](/release-notes/versioned/pulsar-cs-0.11.0)&ensp;&ensp;

#### 0.10.x
[0.10.1](/release-notes/versioned/pulsar-cs-0.10.1)&ensp;&ensp;
[0.10.0](/release-notes/versioned/pulsar-cs-0.10.0)&ensp;&ensp;

#### 0.9.x
[0.9.7](/release-notes/versioned/pulsar-cs-0.9.7)&ensp;&ensp;
[0.9.6](/release-notes/versioned/pulsar-cs-0.9.6)&ensp;&ensp;
