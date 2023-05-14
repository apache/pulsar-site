import React from "react";
import s from './Page.module.css';

export type PageProps = {
  children: React.ReactNode
};

const Page: React.FC<PageProps> = (props) => {
  return (
    <section className={s.Page}>
      <div className={s.PageContent}>
        {props.children}
        </div>
      </section>
  )
};

export default Page;
