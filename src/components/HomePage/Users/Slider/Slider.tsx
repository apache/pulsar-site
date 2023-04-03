import React from 'react';
import SlickSlider from 'react-slick';

import slides from './reviews';

import Quote from './picture/quote.svg';
import LeftButton from './picture/leftButton.svg';
import RightButton from './picture/rightButton.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from './Slider.module.css';

const Slider = () => {
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <RightButton
        className={className}
        style={{ ...style, top: '110%', left: '60', width: '48px', height: '48px' }}
        onClick={onClick}
      />
    );
  }

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <LeftButton
        className={className}
        style={{ ...style, top: '110%', left: '0', width: '48px', height: '48px' }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    className: "center",
    centerPadding: "60px",
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className={s.slider}>
      <SlickSlider {...settings}>
        {slides.map((slide) => (
          <div className={s.slide}>
            <div className={s.slide_container}>
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
          </div>
        ))}
      </SlickSlider>
    </div>
  )
}

export default Slider;