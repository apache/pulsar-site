import React from "react";
import s from "./Section.module.css";
import WavySeparatorSix from "@site/static/img/separator-6.svg";

export type SectionProps = {
  title: string;
  children: React.ReactNode;
  anchor?: string;
};

const Section: React.FC<SectionProps> = (props) => {
  return (
    <section className={s.Section} id={props.anchor}>
      <h2 className={s.Title}>{props.title}</h2>
      <div className={s.Content}>{props.children}</div>
      <div className={s.Separator}>
        <WavySeparatorSix />
      </div>
    </section>
  );
};

export default Section;
