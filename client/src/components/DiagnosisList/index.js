import React from "react";
import { Link } from "react-router-dom";

const DiagnosisList = ({ diagnoses }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Assessment and Plan</span>
      </div>
      <div className="card-body">
        {diagnoses &&
          diagnoses.map((diagnosis) => (
            <p className="pill mb-3" key={diagnosis._id}>
              {diagnosis.diagnosisBody} {"// "}
              <Link
                to={`/profile/${diagnosis.username}`}
                style={{ fontWeight: 700 }}
              >
                {diagnosis.username}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default DiagnosisList;
