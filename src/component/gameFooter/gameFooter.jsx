import React, { useState, useEffect } from "react";
import { GiSpeaker } from "react-icons/gi";
// import { lesson } from "../../data.json";
import GameLogic from "../exercise/gameLogic";
import "./gameFooter.css";
const Game = new GameLogic();

const GameFooter = ({
  percent = 100,
  audio,
  correct,
  incorrect,
  active,
  noText,
  Sound,
}) => {
  const [languageText, setLanguageText] = useState("");

  useEffect(() => {
    const soundText = Sound.url
      .replace("audio/", "")
      .replace(".m4a", "")
      .replace(/-/g, " ");
    const { text, lesson } = Game.translate(soundText);
    if (noText || lesson === 1) return;
    setLanguageText(text);
    setTimeout(() => setLanguageText(""), 5500);
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
          onClick={() => active && Sound.play(audio)}
        >
          <GiSpeaker />
        </div>
      )}
      <h2 className="language-text">{languageText}</h2>
      <div className="score score__correct">{correct}</div>
      <div className="score score__incorrect">{incorrect}</div>
    </div>
  );
};

export default GameFooter;
