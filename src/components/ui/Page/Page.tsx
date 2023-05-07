import React from "react";
import s from './Page.module.css';

export type PageProps = {
  children: React.ReactNode
};

const Page: React.FC<PageProps> = (props) => {
  return (
    <div className={s.Page}>
      <div className={s.PageContent}>
        {props.children}
        </div>
      </div>
  )
};

export default Page;
