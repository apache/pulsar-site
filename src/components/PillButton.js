import React from "react";

const PillButton = (props) => {
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
