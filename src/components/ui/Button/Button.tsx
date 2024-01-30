import React from 'react';

import s from './Button.module.css';

export type ButtonVariant = 'action' | 'regular' | 'negative' | 'clean' | 'cleaninvert' | 'transparentwhite' | 'transparentblack';

type Button = {
  title: string,
  variant?: ButtonVariant,
  href?: string,
  target?: string,
  onClick?: () => void,
  icon?: string
}

const Button = (props: Button) => {
  let contentClassName = '';
  switch(props.variant){
    case 'action': contentClassName = `${s.content} ${s.action}`; break;
    case 'regular': contentClassName = `${s.content} ${s.regular}`; break;
    case 'negative': contentClassName = `${s.content} ${s.negative}`; break;
    case 'clean': contentClassName = `${s.content} ${s.clean}`; break;
    case 'cleaninvert': contentClassName = `${s.content} ${s.cleaninvert}`; break;
    case 'transparentwhite': contentClassName = `${s.content} ${s.transparentwhite}`; break;
    case 'transparentblack': contentClassName = `${s.content} ${s.transparentblack}`; break;
  }
  const content = <div className={contentClassName}>{props.title}{(props.icon ? <img className={s.icon} src={props.icon} alt={props.title} /> : '')}</div>;

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
