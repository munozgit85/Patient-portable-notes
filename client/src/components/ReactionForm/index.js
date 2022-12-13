import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REACTION } from "../../utils/mutations";

const ReactionForm = ({ thoughtId }) => {
  const [addReaction, { error }] = useMutation(ADD_REACTION);
  const [reactionBody, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addReaction({
        variables: { reactionBody, thoughtId },
      });
      // clear form value
      setBody("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <h3 className="review"> Review of Systems</h3>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <label>
          Check positive symptoms for Review of Systems
          <select
            name="reactionBody"
            value={reactionBody.reactionBody || ""}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          >
            <option value="Fevers">Fevers</option>
            <option value="Weight loss or gain">Weight loss or gain</option>
            <option value="Chills">Chills</option>
            <option value="Nausea">Nausea</option>
            <option value="Vomiting">Vomiting</option>
            <option value="Abdominal pain">Abdominal pain</option>
            <option value="Diarrhea">Diarrhea</option>
            <option value="Constipation">Constipation</option>
            <option value="Blurred vision">Blurred Vision</option>
            <option value="Earache">Earache</option>
            <option value="Hearing Loss">Hearing Loss</option>
            <option value="Sore Throat">Sore Throat</option>
          </select>
        </label>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactionForm;
