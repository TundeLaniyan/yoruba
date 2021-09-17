import React from "react";
import { GiDiamondHard, GiGymBag } from "react-icons/gi";
import { SiWeasyl } from "react-icons/si";
import { FaMemory } from "react-icons/fa";
import { Link } from "react-router-dom";
import Progress from "../../progress/progress";
import { connect } from "react-redux";
// import { GrScheduleNew } from "react-icons/gr";
// import { GiBugleCall } from "react-icons/gi";
// import { IoMdMicrophone } from "react-icons/io";
import "./task.css";

const Task = ({ lecture, progress }) => {
  const task = {
    // lesson: GrScheduleNew,
    exercise: GiGymBag,
    [lecture === 1 ? "easyGameAccent" : "easyGame"]: SiWeasyl,
    // speaking: IoMdMicrophone,
    hardGame: GiDiamondHard,
    reading: FaMemory,
    memoryGame: FaMemory,
    // recall: GiBugleCall,
  };
  return (
    <div className="task">
      <div className="title">Select Task</div>
      <div className="task__select">
        {Object.entries(task).map(([key, Value], index) => {
          return (
            <Progress
              key={index}
              className="task__box"
              Component={() => (
                <Link className="task__container" to={key}>
                  <Value className="task__img" />
                  <div className="task__title">{key}</div>
                </Link>
              )}
              percentage={progress[lecture]?.[key]}
            />
          );
        })}
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
