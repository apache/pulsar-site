import Layout from "@theme/Layout";
import React from "react";
import Greeting from "./Greeting/Greeting";
import s from "./IndexPage.module.css";
import WhatIsPulsar from "./WhatIsPulsar/WhatIsPulsar";

const IndexPage: React.FC = () => {
  return (
    <Layout
      title={"Apache Pulsar"}
      description={"Apache Pulsar is an open-source, distributed messaging and streaming platform built for the cloud."}
    >
      <div className={s.IndexPage}>
        <Greeting />
        <WhatIsPulsar />
      </div>
    </Layout>
  );
};

export default IndexPage;
