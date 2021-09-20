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
    const totalLength = Game.totalCards();
    const currentLength = lesson[lecture - 1].words.length;
    Game.generateCards({ cardLimit, totalLength, setState, currentLength });
  }

  useEffect(() => {
    if (next < gameLimit) {
      nextRound();
    } else {
      Game.endGame({
        result: (100 * (correct - incorrect)) / correct,
        exercise: "hardGame",
        setProgress,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  useEffect(() => {
    if (state.length === next + 5)
      setTimeout(() => answerQuestion(state), 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function answerQuestion(state) {
    setAnswer(
      Game.answerQuestionMultLectures({ state, cardLimit: state.length })
    );
    Game.delay(2000, () => setActive(true));
  }

  const handleOnClick = useCallback(
    (input) => {
      if (!active) return;
      setActive(false);
      const curInput = displayCard(input, lecture);
      Sound.start(`files/lecture${curInput.lecture}/${curInput.exercise}.m4a`);
      Game.delay(2000, () => {
        const correct = input === answer;
        if (correct) correctInput(input);
        else incorrectInput();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active]
  );

  function correctInput(input) {
    Game.correct();
    setCorrect((prev) => prev + 1);
    Game.delay(1500, () => {
      const state = updateState(input);
      if (state.length === 1) setNext((prev) => prev + 1);
      else answerQuestion(state);
    });
  }

  function updateState(input) {
    const current = [...state];
    current.splice(current.indexOf(input), 1);
    setState(current);
    return current;
  }

  function incorrectInput() {
    Game.incorrect();
    setIncorrect((prev) => prev + 1);
    Game.delay(1500, () => {
      const currentAnswer = displayCard(answer, lecture);
      Sound.start(
        `files/lecture${currentAnswer.lecture}/${currentAnswer.exercise}.m4a`
      );
      setActive(true);
    });
  }

  return (
    <div className="hard-game">
      <div className="title">Hard Game</div>
      <div className="select">
        {state.map((cur) => {
          const display = displayCard(cur, lecture);
          return display.lecture > 1 ? (
            <Card
              key={cur}
              state={cur}
              lecture={display.lecture}
              exercise={display.exercise}
              onClick={handleOnClick}
            />
          ) : (
            <CardText
              key={cur}
              state={cur}
              exercise={cur}
              onClick={handleOnClick}
            />
          );
        })}
      </div>
      <GameFooter
        audio={`files/lecture${displayCard(answer, lecture).lecture}/${
          displayCard(answer, lecture).exercise
        }.m4a`}
        correct={correct}
        incorrect={incorrect}
        active={active}
      />
    </div>
  );
});

const mapStateToDispatch = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapStateToDispatch)(HardGame);
