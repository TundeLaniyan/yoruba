import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import GameFooter from "../../gameFooter/gameFooter";
import Sound from "../../../Sound";
import CardText from "../../card/cardText";
import { lesson } from "../../../data.json";
import "./easyGame.css";
import Navigation from "../navigation/navigation";
import Button from "../../button/button";

const EasyGameAccent = ({ lecture, setProgress, Game }) => {
  const [state, setState] = useState([]);
  const [soundState, setSoundState] = useState();
  const [answer, setAnswer] = useState();
  const [results, setResults] = useState([]);
  const [next, setNext] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [touchPlay, setTouchPlay] = useState(false);
  const [cleanUp, setCleanUp] = useState([]);
  const buttonRef = createRef();
  const unMount = useRef();
  unMount.current = cleanUp;
  const gameLimit = lesson[0].words.length / 3;
  const gameSpeed = 3500;
  const cardLimit = 3;
  const isTouchDevice = Game.isTouchDevice();

  useEffect(
    () => () => unMount.current.forEach((cur) => clearTimeout(cur)),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => nextResponse(), [next]);

  async function answerQuestion(state) {
    const answer = await Game.answerQuestion({ state, cardLimit });
    setAnswer(answer);
    setState((prev) => prev.sort(() => (Math.random() > 0.5 ? 1 : -1)));
    setActive(true);
  }

  function nextResponse() {
    if (next < gameLimit) nextRound();
    else
      Game.endGame({
        setProgress,
        result: (gameLimit * 100) / (gameLimit + incorrect),
        exercise: "easyGameAccent",
      });
  }

  function nextRound() {
    setState([]);
    setResults([]);
    setTouchPlay(false);
    const cards = [next * 3 + 1, next * 3 + 2, next * 3 + 3];
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

  const handleOnClick = useCallback(
    async (input) => {
      if (!active) return;
      await Sound.play(`files/lecture${lecture}/${input}.m4a`);
      if (isTouchDevice && !touchPlay) return;
      setActive(false);
      Game.delay(
        gameSpeed,
        async () => {
          const CORRECT = input === answer;
          if (CORRECT) {
            setResults(
              Game.setResult({ input, state, results, answer: "correct" })
            );
            await Game.correct();
            setNext((prev) => prev + 1);
          } else {
            setResults(
              Game.setResult({ input, state, results, answer: "incorrect" })
            );
            await Game.incorrect();
            incorrectInput();
          }
        },
        setCleanUp
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, touchPlay, answer]
  );

  function incorrectInput() {
    Sound.play(`files/lecture${lecture}/${answer}.m4a`);
    setIncorrect((prev) => prev + 1);
    setActive(true);
  }

  function handleTouchPlay() {
    setTouchPlay(true);
    answerQuestion(state);
  }

  return (
    <div className="easy-game easy-game--accent">
      <Navigation challenge="Easy Game" lecture={lecture} />
      <div className="select select--accent">
        {state.map((cur, index) => (
          <CardText
            key={cur}
            state={cur}
            exercise={cur}
            onClick={handleOnClick}
            brightness={index === soundState ? 2 : 1}
            answer={results[index]?.answer}
            active={active}
          />
        ))}
      </div>
      {!touchPlay && isTouchDevice && (
        <Button
          className="easy-game__button"
          onClick={handleTouchPlay}
          ref={buttonRef}
          content="Play"
        />
      )}
      <div style={{ marginBottom: "9rem" }} />
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
