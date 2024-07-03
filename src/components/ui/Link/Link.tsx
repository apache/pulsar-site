import React from 'react';

import s from './Link.module.css';

type LinkProps = {
  href: string,
  text: string,
}

const Link = (props: LinkProps) => {

  return (
    <a className={s.link} href={props.href}>
      {props.text}
    </a>
  )
}

export default Link;