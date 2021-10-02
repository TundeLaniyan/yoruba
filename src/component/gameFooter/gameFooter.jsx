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
  const [languageText, setlanguageText] = useState("");

  useEffect(() => {
    if (noText) return;
    const [exercise, lecture] = Sound.url
      .replace("files/lecture", "")
      .replace(".m4a", "")
      .split("/");
    setTimeout(() => {
      if (exercise !== "files" && exercise > 0) {
        setlanguageText(lesson[exercise - 1].language?.[lecture - 1]);
        setTimeout(() => setlanguageText(""), 3000);
      }
    }, 1500);
    // eslint-disable-next-line
  }, [Sound.url]);

  return (
    <div
      className="game__footer"
      style={{
        backgroundImage: `linear-gradient(to right, #054d54 ${percent}%, #054d5459 ${percent}%)`,
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
      <h5 className="language-text">{languageText}</h5>
      <div className="score score__correct">{correct}</div>
      <div className="score score__incorrect">{incorrect}</div>
    </div>
  );
};

export default GameFooter;
