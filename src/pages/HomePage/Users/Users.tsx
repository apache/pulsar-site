import React from 'react';

import LinkButton from '../../../components/LinkButton/LinkButton';
import Slider from '../../../components/Slider/Slider';
import slides from './reviews';

import Quote from './picture/quote.svg';

import s from './Users.module.css';

const Users = () => {

  return (
    <div className={s.block}>
      <div className={s.container}>
        <div className={s.title_container}>
          <span className={s.title}>
            Pulsar Users
          </span>
            
          <span className={s.text}>
            Run in production at scale with millions of messages per second across millions of topics,
            Pulsar is now used by thousands of companies for real-time workloads.
          </span>

          <div className={s.link_button}>
            <LinkButton
              title='See case studies'
              filled={false}
              link='./'
            />
          </div>
        </div>
        <Slider centerMode={window.innerWidth > 800}>
          {slides.map((slide) => (
            <div className={s.slide}>
              <div className={s.slide_container}>
                <Quote className={s.quote} />

                <span className={s.slider_text}>
                  {slide.text}
                </span>
                
                <span className={s.author}>
                  {slide.author}
                </span>

                <span className={s.platform}>
                  {slide.platform}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Users;