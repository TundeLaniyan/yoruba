import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import GameFooter from "../../gameFooter/gameFooter";
import Sound from "../../../Sound";
import CardText from "../../card/cardText";
import { lesson } from "../../../data.json";
import "./easyGame.css";

const EasyGameAccent = ({ lecture, setProgress, Game }) => {
  const [state, setState] = useState([]);
  const [soundState, setSoundState] = useState();
  const [answer, setAnswer] = useState();
  const [next, setNext] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [touchPlay, setTouchPlay] = useState(false);
  const [cleanUp, setCleanUp] = useState([]);
  const unMount = useRef();
  unMount.current = cleanUp;
  const gameLimit = lesson[0].lessons.length / 3;
  const gameSpeed = 3500;
  const cardLimit = 3;
  const isTouchDevice = Game.isTouchDevice();

  useEffect(
    () => () => unMount.current.forEach((cur) => clearTimeout(cur)),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => nextResponse(), [next]);

  useEffect(() => {
    if (soundState === cardLimit || touchPlay) {
      const ans = Game.answerQuestion({ state, cardLimit });
      setAnswer(ans);
      setState((prev) => prev.sort(() => (Math.random() > 0.5 ? 1 : -1)));
      setActive(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundState, touchPlay]);

  function nextRound() {
    setState([]);
    setTouchPlay(false);
    const cards = [next * 3 + 1, next * 3 + 2, next * 3 + 3];
    setState(cards);
    if (isTouchDevice) setActive(true);
    else
      Game.playCards({
        cards,
        cardLimit,
        gameSpeed,
        setSoundState,
        setCleanUp,
        autoPlay: true,
      });
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
          if (input === answer) {
            Game.correct();
            Game.delay(
              2000,
              () => {
                setNext((prev) => prev + 1);
              },
              setCleanUp
            );
          } else {
            Game.incorrect();
            Game.delay(
              2000,
              () => {
                Sound.start(`files/lecture${lecture}/${answer}.m4a`);
                setIncorrect((prev) => prev + 1);
                setActive(true);
              },
              setCleanUp
            );
          }
        },
        setCleanUp
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, touchPlay, answer]
  );

  return (
    <div className="easy-game">
      <div className="title">Easy Game</div>
      {!touchPlay && isTouchDevice && (
        <div className="touch-btn" onClick={() => setTouchPlay(true)}>
          Play
        </div>
      )}
      <div className="select">
        {state.map((cur, index) => (
          <CardText
            key={cur}
            state={cur}
            exercise={cur}
            onClick={handleOnClick}
            brightness={index === soundState ? 2 : 1}
          />
        ))}
      </div>
      <GameFooter
        audio={`files/lecture1/${answer}.m4a`}
        correct={next}
        incorrect={incorrect}
        active={active}
        noText={true}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapDispatchToProps)(EasyGameAccent);
