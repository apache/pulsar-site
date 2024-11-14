import React from 'react';
import s from './ScreenTitle.module.css'

export type ScreenTitleProps = {
  children: React.ReactNode;
};

const ScreenTitle: React.FC<ScreenTitleProps> = (props) => {
  return (
    <h2 className={s.ScreenTitle}>
      {props.children}
    </h2>
  );
}

export default ScreenTitle;

