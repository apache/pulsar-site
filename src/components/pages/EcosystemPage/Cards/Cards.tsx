import React from "react";
import s from './Cards.module.css';
import * as data from '@site/data/ecosystem';

const Card: React.FC<data.Resource> = (props) => {
  return (
    <div className={s.Card}>
      <h3><a href={props.link}>{props.name}</a></h3>
      {props.description && <p>{props.description}</p>}
      <h5>{props.source_or_sink}</h5>
      <a href={props.link} target="_blank">See Details</a>
    </div>
  );
};

export type CardsProps = {
  search: string,
  resources: data.Resource[]
};

const Cards: React.FC<CardsProps> = (props) => {
  const resources = props.resources.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

  const filteredRes = resources.filter((r) => {
    return (r.name && r.name.toLowerCase().includes(props.search.toLowerCase())) || (r.description && r.description.toLowerCase().includes(props.search.toLowerCase()));
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
