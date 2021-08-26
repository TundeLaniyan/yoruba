import React, { useEffect, useState, useRef } from "react";
import { GiSpeaker } from "react-icons/gi";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import { lesson } from "../../../data.json";
import gameLogic from "../gameLogic";
import "./memoryGame.css";

const MemoryGame = ({ lecture, setProgress }) => {
  const [state, setState] = useState([]);
  const [hidden, setHidden] = useState([]);
  const [answer, setAnswer] = useState();
  const [input, setInput] = useState();
  const [next, setNext] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [percent, setPercent] = useState(100);
  const [intervalID, setIntervalID] = useState(0);
  const [pauseInterval, setPauseInterval] = useState(false);
  const ref = useRef();
  ref.current = { next, state, percent, pauseInterval, cleanUp: intervalID };
  const displayCard = gameLogic.displayCard;
  const gameLimit = 10;
  const cardLimit = next + 2;

  function nextRound() {
    setState([]);
    setPercent(100);
    const totalCards = gameLogic.totalCards(lecture);
    gameLogic.generateCards({ cardLimit, totalCards, setState });
  }

  useEffect(() => () => clearInterval(ref.current.cleanUp), [])

  useEffect(() => {
    if (next < gameLimit) nextRound();
    else gameLogic.endGame({ 
        result: (200 * correct) / ((1 + gameLimit) * gameLimit),
        exercise: "memoryGame",
        lecture,
        setProgress 
      });
  }, [next]);

  useEffect(() => {
    if (state.length === cardLimit) {
      next > 4 && answerQuestion(state);
    }
  }, [state]);

  useEffect(() => {
    clearInterval(intervalID);
    const increment = next < 5 ? 1000 : 3000;
    const intervalId = setInterval(() => {
      if (ref.current.pauseInterval) return;
      if (ref.current.percent <= 0) {
        clearInterval(intervalId);
        if (next < 5) {
          setHidden(ref.current.state);
          answerQuestion(ref.current.state);
        } else {
          setNext((prev) => prev + 1);
        }
      } else {
        ref.current.percent -= 5;
        setPercent((prev) => prev - 5);
      }
    }, (12000 + next * increment) / 20);
    setIntervalID(intervalId);
  }, [pauseInterval, next]);

  useEffect(() => {
    if (!input) return;
    setActive(false);
    next > 4 && setPauseInterval(true);
    if (next < 5) {
      const current = [...hidden];
      const hiddenIndex = current.indexOf(input);
      current[hiddenIndex] = -current[hiddenIndex];
      setHidden(current);
    }
    const { lecture: inputLecture, position } = displayCard(input, lecture);
    new Audio(`files/lecture${inputLecture}/${position}.m4a`).play();
    setTimeout(() => {
      if (input === answer) {
        gameLogic.correct();
        gameLogic.delay(2000, () => {
          if (next !== ref.current.next) return;
          setCorrect((prev) => prev + 1);
          const current = [...state];
          current.splice(current.indexOf(input), 1);
          setState(current);
          next < 5 && setHidden(current);
          if (current.length === 1) {
            next < 5 && setHidden([]);
            setNext((prev) => prev + 1);
          } else answerQuestion(current);
        });
      } else {
        gameLogic.incorrect();
        setIncorrect((prev) => prev + 1);
        next < 5 && setHidden(state);
        gameLogic.delay(1500, () => {
          const { lecture: answerLecture, position } = displayCard(answer, lecture);
          new Audio(`files/lecture${answerLecture}/${position}.m4a`).play()
          setActive(true);
        })
      }
      next > 4 && setPauseInterval(false);
    }, [2500]);
  }, [input]);

  const answerQuestion = (state) => {
    setAnswer(gameLogic.answerQuestionMultLectures({ state, lecture, cardLimit: state.length }));
    setActive(true);
  };

  return (
    <div className="memory-game">
      <div className="title">Memory Game</div>
      <div className="select">
        {state.map((cur, index) => {
          const { lecture: cardLecture, position } = displayCard(cur, lecture)
          return (
            <div
              key={index}
              className="container"
              onClick={() => active && setInput(cur)}
              style={hidden[index] ? { backgroundColor: "#bbb7aa35" } : {}}
            >
              <div
                className="img"
                style={
                  hidden[index] >= 0
                    ? {}
                    : { backgroundImage: `url(./img/lecture${cardLecture}/${position}.jpg)`,}
                }
              ></div>
              {!(hidden[index] >= 0) && <h5>{lesson[cardLecture - 1].lessons[position - 1]}</h5>}
            </div>
          )
        })}
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
            new Audio(`files/lecture${displayCard(answer, lecture).lecture}/${displayCard(answer, lecture).position}.m4a`).play()
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