import React from "react";
import s from './Cards.module.css';
import * as data from '@site/data/case-studies';
import linkIcon from '!!raw-loader!./link.svg';
import SvgIcon from "@site/src/components/ui/SvgIcon/SvgIcon";

const Card: React.FC<data.Resource> = (props) => {
  return (
    <div className={s.Card}>
      <a className={s.CardImage} href={props.link} style={{ backgroundImage: `url(${props.image})`, ...props.extraStyles }}>
        <div className={s.LinkIcon}>
          <SvgIcon svg={linkIcon} />
        </div>
      </a>
      <h3 className={s.CompanyName}>{props.company}</h3>
      {props.description && <p>{props.description}</p>}
    </div >
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
