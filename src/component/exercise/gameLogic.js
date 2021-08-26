import { lesson } from '../../data.json';

export default {
    generateCards: function({ cardLimit, totalCards, setState }) {
        const cards = new Set();
        let i = 0;
        while (i < cardLimit) {
          const value = Math.ceil(Math.random() * totalCards);
          if (!cards.has(value)) {
            i++;
            cards.add(value);
          }
        }
        setState([...cards]);
        return [...cards]
      },
    playCards: function({ cardLimit, setSoundState, gameSpeed, cards, lecture, autoPlay, setCleanUp }) {
        for (let i = 0; i < cardLimit; i++) {
            this.delay(gameSpeed * i, () => {
                autoPlay && new Audio(`files/lecture${lecture}/${cards[i]}.m4a`).play();
                setSoundState(i);
            }, setCleanUp);
        }
        this.delay(gameSpeed * cardLimit, () => setSoundState(cardLimit));
    },
    endGame: function({ result, exercise, lecture, setProgress }) {
        setProgress({ result, exercise, lecture });
        alert("result: " + result + "%");
    },
    answerQuestion: function({ state, lecture, cardLimit }) {
        const value = Math.floor(Math.random() * cardLimit);
        new Audio(`files/lecture${lecture}/${state[value]}.m4a`).play();
        return state[value];
    },
    answerQuestionMultLectures: function({ state, lecture, cardLimit }) {
        const value = Math.floor(Math.random() * cardLimit);
        const { lecture: currentLecture, position } = this.displayCard(state[value], lecture);
        new Audio(`files/lecture${currentLecture}/${position}.m4a`).play();
        return state[value];
    },
    correct: function() { new Audio("files/yes.m4a").play() },
    incorrect: function() { new Audio("files/no.m4a").play() },
    delay: function(timeout, cb, setCleanUp) { 
        const timeOut = setTimeout(() => { 
            cb();
            setCleanUp && setCleanUp(prev => {
                const index = prev.indexOf(timeOut);
                index > -1 && prev.splice(index, 1);
                return prev;
            })
        }, timeout);
        setCleanUp && setCleanUp(prev => [...prev, timeOut]);
    },
    isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
    totalCards: (lecture) => lesson.slice(0, lecture).reduce((total, cur) =>
    (typeof total === "number" ? total : total.limit.lessons.length) + cur.limit.lessons.length
    , 0),
    displayCard: function(state, lecture) {
        let runningTotal = state, currentLecture, position, accumulation = 0;
        for (let i = 0; i < lecture; i++) {
          const current = lesson[i].lessons.length;
          if (runningTotal - current <= 0) {
            position = state - accumulation;
            currentLecture = i + 1;
            break;
          }
          runningTotal -= current;
          accumulation +=current
        }
    
        return { position, lecture: currentLecture }
    }
}