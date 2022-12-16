import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_DISPOSITION } from "../../utils/mutations";

const DispositionForm = ({ thoughtId }) => {
  const [addDisposition, { error }] = useMutation(ADD_DISPOSITION);

  const [dispositionBody, setDisposition] = useState("");
  const [DispositionCount, setDispositionCount] = useState(0);

  const handleChangeDisposition = (event) => {
    if (event.target.value.length <= 280) {
      setDisposition(event.target.value);
      setDispositionCount(event.target.value.length);
    }
  };
  const handleFormSubmitDisposition = async (event) => {
    event.preventDefault();

    try {
      // add  to database
      await addDisposition({
        variables: { dispositionBody, thoughtId },
      });

      // clear form value
      setDisposition("");
      setDispositionCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${
          DispositionCount === 280 || error ? "text-error" : ""
        }`}
      >
        Character Count: {DispositionCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <h3 className="review"> Disposition</h3>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmitDisposition}
      >
        <label
          name="dispositionBody"
          value={dispositionBody.dispositionBody || ""}
          className="form-input col-12 col-md-9"
          onChange={handleChangeDisposition}
        >
          <select>
            <option value="Discharge Home">Discharge Home</option>
            <option value="Admit to Hospital">Admit to Hospital</option>
            <option value="Awaiting Placement">Awaiting Placement</option>
            <option value="Discharge to Facility">Discharge to Facility</option>
            <option value="To be determined">To be determined</option>
          </select>
        </label>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DispositionForm;
