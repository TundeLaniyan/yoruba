import React, { useEffect, useState } from "react";
import { GiSpeaker } from "react-icons/gi";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import { lesson } from "../../../data.json";
import gameLogic from "../gameLogic";
import "./memoryGame.css";

const MemoryGame = ({ lecture, setProgress }) => {
  const [state, setState] = useState([]);
  const [hidden, setHidden] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [input, setInput] = useState([]);
  const [next, setNext] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [addedTime, setAddedTime] = useState(0);
  const [percent, setPercent] = useState(100);
  const [intervalID, setIntervalID] = useState(0);
  const [pauseInterval, setPauseInterval] = useState(false);
  // const [end, setEnd] = useState(false);
  const max = lesson[lecture - 1].limit.lessons.length;
  const gameLimit = 10;

  function nextRound() {
    setState([]);
    setPercent(100);
    setAddedTime(0);
    const cardLimit = next + 2;
    const cards = gameLogic.generateCards({ cardLimit, max });
    gameLogic.playCards({ cards, cardLimit, gameSpeed: 500, setState });
  }

  useEffect(() => {
    if (next < gameLimit) nextRound();
    else gameLogic.endGame({ 
        result: (200 * (correct - incorrect)) / (next * next + next),
        exercise: "memoryGame",
        lecture,
        setProgress 
      });
  }, [next]);

  useEffect(() => {
    if (state.length === next + 2) {
      next > 4 && answerQuestion(state);
      setAddedTime((prev) => prev + 1);
    }
  }, [state]);

  useEffect(() => {
    if (!addedTime) return;
    clearInterval(intervalID);
    if (pauseInterval) return;
    let runningPercent = percent;
    const increment = next < 5 ? 1200 : 2000;
    const intervalId = setInterval(() => {
      if (runningPercent <= 0) {
        clearInterval(intervalId);
        if (next < 5) {
          setHidden(state);
          answerQuestion(state);
        } else {
          setAnswer((prev) => prev.slice(0, prev.length - 1));
          setNext((prev) => prev + 1);
        }
      } else {
        runningPercent -= 5;
        setPercent((prev) => prev - 5);
      }
    }, (addedTime + 4000 + next * increment) / 20);
    setIntervalID(intervalId);
  }, [addedTime, pauseInterval]);

  useEffect(() => {
    if (!input.length) return;
    setActive(false);
    next > 4 && setPauseInterval(true);
    const index = answer.length - 1;
    if (next < 5) {
      const current = [...hidden];
      const hiddenIndex = current.indexOf(input[index]);
      current[hiddenIndex] = -current[hiddenIndex];
      setHidden(current);
    }
    // setAddedTime((prev) => prev + (200000 / percent));
    new Audio(`files/lecture${lecture}/${input[index]}.m4a`).play();
    setTimeout(() => {
      if (input[index] === answer[index]) {
        setCorrect((prev) => prev + 1);
        const current = [...state];
        current.splice(current.indexOf(input[index]), 1);
        setState(current);
        next < 5 && setHidden(current);
        if (current.length === 1) {
          next < 5 && setHidden([]);
          setNext((prev) => prev + 1);
        } else answerQuestion(current);
      } else {
        new Audio(`files/lecture${lecture}/${answer[index]}.m4a`).play();
        setAnswer((prev) => [...prev, answer[index]]);
        alert("INCORRECT");
        setIncorrect((prev) => prev + 1);
        next < 5 && setHidden(state);
        setActive(true);
      }
      next > 4 && setPauseInterval(false);
    }, [2500]);
  }, [input]);

  const answerQuestion = (state) => {
    const value = Math.floor(Math.random() * state.length);
    setAnswer((prev) => [...prev, state[value]]);
    new Audio(`files/lecture${lecture}/${state[value]}.m4a`).play();
    setActive(true);
  };

  return (
    <div className="memory-game">
      <div className="title">Memory Game</div>
      <div className="select">
        {state.map((cur, index) => (
          <div
            key={index}
            className="container"
            onClick={() => active && setInput((prev) => [...prev, cur])}
            style={hidden[index] ? { backgroundColor: "#bbb7aa35" } : {}}
          >
            <div
              className="img"
              style={
                hidden[index] >= 0
                  ? {}
                  : { backgroundImage: `url(../../img/lecture${lecture}/${cur}.jpg)`,}
              }
            ></div>
            {!(hidden[index] >= 0) && <h5>{lesson[lecture - 1].limit.lessons[cur - 1]}</h5>}
          </div>
        ))}
      </div>
      <div
        className="memory-game__footer"
        style={{
          backgroundImage: `linear-gradient(to right, #b7ab85 ${percent}%, #b7ab8560 ${percent}%)`,
        }}
      >
        <div
          className="score score__play"
          onClick={() =>
            active &&
            new Audio(`files/lecture${lecture}/${answer[answer.length - 1]}.m4a`).play()
          }
        >
          <GiSpeaker />
        </div>
        <div className="score score__correct">{correct}</div>
        <div className="score score__incorrect">{incorrect}</div>
      </div>
    </div>
  );
};

const mapPropsToDispatch = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapPropsToDispatch)(MemoryGame);