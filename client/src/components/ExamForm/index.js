import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXAM } from "../../utils/mutations";

const ExamForm = ({ thoughtId }) => {
  const [addExam, { error }] = useMutation(ADD_EXAM);
  const [examBody, setExam] = useState("");
  const [ExamCount, setExamCount] = useState(0);

  const handleChangeExam = (event) => {
    if (event.target.value.length <= 280) {
      setExam(event.target.value);
      setExamCount(event.target.value.length);
    }
  };
  const handleFormSubmitExam = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addExam({
        variables: { examBody, thoughtId },
      });
      // clear form value
      setExam("");
      setExamCount(0);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <p className={`m-0 ${ExamCount === 280 || error ? "text-error" : ""}`}>
        Character Count: {ExamCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <h3 className="review"> Physical Exam</h3>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmitExam}
      >
        <label
          name="examBody"
          value={examBody.examBody || ""}
          className="form-input col-12 col-md-9"
          onChange={handleChangeExam}
        >
          Head and Neck
          <select>
            <option value="Neck supple">Neck supple</option>
            <option value="Head atraumatic">Head atraumatic</option>
            <option value="traumatic head injury">traumatic head injury</option>
            <option value="enlarged goiter">enlarged goiter</option>
          </select>
          <br />
          Ears
          <select>
            <option value="EOM">EOM</option>
            <option value="pupils equal and reactive">
              pupils equal and reactive
            </option>
            <option value="drainage">drainage</option>
            <option value="periorbital edema">periorbital edema</option>
          </select>
          <br />
          Vital signs
          <br />
          <textarea placeholder="type vital signs"></textarea>
        </label>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExamForm;
