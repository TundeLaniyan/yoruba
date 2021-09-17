import React, { memo } from "react";
import { lesson } from "../../data.json";
import "./card.css";

const Card = memo(function Card({
  state,
  lecture,
  exercise,
  onClick,
  hide,
  brightness,
}) {
  return (
    <div
      className="card"
      onClick={() => onClick(state)}
      style={
        hide
          ? { backgroundColor: "#bbb7aa35" }
          : brightness
          ? { filter: `brightness(${brightness})` }
          : {}
      }
    >
      <div
        className="img"
        style={
          hide >= 0
            ? {}
            : {
                backgroundImage: `url(./img/lecture${lecture}/${exercise}.jpg)`,
              }
        }
      />
      {!(hide >= 0) && (
        <h5 className="card__text">
          {lesson[lecture - 1].lessons[exercise - 1]}
        </h5>
      )}
    </div>
  );
});

export default Card;
