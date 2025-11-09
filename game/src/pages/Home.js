import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Container">
      <Link to="/Game" className="Card">
        <button>
          <h1>PLAY</h1>
        </button>
      </Link>
      <Link to="/Gacha" className="Card">
        <button>
          <h1>Gacha</h1>
        </button>
      </Link>
    </div>
  );
}

export default Home;
