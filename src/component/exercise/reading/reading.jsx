import React, { useCallback, useEffect, useState, memo } from "react";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import { lesson } from "../../../data.json";
import Sound from "../../../Sound";
import Card from "../../card/card";
import GameFooter from "../../gameFooter/gameFooter";
import "./reading.css";

const Reading = memo(function ({ lecture, setProgress, Game }) {
  const [state, setState] = useState([]);
  const [answer, setAnswer] = useState();
  const [next, setNext] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const gameLimit = 4;

  function nextRound() {
    setState([]);
    setAnswer();
    const cardLimit = 6;
    const totalLength = lesson[lecture - 1].words.length;
    Game.generateCards({ cardLimit, totalLength, setState });
  }

  useEffect(() => {
    if (next < gameLimit) {
      nextRound();
    } else {
      Game.endGame({
        result: (100 * (correct - incorrect)) / correct,
        exercise: "reading",
        setProgress,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  useEffect(() => {
    if (state.length === 6) {
      setTimeout(() => {
        answerQuestion(state);
      }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function answerQuestion(state) {
    const cardLimit = state.length;
    const answer = Game.answerQuestion({ state, cardLimit, silent: true });
    setAnswer(answer);
    Game.delay(2000, () => setActive(true));
  }

  const handleOnClick = useCallback(
    (input) => {
      if (!active) return;
      setActive(false);
      Sound.start(`files/lecture${lecture}/${input}.m4a`);
      Game.delay(2000, () => {
        const CORRECT = input === answer;
        if (CORRECT) correctInput(input);
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
    Game.delay(1500, () => setActive(true));
  }

  return (
    <div className="hard-game">
      <div className="title">Reading</div>
      <div className="text-block">
        {answer ? lesson[lecture - 1].language[answer - 1] : "?"}
      </div>
      <div className="select">
        {state.map((cur) => (
          <Card
            key={cur}
            state={cur}
            lecture={lecture}
            exercise={cur}
            onClick={handleOnClick}
          />
        ))}
      </div>
      <GameFooter correct={correct} incorrect={incorrect} active={active} />
    </div>
  );
});

const mapStateToDispatch = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapStateToDispatch)(Reading);
