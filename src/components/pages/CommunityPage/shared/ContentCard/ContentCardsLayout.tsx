import React from "react";
import s from "./ContentCardsLayout.module.css";
import ContentCard, { ContentCardProps } from "./ContentCard";

export type LayoutProps = {
  cards: ContentCardProps[];
  columns: 1 | 2 | 3;
};

const ContentCardsLayout: React.FC<LayoutProps> = (props) => {
  let className = "";
  switch (props.columns) {
    case 1:
      className = s.OneColumnLayout;
      break;
    case 2:
      className = s.TwoColumnsLayout;
      break;
    case 3:
      className = s.ThreeColumnsLayout;
      break;
  }

  return (
    <div className={className}>
      {(props.cards || []).map((card, i) => (
        <div key={card.title+i} className={s.Card}>
          <ContentCard {...card} />
        </div>
      ))}
    </div>
  );
};

export default ContentCardsLayout;
