import React, { useEffect, useState } from "react";
import { lesson } from '../../../../data.json';
import "./slider.css";

const Slider = ({
  lecture,
  exercise,
  setExercise,
  limit,
  type,
  auto,
  random,
}) => {
  const [audio, setAudio] = useState();
  
  useEffect(() => {
    if (auto === "Auto") {
      audio?.pause();
      // console.log({exercise, lecture});
      new Audio(`files/lecture${lecture}/${exercise}.m4a`).play()
      const currentAudio = new Audio(`files/lecture${lecture}/${exercise}.m4a`);
      currentAudio.play();
      setAudio(currentAudio);
    }
  }, [exercise, lecture, type]);

  const randomNumber = (prev, value) => {
    if (random) return Math.ceil(Math.random() * limit);
    return prev + value;
  };

  return (
    <div className="slider">
      <button
        className="switch switch--next"
        disabled={!random && exercise < 2}
        onClick={() => setExercise((prev) => randomNumber(prev, -1))}
      ></button>
      <div>
        <div
          className="slider__img"
          style={{backgroundImage: `url(./img/lecture${lecture}/${exercise}.jpg)`}}
        ></div>
        <h5>{lesson[lecture - 1].lessons[exercise - 1]}</h5>
      </div>
      <button
        className="switch"
        disabled={!random && exercise > limit - 1}
        onClick={() => setExercise((prev) => randomNumber(prev, 1))}
      ></button>
    </div>
  );
};

export default Slider;