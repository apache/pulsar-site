## `bookkeeper`
A tool for managing BookKeeper.

### Environment variables

The table below lists the environment variables that you can use to configure the bookkeeper tool.

|Variable|Description|Default|
|---|---|---|
|BOOKIE_LOG_CONF|Log4j configuration file|conf/log4j2.yaml|
|BOOKIE_CONF|BookKeeper configuration file|conf/bk_server.conf|
|BOOKIE_EXTRA_OPTS|Extra options to be passed to the JVM||
|BOOKIE_EXTRA_CLASSPATH|Extra paths for BookKeeper's classpath||
|ENTRY_FORMATTER_CLASS|The Java class used to format entries||
|BOOKIE_PID_DIR|Folder where the BookKeeper server PID file should be stored||
|BOOKIE_STOP_TIMEOUT|Wait time before forcefully killing the Bookie server instance if attempts to stop it are not successful||


### `auto-recovery`
Runs an auto-recovery service daemon

Usage
```bash
$ bookkeeper auto-recovery options
```

Options

|Flag|Description|Default|
|---|---|---|
|`-c`, `--conf`|Configuration for the auto-recovery daemon||


### `bookie`
Starts up a BookKeeper server (aka bookie)

Usage
```bash
$ bookkeeper bookie options
```

Options

|Flag|Description|Default|
|---|---|---|
|`-c`, `--conf`|Configuration for the auto-recovery daemon||
|-readOnly|Force start a read-only bookie server|false|
|-withAutoRecovery|Start auto-recovery service bookie server|false|


### `localbookie`
Runs a test ensemble of N bookies locally

Usage
```bash
$ bookkeeper localbookie N
```

### `upgrade`
Upgrade the bookie’s filesystem

Usage
```bash
$ bookkeeper upgrade options
```

Options

|Flag|Description|Default|
|---|---|---|
|`-c`, `--conf`|Configuration for the auto-recovery daemon||
|`-u`, `--upgrade`|Upgrade the bookie’s directories||


### `shell`
Run shell for admin commands. To see a full listing of those commands, run bookkeeper shell without an argument.

Usage
```bash
$ bookkeeper shell
```

Example
```bash
$ bookkeeper shell bookiesanity
```
