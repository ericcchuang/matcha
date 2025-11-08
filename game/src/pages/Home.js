import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Latex from "react-latex-next";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <p>
        <Link to="/Game">PLAY!!!</Link>
      </p>
      <p>
        <Link to="/Gacha">GACHA</Link>
      </p>
      <p>
        <Latex macros={{ "\\f": "#1f(#2)" }}>
          {"$\\f\\relax{x} = x$ is rendered using macros"}
        </Latex>
      </p>
    </div>
  );
}

export default Home;
