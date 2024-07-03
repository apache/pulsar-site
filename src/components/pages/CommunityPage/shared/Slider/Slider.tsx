import BrowserOnly from "@docusaurus/BrowserOnly";
import React, { useEffect } from "react";

export type Slide = {
  img: string;
  alt: string;
};

export type SliderProps = {
  slides: Slide[];
};

const _Slider: React.FC<SliderProps> = (props) => {
  useEffect(() => {
    const slides = document.querySelectorAll(".slide-image");
    const allDots = document.getElementsByClassName("dot");
    const firstSlide = document.getElementById("slide-0");
    const firstDot = document.getElementById("dot-0");
    firstSlide.classList.add("active-slide");
    firstDot.classList.add("active-dot");
    const dots = document.querySelectorAll(".dot");
    const slideCount = slides.length;
    const intervalTime = 4000;
    let interval;
    let counter = 0;
    function cycleSlides() {
      const active = document.querySelector(".active-slide");
      const activeDot = document.querySelector(".active-dot");
      active.classList.remove("active-slide");
      activeDot.classList.remove("active-dot");
      if (counter === slideCount - 1) {
        slides[0].classList.add("active-slide");
        dots[0].classList.add("active-dot");
        counter = 0;
      } else {
        const next = counter++;
        slides[next].nextElementSibling.classList.add("active-slide");
        dots[next].nextElementSibling.classList.add("active-dot");
        counter += 1;
      }
    }
    const slideInterval = function () {
      interval = setInterval(function () {
        cycleSlides();
      }, intervalTime);
    };

    slideInterval();

    // if you click on  on a pagination dot
    const showSlide = function () {
      let id = this.getAttribute("id");
      let slideId = id.replace("dot", "slide");
      let target = document.getElementById(slideId);
      const active = document.querySelector(".active-slide");
      const activeDot = document.querySelector(".active-dot");
      active.classList.remove("active-slide");
      activeDot.classList.remove("active-dot");
      this.classList.add("active-dot");
      target.classList.add("active-slide");
      // stops the interval when someone clicks on a dot.
      clearInterval(interval);
    };
    for (let i = 0; i < allDots.length; i++) {
      allDots[i].addEventListener("click", showSlide, false);
    }

    // cleanup required or interval will continue to run, even on other pages
    return function cleanup() {
      clearInterval(interval);
    };
  });

  return (
    <div className="image-bg-container p-8 md:w-1/2">
      <div id="slider" className="relative">
        {props.slides.map((s, i) => {
          return (
            <img
              id={`slide-${i}`}
              key={i}
              className="slide-image"
              src={s.img}
              alt={s.alt}
            />
          );
        })}
      </div>
      <div className="pagination">
        {props.slides.map((_, i) => {
          return <div id={`dot-${i}`} key={i} className="dot"></div>;
        })}
      </div>
    </div>
  );
};

const Slider: React.FC<SliderProps> = (props) => (
  <BrowserOnly>{() => <_Slider {...props} />}</BrowserOnly>
);

export default Slider;
