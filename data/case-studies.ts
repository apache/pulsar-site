export const categories = [
  'financial_services',
  'healthcare',
  'software_it',
  'telecom',
  'retail',
  'transportation_logistics',
  'apparel_manufacturing'
] as const;
export type Category = typeof categories[number];

export const categoryLabels: Record<Category, string> = {
  financial_services: 'Financial Services',
  healthcare: 'Healthcare',
  software_it: 'Software & IT',
  telecom: 'Telecom',
  retail: 'Retail',
  transportation_logistics: 'Transportation & Logistics',
  apparel_manufacturing: 'Apparel Manufacturing'
};

export type Resource = {
  company: string;
  link: string;
  image: string;
  description: string;
};

export const resources: Record<Category, Resource[]> =
  {

    financial_services:  [
      {
        company: "Belvedere Trading",
        link: 'https://www.youtube.com/watch?v=myJ43xfZHsg',
        image: require("@site/static/img/belvedere-trading.png").default,
        description: "Leveraging Pulsar to stream exchange market data to the cloud."
      },
      {
        company: "Bestpay / Orange Financial",
        link: 'https://streamnative.io/success-story/bestpay/',
        image: require("@site/static/img/bestpay.png").default,
        description: "Together with a unified computing engine like Spark, Apache Pulsar is able to boost the efficiency of our risk-control decision deployment. Thus, we are able to provide merchants and consumers with safe, convenient, and efficient services."
      },
    ],
    healthcare: [
      {
        company: "Vivy",
        link: 'https://www.datastax.com/blog/how-apache-pulsar-helps-vivy-connect-healthcare-professionals-and-users',
        image: require("@site/static/img/vivy.png").default,
        description: "We found Pulsar, an alternative we really liked from the development point of view—the client is really nice, as well as from the operational point of view; it supports separate bookies and less load on ZooKeeper."
      },
    ],
    software_it:  [
      {
        company: "Appen China",
        link: 'https://www.youtube.com/watch?v=N195msPyC_A',
        image: require('@site/static/img/appen-logo.png').default,
        description: "When serving a large volume of data collection and annotation, we faced some challenges on task distribution, anti-scamming and AI model training. We adopted the Apache Pulsar and NoSQL database solution to resolve those pain points and keep the flexibility. "
      },
      {
        company: "BIGO",
        link: 'https://streamnative.io/success-story/bigo/',
        image: require("@site/static/img/bigo.png").default,
        description: "The messaging team at BIGO found themselves overwhelmed by the massive amounts of data when using Kafka. They then started to learn Apache Pulsar and ran some tests with it, after which they believed Pulsar could be a solution to their challenges. They use Pulsar as a key component in their real-time messaging architecture, which has helped them reduce the hardware cost by 50%."
      },
      {
        company: "Clever Cloud",
        link: 'https://www.youtube.com/watch?v=-pQ6zRz6ij8',
        image: require("@site/static/img/clever-cloud.png").default,
        description: "We're using Apache Pulsar as the foundation for our cloud backbone and developed KoP (Kafka on Pulsar)."
      },
      {
        company: "Cogito Corp",
        link: 'https://www.youtube.com/watch?v=vE7aKZT9r7k',
        image: require("@site/static/img/cogito-corp.png").default,
        description: "Cogito uses Pulsar for streaming real time audio and analytic results and utilizes the vital deduplication feature"
      },
      {
        company: "EMQ",
        link: 'https://streamnative.io/success-story/emq/',
        image: require("@site/static/img/emq.png").default,
        description: "ActorCloud uses Apache Pulsar to store and process streaming data, leverages Apache Pulsar Functions to handle data faster and analyzes IoT data through the SQL engine exposed to the upper layer."
      },
      {
        company: "Huawei Cloud",
        link: 'https://www.youtube.com/watch?v=RC2zIiShjKE',
        image: require("@site/static/img/huawei.png").default,
        description: "Huawei Cloud IoT requires a reliable messaging platform. After comparing the capabilities and features of multiple messaging systems, the design of Apache Pulsar is what made it our choice. "
      },
      {
        company: "Instructure",
        link: 'https://www.youtube.com/watch?v=ViX1wJTmRmk',
        image: require("@site/static/img/instructure.png").default,
        description: "We researched, advocated, built, integrated, and established Apache Pulsar at Instructure in less than a year."
      },
      {
        company: "Intuit",
        link: 'https://www.youtube.com/watch?v=CmyHUN5MRUU',
        image: require("@site/static/img/intuit.png").default,
        description: "We adopted Pulsar for our next generation platform and adapted it for Intuit specific requirements."
      },
      {
        company: "Iterable",
        link: 'https://www.infoq.com/articles/pulsar-customer-engagement-platform/',
        image: require("@site/static/img/iterable.png").default,
        description: "Pulsar provided the right balance of scalability, reliability, and features to replace RabbitMQ at Iterable and, ultimately, to replace other messaging systems like Kafka and Amazon SQS."
      },
      {
        company: "Ksyun",
        link: 'https://www.youtube.com/watch?v=jw5UVhsEIcQ',
        image: require("@site/static/img/ksyun.png").default,
        description: "Currently, our service supports log query and monitoring for many businesses, and processes tens of terabytes of data every day. With Pulsar, we can scale up partitions and merge partitions easily, and process millions of topics."
      },
      {
        company: "Micro Focus",
        link: 'https://www.youtube.com/watch?v=GKh7a8-ZjD4',
        image: require("@site/static/img/micro-focus.jpg").default,
        description: "Modern IT and application environments are increasingly complex, transitioning to cloud, and large in scale. The managed resources, services and applications in these environments generate tremendous data that needs to be observed, consumed and analyzed in real time (or later) by management tools to create insights and to drive operational actions and decisions."
      },
      {
        company: "Narvar",
        link: 'https://www.youtube.com/watch?v=vS4yk4bbLN0',
        image: require("@site/static/img/narvar.png").default,
        description: "Narvar’s platform is built with pub-sub messaging at its core, making reliability, scalability, maintainability, and flexibility business critical."
      },
      {
        company: "Netdata",
        link: 'https://www.youtube.com/watch?v=h2-cjNJjzzE',
        image: require("@site/static/img/netdata.png").default,
        description: "The heart of Netdata Cloud is Pulsar. Almost every message coming from and going to the open source agents passes through Pulsar. Pulsar's infinite number of topics has given us the flexibility we needed and in some cases, every single Netdata Agent has its own unique Pulsar topic."
      },
      {
        company: "Newland",
        link: 'https://www.youtube.com/watch?v=flTQ7H6ygE0',
        image: require("@site/static/img/newland.png").default,
        description: "Apache Pulsar has multi-layer and segment-centric architecture and supports geo-replication. We can query data with PulsarSQL, and create complex processing logic without deploying other systems with Pulsar Functions. "
      },
      {
        company: "Nutanix",
        link: 'https://www.youtube.com/watch?v=Bx4csRi1b8Y&list=PLA7KYGkuAD071myyg4X5ShsDHsOaIpHOq&index=1',
        image: require("@site/static/img/nutanix.png").default,
        description: "Apache Pulsar offers server as well as client side support for the structured streaming. We have been using Pulsar for asynchronous communication among microservices in our Nutanix Beam app for over an year in production."
      },
      {
        company: "OVHCloud",
        link: 'https://www.youtube.com/watch?v=ra9o9_vPeUE',
        image: require("@site/static/img/ovhcloud.png").default,
        description: "We decided to shift and build the foundation of our 'topic-as-a-service' product called ioStream on Apache Pulsar."
      },
      {
        company: "Pandio",
        link: 'https://pandio.com/managed-pulsar-power-page/',
        image: require("@site/static/img/pandio.png").default,
        description: "Pulsar’s flexibility makes it easy to scale and increase your capacity across hundreds of nodes as your needs change Reliable, Low-Latency: Pulsar enables you to scale to more than a million topics with little latency (< 5ms) for publishing."
      },
      {
        company: "ProxyClick",
        link: 'https://www.proxyclick.com/blog/meet-the-proxyclicker-thomas-mouchart',
        image: require("@site/static/img/proxyclick.png").default,
        description: "It gives us consistency with the messages in the queue. It also allows us to replay messages, and it’s a very powerful tool for the distributed systems that like us."
      },
      {
        company: "Qraft",
        link: 'https://streamnative.io/success-story/qraft/',
        image: require("@site/static/img/qraft.png").default,
        description: "We choose Pulsar for its ability to manage distributed transactions within a microservice architecture and its feature flexibility. Pulsar now plays an essential part in helping our AI-powered order execution system to find the optimal strategy in real time."
      },
      {
        company: "Sina Weibo",
        link: 'https://streamnative.io/success-story/sina-weibo/',
        image: require("@site/static/img/sina-weibo-logo.png").default,
        description: "Sina Weibo selected Apache Pulsar and KoP (Kafka on Pulsar) due to Pulsar’s great scalability and KoP’s native support for Kafka clients. It also achieved better metadata consistency by introducing a new component Metadata Event Handler in KoP."
      },
      {
        company: "Softtech",
        link: 'https://www.youtube.com/watch?v=meDBzeintyE',
        image: require("@site/static/img/softtech.png").default,
        description: "Softtech built an event-based consent management system with an average throughput of 500 Million messages per day on Pulsar."
      },
      {
        company: "Splunk",
        link: 'https://databricks.com/session_na20/apache-pulsar-the-next-generation-messaging-and-queuing-system',
        image: require("@site/static/img/splunk.png").default,
        description: "Pulsar guarantees data consistency and durability while maintaining strict SLAs for throughput and latency. Furthermore, Apache Pulsar integrates Pulsar Functions, a lambda style framework to write serverless functions to natively process data immediately upon arrival. This serverless stream processing approach is ideal for lightweight processing tasks like filtering, data routing and transformations."
      },
      {
        company: "Tencent",
        link: 'https://www.youtube.com/watch?v=ZZHMg3Yuuas',
        image: require("@site/static/img/tencent.png").default,
        description: "After nearly 10 years of development of Tencent Game big data, the daily data transmission volume can reach 1.7 trillion. As the key component of the big data platform, the MQ system is critical to provide real-time service operational quality assurance, which requires the support of various applications such as real-time game operational service, real-time index data analysis, and real-time personalized recommendation. "
      },
      {
        company: "TurtleQueue",
        link: 'https://turtlequeue.com/blog/Why%20TurtleQueue',
        image: require("@site/static/img/turtlequeue.png").default,
        description: "Apache Pulsar (upon which TurtleQueue is built) builds on top of the same foundation and improves on it. It exposes a cursor that advances to consume the next message. The cursor's position can be changed to something else, like the beginning of the queue."
      },
      {
        company: "Tuya",
        link: 'https://streamnative.io/success-story/tuya/',
        image: require("@site/static/img/tuya.png").default,
        description: "Tuya settled on Apache Pulsar because it proved to be the most adept at handling the accumulation of messages and repeated consumption. The addition of Pulsar has made Tuya’s message system much more efficient, resulting in lower operational and maintenance costs."
      },
      {
        company: "vivo",
        link: 'https://streamnative.io/success-story/vivo/',
        image: require("@site/static/img/vivo-logo.png").default,
        description: "After comparing different streaming and messaging tools, vivo began to learn Apache Pulsar and explored its features in scalability, fault tolerance, and load balancing. As vivo put Apache Pulsar into use, it summarized some useful practices in bundle and data management. vivo built its monitoring architecture based on Pulsar and created its customized Pulsar metrics for better observability."
      },
      {
        company: "Yahoo!",
        link: 'https://yahooeng.tumblr.com/post/150078336821/open-sourcing-pulsar-pub-sub-messaging-at-scale#notes?ref_url=https://yahooeng.tumblr.com/post/150078336821/open-sourcing-pulsar-pub-sub-messaging-at-scale/embed#_=_',
        image: require("@site/static/img/yahoo.png").default,
        description: "We deployed our first Pulsar instance in Q2 2015. Pulsar use has rapidly grown since then, and as of today, Yahoo runs Pulsar at scale."
      },
      {
        company: "Yahoo! Japan!",
        link: 'https://www.youtube.com/watch?v=M11MkYC_K3k',
        image: require("@site/static/img/yahoo-japan.png").default,
        description: "We adopted Pulsar because of its great performance, scalability and multi-tenancy capability. Indeed, Pulsar has played an important role to provide our 100+ services in various areas such as e-commerce, media, advertising and more. "
      },
      {
        company: "Zhaopin",
        link: 'https://streamnative.io/success-story/zhaopin/',
        image: require("@site/static/img/zhaopin.png").default,
        description: "We are very happy with our choice of Pulsar and the performance and reliability it provides."
      }
    ],
    telecom: [
      {
        company: "Verizon Media",
        link: 'https://www.youtube.com/watch?v=pDAh-gh-aZ0',
        image: require("@site/static/img/verizon-media.png").default,
        description: "Apache Pulsar provides various solutions for TLS proxy and Pulsar is the only messaging system that supports SNI proxy to leverage various enterprise proxy solutions."
      },
      {
        company: 'China Mobile',
        link: 'https://www.youtube.com/watch?v=ZWUASlc1Xss',
        image: require("@site/static/img/china-mobile.png").default,
        description: "China Mobile's practice and experience in Pulsar will be shared, such as Pulsar's Kubernetes cluster optimization and tenant function improvement."
      },
      {
        company: "GeTui",
        link: 'https://streamnative.io/success-story/getui/',
        image: require("@site/static/img/getui.png").default,
        description: "We adopted Pulsar for the new priority-based push notification solution."
      },
      {
        company: "NTT Software Innovation Center",
        link: 'https://streamnative.io/blog/case/2023-01-10-handling-100k-consumers-with-one-pulsar-topic/',
        image: require("@site/static/img/ntt_logo.jpg").default,
        description: "Pulsar has a flexible design and its performance is already good enough for many use cases. The NTT Software Innovation Center ran different performance tests and implemented its own subscription model in Pulsar to further improve its performance. This has allowed them to use one Pulsar topic to support 100K consumers in their IoT scenario."
      },
    ],
    retail: [
      {
        company: "Flipkart",
        link: 'https://www.youtube.com/watch?v=2nzV27lHsis',
        image: require("@site/static/img/flipkart.png").default,
        description: "At Flipkart, there are multiple use-cases for high throughput messaging like streaming/batch pipelines, ordered processing, auditing, etc. Pulsar offers different kinds of isolation mechanisms: cluster peering, isolation groups, produce/dispatch quotas, etc. We identified that offering topic-as-a-service can take away operational complexity for these teams and help us enforce stricter SLAs around uptime and geo-replication. Therefore we approached building a scalable and multi-tenant platform with Pulsar as the choice of backend."
      },
      {
        company: "Edge by Ascential / One Click Retail",
        link: 'https://techmonitor.ai/techonology/software/apache-pulsar',
        image: require("@site/static/img/edge-by-ascential.jpg").default,
        description: "Because of Pulsar’s unique combination of messaging and stream processing, we’ve been able to replace multiple systems with one solution that works seamlessly in our Kubernetes environment."
      },
      {
        company: "Overstock",
        link: 'https://www.youtube.com/watch?v=pmaCG1SHAW8',
        image: require("@site/static/img/overstock.jpg").default,
        description: "By combining Apache Pulsar Functions with Apache Ignite, we achieve low latency lookup performance for real-time enrichment of data, which is useful for search and other real-time use cases."
      },
      {
        company: "Su Ning",
        link: 'https://www.youtube.com/watch?v=_6ExVHgUg2g',
        image: require("@site/static/img/su-ning.png").default,
        description: "Building Apache Pulsar from scratch on top of the Kafka integration platform helps to achieve the goal of multi-site high availability"
      },
      {
        company: "THG",
        link: 'https://medium.com/thg-tech-blog/a-feather-in-their-caps-4c4083cf9f46',
        image: require("@site/static/img/thg.png").default,
        description: "We quickly tested Pulsar and found it simple enough to validate some example scenarios in a day of effort"
      },
    ],
    transportation_logistics: [
      {
        company: "Keytop",
        link: 'https://streamnative.io/success-story/keytop/',
        image: require("@site/static/img/keytop.png").default,
        description: "Keytop redesigned its messaging system by using Apache Pulsar as the backbone of its architecture. Its geo-replication feature helps Keytop securely store mission-critical data across multiple data centers."
      },
    ],
    apparel_manufacturing: [
      {
        company: "Dada Group",
        link: 'https://www.youtube.com/watch?v=F402mUTmOIc',
        image: require("@site/static/img/dada-group.png").default,
        description: "Apache Pulsar has attracted our attention with its excellent features and great architecture."
      },
    ]

}
