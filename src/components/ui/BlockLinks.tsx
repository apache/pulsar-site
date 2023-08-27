import React from "react";
import s from './BlockLinks.module.css';

export type BlockLinksProps = {
  children: React.ReactNode
};

const BlockLinks: React.FC<BlockLinksProps> = (props) => {
  return(
    <div className={s.BlockLinks}>
      {props.children}
    </div>
  )
}
export default BlockLinks;
