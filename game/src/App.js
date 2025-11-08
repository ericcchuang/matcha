import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import React from "react";

import Game from "./pages/Game";
import Home from "./pages/Home";
import Gacha from "./pages/Gacha";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [currency, setCurrency] = useLocalStorage("currency");
  return (
    <div className="App">
      <div className="App-header">
        <div className="App-header-logo">
          MATCHA
          <div className="App-header-logo-img">
            <img src={"../assets/icons/matcha-logo.PNG"} />
          </div>
        </div>
        <div className="App-header-stat">
          <div className="App-header-stat-img">
            <img src={"../assets/icons/matcha-currency.PNG"} />
          </div>
          {currency} (Currency)
        </div>
        <div className="App-header-stat">
          <div className="App-header-stat-img">
            <img src={"../assets/icons/matcha-logo.PNG"} />
          </div>
          000 (Level)
        </div>
        <div className="App-header-options">
          <button className="App-header-options-button">
            CARDS
            <img src={"../assets/icons/cards.PNG"} />
          </button>
          <button className="App-header-options-img">
            <img src={"../assets/icons/settings.PNG"} />
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gacha" element={<Gacha />} />
      </Routes>
    </div>
  );
}

export default App;
