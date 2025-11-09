import React from "react";
import { useEffect, useState, TextInput } from "react";
import ReactDOM from "react-dom/client";
import Latex from "react-latex-next";
import "../index.css";
import { Link } from "react-router-dom";
import { useTimer } from "use-timer";
import useLocalStorage from "../hooks/useLocalStorage";
import filler from "./filler_data.json";
import useCards from "../hooks/useCards";
import ItemCard from "../hooks/itemCard";

function Game() {
  const endpoint = process.env.REACT_APP_ENDPOINT;
  const [problemList, setProblemList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevCorrectWrong, setPrevCorrectWrong] = useState(true);
  const currentProblem = problemList[currentIndex];
  const [score, setScore] = useState(0);
  const [extraTime, setExtraTime] = useState(10);
  const { time, start, pause, reset, status, advanceTime } = useTimer({
    initialTime: 30,
    timerType: "DECREMENTAL",
  });
  const [currency, setCurrency] = useLocalStorage("currency");
  const [ownedCardsString, setCards] = useLocalStorage("cards");
  const [highScore, setHighScore] = useLocalStorage("highScore");
  const ownedCards = JSON.parse(ownedCardsString);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currencyEarned, setCurrencyEarned] = useState(0);

  const { data: cardData, isPending, error } = useCards();

  useEffect(() => {
    if (!highScore || score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore, setHighScore]);
  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Error loading data</span>;
  function initGame() {
    start();
    setExtraTime(10);
    setScore(0);
  }

  async function getMathProblems() {
    setLoading(true);
    try {
      const response = await fetch(`${endpoint}generateProblems`, {
        method: "GET",
      });
      const data = await response.json();
      //const data = filler;
      if (response.ok) {
        setProblemList(Object.values(data));
        initGame();
        setLoading(false);
      }
    } catch (error) {
      console.log("error!!!!!!", error);
      setLoading(false);
    }
  }

  function handleNext() {
    if (problemList.length === 0) return;
    const answer = document.getElementById("answer").value;
    document.getElementById("answer").value = "";
    if (answer == currentProblem.answer) {
      setPrevCorrectWrong("Correct!");
      setScore(
        calculateScore(currentProblem.problem, answer, selectedIds) + score
      );
      setCurrency(Number(currency) + 1);
      setCurrencyEarned(Number(currencyEarned) + 1);
      advanceTime(-extraTime);
      if (extraTime > 1) {
        setExtraTime(extraTime - 1);
      }
    } else {
      setPrevCorrectWrong(`Wrong! The answer was ${currentProblem.answer}.`);
    }
    setCurrentIndex((prevIndex) => {
      return (prevIndex + 1) % problemList.length;
    });
  }

  function calculateScore(question, answer, equipped) {
    let scoreAdd = 1;
    const lastDigit = answer % 10;

    if (equipped.includes(lastDigit.toString())) {
      scoreAdd = scoreAdd + 1;
    }

    if (equipped.includes("10") && question.includes("+")) {
      scoreAdd = scoreAdd + 1;
    }

    if (equipped.includes("11") && question.includes("-")) {
      scoreAdd = scoreAdd + 1;
    }

    if (equipped.includes("12")) {
      if (answer == "21") {
        scoreAdd = scoreAdd + 21;
      } else if (answer == "19") {
        scoreAdd = scoreAdd + 19;
      } else if (lastDigit == 9 || lastDigit == 0) {
        scoreAdd = scoreAdd + 1;
      }
      scoreAdd = scoreAdd + 1;
    }

    if (equipped.includes("13")) {
      if (lastDigit == 6) {
        scoreAdd = scoreAdd + 6;
      } else if (lastDigit == 7) {
        scoreAdd = scoreAdd + 7;
      }
    }
    return scoreAdd;
  }

  const handleCardClick = (id) => {
    if (!ownedCards || !ownedCards[id] || ownedCards[id] <= 0) {
      return;
    }
    if (selectedIds.length >= 5 && !selectedIds.includes(id)) {
      return;
    }
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((currentId) => currentId !== id);
      }
      return [...prevIds, id];
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleNext();
    }
  };

  return (
    <div>
      <div>
        {!currentProblem && time > 0 && !loading ? (
          <div>
            <h1>Select Your Cards:</h1>
            {Object.entries(cardData).map(([key]) => {
              // Check if this card's ID is in the state array
              const isSelected = selectedIds.includes(key);

              // Render the ItemCard, passing the props it needs
              return (
                <ItemCard
                  key={key}
                  card={cardData[key]}
                  isSelected={isSelected}
                  onCardClick={() => handleCardClick(key)}
                  className="gameplayCard"
                />
              );
            })}
            <br />
            <p>
              You may only select up to 5 cards. Click "Start Game" to start!
            </p>
            <button onClick={getMathProblems} className="App-button">
              START!
            </button>
          </div>
        ) : (
          ""
        )}
        {loading ? <div>loading problems...</div> : ""}
        {currentProblem && time > 0 && !loading ? (
          <div>
            {currentProblem.problem} =
            <label>
              <input name="answer" id="answer" onKeyDown={handleKeyDown} />
            </label>
            <br />
            <button onClick={handleNext} disabled={problemList.length === 0}>
              Submit
            </button>
            <br />
            <p>{prevCorrectWrong}</p>
            <br />
            <p>Score: {score}</p>
            <br />
            <p>Time: {time}</p>
            <br />
            <p>Selected Cards:</p>
            <br />
            {Object.entries(cardData).map(([key]) => {
              if (selectedIds.includes(key)) {
                return (
                  <ItemCard
                    card={cardData[key]}
                    key={key}
                    id={key}
                    alt={`Selected Card ${key}`}
                    className="gameplayCard"
                  />
                );
              }
              return null;
            })}
          </div>
        ) : (
          ""
        )}
        {time < 1 ? (
          <div>
            Game over!! You scored {score}. You earned ${currencyEarned}.
          </div>
        ) : (
          ""
        )}
      </div>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default Game;
