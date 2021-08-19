import React, { useState } from "react";
import Exercise from "./component/exercise/exercise";
import Header from "./component/header/header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";
// import { Progress } from "./progress";
import { Provider } from "react-redux";
import { reducer } from "./reducer";
import "./App.css";
import { decrement, increment, set, setProgress } from "./action";

function App() {
  const [lecture, setLecture] = useState(1);
  // const [progress, setProgresss] = useState({});

  // const setProgressa = ({ result, exercise, lecture }) => {
  //   const current = { ...progress };
  //   if (!current[lecture]) current[lecture] = {};
  //   if (!(current[lecture][exercise] > result)) {
  //     current[lecture][exercise] = result;
  //     setProgress(current);
  //   }
  // };

  const store = createStore(reducer);

  store.subscribe(() => {
    console.log("store", store.getState());
    window.localStorage.setItem("Yoruba", store.getState());
  });

  // store.dispatch(increment());
  // store.dispatch(increment());
  // store.dispatch(set(20));
  // store.dispatch(decrement());
  // const progressValue = { progress, setProgress };

  return (
    <Provider store={store}>
      <div className="App">
        <Header setLecture={setLecture} />
        <Router>
          <Route
            render={({ location }) => (
              <Exercise
                location={location}
                lecture={lecture}
                setLecture={setLecture}
              />
            )}
          />
        </Router>
      </div>
    </Provider>
  );
}

export default App;