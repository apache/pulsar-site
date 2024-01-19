import React from 'react';
import s from './FeaturesPage.module.css'
import Card, { CardProps } from './Card/Card';
import Layout from '@theme/Layout';

const cards: CardProps[] = [
  {
    className: s.RapidHorizontalScalabilityCard,
    rightContent: (
      <div className={s.RapidHorizontalScalabilityCardMainContent}>
        <h3>Rapid Horizontal Scalability</h3>
        <p>
          Scales horizontally to handle the increased load. Its unique <a target='_blank' href='https://pulsar.apache.org/docs/concepts-architecture-overview/'>design</a> and separate storage layer enable controlling the sudden surge in traffic by scaling out in seconds.
        </p>
      </div>
    ),
    showMore: {
      position: 'right',
      rightContent: (
        <p className={s.SmallText}>
          Apache Pulsar server - the Broker - does not persist a received message to a file on the local disk. Instead, it writes the message to another system called <a target='_blank' href='https://bookkeeper.apache.org/'>Apache Bookkeeper </a> - which can be shortly described as a distributed (multiple nodes) append-only virtual-file storage. The message is written to such append-only virtual file, a.k.a. Ledger. This design makes Pulsar’s broker stateless; hence upon sudden surge in traffic, it can scale out in seconds - adding more nodes and spreading the topics among them automatically (see load balancer feature below), without any data movement needed in Pulsar.<br />
          A topic is, in fact, a list of ledgers (virtual append-only files). The active ledger is closed each configurable size/time, and a new one is opened and used.<br />
          Apache Bookkeeper can also scale out in seconds. When adding nodes, no data movement is required. Since actively written topics keep replacing their active ledger, the new bookkeeper nodes are also selected, as part of a uniform selection process to host new files, hence balancing out the message writes. This means the new nodes help balance the high surge of traffic immediately.
        </p>
      )
    }
  },
  {
    className: s.LowLatencyCard,
    leftContent: (
      <div className={s.LowLatencyCardMainContent}>
        <h3>Low-latency, messaging and streaming</h3>
        <p>
          Acknowledge messages individually (RabbitMQ style) or cumulative per partition (i.e., offset-like). Enables use cases such as distributed work queues or order-preserving data streams at massive scales (hundreds of nodes) and low latency (&lt;10ms).
        </p>
      </div>
    ),
    showMore: {
      position: 'left',
      bottomContent: (
        <div>
          <p className={s.LowLatencyCardSingleColumn}  style={{ marginBottom: '2rem', marginTop: '2rem'}}>
            Pulsar offers writing messages to topics and partitioned topics (topics divided into partitions). Messages can be consumed in multiple ways:
          </p>
          <div className={s.LowLatencyCardSingleColumn}>
            <ul>
              <li>
                <p className={s.SmallText}><span className={s.LowLatencyCardUnderline}>Streaming:</span> In order, by partition, and acknowledge them cumulatively (up to a specific message ID for a specific partition), similar to the way Apache Kafka works.</p>
              </li>
              <li style={{ paddingTop: '2rem'}}>
                <p className={s.SmallText}><span className={s.LowLatencyCardUnderline}>Messaging:</span> Out of order, acknowledging each message individually, similar to the way RabbitMQ works. This enables having vast amounts of consumers concurrently regardless of partition count. Perfect for distributed work queues (i.e., jobs) and accelerating machine learning workloads.</p>
              </li>
              <li style={{ paddingTop: '2rem'}}>
                <p className={s.SmallText}><span className={s.LowLatencyCardUnderline}>Messaging in-order:</span> In order, by key. You can have as many consumers as needed concurrently. The broker divides the keys equally between the consumers, and all messages for a particular key will arrive at the same single consumer associated with that key. This preserves the ordering of message processing by key.</p>
              </li>
            </ul>
          </div>
          <div className={s.LowLatencyCardSingleColumn} style={{ marginTop: '2rem'}}>
            <p className={s.SmallText}>
              All of this is supported at very low latency (&lt;10 ms), both for producing messages and end-to-end latency, and large scale (hundreds of nodes) cluster.
            </p>
          </div>
        </div>
      )
    }
  },
  {
    className: s.SupportManyTopicsCard,
    leftContent: (
      <div className={s.SupportManyTopicsCardMainContent}>
        <h3>Supports up to 1M topics</h3>
        <p>
          Pulsar's unique architecture supports up to 1 million topics in a single cluster. Simplify your architecture by avoiding multiplexing multiple streams into a single topic.
        </p>
      </div>

    ),
    showMore: {
      position: 'left',
      leftContent: (
        <p className={s.SmallText}>
          Pulsar persists the messages into a virtual append-only file, a.k.a. Ledger, stored in Apache Bookkeeper (a separate system). Since it’s not an active physical file per topic, Pulsar is not constrained by file descriptors limit; hence it allows having up to 1 million topics. This can support unique, simplified architectures or your applications. Compare this with traditional systems, which force you to multiplex many streams into a single topic, making your application cumbersome. The <a href="https://www.youtube.com/watch?t=173&v=vE7aKZT9r7k&feature=youtu.be" target="_blank" title="Cogito case study">Cogito case study</a> presented at <a href="https://pulsar-summit.org/" target="_blank" title="Pulsar Summit">Pulsar Summit</a> is a great example.
        </p>
      )
    }
  },
  {
    className: s.MultiTenancyCard,
    leftContent: (
      <div>
        <h3 className={s.MultiTenancyCardHeader}>Multi-tenancy as a first-class citizen</h3>

        <p className={s.MultiTenancyCardFirstParagraph}> 
          Maintain one cluster for your entire organization using tenants. Control which user has access across data (namespaces/topics) and actions (produce/consume/…).
        </p>
      </div>
    ),
    showMore: {
      position: 'left',
      leftContent: (
        <p className={s.SmallText}>
          <a target="_blank" href="https://pulsar.apache.org/docs/concepts-multi-tenancy/">Tenants</a> in Pulsar exist to divide the data in Pulsar into sections. A tenant holds namespaces which in turn hold topics and Pulsar Functions. Organizations typically give each department/team its tenant, in which they create namespaces per domain they own and topics for the implementation they need for that domain.<br />
          Tenants are primarily used in combination with the Granular Access Control feature. A tenant has a list of Tenant Admin users who can <a target='_blank' href='https://pulsar.apache.org/docs/admin-api-permissions/'>grant permissions</a> like produce/consume/functions/… on a specific namespace or topic to particular users. Tenants also enable configuring a specific <a target='_blank' href="https://pulsar.apache.org/docs/security-overview/#authentication">authentication plugin</a>, allowing, for example, to have one tenant authenticate using <a target='_blank' href='https://pulsar.apache.org/docs/security-jwt/'>JWT</a> and another using <a target="_blank" href="https://pulsar.apache.org/docs/security-tls-authentication/">mTLS</a>.<br />
          Lastly, a tenant can be <a target="_blank" href="https://pulsar.apache.org/docs/admin-api-tenants/#create">restricted</a> to a specific cluster if a Pulsar instance has multiple clusters.<br />
          Tenants enable departments in an organization to self-service regarding the security of their data and actions on it.
        </p>
      )
    }
  },
  {
    className: s.LoadBalancingCard,
    leftContent: (
      <div className={s.LoadBalancingCardMainContent}>
        <h3>Automatic Load Balancing</h3>
        <p>
          Add or remove nodes and let Pulsar load balance topic bundles automatically. Hot spotted topic bundles are automatically split and evenly distributed across the brokers.
        </p>
      </div>
    ),
    showMore: {
      position: 'left',
      leftContent: (
        <p className={s.SmallText}>
          Pulsar supports automatic <a target="_blank" href='https://pulsar.apache.org/docs/administration-load-balance/'>load balancing</a> topics across brokers to reach a balanced broker load in CPU, memory, and traffic. This is possible since Pulsar brokers are stateless, hence do not need any data movement when a topic moves between brokers.<br />
          Since Pulsar supports up to 1 million topics, the unit of balancing is not a topic but a topic bundle (a group of topics selected using hashing). The load balancer moves bundles across brokers, which moves all topics associated with the bundle between brokers.<br />
          When a bundle is under extreme load, an <a target='_blank' href='https://pulsar.apache.org/docs/administration-load-balance/'>automatic split </a> occurs to allow balancing the load of that bundle across two bundles, which can go on in succession until a balanced cluster is reached.
        </p>
      )
    }
  },
  {
    className: s.K8sReadyCard,
    leftContent: (
      <div>
        <h3>K8s Ready<br />(Cloud-native)</h3>
        <p>
          Pulsar was built for the cloud from day one. Both Pulsar and Bookkeeper nodes can scale up quickly as Pulsar is stateless, and Bookkeeper was designed to avoid data reshuffling while still utilizing all newly joined nodes.
        </p>
      </div>
    ),
    showMore: {
      position: 'left',
      bottomContent: (
        <div className={s.K8sReadyCardMore}>
        <p className={s.SmallText}>
          <p><strong>Scale-up is natively supported:</strong></p>
          <ul>
            <li>
            The Pulsar broker is stateless (messages are stored in Bookkeeper); hence scaling up is immediate since there is no data move to the new brokers. Pulsar has automatic load balancing, so new nodes will automatically get new topics evenly balanced across the cluster.
            </li>
            <li>
            Apache Bookkeeper supports scaling up natively since it doesn’t reshuffle data when starting new nodes. A topic in Pulsar is a chain of ledgers, where the last one is the active one. The active ledger is rotated quite rapidly, which means the new Bookkeeper nodes will almost immediately share the load of incoming messages.
            </li>
          </ul>
          Pulsar comes bundled with k8s helm charts, which contains all the components needed to operate: Pulsar brokers, Bookkeeper, Zookeeper, Function Workers, and more.
        </p>
      </div>
      )
    }
  },
  {
    className: s.GeoReplicationCard,
    leftContent: (
      <div className={s.GeoReplicationCardMain}>
        <h3>Seamless Geo-Replication</h3>
        <p>Protect against complete zone outages using replication across different geographic regions. Flexible and configurable replication strategies across distant Pulsar Clusters. Uniquely supports automatic client failover to healthy clusters.</p>
      </div>
    ),
    showMore: {
      position: 'left',
      bottomContent: (
        <div className={s.GeoReplicationCardColumns}>
          <div>
            <p className={s.SmallText}>
              Pulsar supports the notion of a <a target='_blank' href='https://pulsar.apache.org/docs/concepts-architecture-overview/'>Pulsar Instance</a>: A set of Pulsar Clusters, each aware of each other due to a single global metadata store (i.e., ZK). You define a <a target='_blank' href='https://pulsar.apache.org/docs/concepts-replication/#replication-mechanisms'>replication policy</a> between the clusters: <a target='_blank' href='https://pulsar.apache.org/docs/concepts-replication/#active-active-replication'>active-standby</a>, active-active, and more. This allows you to have each cluster in a different region, achieving geo-replication out of the box. It provides you with data redundancy and disaster recovery.
            </p>
          </div>
          <div>
            <p className={s.SmallText}>
              The cluster replicates the data (messages) and the <a target='_blank' href='https://pulsar.apache.org/docs/administration-geo/#replicated-subscriptions'>subscription</a> (consumer acknowledgment state).<br />
              If that’s not enough, Pulsar clients support <a target='_blank' href='https://pulsar.apache.org/docs/concepts-cluster-level-failover/'>automatic failover</a>. If it detects that the primary cluster (using a designated URL to check that) is down, it automatically fails over to the secondary cluster. Since the data and consumption state (subscription) is replicated, you simply pick up where you left off on the primary cluster.
            </p>
          </div>
        </div>
      )
    }
  },
  {
    className: s.LanguagesCard,
    leftContent: (
      <div className={s.LanguagesCardMain}>
        <h3>Official multi-language support</h3>
        <p>
          Officially maintained Pulsar Clients for Java, Go, Python, C++, Node.js, and C#.
        </p>
      </div>
    ),
    showMore: {
      position: 'left',
      bottomContent: (
        <div className={s.LanguagesCardMore}>
          <p className={s.SmallText}>
            Pulsar has officially maintained Clients for Java, Go, Python, C++, Node.js, and C#. The details and a feature matrix comparing which feature is supported for each language can be found on the Clients’ documentation page.<br />
            There are also unofficial clients developed by 3rd parties, such as native Node.js client, .NET, Haskell, PHP, Rust, and Scala.
          </p>
        </div>
      )
    }
  },
  {
    className: s.TieredStorageCard,
    leftContent: <h3>Tiered storage support for unlimited retention<br />(S3/GCS/…)</h3>,
    rightContent: <p>Unlimited retention by seamless data offloading from Bookkeeper to blob storage (e.g., S3). Keep high performance with resiliency by keeping warm data both in Bookeeper and S3.</p>,
    showMore: {
      position: 'right',
      rightContent: (
        <p className={s.SmallText}>
          A pulsar topic is a list of ledgers (as explained above). Only the latest ledger is considered open for writing; the other ledgers are closed - i.e., immutable.<br />
          Pulsar <a target='_blank' href="https://pulsar.apache.org/docs/tiered-storage-overview/">supports</a> offloading those immutable ledgers into Tiered Storage such as S3, GCS, Azure BlobStore, and more. You can optionally <a target='_blank' href='https://pulsar.apache.org/reference/#/3.0.x/config/reference-configuration-broker?id=managedledgeroffloaddeletionlagms'>configure</a> how long to retain the ledgers in Bookkeeper after they have been offloaded successfully.<br />
          This feature allows you to have unlimited retention at a low cost.<br />
          Pulsar seamlessly switches between reading from Bookkeeper or a tiered storage system based on the ledger location, making it transparent to the client. It’s perfect for offloading “cold” data into a low-cost system, as it is assumed this data will be accessed less frequently and demand less read performance (due to the nature of tiered storage systems).<br />
        </p>
      )
    }
  },
  {
    className: s.SchemaRegistryCard,
    leftContent: <h3>Built-in Schema Registry</h3>,
    rightContent: <p>Support validating incoming and outgoing data against a topic schema. Future proof by supporting backward and forward compatibility checks for each new schema version.</p>,
    showMore: {
      position: 'right',
      rightContent: (
        <p className={s.SmallText}>
          Pulsar has a built-in <a target='_blank' href='https://pulsar.apache.org/docs/schema-overview/'>schema registry</a>. This provides the ability to specify a schema for the messages stored in a topic. The registry supports evolving the schema with baked-in forward and backward <a target='_blank' href='https://pulsar.apache.org/docs/3.0.x/schema-understand/#schema-compatibility-check'>compatibility checks</a> to prevent making grave mistakes when producing or consuming messages with incompatible schema.
          Several schema languages are supported, including Avro and Protobuf.
        </p>
      )
    }
  },
  {
    className: s.AccessControlCard,
    leftContent: <h3>Granular Access Control</h3>,
    rightContent: <p>Pulsar supports user authentication with the ability to set access to specific namespaces or topics with limited permissions (consume, produce, etc.)</p>,
    showMore: {
      position: 'right',
      rightContent: (
        <p className={s.SmallText}>
          Pulsar has the notion of <a target="_blank" href="https://pulsar.apache.org/docs/security-overview/">users</a> and a list of permissions they each have for a given namespace or topic. There is a <a target='_blank' href='https://pulsar.apache.org/reference/#/3.0.x/config/reference-configuration-broker?id=superuserroles'>configured</a> list of users assigned the unique role of Super Admin, granting them access to everything. Each tenant has such a <a target="_blank" href="https://pulsar.apache.org/docs/admin-api-tenants/#update">list</a> for the role of Tenant Admin, giving users the ability to <a target='_blank' href='https://pulsar.apache.org/docs/admin-api-permissions/'>grant permissions</a> for namespaces and topics contained within the tenant.<br />
          The permissions include: producing messages, consuming messages, running functions, and installing connectors, sinks, or sources.<br />
          This enables an organization to empower teams to self-manage access to their application's data (typically contained within a tenant).
        </p>
      )
    }
  },
  {
    className: s.MessagePersistencyCard,
    leftContent: <h3>Guaranteed message persistency</h3>,
    rightContent: <p>Pulsar writes to Bookkeeper are guaranteed to be written to disk (a.k.a fsync), providing high resiliency to machine failures. It can be disabled to favor higher throughput.</p>,
    showMore: {
      position: 'right',
      rightContent: (
        <p className={s.SmallText}>
          When Pulsar receives a message, it writes it to Bookkeeper using its client, which writes to 3 Bookkeeper nodes in parallel by default. The write is considered a success only if 2 Bookkeeper nodes write it successfully. Only then Pulsar acknowledge the write to the client.<br />
          Bookkeeper, by default, writes the message to the disk, into a write-ahead-log called a <a target='_blank' href='https://bookkeeper.apache.org/docs/4.8.2/getting-started/concepts/#journals'>journal</a>, then to the memory, and only then reports the write as a success back to the client. The vital feature of Bookkeeper is that it ensures the write to disk has been flushed (written to the disk guaranteed - a.k.a. fsync) before considering the write as a success. Performance is regarded by calling the expensive fsync operation once per batch of messages.<br />
          This default behavior is perfect for cases where you simply can’t lose a written message. You can turn it <a target='_blank' href='https://github.com/apache/bookkeeper/blob/f8d81f7eb861235d5516f7781f6eac70702b3c69/conf/bk_server.conf#L354-L360'>off</a> and thereby gain a performance gain and rely on the other replica to survive, while a Bookkeeper “repair” mechanism fixes the other replicas in the background.
        </p>
      )
    }
  },
  {
    className: s.SeparateComputeFromStorageCard,
    leftContent: (
      <div>
        <h3>Separate Compute from Storage</h3>
        <p style={{ marginBottom: '2rem' }}>Choose the best instance types for storage and CPU separately due to Pulsar's unique architecture. Support massive parallel query engines by a direct read from Bookkeeper.</p>
        <p className={s.SmallText}>
          Pulsar architecture comprises a broker handling read and writes and Apache Bookkeeper as the storage layer. This allows you to select the best instance type for Pulsar brokers - CPU optimized, and the best instance type for Bookkeeper nodes - I/O optimized machine.<br />
          This architecture also enables Big Data support by reading the data directly from Bookkeeper without going through Pulsar brokers - great for massive parallel query engines.
        </p>
      </div>
    )
  },
  {
    className: s.AdditionalProtocolsCard,
    leftContent: <h3>Built to support additional protocols<br />(Kafka, RabbitMQ, …)</h3>,
    rightContent: <p>Use popular messaging system clients with Pulsar as the backend, powered by community plugins: Kafka, RabbitMQ, and more. This facilitates moving to Pulsar gradually.</p>,
    showMore: {
      position: 'right',
      rightContent: (
        <p className={s.SmallText}>
          Pulsar has many plugin types, among them one called Protocol Handler. It allows adding additional messaging protocols to the existing Pulsar binary protocol. The plugin is in charge of reading the data from the socket, and translating it to Pulsar commands, such as writing a message, listing a topic, etc.
          <br />
          <br />
          This has allowed the community to develop support for additional protocols which are widely adopted, such as AMQP, Kafka, RabbitMQ, RocketMQ, and MQTT. See this <a target='_blank' href="https://pulsar.apache.org/ecosystem/">page</a> for a listing of existing community protocol handlers. This enabled working, for example, with the Kafka client or RabbitMQ client but with Pulsar as the backend system.
        </p>
      )
    }
  },
  {
    className: s.ServerlessFunctionsCard,
    rightContent: (
      <div className={s.ServerlessFunctionsCardMainContent}>
        <h3>Serverless Functions</h3>
        <p>
          Write and deploy functions natively using Pulsar Functions. Process messages using Java, Go, or Python without deploying fully-fledged applications. Kubernetes runtime is bundled.
        </p>
      </div>
    ),
    showMore: {
      position: 'right',
      rightContent: (
        <p className={s.SmallText}>
          Pulsar is great for ingesting messages, consuming them in various ways, and retaining them for your desired duration. People often write a fully-fledged application to consume and run complex logic on them. On some occasions, you need a simple transformation to the messages. You can roll your own app for it or use a stream processing tool like Spark, Flink, etc. Both are overkill: Rolling an app for a minor message modification still requires writing a lot of plumbing code, while rolling Spark / Flink requires lots of knowledge of those systems and time to maintain them.
          <br />
          <br />
          Pulsar offers a lightweight stream processing framework called <a target='_blank' href='https://pulsar.apache.org/docs/functions-overview/'>Pulsar&nbsp;Functions</a>. It enables you to author a function in a single file in Java, Go, or Python and deploy it to Pulsar Functions, which runs that function for you. Functions will run on each message in the topic defined and have the option to write a message on any topic. It’s perfect for simple message transformations: Read a message from a topic, transform it, and write it to another topic. It’s also been used for various bigger tasks, such as ML training.
          <br />
          <br />
          Pulsar Functions support <a target='_blank' href='https://pulsar.apache.org/docs/functions-deploy-cluster-parallelism/'>parallelism</a> by allowing you to specify how many instances of the function it will run. It has a unique process for coordinating and executing those functions called <a target='_blank' href='https://pulsar.apache.org/docs/functions-concepts/#function-worker'>Pulsar Function Worker</a>. It <a target='_blank' href='https://pulsar.apache.org/docs/3.0.x/functions-concepts/#function-runtime'>supports</a> running functions in a thread, a dedicated process, or a pod in K8s.
        </p>
      )
    }
  },
  {
    className: s.ConnectorsCard,
    leftContent: (
      <div className={s.ConnectorsCardMainContent}>
        <h3>Official 3rd party Connectors</h3>
        <p>
          Write and deploy functions natively using Pulsar Functions. Process messages using Java, Go, or Python without deploying fully-fledged applications. Kubernetes runtime is bundled.
        </p>
      </div>
    ),
    showMore: {
      position: 'left',
      leftContent: (
        <p className={s.SmallText}>
          Pulsar has a built-in framework called <a target='_blank' href='https://pulsar.apache.org/docs/io-overview/'>Pulsar IO</a>, which simplifies authoring and executing Connectors, which enables reading data from a third-party system into a Pulsar topic or writing messages stored in Pulsar topics to a third-party system.
          <br />
          <br />
          Pulsar has several officially maintained connectors of popular 3rd parties: MySQL, Elasticsearch, Cassandra, and more. The complete list is available <a target='_blank' href='https://pulsar.apache.org/docs/io-connectors/'>here</a>.
          <br />
          <br />
          Pulsar IO was written on top of Pulsar Functions, so a Connector (be it Sink or Source) is a Pulsar Function. The connector runs using Pulsar Function Worker based on the runtime chosen (thread, process, or K8s pod). This means it also supports parallelism (increasing the number of instances running the connector and dividing the work among them).
        </p>
      )
    }
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <Layout
      title='Features'
      description='Apache Pulsar features overview.'
    >
      <div className={s.FeaturesPage}>
        <div className={s.Cards}>
          <section className={s.Intro}>
            <h1 className={s.IntroTextA}>
              Pulsar Features
            </h1>
            <h2 className={s.IntroTextB}>
              The complete platform for messaging and streaming.
            </h2>
            <p className={s.IntroTextC}>
              The combination of features that makes Apache Pulsar more than just a message broker.
            </p>
          </section>

          {cards.map((card, i) => (
            <div key={i} className={s.Card}>
              <Card {...card} />
            </div>
          ))}
        </div>

        {/* <div>
          <Card
            className={s.LargeMessagesCard}

          />
        </div> */}
      </div>
    </Layout>
  );
}

export default FeaturesPage;
