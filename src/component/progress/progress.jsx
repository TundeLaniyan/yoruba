import React from "react";
import { TiTickOutline } from "react-icons/ti";
import "./progress.css";

const Progress = ({ className, Component, percentage = 0, ...props }) => {
  const color = { complete: 'rgb(180, 107, 83)', incomplete: 'rgb(102, 72, 62)' };
  const percent = {
    top: {
      backgroundImage: `linear-gradient(to right, ${color.complete} 0%, ${color.incomplete} 0%)`,
    },
    right: {
      backgroundImage: `linear-gradient(to bottom, ${color.complete} 0%, ${color.incomplete} 0%)`,
    },
    bottom: {
      backgroundImage: `linear-gradient(to left, ${color.complete} 0%, ${color.incomplete} 0%)`,
    },
    left: {
      backgroundImage: `linear-gradient(to top, ${color.complete} 0%, ${color.incomplete} 0%)`,
    },
  };

  if (percentage < 12.5)
    percent.top.backgroundImage = `linear-gradient(to right, ${color.incomplete} 50%, ${color.complete} 50%, ${color.complete} ${
      50 + percentage * 4
    }%, ${color.incomplete} ${50 + percentage * 4}%)`;
  else if (percentage < 37.5) {
    percent.top.backgroundImage = `linear-gradient(to right, ${color.incomplete} 50%, ${color.complete} 50%)`;
    percent.right.backgroundImage = `linear-gradient(to bottom, ${color.complete} ${
      (percentage - 12.5) * 4
    }%, ${color.incomplete} ${(percentage - 12.5) * 4}%)`;
  } else if (percentage < 62.5) {
    percent.top.backgroundImage = `linear-gradient(to right, ${color.incomplete} 50%, ${color.complete} 50%)`;
    percent.right.backgroundImage = `linear-gradient(to bottom, ${color.complete} 100%, ${color.incomplete} 100%)`;
    percent.bottom.backgroundImage = `linear-gradient(to left, ${color.complete} ${
      (percentage - 37.5) * 4
    }%, ${color.incomplete} ${(percentage - 37.5) * 4}%)`;
  } else if (percentage < 87.5) {
    percent.top.backgroundImage = `linear-gradient(to right, ${color.incomplete} 50%, ${color.complete} 50%)`;
    percent.right.backgroundImage = `linear-gradient(to bottom, ${color.complete} 100%, ${color.incomplete} 100%)`;
    percent.bottom.backgroundImage = `linear-gradient(to left, ${color.complete} 100%, ${color.incomplete} 100%)`;
    percent.left.backgroundImage = `linear-gradient(to top, ${color.complete} ${
      (percentage - 62.5) * 4
    }%, ${color.incomplete} ${(percentage - 62.5) * 4}%)`;
  } else {
    percent.top.backgroundImage = `linear-gradient(to right, ${color.complete} ${
      (percentage - 87.5) * 4
    }%, ${color.incomplete} ${(percentage - 87.5) * 4}%, ${color.incomplete} 50%, ${color.complete} 50%)`;
    percent.right.backgroundImage = `linear-gradient(to bottom, ${color.complete} 100%, ${color.incomplete} 100%)`;
    percent.bottom.backgroundImage = `linear-gradient(to left, ${color.complete} 100%, ${color.incomplete} 100%)`;
    percent.left.backgroundImage = `linear-gradient(to top, ${color.complete} 100%, ${color.incomplete} 100%)`;
  }

  return (
    <div className={`progress-container ${className}`}>
      <div className="progress__top" style={percent.top}></div>
      <div className="progress__body">
        <div className="progress__side" style={percent.left}></div>
        <Component {...props} />
        {percentage >= 75 && (
          <div className="progress__pass">
            <TiTickOutline className="progress__pass-img" />
          </div>
        )}
        <div className="progress__side" style={percent.right}></div>
      </div>
      <div className="progress__bottom" style={percent.bottom}></div>
    </div>
  );
};

export default Progress;