import React, { useEffect, useState } from "react";
import { GiSpeaker } from "react-icons/gi";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import { lesson } from "../../../data.json";
import gameLogic from "../gameLogic";
import "./hardGame.css";

const HardGame = ({ lecture, setProgress }) => {
  const [state, setState] = useState([]);
  const [answer, setAnswer] = useState();
  const [next, setNext] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const max = lesson[lecture - 1].limit.lessons.length;
  const gameLimit = 5;

  function nextRound() {
    setState([]);
    const cardLimit = next + 5;
    const cards = gameLogic.generateCards({ cardLimit, max });
    gameLogic.playCards({ cards, cardLimit, gameSpeed: 500, setState });
  }

  useEffect(() => {
    if (next < gameLimit) {
      nextRound()
    } else {
      gameLogic.endGame({ 
        result: (100 * (correct - incorrect)) / correct, 
        exercise: "hardGame", 
        lecture, 
        setProgress 
      })
    }
  }, [next]);

  useEffect(() => {
    if (state.length === next + 5) {
      setTimeout(() => { answerQuestion(state) }, 2500);
    }
  }, [state]);
  
  function answerQuestion(state) {
    setAnswer(gameLogic.answerQuestion({ state, lecture, cardLimit: state.length }));
    setActive(true);
  }

  function handleOnClick(input) {
    if (!active) return;
    setActive(false);
    new Audio(`files/lecture${lecture}/${input}.m4a`).play();
    setTimeout(() => {
      if (input === answer) {
        setCorrect((prev) => prev + 1);
        gameLogic.correct();
        const current = [...state];
        current.splice(current.indexOf(input), 1);
        setState(current);
        if (current.length === 1) setNext((prev) => prev + 1);
        else answerQuestion(current);
      } else {
        new Audio(`files/lecture${lecture}/${answer}.m4a`).play();
        gameLogic.incorrect();
        setIncorrect((prev) => prev + 1);
        setActive(true);
      }
    }, [2500]);
  }

  return (
    <div className="hard-game">
      <div className="title">Hard Game</div>
      <div className="select">
        {state.map((cur, index) => (
          <div
            key={index}
            className="container"
            onClick={() => handleOnClick(cur)}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(../../img/lecture${lecture}/${cur}.jpg)`,
              }}
            ></div>
            <h5>{lesson[lecture - 1].limit.lessons[cur - 1]}</h5>
          </div>
        ))}
      </div>
      <div className="hard-game__footer">
        <div
          className="score score__play"
          onClick={() =>
            active &&
            new Audio(`files/lecture${lecture}/${answer}.m4a`).play()
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

const mapStateToDispatch = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapStateToDispatch)(HardGame);