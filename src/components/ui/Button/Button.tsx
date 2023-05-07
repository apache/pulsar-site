import React from 'react';

import s from './Button.module.css';

type LinkButtonProps = {
  title: string,
  appearance?: 'action' | 'regular',
  href?: string,
  target?: string,
  onClick?: () => void
}

const LinkButton = (props: LinkButtonProps) => {
  const contentClassName = `${s.content} ${props.appearance === 'action' ? s.action : s.regular}`;
  const content = <div className={contentClassName}>{props.title}</div>;

  if (props.href) {
    return (
      <a href={props.href} className={s.link} target={props.target}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={s.button} onClick={props.onClick}>
      {content}
    </button>
  );
}

export default LinkButton;
