import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import React from "react";

import Game from "./pages/Game";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="App-header-logo">
          MATCHA
          <div className="App-header-logo-img">
            <img src={"../assets/matcha-currency.PNG"} />
          </div>
        </div>
        <div className="App-header-stat">
          <div className="App-header-stat-img">
            <img src={"../assets/matcha-currency.PNG"} />
          </div>
          Currency
        </div>
        <div className="App-header-stat">
          <div className="App-header-stat-img">
            <img src={"../assets/matcha-currency.PNG"} />
          </div>
          Meow
        </div>
        <div className="App-header-options">
          <div className="App-header-options-img">
            <img src={"../assets/settings.PNG"} />
          </div>
          <div className="App-header-options-img">
            <img src={"../assets/settings.PNG"} />
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;