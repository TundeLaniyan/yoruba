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
    setAnswer("");
    const cardLimit = 6;
    const totalCards = lesson[lecture - 1].lessons.length;
    Game.generateCards({ cardLimit, totalCards, setState });
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
    setAnswer(
      Game.answerQuestion({ state, cardLimit: state.length, silent: true })
    );
    Game.delay(2000, () => setActive(true));
  }

  const handleOnClick = useCallback(
    (input) => {
      setActive(false);
      Sound.start(`files/lecture${lecture}/${input}.m4a`);
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
            setActive(true);
          });
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [active]
  );
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
