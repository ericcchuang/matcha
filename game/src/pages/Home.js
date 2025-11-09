import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Container">
      <button className="Card">
        <Link to="/Game">
          <img src={"/assets/icons/math.png"} className="App-img" />
          <h1>PLAY</h1>
        </Link>
      </button>
    <button className="Card">
      <Link to="/Gacha">
        <img src={"/assets/icons/gacha.png"} className="App-img" />
        <h1>GACHA</h1>
      </Link>
    </button>
    </div>
  );
}

export default Home;
