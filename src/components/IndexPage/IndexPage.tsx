import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";
import Greeting from "./Greeting/Greeting";
import s from "./IndexPage.module.css";

const IndexPage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={"Apache Pulsar"}
      description={"Learn about the basics of using Apache Pulsar"}
    >
      <div className={s.IndexPage}>
        <Greeting />
      </div>
    </Layout>
  );
};

export default IndexPage;
