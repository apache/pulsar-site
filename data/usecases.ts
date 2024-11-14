import React, { ReactNode } from 'react';

export type UseCase = {
    icon: 'user' | 'arrow' | 'speech' | 'check';
    title: string;
    text: string;
    smallText: string;
    docsLink: string;
    caseLink: boolean;
};
const useCases: UseCase[] = [
    {
        icon: "user",
        title: "Company-wide messaging platform",
        text: "<p>Companies tend to adopt several messaging technologies (e.g., Kafka, ActiveMQ, RabbitMQ, …), sometimes managed by several different teams in charge of their services. Some companies wish to consolidate all those technologies and switch to a company-wide messaging platform managed centrally while still giving enough self-service and flexibility for teams to use it on their own.</p><p>Pulsar enables that:<ul><li>It supports all messaging use cases: streaming, message queuing, and more.</li><li>Its multi-tenancy, granular access control, geo-replication, and K8s-ready features make it ideal to be a multi-tenant platform</li></ul></p><p>There are additional benefits to this consolidation:<ul><li>It simplifies operations, as the organization needs to learn one technology and maintain one system, serving multiple teams.</li><li>It facilitates integrations between teams and systems. Bridging microservices between their messaging system (e.g., Kafka) to another’s team system (e.g., RabbitMQ) is time-consuming and, in many cases, slows down velocity. Having all teams work in a single messaging platform makes it super easy to integrate their microservices.</li><li>All services running in the same platform enable creating a catalog of services using it, making it easier for discovery.</li></ul></p>",
        smallText: "Companies tend to adopt several messaging technologies (e.g., Kafka, ActiveMQ, RabbitMQ, …), sometimes managed by several different teams in charge of their services.",
        docsLink: "concepts-overview/",
        caseLink: true
    },
    {
        icon: "check",
        title: "Task Queues",
        text: "<p>There are common use cases in many companies requiring task queue systems that enable submitting a task to run and ensuring it’s executed, including error handling. Generally, you need to limit the processing capacity dedicated to particular tasks and support distributing the tasks among a set of worker processes. Examples include video transcoding, generating image thumbnails, button clicks in the UI returning a response in less than 10ms but running in the background, and more.</p><p>Pulsar supports that natively through its Shared Subscription and individual acknowledgment. The Shared Subscription supports distributing messages out-of-order across many consumers, while individual acknowledgment enables a consumer to mark a specific message as done.</p><p>This feature is amplified by Pulsar's ability to scale horizontally, most notably: do it rapidly, since its design avoids data reshuffling, making newly created nodes available immediately to handle the load.</p>",
        smallText: "There are common use cases in many companies requiring task queue systems that enable submitting a task to run and ensuring it’s executed, including error handling.",
        docsLink: "cookbooks-message-queue/",
        caseLink: false
    },
    {
        icon: "arrow",
        title: "Scalable RPC",
        text: "<p>In a micro-services architecture, there is a need to communicate between services constantly. One way of doing it is direct API calls, which require<ul><li>A service discovery system, which registers new instances into a list of available instances for a service</li><li>Load balancing system, to load balance calls among the list of instances</li><li>Networking rules to define which defines which service can access which network</li><li>A central configuration system to share all those services addresses</li><li>Retry and circuit breaker mechanisms to handle failure to respond to requests</li></ul></p><p>Another option, powered by Apache Pulsar, is indirect API calls through topics and messages. Each service gets a topic shared by all instances of that service to load balance requests. Each request sender has its topic for receiving responses. Instance 1 of service A sends a message to the shared topic of service B, which in turn sends the response in a message to the topic associated with instance 1 of service A.</p><p>Other messaging systems can accomplish this option, but Pulsar offers several compelling features:<ul><li>If your system grows and you have 5k or even 50k instances, having a reply topic per instance gets either impossible or very expensive in other messaging systems. Many resort to multiplexing all service replies into several topics, forcing the instance to read and filter most messages, which makes it expensive.</li><li>Pulsar is horizontally scalable and can scale up in minutes in response to a massive influx of requests.</li></ul></p>",
        smallText: "Scalable RPC, in the context of micro-services, uses topics for indirect API communication, simplifying load balancing and eliminating traditional networking complexities by using shared topics for each service to balance load and individual topics for response reception. This approach is highly scalable, efficiently supporting systems with thousands of instances.",
        docsLink: "concepts-broker-load-balancing-benefits/#scalability",
        caseLink: false
    },
    {
        icon: "speech",
        title: "Mission Critical Applications",
        text: "<p>There are mission-critical applications that must have the highest guarantee of failure resiliency. Pulsar provides that uniquely by having all of the following in one system:<ul><li>Messages are replicated to several Bookkeeper nodes. Systems like RabbitMQ or ActiveMQ were not written with that feature in the original design. Most replicate in the background while returning success for the write.</li><li>Messages are guaranteed to be written to disk when an acknowledgment is sent back to the application writing the messages. In case of machine power-off, messages are not lost. Some systems prefer performance over resiliency without the ability to choose what’s best for your use case. Pulsar provides the option to choose.</li></ul></p><p>This is the case for applications like banking, payments, and orders. Those applications want to eliminate even the tiniest risk of having all nodes holding the replicas reboot and losing data in memory. Pulsar provides that requirement.</p>",
        smallText: "There are mission-critical applications that must have the highest guarantee of failure resiliency. Pulsar provides that uniquely by having all of the following in one system:",
        docsLink: "security-overview/",
        caseLink: false
    },
];

export default useCases;
