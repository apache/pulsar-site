import React from 'react';
import s from './ContributeDataDrivenPage.module.css'

const ContributeDataDrivenPage: React.FC = () => {
  return (
    <a className={s.ContributeDataDrivenPage} href="/contribute/site-intro/#how-to-update-data-driven-pages">
      <strong>Are we missing any?</strong> Click here to contribute
    </a>
  );
}

export default ContributeDataDrivenPage;
