import React, { useCallback, useEffect, useState, memo } from "react";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import { lesson } from "../../../data.json";
import Sound from "../../../Sound";
import Card from "../../card/card";
import CardText from "../../card/cardText";
import GameFooter from "../../gameFooter/gameFooter";
import "./hardGame.css";

const HardGame = memo(function ({ lecture, setProgress, Game }) {
  const [state, setState] = useState([]);
  const [answer, setAnswer] = useState();
  const [next, setNext] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const gameLimit = 5;
  const displayCard = Game.displayCard;

  function nextRound() {
    setState([]);
    const cardLimit = next + 5;
    const totalCards = Game.totalCards();
    const lastLectureLength = lesson[lecture - 1].lessons.length;
    Game.generateCards({ cardLimit, totalCards, setState, lastLectureLength });
  }

  useEffect(() => {
    if (next < gameLimit) {
      nextRound()
    } else {
      Game.endGame({ 
        result: (100 * (correct - incorrect)) / correct, 
        exercise: "hardGame", 
        setProgress 
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  useEffect(() => {
    if (state.length === next + 5) {
      setTimeout(() => { answerQuestion(state) }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  
  function answerQuestion(state) {
    setAnswer(Game.answerQuestionMultLectures({ state, cardLimit: state.length }));
    Game.delay(2000, () => setActive(true));
  }

  const handleOnClick = useCallback((input) => {
    setActive(false);
    const { lecture: inputLecture, position } = displayCard(input, lecture);
    Sound.start(`files/lecture${inputLecture}/${position}.m4a`);
    Game.delay(2000, () => {
      if (input === answer) {
        Game.correct();
        setCorrect((prev) => prev + 1);
        Game.delay(1500, () => {
          const current = [...state];
          current.splice(current.indexOf(input), 1);
          setState(current);
          if (current.length === 1) setNext((prev) => prev + 1);
          else answerQuestion(current);
        });
      } else {
        Game.incorrect();
        setIncorrect((prev) => prev + 1);
        Game.delay(1500, () => {
          const { lecture: answerLecture, position } = displayCard(answer, lecture);
          Sound.start(`files/lecture${answerLecture}/${position}.m4a`);
          setActive(true);
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return (
    <div className="hard-game">
      <div className="title">Hard Game</div>
      <div className="select">
        {state.map((cur) => {
          const { lecture: cardLecture, position } = displayCard(cur, lecture)
          return cardLecture > 1 ? <Card  
            key={cur} 
            state={cur} 
            lecture={cardLecture}
            exercise={position} 
            onClick={handleOnClick} 
          /> : <CardText
            key={cur} 
            state={cur} 
            exercise={cur} 
            onClick={handleOnClick}
          /> 
        })}
      </div>
      <GameFooter 
        audio={`files/lecture${displayCard(answer, lecture).lecture}/${displayCard(answer, lecture).position}.m4a`} 
        correct={correct} 
        incorrect={incorrect} 
        active={active} />
    </div>
  );
});

const mapStateToDispatch = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapStateToDispatch)(HardGame);