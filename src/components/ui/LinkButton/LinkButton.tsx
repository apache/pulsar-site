import React from 'react';

import s from './LinkButton.module.css';

type LinkButtonProps = {
  title: string,
  filled: boolean,
  link: string,
}

const LinkButton = (props: LinkButtonProps) => {

  return (
    <a className={`${s.button} ${props.filled ? s.filled_button : s.unfilled_button}`} href={props.link}>
      {props.title}
    </a>
  )
}

export default LinkButton;