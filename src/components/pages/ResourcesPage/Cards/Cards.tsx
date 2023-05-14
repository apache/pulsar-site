import React from "react";
import s from './Cards.module.css';
import * as data from '@site/data/resources';

const Card: React.FC<data.Resource> = (props) => {
  return (
    <div className={s.Card}>
      <p>
        <a className={s.ForumLink} target="_blank" href={props.forum_link}><strong>{props.forum}</strong></a>
      </p>
      <h3><a href={props.link}>{props.title}</a></h3>
      <div className={s.AdditionalInfo}>
        {props.date && <div><small className={s.Date}>{props.date}</small></div>}
        {props.tags && <div><small>Tags: {props.tags}</small></div>}
      </div>
      {props.presenter && <p>Presented by <strong>{props.presenter}</strong></p>}
      <a href={props.link} target="_blank">Learn more</a>
    </div>
  );
};

export type CardsProps = {
  resources: data.Resource[]
  search: string
};

const Cards: React.FC<CardsProps> = (props) => {
  const lowerCaseSearch = props.search.toLowerCase();
  const filteredRes = props.resources.filter((r) => {
    return r.title.toLowerCase().includes(lowerCaseSearch) ||
      (r.tags || '').toLowerCase().includes(lowerCaseSearch) ||
      (r.presenter || '').toLowerCase().includes(lowerCaseSearch) ||
      (r.forum || '').toLowerCase().includes(lowerCaseSearch)
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
