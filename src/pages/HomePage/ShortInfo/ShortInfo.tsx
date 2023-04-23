import React from 'react';

import LinkButton from '../../../components/LinkButton/LinkButton';
import Parallax from '../../../components/Parallax/Parallax';

import s from './ShortInfo.module.css';

const ShortInfo = () => {

  return (
    <div className={s.block}>
      <div className={`${s.container} ${s.short_container}`}>
        <Parallax>
          <div className={s.docs_container}>
            <span className={s.title}> Apache Pulsar </span>
            <span className={s.subtitle}> Cloud-Native, Distributed Messaging and Streaming </span>
            <span className={s.text}> Apache® Pulsar™ is an open-source, distributed messaging and streaming platform built for the cloud. </span>

            <div className={s.buttons}>
              <LinkButton
                title='Explore docs'
                filled={true}
                link='./'
              />
              <LinkButton
                title='Quickstart'
                filled={false}
                link='./'  
              />
            </div>
          </div>
        </Parallax>
      </div>

      <div className={s.fullsize_container}>
        <div className={s.blur} />

        <div className={s.container}>
          <div className={s.info_container}>
            <span className={s.title}>
              What is Pulsar
            </span>

            <span>
              <b> Apache Pulsar is an all-in-one messaging and streaming platform. </b>
              Messages can be consumed and acknowledged individually or consumed as streams with <b> less than 5ms of latency </b>.
              Its layered architecture allows <b> rapid scaling </b> across hundreds of nodes, <b> without data reshuffling </b>.
              Its features include <b> multi-tenancy </b> with resource separation and access control, <b> geo-replication </b> across regions, <b> tiered storage </b> and support for five official client languages.
              It supports up to one million unique topics and is designed to simplify your application architecture. 
            </span>

            <span>
              Pulsar is a Top 10 Apache Software Foundation project and has a vibrant and passionate community and user base spanning small companies and large enterprises.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShortInfo;