import React from 'react';
import s from './HowPulsarWorks.module.css'
import ScreenTitle from '../ui/ScreenTitle/ScreenTitle';

// SVGO breaks the illustration. To fix it, we import it as is.
import illustrationDesktop from '!!raw-loader!./img/illustration-desktop.svg';

import BookkeeperIcon from './img/bookkeeper.svg';
import BrokersIcon from './img/brokers.svg';
import ZookeeperIcon from './img/zookeeper.svg';
import ProducerAndConsumerIcon from './img/producer-and-consumer.svg';
import Slider from '@site/src/components/ui/Slider/Slider';

const cards: CardProps[] = [
  {
    title: 'Producer & Consumer',
    image: <ProducerAndConsumerIcon />,
    children: (
      <p>
        A Pulsar client contains a consumer and a producer.
        A Producer writes messages on a topic.
        A consumer reads messages from a topic and acknowledges specific messages or all up to a specific message.
      </p>
    )
  },
  {
    title: 'Apache Zookeeper',
    image: <ZookeeperIcon />,
    children: (
      <p>
        Pulsar and Bookkeeper use Apache Zookeeper to save metadata coordinated between nodes,
        such as a list of ledgers per topic, segments per ledger, and mapping of topic bundles to a Broker.
        It’s a cluster of highly available and replicated servers (usually 3).
      </p>
    )
  },
  {
    title: 'Pulsar Brokers',
    image: <BrokersIcon />,
    children: (
      <p>
        Topics (i.e., partitions) are divided among Pulsar Brokers.
        A broker receives messages for a topic and appends them to the topic’s active virtual file (a.k.a Ledger),
        hosted on the Bookkeeper cluster. Brokers read messages from the cache (mostly) or Bookkeeper and dispatch them to the Consumers.
        Brokers also receive message acknowledgments and persist them to the Bookkeeper as well.
        They are stateless (don’t use/need a disk).
      </p>
    )
  },
  {
    title: 'Apache Bookkeeper',
    image: <BookkeeperIcon />,
    children: (
      <p>
        Apache BookKeeper is a cluster of nodes called Bookies.
        Each virtual file (a.k.a ledger) is divided into consecutive segments, and each segment is kept on 3 Bookies by default
        (replicated by the client - i.e., the broker).
        Operators can add Bookies rapidly since no data reshuffling (moving) between them is required.
        They immediately share the incoming write load.
      </p>
    )
  }
];

const HowPulsarWorks: React.FC = () => {
  return (
    <section className={s.HowPulsarWorks}>
      <div className={s.Container}>
        <ScreenTitle>How does Pulsar work</ScreenTitle>

        <div dangerouslySetInnerHTML={{ __html: illustrationDesktop }} className={s.Illustration} />

        <div className={s.CardsDesktop}>
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>

        <div className={s.CardsMobile}>
          <Slider slidesToShow={1}>
            {cards.map((card, i) => {
              return (
                <Card key={i} {...card} />
              )
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  title: string;
  image: React.ReactNode;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={s.Card}>
      <div className={s.CardImage}>
        {props.image}
      </div>
      <h3 className={s.CardTitle}>{props.title}</h3>
      <div className={s.CardContent}>{props.children}</div>
    </div>
  );
}

export default HowPulsarWorks;

