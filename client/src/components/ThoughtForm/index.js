import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

const ThoughtForm = () => {
  const [addThought] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
        });
      } catch (e) {
        console.warn("Patient information placed");
      }

      // update thought array's cache
      const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
      cache.writeQuery({
        query: QUERY_THOUGHTS,
        data: { thoughts: [addThought, ...thoughts] },
      });
    },
  });
  const [thought, setText] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setText((values) => ({ ...values, [name]: value }));
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addThought({
        variables: { thought },
      });

      // clear form value
      setText("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
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
