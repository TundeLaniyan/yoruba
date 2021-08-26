import React, { useState } from "react";
import Practice from "./practice/practice";
import { Link, Route, Switch } from "react-router-dom";
import Lesson from "./lesson/lesson";
import Task from "./task/task";
import EasyGame from "./easyGame/easyGame";
import { TiArrowBack } from "react-icons/ti";
import HardGame from "./hardGame/hardGame";
import MemoryGame from "./memoryGame/memoryGame";
import "./exercise.css";

const Exercise = ({ lecture, setLecture, location }) => {
  const [exercise, setExercise] = useState(1);

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
            <Practice
              lecture={lecture}
              exercise={exercise}
              setExercise={setExercise}
              type="exercise"
            />
          </Route>
          <Route path="/task">
            <Task lecture={lecture} />
          </Route>
          <Route path="/easyGame">
            <EasyGame lecture={lecture} />
          </Route>
          <Route path="/hardGame">
            <HardGame lecture={lecture} />
          </Route>
          <Route path="/memoryGame">
            <MemoryGame lecture={lecture} />
          </Route>
          <Route path="/">
            <Lesson setLecture={setLecture}/>
          </Route> 
        </Switch>
      </div>
    </div>
  );
};

export default Exercise;