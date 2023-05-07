import React from 'react';

import featuresList from './featuresList';

import s from './Features.module.css';
import Slider from '../../../Slider/Slider';

const Features = () => {

  return (
    <div className={s.block}>
      <div className={s.container}>
        <span className={s.features_title}>
          Pulsar features
        </span>

        <div className={s.features_container}>
          {featuresList.map(feature => {
            const Picture = feature.picture

            return (
              <div className={s.feature_block}>
                <Picture className={s.feature_picture} />
                <span className={s.feature_title}>
                  {feature.title}
                </span>

                <span className={s.feature_text}>
                  {feature.text}
                </span>
              </div>
            )
          })}
        </div>

        <div className={s.slider}>
          <Slider>
            {featuresList.map(feature => {
              const Picture = feature.picture;

              return (
                <div>
                  <div className={s.feature_block}>
                    <div className={s.text_container}>
                      <span className={s.feature_title}>
                        {feature.title}
                      </span>

                      <span className={s.feature_text}>
                        {feature.text}
                      </span>
                    </div>

                    <Picture className={s.feature_picture} viewBox={feature.viewBox} />
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Features;
