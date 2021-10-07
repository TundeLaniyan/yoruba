import React, { useEffect } from "react";
import "./touchPlay.scss";

const TouchPlay = ({ round, onClick, Sound }) => {
  // eslint-disable-next-line
  useEffect(() => Sound.stop(), []);
  return (
    <div className="touch-play" onClick={onClick}>
      {round ? "Play" : "Next Round"}
    </div>
  );
};

export default TouchPlay;
