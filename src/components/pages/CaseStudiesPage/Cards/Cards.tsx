import React from "react";
import s from './Cards.module.css';
import * as data from '@site/data/case-studies';
import useBaseUrl from "@docusaurus/useBaseUrl";

const Card: React.FC<data.Resource> = (props) => {
  return (
    <a href={props.link} target="_blank" className={s.Card}>
      <div className={s.CardImage}>
        <div style={{ backgroundImage: `url(${props.image})` }}></div>
        <img src={useBaseUrl('/img/goto.svg')} />
      </div>
      <h3>{props.company}</h3>
      {props.description && <p>{props.description}</p>}
    </a>
  );
};

export type CardsProps = {
  search: string,
  resources: data.Resource[]
};

const Cards: React.FC<CardsProps> = (props) => {
  const resources = props.resources.sort((a, b) => a.company.localeCompare(b.company, 'en', { sensitivity: 'base' }));

  const filteredRes = resources.filter((r) => {
    return (r.company && r.company.toLowerCase().includes(props.search.toLowerCase())) || (r.description && r.description.toLowerCase().includes(props.search.toLowerCase()));
  });

  if (!filteredRes.length) {
    return (
      <section>
        <h3>Sorry, no resources match your search.</h3>
      </section>
    );
  }

  return (
    <section className={s.Cards}>
      {filteredRes.map((props, idx) => (
        <Card key={idx} {...props} />
      ))}
    </section>
  );
}

export default Cards;
