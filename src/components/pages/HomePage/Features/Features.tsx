import React from 'react';

import featuresList from './featuresList';

import s from './Features.module.css';
import Slider from '../../../ui/Slider/Slider';
import ScreenTitle from '../ui/ScreenTitle/ScreenTitle';
import Button from '@site/src/components/ui/Button/Button';

const Features = () => {
  return (
    <section className={s.block}>
      <div className={s.container}>
        <ScreenTitle>
          Pulsar features
        </ScreenTitle>

        <div className={s.features_container}>
          {featuresList.map((feature, i) => {
            const Picture = feature.picture

            return (
              <div key={i} className={s.feature_block}>
                <Picture className={s.feature_picture} />
                <h3 className={s.feature_title}>
                  {feature.title}
                </h3>

                <span className={s.feature_text}>
                  {feature.text}
                </span>
              </div>
            )
          })}
        </div>

        <div className={s.slider}>
          <Slider slidesToShow={1}>
            {featuresList.map((feature, i) => {
              const Picture = feature.picture;

              return (
                <div key={i}>
                  <div className={s.feature_block}>
                    <div className={s.text_container}>
                      <h3 className={s.feature_title}>
                        {feature.title}
                      </h3>

                      <span className={s.feature_text}>
                        {feature.text}
                      </span>
                    </div>
                    <div className={s.picture_container}>
                      <Picture className={s.feature_picture} viewBox={feature.viewBox} />
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
      <div className={s.ButtonContainer}>
        <Button title='Explore more features' variant='action' href='/features' />
      </div>
    </section>
  )
}

export default Features;
