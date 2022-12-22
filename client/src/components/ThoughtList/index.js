import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { DELETE_THOUGHT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { QUERY_THOUGHT } from "../../utils/queries";

const ThoughtList = ({ thoughts, title }) => {
  const [deleteThought] = useMutation(DELETE_THOUGHT);

  const { id: thoughtId } = useParams();

  const { loading } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const handleFormDeleteThought = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    console.log("thoughtId", _id);
    if (!token) {
      return false;
    }
    try {
      await deleteThought({
        variables: { id: thoughtId },
      });
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("loading", loading);

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
              <button
                className="btn"
                name="thought"
                id={thought._id}
                onClick={() => {
                  handleFormDeleteThought(thoughtId);
                }}
              >
                <i className="fas fa-arrow-up"></i> Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
