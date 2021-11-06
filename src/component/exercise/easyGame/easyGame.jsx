import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { lesson } from "../../../data.json";
import { connect } from "react-redux";
import { setProgress } from "../../../action";
import GameFooter from "../../gameFooter/gameFooter";
import Sound from "../../../Sound";
import Card from "../../card/card";
import CardText from "../../card/cardText";
import CardSentence from '../../card/cardSentence';
import Button from "../../button/button";
import Navigation from "../navigation/navigation";
import "./easyGame.css";

const EasyGame = ({ lecture, setProgress, Game }) => {
  const ACCENT = lecture === 1;
  const SENTENCE = lecture === 13;
  const CurrentCard = ACCENT ? CardText : SENTENCE ? CardSentence : Card;
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
  const gameLimit = ACCENT ? lesson[0].text.length / 3 : 10;
  const gameSpeed = 3500;
  const cardLimit = ACCENT ? 3 : 4;
  const isTouchDevice = Game.isTouchDevice();

  useEffect(
    () => () => unMount.current.forEach((cur) => clearTimeout(cur)),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => nextResponse(), [next]);

  useEffect(() => buttonRef.current?.scrollIntoView({ behaviour: "smooth" }));

  const shuffleCards = (card) =>
    [...card].sort(() => (Math.random() > 0.5 ? 1 : -1));

  async function answerQuestion(state) {
    setState((prevState) => shuffleCards(prevState));
    const answer = await Game.answerQuestion({ state, cardLimit });
    setAnswer(answer);
    setActive(true);
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

  function nextRound() {
    setState([]);
    setResults([]);
    setTouchPlay(false);
    const totalLength = lesson[lecture - 1].text.length;
    const cards = ACCENT
      ? [next * 3 + 1, next * 3 + 3, next * 3 + 2]
      : Game.generateCards({ cardLimit, totalLength });
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
      await Sound.play(`audio/${Game.getWord(lecture, input)}.m4a`);
      if (isTouchDevice && !touchPlay) return;
      setActive(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, touchPlay, answer]
  );

  function incorrectInput() {
    Sound.play(`audio/${Game.getWord(lecture, answer)}.m4a`);
    setIncorrect((prev) => prev + 1);
    setActive(true);
  }

  function handleTouchPlay() {
    setTouchPlay(true);
    answerQuestion(state);
  }

  return (
    <div className={`easy-game ${ACCENT && "easy-game--accent"}`}>
      <Navigation challenge="Easy Game" lecture={lecture} />
      <div className={`select ${ACCENT && "select--accent"}`}>
        {state.map((cur, index) => (
          <CurrentCard
            key={index}
            state={cur}
            lecture={lecture}
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
        audio={`audio/${Game.getWord(lecture, answer)}.m4a`}
        correct={next}
        incorrect={incorrect}
        active={active}
        noText={ACCENT}
        Sound={Sound}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setProgress: (payload) => dispatch(setProgress(payload)),
});

export default connect(undefined, mapDispatchToProps)(EasyGame);
