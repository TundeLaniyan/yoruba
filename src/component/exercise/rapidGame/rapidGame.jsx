import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import { lesson } from "../../../data.json";
import Sound from "../../../Sound";
import Card from "../../card/card";
import CardText from "../../card/cardText";
import GameFooter from "../../gameFooter/gameFooter";
import TouchPlay from "../../touchPlay/touchPlay";
import Navigation from "../navigation/navigation";
import "./rapidGame.css";

const RapidGame = ({ lecture, setProgress, Game }) => {
  const [state, setState] = useState([]);
  const [answer, setAnswer] = useState();
  const [results, setResults] = useState([]);
  const [next, setNext] = useState(0);
  const [currentRound, setCurrentRound] = useState();
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [percent, setPercent] = useState(100);
  const [intervalID, setIntervalID] = useState(0);
  const [pauseInterval, setPauseInterval] = useState(false);
  const ref = useRef();
  ref.current = { next, state, percent, pauseInterval, cleanUp: intervalID };
  const displayCard = Game.displayCard;
  const isTouchDevice = Game.isTouchDevice();
  const [touchPlay, setTouchPlay] = useState(false);
  const gameLimit = 5;
  const cardLimit = next + 7;

  function nextRound() {
    setState([]);
    const results = [];
    setResults(results);
    setPercent(100);
    setCurrentRound(0);
    const totalLength = Game.totalCards();
    const currentLength = lesson[lecture - 1].words.length;
    const cards = Game.generateCards({ cardLimit, totalLength, currentLength });
    setState(cards);
    answerQuestion(cards, results);
  }

  useEffect(() => () => clearInterval(ref.current.cleanUp), []);

  useEffect(() => {
    if (next < gameLimit) nextRound();
    else {
      const result =
        (100 * correct) / ((2 * cardLimit - gameLimit + 1) * (gameLimit / 2)) +
        incorrect;
      Game.endGame({ result, exercise: "rapidGame", setProgress });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  useEffect(() => {
    clearInterval(intervalID);
    const intervalId = setInterval(() => {
      if (ref.current.pauseInterval) return;
      if (ref.current.percent <= 0) {
        clearInterval(intervalId);
        setNext((prev) => prev + 1);
      } else {
        ref.current.percent -= 5;
        setPercent((prev) => prev - 5);
      }
    }, ((7 + next) * 1750) / 20);
    setIntervalID(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseInterval, next]);

  const handleOnClick = useCallback(
    (input) => {
      if (!active) return;
      const { lecture: inputLecture, exercise } = displayCard(input, lecture);
      Sound.start(`files/lecture${inputLecture}/${exercise}.m4a`);
      setActive(false);
      setPauseInterval(true);
      Game.delay(2500, () => {
        const CORRECT = input === answer;
        if (CORRECT) correctInput(input);
        else incorrectInput(input);
        !isTouchDevice && Game.delay(2500, () => setPauseInterval(false));
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, state, answer]
  );

  function correctInput(input) {
    let result = Game.setResult({ input, state, results, answer: "correct" });
    Game.correct();
    Game.delay(2000, () => {
      // I dont understand this line
      // if (next !== ref.current.next) return;

      isTouchDevice && setTouchPlay(true);
      setCorrect((prev) => prev + 1);
      setCurrentRound(currentRound + 1);
      result = Game.clearIncorrect(result);
      setResults(result);
      const ENDOFROUND = currentRound === cardLimit - 2;
      if (ENDOFROUND) setNext((prev) => prev + 1);
      else answerQuestion(state);
    });
  }

  function incorrectInput(input) {
    setResults(Game.setResult({ input, state, results, answer: "incorrect" }));
    Game.incorrect();
    setIncorrect((prev) => prev + 1);
    Game.delay(1500, () => {
      const curAnswer = displayCard(answer, lecture);
      Sound.start(
        `files/lecture${curAnswer.lecture}/${curAnswer.exercise}.m4a`
      );
      setActive(true);
      isTouchDevice && setPauseInterval(false);
    });
  }

  function answerQuestion(state, result = results) {
    if (isTouchDevice && !touchPlay) return setTouchPlay(true);
    const answer = Game.answerQuestions({ state, results: result });
    setAnswer(answer);
    Game.delay(500, () => setActive(true));
  }

  useEffect(() => {
    setPauseInterval(touchPlay);
  }, [touchPlay]);

  const handleTouchPlay = () => {
    answerQuestion(state);
    setTouchPlay(false);
  };

  return (
    <div className="rapid-game">
      <Navigation challenge="Rapid Game" lecture={lecture} />
      <div className="select">
        {touchPlay ? (
          <TouchPlay round={currentRound} onClick={handleTouchPlay} />
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
                active={active}
                answer={results[index]?.answer}
              />
            ) : (
              <CardText
                key={cur}
                state={cur}
                exercise={cur}
                onClick={handleOnClick}
                active={active}
                answer={results[index]?.answer}
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

export default connect(undefined, mapPropsToDispatch)(RapidGame);
