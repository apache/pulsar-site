import React, { useEffect, useState } from 'react';
import SlickSlider from 'react-slick';

import LeftButton from './picture/leftButton.svg';
import RightButton from './picture/rightButton.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from './Slider.module.css';
import './styles.css';

type SliderProps = {
  children: React.ReactNode;
  centerMode?: boolean;
}

const Slider = (props: SliderProps) => {
  const [smallScreen, setSmallScreen] = useState(true)

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <RightButton
        className={`${className} ${s.arrow_button}`}
        style={{ ...style, left: '60' }}
        onClick={onClick}
      />
    );
  }

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <LeftButton
        className={`${className} ${s.arrow_button}`}
        style={{ ...style, left: '0' }}
        onClick={onClick}
      />
    );
  }

  const handleResize = () => {
    setSmallScreen(window.innerWidth <= 800);
    console.log(window.innerWidth <= 800)
  };

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerPadding: "60px",
    centerMode: props.centerMode || false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: smallScreen,
    arrows: !smallScreen,
    responsive: [
      {
        breakpoint: 801,
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