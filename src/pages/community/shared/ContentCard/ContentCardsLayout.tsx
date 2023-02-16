import React from "react";
import s from "./ContentCardsLayout.module.css";
import ContentCard, { ContentCardProps } from "./ContentCard";

export type LayoutProps = {
  cards: ContentCardProps[];
  columns: 1 | 2;
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
  }

  return (
    <div className={className}>
      {(props.cards || []).map((card) => (
        <div key={card.title} className={s.Card}>
          <ContentCard {...card} />
        </div>
      ))}
    </div>
  );
};

export default ContentCardsLayout;
