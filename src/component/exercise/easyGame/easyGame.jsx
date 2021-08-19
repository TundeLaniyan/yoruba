import React, { useEffect, useState } from "react";
import { GiSpeaker } from "react-icons/gi";
import { lesson } from "../../../data.json";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import gameLogic from "../gameLogic";
import "./easyGame.css";

const EasyGame = ({ lecture, setProgress }) => {
  const [state, setState] = useState([]);
  const [answer, setAnswer] = useState();
  const [next, setNext] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const max = lesson[lecture - 1].limit.lessons.length;
  const gameLimit = 10;
  const gameSpeed = 3500;
  const cardLimit = 4;

  function nextRound() {
    setState([]);
    const cards = gameLogic.generateCards({ cardLimit, max });
    gameLogic.playCards({ cards, cardLimit, gameSpeed, setState, lecture, autoPlay: true });
  }

  useEffect(() => {
    if (next < gameLimit) nextRound();
    else gameLogic.endGame({ 
      setProgress,
      result: (gameLimit * 100) / (gameLimit + incorrect),
      exercise: "easyGame",
      lecture,
    });
  }, [next]);

  useEffect(() => {
    if (state.length === cardLimit) {
      setTimeout(() => { 
        setAnswer(gameLogic.answerQuestion({ state, lecture, cardLimit }));
        setActive(true);
      }, gameSpeed);
    }
  }, [state]);

  function handleOnClick(input) {
    if (!active) return;
    setActive(false);
    new Audio(`files/lecture${lecture}/${input}.m4a`).play();
    setTimeout(() => {
      if (input === answer) {
        gameLogic.correct();
        setNext((prev) => prev + 1);
      } else {
        new Audio(`files/lecture${lecture}/${answer}.m4a`).play();
        gameLogic.incorrect();
        setIncorrect((prev) => prev + 1);
        setActive(true);
      }
    }, [gameSpeed]);
  }

  return (
    <div className="easy-game">
      <div className="title">Easy Game</div>
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
                backgroundImage: `url(../../img/lecture${
                  lecture
                }/${cur}.jpg)`,
              }}
            ></div>
            <h5>{lesson[lecture - 1].limit.lessons[cur - 1]}</h5>
          </div>
        ))}
      </div>
      <div className="easy-game__footer">
        <div
          className="score score__play"
          onClick={() =>
            active &&
            new Audio(`files/lecture${lecture}/${answer}.m4a`).play()
          }
        >
          <GiSpeaker />
        </div>
        <div className="score score__correct">{next}</div>
        <div className="score score__incorrect">{incorrect}</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapDispatchToProps)(EasyGame);