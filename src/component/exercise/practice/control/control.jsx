import React, { useState, useEffect } from "react";
import "./control.css";
import data from "../../../../data.json";

const Control = ({ lecture, type, exercise }) => {
  const [speed, setSpeed] = useState(1);

  const active = (check, result) => {
    if (check === result)
      return {
        fontWeight: 700,
        boxShadow: "0 .125rem 0 0 #00000026",
        transform: "translateY(1px)",
        borderWidth: "2px",
      };
  };

  return (
    <div className="type">
      <div className="sound-control">
        <audio
          className="audio-setting"
          src={`/img/lecture${lecture + 1}/${type}/${exercise}.m4a`}
          controls
        />
        <div className="range">
          <input
            type="range"
            id="volume"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            min={0.1}
            max={1}
            step={0.1}
          />
          <label htmlFor="volume">Speed {(speed * 1).toFixed(1)}</label>
        </div>
      </div>
      {/* <button
        className="btn"
        disabled={!data.lesson[lecture].limit.lesson}
        style={active(type, "lesson")}
        onClick={() => setType("lesson")}
      >
        Lesson
      </button>
      <button
        className="btn"
        disabled={!data.lesson[lecture].limit.exercise}
        style={active(type, "exercise")}
        onClick={() => setType("exercise")}
      >
        Exercise
      </button> */}
    </div>
  );
};

export default Control;