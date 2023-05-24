import React from 'react';
import s from './FeaturedEvent.module.css'

// Change this to true to show the featured event.
const isShow = false;

const FeaturedEvent: React.FC = () => {
  if (isShow) {
    return null;
  }

  return (
    <div className={s.FeaturedEvent}>
      {/* <div>Featured event</div> */}
      <h2>Pulsar Summit</h2>
      <p>
        Pulsar Summit is the conference for Apache Pulsar and event processing communities that takes place multiple times a year.
      </p>
      <p>
        This summit provides a diverse platform to explore, learn and exchange ideas. From captivating keynotes to insightful panel discussions, hands-on workshops, and unparalleled networking opportunities.
      </p>
      <a
        href="https://pulsar-summit.org/"
        target='_blank'
      >Learn more</a>
    </div>
  );
}

export default FeaturedEvent;

