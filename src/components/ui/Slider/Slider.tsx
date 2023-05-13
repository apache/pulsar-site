import React, { useCallback, useEffect, useState } from 'react';
import SlickSlider from 'react-slick';

import LeftButton from './img/leftButton.svg';
import RightButton from './img/rightButton.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from './Slider.module.css';
import './styles.css';
import BrowserOnly from '@docusaurus/BrowserOnly';

type SliderProps = {
  children: React.ReactNode;
  slidesToShow: number;
  centerMode?: boolean;
}

const Slider = (props: SliderProps) => {
  const [smallScreen, setSmallScreen] = useState(true)

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <RightButton
        className={`${className} ${s.arrow_button} ${s.next_button}`}
        style={{ ...style, left: '70' }}
        onClick={onClick}
      />
    );
  }

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <LeftButton
        className={`${className} ${s.arrow_button} ${s.prev_button}`}
        style={{ ...style, left: '10' }}
        onClick={onClick}
      />
    );
  }

  const handleResize = useCallback(() => {
    setSmallScreen(window.innerWidth <= 800);
  }, []);

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
    slidesToShow: props.slidesToShow,
    slidesToScroll: 1,
    centerPadding: "60px",
    centerMode: props.centerMode || false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
    <BrowserOnly>
      {() => (
        <SlickSlider {...settings}>
          {props.children}
        </SlickSlider>
      )}
    </BrowserOnly>
  )
}

export default Slider;
