import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { useMutation } from "@apollo/client";
import { DELETE_DISPOSITION } from "../../utils/mutations";
import Auth from "../../utils/auth";

const center = css({
  textAlign: "center",
});

const DispositionList = ({ dispositions }) => {
  const [deleteDisposition] = useMutation(DELETE_DISPOSITION);

  const handleFormDeleteDisposition = async (_id, thoughtId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await deleteDisposition({
        variables: { _id, thoughtId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light" css={center}>
          Disposition
        </span>
      </div>
      <div className="card-body">
        {dispositions &&
          dispositions.map((disposition) => (
            <p className="pill mb-3" key={disposition._id}>
              {disposition.dispositionBody} {"// "}
              <Link
                to={`/profile/${disposition.username}`}
                style={{ fontWeight: 700 }}
              >
                {disposition.username}
              </Link>
            </p>
          ))}
        <button onClick={handleFormDeleteDisposition}>
          <i className="fas fa-arrow-up"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default DispositionList;
