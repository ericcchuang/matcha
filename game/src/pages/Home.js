import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Latex from "react-latex-next";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Container">
      <button className="Card">
        <h1><Link to="/Game">PLAY!!!</Link></h1>
        <Latex macros={{ "\\f": "#1f(#2)" }}>
          {"$\\f\\relax{x} = x$ is rendered using macros"}
        </Latex>
      </button>
      <button className="Card">
        <h1><Link to="/Gacha">Gacha</Link></h1>
      </button>
    </div>
  );
}

export default Home;
