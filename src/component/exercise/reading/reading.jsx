import React, { useCallback, useEffect, useState, memo } from "react";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import { lesson } from "../../../data.json";
import Sound from "../../../Sound";
import Card from "../../card/card";
import GameFooter from "../../gameFooter/gameFooter";
import Navigation from "../navigation/navigation";
import "./reading.css";

const Reading = memo(function ({ lecture, setProgress, Game }) {
  const [state, setState] = useState([]);
  const [answer, setAnswer] = useState();
  const [results, setResults] = useState([]);
  const [next, setNext] = useState(0);
  const [currentRound, setCurrentRound] = useState();
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const gameLimit = 4;
  const cardLimit = 6;

  function nextRound() {
    const results = [];
    setResults(results);
    setCurrentRound(0);
    setAnswer();
    const totalLength = lesson[lecture - 1].words.length;
    const cards = Game.generateCards({ cardLimit, totalLength });
    setState(cards);
    Game.delay(2500, () => answerQuestion(cards, results));
  }

  useEffect(() => {
    if (next < gameLimit) nextRound();
    else
      Game.endGame({
        result: (100 * (correct - incorrect)) / correct,
        exercise: "reading",
        setProgress,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  async function answerQuestion(state, result = results) {
    const remainingState = state.filter((cur) => {
      const index = result.findIndex((el) => el?.input === cur);
      return index === -1 || result[index].answer !== "correct";
    });

    const answer = await Game.answerQuestion({
      state: remainingState,
      cardLimit: remainingState.length,
      silent: true,
    });
    setAnswer(answer);
    setActive(true);
  }

  const handleOnClick = useCallback(
    async (input) => {
      if (!active) return;
      setActive(false);
      await Sound.play(`files/lecture${lecture}/${input}.m4a`);
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
    setActive(true);
  }

  return (
    <div className="reading">
      <Navigation challenge="Reading" lecture={lecture} />
      <div className="text-block">
        {answer ? lesson[lecture - 1].language[answer - 1] : "?"}
      </div>
      <div className="select">
        {state.map((cur, index) => (
          <Card
            key={cur}
            state={cur}
            lecture={lecture}
            exercise={cur}
            onClick={handleOnClick}
            answer={results[index]?.answer}
            active={active}
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
