import React from 'react';

import Button from '../../../ui/Button/Button';
import Parallax from './Parallax/Parallax';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import s from './ShortInfo.module.css';
import ScreenTitle from '../ui/ScreenTitle/ScreenTitle';

const ShortInfo: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className={`${s.block}`}>
      <div className={`${s.container} ${s.short_container}`}>
        <Parallax>
          <div className={s.docs_container}>
            <h1 className={s.header}>
              <span className={s.title}> Apache Pulsar</span><br />
              <span className={s.subtitle}> Cloud-Native, Distributed Messaging and Streaming </span>
            </h1>
            <span className={s.text}>Apache® Pulsar™ is an open-source, distributed messaging and streaming platform built for the cloud. </span>

            <div className={s.buttons}>
              <Button
                title='Explore docs'
                variant='action'
                href={`${siteConfig.baseUrl}docs/next`}
              />
              <Button
                title='Quickstart'
                variant='regular'
                href={`${siteConfig.baseUrl}docs/next/concepts-overview`}
              />
            </div>
          </div>
        </Parallax>
      </div>

      <div className={s.fullsize_container}>
        <div className={s.blur} />

        <div className={s.container}>
          <div className={s.info_container}>
            <ScreenTitle>
              What is Pulsar
            </ScreenTitle>

            <p>
              Apache Pulsar is an all-in-one messaging and streaming platform.
              Messages can be consumed and acknowledged individually or consumed as streams with <strong>less than 5ms of latency</strong>.
              Its layered architecture allows <strong>rapid scaling</strong> across hundreds of nodes, <strong>without data reshuffling</strong>.
            </p>

            <p>
              Its features include <strong>multi-tenancy</strong> with resource separation and access control, <strong>geo-replication</strong> across regions, <strong>tiered storage</strong> and support for five official client languages.
              It supports up to one million unique topics and is designed to simplify your application architecture.
            </p>

            <p>
              Pulsar is a Top 10 Apache Software Foundation project and has a vibrant and passionate community and user base spanning small companies and large enterprises.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShortInfo;
