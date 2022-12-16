import React from "react";
import { Link } from "react-router-dom";

const ThoughtList = ({ thoughts, title }) => {
  return (
    <div>
      <h3>{title}</h3>
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
                  <li>Patient Name: {thought.thoughtText}</li>
                  <li>Patient DOB: {thought.thoughtTextA}</li>
                  <li>Patient MRN: {thought.thoughtTextB}</li>

                  <iframe
                    width="730"
                    height="594"
                    src="https://www.youtube.com/embed/jcXidSeirMU"
                    title="Simulated Patient Monitor"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </ul>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
