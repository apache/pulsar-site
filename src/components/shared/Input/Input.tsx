import React from 'react';

import Search from './pictures/search.svg';

import s from './Input.module.css';

type InputProps = {
  placeholder?: string,
}

const Input = (props: InputProps) => {

  return (
    <div className={s.block}>
      <svg className={s.search}>
        <Search />
      </svg>

      <input placeholder={props.placeholder} className={s.input} />
    </div>
  )
}

export default Input;