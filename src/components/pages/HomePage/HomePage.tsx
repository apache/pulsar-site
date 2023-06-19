import React from 'react';

import Layout from "@theme/Layout";
import Features from './Features/Features';
import ShortInfo from './ShortInfo/ShortInfo';
import Users from './Users/Users';

import s from './HomePage.module.css';
import useScrollPosition from './useScrollPosition';
import HowPulsarWorks from './HowPulsarWorks/HowPulsarWorks';

const HomePage = () => {
  const scrollPosition = useScrollPosition();

  const blurPx = scrollPosition * 0.1;

  return (
    <Layout
      title={"Apache Pulsar"}
      description={"Apache Pulsar is an open-source, distributed messaging and streaming platform built for the cloud."}
    >
      <div className={s.Page}>
        <div
          className={s.Background}
          style={{
            filter: `blur(${blurPx < 24 ? blurPx : blurPx}px)`,
            willChange: 'filter'
          }}
        />
        <div className={s.FirstScreen}>
          <ShortInfo />
        </div>
        <div className={s.OtherScreens}>
          <Features />
          <HowPulsarWorks />
          <Users />
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
