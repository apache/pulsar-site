import React from 'react';
import s from './ContributeDataDrivenPage.module.css'

const ContributeDataDrivenPage: React.FC = () => {
  return (
    <a className={s.ContributeDataDrivenPage} href="/contribute/site-intro/#how-to-update-data-driven-pages">
      <strong>Are we missing any?</strong> Please contribute updates by clicking here and following the instructions
    </a>
  );
}

export default ContributeDataDrivenPage;
