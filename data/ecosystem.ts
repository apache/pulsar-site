export const categories = [
  'client_api',
  'client_wrapper',
  'database_integration',
  'io',
  'logging',
  'observability',
  'protocol_handlers',
  'search_and_query',
  'security_plugins',
  'stream_processing',
  'tools'
] as const;
export type Category = typeof categories[number];

export const categoryLabels: Record<Category, string> = {
  client_api: 'Client API',
  client_wrapper: 'Client Wrapper',
  database_integration: 'Database Integration',
  io: 'IO',
  logging: 'Logging',
  observability: 'Observability',
  protocol_handlers: 'Protocol Handlers',
  search_and_query: 'Search and Query',
  security_plugins: 'Security Plugins',
  stream_processing: 'Stream Processing',
  tools: 'Tools'
};

export type Resource = {
  name: string;
  description: string;
  link: string;
  source_or_sink: string;
};

export const resources: Record<Category, Resource[]> = {
    client_api: [
      {
        name: 'Starlight for JMS',
        description: 'Implements the JMS 2.0 (Java Messaging Service ®) API over the Apache Pulsar® Java Client.',
        link: 'https://github.com/datastax/pulsar-jms',
        source_or_sink: 'N/A'
      }
    ],
    client_wrapper: [
      {
        name: 'Kafka Client Wrapper',
        description: '',
        link: 'https://github.com/apache/pulsar-adapters/tree/master/pulsar-client-kafka-compat',
        source_or_sink: 'N/A'
      }
    ],
    database_integration: [
      {
        name: 'Azure Data Explorer (Kusto) Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/azure-kusto',
        source_or_sink: 'Sink'
      },
      {
        name: 'Azure DocumentDB Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/azure-documentdb',
        source_or_sink: 'Source'
      },
      {
        name: 'Cassandra Connector',
        description: '',
        link: 'https://github.com/datastax/cdc-apache-cassandra',
        source_or_sink: 'Source'
      },
      {
        name: 'Cassandra Sink Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-sink',
        source_or_sink: 'Sink'
      },
      {
        name: 'Couchbase Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/couchbase',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'Geode Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/geode',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'Google BigQuery Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/bigquery',
        source_or_sink: 'Sink'
      },
      {
        name: 'Kinetica Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/kinetica',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'Kudu Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/kudu',
        source_or_sink: 'Sink'
      },
      {
        name: 'MarkLogic Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/marklogic',
        source_or_sink: 'Sink'
      },
      {
        name: 'Neo4j Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/neo4j',
        source_or_sink: 'Sink'
      },
      {
        name: 'OrientDB Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/orientdb',
        source_or_sink: 'Sink'
      },
      {
        name: 'Phoenix Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/phoenix',
        source_or_sink: 'Sink'
      },
      {
        name: 'Redis Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/redis',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'SAP HANA Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/sap-hana',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'SingleStore Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/singlestore',
        source_or_sink: 'Sink'
      },
      {
        name: 'Snowflake Connector',
        description: '',
        link: 'https://github.com/datastax/snowflake-connector',
        source_or_sink: 'Sink'
      },
      {
        name: 'XTDB Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/xtdb',
        source_or_sink: 'Sink'
      },
      {
        name: 'Aerospike Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/aerospike',
        source_or_sink: 'Sink'
      },
      {
        name: 'Canal Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/canal',
        source_or_sink: 'Source'
      },
      {
        name: 'Cassandra Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/cassandra',
        source_or_sink: 'Sink'
      },
      {
        name: 'Debezium Connector (Microsoft SQL Server)',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/debezium/mssql',
        source_or_sink: 'Source'
      },
      {
        name: 'Debezium Connector (MongoDB)',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/debezium/mongodb',
        source_or_sink: 'Source'
      },
      {
        name: 'Debezium Connector (MySQL)',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/debezium/mysql',
        source_or_sink: 'Source'
      },
      {
        name: 'Debezium Connector (Oracle)',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/debezium/oracle',
        source_or_sink: 'Source'
      },
      {
        name: 'Debezium Connector (PostgreSQL)',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/debezium/postgres',
        source_or_sink: 'Source'
      },
      {
        name: 'DynamoDB Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/dynamodb',
        source_or_sink: 'Source'
      },
      {
        name: 'HBase Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/hbase',
        source_or_sink: 'Sink'
      },
      {
        name: 'HDFS2 Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/hdfs2',
        source_or_sink: 'Sink'
      },
      {
        name: 'HDFS3 Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/hdfs3',
        source_or_sink: 'Sink'
      },
      {
        name: 'InfluxDB Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/influxdb',
        source_or_sink: 'Sink'
      },
      {
        name: 'JDBC Connector (ClickHouse)',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/jdbc/clickhouse',
        source_or_sink: 'Sink'
      },
      {
        name: 'JDBC Connector (MariaDB)',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/jdbc/mariadb',
        source_or_sink: 'Sink'
      },
      {
        name: 'JDBC Connector (OpenMLDB)',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/jdbc/openmldb',
        source_or_sink: 'Sink'
      },
      {
        name: 'JDBC Connector (PostgreSQL)',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/jdbc/postgres',
        source_or_sink: 'Sink'
      },
      {
        name: 'JDBC Connector (SQLite)',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/jdbc/sqlite',
        source_or_sink: 'Sink'
      },
      {
        name: 'MongoDB Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/mongo',
        source_or_sink: 'Sink'
      },
      {
        name: 'Redis Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/redis',
        source_or_sink: 'Sink'
      }
    ],
    io: [
      {
        name: 'AMQP1_0 Connector',
        description: '',
        link: 'https://github.com/streamnative/pulsar-io-amqp-1-0',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'AWS Lambda Connector',
        description: '',
        link: 'https://github.com/streamnative/pulsar-io-aws-lambda',
        source_or_sink: 'Sink'
      },
      {
        name: 'AWS SQS Connector',
        description: '',
        link: 'https://github.com/streamnative/pulsar-io-sqs',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'Cloud Storage Connector',
        description: '',
        link: 'https://github.com/streamnative/pulsar-io-cloud-storage',
        source_or_sink: 'Sink'
      },
      {
        name: 'CoAP Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/coap',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'Diffusion Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/diffusion',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'File Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/file',
        source_or_sink: 'Source'
      },
      {
        name: 'Humio HEC Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/humio',
        source_or_sink: 'Sink'
      },
      {
        name: 'JMS Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/jms',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'Kafka Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/kafka',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'Kinesis Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/kinesis',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'MQTT Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/mqtt',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'Netty Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/netty',
        source_or_sink: 'Source'
      },
      {
        name: 'NSQ Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/nsq',
        source_or_sink: 'Source'
      },
      {
        name: 'PLC4X Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/plc4x',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'RabbitMQ Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/rabbitmq',
        source_or_sink: 'Source and Sink'
      },
      {
        name: 'Twitter Firehose Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/twitter',
        source_or_sink: 'Source'
      },
    ],
    logging: [
      {
        name: 'Datadog Logs Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/datadog',
        source_or_sink: 'Sink'
      },
      {
        name: 'Flume NG Connector',
        description: '',
        link: 'https://github.com/streamnative/pulsar-flume-ng-sink',
        source_or_sink: 'Source'
      },
      {
        name: 'Logstash Input',
        description: '',
        link: 'https://github.com/streamnative/logstash-input-pulsar',
        source_or_sink: 'N/A'
      },
      {
        name: 'Logstash Output',
        description: '',
        link: 'https://github.com/streamnative/logstash-output-pulsar',
        source_or_sink: 'N/A'
      },
      {
        name: 'New Relic Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/newrelic',
        source_or_sink: 'Sink'
      },
      {
        name: 'Pulsar Beat Output',
        description: '',
        link: 'https://hub.streamnative.io/logging/pulsar-beat-output/v0.1.0/',
        source_or_sink: 'N/A'
      },
      {
        name: 'Splunk Connector',
        description: '',
        link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/splunk',
        source_or_sink: 'Sink'
      },
      {
        name: 'Flume Connector',
        description: '',
        link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/flume',
        source_or_sink: 'Source'
      },
    ],
    observability: [
      {
        name: 'Datadog',
        description: '',
        link: 'https://github.com/streamnative/pulsar-datadog',
        source_or_sink: 'N/A'
      },
      {
        name: 'Grafana Dashboard',
        description: '',
        link: 'https://github.com/streamnative/apache-pulsar-grafana-dashboard',
        source_or_sink: 'N/A'
      },
      {
        name: 'OpenTracing Pulsar Client',
        description: '',
        link: 'https://github.com/streamnative/pulsar-tracing',
        source_or_sink: 'N/A'
      },
    ],
    protocol_handlers: [
      {
          name: 'AoP (AMQP on Pulsar)',
          description: '',
          link: 'https://github.com/streamnative/aop',
          source_or_sink: 'N/A'
      },
      {
        name: 'KoP (Kafka on Pulsar)',
        description: '',
        link: 'https://github.com/streamnative/kop',
        source_or_sink: 'N/A'
      },
      {
        name: 'MoP (MQTT on Pulsar)',
        description: '',
        link: 'https://github.com/streamnative/mop',
        source_or_sink: 'N/A'
      },
      {
        name: 'RoP (RocketMQ on Pulsar)',
        description: '',
        link: 'https://github.com/streamnative/rop',
        source_or_sink: 'N/A'
      },
      {
        name: 'Starlight for RabbitMQ',
        description: 'Acts as a proxy between your RabbitMQ application and Apache Pulsar',
        link: 'https://github.com/datastax/starlight-for-rabbitmq',
        source_or_sink: 'N/A'
      },
    ],
    search_and_query: [
        {
          name: 'Presto Pulsar connector ',
          description: '',
          link: 'https://github.com/apache/pulsar/tree/master/pulsar-sql',
          source_or_sink: 'N/A'
        },
        {
          name: 'ElasticSearch Connector ',
          description: '',
          link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/elastic-search',
          source_or_sink: 'Sink'
        },
        {
          name: 'Solr Connector',
          description: '',
          link: 'https://github.com/apache/pulsar/tree/master/pulsar-io/solr',
          source_or_sink: 'Sink'
        },
    ],
    security_plugins: [
        {
          name: 'OpenID Connect Authentication Plugin',
          description: '',
          link: 'https://github.com/datastax/pulsar-openid-connect-plugin',
          source_or_sink: 'N/A'
        }
    ],
    stream_processing: [
        {
          name: 'Function Mesh',
          description: '',
          link: 'https://github.com/streamnative/function-mesh',
          source_or_sink: 'N/A'
        },
        {
          name: 'NiFi Processor',
          description: '',
          link: 'https://github.com/streamnative/pulsar-nifi-bundle',
          source_or_sink: 'N/A'
        },
        {
          name: 'Pulsar Flink Connector',
          description: '',
          link: 'https://hub.streamnative.io/data-processing/pulsar-flink/1.13/',
          source_or_sink: 'Source and Sink'
        },
        {
          name: 'Pulsar Spark Adaptor',
          description: '',
          link: 'https://github.com/apache/pulsar-adapters/tree/master/pulsar-spark',
          source_or_sink: 'N/A'
        },
        {
          name: 'Pulsar Spark Connector',
          description: '',
          link: 'https://hub.streamnative.io/data-processing/pulsar-spark/3.1.1/',
          source_or_sink: 'Source and Sink'
        },
        {
          name: 'Pulsar Storm Adaptor',
          description: '',
          link: 'https://github.com/apache/pulsar-adapters/tree/master/pulsar-storm',
          source_or_sink: 'N/A'
        },
        {
          name: 'Hazelcast Jet Connector',
          description: '',
          link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/hazelcast',
          source_or_sink: 'Source'
        },
        {
          name: 'Zeebe Connector',
          description: '',
          link: 'https://github.com/datastax/pulsar-3rdparty-connector/tree/master/pulsar-connectors/zeebe',
          source_or_sink: 'Source and Sink'
        },
    ],
    tools: [
       {
          name: 'Helm Chart (DataStax)',
          description: '',
          link: 'https://github.com/datastax/pulsar-helm-chart',
          source_or_sink: 'N/A'
        },
        {
          name: 'Helm Chart (Pulsar)',
          description: '',
          link: 'https://github.com/apache/pulsar-helm-chart',
          source_or_sink: 'N/A'
        },
        {
          name: 'Helm Chart (StreamNative)',
          description: '',
          link: 'https://github.com/streamnative/charts/tree/master/charts/pulsar',
          source_or_sink: 'N/A'
        },
        {
          name: 'Log4j2 Appender',
          description: '',
          link: 'https://github.com/apache/pulsar-adapters/tree/master/pulsar-log4j2-appender',
          source_or_sink: 'N/A'
        },
        {
          name: 'Pulsar Admin Console',
          description: '',
          link: 'https://github.com/datastax/pulsar-admin-console',
          source_or_sink: 'N/A'
        },
        {
          name: 'Pulsar Manager',
          description: '',
          link: 'https://github.com/apache/pulsar-manager',
          source_or_sink: 'N/A'
        },
        {
          name: 'Pulsarctl',
          description: '',
          link: 'https://github.com/streamnative/pulsarctl',
          source_or_sink: 'N/A'
        },
        {
          name: 'Terraform Provider',
          description: '',
          link: 'https://github.com/streamnative/terraform-provider-pulsar',
          source_or_sink: 'N/A'
        },
    ]
}
