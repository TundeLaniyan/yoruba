import React, { useEffect, useState } from "react";
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
  const [audio, setAudio] = useState(new Audio());

  useEffect(() => {
    if (auto === "Auto") {
      audio.pause();
      setAudio(new Audio(`/files/lecture${lecture + 1}/${exercise}`));
    }
  }, [exercise, lecture, type]);

  useEffect(() => {
    audio.play();
  }, [audio]);

  const randomNumber = (prev, value) => {
    if (random) return Math.ceil(Math.random() * limit);
    return prev + value;
  };

  return (
    <div className="slider">
      <button
        className="switch"
        disabled={!random && exercise < 2}
        onClick={() => setExercise((prev) => randomNumber(prev, -1))}
      ></button>
      <div
        className="slider__img"
        style={{
          backgroundImage: `url(../../files/lecture${
            lecture + 1
          }/${exercise}.png)`,
        }}
      ></div>
      <button
        className="switch switch--next"
        disabled={!random && exercise > limit - 1}
        onClick={() => setExercise((prev) => randomNumber(prev, 1))}
      ></button>
    </div>
  );
};

export default Slider;