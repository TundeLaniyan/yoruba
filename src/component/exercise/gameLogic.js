import { lesson } from "../../data.json";
import Sound from "../../Sound";

class GameLogic {
  lecture = 1;
  generateCards = function ({ cardLimit, totalLength, currentLength = 0 }) {
    const cards = new Set();
    let i = 0;
    while (i < cardLimit) {
      let value;
      if ((!totalLength || currentLength) && Math.ceil(Math.random() * 2) === 2)
        value = Math.ceil(Math.random() * currentLength) + totalLength;
      else value = Math.ceil(Math.random() * (totalLength + currentLength));

      if (!cards.has(value)) {
        i++;
        cards.add(value);
      }
    }
    return [...cards];
  };

  playCards = function ({
    cardLimit,
    setSoundState,
    gameSpeed,
    cards,
    autoPlay,
    setCleanUp,
  }) {
    for (let i = 0; i < cardLimit; i++) {
      this.delay(
        gameSpeed * i,
        () => {
          autoPlay &&
            Sound.start(`files/lecture${this.lecture}/${cards[i]}.m4a`);
          setSoundState(i);
        },
        setCleanUp
      );
    }
    return gameSpeed * cardLimit;
    // this.delay(gameSpeed * cardLimit, () => setSoundState(cardLimit));
  };
  endGame = function ({ result, exercise, setProgress }) {
    setProgress({ result, exercise, lecture: this.lecture });
    alert("result: " + result + "%");
  };

  answerQuestion = function ({ state, cardLimit, silent }) {
    const value = Math.floor(Math.random() * cardLimit);
    !silent && Sound.start(`files/lecture${this.lecture}/${state[value]}.m4a`);
    return state[value];
  };
  answerQuestionMultLectures = function ({ state, cardLimit }) {
    const value = Math.floor(Math.random() * cardLimit);
    const { lecture, exercise } = this.displayCard(state[value], this.lecture);
    Sound.start(`files/lecture${lecture}/${exercise}.m4a`);
    return state[value];
  };
  correct = function () {
    Sound.start("files/yes.m4a");
  };
  incorrect = function () {
    Sound.start("files/no.m4a");
  };
  delay = function (timeout, cb, setCleanUp) {
    const timeOut = setTimeout(() => {
      cb();
      setCleanUp &&
        setCleanUp((prev) => {
          const index = prev.indexOf(timeOut);
          index > -1 && prev.splice(index, 1);
          return prev;
        });
    }, timeout);
    setCleanUp && setCleanUp((prev) => [...prev, timeOut]);
  };
  isTouchDevice = () =>
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;
  totalCards = () =>
    lesson
      .slice(0, this.lecture - 1)
      .reduce(
        (total, cur) =>
          (typeof total === "number" ? total : total.words.length) +
          cur.words.length,
        0
      );
  displayCard = function (state, lecture) {
    let runningTotal = state,
      currentLecture,
      exercise,
      accumulation = 0;
    for (let i = 0; i < lecture; i++) {
      const current = lesson[i].words.length;
      if (runningTotal - current <= 0) {
        exercise = state - accumulation;
        currentLecture = i + 1;
        break;
      }
      runningTotal -= current;
      accumulation += current;
    }
    return { exercise, lecture: currentLecture, state };
  };
  setResult = function ({ input, answer, results, state }) {
    const current = [...results];
    const index = state.findIndex((cur) => cur === input);
    current[index] = { input, answer };
    return current;
  };
  clearIncorrect = function (results) {
    const result = results.map((cur) =>
      cur?.answer === "correct" ? cur : { ...cur, answer: "" }
    );
    return result;
  };
  remainingState = function ({ state, results }) {
    return state.filter((cur) => {
      const index = results.findIndex((el) => el?.input === cur);
      return index === -1 || results[index].answer !== "correct";
    });
  };
  answerQuestions = function ({ state, results }) {
    const remainingState = this.remainingState({ state, results });
    return this.answerQuestionMultLectures({
      state: remainingState,
      cardLimit: remainingState.length,
    });
  };
}

export default GameLogic;
