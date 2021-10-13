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
    const currentLength = lesson[lecture - 1].text.length;
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

  async function answerQuestion(state, result = results) {
    if (isTouchDevice && !touchPlay) return setTouchPlay(true);
    const answer = await Game.answerQuestions({ state, results: result });
    setAnswer(answer);
    setActive(true);
  }

  const handleOnClick = useCallback(
    async (input) => {
      if (!active) return;
      setActive(false);
      await Sound.play(`audio/${Game.getWordMult(input, lecture)}.m4a`);
      const CORRECT = input === answer;
      if (CORRECT) correctInput(input);
      else incorrectInput(input);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active]
  );

  async function correctInput(input) {
    let result = Game.setResult({ input, state, results, answer: "correct" });
    await Game.correct();
    setCorrect((prev) => prev + 1);
    isTouchDevice && setTouchPlay(true);
    setCurrentRound(currentRound + 1);
    result = Game.clearIncorrect(result);
    setResults(result);
    if (currentRound === cardLimit - 2) setNext((prev) => prev + 1);
    else answerQuestion(state, result);
  }

  async function incorrectInput(input) {
    setResults(Game.setResult({ input, state, results, answer: "incorrect" }));
    await Game.incorrect();
    setIncorrect((prev) => prev + 1);
    await Sound.play(`audio/${Game.getWordMult(answer, lecture)}.m4a`);
    setActive(true);
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
                answer={results[index]?.answer}
                active={active}
              />
            );
          })
        )}
      </div>
      <GameFooter
        audio={`audio/${Game.getWordMult(answer, lecture)}.m4a`}
        correct={correct}
        incorrect={incorrect}
        active={active}
        Sound={Sound}
      />
    </div>
  );
});

const mapStateToDispatch = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapStateToDispatch)(HardGame);
