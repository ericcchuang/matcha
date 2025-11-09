import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import React from "react";

import Game from "./pages/Game";
import Home from "./pages/Home";
import Gacha from "./pages/Gacha";
import useLocalStorage from "./hooks/useLocalStorage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toggle from "./hooks/toggle";

function App() {
  const [currency] = useLocalStorage("currency");
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className="App-header">
          <a href="/" className="App-header-logo">
            MATCHA
            <div className="App-header-logo-img">
              <img src={"/assets/icons/matcha-logo.png"} />
            </div>
          </a>
          <div className="App-header-stat">
            <div className="App-header-stat-img">
              <img src={"/assets/icons/matcha-currency.png"} />
            </div>
            {currency} (Currency)
          </div>
          <div className="App-header-stat">
            <div className="App-header-stat-img">
              <img src={"/assets/icons/matcha-logo.png"} />
            </div>
            000 (Level)
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
            <div className="App-popup" id="cards" style={{ display: "none" }}>
              <h1>Hello World!</h1>
            </div>
            <div
              className="App-popup"
              id="settings"
              style={{ display: "none" }}
            >
              <h1>Settings</h1>
            </div>
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
    </QueryClientProvider>
  );
}

export default App;
