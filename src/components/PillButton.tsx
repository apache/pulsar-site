import React from "react";

export type PillButtonVariant = "primary" | "grey" | "outline" | "white-outline";

export type PillButtonProps = {
  variant: PillButtonVariant,
  href: string,
  target?: '_blank' | '_self' | '_parent' | '_top',
  children: React.ReactNode
}

const PillButton: React.FC<PillButtonProps> = (props) => {
  return (
    <a
      className={`pill-btn ${props.variant}`}
      href={props.href}
      target={props.target}
    >
      {props.children}
    </a>
  );
};

export default PillButton;
