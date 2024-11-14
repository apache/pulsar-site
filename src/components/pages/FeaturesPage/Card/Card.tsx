import React, { CSSProperties, ReactNode, useState } from 'react';
import s from './Card.module.css'

export type CardProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
  bottomContent?: ReactNode
  className?: string
  style?: CSSProperties
  showMore?: {
    position: 'left' | 'right',
    leftContent?: ReactNode
    rightContent?: ReactNode
    bottomContent?: ReactNode
  }
};

const Card: React.FC<CardProps> = (props) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const showMoreButton = (
    <button
      type='button'
      className={s.ShowMoreButton}
      onClick={() => setIsShowMore(!isShowMore)}
    >
      {isShowMore ? '↑ Show less' : '↓ Show more'}
    </button>
  );

  return (
    <section className={`${s.Card} ${props.className || ''}`} style={props.style}>
      <div className={s.Columns}>
        <div className={s.LeftColumn}>
          {props.leftContent}
          {(!isShowMore && !props.bottomContent && props.showMore && props.showMore.position === 'left') ? showMoreButton : null}
        </div>
        <div className={s.RightColumn}>
          {props.rightContent}
          {(!isShowMore && !props.bottomContent && props.showMore && props.showMore.position === 'right') ? showMoreButton : null}
        </div>

        {props.bottomContent && <div className={s.BottomContent}>
          {props.bottomContent}
          {(props.bottomContent && props.showMore) ? showMoreButton : null}
        </div>}
      </div>

      {isShowMore ? (
        <div className={s.ShowMore}>
          <div className={s.ShowMoreColumns}>
            <div className={s.LeftColumn}>
              {props.showMore.leftContent}
              {!props.showMore.bottomContent && props.showMore.position === 'left' ? showMoreButton : null}
            </div>
            <div className={s.RightColumn}>
              {props.showMore.rightContent}
              {!props.showMore.bottomContent && props.showMore.position === 'right' ? showMoreButton : null}
            </div>
          </div>

          <div className={s.ShowMoreBottomContent}>
            {props.showMore?.bottomContent}
            {props.showMore.bottomContent ? showMoreButton : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Card;
