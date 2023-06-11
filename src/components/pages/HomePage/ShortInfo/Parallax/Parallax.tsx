import React from "react";
import useScrollPosition from "../../useScrollPosition";

import s from './Parallax.module.css';

type ParallaxProps = {
  children: React.ReactNode
}

const Parallax = (props: ParallaxProps) => {
  const { children } = props;
  const isBrowser = typeof window !== 'undefined';
  const scrollPosition = useScrollPosition();

  return (
    <div className={s.container}>
      <div
        className={s.component}
        style={{
          transform: `translateY(-${scrollPosition * 0.5}px) translateZ(0)`,
          opacity: 1 - scrollPosition / (isBrowser ? window.innerHeight : 1),
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Parallax;
