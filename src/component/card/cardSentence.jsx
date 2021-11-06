import React, { memo, useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import { NATIVELANGUAGE } from "../../constant";
import { lesson } from "../../data.json";
import "./card.css";

const CardSentence = memo(function CardSentence({
  state,
  exercise,
  onClick,
  hide,
  brightness,
  answer,
  lecture,
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
      className="card card--full"
      onClick={handleOnClick}
      style={!hide && light ? { filter: `brightness(${light})` } : {}}
    >
      <h1 className="card__text--large">
        {(!(hide >= 0) || answer) &&
          lesson[lecture - 1].text[exercise - 1][NATIVELANGUAGE]}
      </h1>
      {answer && (
        <div className={`card__answer card__answer--${answer}`}>
          <Answer className="card__answer-img" />
        </div>
      )}
    </div>
  );
});

export default CardSentence;
