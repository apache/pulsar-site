import React from 'react';
import H1 from '../../ui/H/H1';
import s from './Features.module.css'

export type FeaturesProps = {};

const Features: React.FC<FeaturesProps> = (props) => {
  return (
    <div className={s.Features}>
      <div className={s.Content}>
        <H1>Features</H1>
      </div>
    </div>
  );
}

export default Features;

