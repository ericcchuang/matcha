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
    try {
      //const response = await fetch(`http://localhost:8000/generateProblems`, {
      //  method: "GET",
      //});
      //const data = await response.json();
      const data = filler;
      //if (response.ok) {
      setProblemList(Object.values(data));
      initGame();
      //}
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
      setCurrency(Number(currency) + 1);
      advanceTime(-extraTime);
      if (extraTime > 2) {
        setExtraTime(extraTime - 1);
      }
    } else {
      setPrevCorrectWrong(`Wrong! The answer was ${currentProblem.answer}.`);
    }
    setCurrentIndex((prevIndex) => {
      return (prevIndex + 1) % problemList.length;
    });
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

  return (
    <div>
      <div>
        {!currentProblem && time > 0 ? (
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
            <p>Selected Cards:</p>
            {Object.entries(cardData).map(([key]) => {
              if (selectedIds.includes(key)) {
                return (
                  <ItemCard
                    card={cardData[key]}
                    key={key}
                    id={key}
                    alt={`Selected Card ${key}`}
                    className="gameplayCard2"
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
            Game over!! You scored {score}. You earned {score} currency.
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
