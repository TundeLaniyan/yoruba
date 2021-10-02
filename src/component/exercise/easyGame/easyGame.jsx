import React, { useCallback, useEffect, useRef, useState } from "react";
import { lesson } from "../../../data.json";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import GameFooter from "../../gameFooter/gameFooter";
import Sound from "../../../Sound";
import Card from "../../card/card";
import Button from "../../button/button";
import Navigation from "../navigation/navigation";
import "./easyGame.css";

const EasyGame = ({ lecture, setProgress, Game }) => {
  const [state, setState] = useState([]);
  const [soundState, setSoundState] = useState();
  const [answer, setAnswer] = useState();
  const [results, setResults] = useState([]);
  const [next, setNext] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [touchPlay, setTouchPlay] = useState(false);
  const [cleanUp, setCleanUp] = useState([]);
  const unMount = useRef();
  unMount.current = cleanUp;
  const gameLimit = 10;
  const gameSpeed = 3500;
  const cardLimit = 4;
  const isTouchDevice = Game.isTouchDevice();

  useEffect(
    () => () => unMount.current.forEach((cur) => clearTimeout(cur)),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => nextResponse(), [next]);

  function answerQuestion(state) {
    const answer = Game.answerQuestion({ state, cardLimit });
    setAnswer(answer);
    setState((prev) => prev.sort(() => (Math.random() > 0.5 ? 1 : -1)));
    setActive(true);
  }

  function nextRound() {
    setState([]);
    setResults([]);
    setTouchPlay(false);
    const totalLength = lesson[lecture - 1].words.length;
    const cards = Game.generateCards({ cardLimit, totalLength });
    setState(cards);
    if (isTouchDevice) setActive(true);
    else {
      const delay = Game.playCards({
        cards,
        cardLimit,
        gameSpeed,
        setSoundState,
        setCleanUp,
        autoPlay: true,
      });
      Game.delay(delay, () => answerQuestion(cards));
    }
  }

  function nextResponse() {
    if (next < gameLimit) nextRound();
    else
      Game.endGame({
        setProgress,
        result: (gameLimit * 100) / (gameLimit + incorrect),
        exercise: "easyGame",
      });
  }

  const handleOnClick = useCallback(
    (input) => {
      if (!active) return;
      Sound.start(`files/lecture${lecture}/${input}.m4a`);
      if (isTouchDevice && !touchPlay) return;
      setActive(false);
      Game.delay(
        gameSpeed,
        () => {
          const CORRECT = input === answer;
          if (CORRECT) {
            setResults(
              Game.setResult({ input, state, results, answer: "correct" })
            );
            Game.correct();
            Game.delay(2000, () => setNext((prev) => prev + 1), setCleanUp);
          } else {
            setResults(
              Game.setResult({ input, state, results, answer: "incorrect" })
            );
            Game.incorrect();
            Game.delay(2000, () => incorrectInput(), setCleanUp);
          }
        },
        setCleanUp
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, touchPlay, answer]
  );

  function incorrectInput() {
    Sound.start(`files/lecture${lecture}/${answer}.m4a`);
    setIncorrect((prev) => prev + 1);
    setActive(true);
  }

  function handleTouchPlay() {
    setTouchPlay(true);
    answerQuestion(state);
  }

  return (
    <div className="easy-game">
      <Navigation challenge="Easy Game" lecture={lecture} />
      <div className="select">
        {state.map((cur, index) => (
          <Card
            key={index}
            state={cur}
            lecture={lecture}
            exercise={cur}
            onClick={handleOnClick}
            brightness={index === soundState ? 2 : 1}
            answer={results[index]?.answer}
          />
        ))}
      </div>
      {!touchPlay && isTouchDevice && (
        <Button
          className="easy-game__button"
          onClick={handleTouchPlay}
          content="Play"
        />
      )}
      <GameFooter
        audio={`files/lecture${lecture}/${answer}.m4a`}
        correct={next}
        incorrect={incorrect}
        active={active}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapDispatchToProps)(EasyGame);
