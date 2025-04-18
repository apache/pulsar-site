export const categories = [
  'articles',
  'older_articles',
  'presentations'
] as const;
export type Category = typeof categories[number];

export const categoryLabels: Record<Category, string> = {
  articles: 'Articles',
  older_articles: 'Older Articles',
  presentations: 'Presentations',
};

export type Resource = {
  forum: string;
  forum_link: string;
  title: string;
  link: string;
  date?: string;
  tags?: string[];
  presenter?: string;
};

export const resources: Record<Category, Resource[]> = {
  articles: [
    {
      forum: 'Attentive Blog',
      forum_link: 'https://tech.attentive.com/',
      date: 'April 2025',
      title: "Goodbye Distributed Locks: Message Orchestration at Scale with Apache Pulsar",
      link: 'https://tech.attentive.com/articles/goodbye-distributed-locks',
      tags: ['Pulsar', 'distributed lock', 'subscription types', 'tradeoffs']
    },
    {
      forum: 'StreamNative Blog',
      forum_link: 'https://streamnative.io/blogs/',
      date: 'August 2022',
      title: "Troubleshooting and Optimization: Managing Pulsar Clusters with over 100 Billion Messages Daily",
      link: 'https://streamnative.io/blog/case/2022-08-18-client-optimization-how-tencent-maintains-apache-pulsar-clusters-with-over-100-billion-messages-daily/',
      tags: ['Pulsar', 'troubleshooting', 'optimization', 'best practices']
    },
    {
      forum: 'DZone',
      forum_link: 'https://dzone.com/',
      date: 'August 2022',
      title: "Understanding Cursors in Apache Pulsar",
      link: 'https://dzone.com/articles/understanding-cursors-tracking-mechanism-in-pulsar',
      tags: ['Pulsar', 'cursor', 'subscription', 'acknowledgment']
    },
    {
      forum: 'Pedro Silvestre',
      forum_link: 'https://www.doc.ic.ac.uk/~pms20/',
      date: 'Oct 2021',
      title: "On the Internals of Stream Processing Systems",
      link: 'https://www.doc.ic.ac.uk/~pms20/post/stream-processing-thread-model/'
    },
    {
      forum: 'Memgraph Blog',
      forum_link: 'https://memgraph.com/blog',
      date: 'Nov 2021',
      title: "Announcing Memgraph 2.1",
      link: 'https://memgraph.com/blog/memgraph-2-1-release'
    },
    {
      forum: 'DataStax Blog',
      forum_link: 'https://www.datastax.com/blog',
      date: 'Nov 2021',
      title: "Infinite Scale without Fail with Starlight for RabbitMQ",
      link: 'https://www.datastax.com/blog/infinite-scale-without-fail-starlight-rabbitmq'
    },
    {
      forum: 'Splunk-MaaS',
      forum_link: 'https://medium.com/splunk-maas',
      date: 'Oct/Nov 2021',
      title: "Apache BookKeeper Observability — Part 1 of 5  ",
      link: 'https://medium.com/splunk-maas/apache-bookkeeper-observability-part-1-introducing-the-metrics-7f0acb32d0dc'
    },
    {
      forum: 'BetterProgramming',
      forum_link: 'https://betterprogramming.pub/',
      date: 'Nov 2021',
      title: "Distributed Locks With Apache Pulsar",
      link: 'https://betterprogramming.pub/distributed-locks-with-apache-pulsar-2d95a4d5ff5e'
    },
    {
      forum: 'Data in Motion',
      forum_link: 'https://www.datainmotion.dev/',
      date: 'Nov 2021',
      title: "Producing and Consuming Pulsar messages with Apache NiFi",
      link: 'https://www.datainmotion.dev/2021/11/producing-and-consuming-pulsar-messages.html'
    },
    {
      forum: 'Umut Bayram\'s Medium',
      forum_link: 'https://medium.com/@ubayram',
      date: 'Nov 2021',
      title: "Apache Pulsar- Apache Kafka vs Apache Pulsar (Turkish)",
      link: 'https://medium.com/@ubayram/apache-pulsar-apache-kafka-vs-apache-pulsar-418a998084d'
    },
    {
      forum: 'StreamNative Blog ',
      forum_link: 'https://streamnative.io/blogs/',
      date: 'Nov 2021',
      title: "Building Edge Applications With Apache Pulsar",
      link: 'https://streamnative.io/blog/engineering/2021-11-17-building-edge-applications-with-apache-pulsar/'
    },
    {
      forum: 'The New Stack',
      forum_link: 'https://thenewstack.io/',
      date: 'Nov 2021',
      title: "Apache Pulsar: A Unified Queueing and Streaming Platform",
      link: 'https://thenewstack.io/apache-pulsar-a-unified-queueing-and-streaming-platform/'
    },
    {
      forum: 'jaxenter',
      forum_link: 'https://jaxenter.com/',
      date: 'Nov 2021',
      title: "Why Pulsar Beats Kafka for a Scalable, Distributed Data Architecture",
      link: 'https://jaxenter.com/pulsar-kafka-175830.html'
    },
    {
      forum: 'RT Instights',
      forum_link: 'https://www.rtinsights.com/',
      date: 'Oct 2021',
      title: "The Critical Role Streaming Plays in a Data Stack",
      link: 'https://www.rtinsights.com/the-critical-role-streaming-plays-in-a-data-stack/',
      tags: ['john', 'paul', 'ringo', 'george']
    },
    {
      forum: 'Mikel\'s TechBlog',
      forum_link: 'https://mikeldeltio.com/',
      date: 'Sept 2021',
      title: "Distributed Databases: Apache Pulsar (in ESP)",
      link: 'https://mikeldeltio.com/2021/09/20/distributed-databases-apache-pulsar/',
      tags: ['paul', 'ringo']
    },
    {
      forum: 'Pandio Blog',
      forum_link: 'https://pandio.com/blog/',
      date: 'Sept 2021',
      title: "Apache Pulsar vs. Google PubSub",
      link: 'https://pandio.com/blog/a-detailed-deep-dive-into-pulsar-and-google-pubsub-which-is-better-and-why',
      tags: ['paul', 'john']
    },
    {
      forum: 'StreamNative Blog',
      forum_link: 'https://streamnative.io/',
      date: 'Aug 2021',
      title: "Scalable Stream Processing with Pulsar’s Key_Shared Subscription",
      link: 'https://streamnative.io/en/blog/engineering/2021-08-25-scalable-stream-processing-with-pulsars-key-shared-subscription/',
      tags: []
    },
    {
      forum: 'Pandio Blog',
      forum_link: 'https://pandio.com/blog/',
      date: 'July 2021',
      title: "Pulsar vs. Kafka",
      link: 'https://pandio.com/blog/pulsar-vs-kafka/',
      tags: []
    },
    {
      forum: 'Building the Open Data Stack',
      forum_link: 'https://medium.com/building-the-open-data-stack',
      date: 'June 2021',
      title: "5 More Reasons to Choose Apache Pulsar Over Apache Kafka",
      link: 'https://medium.com/building-the-open-data-stack/5-more-reasons-to-choose-apache-pulsar-over-apache-kafka-c09b259e3691',
      tags: []
    },
    {
      forum: 'dattell',
      forum_link: 'https://dattell.com/data-architecture-blog/',
      date: 'Feb 2021',
      title: "Apache Pulsar Subscription Types",
      link: 'https://dattell.com/data-architecture-blog/subscription-types-in-apache-pulsar/'
    }

  ],

  /***************************
   * Older Articles
   * *************************/
  older_articles: [
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      date: 'July 2020',
      title: "Pulsar vs Kafka - Part 1 - A More Accurate Perspective on Performance, Architecture, and Features",
      link: 'https://streamnative.io/blog/tech/pulsar-vs-kafka-part-1',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      date: 'July 2020',
      title: "Pulsar vs Kafka - Part 2 - Adoption, Use Cases, Differentiators, and Community",
      link: 'https://streamnative.io/blog/tech/pulsar-vs-kafka-part-2',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      date: 'June 2020',
      title: "Taking messaging and data ingestion systems to the next level",
      link: 'https://streamnative.io/blog/tech/2020-07-08-podcast',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      date: 'June 2020',
      title: "Announcing AMQP-on-Pulsar: bring native AMQP protocol support to Apache Pulsar",
      link: 'https://streamnative.io/blog/tech/2020-06-15-announcing-aop-on-pulsar',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      date: 'June 2020',
      title: "How to trace Pulsar messages with OpenTracing and Jaeger",
      link: 'https://streamnative.io/blog/tech/2020-06-11-opentracing-instrumentation-for-pulsar',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      date: 'May 2020',
      title: "Introducing StreamNative Hub — Extend Pulsar Capabilities with Rich Integrations",
      link: 'https://streamnative.io/blog/tech/2020-05-26-intro-to-hub',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "How to Build a Distributed Database with Apache BookKeeper — Part 1",
      link: 'https://streamnative.io/blog/tech/2020-02-04-how-to-build-database',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "How to Build a Distributed Database with Apache BookKeeper — Part 2",
      link: 'https://streamnative.io/blog/tech/2020-04-14-distributed-database-bk2',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "How to Build a Distributed Database with Apache BookKeeper — Part 3",
      link: 'https://streamnative.io/blog/tech/2020-05-12-distributed-database-bk3',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "How Apache Pulsar Helps Streamline Message System and Reduces O&M Costs at Tuya Smart",
      link: 'https://streamnative.io/blog/tech/2020-05-08-tuya-tech-blog',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "Why Zhaopin Chooses Pulsar SQL for Search Log Analysis",
      link: 'https://streamnative.io/blog/tech/2020-05-07-zhaopin-tech-blog',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "Why we moved from Apache Kafka to Apache Pulsar",
      link: 'https://streamnative.io/blog/tech/2020-04-21-from-apache-kafka-to-apache-pulsar',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "Announcing Kafka-on-Pulsar: bring native Kafka protocol support to Apache Pulsar",
      link: 'https://streamnative.io/blog/tech/2020-03-24-bring-native-kafka-protocol-support-to-apache-pulsar',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "Apache Pulsar® Helps Tencent Process Tens of Billions of Financial Transactions Efficiently with Virtually No Data Loss",
      link: 'https://streamnative.io/blog/tech/2020-02-18-pulsar-help-tencent',
      tags: []
    },
    {
      forum: 'Yahoo Engineering blog',
      forum_link: 'https://yahooeng.tumblr.com/',
      title: 'Open sourcing Pulsar, pub-sub messaging at scale',
      link: 'https://yahooeng.tumblr.com/post/150078336821/open-sourcing-pulsar-pub-sub-messaging-at-scale',
      tags: []
    },
    {
      forum: 'Streamlio blog',
      forum_link: 'https://streaml.io/blog',
      title: 'Introduction to Apache Pulsar',
      link: 'https://streaml.io/blog/intro-to-pulsar/',
      tags: []
    },
    {
      forum: 'Streamlio blog',
      forum_link: 'https://streaml.io/blog',
      title: 'Why Apache Pulsar? Part 1',
      link: 'https://streaml.io/blog/why-apache-pulsar/',
      tags: []
    },
    {
      forum: 'Streamlio blog',
      forum_link: 'https://streaml.io/blog',
      title: 'Why Apache Pulsar? Part 2',
      link: 'https://streaml.io/blog/why-apache-pulsar-part-2',
      tags: []
    },
    {
      forum: "Jack Vanlightly's blog",
      forum_link: 'https://jack-vanlightly.com',
      title: 'Understanding How Apache Pulsar Works',
      link: 'https://jack-vanlightly.com/blog/2018/10/2/understanding-how-apache-pulsar-works',
      tags: []
    },
    {
      forum: "Anuradha Prasanna's blog",
      forum_link: 'https://medium.com/@anuradha.neo',
      title: 'Kafka is not the best anymore - Meet Pulsar!',
      link: 'https://medium.com/@anuradha.neo/kafka-is-not-the-best-anymore-meet-pulsar-9eb435c9fc0b',
      tags: []
    },
    {
      forum: 'Kafkaesque blog',
      forum_link: 'https://kafkaesque.io/news/',
      title: '7 Reasons We Choose Apache Pulsar over Apache Kafka',
      link: 'https://kafkaesque.io/7-reasons-we-choose-apache-pulsar-over-apache-kafka/',
      tags: []
    },
    {
      forum: "Jack Vanlightly's blog",
      forum_link: 'https://jack-vanlightly.com',
      title: 'How to (not) lose messages on an Apache Pulsar Cluster',
      link: 'https://jack-vanlightly.com/blog/2018/10/21/how-to-not-lose-messages-on-an-apache-pulsar-cluster',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "How Orange Financial combats financial fraud in over 50M transactions a day using Apache Pulsar",
      link: 'https://streamnative.io/blog/tech/2019-11-11-how-orange-finaacial-combats-financial-fraud-over-50m-transactions-a-day-useing-apache-pulsar',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "Powering Tencent Billing Platform with Apache Pulsar",
      link: 'https://streamnative.io/blog/tech/2019-10-22-powering-tencent-billing-platform-with-apache-pulsar/',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "Use Apache SkyWalking to Trace Apache Pulsar Messages",
      link: 'https://streamnative.io/blog/tech/2019-10-10-use-apache-skywalking-to-trace-apache-pulsar/',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "StreamNative open sourced and contributed Apache Pulsar Manager to ASF",
      link: 'https://streamnative.io/blog/tech/2019-09-24-streamnative-opensourced-pulsar-manager/',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "Apache Pulsar Adoption Story in ActorCloud (IoT Platform)",
      link: 'https://streamnative.io/blog/tech/2019-09-09-apache-pulsar-adoption-in-actorcloud/',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "Apache Pulsar at Yahoo!JAPAN",
      link: 'https://streamnative.io/blog/tech/2019-09-06-pular-at-yahoo-japan/',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "Build a Priority-based Push Notification System Using Apache Pulsar at GeTui",
      link: 'https://streamnative.io/blog/tech/2019-07-23-build-a-priority-based-push-notification-system-using-apache-pulsar-at-getui/',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://streamnative.io/',
      title: "Use Apache Pulsar as Streaming Table with 8 Lines of Code",
      link: 'https://streamnative.io/blog/tech/2019-08-28-use-apache-pulsar-as-streaming-table-with-8-lines-of-code/',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://medium.com/streamnative/',
      title: 'Apache Pulsar as One Unified Storage System for Real Time and Historical Analysis',
      link: 'https://medium.com/streamnative/apache-pulsar-as-one-storage-455222c59017',
      tags: []
    },
    {
      forum: 'StreamNative blog',
      forum_link: 'https://medium.com/streamnative/',
      title: "What’s New in Apache Pulsar 2.4.0",
      link: 'https://medium.com/streamnative/whats-new-in-apache-pulsar-2-4-0-d646f6727642',
      tags: []
    },
    {
      forum: "Penghui Li's blog",
      forum_link: 'https://medium.com/@codelipenghui',
      title: "Simplifying Zhaopin's Event Center Using Apache Pulsar",
      link: 'https://medium.com/@codelipenghui/simplifying-zhaopins-event-center-with-apache-pulsar-9784b73bead1',
      tags: []
    },
    {
      forum: "Jowanza Joseph's blog",
      forum_link: "https://www.jowanza.com/blog",
      title: 'Efficient Stream Processing With Pulsar Functions',
      link: 'https://www.jowanza.com/blog/2019/3/9/efficient-stream-processing-with-pulsar-functions',
      tags: []
    },
    {
      forum: "Jesse Anderson's blog",
      forum_link: 'http://www.jesse-anderson.com/',
      title: 'Creating Work Queues with Apache Kafka and Apache Pulsar',
      link: 'http://www.jesse-anderson.com/2018/08/creating-work-queues-with-apache-kafka-and-apache-pulsar/',
      tags: []
    },
    {
      forum: 'Streamlio blog',
      forum_link: 'https://streaml.io/blog',
      title: 'Building Data Driven Applications at STICORP using Apache Pulsar',
      link: 'https://streaml.io/blog/building-data-driven-applications-with-apache-pulsar-at-sticorp',
      tags: []
    },
    {
      forum: 'The Hut Group tech blog',
      forum_link: 'https://medium.com/thg-tech-blog',
      title: 'A feather in the caps',
      link: 'https://medium.com/thg-tech-blog/a-feather-in-their-caps-4c4083cf9f46',
      tags: []
    },
    {
      forum: "Karthikeyan Palanivelu's blog",
      forum_link: 'https://medium.com/@pckeyan',
      title: 'Apache Pulsar — One Cluster for the entire enterprise using Multi-tenancy',
      link: 'https://medium.com/@pckeyan/apache-pulsar-one-cluster-for-the-entire-enterprise-using-multi-tenancy-c37e2ee350ef',
      tags: []
    },
    {
      forum: "Capital One tech blog",
      forum_link: "https://medium.com/capital-one-tech",
      title: 'Apache Pulsar — A Gentle Introduction to Apache’s Newest Pub-Sub Messaging Platform',
      link: 'https://medium.com/capital-one-tech/apache-pulsar-apaches-newest-pub-sub-messaging-platform-1c1ba1a6c673',
      tags: []
    },
    {
      forum: "Karthikeyan Palanivelu's blog",
      forum_link: 'https://medium.com/@pckeyan',
      title: 'Apache Pulsar: Geo-replication',
      link: 'https://medium.com/@pckeyan/apache-pulsar-geo-replication-ad4f0ca3224b',
      tags: []
    },
    {
      forum: "Karthikeyan Palanivelu's blog",
      forum_link: 'https://medium.com/@pckeyan',
      title: 'Apache Pulsar: Geo-replication — Synchronous Replication : Hybrid Deployment Model',
      link: 'https://medium.com/@pckeyan/apache-pulsar-geo-replication-synchronous-replication-hybrid-deployment-model-3282013e9ae5',
      tags: []
    },
    {
      forum: "Streamlio blog",
      forum_link: 'https://streaml.io/blog',
      title: 'Pulsar topic compaction',
      link: 'https://streaml.io/blog/pulsar-topic-compaction',
      tags: []
    },
    {
      forum: "Streamlio blog",
      forum_link: 'https://streaml.io/blog',
      title: 'Tiered Storage in Apache Pulsar',
      link: 'https://streaml.io/blog/tiered-storage-in-apache-pulsar',
      tags: []
    },
    {
      forum: "Streamlio blog",
      forum_link: 'https://streaml.io/blog',
      title: 'Introducing Pulsar IO',
      link: 'https://streaml.io/blog/introducing-pulsar-io',
      tags: []
    },
    {
      forum: "Streamlio blog",
      forum_link: 'https://streaml.io/blog',
      title: 'Pulsar topic compaction',
      link: 'https://streaml.io/blog/pulsar-topic-compaction',
      tags: []
    },

    {
      forum: "Jesse Anderson's blog",
      forum_link: 'https://www.jesse-anderson.com',
      title: 'Reducing Operational Overhead with Pulsar Functions',
      link: 'https://www.jesse-anderson.com/2019/05/reducing-operational-overhead-with-pulsar-functions/',
      tags: []
    },
    {
      forum: "Streamlio blog",
      forum_link: 'https://streaml.io/blog',
      title: 'Querying Data Streams with Apache Pulsar SQL',
      link: 'https://streaml.io/blog/querying-data-streams-with-apache-pulsar-sql',
      tags: []
    },
    {
      forum: "Streamlio blog",
      forum_link: 'https://streaml.io/blog',
      title: 'Configuring Apache Pulsar Tiered Storage with Amazon S3',
      link: 'https://streaml.io/blog/configuring-apache-pulsar-tiered-storage-with-amazon-s3',
      tags: []
    },
    {
      forum: "Streamlio blog",
      forum_link: 'https://streaml.io/blog',
      title: 'Comparing LogDevice and Apache Pulsar',
      link: 'https://streaml.io/blog/comparing-logdevice-and-apache-pulsar',
      tags: []
    },
    {
      forum: "Streamlio blog",
      forum_link: 'https://streaml.io/blog',
      title: 'Pulsar’s Multi-Layer System Architecture',
      link: 'https://streaml.io/blog/apache-pulsar-architecture-designing-for-streaming-performance-and-scalability',
      tags: []
    },
    {
      forum: "Streamlio blog",
      forum_link: 'https://streaml.io/blog',
      title: 'Debugging Pulsar Functions in Java',
      link: 'https://streaml.io/blog/debugging-pulsar-functions-in-java',
      tags: []
    },
    {
      forum: "Streamlio blog",
      forum_link: 'https://streaml.io/blog',
      title: 'Sentiment Analysis of Tweets using Apache Pulsar',
      link: 'https://streaml.io/blog/sentiment-analysis-of-tweets-using-apache-pulsar',
      tags: []
    },
    {
      forum: 'Apache Flink blog',
      forum_link: 'https://flink.apache.org/blog/',
      title: 'When Flink & Pulsar Come Together',
      link: 'https://flink.apache.org/2019/05/03/pulsar-flink.html',
      tags: []
    },
    {
      forum: 'Debezium blog',
      forum_link: 'https://debezium.io/blog',
      title: 'Tutorial for Using Debezium Connectors With Apache Pulsar',
      link: 'https://debezium.io/blog/2019/05/23/tutorial-using-debezium-connectors-with-apache-pulsar/',
      tags: []
    },
  ],

  /******************************
   * Presentations
   ******************************/
  presentations: [
    {
      forum: 'P99Conf',
      forum_link: 'https://www.p99conf.io/',
      presenter: 'Karthik Ramasamy',
      date: 'Oct 2021',
      title: "Scaling Apache Pulsar to 10 PB/day",
      link: 'https://www.youtube.com/watch?v=x76sX4BU2mA'
    },
    {
      forum: 'Apache Pulsar Summit',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Many',
      date: 'Oct 2021',
      title: "Apache Pulsar Summit Europe 2021 Playlist",
      link: 'https://www.youtube.com/playlist?list=PLqRma1oIkcWh7zes7mNeTUCr2iU-2C1jB'
    },

    {
      forum: 'ApacheCon @Home 2021',
      forum_link: 'https://www.apachecon.com/acah2021/',
      presenter: 'Many',
      date: 'Sept 2021',
      title: "Apache Pulsar Playlist",
      link: 'https://www.youtube.com/watch?v=igwxegspSGw&list=PLIt9PL1-3shvC0dGjaPyd0Rqfg1_PZLvS'
    },
    {
      forum: 'Apache Pulsar Neighborhood YouTube',
      forum_link: 'https://www.youtube.com/apachepulsarneighborhood',
      presenter: 'Enrico Olivelli',
      date: 'Sept 2021',
      title: "Apache Pulsar Deep Dive- an End-to-end view of the Data Flow",
      link: 'https://www.youtube.com/watch?v=oLXCCCGsrWM'
    },
    {
      forum: 'Apache Pulsar Neighborhood YouTube',
      forum_link: 'https://www.youtube.com/apachepulsarneighborhood',
      presenter: 'Simba Khadder',
      date: 'Sept 2021',
      title: "Apache Pulsar and Machine Learning",
      link: 'https://youtu.be/K2WXDwo1y0k'
    },
    {
      forum: 'Apache Pulsar Neighborhood YouTube',
      forum_link: 'https://www.youtube.com/apachepulsarneighborhood',
      presenter: 'Enrico Olivelli',
      date: 'Sept 2021',
      title: "Leveraging Pulsar's Next Gen Streaming Capabilities from a JavaEE Application",
      link: 'https://www.youtube.com/watch?v=0NA0BIvkQrs'
    },
    {
      forum: 'Devin Bost\'s YouTube',
      forum_link: 'https://www.youtube.com/channel/UCz_Y86AT4G15xU3IojhX2Kw',
      presenter: 'Devin Bost',
      date: 'Aug 2021',
      title: "Streaming Patterns and Best Practices with Apache Pulsar for Enabling Machine Learning and Analytics",
      link: 'https://www.youtube.com/watch?v=Fdqre_hTnUI'
    },

    {
      forum: 'Pulsar Summit NA 2021',
      forum_link: 'https://pulsar-summit.org/',
      presenter: '',
      date: 'June 2021',
      title: "Pulsar Summit NA 2021 Playlist",
      link: 'https://www.youtube.com/watch?v=-Bm1h508oIQ&list=PLqRma1oIkcWjyezVodJHcp8GSypvGuc1C'
    },
    {
      forum: 'Apache Pulsar Neighborhood YouTube',
      forum_link: 'https://www.youtube.com/apachepulsarneighborhood',
      presenter: 'Enrico Olivelli',
      date: 'Sept 2021',
      title: "Apache Pulsar Deep Dive- an End-to-end view of the Data Flow",
      link: 'https://www.youtube.com/watch?v=oLXCCCGsrWM',
      tags: []
    },
    {
      forum: 'Apache Pulsar Neighborhood YouTube',
      forum_link: 'https://www.youtube.com/apachepulsarneighborhood',
      presenter: 'Simba Khadder',
      date: 'Sept 2021',
      title: "Apache Pulsar and Machine Learning",
      link: 'https://youtu.be/K2WXDwo1y0k',
      tags: []
    },
    {
      forum: 'Apache Pulsar Neighborhood YouTube',
      forum_link: 'https://www.youtube.com/apachepulsarneighborhood',
      presenter: 'Enrico Olivelli',
      date: 'Sept 2021',
      title: "Leveraging Pulsar's Next Gen Streaming Capabilities from a JavaEE Application",
      link: 'https://www.youtube.com/watch?v=0NA0BIvkQrs',
      tags: []
    },
    {
      forum: 'Devin Bost\'s YouTube',
      forum_link: 'https://www.youtube.com/channel/UCz_Y86AT4G15xU3IojhX2Kw',
      presenter: 'Devin Bost',
      date: 'Aug 2021',
      title: "Streaming Patterns and Best Practices with Apache Pulsar for Enabling Machine Learning and Analytics",
      link: 'https://www.youtube.com/watch?v=Fdqre_hTnUI',
      tags: []
    },

    {
      forum: 'Pulsar Summit NA 2021',
      forum_link: 'https://pulsar-summit.org/',
      presenter: '',
      date: 'June 2021',
      title: "Pulsar Summit NA 2021 Playlist",
      link: 'https://www.youtube.com/watch?v=-Bm1h508oIQ&list=PLqRma1oIkcWjyezVodJHcp8GSypvGuc1C',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Ludwig Pummer, Joe Francis',
      date: 'June 2020',
      title: "Five Years of Operating a Large Scale Globally Replicated Pulsar Installation",
      link: 'https://www.slideshare.net/streamnative/five-years-of-operating-a-large-scale-globally-replicated-pulsar-installation',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Alexandre Duval',
      date: 'June 2020',
      title: "Building a FaaS with Pulsar",
      link: 'https://www.slideshare.net/streamnative/building-a-faas-with-pulsar',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Greg Methvin',
      date: 'June 2020',
      title: "Scaling customer engagement with Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/scaling-customer-engagement-with-apache-pulsar',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'William MaLane',
      date: 'June 2020',
      title: "Finding your pulse for a global enterprise communications nervous system",
      link: 'https://www.slideshare.net/streamnative/finding-your-pulse-for-a-global-enterprise-communications-nervous-systemwilliam-mclane',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'David Kjerrumgaard',
      date: 'June 2020',
      title: "Using Apache Pulsar to Provide Real-Time IoT Analytics on the Edge",
      link: 'https://www.slideshare.net/streamnative/using-apache-pulsar-to-provide-realtime-iot-analytics-on-the-edgedavid',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Neng Lv',
      date: 'June 2020',
      title: "Stream or segment: what is the best way to access your events in Pulsar",
      link: 'https://www.slideshare.net/streamnative/stream-or-segment-what-is-the-best-way-to-access-your-events-in-pulsarneng',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Simba Khadder',
      date: 'June 2020',
      title: "Feature Stories: Building Machine Learning Infrastructure on Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/feature-stores-building-machine-learning-infrastructure-on-apache-pulsarsimba-khadder',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Sanjeev Kulkarni',
      date: 'June 2020',
      title: "Pulsar Functions Deep Dive",
      link: 'https://www.slideshare.net/streamnative/pulsar-functions-deep-divesanjeev-kulkarni',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Jesse Anderson',
      date: 'June 2020',
      title: "Pulsar for Kafka People",
      link: 'https://www.slideshare.net/streamnative/pulsar-for-kafka-peoplejesse-anderson',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Jerry Peng',
      date: 'June 2020',
      title: "Interactive querying of streams using Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/interactive-querying-of-streams-using-apache-pulsarjerry-peng',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Anup Ghatage, Ankit Jain',
      date: 'June 2020',
      title: "The first step to Multi AZ architecture for Apache BookKeeper",
      link: 'https://www.slideshare.net/streamnative/the-first-step-to-multi-az-architecture-for-apache-bookkeeperanup-ghatage',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Carolyn King, Matteo Merli, Sijie Guo',
      date: 'June 2020',
      title: "Messaging & Streaming Everywhere",
      link: 'https://www.slideshare.net/streamnative/open-keynotecarolynmatteosijie',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Joe Francis, Rajan Dhabalia',
      date: 'June 2020',
      title: "Pulsar Storage on BookKeeper - Seamless Evolution",
      link: 'https://www.slideshare.net/streamnative/pulsar-storage-on-bookkeeper-seamless-evolution',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Ningguo Chen',
      date: 'June 2020',
      title: "How Apache Pulsar Helps Tencent Process Tens of Billions of Transactions Efficiently",
      link: 'https://www.slideshare.net/streamnative/how-apache-pulsar-helps-tencent-process-tens-of-billions-of-transactions-efficientlyningguo-chen',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Vincent Xie, Jia Zhai',
      date: 'June 2020',
      title: "Unify Storage Backend for Batch and Streaming Computation with Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/unify-storage-backend-for-batch-and-streaming-computation-with-apache-pulsarvincent',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Seth Wiesman',
      date: 'June 2020',
      title: "Unified Data Processing with Apache Flink and Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/unified-data-processing-with-apache-flink-and-apache-pulsarseth-wiesman',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Paige Roberts',
      date: 'June 2020',
      title: "Architecting Production IoT Analytics",
      link: 'https://www.slideshare.net/streamnative/architecting-production-iot-analyticspaige-roberts',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Nozomi Kurihara',
      date: 'June 2020',
      title: "Large scale log pipeline using Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/large-scale-log-pipeline-using-apache-pulsarnozomi',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Robert van Mölken',
      date: 'June 2020',
      title: "Ten reasons to choose Apache Pulsar over Apache Kafka for Event Sourcing",
      link: 'https://www.slideshare.net/streamnative/ten-reasons-to-choose-apache-pulsar-over-apache-kafka-for-event-sourcingrobert-van-mlken',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Simon Crosby',
      date: 'June 2020',
      title: "Easily Build a Smart Pulsar Stream Processor",
      link: 'https://www.slideshare.net/streamnative/easily-build-a-smart-pulsar-stream-processorsimon-crosby',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Pranav Dharma',
      date: 'June 2020',
      title: "How Splunk Mission Control leverages various Pulsar subscription types",
      link: 'https://www.slideshare.net/streamnative/how-splunk-mission-control-leverages-various-pulsar-subscription-typespranav-dharma',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Caito Scherr',
      date: 'June 2020',
      title: "Streaming, Fast and Slow",
      link: 'https://www.slideshare.net/streamnative/streaming-fast-and-slowcaito-scherr',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Karthik Ramasamy',
      date: 'June 2020',
      title: "Why Splunk Chose Pulsar",
      link: 'https://www.slideshare.net/streamnative/why-splunk-chose-pulsarkarthik-ramasamy',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Chris Kellogg',
      date: 'June 2020',
      title: "Securing your Pulsar Cluster with Vault",
      link: 'https://www.slideshare.net/streamnative/securing-your-pulsar-cluster-with-vaultchris-kellogg-236137352',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Enrico Olivelli',
      date: 'June 2020',
      title: "Introducing HerdDB - a distributed JVM embeddable database built upon Apache BookKeeper",
      link: 'https://www.slideshare.net/streamnative/introducing-herddb-a-distributed-jvm-embeddable-database-built-upon-apache-bookkeeperenrico-olivelli',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Pierre Zemb',
      date: 'June 2020',
      title: "Building a Messaging Solutions for OVHcloud with Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/building-a-messaging-solutions-for-ovhcloud-with-apache-pulsarpierre-zemb',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Devin Bost',
      date: 'June 2020',
      title: "Pulsar Architectural Patterns for CI/CD Automation and Self-Service",
      link: 'https://www.slideshare.net/streamnative/pulsar-architectural-patterns-for-cicd-automation-and-selfservicedevin-bost-236083234',
      tags: []
    },
    {
      forum: 'Pulsar Summit 2020',
      forum_link: 'https://pulsar-summit.org/',
      presenter: 'Addison Higham',
      date: 'June 2020',
      title: "Getting Pulsar Spinning",
      link: 'https://www.slideshare.net/streamnative/getting-pulsar-spinningaddison-higham',
      tags: []
    },
    {
      forum: 'StreamNative Academy',
      forum_link: 'https://streamnative.io/academy',
      presenter: 'Shivji Jha',
      date: 'May 2020',
      title: "Lessons from managing a Pulsar cluster (Nutanix)",
      link: 'https://www.slideshare.net/streamnative/lessons-from-managing-a-pulsar-cluster-nutanix',
      tags: []
    },
    {
      forum: '',
      forum_link: '',
      presenter: 'Sijie Guo',
      date: 'May 2020',
      title: "Building event streaming pipelines using Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/building-event-streaming-pipelines-using-apache-pulsar',
      tags: []
    },
    {
      forum: 'TGIPulsar',
      forum_link: 'https://streamnative.io/resource#tgip',
      presenter: 'Sijie Guo',
      date: 'April 2020',
      title: "Lifecycle of a Pulsar message",
      link: 'https://www.slideshare.net/streamnative/tgipulsar-ep-006-lifecycle-of-a-pulsar-message',
      tags: []
    },
    {
      forum: '',
      forum_link: '',
      presenter: 'Sijie Guo, Pierre Zemb',
      date: 'March 2020',
      title: "Introducing Kafka-on-Pulsar: bring native Kafka protocol support to Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/introducing-kafkaonpulsar-bring-native-kafka-protocol-support-to-apache-pulsar',
      tags: []
    },
    {
      forum: '2019 China Technical Communication Forum',
      forum_link: 'http://www.tc-china.org/event/tcweekly/7454/',
      presenter: 'Yu Liu',
      date: 'December 2019',
      title: "Code the docs",
      link: 'https://www.slideshare.net/streamnative/code-the-docsyu-liu',
      tags: []
    },
    {
      forum: 'Google DevFest 2019 in Beijing',
      forum_link: 'https://devfest.withgoogle.com/?utm_source=devsite&utm_medium=events&utm_campaign=past&utm_content=DevSite_HPP',
      presenter: 'Xiaolong Ran',
      date: 'December 2019',
      title: "Serverless Event Streaming with Pulsar Functions",
      link: 'https://www.slideshare.net/streamnative/google-devfest-about-pulsar-by-xiaolong',
      tags: []
    },
    {
      forum: 'Apache Pulsar Meetup x PingCAP Infra Meetup | Beijing',
      forum_link: 'https://www.huodongxing.com/event/7520647658000',
      presenter: 'Xiaolong Ran',
      date: 'December 2019',
      title: "Apache Pulsar and GitHub",
      link: 'https://www.slideshare.net/streamnative/apache-pulsar-and-githubxiaolong',
      tags: []
    },
    {
      forum: 'Apache Pulsar Meetup x PingCAP Infra Meetup | Beijing',
      forum_link: 'https://www.huodongxing.com/event/7520647658000',
      presenter: 'Penghui Li, Yong Zhang',
      date: 'December 2019',
      title: "Transaction preview of Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/transaction-preview-of-apache-pulsar',
      tags: []
    },
    {
      forum: 'Apache Pulsar Meetup | Shanghai',
      forum_link: 'https://www.huodongxing.com/event/5515876233300',
      presenter: 'Xiaolong Ran, Guangning E',
      date: 'November 2019',
      title: "Pulsarctl & Pulsar Manager",
      link: 'https://www.slideshare.net/streamnative/pulsarctl-pulsar-manager',
      tags: []
    },
    {
      forum: 'Apache Pulsar Meetup | Shanghai',
      forum_link: 'https://www.huodongxing.com/event/5515876233300',
      presenter: 'Jennifer Huang',
      date: 'November 2019',
      title: "Apache Pulsar Community",
      link: 'https://www.slideshare.net/streamnative/apache-pulsar-communityjennifer',
      tags: []
    },
    {
      forum: 'Apache Pulsar Meetup | Shanghai',
      forum_link: 'https://www.huodongxing.com/event/5515876233300',
      presenter: 'Penghui Li, Bo Cong, Jia Zhai',
      date: 'November 2019',
      title: "Preview of Apache Pulsar 2.5.0",
      link: 'https://www.slideshare.net/streamnative/preview-of-apache-pulsar-250',
      tags: []
    },
    {
      forum: 'COSCon\'19',
      forum_link: 'https://kaiyuanshe.cn/activity/summit/coscon-2019/',
      presenter: 'Jennifer Huang',
      date: 'November, 2019',
      title: "Apache Pulsar: A borderless community",
      link: 'https://www.slideshare.net/streamnative/apache-pulsaraborderlesscommunityjennifer',
      tags: []
    },
    {
      forum: 'COSCon\'19',
      forum_link: 'https://kaiyuanshe.cn/activity/summit/coscon-2019/',
      presenter: 'Yu Liu',
      date: 'November, 2019',
      title: "Cos con19 about Pulsar",
      link: 'https://www.slideshare.net/streamnative/cos-con19-pulsaryuliu',
      tags: []
    },
    {
      forum: 'Flink Forward Europe',
      forum_link: 'https://europe-2019.flink-forward.org/',
      presenter: 'Sijie Guo',
      date: 'October 2019',
      title: "Query Pulsar Streams using Apache Flink",
      link: 'https://www.slideshare.net/streamnative/query-pulsar-streams-using-apache-flink',
      tags: []
    },
    {
      forum: 'Strata Data Conference | New York',
      forum_link: 'https://conferences.oreilly.com/strata/strata-ny',
      presenter: 'Vincent Xie, Jia Zhai',
      date: 'September 2019',
      title: "How Orange Financial combat financial frauds over 50M transactions a day using Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/how-orange-financial-combat-financial-frauds-over-50m-transactions-a-day-using-apache-pulsar-176284080',
      tags: []
    },
    {
      forum: 'ApacheCon NA 2019',
      forum_link: 'https://www.apachecon.com/acna19/',
      presenter: 'Xiaolong Ran',
      date: 'September 2019',
      title: "Serverless Event Streaming with Pulsar Functions",
      link: 'https://www.slideshare.net/streamnative/serverless-event-streaming-with-pulsar-functions-171597848',
      tags: []
    },
    {
      forum: 'ApacheCon NA 2019',
      forum_link: 'https://www.apachecon.com/acna19/',
      presenter: 'Penghui Li, Jia Zhai',
      date: 'September 2019',
      title: "Building Zhaopin's enterprise event center on Apache Pulsar",
      link: 'https://www.slideshare.net/streamnative/building-zhaopins-enterprise-event-center-on-apache-pulsar',
      tags: []
    },
    {
      forum: '',
      forum_link: '',
      presenter: 'Sijie Guo',
      date: 'August 2019',
      title: "When Apache Pulsar meets Apache Flink",
      link: 'https://www.slideshare.net/streamnative/when-apache-pulsar-meets-apache-flink',
      tags: []
    },
    {
      forum: 'Apache Pulsar Meetup | Beijing',
      forum_link: 'https://www.huodongxing.com/event/1502359221000',
      presenter: 'Sijie Guo, Yong Zhang',
      date: 'August 2019',
      title: "Transaction Support in Pulsar 2.5.0",
      link: 'https://www.slideshare.net/streamnative/transaction-support-in-pulsar-250',
      tags: []
    },
    {
      forum: 'Apache Pulsar Meetup | Beijing',
      forum_link: 'https://www.huodongxing.com/event/1502359221000',
      presenter: 'Yijie Shen',
      date: 'August 2019',
      title: "Integrating Apache Pulsar with Big Data Ecosystem",
      link: 'https://www.slideshare.net/streamnative/8-integrate-apachepulsarwithbigdataecosystem',
      tags: []
    },
    {
      forum: 'Apache Pulsar Meetup | Beijing',
      forum_link: 'https://www.huodongxing.com/event/1502359221000',
      presenter: 'Penghui Li, Bo Cong',
      date: 'August 2019',
      title: "How Zhaopin contributes to Pulsar community",
      link: 'https://www.slideshare.net/streamnative/3-zhaopin-inpulsarcommunity-165096725',
      tags: []
    },
    {
      forum: 'Apache Pulsar Meetup | Beijing',
      forum_link: 'https://www.huodongxing.com/event/1502359221000',
      presenter: 'Jia Zhai',
      date: 'August 2019',
      title: "Kafka on Pulsar(KOP)",
      link: 'https://www.slideshare.net/streamnative/2-kafkaonpulsarjia',
      tags: []
    },
    {
      forum: 'Apache Pulsar Meetup | Beijing',
      forum_link: 'https://www.huodongxing.com/event/1502359221000',
      presenter: 'Nozomi Kurihara',
      date: 'August 2019',
      title: "Apache Pulsar at Yahoo!JAPAN",
      link: 'https://www.slideshare.net/streamnative/1-apache-pulsaratyahoojapan-165095533',
      tags: []
    },
    {
      forum: '',
      forum_link: '',
      presenter: 'Sijie Guo',
      date: 'June 2019',
      title: "What's new in apache pulsar 2.4.0",
      link: 'https://www.slideshare.net/streamnative/whats-new-in-apache-pulsar-240',
      tags: []
    },
    {
      forum: 'Apache Pulsar Meetup | Shenzhen',
      forum_link: 'https://www.huodongxing.com/event/9495713659500',
      presenter: 'Yijie Shen',
      date: 'June 2019',
      title: 'A Unified Platform for Real-time Storage and Processing - Apache Pulsar as Stream Storage, Apache Spark for Processing as an example',
      link: 'https://www.slideshare.net/streamnative/a-unified-platform-for-realtime-storage-and-processing',
      tags: []
    },
    {
      forum: 'Ray Forward Beijing Meetup',
      forum_link: 'https://tech.antfin.com/community/activities/698',
      presenter: 'Sijie Guo',
      date: 'June 2019',
      title: 'Serverless Event Streaming with Pulsar Functions',
      link: 'https://www.slideshare.net/streamnative/serverless-event-streaming-with-pulsar-functions',
      tags: []
    },
    {
      forum: 'Flink Forward San Francisco 2019',
      forum_link: 'https://sf-2019.flink-forward.org/',
      presenter: 'Sijie Guo',
      date: 'April 2019',
      title: 'Elastic Data Processing with Apache Flink and Apache Pulsar',
      link: 'https://www.slideshare.net/streamnative/elastic-data-processing-with-apache-flink-and-apache-pulsar',
      tags: []
    },
    {
      forum: 'Strata Data San Francisco 2019',
      forum_link: '',
      presenter: 'Penghui Li, Sijie Guo',
      date: 'March 2019',
      title: 'How Zhaopin built its Event Center using Apache Pulsar',
      link: 'https://www.slideshare.net/streamnative/how-zhaopin-built-its-event-center-using-apache-pulsar-152691364',
      tags: []
    },
    {
      forum: 'Strata San Jose',
      forum_link: 'https://conferences.oreilly.com/strata/strata-ca',
      presenter: 'Matteo Merli',
      date: 'March 2018',
      title: 'Effectively-once semantics in Apache Pulsar',
      link: 'https://www.slideshare.net/merlimat/effectivelyonce-semantics-in-apache-pulsar',
      tags: []
    },
    {
      forum: '',
      forum_link: '',
      presenter: 'Matteo Merli',
      date: 'November 2016',
      title: 'Pulsar: a distributed pub-sub platform',
      link: 'https://www.slideshare.net/merlimat/pulsar-distributed-pubsub-platform',
      tags: []
    },
    {
      forum: 'Bay Area Hadoop Meetup',
      forum_link: 'https://www.meetup.com/hadoop',
      presenter: 'Matteo Merli',
      date: 'October 2016',
      title: 'Pulsar: a highly scalable, low-latency pub-sub messaging system',
      link: 'https://www.slideshare.net/ydn/october-2016-hug-pulsar-a-highly-scalable-low-latency-pubsub-messaging-system',
      tags: []
    }
  ]
}
