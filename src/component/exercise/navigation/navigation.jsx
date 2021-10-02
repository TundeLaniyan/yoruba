import React from "react";
import { Link } from "react-router-dom";
import Button from "../../button/button";
import { lesson } from "../../../data.json";
import "./navigation.scss";

const Navigation = ({ challenge, lecture }) => {
  return (
    <div className="navigation">
      <Link to="/task" className="return">
        <img src="./img/return.svg" />
      </Link>
      <Button className="navigation-icon" content="Learn Yoruba" />
      <div className="title">{lesson[lecture - 1].title}</div>
      <div className="navigation__exercise">
        <img src="./img/exercise.svg" />
        <span>{challenge}</span>
      </div>
    </div>
  );
};

export default Navigation;
