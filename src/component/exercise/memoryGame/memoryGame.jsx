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
import "./memoryGame.css";

const MemoryGame = ({ lecture, setProgress, Game }) => {
  const [state, setState] = useState([]);
  const [hidden, setHidden] = useState([]);
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
  const gameLimit = 6;
  const cardLimit = next + 2;

  function nextRound() {
    setResults([]);
    setPercent(100);
    setCurrentRound(0);
    const totalLength = Game.totalCards();
    const currentLength = lesson[lecture - 1].text.length;
    const cards = Game.generateCards({ cardLimit, totalLength, currentLength });
    setState(cards);
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
    clearInterval(intervalID);
    const increment = 1000;
    const intervalId = setInterval(() => {
      if (ref.current.pauseInterval) return;
      if (ref.current.percent <= 0) {
        clearInterval(intervalId);
        setHidden(ref.current.state);
        answerQuestion(ref.current.state);
      } else {
        ref.current.percent -= 5;
        setPercent((prev) => prev - 5);
      }
    }, (5000 + next * increment) / 20);
    setIntervalID(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseInterval, next]);

  const handleOnClick = useCallback(
    async (input) => {
      if (!active) return;
      setActive(false);
      revealCard(input);
      await Sound.play(`audio/${Game.getWordMult(input, lecture)}.m4a`);
      const CORRECT = input === answer;
      if (CORRECT) correctInput(input);
      else incorrectInput(input);
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

  async function correctInput(input) {
    let result = Game.setResult({ input, state, results, answer: "correct" });
    await Game.correct();
    setCorrect((prev) => prev + 1);
    setCurrentRound(currentRound + 1);
    result = Game.clearIncorrect(result);
    setResults(result);
    const ENDOFROUND = currentRound === cardLimit - 2;
    if (ENDOFROUND) {
      setHidden([]);
      setNext((prev) => prev + 1);
    } else {
      // isTouchDevice && setTouchPlay(true);
      setHidden(state);
      answerQuestion(state, result);
    }
  }

  async function incorrectInput(input) {
    setResults(Game.setResult({ input, state, results, answer: "incorrect" }));
    await Game.incorrect();
    setIncorrect((prev) => prev + 1);
    setHidden(state);
    await Sound.play(`audio/${Game.getWordMult(answer, lecture)}.m4a`);
    setActive(true);
  }

  async function answerQuestion(state, result = results) {
    if (isTouchDevice && !touchPlay) return setTouchPlay(true);
    const answer = await Game.answerQuestions({ state, results: result });
    setAnswer(answer);
    setActive(true);
  }

  useEffect(() => {
    percent > 0 && setPauseInterval(touchPlay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchPlay]);

  const handleTouchPlay = () => {
    answerQuestion(state);
    setTouchPlay(false);
  };

  return (
    <div className="memory-game">
      <Navigation challenge="Memory Game" lecture={lecture} />
      <div className="select">
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
                hide={hidden[index]}
                answer={results[index]?.answer}
                active={active}
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

export default connect(undefined, mapPropsToDispatch)(MemoryGame);
