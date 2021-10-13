import React, { memo, useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import { lesson } from "../../data.json";
import { NATIVELANGUAGE } from "../../constant";
import "./card.css";
import GameLogic from "../exercise/gameLogic";

const Card = memo(function Card({
  state,
  lecture,
  exercise,
  onClick,
  hide,
  brightness,
  answer,
  active = true,
}) {
  const Answer = answer === "correct" ? TiTick : TiTimes;
  const [light, setLight] = useState(brightness);
  const text = lesson[lecture - 1].text[exercise - 1][NATIVELANGUAGE];

  const handleOnClick = () => {
    if (answer || !active) return;
    setLight(0.5);
    onClick(state);
    setTimeout(() => {
      setLight(brightness);
    }, 4000);
  };

  return (
    <div
      className="card"
      onClick={handleOnClick}
      style={!hide && light ? { filter: `brightness(${light})` } : {}}
    >
      <div
        className="img"
        style={
          hide >= 0 && !answer
            ? {}
            : {
                backgroundImage: `url(./images/${new GameLogic().getWord(
                  lecture,
                  exercise
                )}.jpg)`,
              }
        }
      />
      {answer && (
        <div className={`card__answer card__answer--${answer}`}>
          <Answer className="card__answer-img" />
        </div>
      )}
      {!(hide >= 0) && <h5 className="card__text">{text}</h5>}
    </div>
  );
});

export default Card;
