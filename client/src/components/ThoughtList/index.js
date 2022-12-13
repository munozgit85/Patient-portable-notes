import React from "react";
import { Link } from "react-router-dom";

const ThoughtList = ({ thoughts }) => {
  if (!thoughts.length) {
    return <h3>No Recorded Patients</h3>;
  }

  return (
    <div>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}
              </Link>{" "}
              Patient record created {thought.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/thought/${thought._id}`}>
                <ul>
                  <li>{thought.thoughtText}</li>
                  <li>{thought.thoughtTextA}</li>
                  <li>{thought.thoughtTextB}</li>
                </ul>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
