import React, { useEffect, useState } from "react";
import Control from "./control/control";
import Menu from "./menu/menu";
import Slider from "./slider/slider";
import data from "../../../data.json";

const Practice = ({ lecture, exercise, setExercise, type }) => {
  const [auto, setAuto] = useState("Auto");
  const [random, setRandom] = useState(false);
  const [limit, setLimit] = useState(data.lesson[lecture].limit["type"]);

  useEffect(() => {
    setExercise(1);
    setLimit(data.lesson[lecture].limit[type]);
  }, [lecture, type]);

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
      <div className="title">{data.lesson[lecture].title}</div>
      <Control lecture={lecture} type={type} exercise={exercise} />
      <Slider
        lecture={lecture}
        exercise={exercise}
        setExercise={setExercise}
        limit={limit}
        type={type}
        auto={auto}
        random={random}
      />
      <Menu
        active={active}
        auto={auto}
        setAuto={setAuto}
        rando={random}
        setRandom={setRandom}
      />
      <p className="progress">
        {exercise}/{limit}
      </p>
    </div>
  );
};

export default Practice;