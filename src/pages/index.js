import React, { useEffect } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "../components/HomepageFeatures";
import HomeQuotes from "../components/HomeQuotes";
import SubHeroBlock from "../components/SubHeroBlock";
import PromoCallout from "../components/PromoCallout";
import PillButton from "../components/PillButton";

var startWaves = function () {
  if (!SineWaves) {
    return;
  }
  new SineWaves({
    el: document.getElementById("waves"),
    speed: 2,
    width: function () {
      return document.body.clientWidth;
    },
    height: function () {
      return 300;
    },
    ease: "SineInOut",
    wavesWidth: "60%",
    waves: [
      {
        timeModifier: 3,
        lineWidth: 4,
        amplitude: -25,
        wavelength: 25,
      },
      {
        timeModifier: 2,
        lineWidth: 4,
        amplitude: -50,
        wavelength: 50,
      },
      {
        timeModifier: 1,
        lineWidth: 4,
        amplitude: -100,
        wavelength: 100,
      },
      {
        timeModifier: 0.5,
        lineWidth: 4,
        amplitude: -125,
        wavelength: 125,
      },
      {
        timeModifier: 1.25,
        lineWidth: 4,
        amplitude: -150,
        wavelength: 150,
      },
    ],

    // Called on window resize
    resizeEvent: function () {
      var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
      gradient.addColorStop(0, "rgba(24, 143, 255, 1)");
      gradient.addColorStop(0.5, "rgba(70, 78, 86, 1)");

      var index = -1;
      var length = this.waves.length;
      while (++index < length) {
        this.waves[index].strokeStyle = gradient;
      }

      // Clean Up
      index = void 0;
      length = void 0;
      gradient = void 0;
    },
  });
};

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const quotesArr = [
    {
      name: "Greg Methvin",
      company: "Iterable",
      content:
        "Pulsar is unique in that it supports both streaming and queueing use cases, while also supporting a wide feature set that makes it a viable alternative to many other distributed messaging technologies currently being used in our architecture. Pulsar covers all of our use cases for Kafka, RabbitMQ, and SQS. This lets us focus on building expertise and tooling around a single unified system",
    },
    {
      name: "Weisheng Xie",
      company: "Orange Financial",
      content:
        "Pulsar is a perfect choice for building our unified data processing stack. Together with a unified computing engine like Spark, Apache Pulsar is able to boost the efficiency of our risk-control decision deployment. Thus, we are able to provide merchants and consumers with safe, convenient, and efficient services.",
    },
    {
      name: "Kirill Merkushev",
      company: "Vivy",
      content:
        "Among the features we considered were tiered storage, as we planned to have unlimited retention (for event sourcing that matters a lot), flexible subscription model (we use exclusive at the moment, however we want to try per-key subscription), authorization via different methods including certificates and JWT (JSON Web Token), and an easy way to get it up and running.",
    },
    {
      name: "Kirill Merkushev",
      company: "Jowanza Joseph, One Click Retail",
      content:
        "Because of Pulsar’s unique combination of messaging and stream processing, we’ve been able to replace multiple systems with one solution that works seamlessly in our Kubernetes environment.",
    },
    {
      name: "Dongliang Jiang",
      company: "Appen China",
      content:
        "Apache Pulsar plays a key role in our AI data platform as the data lake to connect all the business features and make each component decoupled.",
    },
    {
      name: "Hang Chen",
      company: "BIGO",
      content:
        "The Apache Pulsar's layered architecture and new features, such as low latency with durability, horizontally scalable, multi-tenancy etc, help us solve a lot of problems in production. We have adopted Apache Pulsar to build our Message Processing System, especially in Real-Time ETL, short-form video recommendation and Real-Time Data report. ",
    },
    {
      name: "Rocky Jin",
      company: "EMQ",
      content:
        "Apache Pulsar provides native support for serverless functions where data is processed as soon as it arrives in a streaming fashion and gives flexible deployment options (thread, process, container). We need only focus on computation logic rather than dealing with complicated configuration or management, which helps us build a streaming platform faster and conveniently.",
    },
    {
      name: "Bin Liu",
      company: "Ksyun",
      content:
        "With Pulsar, we can scale up partitions and merge partitions easily, and process millions of topics",
    },
  ];
  useEffect((d) => {
    startWaves();
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true) {
          const featureWrap = document.getElementById("home-features");
          const features = featureWrap.querySelectorAll(".icon-feature");
          features.forEach((d, i) => {
            setTimeout(function () {
              d.classList.add("shown");
            }, i * 100);
          });
        }
      },
      { threshold: [0.1] }
    );
    observer.observe(document.querySelector("#home-features"));

    const pulsingWaves = document.getElementById("waves-wrapper");
    setTimeout(() => {
      pulsingWaves.classList.add("show-waves");
    }, 50);
  });
  // gets blog posts
  const recentPosts = require("../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json");
  const latestPost = recentPosts.items[0];
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div className="page-wrap tailwind">
        <section className="home-hero pt-24">
          <div className="inner">
            <div className="md:float-left md:w-2/3">
              <h1>Cloud-Native, Distributed Messaging and Streaming</h1>
              <p>
                Apache® Pulsar™ is an open-source, distributed messaging
                and streaming platform built for the cloud.
              </p>
            </div>
          </div>
        </section>
        <div id="waves-wrapper">
          <canvas id="waves"></canvas>
        </div>
        <div className="home-ctas relative z-5">
          <div className="inner">
            <PillButton variant="" target="" href={`${siteConfig.baseUrl}docs/concepts-overview`}>
              Learn More
            </PillButton>
            <PillButton variant="grey" href={`${siteConfig.baseUrl}docs`}>
              Quickstart
            </PillButton>
          </div>
        </div>
        <PromoCallout
          url={latestPost.permalink}
          linkText="Read Now"
          text={latestPost.title}
        />
        <SubHeroBlock
          heading="What is Apache Pulsar?"
          content="Apache Pulsar is an all-in-one messaging and streaming platform. Messages can be consumed and acknowledged individually or consumed as streams with less than 5ms of latency. Its layered architecture allows rapid scaling across hundreds of nodes, without data reshuffling. Its features include multi-tenancy with resource separation and access control, geo-replication across regions, tiered storage and support for five official client languages. It supports up to one million unique topics and is designed to simplify your application architecture.

Pulsar is a Top 10 Apache Software Foundation project and has a vibrant and passionate community and user base spanning small companies and large enterprises."
        />

        <section className="waves-bg home-features py-48 mb-24">
          <div className="mt-8 inner relative z-5">
            <h2 className="text--center">Pulsar Features</h2>
            <HomepageFeatures id="home-features" />
          </div>
          <div className="home-quotes pb-24">
            <SubHeroBlock
              className="test"
              heading="Pulsar Users"
              content="Run in production at scale with millions of messages per second across millions of topics, Pulsar is now used by thousands of companies for real-time workloads."
            />
            <HomeQuotes quotes={quotesArr} />
            <p className="text--center">
              <a href="/case-studies" className="secondary-cta">
                Read Case Studies
              </a>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
