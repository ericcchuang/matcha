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
  const [currency] = useLocalStorage("currency", 0);
  const [highScore] = useLocalStorage("highScore", 0);
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

  return (
      <div className="App">
        <div className="App-header">
          <a href="/" className="App-header-logo">
            MATHCHA
            <div className="App-header-logo-img">
              <img src={"/assets/icons/matcha-logo.png"} />
            </div>
          </a>
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
            <button onClick={() => toggle("settings")} className="App-header-options-img">
              <img src={"/assets/icons/settings.png"} />
            </button>
            <a href="/" className="App-header-options-img">
              <img src={"/assets/icons/home.png"} />
            </a>
            <div className="App-popup" id="cards" style={{ display: "none" }}>
              <button
                onClick={() => toggle("cards")}
                className="App-button-x"
                id="x"
              >
                x
              </button>
              <h1>My Cards</h1>
              <div className="gridCard">
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
            {/* Settings popup
            <div className="App-popup" id="settings">
              <h1>Settings</h1>
            </div> */}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/game"
            element={
              <Game /* currency={currency} setCurrency={setCurrency} */ />
            }
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
