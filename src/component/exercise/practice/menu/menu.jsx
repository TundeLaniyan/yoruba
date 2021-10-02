import React from "react";
import Button from "../../../button/button";
import "./menu.css";

const Menu = ({ auto, setAuto, random, setRandom, autoPlay, setAutoPlay }) => {
  return (
    <div className="menu">
      <Button
        onClick={() => setRandom(random ? false : true)}
        content={random ? "Normal" : "Random"}
      />
      <Button
        onClick={() => setAuto(!auto)}
        content={auto ? "Auto" : "Manual"}
      />
      <Button
        onClick={() => setAutoPlay(!autoPlay)}
        content={autoPlay ? "Stop Auto Play" : "Start Auto Play"}
      />
    </div>
  );
};

export default Menu;
