import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_DIAGNOSIS } from "../../utils/mutations";

const DiagnosisForm = ({ thoughtId }) => {
  const [addDiagnosis, { error }] = useMutation(ADD_DIAGNOSIS);
  const [diagnosisBody, setDiagnosis] = useState("");
  const [DiagnosisCount, setDiagnosisCount] = useState(0);

  const handleChangeDiagnosis = (event) => {
    if (event.target.value.length <= 280) {
      setDiagnosis(event.target.value);
      setDiagnosisCount(event.target.value.length);
    }
  };
  const handleFormSubmitDiagnosis = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addDiagnosis({
        variables: { diagnosisBody, thoughtId },
      });
      // clear form value
      setDiagnosis("");
      setDiagnosisCount(0);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <p
        className={`m-0 ${DiagnosisCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {DiagnosisCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <h3 className="review"> Assessment and Plan</h3>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmitDiagnosis}
      >
        <label
          name="diagnosisBody"
          value={diagnosisBody.diagnosisBody || ""}
          className="form-input col-12 col-md-9"
          onChange={handleChangeDiagnosis}
        >
          <textarea placeholder="type Assessment and Plan"></textarea>
        </label>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DiagnosisForm;
