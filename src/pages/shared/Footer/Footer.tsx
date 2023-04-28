import React from 'react';

import Logo from './pictures/logo.svg';
import Slack from './pictures/slack.svg';
import Github from './pictures/github.svg';
import Feather from './pictures/feather.svg';

import s from './Footer.module.css';

const Footer = () => {

  return (
    <div className={s.block}>
      <div className={s.container}>

        <div className={`${s.row} ${s.first_row}`}>
          <div className={s.column}>
            <a href='./' className={s.link}>
              <Logo className={s.logo_pulsar} />
            </a>
          </div>

          <div className={`${s.column} ${s.links_columns}`}>
            <div className={`${s.links_column} ${s.first_row_links}`}>
              <a href='./'> Get started </a>
              <a href='./'> Docs </a>
            </div>

            <div className={`${s.links_column} ${s.first_row_links}`}>
              <a href='./'> Community </a>
              <a href='./'> Learn </a>
            </div>
          </div>

          <div className={`${s.column} ${s.external_links}`}>
            <a href='./'> Contribute </a>
            <div>
              <a href='./' className={s.link}>
                <Slack className={s.logo_slack} />
              </a>
              <a href='./' className={s.link}>
                <Github className={s.logo_github} />
              </a>
            </div>
          </div>
        </div>

        <div className={`${s.row} ${s.second_rod}`}>
          <div className={s.column}>
            <div className={`${s.second_row_links}`}>
              <Feather className={s.logo_feather} />
              <a href='./'>
                Apache Foundation
              </a>
            </div>
          </div>

          <div className={s.column}>
            <span>
              Apache Pulsar is available under the Apache License, version 2.0.
              Apache Pulsar is an open-source, distributed messaging and streaming platform built for the cloud.
            </span>
          </div>

          <div className={s.column}>
            <span>
              Copyright © 2023 The Apache Software Foundation. All Rights Reserved.
              Apache, Pulsar, Apache Pulsar, and the Apache feather logo are trademarks or registered trademarks of The Apache Software Foundation.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;