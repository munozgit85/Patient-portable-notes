import React from "react";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { DELETE_DISPOSITION } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { QUERY_THOUGHT } from "../../utils/queries";

const center = css({
  textAlign: "center",
});

const DispositionList = ({ dispositions }) => {
  const [deleteDisposition] = useMutation(DELETE_DISPOSITION);

  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  const handleFormDeleteDisposition = async (thoughtId, dispositionId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    console.log("thoughtId", thoughtId, "dispositionId", dispositionId);
    if (!token) {
      return false;
    }
    try {
      await deleteDisposition({
        variables: { thoughtId, dispositionId },
      });
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

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
              {disposition.dispositionBody}
              <button
                className="btn"
                key={thought._id}
                id={thought._id}
                onClick={() => {
                  handleFormDeleteDisposition(disposition._id, thought._id);
                }}
              >
                <i className="fas fa-arrow-up"></i> Delete
              </button>
            </p>
          ))}
      </div>
    </div>
  );
};

export default DispositionList;
