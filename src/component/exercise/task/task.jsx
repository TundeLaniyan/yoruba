import React from "react";
import { GiDiamondHard, GiGymBag, GiBugleCall } from "react-icons/gi";
import { GrScheduleNew } from "react-icons/gr";
import { SiWeasyl } from "react-icons/si";
import { IoMdMicrophone } from "react-icons/io";
import { FaMemory } from "react-icons/fa";
import { Link } from "react-router-dom";
import Progress from "../../progress/progress";
import { connect } from "react-redux";
import "./task.css";

const Task = ({ lecture, progress }) => {
  const task = {
    lesson: GrScheduleNew,
    exercise: GiGymBag,
    easyGame: SiWeasyl,
    // speaking: IoMdMicrophone,
    hardGame: GiDiamondHard,
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