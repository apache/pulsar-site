import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import s from './Cards.module.css';
import * as data from '@site/data/events';

const Card: React.FC<data.Resource> = (props) => {
  const content = (
    <>
      {props.displayDate && <p>{props.displayDate}</p>}
      <h3>{props.title}</h3>
      {props.description && <p>{props.description}</p>}
      {props.link && <img src={useBaseUrl('/img/goto.svg')} />}
    </>
  );

  return props.link ? (
    <a 
      href={props.link} 
      className={s.Card}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <div className={s.Card}>
      {content}
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

  const resources = props.resources.sort((a, b) => {
    if (!a.startDate || !b.startDate) return 0;
    return b.startDate.localeCompare(a.startDate, 'en', { sensitivity: 'base' });
  });

  return (
    <section className={s.Cards}>
      {resources.map((props, idx) => (
        <Card key={idx} {...props} />
      ))}
    </section>
  );
}

export default Cards;
