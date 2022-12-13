import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";

import ThoughtForm from "../components/ThoughtForm";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive

  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        {
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        }
        <div className={`col-12 mb-3 ${"col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Patients" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
