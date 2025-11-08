import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";

function Gacha() {
  const [pulledCard, setPulledCard] = useState(0);
  const [cardImageURL, setCardImageURL] = useState();

  function pullGacha() {
    setPulledCard(Math.floor(Math.random() * 12));
    console.log(pulledCard);
    switch (pulledCard) {
      case 0:
        setCardImageURL("/cards/common/zero.png");
        break;
      case 1:
        setCardImageURL("/cards/common/one.png");
        break;
      case 2:
        setCardImageURL("/cards/common/two.png");
        break;
      case 3:
        setCardImageURL("/cards/common/three.png");
        break;
      case 4:
        setCardImageURL("/cards/common/four.png");
        break;
      case 5:
        setCardImageURL("/cards/common/five.png");
        break;
      case 6:
        setCardImageURL("/cards/common/six.png");
        break;
      case 7:
        setCardImageURL("/cards/common/seven.png");
        break;
      case 8:
        setCardImageURL("/cards/common/eight.png");
        break;
      case 9:
        setCardImageURL("/cards/common/nine.png");
        break;
      case 10:
        setCardImageURL("/cards/uncommon/plus.png");
        break;
      case 11:
        setCardImageURL("/cards/uncommon/minus.png");
        break;
    }
  }

  return (
    <div>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        {cardImageURL ? (
          <img src={cardImageURL} className="playingCard" />
        ) : (
          <button onClick={pullGacha}>Pull!</button>
        )}
      </p>
    </div>
  );
}

export default Gacha;
