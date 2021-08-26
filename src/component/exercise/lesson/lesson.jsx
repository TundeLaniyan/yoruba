import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { lesson } from "../../../data.json";
import Progress from "../../progress/progress";
import "./lesson.css";

const Lesson = ({ setLecture, progress }) => {

  const noOfExercise = 3;

  return (
    <div className="lesson">
      <div className="title">Select Level</div>
      <div className="lesson__length">Lessons {lesson.length}</div>
        {lesson.map((cur, index) => {
          const levelProgress = progress[index + 1];
          const levelProgressArray = levelProgress ? Object.values(levelProgress) : [0];
          const percentage = levelProgressArray.reduce((total, currentValue) => total + currentValue) / noOfExercise;         
          return (
            <Progress
              key={index}
              Component={() => (
                <Link
                  key={index}
                  className="lesson__container"
                  to="/task"
                  onClick={() => setLecture(index + 1)}
                >
                  <div
                    className="lesson__img"
                    style={{backgroundImage: `url(./img/lecture${index + 1}/1.jpg)`}}
                  />
                  <div style={{ fontWeight: 700 }}>{cur.title}</div>
                </Link>
              )}
              percentage={percentage}
            />
        )})}
    </div>
  );
};

const mapStateToProps = (state) => ({
  progress: state
})

export default connect(mapStateToProps)(Lesson);