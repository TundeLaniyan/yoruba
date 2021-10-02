import React, { useEffect, useState } from "react";
import logo from "../../img/logo.png";
import Lesson from "../exercise/lesson/lesson";
import "./home.scss";

const Home = ({ setLecture, lecture }) => {
  const [display, setDisplay] = useState(true);

  useEffect(
    () =>
      setTimeout(() => {
        setDisplay(false);
      }, 5500),
    []
  );

  if (!display) return <Lesson setLecture={setLecture} lecture={lecture} />;

  return (
    <div className="home">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Yoruba" />
      </div>
      <div className="title-container">
        <div className="title">Learn Yoruba</div>
        <div className="sub-title">
          One of the principal languages of Nigeria
        </div>
      </div>
    </div>
  );
};

export default Home;
