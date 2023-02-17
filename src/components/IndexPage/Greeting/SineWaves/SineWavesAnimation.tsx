import React, { useEffect } from "react";
import s from "./SineWavesAnimation.module.css";
import SineWaves from "sine-waves";

const SineWavesAnimation: React.FC = () => {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const [isStarted, setIsStarted] = React.useState(false);

  useEffect(() => {
    if (!isStarted && ref.current) {
      startWaves(ref.current);
      setIsStarted(true);
    }
  }, []);

  return (
    <div className={s.SineWavesAnimation}>
      <canvas ref={ref}></canvas>
    </div>
  );
};

function startWaves(el: HTMLElement) {
  if (!SineWaves) {
    return;
  }
  new SineWaves({
    el,
    speed: 2,
    width: function () {
      return document.body.clientWidth;
    },
    height: function () {
      return 300;
    },
    ease: "SineInOut",
    wavesWidth: "60%",
    waves: [
      {
        timeModifier: 3,
        lineWidth: 4,
        amplitude: -25,
        wavelength: 25,
      },
      {
        timeModifier: 2,
        lineWidth: 4,
        amplitude: -50,
        wavelength: 50,
      },
      {
        timeModifier: 1,
        lineWidth: 4,
        amplitude: -100,
        wavelength: 100,
      },
      {
        timeModifier: 0.5,
        lineWidth: 4,
        amplitude: -125,
        wavelength: 125,
      },
      {
        timeModifier: 1.25,
        lineWidth: 4,
        amplitude: -150,
        wavelength: 150,
      },
    ],

    // Called on window resize
    resizeEvent: function () {
      var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
      gradient.addColorStop(0, "rgba(24, 143, 255, 1)");
      gradient.addColorStop(0.5, "rgba(70, 78, 86, 1)");

      var index = -1;
      var length = this.waves.length;
      while (++index < length) {
        this.waves[index].strokeStyle = gradient;
      }

      // Clean Up
      index = void 0;
      length = void 0;
      gradient = void 0;
    },
  });
}

export default SineWavesAnimation;
