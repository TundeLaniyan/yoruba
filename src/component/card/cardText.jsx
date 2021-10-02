import React, { memo, useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import { lesson } from "../../data.json";
import "./card.css";

const CardText = memo(function CardText({
  state,
  exercise,
  onClick,
  hide,
  brightness,
  answer,
  active = true,
}) {
  const Answer = answer === "correct" ? TiTick : TiTimes;
  const [light, setLight] = useState(brightness);
  const handleOnClick = () => {
    if (answer || !active) return;
    setLight(0.5);
    setTimeout(() => {
      setLight(brightness);
    }, 2000);
    onClick(state);
  };

  return (
    <div
      className="card"
      onClick={handleOnClick}
      style={!hide && light ? { filter: `brightness(${light})` } : {}}
    >
      <h1 className="card__text--large">
        {(!(hide >= 0) || answer) && lesson[0].words[exercise - 1]}
      </h1>
      {answer && (
        <div className={`card__answer card__answer--${answer}`}>
          <Answer className="card__answer-img" />
        </div>
      )}
    </div>
  );
});

export default CardText;
