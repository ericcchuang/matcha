import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Latex from "react-latex-next";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Container">
      <button className="Card">
        <Link to="/Game">PLAY!!!</Link>
        <Latex macros={{ "\\f": "#1f(#2)" }}>
          {"$\\f\\relax{x} = x$ is rendered using macros"}
        </Latex>
      </button>
      <button className="Card">
        <Link to="/Gacha">Gacha</Link>
      </button>
    </div>
  );
}

export default Home;
