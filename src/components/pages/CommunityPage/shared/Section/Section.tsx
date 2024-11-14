import React from "react";
import s from "./Section.module.css";

export type SectionProps = {
  title: string;
  children: React.ReactNode;
  anchor?: string;
};

const Section: React.FC<SectionProps> = (props) => {
  return (
    <section className={s.Section} id={props.anchor}>
      <div className={s.Content}>
        <h2 className={s.Title}>{props.title}</h2>
        {props.children}
      </div>
    </section>
  );
};

export default Section;
