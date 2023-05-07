import React from "react";
import s from './Cards.module.css';
import * as data from '@site/data/events';

const Card: React.FC<data.Resource> = (props) => {
  return (
    <div className={s.Card}>
      {props.previewImg && <div className={s.CardImage} style={{ backgroundImage: `url(${props.previewImg})` }}></div>}
      <h3><a href={props.link}>{props.title}</a></h3>
      {props.displayDate && <p>{props.displayDate}</p>}
      {props.description && <p>{props.description}</p>}
      <a href={props.link} target="_blank">Learn more</a>
    </div>
  );
};

export type CardsProps = {
  resources: data.Resource[]
};

const Cards: React.FC<CardsProps> = (props) => {
  if (!props.resources.length) {
    return (
      <section>
        <h3>Sorry, no resources match your search.</h3>
      </section>
    );
  }

  return (
    <section className={s.Cards}>
      {props.resources.map((props, idx) => (
        <Card key={idx} {...props} />
      ))}
    </section>
  );
}

export default Cards;
