import React from "react";
import { Link } from "react-router-dom";

const ExamList = ({ exams }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Physical Exam</span>
      </div>
      <div className="card-body">
        {exams &&
          exams.map((exam) => (
            <p className="pill mb-3" key={exam._id}>
              {exam.examBody} {"// "}
              <Link
                to={`/profile/${exam.username}`}
                style={{ fontWeight: 700 }}
              >
                {exam.username}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ExamList;
