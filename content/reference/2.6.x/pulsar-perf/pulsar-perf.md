Usage: `pulsar-perf <command>`

where command is one of:

    produce                 Run a producer
    consume                 Run a consumer
    read                    Run a topic reader

    websocket-producer      Run a websocket producer

    managed-ledger          Write directly on managed-ledgers
    monitor-brokers         Continuously receive broker data and/or load reports
    simulation-client       Run a simulation server acting as a Pulsar client
    simulation-controller   Run a simulation controller to give commands to servers

    help                    This help message

or command is the full name of a class with a defined `main()` method.

Environment variables:

    PULSAR_LOG_CONF               Log4j configuration file (default /Users/mercury/Downloads/pulsar/conf/log4j2.yaml)
    PULSAR_CLIENT_CONF            Configuration file for client (default: /Users/mercury/Downloads/pulsar/conf/client.conf)
    PULSAR_EXTRA_OPTS             Extra options to be passed to the jvm
    PULSAR_EXTRA_CLASSPATH        Add extra paths to the pulsar classpath

These variable can also be set in `conf/pulsar_env.sh`
