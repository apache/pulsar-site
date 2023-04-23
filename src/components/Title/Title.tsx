import React from 'react';

import s from './Title.module.css';

type TitleProps = {
  text: string
}

const Title = (props: TitleProps) => {

  return (
    <span className={s.title}>
      {props.text}
    </span>
  )
}

export default Title;