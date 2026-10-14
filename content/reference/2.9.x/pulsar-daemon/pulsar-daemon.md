## pulsar-daemon

A wrapper around the pulsar tool that’s used to start and stop processes, such as ZooKeeper, bookies, and Pulsar
brokers, in the background using nohup.

pulsar-daemon has a similar interface to the pulsar command but adds start and stop commands for various services. For a
listing of those services, run pulsar-daemon to see the help output or see the documentation for the pulsar command.

### start

Start a service in the background using nohup.

Usage

```bash
$ pulsar-daemon start service
```

### stop

Stop a service that’s already been started using start.

Usage

```bash
$ pulsar-daemon stop service options
```

Options

| Flag   | Description                                                    | Default |
|--------|----------------------------------------------------------------|---------|
| -force | Stop the service forcefully if not stopped by normal shutdown. | false   |
