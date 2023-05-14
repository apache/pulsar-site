import React, { useState, useEffect, useCallback } from "react";

import s from './Parallax.module.css';

type ParallaxProps = {
  children: React.ReactNode
}

const Parallax = (props: ParallaxProps) => {
  const { children } = props;
  const isBrowser = typeof window !== 'undefined';

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollPosition(isBrowser ? window.scrollY : 0)
  }, []);

  useEffect(() => {
    if (isBrowser) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className={s.container}>
      <div
        className={s.component}
        style={{
          transform: `translateY(-${scrollPosition * 0.5}px) translateZ(0)`,
          opacity: 1 - scrollPosition / (isBrowser ? window.innerHeight : 1)
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Parallax;
