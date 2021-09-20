import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import { lesson } from "../../../data.json";
import Sound from "../../../Sound";
import Card from "../../card/card";
import CardText from "../../card/cardText";
import GameFooter from "../../gameFooter/gameFooter";
import "./memoryGame.css";

const MemoryGame = ({ lecture, setProgress, Game }) => {
  const [state, setState] = useState([]);
  const [hidden, setHidden] = useState([]);
  const [answer, setAnswer] = useState();
  const [next, setNext] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [percent, setPercent] = useState(100);
  const [intervalID, setIntervalID] = useState(0);
  const [pauseInterval, setPauseInterval] = useState(false);
  const ref = useRef();
  ref.current = { next, state, percent, pauseInterval, cleanUp: intervalID };
  const displayCard = Game.displayCard;
  const memoryGame = next < 5;
  const isTouchDevice = Game.isTouchDevice() && !memoryGame;
  const [touchPlay, setTouchPlay] = useState(false);
  const gameLimit = 10;
  const cardLimit = next + 2;

  function nextRound() {
    setState([]);
    setPercent(100);
    const totalLength = Game.totalCards();
    const currentLength = lesson[lecture - 1].words.length;
    Game.generateCards({ cardLimit, setState, totalLength, currentLength });
  }

  useEffect(() => () => clearInterval(ref.current.cleanUp), []);

  useEffect(() => {
    if (next < gameLimit) nextRound();
    else
      Game.endGame({
        result: (200 * correct) / ((1 + gameLimit) * gameLimit + incorrect * 2),
        exercise: "memoryGame",
        setProgress,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  useEffect(() => {
    if (state.length === cardLimit) {
      !memoryGame && answerQuestion(state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    clearInterval(intervalID);
    const increment = memoryGame ? 1000 : 3000;
    const intervalId = setInterval(() => {
      if (ref.current.pauseInterval) return;
      if (ref.current.percent <= 0) {
        clearInterval(intervalId);
        if (memoryGame) {
          setHidden(ref.current.state);
          answerQuestion(ref.current.state);
        } else {
          setNext((prev) => prev + 1);
        }
      } else {
        ref.current.percent -= 5;
        setPercent((prev) => prev - 5);
      }
    }, ((memoryGame ? 5000 : 12000) + next * increment) / 20);
    setIntervalID(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseInterval, next]);

  const handleOnClick = useCallback(
    (input) => {
      if (!active) return;
      const { lecture: inputLecture, exercise } = displayCard(input, lecture);
      Sound.start(`files/lecture${inputLecture}/${exercise}.m4a`);
      setActive(false);
      if (memoryGame) revealCard(input);
      else setPauseInterval(true);
      Game.delay(2500, () => {
        const CORRECT = input === answer;
        if (CORRECT) correctInput(input);
        else incorrectInput();
        !memoryGame && !isTouchDevice && setPauseInterval(false);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active]
  );

  function revealCard(input) {
    const current = [...hidden];
    const hiddenIndex = current.indexOf(input);
    current[hiddenIndex] = -current[hiddenIndex];
    setHidden(current);
  }

  function correctInput(input) {
    Game.correct();
    Game.delay(2000, () => {
      // I dont understand this line
      if (next !== ref.current.next) return;

      isTouchDevice && setTouchPlay(true);
      setCorrect((prev) => prev + 1);
      const state = updateState(input);
      const ENDOFROUND = state.length === 1;
      if (ENDOFROUND) {
        memoryGame && setHidden([]);
        setNext((prev) => prev + 1);
      } else {
        memoryGame && setHidden(state);
        answerQuestion(state);
      }
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
    memoryGame && setHidden(state);
    Game.delay(1500, () => {
      const curAnswer = displayCard(answer, lecture);
      Sound.start(
        `files/lecture${curAnswer.lecture}/${curAnswer.exercise}.m4a`
      );
      setActive(true);
      !memoryGame && isTouchDevice && setPauseInterval(false);
    });
  }

  function answerQuestion(state) {
    if (isTouchDevice && !touchPlay) return setTouchPlay(true);
    setAnswer(
      Game.answerQuestionMultLectures({ state, cardLimit: state.length })
    );
    Game.delay(2000, () => setActive(true));
  }

  useEffect(() => {
    setPauseInterval(touchPlay);
  }, [touchPlay]);

  const handleTouchPlay = () => {
    answerQuestion(state);
    setTouchPlay(false);
  };

  return (
    <div className="memory-game">
      <div className="title">Memory Game</div>
      <div className="select">
        {touchPlay ? (
          <div className="touch-play" onClick={handleTouchPlay}>
            Play
          </div>
        ) : (
          state.map((cur, index) => {
            const display = displayCard(cur, lecture);
            return display.lecture > 1 ? (
              <Card
                key={cur}
                state={cur}
                lecture={display.lecture}
                exercise={display.exercise}
                onClick={handleOnClick}
                hide={hidden[index]}
              />
            ) : (
              <CardText
                key={cur}
                state={cur}
                exercise={cur}
                onClick={handleOnClick}
                hide={hidden[index]}
              />
            );
          })
        )}
      </div>
      <GameFooter
        percent={percent}
        audio={`files/lecture${displayCard(answer, lecture).lecture}/${
          displayCard(answer, lecture).exercise
        }.m4a`}
        correct={correct}
        incorrect={incorrect}
        active={active}
      />
    </div>
  );
};

const mapPropsToDispatch = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapPropsToDispatch)(MemoryGame);
