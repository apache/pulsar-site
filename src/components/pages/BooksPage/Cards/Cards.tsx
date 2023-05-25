import React from "react";
import s from './Cards.module.css';
import * as data from '@site/data/books';

const Card: React.FC<data.Resource> = (props) => {
  return (
    <a className={s.Card} href={props.link} target="_blank">
      <div className={s.CardImage} style={{ backgroundImage: `url(${props.cover_image})` }} />
      <h3>{props.name}</h3>
      <p>
        <em>{props.author}</em><br />
        <em>{props.publisher}</em><br />
        <em>{props.released_at}</em>
      </p>
      <p>{props.description}</p>
    </a>
  );
};

export type CardsProps = {
  resources: data.Resource[]
};

const Cards: React.FC<CardsProps> = (props) => {
  return (
    <section className={s.Cards}>
      {props.resources.map((props, idx) => (
        <Card key={idx} {...props} />
      ))}
    </section>
  );
}

export default Cards;
