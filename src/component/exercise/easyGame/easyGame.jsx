import React, { useEffect, useRef, useState } from "react";
import { GiSpeaker } from "react-icons/gi";
import { lesson } from "../../../data.json";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import gameLogic from "../gameLogic";
import "./easyGame.css";

const EasyGame = ({ lecture, setProgress }) => {
  const [state, setState] = useState([]);
  const [soundState, setSoundState] = useState();
  const [answer, setAnswer] = useState();
  const [next, setNext] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [touchPlay, setTouchPlay] = useState(false);
  const [cleanUp, setCleanUp] = useState([]);
  const unMount = useRef();
  unMount.current = cleanUp;
  const gameLimit = 10;
  const gameSpeed = 3500;
  const cardLimit = 4;
  const isTouchDevice = gameLogic.isTouchDevice();

  useEffect(() => () => unMount.current.forEach(cur => clearTimeout(cur)), []);
  
  useEffect(() => nextResponse(), [next]);

  useEffect(() => {
    if (soundState === cardLimit || touchPlay) {
      setAnswer(gameLogic.answerQuestion({ state, lecture, cardLimit }));
      setState(prev => prev.sort(() => (Math.random() > .5) ? 1 : -1));
      setActive(true);
    }
  }, [soundState, touchPlay]);

  function nextRound() {
    setState([]);
    setTouchPlay(false);
    const totalCards = lesson[lecture - 1].lessons.length;
    const cards = gameLogic.generateCards({ cardLimit, totalCards, setState });
    if(isTouchDevice) setActive(true);
    else gameLogic.playCards({ cards, cardLimit, gameSpeed, setSoundState, lecture, setCleanUp, autoPlay: true });
  }

  function nextResponse() {
    if (next < gameLimit) nextRound();
    else gameLogic.endGame({ 
      setProgress,
      result: (gameLimit * 100) / (gameLimit + incorrect),
      exercise: "easyGame",
      lecture,
    });
  };

  function handleOnClick(input) {
    if (!active) return;
    new Audio(`files/lecture${lecture}/${input}.m4a`).play();
    if (isTouchDevice && !touchPlay) return;
    setActive(false);
    gameLogic.delay(gameSpeed, () => {
      if (input === answer) {
        gameLogic.correct();
        gameLogic.delay(2000, () => {
          setNext((prev) => prev + 1);
        }, setCleanUp);
      } else {
        gameLogic.incorrect();
        gameLogic.delay(2000, () => {
          new Audio(`files/lecture${lecture}/${answer}.m4a`).play();
          setIncorrect((prev) => prev + 1);
          setActive(true);
        }, setCleanUp);
      }
    }, setCleanUp);
  }

  return (
    <div className="easy-game">
      <div className="title">Easy Game</div>
      {!touchPlay && isTouchDevice && <div className="touch-btn" onClick={() => setTouchPlay(true)}>Play</div>}
      <div className="select">
        {state.map((cur, index) => (
          <div
            key={index}
            className="container"
            style={{ filter: `brightness(${index === soundState ? 2 : 1})`}}
            onClick={() => handleOnClick(cur)}
          >
            <div
              className="img"
              style={{ backgroundImage: `url(./img/lecture${lecture}/${cur}.jpg)` }}
            ></div>
            <h5>{lesson[lecture - 1].lessons[cur - 1]}</h5>
          </div>
        ))}
      </div>
      <div className="easy-game__footer">
        <div
          className="score score__play"
          onClick={() => active && new Audio(`files/lecture${lecture}/${answer}.m4a`).play() }
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