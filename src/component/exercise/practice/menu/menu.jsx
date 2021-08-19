import React from "react";
import "./menu.css";

const Menu = ({ active, auto, setAuto, random, setRandom }) => {
  return (
    <div className="menu">
      <button
        className="btn"
        style={active(random, true)}
        onClick={() => setRandom(random ? false : true)}
      >
        Random
      </button>
      <div
        className="btn"
        onClick={() => setAuto(auto === "Auto" ? "Manual" : "Auto")}
      >
        {auto}
      </div>
    </div>
  );
};

export default Menu;