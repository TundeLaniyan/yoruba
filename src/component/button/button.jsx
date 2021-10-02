import React from "react";
import "./button.scss";

const Button = ({ className, content, ...props }) => {
  return (
    <div className={`button ${className}`} {...props}>
      {content}
    </div>
  );
};

export default Button;
