import React from 'react';
import s from './H3.module.css'

export type H3Props = {
  children: React.ReactNode;
};

const H: React.FC<H3Props> = (props) => {
  return (
    <h3 className={s.H3}>
      {props.children}
    </h3>
  );
}

export default H;

