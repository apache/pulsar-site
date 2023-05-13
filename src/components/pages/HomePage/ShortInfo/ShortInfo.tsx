import React from 'react';

import Button from '../../../ui/Button/Button';
import Parallax from './Parallax/Parallax';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import s from './ShortInfo.module.css';

// The background SVG animation looks bad in Firefox, so we use a static image.
// Regex is copied from:
// https://github.com/DamonOehlman/detect-browser/blob/546e6f1348375d8a486f21da07b20717267f6c49/src/index.ts#LL152C15-L152C15
const isFirefox = typeof window === 'undefined' ? false : /Firefox\/([0-9\.]+)(?:\s|$)/.test(navigator.userAgent);

const ShortInfo: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className={`${s.block}`}>
      <div className={`${s.background} ${isFirefox ? s.static_background : ''}`}></div>
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
                appearance='action'
                href={`${siteConfig.baseUrl}docs`}
              />
              <Button
                title='Quickstart'
                appearance='regular'
                href={`${siteConfig.baseUrl}docs/concepts-overview`}
              />
            </div>
          </div>
        </Parallax>
      </div>

      <div className={s.fullsize_container}>
        <div className={s.blur} />

        <div className={s.container}>
          <div className={s.info_container}>
            <h2 className={s.title}>
              What is Pulsar
            </h2>

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
