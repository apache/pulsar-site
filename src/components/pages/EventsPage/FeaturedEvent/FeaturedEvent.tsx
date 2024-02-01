import React from 'react';
import s from './FeaturedEvent.module.css'
import Button from '@site/src/components/ui/Button/Button';

// Change this to true to show the featured event.
const isShow = false;

const FeaturedEvent: React.FC = () => {
  if (isShow) {
    return null;
  }

  // return (
  //   <div className={s.FeaturedEvent}>
  //     <div>Featured event</div>
  //     <h2>Pulsar Summit North America 2023</h2>
  //     <p>
  //       Mark your calendars! Pulsar Summit North America is coming back to Hotel Nikko in San Francisco, California on Wednesday, October 25th, 2023.
  //     </p>
  //     <p>
  //       Over the past few years, Pulsar Summit has featured 100+ speakers and brought together more than 2,0000 Pulsar community members for engaging and insightful sessions.
  //     </p>
  //     <p>
  //       <a href="https://sessionize.com/pulsar-summit-north-america-2023/" target='_blank'><strong>CFPs are now open!</strong></a>
  //     </p>
  //   </div>
  // );

  // Uncomment the section above if no featured event is available.
  return (
    <div className={s.FeaturedEvent}>
      <h2>
        <small>September 2024</small>
        Pulsar Summit USA 2024
      </h2>
      <div>
        <p>
          Pulsar Summit is the conference for Apache Pulsar and event processing communities that takes place multiple times a year.
        </p>
        <p>
          This summit provides a diverse platform to explore, learn and exchange ideas. From captivating keynotes to insightful panel discussions, hands-on workshops, and unparalleled networking opportunities.
        </p>
        <Button href='https://pulsar-summit.org/' target='_blank' title='Learn More' variant='cleaninvert' icon='/img/gotoi.svg' />
      </div>
    </div>
  );
}

export default FeaturedEvent;

