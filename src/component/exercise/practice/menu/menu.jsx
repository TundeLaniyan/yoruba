import React from "react";
import "./menu.css";

const Menu = ({ auto, setAuto, random, setRandom, autoPlay, setAutoPlay }) => {
  return (
    <div className="menu">
      <button className="btn" onClick={() => setRandom(random ? false : true)}>
        {random ? "Normal" : "Random"}
      </button>
      <div className="btn" onClick={() => setAuto(!auto)}>
        {auto ? "Auto" : "Manual"}
      </div>
      <div className="btn" onClick={() => setAutoPlay(!autoPlay)}>
        {autoPlay ? "Stop Auto Play" : "Start Auto Play"}
      </div>
    </div>
  );
};

export default Menu;
