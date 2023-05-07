import React from "react";
import s from './Cards.module.css';
import * as data from '@site/data/events';

const Card: React.FC<data.Resource> = (props) => {
  return (
    <div className={s.Card}>
      {props.previewImg && <div className={s.CardImage} style={{ backgroundImage: `url(${props.previewImg})` }}></div>}
      <h3><a href={props.link}>{props.title}</a></h3>
      {props.description && <p>{props.description}</p>}
      <a href={props.link} target="_blank">Learn more</a>
    </div>
  );
};

export type CardsProps = {
  search: string,
  resources: data.Resource[]
};

const Cards: React.FC<CardsProps> = (props) => {
  const filteredRes = props.resources.filter((r) => {
    return (r.title && r.title.toLowerCase().includes(props.search.toLowerCase())) || (r.description && r.description.toLowerCase().includes(props.search.toLowerCase()));
  });

  if (filteredRes.length) {
    return (
      <section className={s.Cards}>
        {filteredRes.map((props, idx) => (
          <Card key={idx} {...props} />
        ))}
      </section>
    );
  } else {
    return (
      <section>
        <h3>Sorry, no resources match your search.</h3>
      </section>
    )
  }
}

export default Cards;
