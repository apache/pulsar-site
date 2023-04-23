import React, { useState, useEffect } from "react";

import s from './Parallax.module.css';

type ParallaxProps = {
  children: React.ReactNode
}

const ParallaxComponent = (props: ParallaxProps) => {
  const { children } = props;

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => setScrollPosition(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={s.container}>
      <div
        className={s.component}
        style={{
          transform: `translateY(${scrollPosition * 0.5}px)`,
          opacity: 1 - scrollPosition / window.innerHeight
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxComponent;
