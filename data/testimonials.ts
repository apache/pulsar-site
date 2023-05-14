export type Testimonial = {
  company: string;
  author: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    author: "Greg Methvin",
    company: "Iterable",
    text:
      "Pulsar is unique in that it supports both streaming and queueing use cases, while also supporting a wide feature set that makes it a viable alternative to many other distributed messaging technologies currently being used in our architecture. Pulsar covers all of our use cases for Kafka, RabbitMQ, and SQS. This lets us focus on building expertise and tooling around a single unified system",
  },
  {
    author: "Weisheng Xie",
    company: "Orange Financial",
    text:
      "Pulsar is a perfect choice for building our unified data processing stack. Together with a unified computing engine like Spark, Apache Pulsar is able to boost the efficiency of our risk-control decision deployment. Thus, we are able to provide merchants and consumers with safe, convenient, and efficient services.",
  },
  {
    author: "Kirill Merkushev",
    company: "Vivy",
    text:
      "Among the features we considered were tiered storage, as we planned to have unlimited retention (for event sourcing that matters a lot), flexible subscription model (we use exclusive at the moment, however we want to try per-key subscription), authorization via different methods including certificates and JWT (JSON Web Token), and an easy way to get it up and running.",
  },
  {
    author: "Jowanza Joseph",
    company: "One Click Retail",
    text:
      "Because of Pulsar’s unique combination of messaging and stream processing, we’ve been able to replace multiple systems with one solution that works seamlessly in our Kubernetes environment.",
  },
  {
    author: "Dongliang Jiang",
    company: "Appen China",
    text:
      "Apache Pulsar plays a key role in our AI data platform as the data lake to connect all the business features and make each component decoupled.",
  },
  {
    author: "Hang Chen",
    company: "BIGO",
    text:
      "The Apache Pulsar's layered architecture and new features, such as low latency with durability, horizontally scalable, multi-tenancy etc, help us solve a lot of problems in production. We have adopted Apache Pulsar to build our Message Processing System, especially in Real-Time ETL, short-form video recommendation and Real-Time Data report. ",
  },
  {
    author: "Rocky Jin",
    company: "EMQ",
    text:
      "Apache Pulsar provides native support for serverless functions where data is processed as soon as it arrives in a streaming fashion and gives flexible deployment options (thread, process, container). We need only focus on computation logic rather than dealing with complicated configuration or management, which helps us build a streaming platform faster and conveniently.",
  },
  {
    author: "Bin Liu",
    company: "Ksyun",
    text:
      "With Pulsar, we can scale up partitions and merge partitions easily, and process millions of topics",
  },
];

export default testimonials;
