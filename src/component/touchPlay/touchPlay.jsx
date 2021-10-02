import React from "react";
import "./touchPlay.scss";

const TouchPlay = ({ round, onClick }) => {
  return (
    <div className="touch-play" onClick={onClick}>
      {round ? "Play" : "Next Round"}
    </div>
  );
};

export default TouchPlay;
