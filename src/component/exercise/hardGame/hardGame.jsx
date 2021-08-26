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
  const gameLimit = 5;
  const displayCard = gameLogic.displayCard;

  function nextRound() {
    setState([]);
    const cardLimit = next + 5;
    const totalCards = gameLogic.totalCards(lecture);
    gameLogic.generateCards({ cardLimit, totalCards, setState });
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
    setAnswer(gameLogic.answerQuestionMultLectures({ state, lecture, cardLimit: state.length }));
    setActive(true);
  }

  function handleOnClick(input) {
    if (!active) return;
    setActive(false);
    const { lecture: inputLecture, position } = displayCard(input, lecture);
    new Audio(`files/lecture${inputLecture}/${position}.m4a`).play();
    gameLogic.delay(2000, () => {
      if (input === answer) {
        gameLogic.correct();
        setCorrect((prev) => prev + 1);
        gameLogic.delay(1500, () => {
          const current = [...state];
          current.splice(current.indexOf(input), 1);
          setState(current);
          if (current.length === 1) setNext((prev) => prev + 1);
          else answerQuestion(current);
        });
      } else {
        gameLogic.incorrect();
        setIncorrect((prev) => prev + 1);
        gameLogic.delay(1500, () => {
          const { lecture: answerLecture, position } = displayCard(answer, lecture);
          new Audio(`files/lecture${answerLecture}/${position}.m4a`).play();
          setActive(true);
        });
      }
    });
  }

  return (
    <div className="hard-game">
      <div className="title">Hard Game</div>
      <div className="select">
        {state.map((cur, index) => {
          const { lecture: cardLecture, position } = displayCard(cur, lecture)
          return(
          <div
            key={index}
            className="container"
            onClick={() => handleOnClick(cur)}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(./img/lecture${cardLecture}/${position}.jpg)`,
              }}
            ></div>
            <h5>{lesson[cardLecture - 1].lessons[position - 1]}</h5>
          </div>
        )})}
      </div>
      <div className="hard-game__footer">
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

const mapStateToDispatch = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapStateToDispatch)(HardGame);