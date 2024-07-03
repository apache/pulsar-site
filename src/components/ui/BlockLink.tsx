import React from "react";
import s from './BlockLink.module.css';

export type BlockLinkProps = {
  title: string,
  url: string
};

const BlockLink = (props) => {
  return (
    <a className={s.BlockLink} href={props.url}>
      {props.title}
    </a>
  )
}

export default BlockLink;
