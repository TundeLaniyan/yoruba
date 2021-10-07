import React, { forwardRef } from "react";
import "./button.scss";

const Button = forwardRef(({ className, content, ...props }, ref) => {
  return (
    <div ref={ref} className={`button ${className}`} {...props}>
      {content}
    </div>
  );
});

export default Button;
