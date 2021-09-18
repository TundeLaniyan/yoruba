import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { lesson } from "../../../data.json";
import Progress from "../../progress/progress";
import "./lesson.css";

const Lesson = ({ setLecture, lecture, progress }) => {
  const noOfExercise = 4;
  const [progression, setProgression] = useState([]);
  const [passed, setPassed] = useState(0);

  useEffect(() => {
    setProgression(
      lesson.map((cur, index) => {
        const levelProgress = progress[index + 1];
        const levelProgressArray = levelProgress
          ? Object.values(levelProgress)
          : [0];
        const percentage =
          levelProgressArray.reduce(
            (total, currentValue) => total + currentValue
          ) / (lecture > 1 ? noOfExercise : noOfExercise - 1);
        percentage >= 75 && setPassed((prev) => prev + 1);
        return { ...cur, percentage, passed };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="lesson">
      <div className="title">Select Level</div>
      <div className="lesson__length">
        {passed} / {lesson.length}
      </div>
      {progression.map((cur, index) => (
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
                style={{
                  backgroundImage: `url(./img/lecture${index + 1}/1.jpg)`,
                }}
              />
              <div style={{ fontWeight: 700 }}>{cur.title}</div>
            </Link>
          )}
          percentage={cur.percentage}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  progress: state,
});

export default connect(mapStateToProps)(Lesson);
