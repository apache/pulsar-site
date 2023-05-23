import React from 'react';

import Layout from "@theme/Layout";
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
      <div className={s.Page}>
        <div className={s.Background}></div>
        <div className={s.FirstScreen}>
          <ShortInfo />
        </div>
        <div className={s.OtherScreens}>
          <Features />
          <Users />
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
