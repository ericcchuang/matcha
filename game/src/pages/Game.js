import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "../index.css";

function Game() {
  const [problem, setProblem] = useState("test");

  async function getMathProblem() {
    try {
      const response = await fetch(`http://localhost:8000/generateProblems`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setProblem(data);
      }
    } catch (error) {
      console.log("error!!!!!!", error);
    }
  }

  return (
    <div>
      <button onClick={getMathProblem}>Play</button>
      <div>
        {problem ? (
          Object.values(problem).map((item) => (
            <p key={item.problem}>{item.problem}</p>
          ))
        ) : (
          <p>Click Play to get a problem</p>
        )}
      </div>
    </div>
  );
}

export default Game;
