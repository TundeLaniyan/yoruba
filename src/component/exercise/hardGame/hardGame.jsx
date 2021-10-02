import React, { useCallback, useEffect, useState, memo } from "react";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import { lesson } from "../../../data.json";
import Sound from "../../../Sound";
import Card from "../../card/card";
import CardText from "../../card/cardText";
import GameFooter from "../../gameFooter/gameFooter";
import TouchPlay from "../../touchPlay/touchPlay";
import Navigation from "../navigation/navigation";
import "./hardGame.css";

const HardGame = memo(function ({ lecture, setProgress, Game }) {
  const [state, setState] = useState([]);
  const [answer, setAnswer] = useState();
  const [results, setResults] = useState([]);
  const [next, setNext] = useState(0);
  const [currentRound, setCurrentRound] = useState();
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const gameLimit = 5;
  const cardLimit = next + 5;
  const displayCard = Game.displayCard;
  const isTouchDevice = Game.isTouchDevice();
  const [touchPlay, setTouchPlay] = useState(isTouchDevice);

  function nextRound() {
    const results = [];
    setResults(results);
    setCurrentRound(0);
    const totalLength = Game.totalCards();
    const currentLength = lesson[lecture - 1].words.length;
    const cards = Game.generateCards({ cardLimit, totalLength, currentLength });
    setState(cards);
    if (!isTouchDevice) Game.delay(2500, () => answerQuestion(cards, results));
  }

  useEffect(() => {
    if (next < gameLimit) nextRound();
    else
      Game.endGame({
        result: (100 * (correct - incorrect)) / correct,
        exercise: "hardGame",
        setProgress,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  function answerQuestion(state, result = results) {
    if (isTouchDevice && !touchPlay) return setTouchPlay(true);
    const answer = Game.answerQuestions({ state, results: result });
    setAnswer(answer);
    Game.delay(2000, () => setActive(true));
  }

  const handleOnClick = useCallback(
    (input) => {
      if (!active) return;
      setActive(false);
      const curInput = displayCard(input, lecture);
      Sound.start(`files/lecture${curInput.lecture}/${curInput.exercise}.m4a`);
      Game.delay(2000, () => {
        const CORRECT = input === answer;
        if (CORRECT) correctInput(input);
        else incorrectInput(input);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active]
  );

  function correctInput(input) {
    let result = Game.setResult({ input, state, results, answer: "correct" });
    Game.correct();
    setCorrect((prev) => prev + 1);
    Game.delay(1500, () => {
      isTouchDevice && setTouchPlay(true);
      setCurrentRound(currentRound + 1);
      result = Game.clearIncorrect(result);
      setResults(result);
      if (currentRound === cardLimit - 2) setNext((prev) => prev + 1);
      else answerQuestion(state, result);
    });
  }

  function incorrectInput(input) {
    setResults(Game.setResult({ input, state, results, answer: "incorrect" }));
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

  const handleTouchPlay = () => {
    answerQuestion(state);
    setTouchPlay(false);
  };

  return (
    <div className="hard-game">
      <Navigation challenge="Hard Game" lecture={lecture} />
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
                answer={results[index]?.answer}
              />
            ) : (
              <CardText
                key={cur}
                state={cur}
                exercise={cur}
                onClick={handleOnClick}
                answer={results[index]?.answer}
              />
            );
          })
        )}
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
