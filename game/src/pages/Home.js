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
            <h1 style={{fontSize: "8vh", marginTop: "3vh"}}>MATH PLAY</h1>
            <p style={{fontSize: "3vh"}}>Earn points and $ for drawing new cards!</p>
          </button>
        </Link>
      </div>
      <div>
        <Link to="/Gacha">
          <button className="Card">
            <img src={"/assets/icons/gacha.png"} className="App-img" />
            <h1 style={{fontSize: "8vh", marginTop: "3vh"}}>CARD DRAW</h1>
            <p style={{fontSize: "3vh"}}>Draw new cards to add to your collection!</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
