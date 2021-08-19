import React from "react";
import { TiTickOutline } from "react-icons/ti";
import "./progress.css";

const Progress = ({ className, Component, percentage = 0, ...props }) => {
  const percent = {
    top: {
      backgroundImage: "linear-gradient(to right, #fff9d7 0%, #bfbba4 0%)",
    },
    right: {
      backgroundImage: "linear-gradient(to bottom, #fff9d7 0%, #bfbba4 0%)",
    },
    bottom: {
      backgroundImage: "linear-gradient(to left, #fff9d7 0%, #bfbba4 0%)",
    },
    left: {
      backgroundImage: "linear-gradient(to top, #fff9d7 0%, #bfbba4 0%)",
    },
  };

  if (percentage < 12.5)
    percent.top.backgroundImage = `linear-gradient(to right, #bfbba4 50%, #fff9d7 50%, #fff9d7 ${
      50 + percentage * 4
    }%, #bfbba4 ${50 + percentage * 4}%)`;
  else if (percentage < 37.5) {
    percent.top.backgroundImage = `linear-gradient(to right, #bfbba4 50%, #fff9d7 50%)`;
    percent.right.backgroundImage = `linear-gradient(to bottom, #fff9d7 ${
      (percentage - 12.5) * 4
    }%, #bfbba4 ${(percentage - 12.5) * 4}%)`;
  } else if (percentage < 62.5) {
    percent.top.backgroundImage = `linear-gradient(to right, #bfbba4 50%, #fff9d7 50%)`;
    percent.right.backgroundImage = `linear-gradient(to bottom, #fff9d7 100%, #bfbba4 100%)`;
    percent.bottom.backgroundImage = `linear-gradient(to left, #fff9d7 ${
      (percentage - 37.5) * 4
    }%, #bfbba4 ${(percentage - 37.5) * 4}%)`;
  } else if (percentage < 87.5) {
    percent.top.backgroundImage = `linear-gradient(to right, #bfbba4 50%, #fff9d7 50%)`;
    percent.right.backgroundImage = `linear-gradient(to bottom, #fff9d7 100%, #bfbba4 100%)`;
    percent.bottom.backgroundImage = `linear-gradient(to left, #fff9d7 100%, #bfbba4 100%)`;
    percent.left.backgroundImage = `linear-gradient(to top, #fff9d7 ${
      (percentage - 62.5) * 4
    }%, #bfbba4 ${(percentage - 62.5) * 4}%)`;
  } else {
    percent.top.backgroundImage = `linear-gradient(to right, #fff9d7 ${
      (percentage - 87.5) * 4
    }%, #bfbba4 ${(percentage - 87.5) * 4}%, #bfbba4 50%, #fff9d7 50%)`;
    percent.right.backgroundImage = `linear-gradient(to bottom, #fff9d7 100%, #bfbba4 100%)`;
    percent.bottom.backgroundImage = `linear-gradient(to left, #fff9d7 100%, #bfbba4 100%)`;
    percent.left.backgroundImage = `linear-gradient(to top, #fff9d7 100%, #bfbba4 100%)`;
  }

  return (
    <div className={`progress-container ${className}`}>
      <div className="progress__top" style={percent.top}></div>
      <div className="progress__body">
        <div className="progress__side" style={percent.left}></div>
        {percentage >= 75 && (
          <div className="progress__pass">
            <TiTickOutline className="progress__pass-img" />
          </div>
        )}
        <Component {...props} />
        <div className="progress__side" style={percent.right}></div>
      </div>
      <div className="progress__bottom" style={percent.bottom}></div>
    </div>
  );
};

export default Progress;