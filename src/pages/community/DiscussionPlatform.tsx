import React from "react";
import PillButton, { PillButtonVariant } from "@site/src/components/PillButton";
import s from "./DiscussionPlatform.module.css";

type ActionButtonProps = {
  id: string;
  text: string;
  href: string;
  type: "primary" | "normal" | "link";
  isExternal?: boolean;
};

export type DiscussionPlatformProps = {
  name: string;
  logoSrc: string;
  description: React.ReactNode;
  actions?: ActionButtonProps[];
};

const DiscussionPlatform: React.FC<DiscussionPlatformProps> = (props) => {
  return (
    <div className={s.DiscussionPlatform}>
      <img className={s.Logo} src={props.logoSrc} />
      <div>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <div>
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

  let pillButtonVariant: PillButtonVariant;
  switch (props.type) {
    case "primary":
      pillButtonVariant = "primary";
      break;
    case "normal":
      pillButtonVariant = "grey";
      break;
  }

  return (
    <PillButton
      variant={pillButtonVariant}
      target={props.isExternal ? "_blank" : undefined}
      href={props.href}
    >
      {props.text}
    </PillButton>
  );
};

export default DiscussionPlatform;
