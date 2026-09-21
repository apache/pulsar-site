# scalable-topics

Operations on scalable topics


```shell
$ pulsar-admin scalable-topics subcommand
```



## list

Get the list of scalable topics under a namespace, optionally filtered to those whose properties contain every given key=value pair

**Command:**

```shell
$ pulsar-admin scalable-topics list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-p, --property]` | Filter to topics whose properties contain key=value pairs. Repeat or separate with commas to AND multiple filters together.|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## create

Create a new scalable topic

**Command:**

```shell
$ pulsar-admin scalable-topics create options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-s, --segments]` | Number of initial segments|1|
| `[-p, --property]` | Key-value properties. Repeat or separate with commas (key=value[,key=value...])|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## migrate

Migrate an existing regular (partitioned or non-partitioned) topic to a scalable topic. Fails if legacy v4 clients are still connected unless --force is set.

**Command:**

```shell
$ pulsar-admin scalable-topics migrate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-f, --force]` | Migrate even if legacy v4 clients are still connected|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-metadata

Get scalable topic metadata

**Command:**

```shell
$ pulsar-admin scalable-topics get-metadata options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## stats

Get the stats of a scalable topic as a whole: the segment DAG with per-segment load, the subscriptions with their backlog across segments, and the producers

**Command:**

```shell
$ pulsar-admin scalable-topics stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## segment-stats

Get the stats of a single segment of a scalable topic: the regular topic stats of the topic backing the segment

**Command:**

```shell
$ pulsar-admin scalable-topics segment-stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## delete

Delete a scalable topic and all its segments

**Command:**

```shell
$ pulsar-admin scalable-topics delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-f, --force]` | Force deletion even if topic has active subscriptions|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## split-segment

Split a segment into two halves

**Command:**

```shell
$ pulsar-admin scalable-topics split-segment options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-s, --segment-id]` | ID of the segment to split|0|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## merge-segments

Merge two adjacent segments into one

**Command:**

```shell
$ pulsar-admin scalable-topics merge-segments options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--segment-id-1]` | First segment ID to merge|0|
| `[--segment-id-2]` | Second segment ID to merge|0|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## seek

Reset a subscription's cursor on every segment to a given point in time. Pass --time as a relative offset (e.g. 1h, 5d) — the cursor is reset to (now - offset).

**Command:**

```shell
$ pulsar-admin scalable-topics seek options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-s, --subscription]` | Subscription name|null|
| `[-t, --time]` | Relative offset in the past to seek to (e.g. 1h, 5d, 30m)|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## clear-backlog

Skip every undelivered message on the subscription, across every segment in the DAG.

**Command:**

```shell
$ pulsar-admin scalable-topics clear-backlog options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-s, --subscription]` | Subscription name|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|

