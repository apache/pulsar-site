import React from "react";
import s from './Cards.module.css';

export type Resource = {
  name: string;
  description: string;
  link: string;
  source_or_sink: string;
};

const Card: React.FC<Resource> = (props) => {
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
  resources: Resource[]
};

const Cards: React.FC<CardsProps> = (props) => {
  // This is the string being entered into the search form field
  const searchString = props.search;
  props.resources.sort((a, b) => (a.name > b.name) ? 1 : -1)

  // we only want to return cards who's title includes the search string.
  const filteredRes = props.resources.filter((r) => {
    return (r.name && r.name.toLowerCase().includes(searchString.toLowerCase())) || (r.description && r.description.toLowerCase().includes(searchString.toLowerCase()));
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
