import React, { useEffect, useState } from 'react';

import reviews from './reviews';

import Quote from './picture/quote.svg';
import LeftButton from './picture/leftButton.svg';
import RightButton from './picture/rightButton.svg';

import s from './Slider.module.css';

const Slider = () => {
  const [shift, setShift] = useState(0);
  const [slides, setSlides] = useState(reviews);

  const moveLeft = () => {
    if (shift !== 0) {
      setShift(shift + 1);
    }
  }

  const moveRight = () => {
    if (Math.abs(shift) < reviews.length - 1) {
      setShift(shift - 1);
    }
  }

  useEffect(() => {
    // console.log(shift, slides.length)
    // if (shift > -slides.length - 3 || Math.abs(shift) > slides.length - 3) {
    //   setSlides([...slides, ...reviews]);
    // }
  }, [shift]);

  return (
    <div className={s.slider}>
      <div
        className={s.slider_container}
        style={{
          width: `${700 * reviews.length}px`,
          left: `${shift * 700}px`
        }}
      >
        {slides.map((slide) => (
          <div className={s.slide}>
            <Quote className={s.quote} />
            <span className={s.text}>
              {slide.text}
            </span>
            
            <span className={s.author}>
              {slide.author}
            </span>

            <span className={s.platform}>
              {slide.platform}
            </span>
          </div>
        ))}
      </div>

      <div className={s.buttons_container}>
        <LeftButton onClick={() => moveLeft()} className={s.button} />
        <RightButton onClick={() => moveRight()} />
      </div>
    </div>
  )
}

export default Slider;