import React from 'react';
import SlickSlider from 'react-slick';

import LeftButton from './picture/leftButton.svg';
import RightButton from './picture/rightButton.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';

type SliderProps = {
  children: React.ReactNode;
}

const Slider = (props: SliderProps) => {
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <RightButton
        className={className}
        style={{ ...style, top: '102.5%', left: '60', width: '48px', height: '48px' }}
        onClick={onClick}
      />
    );
  }

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <LeftButton
        className={className}
        style={{ ...style, top: '102.5%', left: '0', width: '48px', height: '48px' }}
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
    nextArrow: window.innerWidth > 800 && <SampleNextArrow />,
    prevArrow: window.innerWidth > 800 && <SamplePrevArrow />,
    dots: window.innerWidth < 800,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  return (
    <SlickSlider {...settings}>
      {props.children}
    </SlickSlider>
  )
}

export default Slider;