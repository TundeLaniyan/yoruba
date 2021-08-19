export default {
    generateCards: function({ cardLimit, max }) {
        const cards = new Set();
        let i = 0;
        while (i < cardLimit) {
          const value = Math.ceil(Math.random() * max);
          if (!cards.has(value)) {
            i++;
            cards.add(value);
          }
        }
        return [...cards];
      },
    playCards: function({ cardLimit, setState, gameSpeed, cards, lecture, autoPlay }) {
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < cardLimit) {
                autoPlay && new Audio(`files/lecture${lecture}/${cards[i]}.m4a`).play();
                setState((prev) => [...prev, cards[i]]);
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, gameSpeed);
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
    correct: function() {},
    incorrect: function() { alert("INCORRECT"); }
}