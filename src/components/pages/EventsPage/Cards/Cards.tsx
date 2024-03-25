import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import s from './Cards.module.css';
import * as data from '@site/data/events';

const Card: React.FC<data.Resource> = (props) => {
  return (
    <a href={props.link} className={s.Card}>
      {props.displayDate && <p>{props.displayDate}</p>}
      {props.description && <p>{props.description}</p>}
      <h3>{props.title}</h3>
      <img src={useBaseUrl('/img/goto.svg')} />
    </a>
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
