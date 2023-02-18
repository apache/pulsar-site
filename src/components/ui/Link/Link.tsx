import React from "react";
import s from "./Link.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import NavigateSvg from "./navigate.svg";
import ExternalSvg from "./external.svg";

export type LinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "regular" | "external" | "navigate";
  isExternal?: boolean;
};

const Link: React.FC<LinkProps> = (props) => {
  return (
    <a
      className={s.Link}
      href={props.isExternal ? props.href : useBaseUrl(props.href)}
      target={props.isExternal ? "_blank" : "_self"}
      rel={props.isExternal ? "noopener noreferrer" : undefined}
    >
      {props.children}
      {props.variant === "navigate" && <NavigateSvg className={s.Icon} />}
    </a>
  );
};

export default Link;
