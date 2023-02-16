import React from "react";
import s from "./Section.module.css";
import WavySeparatorSix from "@site/static/img/separator-6.svg";

export type SectionProps = {
  title: string;
  children: React.ReactNode;
  anchor?: string;
  isHideSeparator?: boolean;
};

const Section: React.FC<SectionProps> = (props) => {
  return (
    <section className={s.Section} id={props.anchor}>
      <div className={s.Content}>
        <h2 className={s.Title}>{props.title}</h2>
        {props.children}
      </div>
      {!props.isHideSeparator && (
        <div className={s.Separator}>
          <WavySeparatorSix />
        </div>
      )}
    </section>
  );
};

export default Section;
