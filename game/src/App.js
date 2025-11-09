import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import React from "react";

import { useEffect, useState, TextInput } from "react";

import Game from "./pages/Game";
import Home from "./pages/Home";
import Gacha from "./pages/Gacha";
import useLocalStorage from "./hooks/useLocalStorage";
import toggle from "./hooks/toggle";

import useCards from "./hooks/useCards";
import ItemCard from "./hooks/itemCard";

function App() {
  const [currency, setCurrency] = useLocalStorage("currency", 0);
  const [highScore, setHighScore] = useLocalStorage("highScore", 0);
  const [ownedCardsString, setCards] = useLocalStorage("cards");
  const ownedCards = JSON.parse(ownedCardsString);
  const { data: cardData, isPending, error } = useCards();
  const [selectedIds, setSelectedIds] = useState([]);

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Error loading data</span>;

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

  function deleteAllData() {
    localStorage.removeItem("currency");
    localStorage.removeItem("cards");
    localStorage.removeItem("highScore");
    setCurrency(0);
    setHighScore(0);
    toggle("settings");
  }

  return (
    <div className="App">
      <div className="App-header">
        <button>
          <a href="/" className="App-header-logo">
            MATHCHA
            <div className="App-header-logo-img">
              <img src={"/assets/icons/matcha-logo.png"} />
            </div>
          </a>
        </button>
        <div className="App-header-stat">
          <p>$ {currency}</p>
          <div className="App-header-stat-img">
            <img src={"/assets/icons/matcha-currency.png"} />
          </div>
        </div>
        <div className="App-header-stat">
          <p>Highest Score: {highScore}</p>
          <div className="App-header-stat-img">
            <img src={"/assets/icons/matcha-logo.png"} />
          </div>
        </div>
        <div className="App-header-options">
          <button
            onClick={() => toggle("cards")}
            className="App-header-options-button"
          >
            CARDS
            <img src={"/assets/icons/cards.png"} />
          </button>
          <button
            onClick={() => toggle("settings")}
            className="App-header-options-img"
          >
            <img src={"/assets/icons/settings.png"} />
          </button>
          <button>
            <a href="/" className="App-header-options-img">
              <img src={"/assets/icons/home.png"} />
            </a>
          </button>
          <div className="App-popup" id="cards" style={{ display: "none" }}>
            <button
              onClick={() => toggle("cards")}
              className="App-button-x"
              id="x"
            >
              x
            </button>
            <h1>My Cards</h1>
            <div className="gridCard" style={{paddingBottom: "5vh"}}>
              {Object.entries(cardData).map(([key]) => {
                return (
                  <ItemCard
                    key={key}
                    card={cardData[key]}
                    isSelected={{}}
                    onCardClick={() => handleCardClick(key)}
                    className="gameplayCard-noTransition"
                  />
                );
              })}
            </div>
          </div>
          {/* PLAY popup
            <div className="App-popup" id="play-confirm" style={{ display: "none" }}>  
              <button id="x">x</button>
              <h1>Select Your Cards:</h1>
              <div>
                <br /><br /><br /><br /><h2>Cards Here Meow</h2><br /><br /><br /><br /><br />
                </div>
              <p>You may only select up to 5 cards.</p>
              <Link to="/Game">
                <button className="App-button">
                  START!
                </button>
              </Link>
            </div> */}
          <div className="App-popup" id="settings" style={{ display: "none" }}>
            <button
              onClick={() => toggle("settings")}
              className="App-button-x"
              id="x"
            >
              x
            </button>
            <h1>Settings</h1>
            <button className="App-button" onClick={() => deleteAllData()}>
              <p style={{color: "black", textShadow: "0px 1px 4px red"}}>DELETE ALL DATA</p>
            </button>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/game"
          element={<Game /* currency={currency} setCurrency={setCurrency} */ />}
        />
        <Route
          path="/gacha"
          element={
            <Gacha /* currency={currency} setCurrency={setCurrency} */ />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
