import React from "react";
import Practice from "../component/exercise/practice/practice";
import { Link, Route, Switch } from "react-router-dom";
import Lesson from "../component/exercise/lesson/lesson";
import Task from "../component/exercise/task/task";
import EasyGame from "../component/exercise/easyGame/easyGame";
import EasyGameAccent from "../component/exercise/easyGame/easyGameAccent";
import { TiArrowBack } from "react-icons/ti";
import HardGame from "../component/exercise/hardGame/hardGame";
import MemoryGame from "../component/exercise/memoryGame/memoryGame";
import Reading from "../component/exercise/reading/reading";
import RapidGame from "../component/exercise/rapidGame/rapidGame";
import Home from "../component/home/home";
import "./pages.css";

const Pages = ({ lecture, setLecture, location, Game, handleRestart }) => {
  return (
    <div className="exercise__container">
      <div className="exercise">
        {/* {location.pathname !== "/" && (
          <Link
            to={`/${location.pathname === "/task" ? "" : "task"}`}
            className="return"
          >
            <TiArrowBack />
          </Link>
        )} */}
        <Route exact path="/">
          {/* <div className="reset" onClick={handleRestart}>
            Reset
          </div> */}
        </Route>
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
            <Task lecture={lecture} Game={Game} location={location} />
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
          <Route path="/rapidGame">
            <RapidGame lecture={lecture} Game={Game} />
          </Route>
          {/* <Route path="/lesson">
            <Lesson setLecture={setLecture} lecture={lecture} />
          </Route> */}
          <Route path="/">
            <Home setLecture={setLecture} lecture={lecture} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Pages;
