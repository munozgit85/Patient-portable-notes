import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";
import hcbgImage from "../assets/ipad.png";

import ThoughtForm from "../components/ThoughtForm";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive

  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main
      class="bg_image"
      style={{
        backgroundImage: "url(" + hcbgImage + ")",
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5",
      }}
    >
      <header></header>
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
            <ThoughtList thoughts={thoughts} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
