import React, { useState } from "react";
import Exercise from "./component/exercise/exercise";
import Header from "./component/header/header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";
// import { Progress } from "./progress";
import { Provider } from "react-redux";
import { reducer } from "./reducer";
import "./App.css";
// import { decrement, increment, set, setProgress, getProgress } from "./action";

function App() {
  const savedLecture = window.localStorage.getItem('Yourba-lecture') || '1';
  const [lecture, setLecture] = useState(JSON.parse(savedLecture));
  const store = createStore(reducer);

  const setSaveLecture = (value) => {
    setLecture(value);
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
              />
            )}
          />
        </Router>
      </div>
    </Provider>
  );
}

export default App;