import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHT } from "../utils/queries";
import ReactionList from "../components/ReactionList";
import ReactionForm from "../components/ReactionForm";
import ExamForm from "../components/ExamForm";
import ExamList from "../components/ExamList";
import DiagnosisForm from "../components/DiagnosisForm";
import DiagnosisList from "../components/DiagnosisList";
import DispositionForm from "../components/DispositionForm";
import DispositionList from "../components/DispositionList";

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{" "}
          Patient encounter on {thought.createdAt}
        </p>
        <div className="card-body">
          <ul>
            <li>Patient Name: {thought.thoughtText}</li>
            <li>Patient DOB: {thought.thoughtTextA}</li>
            <li>Patient MRN: {thought.thoughtTextB}</li>
          </ul>
        </div>
      </div>

      {<ReactionList reactions={thought.reactions} />}
      {<ReactionForm thoughtId={thought._id} />}
      <br />
      <br />
      <br />
      {<ExamList exams={thought.exams} />}
      {<ExamForm thoughtId={thought._id} />}
      <br />
      <br />
      <br />
      {<DiagnosisList diagnoses={thought.diagnoses} />}
      {<DiagnosisForm thoughtId={thought._id} />}
      <br />
      <br />
      <br />
      {<DispositionList dispositions={thought.dispositions} />}
      {<DispositionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
