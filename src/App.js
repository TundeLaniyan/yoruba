import React, { useState } from "react";
import Exercise from "./component/exercise/exercise";
import Header from "./component/header/header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducer";
import GameLogic from "./component/exercise/gameLogic";
import "./App.css";
// import { Progress } from "./progress";
// import { decrement, increment, set, setProgress, getProgress } from "./action";

function App() {
  const savedLecture = window.localStorage.getItem('Yourba-lecture') || '1';
  const [lecture, setLecture] = useState(JSON.parse(savedLecture));
  const Game = new GameLogic();
  Game.lecture = lecture;
  const store = createStore(reducer);

  const setSaveLecture = (value) => {
    setLecture(value);
    Game.lecture = value;
    window.localStorage.setItem('Yourba-lecture', JSON.stringify(value));
  }

  store.subscribe(() => {
    // console.log("store", store.getState());
    window.localStorage.setItem("Yoruba", JSON.stringify(store.getState()));
  });

  // store.dispatch(increment());
  // store.dispatch(increment());
  // store.dispatch(set(20));
  // store.dispatch(decrement());
  // const progressValue = { progress, setProgress };

  return (
    <Provider store={store}>
      <div className="App">
        <Header setLecture={setSaveLecture} />
        <Router basename="/yoruba">
          <Route
            render={({ location }) => (
              <Exercise
                location={location}
                lecture={lecture}
                setLecture={setSaveLecture}
                Game={Game}
              />
            )}
          />
        </Router>
      </div>
    </Provider>
  );
}

export default App;