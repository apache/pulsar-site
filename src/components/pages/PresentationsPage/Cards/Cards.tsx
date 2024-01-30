import React from "react";
import s from './Cards.module.css';
import * as data from '@site/data/resources';

const Card: React.FC<data.Resource> = (props) => {
  let tagsArray = new Array();
  if(props.tags) tagsArray = props.tags.split(", ");
  return (
    <div className={s.Card}>
      <h3><a href={props.link}>{props.title}</a></h3>
      <div>
        <a className={s.ForumLink} target="_blank" href={props.forum_link}><strong>{props.forum}</strong></a>
      </div>
      {props.date && <div className={s.Date}>{props.date}</div>}
      {props.tags && <div className={s.Tags}>{tagsArray.map((tag)=>( <small>{tag}</small> ))}</div>}
      {props.presenter && <p>Presented by <strong>{props.presenter}</strong></p>}
    </div>
  );
};

export type CardsProps = {
  resources: data.Resource[]
};

const Cards: React.FC<CardsProps> = (props) => {

  return (
    <section className={s.Cards}>
      {props.resources.map((prop, idx) => (
        <Card key={idx} {...prop} />
      ))}
    </section>
  );
}

export default Cards;
