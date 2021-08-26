import React, { useEffect, useState } from "react";
import Control from "./control/control";
import Menu from "./menu/menu";
import Slider from "./slider/slider";
import { lesson } from "../../../data.json";

const Practice = ({ lecture, exercise, setExercise, type }) => {
  const [auto, setAuto] = useState("Auto");
  const [random, setRandom] = useState(false);
  const max = lesson[lecture - 1].lessons.length;

  useEffect(() => { setExercise(1); }, [lecture]);

  const active = (check, result) => {
    if (check === result)
      return {
        fontWeight: 700,
        boxShadow: "0 .125rem 0 0 #00000026",
        transform: "translateY(1px)",
        borderWidth: "2px",
      };
  };

  return (
    <div>
      <div className="title">{lesson[lecture].title}</div>
      <Menu
        active={active}
        auto={auto}
        setAuto={setAuto}
        rando={random}
        setRandom={setRandom}
      />
      <Control lecture={lecture} type={type} exercise={exercise} />
      <Slider
        lecture={lecture}
        exercise={exercise}
        setExercise={setExercise}
        limit={max}
        type={type}
        auto={auto}
        random={random}
      />
      <p className="progress">{exercise}/{max}</p>
    </div>
  );
};

export default Practice;