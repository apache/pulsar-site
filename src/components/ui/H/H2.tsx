import React from 'react';
import s from './H1.module.css'

export type H2Props = {
  children: React.ReactNode;
};

const H2: React.FC<H2Props> = (props) => {
  return (
    <h1 className={s.H2}>
      {props.children}
    </h1>
  );
}

export default H2;

