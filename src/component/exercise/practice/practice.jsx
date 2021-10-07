import React, { useEffect, useState, useRef } from "react";
import Slider from "./slider/slider";
import { lesson } from "../../../data.json";
import Menu from "./menu/menu";
import "./practice.scss";
import Sound from "../../../Sound";
import Navigation from "../navigation/navigation";

const Practice = ({ lecture }) => {
  const [auto, setAuto] = useState(true);
  const [random, setRandom] = useState(false);
  const [exercise, setExercise] = useState(1);
  const currentExercise = useRef();
  currentExercise.current = exercise;
  const [autoPlay, setAutoPlay] = useState(false);
  const [intervalId, setIntervalId] = useState();
  const currentIntervalId = useRef();
  currentIntervalId.current = intervalId;
  const max = lesson[lecture - 1].words.length;

  useEffect(() => () => clearInterval(currentIntervalId.current), []);

  useEffect(() => {
    clearInterval(intervalId);
    if (autoPlay)
      setIntervalId(
        setInterval(
          () => setExercise((prev) => (prev < max ? prev + 1 : 1)),
          4000
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  return (
    <div className="practice">
      <Navigation challenge="Exercise" lecture={lecture} />
      <div className="practice__content">
        <div
          className="practice__img"
          onClick={() => Sound.play(`files/lecture${lecture}/${exercise}.m4a`)}
          style={{
            backgroundImage: `url(./img/lecture${lecture}/${exercise}.jpg)`,
          }}
        ></div>

        <Slider
          lecture={lecture}
          auto={auto}
          random={random}
          exercise={exercise}
          setExercise={setExercise}
        />
        <Menu
          auto={auto}
          setAuto={setAuto}
          autoPlay={autoPlay}
          setAutoPlay={setAutoPlay}
          random={random}
          setRandom={setRandom}
        />
      </div>
    </div>
  );
};

export default Practice;
