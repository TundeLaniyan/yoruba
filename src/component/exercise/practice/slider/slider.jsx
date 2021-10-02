import React, { useEffect } from "react";
import { lesson } from "../../../../data.json";
import Sound from "../../../../Sound";
import "./slider.scss";

const Slider = ({ lecture, auto, random, exercise, setExercise }) => {
  const max = lesson[lecture - 1].words.length;

  useEffect(
    () => auto && Sound.start(`files/lecture${lecture}/${exercise}.m4a`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exercise]
  );

  const randomNumber = (prev, value) => {
    if (random) return Math.ceil(Math.random() * max);
    return prev + value;
  };

  return (
    <div className="slider">
      <button
        disabled={!random && exercise < 2}
        onClick={() => setExercise((prev) => randomNumber(prev, -1))}
        className="prev"
      >
        <img src="./img/return.svg" />
      </button>
      <div className="slider__text">
        <div>{lesson[lecture - 1].words[exercise - 1]}</div>
        <div>{lesson[lecture - 1].language?.[exercise - 1]}</div>
      </div>
      <button
        disabled={!random && exercise > max - 1}
        onClick={() => setExercise((prev) => randomNumber(prev, 1))}
        className="next"
      >
        <img src="./img/return.svg" />
      </button>
    </div>
  );
};

export default Slider;
