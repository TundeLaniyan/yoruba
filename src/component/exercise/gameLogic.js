import { NATIVELANGUAGE, TARGETLANGUAGE } from "../../constant";
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
            Sound.start(`audio/${this.getWord(this.lecture, cards[i])}.m4a`);
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

  answerQuestion = async function ({ state, cardLimit, silent }) {
    const value = Math.floor(Math.random() * cardLimit);
    !silent &&
      (await Sound.play(
        `audio/${this.getWord(this.lecture, state[value])}.m4a`
      ));
    return state[value];
  };
  answerQuestionMultLectures = async function ({ state, cardLimit }) {
    const value = Math.floor(Math.random() * cardLimit);
    const { lecture, exercise } = this.displayCard(state[value], this.lecture);
    await Sound.play(`audio/${this.getWord(lecture, exercise)}.m4a`);
    return state[value];
  };
  correct = async () => await Sound.play("audio/yes.m4a");
  incorrect = async () => await Sound.play("audio/no.m4a");
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
          (typeof total === "number" ? total : total.text.length) +
          cur.text.length,
        0
      );
  displayCard = function (state, lecture) {
    let runningTotal = state,
      currentLecture,
      exercise,
      accumulation = 0;
    for (let i = 0; i < lecture; i++) {
      const current = lesson[i].text.length;
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
  answerQuestions = async function ({ state, results }) {
    const remainingState = this.remainingState({ state, results });
    return await this.answerQuestionMultLectures({
      state: remainingState,
      cardLimit: remainingState.length,
    });
  };
  getWord = (lecture, exercise) => {
    if (!lecture || !exercise) return "";
    return lesson[lecture - 1].text[exercise - 1][NATIVELANGUAGE].replace(
      /[()\s?]+/g,
      (s) => (s === " " ? "-" : s === "?" ? "" : "+")
    );
  };
  getWordMult = (state, currentLecture) => {
    if (!state || !currentLecture) return "";
    const { lecture, exercise } = this.displayCard(state, currentLecture);
    return this.getWord(lecture, exercise);
  };
  translate = (translate) => {
    if (!translate) return "";
    let text = "",
      currentLesson;
    loop: for (let i = 0; i < lesson.length; i++) {
      for (let k = 0; k < lesson[i].text.length; k++) {
        if (
          translate.toLowerCase() ===
          lesson[i].text[k][NATIVELANGUAGE].toLowerCase()
        ) {
          text = lesson[i].text[k][TARGETLANGUAGE];
          currentLesson = i + 1;
          break loop;
        }
      }
    }
    return { text, lesson: currentLesson };
  };
}

export default GameLogic;
