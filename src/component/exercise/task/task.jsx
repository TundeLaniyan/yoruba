import React from "react";
import { lesson } from "../../../data.json";
import { GiDiamondHard, GiGymBag, GiBookCover } from "react-icons/gi";
import { SiWeasyl } from "react-icons/si";
import { FaMemory } from "react-icons/fa";
import { Link } from "react-router-dom";
import Progress from "../../progress/progress";
import { connect } from "react-redux";
import { GiFastArrow } from "react-icons/gi";
// import { GrScheduleNew } from "react-icons/gr";
// import { IoMdMicrophone } from "react-icons/io";
import "./task.scss";
import Button from "../../button/button";

const Task = ({ lecture, progress, location }) => {
  // const task = {
  //   // lesson: GrScheduleNew,
  //   exercise: GiGymBag,
  //   [lecture === 1 ? "easyGameAccent" : "easyGame"]: SiWeasyl,
  //   // speaking: IoMdMicrophone,
  //   hardGame: GiDiamondHard,
  //   reading: GiBookCover,
  //   memoryGame: FaMemory,
  //   rapidGame: GiFastArrow,
  //   // recall: GiBugleCall,
  // };
  const task = {
    exercise: "exercise",
    easy: lecture === 1 ? "easyGameAccent" : "easyGame",
    hard: "hardGame",
    reading: "reading",
    memory: "memoryGame",
    rapid: "rapidGame",
  };

  if (lecture === 1) delete task.reading;

  return (
    <div className="task">
      <Link to="/" className="return">
        <img src="./img/return.svg" />
      </Link>
      <Button className="task-icon" content="Learn Yoruba" />
      <img
        className="task__cover-img"
        src={`./img/lecture${lecture}/cover.svg`}
      />
      <div className="task__content">
        <div className="task__title">{lesson[lecture - 1].title}</div>
        <div className="task__text">Select Challenge</div>
        <div className="task__select">
          {Object.entries(task).map(([key, value], index) => {
            return (
              <div key={index} className="task__container" to={key}>
                <img className="task__icon" src={`./img/${key}.svg`} />
                <div className="task__challenge">{key}</div>
                {index > 0 && (
                  <div className="task__progress">
                    {progress[lecture]?.[value]?.toFixed(1) || 0}%
                  </div>
                )}
                <Link to={value}>
                  <img className="task__icon" src="./img/advance.svg" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// export default Task;

// const mapStateToProps = (state) => {
//   return {
//     progress: selectExpenses(state.expenses, state.filters)
//   };
// };

const mapStateToProps = (state) => ({
  progress: state,
});

export default connect(mapStateToProps)(Task);
