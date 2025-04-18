import React from "react";

export const categories = [
  'pulsar',
  'related_topics'
] as const;
export type Category = typeof categories[number];

export const categoryLabels: Record<Category, string> = {
  pulsar: 'Pulsar',
  related_topics: 'Related subjects'
};

export type Resource = {
  name: string;
  author: string;
  publisher: string;
  link: string;
  cover_image: string;
  released_at: string;
  description: React.ReactNode;
};

export const resources: Record<Category, Resource[]> =
{
  pulsar: [
    {
      name: 'Apache Pulsar in Action ',
      author: 'David Kjerrumgaard',
      cover_image: '/img/books/pulsar-in-action.jpg',
      description: (
        <span>
          Apache Pulsar in Action is a comprehensive and practical guide to building high-traffic applications with Pulsar. You’ll learn to use this mature and battle-tested platform to deliver extreme levels of speed and durability to your messaging. Apache Pulsar committer David Kjerrumgaard teaches you to apply Pulsar’s seamless scalability through hands-on case studies, including IOT analytics applications and a microservices app based on Pulsar functions.
        </span>
      ),
      link: 'https://www.manning.com/books/apache-pulsar-in-action',
      publisher: 'Manning Publications',
      released_at: 'October 2021'
    },
    {
      name: 'Mastering Apache Pulsar',
      author: 'Jowanza Joseph',
      cover_image: '/img/books/mastering-apache-pulsar.jpg',
      description: (
        <span>
          Jowanza Joseph, staff software engineer at Finicity, explains how to deploy production Pulsar clusters, write reliable event streaming applications, and build scalable real-time data pipelines with this platform. Through detailed examples, you'll learn Pulsar's design principles, reliability guarantees, key APIs, and architecture details, including the replication protocol, the load manager, and the storage layer.
        </span>
      ),
      link: 'https://www.oreilly.com/library/view/mastering-apache-pulsar/9781492084891/',
      publisher: 'O’Reilly Media',
      released_at: 'December 2021'
    },
    {
      name: 'Practical Optimization of Apache Pulsar',
      author: 'Feng Wenzhi',
      cover_image: '/img/books/practical-optimization-of-apache-pulsar.jpg',
      description: (
          <span>
            This book is a practical guide to optimizing Apache Pulsar for high performance and low latency. It covers various optimization techniques, including tuning the load balancing algorithm, optimizing the storage layer, and improving the performance of various Pulsar features. The book is open - sourced on Github and available in Chinese and English.
          </span>
        ),
      link: 'https://tumbleds-library.gitbook.io/thetumbleds-library',
      publisher: 'Open Source at GitHub',
      released_at: 'April 2025'
    }
  ],
  related_topics: [
    {
      name: 'Designing Data-Intensive Applications',
      link: 'https://dataintensive.net/',
      author: 'Martin Kleppmann',
      cover_image: '/img/books/designing-data-intensive-applications.jpg',
      description: (
        <span>
          In this practical and comprehensive guide, author Martin Kleppmann helps you navigate this diverse landscape by examining the pros and cons of various technologies for processing and storing data. Software keeps changing, but the fundamental principles remain the same. With this book, software engineers and architects will learn how to apply those ideas in practice, and how to make full use of data in modern applications.
        </span>
      ),
      publisher: 'O’Reilly Media',
      released_at: 'March 2017'
    },
    {
      name: 'Practical Event-Driven Microservices',
      link: 'https://www.oreilly.com/library/view/practical-event-driven-microservices/9781484274682/',
      author: 'Hugo Filipe Oliveira Rocha',
      cover_image: '/img/books/practical-event-driven-microservices.jpg',
      description: (
        <span>
          This prescriptive guide takes you through the steps of moving a platform with millions of users from a monolith to a microservices event-driven architecture. You will learn about the challenges and complexities that arise in high-throughput environments that often contain upwards of hundreds of microservices. This book is designed to be your single best resource for learning how to apply event-driven architectures in real-world scenarios and offers hundreds of patterns to overcome the common and not so common challenges.
        </span>
      ),
      publisher: 'Apress',
      released_at: 'November 2021'
    },
    {
      name: 'Building Event-Driven Microservices',
      link: 'https://www.oreilly.com/library/view/building-event-driven-microservices/9781492057888/',
      author: 'Adam Bellemare',
      cover_image: '/img/books/building-event-driven-microservices.jpg',
      description: (
        <span>
          Author Adam Bellemare takes you through the process of building an event-driven microservice-powered organization. You’ll reconsider how data is produced, accessed, and propagated across your organization. Learn powerful yet simple patterns for unlocking the value of this data. Incorporate event-driven design and architectural principles into your own systems. And completely rethink how your organization delivers value by unlocking near-real-time access to data at scale.
        </span>
      ),
      publisher: 'O’Reilly Media',
      released_at: 'July 2020'
    }
  ]
}
