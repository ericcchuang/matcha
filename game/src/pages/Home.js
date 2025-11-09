import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Container">
      <div>
        <Link to="/Game">
          <button className="Card">
            <img src={"/assets/icons/math.png"} className="App-img" />
            <h1>PLAY</h1>
          </button>
        </Link>
      </div>
      <div>
        <Link to="/Gacha">
          <button className="Card">
            <img src={"/assets/icons/gacha.png"} className="App-img" />
            <h1>GACHA</h1>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
