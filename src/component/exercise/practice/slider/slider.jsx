import React, { useEffect } from "react";
import { NATIVELANGUAGE, TARGETLANGUAGE } from "../../../../constant";
import { lesson } from "../../../../data.json";
import Sound from "../../../../Sound";
import "./slider.scss";

const Slider = ({ lecture, auto, random, exercise, setExercise, getWord }) => {
  const max = lesson[lecture - 1].text.length;

  useEffect(
    () => auto && Sound.play(`audio/${getWord(lecture, exercise)}.m4a`),
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
        <img src="./img/return.svg" alt="<" />
      </button>
      <div className="slider__text">
        <div>
          {lecture !== 1 &&
            lesson[lecture - 1].text[exercise - 1][NATIVELANGUAGE]}
        </div>
        <div>{lesson[lecture - 1].text[exercise - 1][TARGETLANGUAGE]}</div>
      </div>
      <button
        disabled={!random && exercise > max - 1}
        onClick={() => setExercise((prev) => randomNumber(prev, 1))}
        className="next"
      >
        <img src="./img/return.svg" alt=">" />
      </button>
    </div>
  );
};

export default Slider;
