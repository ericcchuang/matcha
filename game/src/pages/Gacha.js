import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";
import useLocalStorage from "../hooks/useLocalStorage";

function Gacha() {
  const [pulledCard, setPulledCard] = useState(0);
  const [cardImageURL, setCardImageURL] = useState();
  const [currency, setCurrency] = useLocalStorage("currency");
  const [cardJson] = useLocalStorage("cards");
  const cards = JSON.parse(cardJson) ?? {};

  function pullGacha() {
    setPulledCard(Math.floor(Math.random() * 12));
    console.log(pulledCard);
    switch (pulledCard) {
      case 0:
        setCardImageURL("/assets/cards/common/zero.png");
        break;
      case 1:
        setCardImageURL("/assets/cards/common/one.png");
        break;
      case 2:
        setCardImageURL("/assets/cards/common/two.png");
        break;
      case 3:
        setCardImageURL("/assets/cards/common/three.png");
        break;
      case 4:
        setCardImageURL("/assets/cards/common/four.png");
        break;
      case 5:
        setCardImageURL("/assets/cards/common/five.png");
        break;
      case 6:
        setCardImageURL("/assets/cards/common/six.png");
        break;
      case 7:
        setCardImageURL("/assets/cards/common/seven.png");
        break;
      case 8:
        setCardImageURL("/assets/cards/common/eight.png");
        break;
      case 9:
        setCardImageURL("/assets/cards/common/nine.png");
        break;
      case 10:
        setCardImageURL("/assets/cards/uncommon/plus.png");
        break;
      case 11:
        setCardImageURL("/assets/cards/uncommon/minus.png");
        break;
      default:
        setCardImageURL("/assets/icons/math.png");
    }
    // we don't have to use the cards setter because state will be updated by the currency setter
    if (pulledCard in cards) {
      cards[pulledCard]++;
      localStorage.setItem("cards", JSON.stringify(cards));
      setCurrency(currency - 1);
    } else {
      cards[pulledCard] = 1;
      localStorage.setItem("cards", JSON.stringify(cards));
      setCurrency(currency - 1);
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
          <div>no card pulled</div>
        )}
        <button onClick={pullGacha} disabled={currency <= 0 ? true : false}>
          Pull!
        </button>
      </p>
    </div>
  );
}

export default Gacha;
