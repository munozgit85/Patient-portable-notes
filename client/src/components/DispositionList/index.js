import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const center = css({
  textAlign: "center",
});

const DispositionList = ({ dispositions }) => {
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
      </div>
    </div>
  );
};

export default DispositionList;
