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
          <img src={"../assets/matcha-currency.PNG"} />
        </div>
        <div className="App-header-stat">
          <img src={"../assets/matcha-currency.PNG"} />
          Currency
        </div>
        <div className="App-header-stat">
          Meow
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