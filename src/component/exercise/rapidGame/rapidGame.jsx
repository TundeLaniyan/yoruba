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
  const [activeAnswer, setActiveAnswer] = useState(true);
  const [results, setResults] = useState([]);
  const [next, setNext] = useState(0);
  const [currentRound, setCurrentRound] = useState();
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [percent, setPercent] = useState(100);
  const [intervalID, setIntervalID] = useState(0);
  const [pauseInterval, setPauseInterval] = useState(false);
  const selectRef = useRef();
  const ref = useRef();
  ref.current = { next, state, percent, pauseInterval, cleanUp: intervalID };
  const displayCard = Game.displayCard;
  const isTouchDevice = Game.isTouchDevice();
  const [touchPlay, setTouchPlay] = useState(false);
  const gameLimit = 5;
  const cardLimit = next + 7;

  async function nextRound() {
    setState([]);
    const results = [];
    setResults(results);
    setPercent(100);
    setCurrentRound(0);
    const totalLength = Game.totalCards();
    const currentLength = lesson[lecture - 1].text.length;
    const cards = Game.generateCards({ cardLimit, totalLength, currentLength });
    setState(cards);
    !isTouchDevice && setPauseInterval(true);
    await answerQuestion(cards, results);
    !isTouchDevice && setPauseInterval(false);
  }

  useEffect(() => () => clearInterval(ref.current.cleanUp), []);

  useEffect(
    () => selectRef.current.scrollIntoView({ behavior: "smooth" }),
    [touchPlay]
  );

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
    }, ((7 + next) * 1000) / 20);
    setIntervalID(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseInterval, next]);

  const handleOnClick = useCallback(
    async (input) => {
      if (!active) return;
      setActive(false);
      setPauseInterval(true);
      await Sound.play(`audio/${Game.getWordMult(input, lecture)}.m4a`);
      const CORRECT = input === answer;
      if (CORRECT) await correctInput(input);
      else await incorrectInput(input);
      !isTouchDevice && setPauseInterval(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, state, answer, touchPlay, pauseInterval]
  );

  async function correctInput(input) {
    let result = Game.setResult({ input, state, results, answer: "correct" });
    await Game.correct();
    setCorrect((prev) => prev + 1);
    setCurrentRound(currentRound + 1);
    result = Game.clearIncorrect(result);
    setResults(result);
    const ENDOFROUND = currentRound === cardLimit - 2;
    if (ENDOFROUND) setNext((prev) => prev + 1);
    else await answerQuestion(state, result);
  }

  async function incorrectInput(input) {
    setResults(Game.setResult({ input, state, results, answer: "incorrect" }));
    await Game.incorrect();
    setIncorrect((prev) => prev + 1);
    await Sound.play(`audio/${Game.getWordMult(answer, lecture)}.m4a`);
    setActive(true);
    isTouchDevice && setPauseInterval(false);
  }

  async function answerQuestion(state, result = results) {
    if (isTouchDevice && !touchPlay) return setTouchPlay(true);
    const answer = await Game.answerQuestions({ state, results: result });
    setAnswer(answer);
    setActive(true);
  }

  useEffect(() => {
    isTouchDevice && setPauseInterval(touchPlay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchPlay]);

  const handleTouchPlay = async () => {
    if (!activeAnswer) return;
    setActiveAnswer(false);
    await answerQuestion(state);
    setTouchPlay(false);
    setActiveAnswer(true);
  };

  return (
    <div className="rapid-game">
      <Navigation challenge="Rapid Game" lecture={lecture} />
      <div className="select" ref={selectRef}>
        {touchPlay ? (
          <TouchPlay
            round={currentRound}
            onClick={handleTouchPlay}
            Sound={Sound}
          />
        ) : (
          state.map((cur, index) => {
            const display = displayCard(cur, lecture);
            const CurrentCard = display.lecture > 1 ? Card : CardText;
            return (
              <CurrentCard
                key={cur}
                state={cur}
                lecture={display.lecture}
                exercise={display.exercise}
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
        audio={`audio/${Game.getWordMult(answer, lecture)}.m4a`}
        correct={correct}
        incorrect={incorrect}
        active={active}
        Sound={Sound}
      />
    </div>
  );
};

const mapPropsToDispatch = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapPropsToDispatch)(RapidGame);
