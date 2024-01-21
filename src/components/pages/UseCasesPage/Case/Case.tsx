import React, { CSSProperties, ReactNode, useState } from 'react';
const versions = require("@site/versions.json");
const latestVersion = versions[0];
import s from './Case.module.css';

import Button from '@site/src/components/ui/Button/Button';

export type CaseProps = {
    icon: string,
    title: string;
    text: string;
    docslink: string;
    caselink: boolean;
};

const Case: React.FC<CaseProps> = (props) => {
  let icon = '';
  switch(props.icon){
    case 'user': icon = s.user; break;
    case 'arrow': icon = s.arrow; break;
    case 'speech': icon = s.speech; break;
    case 'check': icon = s.check; break;
  }
    const docsLink = (props.docslink) ? (<Button
        title='Read docs'
        variant='regular'
        href={`/docs/${latestVersion}/{props.docslink}`}
      />) : ('');
      const caseLink = (props.caselink) ? (<Button
        title='Explore case studies'
        variant='clean'
        href={`/case-studies/`}
      />) : ('');
  return (
    <div>
        <div className={icon}></div>
        <h3>{props.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
        <div>
            {docsLink}
            {caseLink}
        </div>
    </div>
    
  );
}

export default Case;
