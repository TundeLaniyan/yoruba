import React, { useState } from "react";
import { lesson } from "../../data.json";
import logo from "../../img/logo.png";
import "./header.css";

const Header = ({ setLecture }) => {
  const [display, setDisplay] = useState(false);

  return (
    <div className="header" onMouseLeave={() => setDisplay(false)}>
      <div className="logo-container">
        <img className="logo" src={logo} />
      </div>
      {/* <div className="header__navigation">Navigation/unit 15/lesson</div> */}
      {/* <div
        className="option"
        onClick={() => setDisplay((prev) => (prev ? false : true))}
        onMouseEnter={() => setDisplay(true)}
      >
        <span>Lecture</span>
        {display && (
          <div className="droplist" onMouseLeave={() => setDisplay(false)}>
            {lesson.map((cur, i) => (
              <div className="droplist__item" onClick={() => setLecture(i)}>
                {cur.title}
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Header;