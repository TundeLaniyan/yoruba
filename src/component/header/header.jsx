import React from "react";
import logo from "../../img/logo.png";
import "./header.css";

const Header = () => {

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Yoruba" />
      </div>
    </div>
  );
};

export default Header;