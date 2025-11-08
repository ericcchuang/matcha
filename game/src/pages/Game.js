import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "../index.css";

function Game() {
  const [problem, setProblem] = useState("test");

  async function getMathProblem() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/generateProblems`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(JSON.stringify(data));
      if (response.ok) {
        setProblem(JSON.stringify(data));
      }
    } catch (error) {
      console.log("error!!!!!!", error);
    }
  }

  return (
    <div>
      <form onSubmit={getMathProblem}>
        <button type="submit">Play</button>
        <p>{problem ?? ""}</p>
      </form>
    </div>
  );
}

export default Game;
