import React from 'react';

import s from './Button.module.css';

export type ButtonVariant = 'action' | 'regular';

type Button = {
  title: string,
  variant?: ButtonVariant,
  href?: string,
  target?: string,
  onClick?: () => void
}

const Button = (props: Button) => {
  const contentClassName = `${s.content} ${props.variant === 'action' ? s.action : s.regular}`;
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

export default Button;
