import React, { useEffect } from "react";
import { lesson } from '../../../../data.json';
import Sound from "../../../../Sound";
import "./slider.css";

const Slider = ({ lecture, auto, random, exercise, setExercise }) => {
  const max = lesson[lecture - 1].lessons.length;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => auto && Sound.start(`files/lecture${lecture}/${exercise}.m4a`), [exercise]);

  const randomNumber = (prev, value) => {
    if (random) return Math.ceil(Math.random() * max);
    return prev + value;
  };

  return (
    <div className="slider">
      <button
        className="switch switch--next"
        disabled={!random && exercise < 2}
        onClick={() => setExercise((prev) => randomNumber(prev, -1))}
      ></button>
      <div className="slider__img-container">
        <div
          className="slider__img"
          onClick={() => Sound.start(`files/lecture${lecture}/${exercise}.m4a`)}
          style={{backgroundImage: `url(./img/lecture${lecture}/${exercise}.jpg)`}}
        ></div>
        <h5>{lesson[lecture - 1].langauge?.[exercise - 1]}</h5>
        <h5>{lesson[lecture - 1].lessons[exercise - 1]}</h5>
      </div>
      <button
        className="switch"
        disabled={!random && exercise > max - 1}
        onClick={() => setExercise((prev) => randomNumber(prev, 1))}
      ></button>
    </div>
  );
};

export default Slider;