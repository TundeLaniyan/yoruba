import React from "react";
import { Link } from "react-router-dom";
import { lesson } from "../../../data.json";
import Progress from "../../progress/progress";
import "./lesson.css";

const Lesson = ({ setLecture, lecture, history }) => {

  const onSelectLesson = e => {
    e.preventDefault();
    if (lecture > 0) history.push("/task");
  }
  return (
    <div className="lesson">
      <div className="title">Select Level</div>
      <div className="lesson__length">Lessons {lesson.length}</div>
      <form onSubmit={onSelectLesson} className="lesson__select">
        <input
          type="number"
          className="lesson__input"
          min="1"
          max={lesson.length}
          value={lecture}
          onChange={e => setLecture(e.target.value)}
        />
        <button className="lesson__btn">Select</button>
      </form>
      {/* <div
        className="lesson__container"
        onClick={() => { console.log({a: new Audio(`files/lecture1/1.m4a`)}); new Audio(`files/lecture1/7.m4a`).play(); }}
      >
        <div
          className="lesson__img"
        >Click</div>
        <div style={{ fontWeight: 700 }}>Play</div>
      </div>
        {lesson.map((cur, index) => (
          <Progress
            key={index}
            Component={() => (
              <Link
                key={index}
                className="lesson__container"
                to="/task"
                onClick={() => setLecture(index)}
              >
                <div
                  className="lesson__img"
                //   style={{
                //     backgroundImage: `url(../../img/lecture${
                //       index + 1
                //     }/exercise/1.png)`,
                //   }}
                >{index + 1}</div>
                <div style={{ fontWeight: 700 }}>{cur.title}</div>
              </Link>
            )}
            percentage={Math.floor(Math.random() * 100)}
          />
          // </>
        ))} */}
    </div>
  );
};

export default Lesson;