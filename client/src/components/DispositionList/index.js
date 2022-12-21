import React from "react";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { DELETE_DISPOSITION } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { QUERY_DISPOSITION } from "../../utils/queries";

const center = css({
  textAlign: "center",
});

const DispositionList = ({ dispositions }) => {
  const [deleteDisposition] = useMutation(DELETE_DISPOSITION);

  const { id: dispositionId } = useParams();

  const { loading } = useQuery(QUERY_DISPOSITION, {
    variables: { id: dispositionId },
  });

  const handleFormDeleteDisposition = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    console.log("dispositionId", _id);
    if (!token) {
      return false;
    }
    try {
      await deleteDisposition({
        variables: { dispositionId },
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
                name="disposition"
                id={disposition._id}
                onClick={() => {
                  handleFormDeleteDisposition(dispositionId);
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
