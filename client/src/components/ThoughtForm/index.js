import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations";

const ThoughtForm = () => {
  const [addThought] = useMutation(ADD_THOUGHT);
  const [thought, setThought] = useState({
    thoughtText: "",
    thoughtTextA: "",
    thoughtTextB: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setThought({ ...thought, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addThought({
        variables: thought,
      });

      // clear form value
      setThought("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch bg-secondary"
        onSubmit={handleFormSubmit}
      >
        <label>
          Enter Patient's Name:
          <input
            type="text"
            name="thoughtText"
            value={thought.thoughtText || ""}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          />
        </label>
        <label>
          Enter Patient's Date of Birth:
          <input
            type="date"
            name="thoughtTextA"
            value={thought.thoughtTextA || ""}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          />
        </label>
        <label>
          Enter Patient's Medical Record Number:
          <input
            type="number"
            name="thoughtTextB"
            value={thought.thoughtTextB || ""}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          />
        </label>

        <input type="submit" value="Submit" className="btn col-12 col-md-3" />
      </form>
    </div>
  );
};

export default ThoughtForm;
