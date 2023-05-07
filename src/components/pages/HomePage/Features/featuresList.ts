import Scalability from './pictures/scalability.svg';
import MessagingAndStreaming from './pictures/messaging&streaming.svg';
import GeoReplication from './pictures/geoReplication.svg';
import MultiTenancy from './pictures/multiTenancy.svg';
import Balancing from './pictures/balancing.svg';
import MultiLanguage from './pictures/multiLanguage.svg';
import Integrations from './pictures/integrations.svg';
import ServerlessFunctions from './pictures/serverlessFunctions.svg';
import SupportsUp from './pictures/supportsUp.svg';

const featuresList = [
  {
    picture: Scalability,
    title: 'Rapid Horizontal Scalability',
    text: 'Scales horizontally to handle the increased load. Its unique design and separate storage layer enable handling the sudden surge in traffic by scaling out in seconds.',
    viewBox: '0 0 300 128',
  },
  {
    picture: MessagingAndStreaming,
    title: 'Low-latency messaging and streaming',
    text: 'Acknowledge messages individually (RabbitMQ style) or cumulative per partition (i.e., offset-like). Enables use cases such as distributed work queues or order-preserving data streams at very large scales (hundreds of nodes) and low latency (<5ms).',
    viewBox: '0 0 300 128',
  },
  {
    picture: GeoReplication,
    title: 'Seamless Geo-Replication',
    text: 'Protect against complete zone outages using replication across different geographic regions. Flexible and configurable replication strategies across distant Pulsar Clusters. Uniquely supports automatic client failover to healthy clusters.',
    viewBox: '0 0 125 128',
  },
  {
    picture: MultiTenancy,
    title: 'Multi-tenancy as a first-class citizen',
    text: 'Maintain one cluster for your entire organization using tenants. Access control across data and actions using tenant policies. Isolate specific brokers to a tenant when maximum noisy neighbor protection is needed.',
    viewBox: '0 0 250 128',
  },
  {
    picture: Balancing,
    title: 'Automatic Load Balancing',
    text: 'Add or remove nodes and let Pulsar load balance topic bundles automatically. Hot spotted topic bundles are automatically split and evenly distributed across the brokers.',
    viewBox: '0 0 125 128',
  },
  {
    picture: MultiLanguage,
    title: 'Official multi-language support',
    text: 'Officially maintained Pulsar Clients for Java, Go, Python, C++, Node.js, and C#.',
    viewBox: '0 0 125 128',
  },
  {
    picture: Integrations,
    title: 'Official 3rd party integrations',
    text: 'Pulsar has officially maintained connectors with popular 3rd parties: MySQL, Elasticsearch, Cassandra, and more. Allows streaming data in (source) or out (sink).',
    viewBox: '0 0 125 128',
  },
  {
    picture: ServerlessFunctions,
    title: 'Serverless Functions',
    text: 'Write and deploy functions natively using Pulsar Functions. Process messages using Java, Go, or Python without deploying fully-fledged applications. Kubernetes runtime is bundled.',
    viewBox: '0 0 175 128',
  },
  {
    picture: SupportsUp,
    title: 'Supports up to 1M topics',
    text: "Pulsar's unique architecture supports up to 1 million topics in a single cluster. Simplify your own architecture by avoiding multiplexing multiple streams into a single topic.",
    viewBox: '0 0 150 128',
  },
];

export default featuresList;