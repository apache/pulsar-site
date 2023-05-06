import React from 'react';

import Layout from "@theme/Layout";
import Footer from '../shared/Footer/Footer';
import Features from './Features/Features';
import ShortInfo from './ShortInfo/ShortInfo';
import Users from './Users/Users';

import s from './HomePage.module.css';

const HomePage = () => {

  return (
    <Layout
      title={"Apache Pulsar"}
      description={"Apache Pulsar is an open-source, distributed messaging and streaming platform built for the cloud."}
    >
      <div className={s.block}>
        <ShortInfo />
        <Features />
        <Users />
        <Footer />
      </div>
    </Layout>
  )
}

export default HomePage