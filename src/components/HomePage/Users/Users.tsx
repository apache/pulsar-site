import React from 'react';

import LinkButton from '../../shared/LinkButton/LinkButton';
import Title from '../../shared/Title/Title';
import Slider from './Slider/Slider';

import s from './Users.module.css';

const Users = () => {

  return (
    <div className={s.block}>
      <div className={s.container}>
        <div className={s.title_container}>
          <Title text='Pulsar Users' />
            
          <span className={s.text}>
            Run in production at scale with millions of messages per second across millions of topics,
            Pulsar is now used by thousands of companies for real-time workloads.
          </span>

          <div>
            <LinkButton
              title='See case studies'
              filled={false}
              link='./'
            />
          </div>
        </div>

        <Slider />
      </div>
    </div>
  )
}

export default Users;