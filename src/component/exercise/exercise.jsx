import React from "react";
import Practice from "./practice/practice";
import { Link, Route, Switch } from "react-router-dom";
import Lesson from "./lesson/lesson";
import Task from "./task/task";
import EasyGame from "./easyGame/easyGame";
import EasyGameAccent from "./easyGame/easyGameAccent";
import { TiArrowBack } from "react-icons/ti";
import HardGame from "./hardGame/hardGame";
import MemoryGame from "./memoryGame/memoryGame";
import Reading from "./reading/reading";
import "./exercise.css";

const Exercise = ({ lecture, setLecture, location, Game }) => {
  return (
    <div className="exercise__container">
      <div className="exercise">
        <Link
          to={`/${location.pathname !== "/task" ? "task" : ""}`}
          className="return"
        >
          {location.pathname !== "/" && <TiArrowBack />}
        </Link>
        <Switch>
          {/* <Route path="/lesson">
            <Practice
              lecture={lecture}
              exercise={exercise}
              setExercise={setExercise}
              type="lesson"
            />
          </Route> */}
          <Route path="/exercise">
            <Practice lecture={lecture} type="exercise" />
          </Route>
          <Route path="/task">
            <Task lecture={lecture} Game={Game} />
          </Route>
          <Route path="/easyGame">
            <EasyGame lecture={lecture} Game={Game} />
          </Route>
          <Route path="/easyGameAccent">
            <EasyGameAccent lecture={lecture} Game={Game} />
          </Route>
          <Route path="/hardGame">
            <HardGame lecture={lecture} Game={Game} />
          </Route>
          <Route path="/reading">
            <Reading lecture={lecture} Game={Game} />
          </Route>
          <Route path="/memoryGame">
            <MemoryGame lecture={lecture} Game={Game} />
          </Route>
          <Route path="/">
            <Lesson setLecture={setLecture} lecture={lecture} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Exercise;
