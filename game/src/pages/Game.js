import React from "react";
import { useEffect, useState, TextInput } from "react";
import ReactDOM from "react-dom/client";
import Latex from "react-latex-next";
import "../index.css";
import { Link } from "react-router-dom";
import { useTimer } from "use-timer";

function Game() {
  const [problemList, setProblemList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevCorrectWrong, setPrevCorrectWrong] = useState(true);
  const currentProblem = problemList[currentIndex];
  const [score, setScore] = useState(0);
  const { time, start, pause, reset, status, advanceTime } = useTimer({
    initialTime: 30,
    timerType: "DECREMENTAL",
  });

  async function getMathProblems() {
    try {
      const response = await fetch(`http://localhost:8000/generateProblems`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setProblemList(Object.values(data));
        start();
      }
    } catch (error) {
      console.log("error!!!!!!", error);
    }
  }

  function handleNext() {
    if (problemList.length === 0) return;
    const answer = document.getElementById("answer").value;
    document.getElementById("answer").value = "";
    if (answer == currentProblem.answer) {
      setPrevCorrectWrong("Correct!");
      setScore(score + 1);
      advanceTime(-10);
    } else {
      setPrevCorrectWrong(`Wrong! The answer was ${currentProblem.answer}.`);
    }
    setCurrentIndex((prevIndex) => {
      return (prevIndex + 1) % problemList.length;
    });
  }

  return (
    <div>
      <div>
        {!currentProblem && time > 0 ? (
          <div>
            <p>Click "Generate Problems" to start</p>
            <button onClick={getMathProblems}>Generate Problems</button>
          </div>
        ) : (
          ""
        )}
        {currentProblem && time > 0 ? (
          <div>
            {currentProblem.problem} =
            <label>
              <input name="answer" id="answer" />
            </label>
            <button onClick={handleNext} disabled={problemList.length === 0}>
              Submit
            </button>
            <p>{prevCorrectWrong}</p>
            <p>Score: {score}</p>
            <p>Time: {time}</p>
          </div>
        ) : (
          ""
        )}
        {time < 1 ? <div>Game over!! You scored {score}.</div> : ""}
      </div>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default Game;
