import React from 'react';
import s from './H1.module.css'

export type H1Props = {
  children: React.ReactNode;
};

const H1: React.FC<H1Props> = (props) => {
  return (
    <h1 className={s.H1}>
      {props.children}
    </h1>
  );
}

export default H1;
