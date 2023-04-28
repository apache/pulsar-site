import React from 'react';

import Arrow from './pictures/arrow.svg';
import Bolt from './pictures/bolt.svg';

import s from './Announcement.module.css';

const Announcement = () => {

  return (
    <a className={s.block} href='./'>
      <svg className={s.icon}>
        <Bolt />
      </svg>

      <span>
        Apache Pulsar Hits Its 600th Contributor!
      </span>

      <svg className={s.icon}>
        <Arrow />
      </svg>
    </a>
  )
}

export default Announcement;