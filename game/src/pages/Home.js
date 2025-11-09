import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Latex from "react-latex-next";
import { Link } from "react-router-dom";
import toggle from "../hooks/toggle";

function Home() {
  return (
    <div className="Container">
      <button onClick={() => toggle("play-confirm")} className="Card">
        <h1>PLAY</h1>
        <Latex macros={{ "\\f": "#1f(#2)" }}>
          {"$\\f\\relax{x} = x$ is rendered using macros"}
        </Latex>
      </button>
      <button className="Card">
        <h1><Link to="/Gacha">Gacha</Link></h1>
      </button>
      <div className="App-popup" id="play-confirm" style={{display: "none"}}>
        <h1>Confirm meow</h1>
      </div>
    </div>
  );
}

export default Home;
