import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { lesson } from "../../../data.json";
import Button from "../../button/button";
import "./lesson.scss";

const Lesson = ({ setLecture, lecture, progress }) => {
  const noOfExercise = 5;
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
      <div className="title">Choose your interests</div>
      <div className="sub-title">
        Choose your catergory and procceed to start learining youruba
      </div>
      {/* <div className="lesson__length">
        {passed} / {lesson.length}
      </div> */}
      <div>
        {progression.map((cur, index) => (
          <div key={index} className="lesson__container">
            <div className="lesson__container-top">
              <div
                className="lesson__img"
                style={{
                  backgroundImage: `url(./images/Lecture${index + 1}.svg)`,
                }}
              />
              <div className="lesson__content">
                <div className="lesson__title">{cur.title}</div>
                <div className="lesson__description">{cur.description}</div>
                <Link to="/task" onClick={() => setLecture(index + 1)}>
                  <Button content={"Continue"} />
                </Link>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-bar__text">
                {cur.percentage.toFixed(1)}%
              </div>
              <div
                className="progress-bar__percentage"
                style={{ width: cur.percentage + "%" }}
              ></div>
            </div>
            {/* percentage={cur.percentage} */}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  progress: state,
});

export default connect(mapStateToProps)(Lesson);
