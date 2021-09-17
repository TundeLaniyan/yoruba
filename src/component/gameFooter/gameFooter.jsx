import React, { useState, useEffect } from "react";
import { GiSpeaker } from "react-icons/gi";
import { lesson } from "../../data.json";
import Sound from "../../Sound";
import "./gameFooter.css";

const GameFooter = ({
  percent = 100,
  audio,
  correct,
  incorrect,
  active,
  noText,
}) => {
  const [langaugeText, setLangaugeText] = useState("");

  useEffect(() => {
    if (noText) return;
    const [exercise, lecture] = Sound.url
      .replace("files/lecture", "")
      .replace(".m4a", "")
      .split("/");
    setTimeout(() => {
      if (exercise !== "files" && exercise > 0)
        setLangaugeText(lesson[exercise - 1].langauge?.[lecture - 1]);
    }, 1500);
    // eslint-disable-next-line
  }, [Sound.url]);

  return (
    <div
      className="game__footer"
      style={{
        backgroundImage: `linear-gradient(to right, rgb(90 44 29 / 100%) ${percent}%, rgb(90 44 29 / 23%) ${percent}%)`,
      }}
    >
      {audio && (
        <div
          className="score score__play"
          onClick={() => active && Sound.start(audio)}
        >
          <GiSpeaker />
        </div>
      )}
      <h5 className="langauge-text">{langaugeText}</h5>
      <div className="score score__correct">{correct}</div>
      <div className="score score__incorrect">{incorrect}</div>
    </div>
  );
};

export default GameFooter;
