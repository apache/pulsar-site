import React from "react";
import s from './Cards.module.css';
import * as data from '@site/data/books';
import useBaseUrl from "@docusaurus/useBaseUrl";

const Card: React.FC<data.Resource> = (props) => {
  return (
    <a className={s.Card} href={props.link} target="_blank">
      <div className={s.CardImage}>
        <div style={{ backgroundImage: `url(${props.cover_image})` }}></div>
        <img src={useBaseUrl('/img/goto.svg')} />
      </div>
      <h3>{props.name}</h3>
      <p>
        <span>{props.author}</span>
        <span>{props.publisher}</span>
        <span>{props.released_at}</span>
      </p>
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
