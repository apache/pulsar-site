import React from 'react';

import featuresList from './featuresList';

import s from './Features.module.css';

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

      </div>
    </div>
  )
}

export default Features;