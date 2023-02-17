import React from 'react';
import s from './ActionButtonGroup.module.css'

export type ActionButtonGroupProps = {
  children: React.ReactNode;
};

const ActionButtonGroup: React.FC<ActionButtonGroupProps> = (props) => {
  return (
    <div className={s.ActionButtonGroup}>
      {props.children}
    </div>
  );
}

export default ActionButtonGroup;

