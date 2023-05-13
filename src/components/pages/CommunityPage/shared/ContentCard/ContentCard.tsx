import React from "react";
import Button, { ButtonVariant } from "@site/src/components/ui/Button/Button";
import s from "./ContentCard.module.css";

type ActionButtonProps = {
  id: string;
  text: string;
  href: string;
  type: "primary" | "normal" | "link";
  isExternal?: boolean;
};

export type ContentCardProps = {
  title: string;
  description: React.ReactNode;
  image?: {
    src: string;
    size?: "normal" | "big";
  };
  actions?: ActionButtonProps[];
};

const ContentCard: React.FC<ContentCardProps> = (props) => {
  return (
    <div className={s.ContentCard}>
      {props.image && (
        <img
          className={`${props.image.size === "big" ? s.BigImage : s.NormalImage}`}
          src={props.image.src}
        />
      )}
      <div>
        <h3>{props.title}</h3>
        <div>{props.description}</div>
        <div className={s.Actions}>
          {(props.actions || []).map((action) => (
            <ActionButton key={action.id} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  if (props.type === "link") {
  }

  let buttonVariant: ButtonVariant;
  switch (props.type) {
    case "primary":
      buttonVariant = "action";
      break;
    case "normal":
      buttonVariant = "regular";
      break;
  }

  return (
    <div className={s.ActionButton}>
      <Button
        variant={buttonVariant}
        target={props.isExternal ? "_blank" : undefined}
        href={props.href}
        title={props.text}
      />
    </div>

  );
};

export default ContentCard;
